const TerritoryMap = () => {

        return (
                <div className="relative w-full aspect-square max-w-lg mx-auto">

                        {/* Main Globe Container */}
                        <div className="absolute inset-0 flex items-center justify-center">

                                {/* Outer orbit rings */}
                                <div className="absolute w-full h-full rounded-full border border-gray-300/40 animate-[spin_60s_linear_infinite]" />
                                <div className="absolute w-[88%] h-[88%] rounded-full border border-gray-300/30 animate-[spin_45s_linear_infinite_reverse]" />
                                <div className="absolute w-[75%] h-[75%] rounded-full border border-gray-400/20" />

                                {/* Globe base */}
                                <div className="absolute w-[60%] h-[60%] rounded-full bg-linear-to-br from-gray-100 to-gray-200 shadow-2xl border border-gray-300">

                                        {/* Globe grid lines */}
                                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                                                <ellipse cx="50" cy="50" rx="48" ry="15" fill="none" stroke="#d1d5db" strokeWidth="0.5" opacity="0.6" />
                                                <ellipse cx="50" cy="50" rx="48" ry="30" fill="none" stroke="#d1d5db" strokeWidth="0.5" opacity="0.6" />
                                                <ellipse cx="50" cy="50" rx="48" ry="45" fill="none" stroke="#d1d5db" strokeWidth="0.5" opacity="0.6" />
                                                <ellipse cx="50" cy="50" rx="15" ry="48" fill="none" stroke="#d1d5db" strokeWidth="0.5" opacity="0.6" />
                                                <ellipse cx="50" cy="50" rx="30" ry="48" fill="none" stroke="#d1d5db" strokeWidth="0.5" opacity="0.6" />
                                                <ellipse cx="50" cy="50" rx="45" ry="48" fill="none" stroke="#d1d5db" strokeWidth="0.5" opacity="0.6" />
                                        </svg>
                                </div>

                                {/* Connection lines SVG */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                                        <defs>
                                                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                        <stop offset="0%" stopColor="#374151" stopOpacity="0.8" />
                                                        <stop offset="100%" stopColor="#9ca3af" stopOpacity="0.4" />
                                                </linearGradient>
                                        </defs>

                                        {/* Animated connection lines */}
                                        <line x1="75" y1="110" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6 3" className="animate-dash" opacity="0.7" />
                                        <line x1="325" y1="130" x2="200" y2="200" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="6 3" className="animate-dash" opacity="0.7" />
                                        <line x1="200" y1="200" x2="110" y2="310" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
                                        <line x1="200" y1="200" x2="290" y2="290" stroke="#6b7280" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />

                                        {/* Curved paths */}
                                        <path d="M 75 110 Q 130 60 200 80" fill="none" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                                        <path d="M 325 130 Q 280 70 220 90" fill="none" stroke="#9ca3af" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                                </svg>

                                {/* SHELA - Top Left Node */}
                                <div className="absolute top-[22%] left-[12%] group z-20">
                                        <div className="relative">
                                                <div className="absolute -inset-4 rounded-full bg-gray-900/10 animate-ping" />
                                                <div className="absolute -inset-3 rounded-full bg-gray-900/5 animate-pulse" />
                                                <div className="relative w-14 h-14 rounded-full bg-white shadow-xl border-2 border-gray-900 flex items-center justify-center transition-transform hover:scale-110">
                                                        <svg className="w-7 h-7 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                </div>
                                                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                        <span className="text-sm font-bold text-gray-900 tracking-widest uppercase">SHELA</span>
                                                </div>
                                        </div>
                                </div>

                                {/* BHAT - Top Right Node */}
                                <div className="absolute top-[26%] right-[12%] group z-20">
                                        <div className="relative">
                                                <div className="absolute -inset-4 rounded-full bg-gray-900/10 animate-ping animation-delay-500" />
                                                <div className="absolute -inset-3 rounded-full bg-gray-900/5 animate-pulse animation-delay-300" />
                                                <div className="relative w-14 h-14 rounded-full bg-gray-900 shadow-xl border-2 border-gray-700 flex items-center justify-center transition-transform hover:scale-110">
                                                        <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                </div>
                                                <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                                        <span className="text-sm font-bold text-gray-900 tracking-widest uppercase">BHAT</span>
                                                </div>
                                        </div>
                                </div>

                                {/* Center Hub Node */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                                        <div className="relative">
                                                <div className="absolute -inset-6 rounded-full bg-gray-900/5 animate-pulse" />
                                                <div className="absolute -inset-4 rounded-full border border-gray-300 animate-[spin_20s_linear_infinite]" />
                                                <div className="w-20 h-20 rounded-full bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 shadow-2xl flex items-center justify-center border-4 border-white">
                                                        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                </div>
                                        </div>
                                </div>

                                {/* Additional floating nodes */}
                                <div className="absolute bottom-[22%] left-[22%]">
                                        <div className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-300 flex items-center justify-center animate-float">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                        </div>
                                </div>

                                <div className="absolute bottom-[24%] right-[20%]">
                                        <div className="w-10 h-10 rounded-full bg-white shadow-lg border border-gray-300 flex items-center justify-center animate-float animation-delay-700">
                                                <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                </svg>
                                        </div>
                                </div>

                                {/* Small decorative dots */}
                                <div className="absolute top-[12%] left-[38%] w-2.5 h-2.5 rounded-full bg-gray-500 animate-pulse" />
                                <div className="absolute top-[16%] right-[32%] w-2 h-2 rounded-full bg-gray-600 animate-pulse animation-delay-300" />
                                <div className="absolute bottom-[32%] left-[15%] w-2 h-2 rounded-full bg-gray-400 animate-pulse animation-delay-500" />
                                <div className="absolute bottom-[36%] right-[15%] w-2 h-2 rounded-full bg-gray-500 animate-pulse animation-delay-700" />
                                <div className="absolute top-[40%] left-[8%] w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" />
                                <div className="absolute top-[42%] right-[8%] w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse animation-delay-500" />

                                {/* Orbiting elements */}
                                <div className="absolute w-[98%] h-[98%] animate-[spin_35s_linear_infinite]">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-800 shadow-md" />
                                </div>
                                <div className="absolute w-[82%] h-[82%] animate-[spin_28s_linear_infinite_reverse]">
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-gray-600" />
                                </div>
                                <div className="absolute w-[70%] h-[70%] animate-[spin_40s_linear_infinite]">
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500" />
                                </div>
                        </div>

                        {/* Bottom label */}
                        {/* <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-center">
<p className="text-xs text-gray-500 tracking-[0.25em] uppercase font-medium">Territory Network</p>
</div> */}
                </div>

        );

};

export default TerritoryMap;
