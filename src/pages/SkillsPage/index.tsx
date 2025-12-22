import React from "react";
import SEO from "../../components/SEO";
import { generateMetaForRoute } from '../../utils/seo';
import { Container } from "../../components/ui/Container";
import { Badge } from "../../components/ui/Badge";
import { Code2, Server, Database, Terminal } from "lucide-react";

// Mock Data - Replace with Sanity fetch if needed
const skillCategories = [
  {
    title: "Frontend Development",
    icon: Code2,
    skills: [
      { name: "React.js", desc: "Component-based UI library" },
      { name: "Next.js", desc: "React framework for production" },
      { name: "TypeScript", desc: "Typed JavaScript" },
      { name: "Tailwind CSS", desc: "Utility-first CSS framework" },
    ]
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: [
      { name: "Node.js", desc: "JavaScript runtime" },
      { name: "Python", desc: "Versatile programming language" },
      { name: "Go", desc: "Efficient compiled language" },
      { name: "GraphQL", desc: "Query language for APIs" },
    ]
  },
  {
    title: "Database & Cloud",
    icon: Database,
    skills: [
      { name: "PostgreSQL", desc: "Relational database" },
      { name: "MongoDB", desc: "NoSQL database" },
      { name: "AWS", desc: "Cloud computing services" },
      { name: "Firebase", desc: "App development platform" },
    ]
  },
  {
    title: "Mobile & Tools",
    icon: Terminal,
    skills: [
      { name: "React Native", desc: "Cross-platform mobile apps" },
      { name: "Swift", desc: "iOS development" },
      { name: "Kotlin", desc: "Android development" },
      { name: "Docker", desc: "Containerization platform" },
    ]
  }
];

const SkillsPage = () => {
  return (
      <React.Fragment>
        <SEO
          title={generateMetaForRoute('/skills').title}
          description={generateMetaForRoute('/skills').description}
          route="/skills"
        />

        <section className="pt-32 pb-24 bg-gray-50 border-b border-gray-200">
          <Container className="text-center">
            <Badge className="mb-6">Expertise</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Tools & <span className="text-primary">Technologies</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-500">
              I use a modern stack to build robust, scalable, and efficient applications.
            </p>
          </Container>
        </section>

        <section className="py-24 bg-white">
          <Container>
            <div className="grid grid-cols-1 gap-16">
              {skillCategories.map((category) => (
                <div key={category.title}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <category.icon size={24} />
                    </div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                  </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                              {category.skills.map((skill) => (
                                <div key={skill.name} className="p-6 rounded-2xl border border-gray-100 bg-white hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{skill.name}</h3>
                                  <p className="text-sm text-gray-500">{skill.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
            </div>
          </Container>
        </section>
      </React.Fragment>
    );
};

export default SkillsPage;
