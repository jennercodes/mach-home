import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import CulqiProviderService from "./service"

export default ModuleProvider(Modules.PAYMENT, {
  services: [CulqiProviderService],
})
