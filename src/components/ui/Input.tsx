import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border px-4 py-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default:
          "border-input bg-background placeholder:text-muted-foreground disabled:opacity-50",
        themed:
          "bg-white/10 border-white/20 text-white placeholder-white/50 focus-visible:ring-blue-500 disabled:bg-white/5 disabled:border-white/10 disabled:text-white/70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, error, ...props }, ref) => {
    const errorClasses = error
      ? "border-red-500 focus-visible:ring-red-500"
      : ""
    const themedErrorClasses =
      error && variant === "themed"
        ? "border-red-500 focus-visible:ring-red-500"
        : ""

    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant }),
          error && variant !== "themed" ? errorClasses : "",
          themedErrorClasses,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
