import {
  AbstractPaymentProvider,
  BigNumber,
  MedusaError,
} from "@medusajs/framework/utils"
import {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  Logger,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"
import { CulqiClient } from "./lib/culqi-client"

export type CulqiOptions = {
  /** Secret key (sk_test_... / sk_live_...). Used server-side to create charges. */
  secretKey: string
  /** Override the API base URL. Defaults to https://api.culqi.com/v2. */
  apiUrl?: string
  /**
   * When true (default) the charge is captured immediately on order placement.
   * Set false to only authorize and capture later from the admin.
   */
  capture?: boolean
}

type InjectedDependencies = {
  logger: Logger
}

/**
 * Shape of the data we persist on the payment session / payment record.
 * `culqi_token` is the single-use card token produced by Checkout Custom in the
 * storefront and forwarded through `initiatePayment`'s `data`.
 */
type CulqiSessionData = {
  culqi_token?: string
  email?: string
  amount?: number
  currency_code?: string
  charge_id?: string
  captured?: boolean
  charge?: Record<string, unknown>
  refunds?: Record<string, unknown>[]
}

class CulqiProviderService extends AbstractPaymentProvider<CulqiOptions> {
  static identifier = "culqi"

  protected readonly logger_: Logger
  protected readonly options_: CulqiOptions
  protected readonly client_: CulqiClient
  protected readonly capture_: boolean

  static validateOptions(options: Record<string, unknown>) {
    if (!options.secretKey) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Culqi payment provider requires a `secretKey` option (sk_test_... / sk_live_...)."
      )
    }
  }

  constructor(container: InjectedDependencies, options: CulqiOptions) {
    super(container, options)

    this.logger_ = container.logger
    this.options_ = options
    this.capture_ = options.capture ?? true
    this.client_ = new CulqiClient({
      secretKey: options.secretKey,
      apiUrl: options.apiUrl,
    })
  }

  /** Converts a Medusa decimal amount (e.g. 199.9) to Culqi céntimos (19990). */
  private toCents(amount: unknown): number {
    return Math.round(new BigNumber(amount as never).numeric * 100)
  }

  private getData(input: { data?: Record<string, unknown> }): CulqiSessionData {
    return (input.data ?? {}) as CulqiSessionData
  }

  private statusFromData(data: CulqiSessionData): GetPaymentStatusOutput["status"] {
    if (data.charge_id) {
      return data.captured ? "captured" : "authorized"
    }
    return "pending"
  }

  async initiatePayment(
    input: InitiatePaymentInput
  ): Promise<InitiatePaymentOutput> {
    const incoming = this.getData(input)
    const token = incoming.culqi_token
    const email = incoming.email || input.context?.customer?.email || ""

    // No charge is created here: Culqi tokenizes the card in the storefront and
    // the charge happens on authorize. We just persist what we'll need later.
    return {
      id: token ?? `culqi_session_${input.context?.idempotency_key ?? ""}`,
      data: {
        culqi_token: token,
        email,
        amount: this.toCents(input.amount),
        currency_code: input.currency_code,
      } satisfies CulqiSessionData,
      status: "pending",
    }
  }

  async authorizePayment(
    input: AuthorizePaymentInput
  ): Promise<AuthorizePaymentOutput> {
    const data = this.getData(input)

    // Idempotency: if a charge already exists for this session, don't charge again.
    if (data.charge_id) {
      return { status: this.statusFromData(data), data: data as Record<string, unknown> }
    }

    if (!data.culqi_token) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Falta el token de Culqi. Vuelve a ingresar los datos de tu tarjeta."
      )
    }

    const charge = await this.client_.createCharge({
      amount: data.amount ?? this.toCents(0),
      currency_code: (data.currency_code ?? "pen").toUpperCase(),
      email: data.email || input.context?.customer?.email || "",
      source_id: data.culqi_token,
      capture: this.capture_,
      metadata: { source: "medusa" },
    })

    const newData: CulqiSessionData = {
      ...data,
      charge_id: charge.id,
      captured: this.capture_,
      charge: charge as Record<string, unknown>,
      // The token is single-use; drop it once the charge is created.
      culqi_token: undefined,
    }

    return {
      status: this.capture_ ? "captured" : "authorized",
      data: newData as Record<string, unknown>,
    }
  }

  async capturePayment(
    input: CapturePaymentInput
  ): Promise<CapturePaymentOutput> {
    const data = this.getData(input)

    // With immediate capture the charge is already captured during authorize,
    // so this is a no-op that just confirms the state.
    if (data.captured || this.capture_) {
      return { data: { ...data, captured: true } as Record<string, unknown> }
    }

    if (!data.charge_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No hay un cargo de Culqi para capturar."
      )
    }

    const charge = await this.client_.captureCharge(data.charge_id)
    return {
      data: {
        ...data,
        captured: true,
        charge: charge as Record<string, unknown>,
      } as Record<string, unknown>,
    }
  }

  async refundPayment(
    input: RefundPaymentInput
  ): Promise<RefundPaymentOutput> {
    const data = this.getData(input)

    if (!data.charge_id) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No hay un cargo de Culqi para reembolsar."
      )
    }

    const refund = await this.client_.createRefund({
      amount: this.toCents(input.amount),
      charge_id: data.charge_id,
    })

    return {
      data: {
        ...data,
        refunds: [...(data.refunds ?? []), refund],
      } as Record<string, unknown>,
    }
  }

  async cancelPayment(
    input: CancelPaymentInput
  ): Promise<CancelPaymentOutput> {
    // Charges are captured immediately, so there's nothing to void with Culqi.
    // Cancelling after capture should be handled as a refund from the admin.
    return { data: this.getData(input) as Record<string, unknown> }
  }

  async deletePayment(
    input: DeletePaymentInput
  ): Promise<DeletePaymentOutput> {
    // Sessions are stateless on Culqi's side until a charge is created.
    return { data: this.getData(input) as Record<string, unknown> }
  }

  async getPaymentStatus(
    input: GetPaymentStatusInput
  ): Promise<GetPaymentStatusOutput> {
    const data = this.getData(input)
    return { status: this.statusFromData(data), data: data as Record<string, unknown> }
  }

  async retrievePayment(
    input: RetrievePaymentInput
  ): Promise<RetrievePaymentOutput> {
    const data = this.getData(input)
    if (!data.charge_id) {
      return { data: data as Record<string, unknown> }
    }
    const charge = await this.client_.getCharge(data.charge_id)
    return {
      data: { ...data, charge: charge as Record<string, unknown> } as Record<
        string,
        unknown
      >,
    }
  }

  async updatePayment(
    input: UpdatePaymentInput
  ): Promise<UpdatePaymentOutput> {
    const data = this.getData(input)
    return {
      status: this.statusFromData(data),
      data: {
        ...data,
        amount: this.toCents(input.amount),
        currency_code: input.currency_code,
      } as Record<string, unknown>,
    }
  }

  async getWebhookActionAndData(
    _payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    // Card charges via Checkout Custom are synchronous, so webhooks aren't
    // required for the current flow. Left unsupported until async methods (e.g.
    // PagoEfectivo) are added.
    return { action: "not_supported" }
  }
}

export default CulqiProviderService
