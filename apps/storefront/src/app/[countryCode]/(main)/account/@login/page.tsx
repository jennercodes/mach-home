import { Metadata } from "next"

import LoginTemplate from "@modules/account/templates/login-template"

export const metadata: Metadata = {
  title: "Iniciar sesión | MACH HOME",
  description: "Inicia sesión en tu cuenta MACH HOME.",
}

export default function Login() {
  return <LoginTemplate />
}
