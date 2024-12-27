import { cn } from "@/shared/lib"
import { Button } from "@/shared/ui"

export const Header = ({ downloadAsSvg }: { downloadAsSvg: () => void }) => {
  return (
    <header className="w-full">
      <Button className={cn("justify-start bg-transparent text-lg")} onClick={downloadAsSvg}>
        Download as PNG
      </Button>
    </header>
  )
}
