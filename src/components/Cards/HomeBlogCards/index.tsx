import React, { useState } from 'react';
import moment from 'moment';
import Style from './BlogCard.module.css';
import { GoDotFill } from "react-icons/go";
import { IoLinkOutline } from "react-icons/io5";


interface Props {
    BlogImage: string | any;
    Category: string;
    BlogTitle: string;
    author: string;
    date: Date;
    onPress: () => void
}

const HomeBlogCard: React.FC<Props> = ({
    BlogImage, BlogTitle, Category, author, date, onPress
}) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div onClick={onPress} className={Style.container}>
            <div
                className={Style.imageContainer}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered && (
                    <div className={Style.linkIcon}>
                        <IoLinkOutline color='white' size={30} />
                    </div>
                )}
                <img src={BlogImage} alt={BlogImage} />
            </div>
            <div className={Style.catagreeContainer}>
                <p>{Category}</p>
            </div>
            <div className={Style.titleContainer}>
                <h1>{BlogTitle}</h1>
            </div>
            <div className={Style.authorContainer}>
                <div>
                    <GoDotFill color="#5315FC" />
                    <p className={Style.author}>{author}</p>
                </div>
                <div>
                    <GoDotFill color="#5315FC" />
                    <p className={Style.date}>{moment(`${date}`).format("DD MMM YYYY")}</p>
                </div>
            </div>
        </div>
    );
}

export default HomeBlogCard;
