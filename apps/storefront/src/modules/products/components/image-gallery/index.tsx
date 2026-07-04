"use client"

import { HttpTypes } from "@medusajs/types"
import { clx } from "@modules/common/components/ui"
import Image from "next/image"
import { useEffect, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

/** PDP gallery: vertical thumbnails + main 4/5 image (thumbs move below on mobile). */
const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Variant change can swap the image list — keep the index in range.
  useEffect(() => {
    setActiveIndex(0)
  }, [images])

  const activeImage = images[activeIndex] ?? images[0]

  if (!images.length) {
    return <div className="aspect-[4/5] w-full bg-cream" />
  }

  return (
    <div className="flex flex-col small:grid small:grid-cols-[80px_1fr] gap-4">
      <div className="order-2 small:order-none flex small:flex-col gap-3 overflow-x-auto no-scrollbar">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={clx(
              "relative aspect-square w-16 small:w-full shrink-0 overflow-hidden border transition-colors",
              index === activeIndex
                ? "border-ink"
                : "border-line hover:border-ink"
            )}
            aria-label={`Ver imagen ${index + 1}`}
          >
            {!!image.url && (
              <Image
                src={image.url}
                alt=""
                fill
                sizes="80px"
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        {!!activeImage?.url && (
          <Image
            src={activeImage.url}
            priority
            alt="Imagen del producto"
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-cover"
          />
        )}
      </div>
    </div>
  )
}

export default ImageGallery
