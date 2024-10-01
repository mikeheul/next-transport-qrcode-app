"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircle, XCircle } from 'lucide-react';

// Dynamic import to avoid SSR issues
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function TicketValidator() {
    const [validationResult, setValidationResult] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null); // State to track validation status

    // Function to handle QR code scanning
    const handleScan = async (data: { text: string } | null) => {
        if (data && data.text) {
            const parsedData = JSON.parse(data.text);

            // Send scanned data to server for validation
            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedData),
            });

            const result = await response.json();
            setValidationResult(result.valid ? 'Billet valide !' : 'Billet invalide ou falsifié.');
            setIsValid(result.valid); // Set the validation status
        }
    };

    // Error handling during scanning
    const handleError = (err: Error) => {
        console.error(err);
        setValidationResult('Erreur de scan du QR code.');
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-center text-white">Scan billet</h1>

            {/* Container with fixed dimensions for md, lg, xl and full width for mobile */}
            <div className="relative flex justify-center w-full max-h-[500px] sm:w-[500px] aspect-[1/1]">
                <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ height: '100%', width: '100%' }} // Set the height and width to fill the wrapper
                    constraints={{
                        video: {
                            aspectRatio: 1,
                            facingMode: { ideal: 'environment' }  // Use 'environment' for the rear camera
                        }
                    }}
                />

                {/* Overlay for edges of the scanner */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 h-1 w-full bg-red-500" /> {/* Top edge */}
                    <div className="absolute bottom-0 left-0 h-1 w-full bg-red-500" /> {/* Bottom edge */}
                    <div className="absolute top-0 left-0 h-full w-1 bg-red-500" /> {/* Left edge */}
                    <div className="absolute top-0 right-0 h-full w-1 bg-red-500" /> {/* Right edge */}
                </div>

                {/* Overlay for validation result */}
                {validationResult && (
                    <div className="absolute top-0 left-0 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="flex items-center text-white p-4 rounded-lg shadow-lg">
                            {isValid ? (
                                <CheckCircle className="text-green-500 w-8 h-8 mr-2" />
                            ) : (
                                <XCircle className="text-red-500 w-8 h-8 mr-2" />
                            )}
                            <p className="text-lg font-semibold">{validationResult}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
