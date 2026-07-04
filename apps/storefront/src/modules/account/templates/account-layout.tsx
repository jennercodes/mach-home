import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 small:py-12" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-5xl mx-auto bg-white flex flex-col">
        <div
          className={
            customer
              ? "grid grid-cols-1 small:grid-cols-[240px_1fr] py-12 gap-8"
              : "py-12"
          }
        >
          {customer && (
            <div>
              <AccountNav customer={customer} />
            </div>
          )}
          <div className="flex-1">{children}</div>
        </div>
        <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-line py-12 gap-8">
          <div>
            <h3 className="font-display text-2xl font-light tracking-[-0.02em] mb-3">
              ¿Tienes preguntas?
            </h3>
            <span className="text-sm text-ink-soft font-light">
              Encuentra respuestas a las preguntas más frecuentes en nuestra
              página de atención al cliente.
            </span>
          </div>
          <div>
            <UnderlineLink href="/atencion-al-cliente">
              Atención al cliente
            </UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
