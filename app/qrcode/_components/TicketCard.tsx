import React from 'react'

interface TicketCardProps {
    hours: number;
    price: number;
    description: string;
    onClick: () => void;
}

const TicketCard = ({ hours, price, description, onClick }: TicketCardProps) => {

    const gradientClasses = [
        'from-green-500 to-blue-500',
        'from-blue-500 to-purple-500',
        'from-purple-500 to-pink-500',
    ];

    const gradientClass = gradientClasses[hours === 1 ? 0 : hours === 24 ? 1 : 2];

    return (
        <div
            onClick={onClick}
            className={`bg-gradient-to-r ${gradientClass} relative text-white rounded-lg px-12 py-16 shadow-lg transition duration-300 hover:shadow-2xl hover:scale-[102%] cursor-pointer`}
        >
            <h3 className="text-xl font-semibold">{`${price} Euros`}</h3>
            <p className="text-sm">{description}</p>
            <div className="absolute top-4 right-4 bg-white p-2 rounded-lg">
                <p className="text-xs text-black text-center">
                    {`${hours} H${hours !== 1 ? 'S' : ''}`}
                </p>
            </div>
        </div>
    )
}

export default TicketCard