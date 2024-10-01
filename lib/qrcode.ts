import QRCode from 'qrcode'

export async function generateQRCode(text: string): Promise<string> {
    try {
        const qr = await QRCode.toDataURL(text);
        return qr;
    } catch (err) {
        throw new Error('Erreur lors de la génération du QR code');
    }
}