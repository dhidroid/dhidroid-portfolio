import React from "react";
import { motion } from "motion/react";
import styles from "./Skills.module.css";
import SEO from "../../components/SEO";
import {
  FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaGithub, FaFigma, FaAndroid, FaAppStoreIos, FaDocker, FaAws
} from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiGraphql, SiFirebase, SiRedux, SiSanity, SiVercel, SiKotlin, SiSwift, SiGo
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";

const skills = [
  { name: "React Native", icon: TbBrandReactNative, category: "Mobile" },
  { name: "React.js", icon: FaReact, category: "Frontend" },
  { name: "TypeScript", icon: SiTypescript, category: "Languages" },
  { name: "Node.js", icon: FaNodeJs, category: "Backend" },
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend" },
  { name: "JavaScript", icon: FaJs, category: "Languages" },
  { name: "HTML5", icon: FaHtml5, category: "Frontend" },
  { name: "CSS3", icon: FaCss3Alt, category: "Frontend" },
  { name: "Tailwind CSS", icon: SiTailwindcss, category: "Frontend" },
  { name: "Redux", icon: SiRedux, category: "Frontend" },
  { name: "MongoDB", icon: SiMongodb, category: "Backend" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Backend" },
  { name: "GraphQL", icon: SiGraphql, category: "Backend" },
  { name: "Firebase", icon: SiFirebase, category: "Backend" },
  { name: "Sanity.io", icon: SiSanity, category: "Backend" },
  { name: "Go", icon: SiGo, category: "Backend" },
  { name: "Android (Kotlin)", icon: SiKotlin, category: "Mobile" },
  { name: "iOS (Swift)", icon: SiSwift, category: "Mobile" },
  { name: "Git", icon: FaGitAlt, category: "Tools" },
  { name: "GitHub", icon: FaGithub, category: "Tools" },
  { name: "Figma", icon: FaFigma, category: "Tools" },
  { name: "Docker", icon: FaDocker, category: "DevOps" },
  { name: "AWS", icon: FaAws, category: "DevOps" },
  { name: "Vercel", icon: SiVercel, category: "DevOps" },
];

const SkillsPage = () => {
  // Group skills by category for better organization, or just show all as a cloud
  // The user image shows a mix, let's do a categorized view but with the pill style

  const categories = ["All", "Mobile", "Frontend", "Backend", "DevOps", "Tools"];
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className={styles.container}>
      <SEO
        title="Skills & Technologies"
        description="Explore the technical arsenal of DhineshKumar Thirupathi. Proficient in React Native, React, Node.js, and more."
        keywords={["Skills", "Tech Stack", "React Native", "React", "Node.js", "TypeScript"]}
      />

      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h1 className={styles.title}>
            My Technical <span className={styles.highlight}>Arsenal</span>
          </h1>
          <p className={styles.subtitle}>
            A curated list of technologies I use to build scalable, high-performance digital solutions.
            From pixel-perfect UIs to robust backend systems.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.skillsGrid}
          style={{ marginBottom: '20px' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.skillPill} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
              style={{ animation: 'none' }} // Disable float for filter buttons
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          layout
          className={styles.skillsGrid}
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              key={skill.name}
              className={styles.skillPill}
            >
              <span className={styles.iconWrapper}>
                <skill.icon />
              </span>
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;
