import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

const SECRET_KEY = process.env.SECRET_KEY || 'your-very-secure-key';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { qrCodeData } = req.body;

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
                    res.status(200).json({ valid: true, message: 'Billet valide' });
                } else {
                    res.status(400).json({ valid: false, message: 'Billet expiré' });
                }
            } else {
                // Signature invalide, possible tentative de falsification
                res.status(400).json({ valid: false, message: 'Signature invalide ou billet falsifié.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Erreur lors de la validation du billet.' });
        }
    } else {
        res.status(405).json({ message: 'Méthode non autorisée' });
    }
}
