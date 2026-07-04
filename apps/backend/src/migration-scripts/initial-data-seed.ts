import { MedusaContainer } from "@medusajs/framework";
import {
  ContainerRegistrationKeys,
  ModuleRegistrationName,
  Modules,
} from "@medusajs/framework/utils";
import {
  createApiKeysWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createStockLocationsWorkflow,
  createStoresWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
} from "@medusajs/medusa/core-flows";

/**
 * MACH HOME base data (Perú / PEN). Runs once on `medusa db:migrate`.
 *
 * Creates the store infrastructure the storefront needs: sales channel,
 * publishable key, PEN store, Perú region, tax region, stock location,
 * fulfillment + a standard shipping option. Products, categories and CMS
 * are seeded separately and idempotently by src/scripts/seed-all.ts.
 */
export default async function initial_data_seed({
  container,
}: {
  container: MedusaContainer;
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const storeModule = container.resolve(Modules.STORE);
  const fulfillmentModuleService = container.resolve(
    ModuleRegistrationName.FULFILLMENT
  );

  logger.info("Seeding MACH HOME base (Perú/PEN)...");

  const {
    result: [salesChannel],
  } = await createSalesChannelsWorkflow(container).run({
    input: {
      salesChannelsData: [
        { name: "MACH HOME", description: "Tienda MACH HOME" },
      ],
    },
  });

  const {
    result: [publishableApiKey],
  } = await createApiKeysWorkflow(container).run({
    input: {
      api_keys: [
        {
          title: "MACH HOME Storefront",
          type: "publishable",
          created_by: "seed",
        },
      ],
    },
  });

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [salesChannel.id],
    },
  });

  // Store: PEN default. Medusa may auto-create a default store — update it if
  // present, otherwise create one.
  const supported_currencies = [
    { currency_code: "pen", is_default: true },
    { currency_code: "usd", is_default: false },
  ];
  const { data: existingStores } = await query.graph({
    entity: "store",
    fields: ["id"],
  });
  if (existingStores.length) {
    await storeModule.updateStores(existingStores[0].id, {
      name: "MACH HOME",
      supported_currencies,
      default_sales_channel_id: salesChannel.id,
    });
  } else {
    await createStoresWorkflow(container).run({
      input: {
        stores: [
          {
            name: "MACH HOME",
            supported_currencies,
            default_sales_channel_id: salesChannel.id,
          },
        ],
      },
    });
  }

  logger.info("Seeding region data...");
  const { result: regionResult } = await createRegionsWorkflow(container).run({
    input: {
      regions: [
        {
          name: "Perú",
          currency_code: "pen",
          countries: ["pe"],
          payment_providers: ["pp_system_default"],
        },
      ],
    },
  });
  const region = regionResult[0];

  await createTaxRegionsWorkflow(container).run({
    input: [{ country_code: "pe", provider_id: "tp_system" }],
  });

  logger.info("Seeding stock location data...");
  const {
    result: [stockLocation],
  } = await createStockLocationsWorkflow(container).run({
    input: {
      locations: [
        {
          name: "MACH HOME Perú",
          address: { city: "Lima", country_code: "PE", address_1: "" },
        },
      ],
    },
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_provider_id: "manual_manual" },
  });

  // Default shipping profile is created by a core migration.
  const {
    data: [shippingProfile],
  } = await query.graph({ entity: "shipping_profile", fields: ["id"] });

  const fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
    name: "Envíos Perú",
    type: "shipping",
    service_zones: [
      {
        name: "Perú",
        geo_zones: [{ country_code: "pe", type: "country" }],
      },
    ],
  });

  await link.create({
    [Modules.STOCK_LOCATION]: { stock_location_id: stockLocation.id },
    [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id },
  });

  await createShippingOptionsWorkflow(container).run({
    input: [
      {
        name: "Envío Estándar",
        price_type: "flat",
        provider_id: "manual_manual",
        service_zone_id: fulfillmentSet.service_zones[0].id,
        shipping_profile_id: shippingProfile.id,
        type: {
          label: "Estándar",
          description: "Entrega en 2-4 días.",
          code: "standard",
        },
        prices: [
          { currency_code: "pen", amount: 15 },
          { region_id: region.id, amount: 15 },
        ],
        rules: [
          { attribute: "enabled_in_store", value: "true", operator: "eq" },
          { attribute: "is_return", value: "false", operator: "eq" },
        ],
      },
    ],
  });

  await linkSalesChannelsToStockLocationWorkflow(container).run({
    input: { id: stockLocation.id, add: [salesChannel.id] },
  });

  logger.info(
    `MACH HOME base ready. Publishable key: ${publishableApiKey.token}`
  );
}
