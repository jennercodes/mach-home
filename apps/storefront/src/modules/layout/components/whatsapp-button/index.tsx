type WhatsAppButtonProps = {
  enabled?: boolean
  phone?: string
  message?: string
  tooltip?: string
}

/**
 * Floating WhatsApp button shown site-wide. Managed from the admin
 * (Contenido del sitio → WhatsApp). Renders nothing when disabled or when no
 * phone number is configured, so it never links to a broken chat.
 */
const WhatsAppButton = ({
  enabled = true,
  phone = "",
  message = "",
  tooltip,
}: WhatsAppButtonProps) => {
  // wa.me expects digits only; tolerate "+51 987 654 321" style input.
  const digits = phone.replace(/\D/g, "")

  if (!enabled || !digits) {
    return null
  }

  const href = `https://wa.me/${digits}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      data-testid="whatsapp-button"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-x-3 pb-[env(safe-area-inset-bottom)]"
    >
      {tooltip && (
        <span className="hidden rounded-full bg-white px-3 py-2 text-sm font-medium text-ink shadow-lg ring-1 ring-black/5 sm:group-hover:inline-block">
          {tooltip}
        </span>
      )}
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 ease-out group-hover:scale-105 group-focus-visible:scale-105">
        <svg
          viewBox="0 0 32 32"
          className="h-7 w-7"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M16.003 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.257.59 4.46 1.71 6.4L3.2 28.8l6.57-1.72a12.74 12.74 0 0 0 6.23 1.6h.005c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.72 12.72 0 0 0 16.003 3.2Zm0 23.36h-.004a10.57 10.57 0 0 1-5.386-1.475l-.386-.23-3.9 1.022 1.04-3.8-.252-.39a10.56 10.56 0 0 1-1.62-5.617c0-5.867 4.774-10.64 10.64-10.64a10.56 10.56 0 0 1 7.52 3.117 10.56 10.56 0 0 1 3.116 7.526c0 5.867-4.773 10.64-10.628 10.64Zm5.83-7.965c-.32-.16-1.89-.933-2.183-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.253-.187.213-.373.24-.693.08-.32-.16-1.35-.498-2.57-1.586-.95-.847-1.592-1.893-1.778-2.213-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.734-.986-2.374-.26-.623-.523-.539-.72-.549l-.613-.011a1.18 1.18 0 0 0-.853.4c-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.146 3.093 1.306 3.307.16.213 2.253 3.44 5.46 4.826.763.33 1.358.527 1.822.674.766.244 1.463.21 2.014.127.614-.092 1.89-.773 2.156-1.52.267-.746.267-1.386.187-1.52-.08-.133-.293-.213-.613-.373Z" />
        </svg>
      </span>
    </a>
  )
}

export default WhatsAppButton
