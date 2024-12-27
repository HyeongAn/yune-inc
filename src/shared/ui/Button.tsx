import React, { ButtonHTMLAttributes } from "react"
import { cn } from "@/shared/lib"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "inline-flex w-full items-center justify-center bg-slate-100 text-sm font-medium text-gray-800",
        className
      )}
      {...props}
      ref={ref}
    />
  )
})
