import TicketValidator from '@/components/TicketValidator'
import React from 'react'

const ControlPage = () => {
    return (
        <div className="min-h-screen bg-slate-800 py-10 px-5">
            {/* Intégration du composant TicketValidator */}
            <TicketValidator />
        </div>
    )
}

export default ControlPage