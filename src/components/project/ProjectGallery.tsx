import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/motion";

interface ProjectGalleryProps {
  images?: { asset: { url: string } }[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  if (!images || images.length === 0) return null;

  // Let's group images into rows:
  // Row types:
  // - "full": single full-width image
  // - "grid": two side-by-side images
  const rows: { type: "full" | "grid"; items: { asset: { url: string } }[] }[] = [];
  
  let i = 0;
  while (i < images.length) {
    if (i % 3 === 0) {
      rows.push({ type: "full", items: [images[i]] });
      i += 1;
    } else {
      const nextItems = images.slice(i, i + 2);
      rows.push({ type: "grid", items: nextItems });
      i += nextItems.length;
    }
  }

  return (
    <div className="flex flex-col gap-8 md:gap-12 max-w-[1800px] mx-auto">
      {rows.map((row, rowIndex) => {
        if (row.type === "full") {
          const img = row.items[0];
          return (
            <motion.div
              key={`row-${rowIndex}`}
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-10%" }}
              className="relative w-full aspect-[21/9] md:aspect-[2.35/1] overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-border rounded-sm"
            >
              <img
                src={img.asset.url}
                alt={`Project feature visualization ${rowIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          );
        } else {
          return (
            <div key={`row-${rowIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {row.items.map((img, colIndex) => (
                <motion.div
                  key={`row-${rowIndex}-col-${colIndex}`}
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, margin: "-10%" }}
                  className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-border rounded-sm"
                >
                  <img
                    src={img.asset.url}
                    alt={`Project detailed visualization ${rowIndex + 1}-${colIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          );
        }
      })}
    </div>
  );
};

export default ProjectGallery;
