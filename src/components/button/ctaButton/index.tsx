import { BsArrowRight } from "react-icons/bs";
import './ctaButtinStyle.module.css'

const CtaButton = ({ title, onPress, colour }: any) => {
    return (
        <a style={{ backgroundColor: colour ? colour : 'white', color: colour ? "white" : "black" }} onClick={onPress}>
            <div style={{ backgroundColor: "#5315FC", display: "flex", justifyContent: "center", alignItems: "center", padding: "10px", borderRadius: "100px" }}>
                <BsArrowRight color="white" />
            </div>
            {title}
        </a>
    )
}

export default CtaButton
