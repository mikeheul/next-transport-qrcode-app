"use client"

import { useState, useEffect } from "react";
import Image from "next/image";

interface Ticket {
    id: string;
    qrCode: string;
    validUntil: string;
}

export default function TicketPage({ params }: { params: { ticketId: string } }) {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the ticket data when the component mounts
        const fetchTicket = async () => {
            try {
                const res = await fetch(`/api/ticket/${params.ticketId}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch the ticket");
                }

                const data: Ticket = await res.json();
                setTicket(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError("An unknown error occurred");
                }
                setLoading(false);
            }
        };

        fetchTicket();
    }, [params.ticketId]);

    if (loading) {
        return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full"></div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="text-center text-red-500 font-semibold mt-10 min-h-screen">
            {error}
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-5 flex justify-center items-center">
        {ticket && (
            <div className="bg-white rounded-lg shadow-lg p-6 w-full md:max-w-md">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">Your Ticket</h2>
                <p className="text-gray-500 text-sm mb-4">
                Scan this ticket to validate
                </p>
            </div>

            <div className="flex justify-center mb-4">
                <Image
                    src={ticket.qrCode} // Ensure this is a valid path or URL
                    alt="QR Code"
                    width={200} // Required width in pixels
                    height={200} // Required height in pixels
                    className="mx-auto"
                    quality={100}
                    priority
                />
            </div>

            <div className="text-center text-gray-700">
                <p className="font-semibold">Validity Date</p>
                <p>{new Date(ticket.validUntil).toLocaleString()}</p>
            </div>

            {/* Shareable link */}
            <div className="mt-6 border-t pt-4 text-center text-gray-500 text-xs">
                <p>Thank you for using our service</p>
                <p>This ticket is non-transferable and non-refundable.</p>

                {/* Sharing link */}
                <div className="mt-4">
                <p className="text-sm font-semibold">Share this ticket:</p>
                <input
                    type="text"
                    value={`${window.location.origin}/ticket/${ticket.id}`}
                    readOnly
                    className="border border-gray-300 rounded p-2 w-full mt-2"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                />
                </div>
            </div>
            </div>
        )}
        </div>
    );
}
