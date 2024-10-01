declare module 'react-qr-scanner' {
    import { ComponentType } from 'react';

    interface QrReaderProps {
        delay?: number;
        onError?: (error: any) => void;
        onScan?: (data: {text: string} | null) => void;
        style?: React.CSSProperties;
        // facingMode?: 'front' | 'rear';
        constraints?: {
            video: {
                aspectRatio: number;
                facingMode: { ideal: string };
            };
            audio?: boolean;  // optional, can be included if you need audio
        };
    }

    const QrReader: ComponentType<QrReaderProps>;

    export default QrReader;
}