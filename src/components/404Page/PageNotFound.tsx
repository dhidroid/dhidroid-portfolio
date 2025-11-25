import { useNavigate } from 'react-router'

const PageNotFound = () => {
    const navigation = useNavigate()
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 text-center p-6">
            <h1 className="text-[6rem] m-0 text-primary">404</h1>
            <h2 className="text-2xl m-0">Page Not Found</h2>
            <p className="text-lg text-muted max-w-xl">The page you're looking for doesn't exist.</p>

            <button
                onClick={() => navigation('/')}
                className="px-8 py-3 rounded-full font-bold text-black bg-gradient-to-r from-orange-400 to-yellow-300 shadow-xl transform transition-transform hover:-translate-y-1"
            >
                Go Back Home
            </button>
        </div>
    )
}

export default PageNotFound;
