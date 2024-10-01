"use client";

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircle, XCircle } from 'lucide-react'; // Import the icons

// Importation dynamique pour éviter les problèmes SSR (Server-Side Rendering)
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function TicketValidator() {
    const [validationResult, setValidationResult] = useState<string | null>(null);
    const [isValid, setIsValid] = useState<boolean | null>(null); // State to track validation status
    // const [scanning, setScanning] = useState(true); // Control scanning state

    // Cette fonction gère la lecture des données du QR code
    const handleScan = async (data: { text: string } | null) => {
        if (data && data.text) {
            //setQrCodeData(data.text);
            const parsedData = JSON.parse(data.text);
            
            // Envoi des données scannées au serveur pour validation
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

            // Restart scanning after 2 seconds (or adjust time as needed)
            // setTimeout(() => {
            //     setValidationResult(null); // Optionally clear previous result
            //     setScanning(true); // Allow scanning again
            // }, 2000);
        }
    };

    // Gestion des erreurs lors du scan
    const handleError = (err: Error) => {
        console.error(err);
        setValidationResult('Erreur de scan du QR code.');
        // setScanning(true);
    };

    const previewStyle = {
        height: 500,
        width: 500,
    };

    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4 text-center text-white">Contrôleur de billets</h1>

            <div className='flex justify-center'>
                <QrScanner
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={previewStyle}
                    constraints={{
                        video: {
                            aspectRatio: 1,
                            facingMode: { ideal: 'environment' }  // Use 'environment' for the rear camera
                        }
                    }}
                />
            </div>
            {/* Scanner QR */}

            {/* {qrCodeData && <p className="mt-4 text-center">Données scannées : {qrCodeData}</p>} */}
            {validationResult && (
                <div className="mt-4 flex items-center justify-center text-white">
                    {isValid ? (
                        <CheckCircle className="text-green-500 w-6 h-6 mr-2" />
                    ) : (
                        <XCircle className="text-red-500 w-6 h-6 mr-2" />
                    )}
                    <p className="text-lg">{validationResult}</p>
                </div>
            )}
        </div>
    );
}