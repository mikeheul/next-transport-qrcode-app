"use client"

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
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold">Générer un billet de transport</h1>
            <input
                type="datetime-local"
                value={validUntil}
                onChange={handleDateChange}
                className="border p-2 my-4"
            />
            <button
                onClick={handleGenerateTicket}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Générer le billet
            </button>
        
            {ticket && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold">QR Code du billet</h2>
                    <Image src={ticket.qrCode} alt="QR Code" width={50} height={50} />
                    <p>Date de validité : {new Date(ticket.validUntil).toLocaleString()}</p>
                </div>
            )}
        </div>
    );
}

export default TicketPage