"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const loadCardRef = useRef<HTMLDivElement>(null);
  const batteryCardRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);
  const solarSectionRef = useRef<HTMLDivElement>(null);
  const gridSectionRef = useRef<HTMLDivElement>(null);
  const [paths, setPaths] = useState({
    loadPath: "",
    batteryPath: "",
    solarPath: "",
    gridPath: ""
  });

  useEffect(() => {
    const calculatePaths = () => {
      if (loadCardRef.current && batteryCardRef.current && houseRef.current && solarSectionRef.current && gridSectionRef.current) {
        const containerElement = loadCardRef.current.closest('.min-h-screen');
        if (!containerElement) return;
        const containerRect = containerElement.getBoundingClientRect();
        
        // Get positions relative to the container
        const loadRect = loadCardRef.current.getBoundingClientRect();
        const batteryRect = batteryCardRef.current.getBoundingClientRect();
        const houseRect = houseRef.current.getBoundingClientRect();
        const solarRect = solarSectionRef.current.getBoundingClientRect();
        const gridRect = gridSectionRef.current.getBoundingClientRect();
        
        // Calculate centers and connection points
        const loadCenterX = (loadRect.left + loadRect.width / 2) - containerRect.left;
        const loadCenterY = (loadRect.top + loadRect.height / 2) - containerRect.top;
        
        const batteryCenterX = (batteryRect.left + batteryRect.width / 2) - containerRect.left;
        const batteryCenterY = (batteryRect.top + batteryRect.height / 2) - containerRect.top;
        
        const solarCenterX = (solarRect.left + solarRect.width / 2) - containerRect.left;
        const solarCenterY = (solarRect.top + solarRect.height / 2) - containerRect.top;
        
        const gridCenterX = (gridRect.left + gridRect.width / 2) - containerRect.left;
        const gridCenterY = (gridRect.top + gridRect.height / 2) - containerRect.top;
        
        // House connection points - left, right sides and center
        const houseLeftX = houseRect.left - containerRect.left;
        const houseRightX = (houseRect.left + houseRect.width) - containerRect.left;
        // const houseCenterX = (houseRect.left + houseRect.width / 2) - containerRect.left;
        const houseConnectionY = (houseRect.top + houseRect.height / 2) - containerRect.top;
        
        // Convert to SVG coordinates (scale to viewBox)
        const svgWidth = 400;
        const svgHeight = 800;
        const scaleX = svgWidth / containerRect.width;
        const scaleY = svgHeight / containerRect.height;
        
        const loadSvgX = loadCenterX * scaleX;
        const loadSvgY = loadCenterY * scaleY;
        const batterySvgX = batteryCenterX * scaleX;
        const batterySvgY = batteryCenterY * scaleY;
        const solarSvgX = solarCenterX * scaleX;
        const solarSvgY = solarCenterY * scaleY;
        const gridSvgX = gridCenterX * scaleX;
        const gridSvgY = gridCenterY * scaleY;
        const houseLeftSvgX = houseLeftX * scaleX;
        const houseRightSvgX = houseRightX * scaleX;
        // const houseCenterSvgX = houseCenterX * scaleX;
        const houseConnectionSvgY = houseConnectionY * scaleY;
        
    
        const solarPath = `M${solarSvgX-80} ${solarSvgY} L${solarSvgX - 80} ${solarSvgY + 80} L${solarSvgX - 80} ${houseConnectionSvgY - 60} Q${solarSvgX - 80} ${houseConnectionSvgY - 40} ${solarSvgX - 60} ${houseConnectionSvgY - 40} L${houseLeftSvgX+80} ${houseConnectionSvgY-40}`;
        
        
        const gridPath = `M${gridSvgX+80} ${gridSvgY} L${gridSvgX+80} ${gridSvgY + 60} L${gridSvgX + 80} ${gridSvgY + 80} L${gridSvgX + 80} ${houseConnectionSvgY - 60} Q${gridSvgX + 80} ${houseConnectionSvgY - 40} ${gridSvgX + 60} ${houseConnectionSvgY - 40} L${houseRightSvgX-80} ${houseConnectionSvgY-40}`;
        
       
        const loadPath = `M${loadSvgX-80} ${loadSvgY} L${loadSvgX-80} ${loadSvgY - 60}  L${loadSvgX - 80} ${houseConnectionSvgY + 60} Q${loadSvgX - 80} ${houseConnectionSvgY + 40} ${loadSvgX - 60} ${houseConnectionSvgY + 40} L${houseLeftSvgX+40} ${houseConnectionSvgY+40}`;
        
        
        const batteryPath = `M${batterySvgX} ${batterySvgY} L${batterySvgX+80} ${batterySvgY} L${batterySvgX + 80} ${houseConnectionSvgY + 60} Q${batterySvgX + 80} ${houseConnectionSvgY + 40} ${batterySvgX + 60} ${houseConnectionSvgY + 40} L${houseRightSvgX-40} ${houseConnectionSvgY+40}`;
        
        setPaths({
          loadPath,
          batteryPath,
          solarPath,
          gridPath
        });
      }
    };

    calculatePaths();
    window.addEventListener('resize', calculatePaths);
    
    return () => window.removeEventListener('resize', calculatePaths);
  }, []);

  return (
    <div className="min-h-screen bg-black px-4 py-8 flex flex-col justify-center items-center relative overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
        viewBox="0 0 400 800"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <path id="solarPath" d={paths.solarPath}/>
          <path id="gridPath" d={paths.gridPath}/>
          <path id="loadPath" d={paths.loadPath}/>
          <path id="batteryPath" d={paths.batteryPath}/>
        </defs>

        {/* Dynamic Solar Path */}
        {paths.solarPath && (
          <path
            d={paths.solarPath}
            stroke="#6b7280"
            strokeWidth="2"
            fill="none"
          />
        )}

        {/* Dynamic Grid Path */}
        {paths.gridPath && (
          <path
            d={paths.gridPath}
            stroke="#6b7280"
            strokeWidth="2"
            fill="none"
          />
        )}

        {/* Dynamic Load Path */}
        {paths.loadPath && (
          <path
            d={paths.loadPath}
            stroke="#6b7280"
            strokeWidth="2"
            fill="none"
          />
        )}

        {/* Dynamic Battery Path */}
        {paths.batteryPath && (
          <path
            d={paths.batteryPath}
            stroke="#6b7280"
            strokeWidth="2"
            fill="none"
          />
        )}

        {/* Animated White Dots */}
        {/* Solar to House - only show if path exists */}
        {paths.solarPath && (
          <motion.circle
            r="3"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 1 
            }}
          >
            <animateMotion dur="2s" repeatCount="indefinite">
              <mpath href="#solarPath"/>
            </animateMotion>
          </motion.circle>
        )}

        {/* Grid to House - only show if path exists */}
        {paths.gridPath && (
          <motion.circle
            r="3"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: 2, 
              delay: 0.5,
              repeat: Infinity, 
              repeatDelay: 1 
            }}
          >
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.5s">
              <mpath href="#gridPath"/>
            </animateMotion>
          </motion.circle>
        )}

        {/* Load to House - only show if path exists */}
        {paths.loadPath && (
          <motion.circle
            r="3"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: 2, 
              delay: 1,
              repeat: Infinity, 
              repeatDelay: 1 
            }}
          >
            <animateMotion dur="2s" repeatCount="indefinite" begin="1s">
              <mpath href="#loadPath"/>
            </animateMotion>
          </motion.circle>
        )}

        {/* Battery to House - only show if path exists */}
        {paths.batteryPath && (
          <motion.circle
            r="3"
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: 2, 
              delay: 1.5,
              repeat: Infinity, 
              repeatDelay: 1 
            }}
          >
            <animateMotion dur="2s" repeatCount="indefinite" begin="1.5s">
              <mpath href="#batteryPath"/>
            </animateMotion>
          </motion.circle>
        )}
      </svg>

      {/* Solar Generation Card */}
      <div className="bg-gradient-to-r from-[#17342d] via-[#18181b] to-[#17342d] rounded-2xl p-6 text-white w-full max-w-sm mb-8 relative z-20">
        <div className="flex justify-between items-start">
          {/* Solar Generation Section */}
          <div ref={solarSectionRef} className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-gray-300 text-sm">Solar Generation</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">152.84</span>
              <span className="text-sm text-gray-400">kW</span>
            </div>
          </div>

          {/* Grid Export Section */}
          <div ref={gridSectionRef} className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-gray-300 text-sm">Grid export</span>
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 11l5-5m0 0l5 5m-5-5v12"
                />
              </svg>
            </div>
            <div className="flex items-baseline justify-end gap-2">
              <span className="text-3xl font-bold">32.84</span>
              <span className="text-sm text-gray-400">kW</span>
            </div>
          </div>
        </div>
      </div>

      {/* House Image - Smaller size for connection lines */}
      <div ref={houseRef} className="mb-8 relative z-20">
        <Image
          src="/house-3.png"
          alt="house"
          width={280}
          height={200}
          className="w-74 h-74 max-w-full"
        />
      </div>

      {/* Load and Battery Cards */}
      <div className="flex gap-4 w-full max-w-sm relative z-20">
        {/* Load Card */}
        <div ref={loadCardRef} className="bg-[#18181b] rounded-2xl p-5 text-white flex-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#17342d] rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-gray-300 text-xs mb-1">Load</div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">30.59</span>
                <span className="text-xs text-gray-400">kW</span>
              </div>
            </div>
          </div>
        </div>

        {/* Battery Card */}
        <div ref={batteryCardRef} className="bg-[#18181b] rounded-2xl p-5 text-white flex-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#17342d] rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 10V6a2 2 0 00-2-2H5a2 2 0 00-2 2v4m14 0v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10m14 0H3"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 14h.01M12 14h.01M16 14h.01"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-gray-300 text-xs mb-1">Battery</div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold">51.6</span>
                <span className="text-xs text-gray-400">kW</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;