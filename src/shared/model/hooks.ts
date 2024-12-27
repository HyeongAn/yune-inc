import { useRef } from "react"
import { saveAs } from "file-saver"
import html2canvas from "html2canvas"

export const useDownloadAsSvg = () => {
  const ref = useRef<HTMLDivElement>(null)

  const downloadAsPng = async () => {
    if (!ref.current) return

    try {
      const div = ref.current
      const canvas = await html2canvas(div, { scale: 2 })
      canvas.toBlob(blob => {
        if (blob) {
          saveAs(blob, "yune-inc.png")
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    ref,
    downloadAsPng,
  }
}
