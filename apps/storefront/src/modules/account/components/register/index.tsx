"use client"

import { useActionState } from "react"
import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { signup } from "@lib/data/customer"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(signup as (state: string | null, formData: FormData) => Promise<string | null>, null as string | null)

  return (
    <div
      className="max-w-sm flex flex-col items-center"
      data-testid="register-page"
    >
      <div className="eyebrow text-sand mb-3">Mi cuenta</div>
      <h1 className="font-display text-4xl font-light tracking-[-0.02em] mb-4 text-center">
        Crea tu cuenta
      </h1>
      <p className="text-center text-sm text-ink-soft font-light mb-6">
        Crea tu perfil MACH HOME y accede a una mejor experiencia de compra.
      </p>
      <form className="w-full flex flex-col" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Nombres"
            name="first_name"
            required
            autoComplete="given-name"
            data-testid="first-name-input"
          />
          <Input
            label="Apellidos"
            name="last_name"
            required
            autoComplete="family-name"
            data-testid="last-name-input"
          />
          <Input
            label="Email"
            name="email"
            required
            type="email"
            autoComplete="email"
            data-testid="email-input"
          />
          <Input
            label="Celular"
            name="phone"
            type="tel"
            autoComplete="tel"
            data-testid="phone-input"
          />
          <Input
            label="Contraseña"
            name="password"
            required
            type="password"
            autoComplete="new-password"
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="register-error" />
        <span className="text-center text-ink-soft text-[13px] font-light mt-6">
          Al crear una cuenta aceptas la{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline underline-offset-4 text-ink"
          >
            Política de privacidad
          </LocalizedClientLink>{" "}
          y los{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline underline-offset-4 text-ink"
          >
            Términos y condiciones
          </LocalizedClientLink>{" "}
          de MACH HOME.
        </span>
        <SubmitButton className="w-full mt-6" data-testid="register-button">
          Crear cuenta
        </SubmitButton>
      </form>
      <span className="text-center text-ink-soft text-[13px] font-light mt-6">
        ¿Ya tienes cuenta?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
          className="underline underline-offset-4 text-ink"
        >
          Inicia sesión
        </button>
        .
      </span>
    </div>
  )
}

export default Register
