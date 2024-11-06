import React, { useState } from 'react';
import { teams } from '../assets/teamData';
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
const Teams = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const tobeDisplayed = teams.slice(currentIndex, currentIndex + 3);

    const prevHandler = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const nextHandler = () => {
        if (currentIndex + 3 < teams.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <div className="teams-slider">
            <GrLinkPrevious onClick={prevHandler} disabled={currentIndex===0} className='text-2xl mr-6 cursor-pointer'></GrLinkPrevious>
            <div className="slider-container ${isAnimating ? 'slide' : ''}`">
                <div className="slider-track" style={{ transform: `translateX(-${(currentIndex * 2) / 3}%)` }}>
                    {tobeDisplayed.map((obj, index) => (
                        <div className="team-member" key={index}>
                            <img src={obj.img} alt={obj.name}/>
                            <h2>{obj.name}</h2>
                            <p>{obj.desg}</p>
                        </div>
                    ))}
                </div>
            </div>
            <GrLinkNext onClick={nextHandler} disabled={currentIndex+3>=teams.length} className='text-2xl cursor-pointer'/>
        </div>
    );
};

export default Teams;
