import React from "react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle, Users, Globe, Shield } from "lucide-react";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { PortfolioContent } from "../../utils/Data/portfolioContent";
import { HeroBackgroundSVG } from "../Backgrounds/HeroBackgroundSVG";

const Hero = () => {
  const { hero } = PortfolioContent;

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Background SVG */}
      <div className="absolute inset-0 z-0">
          <HeroBackgroundSVG />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white/50 backdrop-blur-sm shadow-sm mb-8 animate-fade-in-up hover:border-primary/30 transition-colors cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-semibold text-gray-700 tracking-wide">
                {hero.badge}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold tracking-tight leading-[1.1] mb-6 animate-fade-in-up animation-delay-100 text-slate-900">
              {hero.title.line1} <br />
              <span className="text-primary relative inline-block">
                {hero.title.highlight}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200">
              {hero.subheadline}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-in-up animation-delay-300">
              <Link to="/project">
                <Button size="lg" className="h-14 px-8 rounded-full text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all duration-300">
                  {hero.cta.primary}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/bloglist">
                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-base font-semibold border-gray-200 hover:bg-gray-50 hover:text-primary transition-colors">
                  {hero.cta.secondary}
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-in-up animation-delay-400">
             <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${10 + i}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-600">
                  4k+
                </div>
             </div>
             <div className="text-sm font-medium text-gray-600">
               {hero.socialProof}
             </div>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="relative animate-fade-in-up animation-delay-500 hidden lg:block perspective-1000">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />

            {/* Main Dashboard Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200/60 overflow-hidden transform rotate-y-6 rotate-x-2 transition-transform duration-500 hover:rotate-0">
               {/* Window Header */}
               <div className="h-10 bg-gray-50 border-b border-gray-100 flex items-center px-4 gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-400" />
                 <div className="w-3 h-3 rounded-full bg-yellow-400" />
                 <div className="w-3 h-3 rounded-full bg-green-400" />
               </div>
               
               {/* Dashboard Content */}
               <div className="p-6">
                 {/* Top Row: Stats */}
                 <div className="flex justify-between items-center mb-8">
                   <div>
                     <div className="text-sm text-gray-400 font-medium mb-1">Total Revenue</div>
                     <div className="text-3xl font-bold text-slate-900">$48,290.00</div>
                   </div>
                   <div className="p-2 bg-green-50 text-green-600 rounded-lg text-sm font-bold">
                     +18.2%
                   </div>
                 </div>

                 {/* Chart Placeholder (CSS Bars) */}
                 <div className="flex items-end justify-between h-32 gap-3 mb-8">
                    {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                      <div key={i} className="w-full bg-primary/10 rounded-t-sm relative group">
                        <div 
                          className="absolute bottom-0 left-0 w-full bg-primary rounded-t-sm transition-all duration-700 ease-out group-hover:bg-primary/80"
                          style={{ height: `${h}%` }}
                        />
                      </div>
                    ))}
                 </div>
                 
                 {/* Bottom Row: List */}
                 <div className="space-y-3">
                   {[1, 2].map((i) => (
                     <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                       <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-primary">
                         <Globe className="w-5 h-5" />
                       </div>
                       <div className="flex-1">
                         <div className="text-sm font-bold text-slate-900">Global Reach</div>
                         <div className="text-xs text-gray-500">Expanded to 5 new regions</div>
                       </div>
                       <div className="text-xs font-medium text-gray-400">Just now</div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>

            {/* Floating Element 1: Active Users */}
            <div className="absolute -left-12 top-20 bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 animate-float-slow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-medium">Active Users</div>
                  <div className="text-lg font-bold text-slate-900">12,504</div>
                </div>
              </div>
              <div className="flex -space-x-2 pl-1">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border border-white" />
                ))}
              </div>
            </div>

            {/* Floating Element 2: Security */}
            <div className="absolute -right-8 bottom-32 bg-white p-4 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 animate-float-medium">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-green-100 rounded-lg text-green-600">
                    <Shield className="w-5 h-5" />
                 </div>
                 <div>
                   <div className="text-sm font-bold text-slate-900">100% Secure</div>
                   <div className="text-xs text-gray-500">Audited & Verified</div>
                 </div>
                 <CheckCircle className="w-4 h-4 text-green-500 ml-2" />
               </div>
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
