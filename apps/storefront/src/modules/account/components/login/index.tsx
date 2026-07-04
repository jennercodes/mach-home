import { login } from "@lib/data/customer"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import ErrorMessage from "@modules/checkout/components/error-message"
import { SubmitButton } from "@modules/checkout/components/submit-button"
import Input from "@modules/common/components/input"
import { useActionState } from "react"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [message, formAction] = useActionState(login, null)

  return (
    <div
      className="max-w-sm w-full flex flex-col items-center"
      data-testid="login-page"
    >
      <div className="eyebrow text-sand mb-3">Mi cuenta</div>
      <h1 className="font-display text-4xl font-light tracking-[-0.02em] mb-4">
        Bienvenido de vuelta
      </h1>
      <p className="text-center text-sm text-ink-soft font-light mb-8">
        Inicia sesión para acceder a una mejor experiencia de compra.
      </p>
      <form className="w-full" action={formAction}>
        <div className="flex flex-col w-full gap-y-2">
          <Input
            label="Email"
            name="email"
            type="email"
            title="Ingresa un email válido."
            autoComplete="email"
            required
            data-testid="email-input"
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            data-testid="password-input"
          />
        </div>
        <ErrorMessage error={message} data-testid="login-error-message" />
        <SubmitButton data-testid="sign-in-button" className="w-full mt-6">
          Iniciar sesión
        </SubmitButton>
      </form>
      <span className="text-center text-ink-soft text-[13px] font-light mt-6">
        ¿Aún no tienes cuenta?{" "}
        <button
          onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
          className="underline underline-offset-4 text-ink"
          data-testid="register-button"
        >
          Regístrate
        </button>
        .
      </span>
    </div>
  )
}

export default Login
