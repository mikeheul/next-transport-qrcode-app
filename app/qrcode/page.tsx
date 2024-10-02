// pages/ticket.tsx
"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Ticket {
    id: string;
    qrCode: string;
    validUntil: string;
}

const TicketPage = () => {
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(false);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [hours, setHours] = useState<number | null>(null);

    const handleGenerateTicket = async (hours: number) => {
        setHours(hours); // Save the hours for the ticket
        setLoading(true);

        try {
            const res = await fetch('/api/stripe/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ hours }),
            });

            if (!res.ok) {
                throw new Error('Failed to create payment intent');
            }

            const data = await res.json();
            setClientSecret(data.clientSecret); // Get the client secret for Stripe payment
        } catch (error) {
            console.error('Error generating ticket:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 py-10 px-5">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-extrabold text-white">Effortless Ticket Generation</h1>
                <p className="text-lg text-gray-300 mt-4">
                    Welcome to the future of ticketing. Pay and generate your personal QR code in seconds!
                </p>
            </div>

            <h1 className="text-4xl font-bold text-center mb-8 text-white">Generate a Ticket</h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div
                    onClick={() => handleGenerateTicket(1)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-6 shadow-lg transition duration-300 hover:from-green-600 hover:to-blue-600 hover:shadow-2xl cursor-pointer"
                >
                    <h3 className="text-xl font-semibold mb-2">1 Hour - 2 Euros</h3>
                    <p className="text-sm mb-4">Valid for 1 hour from now.</p>
                </div>
                <div
                    onClick={() => handleGenerateTicket(24)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-6 shadow-lg transition duration-300 hover:from-blue-600 hover:to-purple-600 hover:shadow-2xl cursor-pointer"
                >
                    <h3 className="text-xl font-semibold mb-2">24 Hours - 35 Euros</h3>
                    <p className="text-sm mb-4">Valid for 24 hours from now.</p>
                </div>
                <div
                    onClick={() => handleGenerateTicket(48)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6 shadow-lg transition duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-2xl cursor-pointer"
                >
                    <h3 className="text-xl font-semibold mb-2">48 Hours - 50 Euros</h3>
                    <p className="text-sm mb-4">Valid for 48 hours from now.</p>
                </div>
            </div>

            {/* Show payment form when clientSecret is available */}
            {clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <PaymentForm
                        clientSecret={clientSecret}
                        hours={hours!}
                        setTicket={setTicket}
                        setPaymentLoading={setPaymentLoading}
                        paymentLoading={paymentLoading} // Pass the paymentLoading state
                    />
                </Elements>
            )}

            {/* Display the generated ticket */}
            {ticket && (
                <div className="flex w-full justify-center mt-5">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full md:max-w-md">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold mb-2">Your Ticket</h2>
                            <p className="text-gray-500 text-sm mb-4">Scan this ticket to validate</p>
                        </div>
                        <div className="flex justify-center mb-4">
                            <Image
                                src={ticket.qrCode} // Ensure this is a valid path or URL
                                alt="QR Code"
                                width={200} // Required width in pixels
                                height={200} // Required height in pixels
                                className="mx-auto" // Your custom class for styling
                                quality={100} // Ensures high-quality image
                                priority // Loads the image with high priority
                            />
                        </div>
                        <div className="text-center text-gray-700">
                            <p className="font-semibold">Validity Date</p>
                            <p>{new Date(ticket.validUntil).toLocaleString()}</p>
                        </div>
                        <div className="mt-6 border-t pt-4 text-center text-gray-500 text-xs">
                            <p>Thank you for using our transport service</p>
                            <p>This ticket is non-transferable and non-refundable.</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

interface PaymentFormProps {
    clientSecret: string; // Changed to not be optional
    hours: number;
    setTicket: (ticket: any) => void; // Update this type if you have a specific Ticket type
    setPaymentLoading: (isLoading: boolean) => void; 
    paymentLoading: boolean; // New prop to receive payment loading state
}

const PaymentForm = ({ clientSecret, hours, setTicket, setPaymentLoading }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            // Make sure to disable the button if Stripe.js has not yet loaded.
            console.error("Stripe.js has not yet loaded or elements are not available.");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            console.error("CardElement is not available.");
            return;
        }

        setPaymentLoading(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });
        
        if (error) {
            console.error(error.message);
            setPaymentLoading(false);
            return;
        }
        
        if (paymentIntent && paymentIntent.status === 'succeeded') {
            // Ticket generation logic goes here, after successful payment
            const validUntil = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
            try {
                const res = await fetch('/api/ticket', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ validUntil }),
                });

                if (!res.ok) {
                    throw new Error('Failed to generate ticket');
                }

                const data: Ticket = await res.json(); // Use the Ticket interface
                setTicket(data);
            } catch (error) {
                console.error('Error generating ticket:', error);
            }
        }

        setPaymentLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <CardElement className="p-4 bg-gray-100 rounded-lg mb-4" />
            <button 
                type="submit" 
                className="bg-blue-600 text-white px-4 py-2 rounded" 
                disabled={!stripe} // Disable button if stripe is not loaded or payment is loading
            >
                Pay Now
            </button>
        </form>
    );
};

export default TicketPage;
