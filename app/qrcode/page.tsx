"use client";

import Image from 'next/image';
import { useState, ChangeEvent } from 'react';

interface Ticket {
    qrCode: string;
    validUntil: string;
}

const TicketPage = () => {
    const [validUntil, setValidUntil] = useState<string>('');
    const [ticket, setTicket] = useState<Ticket | null>(null);

    const handleGenerateTicket = async () => {
        const res = await fetch('/api/ticket', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ validUntil }),
        });
    
        const data: Ticket = await res.json();
        setTicket(data);
    };
    
    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValidUntil(e.target.value);
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Générer un billet de transport</h1>
            <div className="flex flex-col items-center">
                <input
                    type="datetime-local"
                    value={validUntil}
                    onChange={handleDateChange}
                    className="border p-2 my-4 rounded"
                />
                <button
                    onClick={handleGenerateTicket}
                    className="bg-blue-500 text-white py-2 px-4 rounded transition duration-200 hover:bg-blue-600"
                >
                    Générer le billet
                </button>
            </div>
        
            {ticket && (
                <div className="mt-8 text-center">
                    <h2 className="text-xl font-semibold">QR Code du billet</h2>
                    <Image src={ticket.qrCode} alt="QR Code" width={200} height={200} className="mx-auto" />
                    <p className="mt-2">Date de validité : {new Date(ticket.validUntil).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

export default TicketPage;