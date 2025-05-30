import React, { StrictMode } from "react"
import { HomePageStyle } from "./styles"

interface Types { }

const HomeScreen: React.FC<Types> = () => {
    return (
        <StrictMode>
            <React.Fragment>
                <div className={HomePageStyle.root}>
                {/* top title */}

                {/* middle */}

                {/* body */}

                {/* cta */}
                
                {/* cards */}
                </div>
            </React.Fragment>
        </StrictMode>
    )
}

export default HomeScreen