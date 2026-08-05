import React from "react";
import { Loader2 } from "lucide-react";

export const Loader = (): React.JSX.Element => {
  return (
    <div className="fixed inset-0 bg-[#FAF8F5] dark:bg-[#0C0C0E] z-[9999] flex items-center justify-center select-none transition-colors duration-300">
      <Loader2 className="w-12 h-12 md:w-14 md:h-14 text-[#5235F6] animate-spin stroke-[2.5]" />
    </div>
  );
};

export default Loader;