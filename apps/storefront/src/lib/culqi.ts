/**
 * Client-side helper around Culqi's "Checkout Custom" (js.culqi.com/checkout-js).
 *
 * The checkout tokenizes the shopper's card (or Yape) in the browser using the
 * public key and hands back a single-use token id. That token is forwarded to
 * the Medusa payment session (`data.culqi_token`) and charged server-side by the
 * Culqi payment provider.
 */

const CHECKOUT_SCRIPT_URL = "https://js.culqi.com/checkout-js"

type CulqiToken = { id: string; email?: string }

type CulqiErrorPayload = {
  user_message?: string
  merchant_message?: string
}

type CulqiCheckoutInstance = {
  open: () => void
  close: () => void
  token?: CulqiToken
  order?: unknown
  error?: CulqiErrorPayload
  culqi: () => void
}

type CulqiCheckoutConstructor = new (
  publicKey: string,
  config: Record<string, unknown>
) => CulqiCheckoutInstance

declare global {
  interface Window {
    CulqiCheckout?: CulqiCheckoutConstructor
  }
}

let scriptPromise: Promise<void> | null = null

function loadCheckoutScript(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Culqi solo está disponible en el navegador"))
  }
  if (window.CulqiCheckout) {
    return Promise.resolve()
  }
  if (scriptPromise) {
    return scriptPromise
  }

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CHECKOUT_SCRIPT_URL}"]`
    )
    const onReady = () => {
      if (window.CulqiCheckout) {
        resolve()
      } else {
        reject(new Error("No se pudo cargar Culqi Checkout"))
      }
    }

    if (existing) {
      existing.addEventListener("load", onReady)
      existing.addEventListener("error", () =>
        reject(new Error("No se pudo cargar Culqi Checkout"))
      )
      // Script tag already present and possibly loaded.
      if (window.CulqiCheckout) {
        resolve()
      }
      return
    }

    const script = document.createElement("script")
    script.src = CHECKOUT_SCRIPT_URL
    script.async = true
    script.onload = onReady
    script.onerror = () => {
      scriptPromise = null
      reject(new Error("No se pudo cargar Culqi Checkout"))
    }
    document.body.appendChild(script)
  })

  return scriptPromise
}

export type OpenCulqiCheckoutParams = {
  publicKey: string
  /** Amount in the currency's minor unit (céntimos). */
  amountCents: number
  /** ISO currency, e.g. "PEN". */
  currency: string
  email: string
  title?: string
}

/**
 * Opens the Culqi checkout modal and resolves with the token id once the shopper
 * completes payment. Rejects if they cancel or an error occurs.
 */
export async function openCulqiCheckout(
  params: OpenCulqiCheckoutParams
): Promise<string> {
  await loadCheckoutScript()

  const CulqiCheckout = window.CulqiCheckout
  if (!CulqiCheckout) {
    throw new Error("Culqi Checkout no está disponible")
  }

  return new Promise<string>((resolve, reject) => {
    const config = {
      settings: {
        title: params.title ?? "MACH HOME",
        currency: params.currency.toUpperCase(),
        amount: params.amountCents,
      },
      client: {
        email: params.email,
      },
      options: {
        lang: "auto",
        installments: false,
        modal: true,
        // Only synchronous, token-producing methods for now (card + Yape).
        // Async methods (billetera / agente / PagoEfectivo) need an `order`
        // and webhook handling, which the provider doesn't support yet.
        paymentMethods: {
          tarjeta: true,
          yape: true,
          billetera: false,
          bancaMovil: false,
          agente: false,
          cuotealo: false,
        },
      },
      appearance: {},
    }

    const checkout = new CulqiCheckout(params.publicKey, config)

    checkout.culqi = () => {
      if (checkout.token?.id) {
        const tokenId = checkout.token.id
        checkout.close()
        resolve(tokenId)
        return
      }

      if (checkout.order) {
        checkout.close()
        reject(
          new Error(
            "Este método de pago aún no está disponible. Usa tarjeta o Yape."
          )
        )
        return
      }

      const message =
        checkout.error?.user_message ||
        checkout.error?.merchant_message ||
        "No se pudo completar el pago"
      reject(new Error(message))
    }

    checkout.open()
  })
}
