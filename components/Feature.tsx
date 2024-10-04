import React from 'react'

interface FeatureProps {
    title: string;
    content: string;
    color: string;
}

const Feature = ({title, content, color}: FeatureProps) => {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-700 rounded-lg shadow-lg p-10 text-center transition transform hover:scale-105">
            <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold ${color}`}>{title}</h3>
            <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-300">
                {content}
            </p>
        </div>
    )
}

export default Feature