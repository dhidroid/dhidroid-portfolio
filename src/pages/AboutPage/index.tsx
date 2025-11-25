import React from 'react'
import Helmet from 'react-helmet'
import Styles from './styles/AboutPage.module.css'
import { Container } from '../../components'
import { Link } from 'react-router'

interface Props {}

const AboutPage: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <Helmet></Helmet>

            <Container className="py-16">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">About DhineshKumar</h1>
                    <p className="text-muted mb-6">I build elegant and performant web and mobile apps with a focus on UX and maintainable code.</p>

                    <div className="flex justify-center gap-4">
                        <Link to="/skills" className="px-4 py-2 rounded-full bg-primary text-black font-medium">See my skills</Link>
                        <a className="px-4 py-2 rounded-full border border-border-medium text-secondary" href="#contact">Contact</a>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-bg-card p-6 rounded-lg border border-border-light">
                        <h3 className="text-xl font-semibold text-white mb-3">Background</h3>
                        <p className="text-muted">I have experience building web applications, REST APIs and native mobile apps. I enjoy mentoring, performance optimisations, and product-thinking.</p>
                    </div>

                    <div className="bg-bg-card p-6 rounded-lg border border-border-light">
                        <h3 className="text-xl font-semibold text-white mb-3">Experience</h3>
                        <ul className="list-disc pl-5 text-muted">
                            <li>Frontend engineering and design systems</li>
                            <li>Backend services with Go and Node.js</li>
                            <li>Mobile app development using React Native and Kotlin</li>
                        </ul>
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
}
export default AboutPage