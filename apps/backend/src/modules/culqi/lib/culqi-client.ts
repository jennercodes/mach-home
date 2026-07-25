import { MedusaError } from "@medusajs/framework/utils"

/**
 * Minimal REST client for the Culqi v2 API (https://api.culqi.com/v2).
 *
 * Only the endpoints the payment provider needs are implemented: create charge,
 * capture charge, create refund and retrieve charge. Card tokenization happens
 * client-side (Checkout Custom) so the token endpoint is not needed here.
 *
 * Amounts are always expressed in the currency's minor unit (céntimos): S/10.00
 * is sent as 1000. Callers are responsible for the conversion.
 */
export type CulqiCharge = {
  id: string
  object: string
  amount: number
  currency_code: string
  email: string
  outcome?: {
    type?: string
    code?: string
    merchant_message?: string
    user_message?: string
  }
  capture?: boolean
  [key: string]: unknown
}

export type CulqiError = {
  object: "error"
  type?: string
  code?: string
  merchant_message?: string
  user_message?: string
}

export type CreateChargeParams = {
  amount: number
  currency_code: string
  email: string
  source_id: string
  capture?: boolean
  description?: string
  metadata?: Record<string, unknown>
}

export type CreateRefundParams = {
  amount: number
  charge_id: string
  reason?: string
}

export type CulqiClientOptions = {
  secretKey: string
  apiUrl?: string
}

const DEFAULT_API_URL = "https://api.culqi.com/v2"

export class CulqiClient {
  private readonly secretKey: string
  private readonly apiUrl: string

  constructor({ secretKey, apiUrl }: CulqiClientOptions) {
    this.secretKey = secretKey
    this.apiUrl = (apiUrl || DEFAULT_API_URL).replace(/\/$/, "")
  }

  private async request<T>(
    path: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    let res: Response
    try {
      res = await fetch(`${this.apiUrl}${path}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      })
    } catch (e) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `No se pudo contactar a Culqi: ${(e as Error).message}`
      )
    }

    const payload = (await res.json().catch(() => ({}))) as
      | T
      | CulqiError

    if (!res.ok) {
      const err = payload as CulqiError
      // Culqi returns a human-friendly message in `user_message`; surface it so
      // the shopper sees why the card was declined.
      throw new MedusaError(
        MedusaError.Types.PAYMENT_AUTHORIZATION_ERROR,
        err?.user_message ||
          err?.merchant_message ||
          `Culqi respondió con estado ${res.status}`
      )
    }

    return payload as T
  }

  private async get<T>(path: string): Promise<T> {
    const res = await fetch(`${this.apiUrl}${path}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${this.secretKey}` },
    })
    const payload = (await res.json().catch(() => ({}))) as T | CulqiError
    if (!res.ok) {
      const err = payload as CulqiError
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        err?.user_message ||
          err?.merchant_message ||
          `Culqi respondió con estado ${res.status}`
      )
    }
    return payload as T
  }

  createCharge(params: CreateChargeParams): Promise<CulqiCharge> {
    return this.request<CulqiCharge>("/charges", {
      amount: params.amount,
      currency_code: params.currency_code,
      email: params.email,
      source_id: params.source_id,
      // `capture: false` only authorizes; `true` (default) captures immediately.
      capture: params.capture ?? true,
      ...(params.description ? { description: params.description } : {}),
      ...(params.metadata ? { metadata: params.metadata } : {}),
    })
  }

  captureCharge(chargeId: string): Promise<CulqiCharge> {
    return this.request<CulqiCharge>(`/charges/${chargeId}/capture`)
  }

  createRefund(params: CreateRefundParams): Promise<Record<string, unknown>> {
    return this.request<Record<string, unknown>>("/refunds", {
      amount: params.amount,
      charge_id: params.charge_id,
      reason: params.reason ?? "solicitud_comprador",
    })
  }

  getCharge(chargeId: string): Promise<CulqiCharge> {
    return this.get<CulqiCharge>(`/charges/${chargeId}`)
  }
}
