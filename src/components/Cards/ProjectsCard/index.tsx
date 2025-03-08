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
            <div onClick={() => window.open(link)} className={Style.left}>
                <img className={Style.image} src={projectImage} alt={projectImage} />
            </div>

            {/* right content */}
            <div onClick={() => window.open(link)} className={Style.right}>
                {/* catagree */}
                <div className={Style.catagreeContainer}>
                    {catagrees?.map((data, index) => (
                        <p className={Style.catagreeText} key={index}>{data}</p>
                    ))}
                </div>
                {/* title */}
                <h1 onClick={() => window.open(link)} className={Style.title}>{projectTitle}</h1>
                <p onClick={() => window.open(link)} className={Style.des}>{projectDes}</p>

                <div>
                    <CtaButton title="View Details" onPress={onPress} />
                </div>
            </div>
        </div>
    );
}

export default ProjectCard