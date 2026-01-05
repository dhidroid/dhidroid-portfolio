import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import tvIllustration from "../../assets/tv_404.png";
import logo from "../../assets/logo.svg";

const PageNotFound = () => {
    return (
        <section className="min-h-screen flex items-center justify-center p-6 pt-20 md:pt-28 font-sans">
            <div className="bg-white rounded-none shadow-2xl shadow-black/5 w-full max-w-6xl aspect-auto md:aspect-[16/9] py-20 md:py-0 flex items-center justify-center relative overflow-hidden ring-1 ring-black/5">
                {/* Branding elements - Fixed to match Pricing Page (rounded-none, crisp) */}
                <div className="absolute top-8 left-8 md:top-12 md:left-12">
                    <img src={logo} alt="Dhidroid" className="w-8 h-8 opacity-80" />
                </div>
                <div className="absolute top-8 right-8 md:top-12 md:right-12">
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-none overflow-hidden ring-1 ring-black/10">
                        <img src="https://avatars.githubusercontent.com/u/49156637?v=4" alt="Dhidroid" className="w-full h-full object-cover grayscale" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-8 md:px-12">
                    {/* Illustration Side */}
                    <div className="w-full max-w-[240px] md:max-w-md relative animate-in fade-in slide-in-from-left-8 duration-700">
                        <img
                            src={tvIllustration}
                            alt="404 Error TV"
                            className="w-full h-auto drop-shadow-2xl hover:translate-y-[-4px] transition-transform duration-500"
                        />
                    </div>

                    {/* Text Side */}
                    <div className="text-center md:text-left animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
                        <h1 className="text-6xl md:text-8xl font-display font-bold text-[#111111] mb-2 tracking-tight">Oops!</h1>
                        <p className="text-lg md:text-2xl text-black/40 font-medium mb-10 max-w-sm leading-tight mx-auto md:mx-0">
                            We couldn't find the page you were looking for
                        </p>

                        <Link to="/" className="inline-block">
                            <button className="group flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-none font-bold hover:bg-primary/90 transition-all hover:shadow-lg active:scale-95 uppercase tracking-wider text-sm">
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                                Go home
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Footer decorations - Fixed to match Pricing Page (Square/Crisp) */}
                <div className="absolute bottom-8 left-12 hidden md:flex gap-4">
                    <div className="flex items-center gap-2 border border-black/10 px-3 py-1.5 rounded-none bg-white/50 backdrop-blur-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">Dhidroid Portfolio</span>
                    </div>
                    <div className="flex items-center gap-2 border border-black/10 px-3 py-1.5 rounded-none bg-white/50 backdrop-blur-sm">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-black/40">v2024.1</span>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-none bg-[#FF6B35]" />
                    <div className="w-3 h-3 rounded-none bg-[#4DA1A9]" />
                    <div className="w-3 h-3 rounded-none bg-[#E5D352]" />
                    <div className="w-3 h-3 rounded-none bg-black" />
                </div>
            </div>
        </section>
    );
};

export default PageNotFound;
