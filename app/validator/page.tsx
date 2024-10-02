import TicketValidator from '@/components/TicketValidator';
import React from 'react';

const ControlPage = () => {
    return (
        <div className="min-h-screen bg-slate-800 py-10 px-5">
            {/* Introduction Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-white">Ticket Validation Control</h1>
                <p className="text-lg text-gray-300 mt-4">
                    Welcome to the control hub for validating tickets. Use the power of QR code scanning to quickly and efficiently verify ticket authenticity. Stay one step ahead and ensure secure travel for all!
                </p>
            </div>

            {/* Integration of the TicketValidator component */}
            <TicketValidator />
        </div>
    );
}

export default ControlPage;
