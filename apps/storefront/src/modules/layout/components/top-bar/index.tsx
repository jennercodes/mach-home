import { TOPBAR_TEXT } from "@lib/config/brand"
import { getSection } from "@lib/data/site"

const TopBar = async () => {
  const { text } = await getSection("topbar", { text: TOPBAR_TEXT })

  return (
    <div className="bg-ink text-cream text-center px-4 py-2.5 text-xs tracking-[0.08em]">
      {text}
    </div>
  )
}

export default TopBar
