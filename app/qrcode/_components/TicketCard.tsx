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
            className={`bg-gradient-to-r ${gradientClass} text-white rounded-lg p-6 shadow-lg transition duration-300 hover:shadow-2xl cursor-pointer`}
        >
            <h3 className="text-xl font-semibold mb-2">{`${hours} Hour${hours !== 1 ? 's' : ''} - ${price} Euros`}</h3>
            <p className="text-sm mb-4">{description}</p>
        </div>
    )
}

export default TicketCard