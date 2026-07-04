"use client"

import { useState } from "react"

/** Footer newsletter signup — visual only for now (no backend endpoint yet). */
const NewsletterForm = () => {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      return
    }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="text-[13px] leading-relaxed opacity-70 font-light">
        ¡Gracias! Revisa tu correo para confirmar la suscripción.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="tu@correo.com"
        aria-label="Correo electrónico"
        className="flex-1 min-w-0 px-3 py-2.5 bg-transparent border border-cream/30 text-cream text-[13px] placeholder:text-cream/40 focus:outline-none focus:border-cream"
      />
      <button
        type="submit"
        className="px-4 py-2.5 bg-cream text-ink text-[11px] tracking-[0.15em] uppercase font-semibold hover:opacity-85 transition-opacity"
      >
        Ir →
      </button>
    </form>
  )
}

export default NewsletterForm
