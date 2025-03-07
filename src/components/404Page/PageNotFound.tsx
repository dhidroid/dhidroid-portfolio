import { Cat404 } from "@404pagez/react";
import { useNavigate } from "react-router";

const PageNotFound = () => {
    const navigation = useNavigate()
    return (
        <div style={{ height: "70vh", justifyContent: "center", display: "flex", alignItems: "center", alignSelf: "center" }}>
            <Cat404 size={20} isButton  buttonLabel="Go Back buddy !!" onButtonClick={() => navigation('/')} />
        </div>
    );
};

export default PageNotFound;
