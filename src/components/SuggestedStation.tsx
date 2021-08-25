import React from 'react'

interface SuggestedStationPropType {
    title: string,
    imageUrl: string,
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

const SuggestedStation: React.FC<SuggestedStationPropType> = ({ title, imageUrl, onClick }): React.ReactElement => {
    // Checks if the useragent is Firefox
    const isFirefox = "InstallTrigger" in window

    return (
        <div className="flex flex-wrap flex-col rounded-xl w-auto min-w-min-suggested-station-card h-28 md:h-48 m-5 justify-end bg-top bg-cover hover:cursor-pointer transform-gpu hover:scale-105 transition duration-300 ease-in-out" style={{ 'backgroundImage': 'url('+ imageUrl+')' ,'boxShadow':'rgba(152, 190, 239, 0.35) 6px 15px 30px -10px'}} onClick={onClick}>
            <p className={`text-white font-display text-2xl md:text-4xl font-semibold w-full p-2 md:p-5 backdrop-filter ${ isFirefox ? 'bg-gray-400 bg-opacity-80' : 'backdrop-blur'} rounded-br-xl rounded-bl-xl`} >{ title }</p>
        </div>
    )
}

export default SuggestedStation