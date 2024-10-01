"use client";

import Image from 'next/image';
import { useState } from 'react';

interface Ticket {
    qrCode: string;
    validUntil: string;
}

const TicketPage = () => {
    const [ticket, setTicket] = useState<Ticket | null>(null);

    // Function to generate a ticket with the specified duration
    const handleGenerateTicket = async (hours: number) => {
        const currentDateTime = new Date();
        const validUntil = new Date(currentDateTime.getTime() + hours * 60 * 60 * 1000).toISOString();

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

    return (
        <div className="min-h-screen bg-slate-800 p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">Générer un billet</h1>
            
            {/* Stunning Cards for Ticket Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* 1 Hour Ticket Card */}
                <div
                    onClick={() => handleGenerateTicket(1)}
                    className="bg-blue-500 text-white rounded-lg p-6 shadow-lg transition duration-300 hover:bg-blue-600 hover:shadow-2xl cursor-pointer"
                >
                    <h3 className="text-xl font-semibold mb-2">1 Heure</h3>
                    <p className="text-sm mb-4">Valide pour 1 heure à partir de maintenant.</p>
                </div>

                {/* 24 Hours Ticket Card */}
                <div
                    onClick={() => handleGenerateTicket(24)}
                    className="bg-green-500 text-white rounded-lg p-6 shadow-lg transition duration-300 hover:bg-green-600 hover:shadow-2xl cursor-pointer"
                >
                    <h3 className="text-xl font-semibold mb-2">24 Heures</h3>
                    <p className="text-sm mb-4">Valide pour 24 heures à partir de maintenant.</p>
                </div>

                {/* 48 Hours Ticket Card */}
                <div
                    onClick={() => handleGenerateTicket(48)}
                    className="bg-purple-500 text-white rounded-lg p-6 shadow-lg transition duration-300 hover:bg-purple-600 hover:shadow-2xl cursor-pointer"
                >
                    <h3 className="text-xl font-semibold mb-2">48 Heures</h3>
                    <p className="text-sm mb-4">Valide pour 48 heures à partir de maintenant.</p>
                </div>
            </div>

            {/* Display the generated ticket */}
            {ticket && (
                <div className="flex w-full justify-center mt-5">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full md:max-w-md">
                        {/* Ticket Header */}
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">Votre Billet</h2>
                            <p className="text-gray-500 text-sm mb-4">Scannez ce billet pour valider</p>
                        </div>

                        {/* QR Code */}
                        <div className="flex justify-center mb-4">
                            <Image src={ticket.qrCode} alt="QR Code" width={200} height={200} className="mx-auto" />
                        </div>

                        {/* Ticket Details */}
                        <div className="text-center text-gray-700">
                            <p className="font-semibold">Date de validité</p>
                            <p>{new Date(ticket.validUntil).toLocaleString()}</p>
                        </div>

                        {/* Ticket Design - Footer */}
                        <div className="mt-6 border-t pt-4 text-center text-gray-500 text-xs">
                            <p>Merci d&apos;utiliser notre service de transport</p>
                            <p>Ce billet est non transférable et non remboursable.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicketPage;
