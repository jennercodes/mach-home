import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
}

const Overview = ({ customer, orders }: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper">
      <div className="hidden small:block">
        <div className="flex justify-between items-end mb-6">
          <span
            className="font-display text-3xl font-light tracking-[-0.02em]"
            data-testid="welcome-message"
            data-value={customer?.first_name}
          >
            Hola, {customer?.first_name}
          </span>
          <span className="text-[13px] text-sand font-light">
            Sesión iniciada como:{" "}
            <span
              className="font-medium text-ink"
              data-testid="customer-email"
              data-value={customer?.email}
            >
              {customer?.email}
            </span>
          </span>
        </div>
        <div className="flex flex-col py-8 border-t border-line">
          <div className="flex flex-col gap-y-4 h-full col-span-1 row-span-2 flex-1">
            <div className="flex items-start gap-x-16 mb-6">
              <div className="flex flex-col gap-y-3">
                <h3 className="eyebrow text-sand">Perfil</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="font-display text-4xl font-light leading-none"
                    data-testid="customer-profile-completion"
                    data-value={getProfileCompletion(customer)}
                  >
                    {getProfileCompletion(customer)}%
                  </span>
                  <span className="uppercase text-[11px] tracking-[0.15em] text-sand">
                    completado
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-3">
                <h3 className="eyebrow text-sand">Direcciones</h3>
                <div className="flex items-end gap-x-2">
                  <span
                    className="font-display text-4xl font-light leading-none"
                    data-testid="addresses-count"
                    data-value={customer?.addresses?.length || 0}
                  >
                    {customer?.addresses?.length || 0}
                  </span>
                  <span className="uppercase text-[11px] tracking-[0.15em] text-sand">
                    guardadas
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <h3 className="font-display text-2xl font-light tracking-[-0.02em]">
                Pedidos recientes
              </h3>
              <ul
                className="flex flex-col gap-y-3"
                data-testid="orders-wrapper"
              >
                {orders && orders.length > 0 ? (
                  orders.slice(0, 5).map((order) => {
                    return (
                      <li
                        key={order.id}
                        data-testid="order-wrapper"
                        data-value={order.id}
                      >
                        <LocalizedClientLink
                          href={`/account/orders/details/${order.id}`}
                        >
                          <div className="bg-cream/60 hover:bg-cream transition-colors flex justify-between items-center p-4 border border-line">
                            <div className="grid grid-cols-3 grid-rows-2 text-[13px] gap-x-4 flex-1">
                              <span className="eyebrow !text-[10px] text-sand">
                                Fecha
                              </span>
                              <span className="eyebrow !text-[10px] text-sand">
                                Nº de pedido
                              </span>
                              <span className="eyebrow !text-[10px] text-sand">
                                Total
                              </span>
                              <span data-testid="order-created-date">
                                {new Date(order.created_at).toLocaleDateString(
                                  "es-PE",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                              </span>
                              <span
                                data-testid="order-id"
                                data-value={order.display_id}
                              >
                                #{order.display_id}
                              </span>
                              <span data-testid="order-amount">
                                {convertToLocale({
                                  amount: order.total,
                                  currency_code: order.currency_code,
                                })}
                              </span>
                            </div>
                            <button
                              className="flex items-center justify-between"
                              data-testid="open-order-button"
                            >
                              <span className="sr-only">
                                Ver pedido #{order.display_id}
                              </span>
                              <ChevronDown className="-rotate-90" />
                            </button>
                          </div>
                        </LocalizedClientLink>
                      </li>
                    )
                  })
                ) : (
                  <span
                    className="text-sm text-sand font-light"
                    data-testid="no-orders-message"
                  >
                    Aún no tienes pedidos
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
