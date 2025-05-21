import React, { useEffect, useState } from 'react';
import { teams } from '../assets/teamData';

const Teams = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    
    // Create a duplicated array of teams to ensure smooth infinite scrolling
    const duplicatedTeams = [...teams, ...teams];
    
    useEffect(() => {
        // Animation speed - lower value for slower animation
        const speed = 0.5;
        
        // Set up the animation
        const animationFrame = () => {
            setScrollPosition(prev => {
                // Reset position when we've scrolled through the first set
                if (prev >= teams.length * 250) {
                    return 0;
                }
                return prev + speed;
            });
            animationId = requestAnimationFrame(animationFrame);
        };
        
        let animationId = requestAnimationFrame(animationFrame);
        
        // Clean up animation on unmount
        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [teams.length]);
    
    return (
        <div className="w-full px-4 py-10 bg-gray-100 overflow-hidden">
            <div className="relative">
                {/* Main scrolling container */}
                <div 
                    className="flex gap-6"
                    style={{
                        transform: `translateX(-${scrollPosition}px)`,
                        transition: 'transform 0.1s linear'
                    }}
                >
                    {duplicatedTeams.map((member, index) => (
                        <div 
                            key={index}
                            className="flex-shrink-0 bg-white rounded-2xl shadow-lg p-4 w-64 sm:w-56 md:w-60 lg:w-64 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300"
                        >
                            <img 
                                src={member.img} 
                                alt={member.name}
                                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full mb-4 border-4 border-blue-200"
                            />
                            <h3 className="text-lg font-bold text-blue-800">Ad. {member.name}</h3>
                            <p className="text-sm text-gray-600">{member.desg}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Teams;