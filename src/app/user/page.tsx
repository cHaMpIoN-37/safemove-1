'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QRScanner from '../../components/QRScanner';

export default function UserPage() {
  const [scanning, setScanning] = useState(false);
  const [decodedText, setDecodedText] = useState<string | null>(null);
  const router = useRouter();

  const handleScan = (text: string) => {
    setDecodedText(text);
    // Do not stop scanning automatically to keep camera view active
    // setScanning(false);
  };

  const stopScanning = () => {
    setScanning(false);
  };

  const goToTrip = () => {
    router.push('/user/trips');
  };

  return (
    <main>
      <div className="bg-gradient-to-b from-[#dbe1ff] to-white min-h-screen flex justify-center items-center p-4">
        <div className="relative w-[390px] h-[844px] rounded-[40px] border border-black/20 shadow-lg bg-gradient-to-b from-[#dbe1ff] to-white flex flex-col items-center pt-14 px-6">
          <p className="text-[9px] text-center text-black/40 font-mono uppercase tracking-widest leading-[10px]">
            YOUR LOCATION ACCESSED
            <br />
            FOR SAFETY POLICY
          </p>
          <h1 className="mt-6 text-[40px] font-extrabold text-black leading-[44px] text-center max-w-[280px]">
            let’s start
            <br />
            your
            <span className="text-[#5f7aff]">
              trip
            </span>
          </h1>
          <div className="mt-10 w-full max-w-[320px] rounded-[24px] bg-white border border-black/10 shadow-sm flex flex-col overflow-hidden">
            <p className="text-[9px] font-mono text-center text-black/40 pt-3 select-none">
              ALIGN CAMERA TO QR
            </p>
            <div className="flex justify-center items-center my-6">
              {scanning ? (
                <QRScanner onScan={handleScan} />
              ) : (
                <img alt="Light blue square placeholder representing QR code scanning area" className="rounded-[16px]" height="160" src="https://storage.googleapis.com/a1aa/image/125557e8-127c-489a-b595-f3eb09292e5d.jpg" width="160" />
              )}
            </div>
            <div className="bg-[#dbe1ff] py-5 flex justify-center space-x-4">
              {scanning ? (
                <>
                  <button
                    className="bg-red-600 text-white text-[14px] font-medium rounded-[24px] px-10 py-2 hover:bg-red-700 transition"
                    type="button"
                    onClick={stopScanning}
                  >
                    Stop Scanning
                  </button>
                  <button
                    className="bg-green-600 text-white text-[14px] font-medium rounded-[24px] px-10 py-2 hover:bg-green-700 transition"
                    type="button"
                    onClick={goToTrip}
                  >
                    Go to Trip
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="bg-[#2f49f9] text-white text-[14px] font-medium rounded-[24px] px-10 py-2 hover:bg-[#2439c7] transition"
                    type="button"
                    onClick={() => setScanning(true)}
                  >
                    Scan QR code
                  </button>
                  <button
                    className="bg-green-600 text-white text-[14px] font-medium rounded-[24px] px-10 py-2 hover:bg-green-700 transition"
                    type="button"
                    onClick={goToTrip}
                  >
                    Go to Trip
                  </button>
                </>
              )}
            </div>
            {decodedText && (
              <div className="mt-4 text-center text-green-600 font-semibold">
                Scanned QR Code: {decodedText}
              </div>
            )}
          </div>
          <div className="mt-10 flex gap-6 bg-[#e6e6e6] rounded-[40px] px-6 py-4 shadow-inner" style={{ boxShadow: 'inset 0 0 10px #cfcfcf' }}>
            <button aria-label="Settings" className="w-12 h-12 rounded-full bg-[#4a4a4a] flex justify-center items-center text-white text-xl" type="button">
              <i className="fas fa-cog" />
            </button>
            <button aria-label="Share" className="w-12 h-12 rounded-full bg-[#4a4a4a] flex justify-center items-center text-white text-xl" type="button">
              <i className="fas fa-share-alt" />
            </button>
          </div>
          <button aria-label="Chat" className="absolute bottom-10 right-10 w-14 h-14 rounded-full bg-[#b7ff00] shadow-[0_0_20px_6px_rgba(183,255,0,0.7)] flex justify-center items-center text-black text-2xl" type="button">
            <i className="fas fa-comment-alt" />
          </button>
        </div>
      </div>
    </main>
  );
}
