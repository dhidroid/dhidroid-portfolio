import React from "react";
import { cn } from "../../utils/cn";

interface Props {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const SectionWrapper = ({ children, className, id }: Props) => {
  return (
    <section id={id} className={cn("relative w-full py-24 md:py-32 overflow-hidden", className)}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {children}
      </div>
    </section>
  );
};
