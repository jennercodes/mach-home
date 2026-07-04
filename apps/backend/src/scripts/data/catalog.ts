// AUTO-GENERATED from templates/product-import-template.csv — do not edit by hand.
// Regenerate: node scratchpad gen-catalog.js. The MACH HOME catalog as typed data
// so it is compiled into the backend image (no CSV file needed at runtime).

export type CatalogVariant = {
  title: string
  optionValue: string
  sku?: string
  pricePen?: number
  priceUsd?: number
  weight?: number
}

export type CatalogProduct = {
  handle: string
  title?: string
  subtitle?: string
  description?: string
  material?: string
  thumbnail?: string
  images: string[]
  weight?: number
  optionTitle: string
  variants: CatalogVariant[]
}

export const CATALOG: CatalogProduct[] = [
  {
    "handle": "plumon-blanco-pol",
    "title": "Plumón Hipoalergénico",
    "description": "Consigue un descanso superior con nuestro Plumón Hipoalergénico, diseñado para brindar suavidad, abrigo y confort cada noche. Su relleno de microfibra hipoalergénica es ideal para quienes buscan una alternativa ligera y cómoda a las plumas tradicionales",
    "material": "100% Microfibra",
    "thumbnail": "https://bucket.mach-home.com/24%20Plum%C3%B3n%20Hipoalergenico/plumon1.webp",
    "images": [
      "https://bucket.mach-home.com/24%20Plum%C3%B3n%20Hipoalergenico/plumon1.webp",
      "https://bucket.mach-home.com/24%20Plum%C3%B3n%20Hipoalergenico/1.webp",
      "https://bucket.mach-home.com/24%20Plum%C3%B3n%20Hipoalergenico/4.webp",
      "https://bucket.mach-home.com/24%20Plum%C3%B3n%20Hipoalergenico/5.webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24020204011",
        "pricePen": 116.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24020204012",
        "pricePen": 140.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24020204013",
        "pricePen": 175.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24020204014",
        "pricePen": 198.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-verde-alg",
    "title": "Funda Plumón Verde Pastel",
    "description": "Nuestras fundas de plumón 100% algodón de 200 hilos brindan suavidad, frescura y confort para un descanso más cómodo cada noche. Gracias a su composición hipoalergénica y transpirable, ayudan a absorber la humedad, siendo ideales para usar durante todo el año. Además, cuentan con sujetadores internos que permiten fijar el plumón y evitar que se deslice dentro de la funda, siendo el complemento ideal para usar junto a los plumones MACH HOME.",
    "material": "100% Algodón 200 Hilos",
    "thumbnail": "https://bucket.mach-home.com/25%20Funda%20Plum%C3%B3n%20Verde%20Pastel/Verde%20Algodon.webp",
    "images": [
      "https://bucket.mach-home.com/25%20Funda%20Plum%C3%B3n%20Verde%20Pastel/Verde%20Algodon.webp",
      "https://bucket.mach-home.com/25%20Funda%20Plum%C3%B3n%20Verde%20Pastel/Verde%20Algodon%20(2).webp",
      "https://bucket.mach-home.com/25%20Funda%20Plum%C3%B3n%20Verde%20Pastel/Verde%20Algodon%20(3).webp",
      "https://bucket.mach-home.com/25%20Funda%20Plum%C3%B3n%20Verde%20Pastel/Verde%20Algodon%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24070303011",
        "pricePen": 136.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24070303012",
        "pricePen": 164.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24070303013",
        "pricePen": 198.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24070303014",
        "pricePen": 219.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-rosado-alg",
    "title": "Funda Plumón Rosado Pastel",
    "description": "Nuestras fundas de plumón 100% algodón de 200 hilos brindan suavidad, frescura y confort para un descanso más cómodo cada noche. Gracias a su composición hipoalergénica y transpirable, ayudan a absorber la humedad, siendo ideales para usar durante todo el año. Además, cuentan con sujetadores internos que permiten fijar el plumón y evitar que se deslice dentro de la funda, siendo el complemento ideal para usar junto a los plumones MACH HOME.",
    "material": "100% Algodón 200 Hilos",
    "thumbnail": "https://bucket.mach-home.com/26%20Funda%20Plum%C3%B3n%20Rosado%20Pastel/Rosado%20Algodon.webp",
    "images": [
      "https://bucket.mach-home.com/26%20Funda%20Plum%C3%B3n%20Rosado%20Pastel/Rosado%20Algodon.webp",
      "https://bucket.mach-home.com/26%20Funda%20Plum%C3%B3n%20Rosado%20Pastel/Rosado%20Algodon%20(2).webp",
      "https://bucket.mach-home.com/26%20Funda%20Plum%C3%B3n%20Rosado%20Pastel/Rosado%20Algodon%20(3).webp",
      "https://bucket.mach-home.com/26%20Funda%20Plum%C3%B3n%20Rosado%20Pastel/Rosado%20Algodon%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24130303011",
        "pricePen": 136.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24130303012",
        "pricePen": 164.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24130303013",
        "pricePen": 198.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24130303014",
        "pricePen": 219.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-azul-alg",
    "title": "Funda Plumón Azul Pastel",
    "description": "Nuestras fundas de plumón 100% algodón de 200 hilos brindan suavidad, frescura y confort para un descanso más cómodo cada noche. Gracias a su composición hipoalergénica y transpirable, ayudan a absorber la humedad, siendo ideales para usar durante todo el año. Además, cuentan con sujetadores internos que permiten fijar el plumón y evitar que se deslice dentro de la funda, siendo el complemento ideal para usar junto a los plumones MACH HOME.",
    "material": "100% Algodón 200 Hilos",
    "thumbnail": "https://bucket.mach-home.com/27%20Funda%20Plum%C3%B3n%20Azul%20Pastel/Azul%20Algodon.webp",
    "images": [
      "https://bucket.mach-home.com/27%20Funda%20Plum%C3%B3n%20Azul%20Pastel/Azul%20Algodon.webp",
      "https://bucket.mach-home.com/27%20Funda%20Plum%C3%B3n%20Azul%20Pastel/Azul%20Algodon%20(2).webp",
      "https://bucket.mach-home.com/27%20Funda%20Plum%C3%B3n%20Azul%20Pastel/Azul%20Algodon%20(3).webp",
      "https://bucket.mach-home.com/27%20Funda%20Plum%C3%B3n%20Azul%20Pastel/Azul%20Algodon%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24060303011",
        "pricePen": 136.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24060303012",
        "pricePen": 164.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24060303013",
        "pricePen": 198.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24060303014",
        "pricePen": 219.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-rosado-pes",
    "title": "Funda Plumón Rosado",
    "description": "Nuestras fundas de plumón de microfibra destacan por su suavidad, ligereza y fácil mantenimiento, brindando una experiencia de descanso cómoda y acogedora. Su tejido resistente ayuda a conservar su apariencia lavado tras lavado, mientras que sus sujetadores internos permiten fijar el plumón y evitar desplazamientos dentro de la funda. Son el complemento ideal para usar junto a los plumones MACH HOME y disfrutar de una cama siempre ordenada y confortable.",
    "material": "100% Microfibra",
    "thumbnail": "https://bucket.mach-home.com/28%20Funda%20Plum%C3%B3n%20Rosado%20Microfibra/Rosado%20Poliester.webp",
    "images": [
      "https://bucket.mach-home.com/28%20Funda%20Plum%C3%B3n%20Rosado%20Microfibra/Rosado%20Poliester.webp",
      "https://bucket.mach-home.com/28%20Funda%20Plum%C3%B3n%20Rosado%20Microfibra/Rosado%20Poliester%20(2).webp",
      "https://bucket.mach-home.com/28%20Funda%20Plum%C3%B3n%20Rosado%20Microfibra/Rosado%20Poliester%20(3).webp",
      "https://bucket.mach-home.com/28%20Funda%20Plum%C3%B3n%20Rosado%20Microfibra/Rosado%20Poliester%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24130403011",
        "pricePen": 94.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24130403012",
        "pricePen": 113.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24130403013",
        "pricePen": 132.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24130403014",
        "pricePen": 151.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-azul-pes",
    "title": "Funda Plumón Azul",
    "description": "Nuestras fundas de plumón de microfibra destacan por su suavidad, ligereza y fácil mantenimiento, brindando una experiencia de descanso cómoda y acogedora. Su tejido resistente ayuda a conservar su apariencia lavado tras lavado, mientras que sus sujetadores internos permiten fijar el plumón y evitar desplazamientos dentro de la funda. Son el complemento ideal para usar junto a los plumones MACH HOME y disfrutar de una cama siempre ordenada y confortable.",
    "material": "100% Microfibra",
    "thumbnail": "https://bucket.mach-home.com/29%20Funda%20Plum%C3%B3n%20Azul%20Microfibra/Azul%20Poliester.webp",
    "images": [
      "https://bucket.mach-home.com/29%20Funda%20Plum%C3%B3n%20Azul%20Microfibra/Azul%20Poliester.webp",
      "https://bucket.mach-home.com/29%20Funda%20Plum%C3%B3n%20Azul%20Microfibra/Azul%20Poliester%20(2).webp",
      "https://bucket.mach-home.com/29%20Funda%20Plum%C3%B3n%20Azul%20Microfibra/Azul%20Poliester%20(3).webp",
      "https://bucket.mach-home.com/29%20Funda%20Plum%C3%B3n%20Azul%20Microfibra/Azul%20Poliester%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24060403011",
        "pricePen": 94.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24060403012",
        "pricePen": 113.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24060403013",
        "pricePen": 132.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24060403014",
        "pricePen": 151.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-morado-pes",
    "title": "Funda Plumón Morado",
    "description": "Nuestras fundas de plumón de microfibra destacan por su suavidad, ligereza y fácil mantenimiento, brindando una experiencia de descanso cómoda y acogedora. Su tejido resistente ayuda a conservar su apariencia lavado tras lavado, mientras que sus sujetadores internos permiten fijar el plumón y evitar desplazamientos dentro de la funda. Son el complemento ideal para usar junto a los plumones MACH HOME y disfrutar de una cama siempre ordenada y confortable.",
    "material": "100% Microfibra",
    "thumbnail": "https://bucket.mach-home.com/30%20Funda%20Plum%C3%B3n%20Morado%20Microfibra/Morado%20Poliester.webp",
    "images": [
      "https://bucket.mach-home.com/30%20Funda%20Plum%C3%B3n%20Morado%20Microfibra/Morado%20Poliester.webp",
      "https://bucket.mach-home.com/30%20Funda%20Plum%C3%B3n%20Morado%20Microfibra/Morado%20Poliester%20(2).webp",
      "https://bucket.mach-home.com/30%20Funda%20Plum%C3%B3n%20Morado%20Microfibra/Morado%20Poliester%20(3).webp",
      "https://bucket.mach-home.com/30%20Funda%20Plum%C3%B3n%20Morado%20Microfibra/Morado%20Poliester%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24140403011",
        "pricePen": 94.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24140403012",
        "pricePen": 113.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24140403013",
        "pricePen": 132.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24140403014",
        "pricePen": 151.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-cuadrosado-alg",
    "title": "Funda Plumón Cuadros Rosa",
    "description": "Nuestras fundas de plumón 100% algodón de 200 hilos brindan suavidad, frescura y confort para un descanso más cómodo cada noche. Gracias a su composición hipoalergénica y transpirable, ayudan a absorber la humedad, siendo ideales para usar durante todo el año. Además, cuentan con sujetadores internos que permiten fijar el plumón y evitar que se deslice dentro de la funda, siendo el complemento ideal para usar junto a los plumones MACH HOME.",
    "material": "100% Algodón 200 Hilos",
    "thumbnail": "https://bucket.mach-home.com/31%20Funda%20Plum%C3%B3n%20Cuadros%20Rosado/Rosado%20Cuadros%20(1).webp",
    "images": [
      "https://bucket.mach-home.com/31%20Funda%20Plum%C3%B3n%20Cuadros%20Rosado/Rosado%20Cuadros%20(1).webp",
      "https://bucket.mach-home.com/31%20Funda%20Plum%C3%B3n%20Cuadros%20Rosado/Rosado%20Cuadros%20(2).webp",
      "https://bucket.mach-home.com/31%20Funda%20Plum%C3%B3n%20Cuadros%20Rosado/Rosado%20Cuadros%20(3).webp",
      "https://bucket.mach-home.com/31%20Funda%20Plum%C3%B3n%20Cuadros%20Rosado/Rosado%20Cuadros%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24150303011",
        "pricePen": 160.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24150303012",
        "pricePen": 193.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24150303013",
        "pricePen": 229.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24150303014",
        "pricePen": 257.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-plumas-alg",
    "title": "Funda Plumón Plumas",
    "description": "Nuestras fundas de plumón 100% algodón de 200 hilos brindan suavidad, frescura y confort para un descanso más cómodo cada noche. Gracias a su composición hipoalergénica y transpirable, ayudan a absorber la humedad, siendo ideales para usar durante todo el año. Además, cuentan con sujetadores internos que permiten fijar el plumón y evitar que se deslice dentro de la funda, siendo el complemento ideal para usar junto a los plumones MACH HOME.",
    "material": "100% Algodón 200 Hilos",
    "thumbnail": "https://bucket.mach-home.com/32%20Funda%20Plum%C3%B3n%20Plumas/Plumas.webp",
    "images": [
      "https://bucket.mach-home.com/32%20Funda%20Plum%C3%B3n%20Plumas/Plumas.webp",
      "https://bucket.mach-home.com/32%20Funda%20Plum%C3%B3n%20Plumas/Plumas%20(2).webp",
      "https://bucket.mach-home.com/32%20Funda%20Plum%C3%B3n%20Plumas/Plumas%20(3).webp",
      "https://bucket.mach-home.com/32%20Funda%20Plum%C3%B3n%20Plumas/Plumas%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24160303011",
        "pricePen": 160.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24160303012",
        "pricePen": 193.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24160303013",
        "pricePen": 229.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24160303014",
        "pricePen": 257.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-squares-alg",
    "title": "Funda Plumón Squares",
    "description": "Nuestras fundas de plumón 100% algodón de 200 hilos brindan suavidad, frescura y confort para un descanso más cómodo cada noche. Gracias a su composición hipoalergénica y transpirable, ayudan a absorber la humedad, siendo ideales para usar durante todo el año. Además, cuentan con sujetadores internos que permiten fijar el plumón y evitar que se deslice dentro de la funda, siendo el complemento ideal para usar junto a los plumones MACH HOME.",
    "material": "100% Algodón 200 Hilos",
    "thumbnail": "https://bucket.mach-home.com/33%20Funda%20Plum%C3%B3n%20Squares/Squares.webp",
    "images": [
      "https://bucket.mach-home.com/33%20Funda%20Plum%C3%B3n%20Squares/Squares.webp",
      "https://bucket.mach-home.com/33%20Funda%20Plum%C3%B3n%20Squares/Squares%20(2).webp",
      "https://bucket.mach-home.com/33%20Funda%20Plum%C3%B3n%20Squares/Squares%20(3).webp",
      "https://bucket.mach-home.com/33%20Funda%20Plum%C3%B3n%20Squares/Squares%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24170303011",
        "pricePen": 160.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24170303012",
        "pricePen": 193.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24170303013",
        "pricePen": 229.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24170303014",
        "pricePen": 257.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-cuadazul-alg",
    "title": "Funda Plumón Cuadros Azul",
    "description": "Nuestras fundas de plumón 100% algodón de 200 hilos brindan suavidad, frescura y confort para un descanso más cómodo cada noche. Gracias a su composición hipoalergénica y transpirable, ayudan a absorber la humedad, siendo ideales para usar durante todo el año. Además, cuentan con sujetadores internos que permiten fijar el plumón y evitar que se deslice dentro de la funda, siendo el complemento ideal para usar junto a los plumones MACH HOME.",
    "material": "100% Algodón 200 Hilos",
    "thumbnail": "https://bucket.mach-home.com/34%20Funda%20Plum%C3%B3n%20Cuadros%20Azul/Cuadros%20Azul.webp",
    "images": [
      "https://bucket.mach-home.com/34%20Funda%20Plum%C3%B3n%20Cuadros%20Azul/Cuadros%20Azul.webp",
      "https://bucket.mach-home.com/34%20Funda%20Plum%C3%B3n%20Cuadros%20Azul/Cuadros%20Azul%20(2).webp",
      "https://bucket.mach-home.com/34%20Funda%20Plum%C3%B3n%20Cuadros%20Azul/Cuadros%20Azul%20(3).webp",
      "https://bucket.mach-home.com/34%20Funda%20Plum%C3%B3n%20Cuadros%20Azul/Cuadros%20Azul%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24180303011",
        "pricePen": 160.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24180303012",
        "pricePen": 193.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24180303013",
        "pricePen": 229.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24180303014",
        "pricePen": 257.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-rayasclasicasbn-pes",
    "title": "Funda Plumón Rayas Clasicas",
    "description": "Nuestras fundas de plumón de microfibra destacan por su suavidad, ligereza y fácil mantenimiento, brindando una experiencia de descanso cómoda y acogedora. Su tejido resistente ayuda a conservar su apariencia lavado tras lavado, mientras que sus sujetadores internos permiten fijar el plumón y evitar desplazamientos dentro de la funda. Son el complemento ideal para usar junto a los plumones MACH HOME y disfrutar de una cama siempre ordenada y confortable.",
    "material": "100% Microfibra",
    "thumbnail": "https://bucket.mach-home.com/36%20Funda%20Plum%C3%B3n%20Rayas%20Clasicas%20BN/Rayas%20Clasicas%20B_N.webp",
    "images": [
      "https://bucket.mach-home.com/36%20Funda%20Plum%C3%B3n%20Rayas%20Clasicas%20BN/Rayas%20Clasicas%20B_N.webp",
      "https://bucket.mach-home.com/36%20Funda%20Plum%C3%B3n%20Rayas%20Clasicas%20BN/Rayas%20Clasicas%20B_N%20(2).webp",
      "https://bucket.mach-home.com/36%20Funda%20Plum%C3%B3n%20Rayas%20Clasicas%20BN/Rayas%20Clasicas%20B_N%20(3).webp",
      "https://bucket.mach-home.com/36%20Funda%20Plum%C3%B3n%20Rayas%20Clasicas%20BN/Rayas%20Clasicas%20B_N%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24190403011",
        "pricePen": 98.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24190403012",
        "pricePen": 118.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24190403013",
        "pricePen": 138.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24190403014",
        "pricePen": 158.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-vichyarcilla-pes",
    "title": "Funda Plumón Vichy Arcilla",
    "description": "Nuestras fundas de plumón de microfibra destacan por su suavidad, ligereza y fácil mantenimiento, brindando una experiencia de descanso cómoda y acogedora. Su tejido resistente ayuda a conservar su apariencia lavado tras lavado, mientras que sus sujetadores internos permiten fijar el plumón y evitar desplazamientos dentro de la funda. Son el complemento ideal para usar junto a los plumones MACH HOME y disfrutar de una cama siempre ordenada y confortable.",
    "material": "100% Microfibra",
    "thumbnail": "https://bucket.mach-home.com/35%20Funda%20Plum%C3%B3n%20Vichi%20Arcilla/Vichy%20Arcilla.webp",
    "images": [
      "https://bucket.mach-home.com/35%20Funda%20Plum%C3%B3n%20Vichi%20Arcilla/Vichy%20Arcilla.webp",
      "https://bucket.mach-home.com/35%20Funda%20Plum%C3%B3n%20Vichi%20Arcilla/Vichy%20Arcilla%20(2).webp",
      "https://bucket.mach-home.com/35%20Funda%20Plum%C3%B3n%20Vichi%20Arcilla/Vichy%20Arcilla%20(3).webp",
      "https://bucket.mach-home.com/35%20Funda%20Plum%C3%B3n%20Vichi%20Arcilla/Vichy%20Arcilla%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24200403011",
        "pricePen": 98.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24200403012",
        "pricePen": 118.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24200403013",
        "pricePen": 138.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24200403014",
        "pricePen": 158.9
      }
    ]
  },
  {
    "handle": "fu-plumonco-vichimaritimo-pes",
    "title": "Funda Plumón Vichy Maritima",
    "description": "Nuestras fundas de plumón de microfibra destacan por su suavidad, ligereza y fácil mantenimiento, brindando una experiencia de descanso cómoda y acogedora. Su tejido resistente ayuda a conservar su apariencia lavado tras lavado, mientras que sus sujetadores internos permiten fijar el plumón y evitar desplazamientos dentro de la funda. Son el complemento ideal para usar junto a los plumones MACH HOME y disfrutar de una cama siempre ordenada y confortable.",
    "material": "100% Microfibra",
    "thumbnail": "https://bucket.mach-home.com/37%20Funda%20Plum%C3%B3n%20Vichi%20Maritimo/Vichy%20maritimo.webp",
    "images": [
      "https://bucket.mach-home.com/37%20Funda%20Plum%C3%B3n%20Vichi%20Maritimo/Vichy%20maritimo.webp",
      "https://bucket.mach-home.com/37%20Funda%20Plum%C3%B3n%20Vichi%20Maritimo/Vichy%20maritimo%20(2).webp",
      "https://bucket.mach-home.com/37%20Funda%20Plum%C3%B3n%20Vichi%20Maritimo/Vichy%20maritimo%20(3).webp",
      "https://bucket.mach-home.com/37%20Funda%20Plum%C3%B3n%20Vichi%20Maritimo/Vichy%20maritimo%20(4).webp"
    ],
    "optionTitle": "Tamaño",
    "variants": [
      {
        "title": "1.5 plz",
        "optionValue": "1.5 plz",
        "sku": "24180403011",
        "pricePen": 98.9
      },
      {
        "title": "2 plz",
        "optionValue": "2 plz",
        "sku": "24180403012",
        "pricePen": 118.9
      },
      {
        "title": "Queen",
        "optionValue": "Queen",
        "sku": "24180403013",
        "pricePen": 138.9
      },
      {
        "title": "King",
        "optionValue": "King",
        "sku": "24180403014",
        "pricePen": 158.9
      }
    ]
  }
]
