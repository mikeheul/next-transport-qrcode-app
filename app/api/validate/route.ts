import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY || 'b9f3150f283cdff4725b8b9e3c65b4bb935ac153b9f2b4415b02f5c1aa76261f';

export default async function POST(req: NextRequest) {
    
    const { qrCodeData } = await req.json();

    try {
        // Extraire les données et la signature du QR code
        const { validUntil, signature } = qrCodeData;

        // Recalcul de la signature à partir des données du billet
        const recalculatedSignature = crypto
            .createHmac('sha256', SECRET_KEY)
            .update(JSON.stringify({ validUntil }))
            .digest('hex');

        // Comparaison de la signature recalculée et celle du QR code
        if (recalculatedSignature === signature) {
            const now = new Date();
            const validUntilDate = new Date(validUntil);

            // Vérification de la date de validité du billet
            if (now <= validUntilDate) {
                return NextResponse.json({ valid: true, message: 'Billet valide' });
            } else {
                return NextResponse.json({ valid: false, message: 'Billet expiré' });
            }
        } else {
            // Signature invalide, possible tentative de falsification
            return NextResponse.json({ valid: false, message: 'Signature invalide ou billet falsifié.' });        }
    } catch (error) {
        return NextResponse.json(error);        
    }
}

