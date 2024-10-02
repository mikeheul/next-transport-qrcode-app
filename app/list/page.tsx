"use client";

import { Trash2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface Ticket {
    id: string;
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

    const handleDelete = async (ticketId: string) => {
        try {
            await fetch(`/api/ticket?ticketId=${ticketId}`, {
                method: 'DELETE',
            });
            setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId)); // Update state
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10 px-5 md:px-10">
            {/* Introduction Section */}
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-white">Your Ticket Dashboard</h1>
                <p className="text-lg text-gray-300 mt-4">
                    Manage all your tickets in one place. Review their validity, scan the QR codes, and remove expired or unused tickets. Stay in control of your travels with ease and convenience.
                </p>
            </div>

            <h1 className="text-4xl font-bold text-center mb-8 text-white">Your Tickets</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                {tickets.map((ticket, index) => {

                    const valid = isTicketValid(ticket.validUntil); // Check if the ticket is valid

                    return (
                        <div key={index} className="relative bg-gray-700 shadow-lg rounded-lg overflow-hidden hover:bg-slate-600 transition duration-300 w-full">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-100 text-center">Ticket Valid Until</h2>
                                <p className="text-white text-center">{new Date(ticket.validUntil).toLocaleString()}</p>
                                <div className="mt-4">
                                    <img src={ticket.qrCode} alt="QR Code" className="w-full h-40 object-contain" />
                                </div>
                                <div className={`mt-4 p-2 text-center text-white rounded ${valid ? 'bg-green-600' : 'bg-red-600'}`}>
                                    <p>{valid ? 'Valid Ticket' : 'Invalid Ticket'}</p>
                                </div>
                            </div>
                            <div className="bg-gray-600 px-6 py-4">
                                <p className="text-gray-300 text-center font-medium">Scan this QR code to validate your ticket.</p>
                            </div>
                            <div className="absolute top-3 right-3 bg-white hover:bg-white/90 rounded-full flex justify-center items-center h-10 w-10 p-1">
                                <button
                                    onClick={() => handleDelete(ticket.id)}
                                >
                                    <Trash2Icon className="text-red-500" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TicketsPage;
