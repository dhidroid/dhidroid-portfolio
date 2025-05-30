import { BsArrowRight } from "react-icons/bs";

interface CtaButtonProps {
    title: string;
    onPress: () => void;
    colour?: string;
}

const CtaButton = ({ title, onPress, colour }: CtaButtonProps) => {
    const buttonStyles = {
        fontSize: '1rem',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'color 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
        gap: '5px',
        backgroundColor: colour ? colour : 'white',
        color: colour ? "white" : "black",
        borderRadius: '100px',
        padding: '2px 1px',
        paddingRight: '10px',
        textDecoration: 'none',
        border: 'none'
    };

    const iconContainerStyles = {
        backgroundColor: "#5315FC",
        display: "flex",
        justifyContent: "center" as const,
        alignItems: "center" as const,
        padding: "10px",
        borderRadius: "100px"
    };

    return (
        <button 
            style={buttonStyles}
            onClick={onPress}
            onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--secondary-color)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.color = colour ? "white" : "black";
            }}
        >
            <div style={iconContainerStyles}>
                <BsArrowRight color="white" />
            </div>
            {title}
        </button>
    )
}

export default CtaButton