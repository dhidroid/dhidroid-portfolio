import React from 'react'
import { Container } from '../../components'
import { Helmet } from 'react-helmet'

const SkillsPage: React.FC = () => {
  const skills = [
    { title: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Accessibility'] },
    { title: 'Backend', items: ['Node.js', 'Express', 'Go', 'Sanity', 'Postgres'] },
    { title: 'Mobile', items: ['React Native', 'Expo', 'Kotlin (Jetpack Compose)'] },
    { title: 'DevOps & CI', items: ['Docker', 'GitHub Actions', 'Vercel', 'CI/CD'] },
  ]

  return (
    <React.Fragment>
      <Helmet>
        <title>Skills • Dhidroid</title>
        <meta name="description" content="Skills and expertise" />
      </Helmet>

      <Container className="py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-4">Skills & Expertise</h1>
          <p className="text-muted mb-8">Technical skills I use to build production-ready web and mobile applications.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((s) => (
            <div key={s.title} className="bg-bg-card border border-border-light rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-3">{s.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="px-3 py-1 rounded-full bg-[#141420] text-sm text-secondary border border-[#3A3A4F]">{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center text-muted">
          <p>I enjoy learning new tech, simplifying complex problems, teaching, and building delightful user experiences.</p>
        </div>
      </Container>
    </React.Fragment>
  )
}

export default SkillsPage
