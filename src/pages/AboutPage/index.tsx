import React from 'react'
import Helmet from 'react-helmet'
import Styles from './styles/AboutPage.module.css'

interface Props {}

const AboutPage: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <Helmet></Helmet>

            {/* container */}
            <div className={Styles.container}>
            # About Me

## Who I Am
Hello! I'm DhineshKumar Thirupathi, a passionate Mobile and Full-Stack Developer with expertise in React Native, MERN stack, and cross-platform app development. With a strong foundation in software engineering, I build high-performance applications that enhance user experiences.

## Experience
I have over 10 months of experience in mobile app development, currently working as a Mobile App Developer in a global MNC. Throughout my journey, I have successfully tackled various technical challenges, including:
- AI integration with data formatting
- Offline schedule notifications
- Microphone audio recording features
- Mixpanel analytics integration
- CI/CD pipeline implementation

## Education
- **B.Tech in Information Technology**
  - RP Sarathi Institute of Technology, Salem  
  - CGPA: 8.07/10  
  - Graduated: August 2024  

## Projects
### **Notes App** *(In Progress)*
A feature-rich cross-platform notes application that offers synchronization, offline access, and cloud storage support.

### **Kalai CocoProducts - Export Business Webpage**
Designed a website for a small-scale export business specializing in coconut products, targeting bulk order exporters.

### **Software Consulting & Development Company Website**
Developed a webpage for my software consulting firm that provides web and app development services using modern technologies.

## Skills
- **Frontend:** React, React Native, SolidJS, TypeScript, JavaScript
- **Backend:** Node.js, Express, Go (Learning)
- **Databases & Cloud:** Firebase, MongoDB, GCP
- **DevOps & Tools:** Git, GitHub, CI/CD, Git Hooks, Jira, Bitbucket
- **Architecture:** MVVM, REST API Development
- **Analytics & Performance:** Firebase Analytics, Mixpanel

## What Drives Me
I thrive on solving complex problems and building efficient, scalable solutions. Apart from my professional work, I'm constantly learning new technologies and working on innovative projects. I'm also exploring freelance opportunities to expand my expertise.

Let's connect and build something amazing together!


            </div>
        </React.Fragment>
    );
}
export default AboutPage