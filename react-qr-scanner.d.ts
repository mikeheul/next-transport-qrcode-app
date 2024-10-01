declare module 'react-qr-scanner' {
    import { ComponentType } from 'react';

    interface QrReaderProps {
        delay?: number;
        onError?: (error: any) => void;
        onScan?: (data: string | null) => void;
        style?: React.CSSProperties;
        facingMode?: 'front' | 'rear'; // Définit quelle caméra utiliser
    }

    const QrReader: ComponentType<QrReaderProps>;

    export default QrReader;
}