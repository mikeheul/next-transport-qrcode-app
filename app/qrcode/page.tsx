"use client";

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { X } from 'lucide-react';
import TicketCard from './_components/TicketCard';

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
    const [showModal, setShowModal] = useState(false); // For modal visibility

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
            setShowModal(true); // Show the modal with payment form

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
                <TicketCard
                    hours={1}
                    price={2}
                    description="Valid for 1 hour from now."
                    onClick={() => handleGenerateTicket(1)}
                />
                <TicketCard
                    hours={24}
                    price={35}
                    description="Valid for 24 hours from now."
                    onClick={() => handleGenerateTicket(24)}
                />
                <TicketCard
                    hours={48}
                    price={50}
                    description="Valid for 48 hours from now."
                    onClick={() => handleGenerateTicket(48)}
                />
            </div>

            {/* Show payment form when clientSecret is available */}
            {clientSecret && showModal && (
                <Modal onClose={() => setShowModal(false)} hours={hours} >
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                        <PaymentForm
                            clientSecret={clientSecret}
                            hours={hours!}
                            setTicket={setTicket}
                            setPaymentLoading={setPaymentLoading}
                            paymentLoading={paymentLoading} // Pass the paymentLoading state
                            onClose={() => setShowModal(false)}
                        />
                    </Elements>
                </Modal>
            )}

            {loading && (
                <div className="flex justify-center mt-5">
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full"></div>
                    </div>
                </div>
            )}

            {/* Display the spinner if payment is loading */}
            {paymentLoading && (
                <div className="flex justify-center mt-5">
                    <div className="flex justify-center items-center h-full">
                        <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-blue-500 rounded-full"></div>
                    </div>
                </div>
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

                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-500 mb-2">Share this ticket</p>
                            <input
                                type="text"
                                value={`${window.location.origin}/ticket/${ticket.id}`}
                                readOnly
                                className="p-2 border rounded w-full text-center mb-2"
                            />
                            <button
                                onClick={() => navigator.clipboard.writeText(`${window.location.origin}/ticket/${ticket.id}`)}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Copy Link
                            </button>
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

// Modal Component
const Modal = ({ children, onClose, hours }: { children: React.ReactNode, onClose: () => void, hours: number | null }) => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-slate-900/40 backdrop-blur-lg rounded-lg border border-white/20 shadow-lg max-w-md w-full p-8">
                <button
                    className="absolute top-3 right-3 text-white"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
                {hours && (
                    <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
                        <p className="text-2xl font-bold text-white">
                            Ticket Type : 
                            <span className="text-2xl">
                                {` ${hours} ${hours === 1 ? 'Hour' : 'Hours'}`}
                            </span>
                        </p>
                    </div>
                    )}
                {children}
            </div>
        </div>
    );
};

interface PaymentFormProps {
    clientSecret: string; // Changed to not be optional
    hours: number;
    setTicket: (ticket: Ticket) => void; // Update this type if you have a specific Ticket type
    setPaymentLoading: (isLoading: boolean) => void; 
    paymentLoading: boolean; // New prop to receive payment loading state
    onClose: () => void; // Function to close the modal
}

const PaymentForm = ({ clientSecret, hours, setTicket, setPaymentLoading, onClose }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            // Make sure to disable the button if Stripe.js has not yet loaded.
            console.error("Stripe.js has not yet loaded or elements are not available.");
            return;
        }

        const cardElement = elements.getElement(CardNumberElement);

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

                // Close the modal after successful ticket generation
                onClose();

            } catch (error) {
                console.error('Error generating ticket:', error);
            }
        }

        setPaymentLoading(false);
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-white text-center">Payment Form</h2>
            <form 
                onSubmit={handleSubmit} 
                className="flex flex-col mt-6"
            >
                <div className="mb-4">
                    <label className="text-white">Card Number</label>
                    <CardNumberElement className="p-4 bg-gray-100 rounded-lg mb-4" />
                </div>
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="w-full md:w-1/2">
                        <label className="text-white">Expiry Date</label>
                        <CardExpiryElement className="p-4 bg-gray-100 rounded-lg mb-4" />
                    </div>
                    <div className="w-full md:w-1/2">
                        <label className="text-white">CVC</label>
                        <CardCvcElement className="p-4 bg-gray-100 rounded-lg mb-4" />
                    </div>
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white px-4 py-2 rounded" 
                    disabled={!stripe} 
                >
                    Pay Now
                </button>
            </form>
        </>
    );
};

export default TicketPage;
