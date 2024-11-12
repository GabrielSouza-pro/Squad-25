"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex items-center justify-between h-6 w-12 p-1 rounded-full cursor-pointer transition-colors duration-300 ease-in-out transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        // Cor de fundo para o estado ativado (verde RGB) e desativado (branco)
        "bg-white data-[state=checked]:bg-[rgb(94,254,65)] data-[state=unchecked]:bg-gray-200",
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "block w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out transform",
          // Movimento do thumb quando o switch está ativado (verde) e desativado (branco)
          "data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  )
)

Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
