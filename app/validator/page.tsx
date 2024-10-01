import TicketValidator from '@/components/TicketValidator'
import React from 'react'

const ControlPage = () => {
    return (
        <div className="min-h-screen bg-slate-800 p-6">
            {/* Intégration du composant TicketValidator */}
            <TicketValidator />
        </div>
    )
}

export default ControlPage