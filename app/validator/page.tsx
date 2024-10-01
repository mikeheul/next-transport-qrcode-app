import TicketValidator from '@/components/TicketValidator'
import React from 'react'

const ControlPage = () => {
    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-8">Contrôle des billets</h1>
            {/* Intégration du composant TicketValidator */}
            <TicketValidator />
        </div>
    )
}

export default ControlPage