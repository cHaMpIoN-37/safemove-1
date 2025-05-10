'use client';

import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

type QRScannerProps = {
  onScan: (decodedText: string) => void;
};

const QRScanner = ({ onScan }: QRScannerProps) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const html5QrcodeScannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (!scannerRef.current) return;

    const config = { fps: 10, qrbox: 250 };
    const html5QrcodeScanner = new Html5Qrcode('qr-reader');
    html5QrcodeScannerRef.current = html5QrcodeScanner;

    html5QrcodeScanner.start(
      { facingMode:  "environment" },
      config,
      (decodedText) => {
        onScan(decodedText);
        // Do not stop the scanner here to keep camera active and continuously scan
      },
      (errorMessage) => {
        // handle scan failure if needed
      }
    ).catch((err) => {
      // handle start errors, e.g. permission denied
      console.error("Failed to start QR scanner", err);
    });

    return () => {
      html5QrcodeScanner.stop().catch(() => {});
      html5QrcodeScanner.clear();
    };
  }, [onScan]);

  return <div id="qr-reader" ref={scannerRef} style={{ width: '320px', height: '320px' }} />;
};

export default QRScanner;
