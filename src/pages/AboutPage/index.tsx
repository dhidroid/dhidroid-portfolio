import React from 'react'
import Helmet from 'react-helmet'
import Styles from './styles/AboutPage.module.css'

interface Props {}

const AboutPage: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <Helmet></Helmet>

            {/* container */}
            <div className={Styles.container}></div>
        </React.Fragment>
    );
}
export default AboutPage