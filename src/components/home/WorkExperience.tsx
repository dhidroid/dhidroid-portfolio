import React from "react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { PortfolioContent } from "../../utils/Data/portfolioContent";

export interface ExperienceItem {
  id?: string | number;
  company: string;
  role: string;
  period: string;
  location?: string;
  achievements?: string[];
  tags?: string[];
}

interface WorkExperienceProps {
  experiences?: ExperienceItem[];
  title?: string;
  subtitle?: React.ReactNode;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ 
    experiences,
    title = "Experience",
    subtitle = <h2 className="text-3xl md:text-4xl font-bold text-gray-900">My Professional <span className="text-primary">Journey</span></h2>
}) => {
    // Use props if provided, otherwise fallback to PortfolioContent
    const displayData: ExperienceItem[] = experiences || PortfolioContent.experience.map(exp => ({
        id: exp.id,
        company: exp.company,
        role: exp.role,
        period: exp.period,
        achievements: exp.achievements,
        tags: [] // map tags if available or remove
    }));

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 text-primary bg-primary/10 hover:bg-primary/20">{title}</Badge>
          {subtitle}
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {displayData.map((exp, index) => (
            <div 
              key={`${exp.company}-${index}`}
              className="relative group"
            >
              <div className="relative bg-white border border-gray-100 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-primary/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                            {exp.role}
                        </h3>
                        <div className="text-lg font-medium text-gray-600 mt-1">{exp.company}</div>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2 text-sm text-gray-500">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 font-medium">
                            <Calendar size={14} />
                            <span>{exp.period}</span>
                        </div>
                        {exp.location && (
                             <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                <span>{exp.location}</span>
                            </div>
                        )}
                    </div>
                </div>

                {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-3 mb-4">
                        {exp.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-600">
                                <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-1" />
                                <span className="leading-relaxed">{achievement}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-50">
                        {exp.tags.slice(0, 5).map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-gray-50 text-gray-600 border border-gray-100">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WorkExperience;
