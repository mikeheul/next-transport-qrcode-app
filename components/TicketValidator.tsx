"use client"

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Importation dynamique pour éviter les problèmes SSR (Server-Side Rendering)
const QrScanner = dynamic(() => import('react-qr-scanner'), { ssr: false });

export default function TicketValidator() {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [validationResult, setValidationResult] = useState<string | null>(null);

    // Cette fonction gère la lecture des données du QR code
    const handleScan = async (data: string | null) => {
        if (data) {
            setQrCodeData(data);
            
            // Envoi des données scannées au serveur pour validation
            const response = await fetch('/api/validate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ qrCodeData: JSON.parse(data) }), // Conversion en objet JSON
            });

            const result = await response.json();
            if (result.valid) {
                setValidationResult('Billet valide !');
            } else {
                setValidationResult('Billet invalide ou falsifié.');
            }
        }
    };

    // Gestion des erreurs lors du scan
    const handleError = (err: Error) => {
        console.error(err);
        setValidationResult('Erreur de scan du QR code.');
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
                facingMode="rear"
            />

            {qrCodeData && <p className="mt-4">Données scannées : {qrCodeData}</p>}
            {validationResult && <p className="mt-4">Résultat : {validationResult}</p>}
        </div>
    );
}
