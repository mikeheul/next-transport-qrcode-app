import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const SECRET_KEY = process.env.SECRET_KEY || 'b9f3150f283cdff4725b8b9e3c65b4bb935ac153b9f2b4415b02f5c1aa76261f';

export async function POST(req: NextRequest) {
    
    const qrCodeData = await req.json();

    try {
        // Extract data and signature from the QR code
        const { validUntil, signature } = qrCodeData;

        // Recalculate the signature based on the ticket data
        const recalculatedSignature = crypto
            .createHmac('sha256', SECRET_KEY)
            .update(JSON.stringify({ validUntil }))
            .digest('hex');

        // Compare the recalculated signature with the QR code's signature
        if (recalculatedSignature === signature) {
            const now = new Date();
            const validUntilDate = new Date(validUntil);

            // Check the validity date of the ticket
            if (now <= validUntilDate) {
                return NextResponse.json({ valid: true, message: 'Valid ticket' });
            } else {
                return NextResponse.json({ valid: false, message: 'Ticket expired' });
            }
        } else {
            // Invalid signature, possible tampering attempt
            return NextResponse.json({ valid: false, message: 'Invalid signature or tampered ticket.' });
        }
    } catch (error) {
        return NextResponse.json(error);        
    }
}
