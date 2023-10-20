import React from 'react'

interface SuggestedStationPropType {
    title: string,
    imageUrl: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const SuggestedStation: React.FC<SuggestedStationPropType> = ({ title, imageUrl, onClick }): React.ReactElement => {
    return (
        <div className="flex flex-wrap flex-col rounded-2xl w-auto min-w-min-suggested-station-card h-28 md:h-48 m-5 justify-end hover:cursor-pointer transform-gpu hover:scale-105 transition duration-200 ease-in-out" onClick={onClick}>
            <img alt={title} className="absolute -z-10 h-full w-full rounded-2xl object-cover loaded" src={imageUrl}/>
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/20 rounded-2xl"></div>
            <h3 className={`text-gray-100 font-display text-2xl md:text-4xl font-bold w-full p-3 md:p-4`}>{title}</h3>
        </div>
    )
}

export default SuggestedStation