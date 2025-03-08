import React from 'react';
import Style from './EducationWorkCard.module.css'


interface Props {
    mainTitle: string;
    Icon: React.ElementType;
    data: any[],
    key?: React.Key
}

const EducationCard: React.FC<Props> = ({
    mainTitle, Icon, data, key
}) => {
    return (
        <div key={key} className={Style.container}>
            {/* title */}
            <div className={Style.titleContainer}>
                {/* icon */}
                <div className={Style.iconContainer}>
                    <Icon color='white' size={30} />
                </div>
                {/* title */}
                <h1>{mainTitle}</h1>
            </div>

            {data?.map((value, index) => (
                < div onClick={() => window.open(value.link)} style={{ cursor: "pointer" }} key={index} className={Style.dataContainer} >
                    <div className={Style.dataInnerContainer}>
                        <p className={Style.dataTitle}>{value.title}</p>
                        <p className={Style.dataDes}>{value.des}</p>
                    </div>
                    < div className={Style.dataDateContainer} >
                        < p > {value.duration}</p>
                    </div >
                </div >
            ))}

        </div >
    )
}
export default EducationCard