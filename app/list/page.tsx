"use client"

import React, { useEffect, useState } from 'react';

interface Ticket {
    qrCode: string;
    validUntil: string;
}

const TicketsPage = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await fetch('/api/ticket', {
                method: 'GET',
            });
            const data: Ticket[] = await response.json();
            setTickets(data);
        };

        fetchTickets();
    }, []);

    // Function to check if the ticket is valid
    const isTicketValid = (validUntil: string): boolean => {
        const currentDate = new Date(); // Get the current date and time
        const validUntilDate = new Date(validUntil); // Convert validUntil string to Date object
        return validUntilDate >= currentDate; // Check if validUntil is greater than or equal to current date
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-10 px-5 md:px-10">
            <h1 className="text-4xl font-bold text-center mb-8">Your Tickets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {tickets.map((ticket, index) => {

                    const valid = isTicketValid(ticket.validUntil); // Check if the ticket is valid

                    return (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 w-full">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-800">Ticket Valid Until</h2>
                                <p className="text-gray-600">{new Date(ticket.validUntil).toLocaleString()}</p>
                                <div className="mt-4">
                                    <img src={ticket.qrCode} alt="QR Code" className="w-full h-40 object-contain" />
                                </div>
                                <div className={`mt-4 p-2 text-center text-white rounded ${valid ? 'bg-green-500' : 'bg-red-500'}`}>
                                    <p>{valid ? 'Valid Ticket' : 'Invalid Ticket'}</p>
                                </div>
                            </div>
                            <div className="bg-gray-200 px-6 py-4">
                                <p className="text-gray-700 font-medium">Scan this QR code to validate your ticket.</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TicketsPage;
