"use client"

import { Popover, PopoverButton, PopoverPanel, Transition } from "@headlessui/react"
import useToggleState from "@lib/hooks/use-toggle-state"
import { ArrowRightMini, XMark } from "@medusajs/icons"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Logo from "@modules/common/components/logo"
import { Text, clx } from "@modules/common/components/ui"
import { Fragment } from "react"
import CountrySelect from "../country-select"
import LanguageSelect from "../language-select"
import { Locale } from "@lib/data/locales"
import { STORE_NAME } from "@lib/config/brand"

type SideMenuProps = {
  regions: HttpTypes.StoreRegion[] | null
  locales: Locale[] | null
  currentLocale: string | null
  categories?: HttpTypes.StoreProductCategory[]
  logoLightUrl?: string | null
}

const staticItems = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/store" },
  { label: "Cuenta", href: "/account" },
]

const SideMenu = ({
  regions,
  locales,
  currentLocale,
  categories = [],
  logoLightUrl,
}: SideMenuProps) => {
  const countryToggleState = useToggleState()
  const languageToggleState = useToggleState()

  return (
    <div className="h-full">
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open, close }) => (
            <>
              <div className="relative flex h-full">
                <PopoverButton
                  data-testid="nav-menu-button"
                  className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:opacity-60 p-2 -ml-2"
                  aria-label="Abrir menú"
                >
                  {/* Hamburger */}
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
                  </svg>
                </PopoverButton>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-x-4"
                enterTo="opacity-100 translate-x-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-x-0"
                leaveTo="opacity-0 -translate-x-4"
              >
                <PopoverPanel className="fixed inset-0 z-[80] flex flex-col bg-ink text-cream">
                  <div
                    data-testid="nav-menu-popup"
                    className="flex flex-col h-full justify-between p-6 overflow-y-auto"
                  >
                    <div className="flex items-center justify-between">
                      {logoLightUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={logoLightUrl}
                          alt="MACH HOME"
                          className="h-9 w-auto object-contain"
                        />
                      ) : (
                        <Logo variant="cream" className="h-9" />
                      )}
                      <button
                        data-testid="close-menu-button"
                        onClick={close}
                        aria-label="Cerrar menú"
                        className="p-2"
                      >
                        <XMark />
                      </button>
                    </div>

                    <ul className="flex flex-col gap-5 items-start justify-start py-10">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <LocalizedClientLink
                            href={`/categories/${category.handle}`}
                            className="font-display text-3xl hover:opacity-60 transition-opacity"
                            onClick={close}
                          >
                            {category.name}
                          </LocalizedClientLink>
                        </li>
                      ))}
                      <li aria-hidden="true" className="w-10 border-t border-cream/20 my-2" />
                      {staticItems.map((item) => (
                        <li key={item.href}>
                          <LocalizedClientLink
                            href={item.href}
                            className="text-sm tracking-[0.15em] uppercase hover:opacity-60 transition-opacity"
                            onClick={close}
                            data-testid={`${item.label.toLowerCase()}-link`}
                          >
                            {item.label}
                          </LocalizedClientLink>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-y-6">
                      {!!locales?.length && (
                        <div
                          className="flex justify-between"
                          onMouseEnter={languageToggleState.open}
                          onMouseLeave={languageToggleState.close}
                        >
                          <LanguageSelect
                            toggleState={languageToggleState}
                            locales={locales}
                            currentLocale={currentLocale}
                          />
                          <ArrowRightMini
                            className={clx(
                              "transition-transform duration-150",
                              languageToggleState.state ? "-rotate-90" : ""
                            )}
                          />
                        </div>
                      )}
                      <div
                        className="flex justify-between"
                        onMouseEnter={countryToggleState.open}
                        onMouseLeave={countryToggleState.close}
                      >
                        {regions && (
                          <CountrySelect
                            toggleState={countryToggleState}
                            regions={regions}
                          />
                        )}
                        <ArrowRightMini
                          className={clx(
                            "transition-transform duration-150",
                            countryToggleState.state ? "-rotate-90" : ""
                          )}
                        />
                      </div>
                      <Text className="flex justify-between text-xs opacity-60">
                        © {new Date().getFullYear()} {STORE_NAME} · Todos los
                        derechos reservados
                      </Text>
                    </div>
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </div>
  )
}

export default SideMenu
