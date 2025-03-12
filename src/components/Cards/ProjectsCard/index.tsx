import React from 'react'
import Style from './ProjectCard.module.css'
import CtaButton from '../../button/ctaButton';

interface Props {
    projectImage: string,
    projectTitle: string,
    projectDes: string,
    onPress?: () => void,
    catagrees?: any[],
    link?: string
}

const ProjectCard: React.FC<Props> = ({ projectImage, projectDes, projectTitle, onPress, catagrees, link }) => {
    return (
        // main container
        <div className={Style.mainContainer}>
            {/* left image */}
            <div className={Style.left}>
                <img className={Style.image} src={projectImage} alt={projectImage} />
            </div>

            {/* right content */}
            <div className={Style.right}>
                {/* catagree */}
                <div className={Style.catagreeContainer}>
                    {catagrees?.map((data, index) => (
                        <p className={Style.catagreeText} key={index}>{data || data.title}</p>
                    ))}
                </div>
                {/* title */}
                <h1 className={Style.title}>{projectTitle}</h1>
                <p className={Style.des}>{projectDes}</p>

                <div>
                    <CtaButton title="View Details" onPress={() => window.open(link)} />
                </div>
            </div>
        </div>
    );
}

export default ProjectCard