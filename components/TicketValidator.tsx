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

    const previewStyle = {
        height: 500,
        width: 500,
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4 text-center text-white">Contrôleur de billets</h1>

            <div className='relative flex justify-center w-full'>
                <div style={previewStyle}> {/* Wrap QrScanner to handle the styling */}
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
                </div>

                {/* Overlay for validation result */}
                {validationResult && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
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