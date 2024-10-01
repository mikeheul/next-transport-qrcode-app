"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { CheckCircle, XCircle } from 'lucide-react'; // Import the icons

// Importation dynamique pour éviter les problèmes SSR (Server-Side Rendering)
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function TicketValidator() {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [validationResult, setValidationResult] = useState<string | null>(null);
    const [isBackCamera, setIsBackCamera] = useState<boolean>(true); // State to track camera mode
    const [isValid, setIsValid] = useState<boolean | null>(null); // State to track validation status

    // Cette fonction gère la lecture des données du QR code
    const handleScan = async (data: { text: string } | null) => {
        if (data && data.text) {

            setQrCodeData(data.text);

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
        }
    };

    // Gestion des erreurs lors du scan
    const handleError = (err: Error) => {
        console.error(err);
        setValidationResult('Erreur de scan du QR code.');
    };

    const toggleCamera = () => {
        setIsBackCamera((prev) => !prev); // Toggle the camera mode
    };

    const previewStyle = {
        height: 240,
        width: 320,
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold">Contrôleur de billets</h1>

            {/* Scanner QR */}
            <QrScanner
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={previewStyle}
                facingMode={isBackCamera ? 'front' : 'rear'}
            />

            <button 
                onClick={toggleCamera} 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
            >
                    {isBackCamera ? 'Utiliser la caméra frontale' : 'Utiliser la caméra arrière'}
            </button>

            {qrCodeData && <p className="mt-4">Données scannées : {qrCodeData}</p>}
            {validationResult && (
                <div className="mt-4 flex items-center">
                    {isValid ? (
                        <CheckCircle className="text-green-500 w-6 h-6 mr-2" />
                    ) : (
                        <XCircle className="text-red-500 w-6 h-6 mr-2" />
                    )}
                    <p>Résultat : {validationResult}</p>
                </div>
            )}
        </div>
    );
}
