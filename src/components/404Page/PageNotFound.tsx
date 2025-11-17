import { useNavigate } from "react-router";

const PageNotFound = () => {
    const navigation = useNavigate()
    return (
        <div style={{
            height: "70vh",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            textAlign: "center",
            padding: "20px"
        }}>
            <h1 style={{ fontSize: "6rem", margin: "0", color: "#5315FC" }}>404</h1>
            <h2 style={{ fontSize: "2rem", margin: "0" }}>Page Not Found</h2>
            <p style={{ fontSize: "1.2rem", color: "#888" }}>The page you're looking for doesn't exist.</p>
            <button
                onClick={() => navigation('/')}
                style={{
                    padding: "15px 40px",
                    background: "linear-gradient(135deg, #FFA500 0%, #FFD700 100%)",
                    border: "none",
                    borderRadius: "50px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "#000",
                    cursor: "pointer",
                    boxShadow: "0 10px 30px rgba(255, 165, 0, 0.3)",
                    transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-3px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
            >
                Go Back Home
            </button>
        </div>
    );
};

export default PageNotFound;
