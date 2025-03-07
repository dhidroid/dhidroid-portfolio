import React from 'react'
import ServiceStyle from './style/serviceCard.module.css'
import { BsArrowRight } from "react-icons/bs";
interface ServiceCardProps {
    Icon: React.ElementType,
    title: string,
    description: string,
    learnMoreButton?: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ Icon, title, description, learnMoreButton }) => {
    return (
        <div className={ServiceStyle.cardContainer}>
            {/* icon */}
            <div className={ServiceStyle.iconContainer}>
                <Icon size={50} />
            </div>

            {/* title */}
            <h1 className={ServiceStyle.title}>{title}</h1>

            {/* card details */}
            <div>
                <span className={ServiceStyle.description}>{description}</span>
                <p className={ServiceStyle.learnMore} onClick={learnMoreButton}>Learn more <BsArrowRight /></p>
            </div>

        </div>
    )
}

export default ServiceCard