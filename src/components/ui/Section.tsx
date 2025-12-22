import * as React from "react"
import { cn } from "../../utils/cn"

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("py-12 md:py-16 lg:py-24", className)}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Section }
