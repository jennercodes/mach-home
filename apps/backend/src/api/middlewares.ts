import { defineMiddlewares } from "@medusajs/framework/http"
import { contentPagesMiddlewares } from "./admin/content-pages/middlewares"
import { siteSectionsMiddlewares } from "./admin/site-sections/middlewares"

export default defineMiddlewares({
  routes: [...contentPagesMiddlewares, ...siteSectionsMiddlewares],
})
