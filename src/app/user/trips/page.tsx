'use client';

import { useState } from 'react';

export default function UserTripsPage() {
  const [showExtendDialog, setShowExtendDialog] = useState(false);
  const [extendTime, setExtendTime] = useState(0);
  const [personalMessage, setPersonalMessage] = useState('');

  const openExtendDialog = (time: number) => {
    setExtendTime(time);
    setShowExtendDialog(true);
  };

  const closeExtendDialog = () => {
    setShowExtendDialog(false);
    setExtendTime(0);
    setPersonalMessage('');
  };

  const incrementTime = () => {
    setExtendTime((prev) => prev + 1);
  };

  const decrementTime = () => {
    setExtendTime((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalMessage(e.target.value);
  };

  const sendExtensionRequest = () => {
    // Implement sending extension request logic here
    alert(`Extension requested for ${extendTime} minutes with message: ${personalMessage}`);
    closeExtendDialog();
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#d7dbff] to-[#f0f3ff]">
      <div
        className="relative w-full max-w-[390px] h-[844px] bg-white rounded-[40px] shadow-lg flex flex-col px-6 pt-14 pb-6"
        style={{ fontFeatureSettings: "'tnum'" }}
      >
        <div className="text-center">
          <p className="text-[9px] text-[#6b6b6b] font-mono uppercase tracking-widest leading-[10px] mb-2">
            Your location accessed<br />for safety policy
          </p>
          <h1 className="text-4xl font-extrabold text-black leading-[1.1]">
            Your <span className="text-[#3b56f5]">trip</span> has<br />
            been <span className="text-[#3b56f5]">Started</span>
          </h1>
        </div>

        <div
          className="mt-8 bg-white rounded-2xl border border-gray-300 p-6 max-w-[350px] mx-auto"
          style={{ boxShadow: '0 0 10px rgb(59 86 245 / 0.3)' }}
        >
          <div className="flex items-center justify-center mb-2">
            <span className="w-2 h-2 rounded-full bg-[#d7dbff] mr-2"></span>
            <p className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">
              Remaining time
            </p>
          </div>
          <p
            className="text-[56px] font-extrabold text-black text-center leading-none"
            style={{ textShadow: '2px 2px 0 rgb(59 86 245 / 0.3)' }}
          >
            45:00
          </p>
        </div>

        <div
          className="mt-6 bg-[#d7dbff] rounded-3xl flex items-center justify-between gap-10 max-w-[350px] mx-auto px-6 py-4"
        >
          <button
            className="bg-[#3b56f5] text-white rounded-full px-8 py-3 text-sm font-normal"
            onClick={() => openExtendDialog(0)}
          >
            Extend time
          </button>
          <div className="flex space-x-4">
            <button
              className="bg-[#3b56f5] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-normal"
              onClick={() => openExtendDialog(20)}
            >
              20
            </button>
            <button
              className="bg-[#3b56f5] text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-normal"
              onClick={() => openExtendDialog(40)}
            >
              40
            </button>
          </div>
        </div>

        <div className="mt-8 space-y-4 max-w-[350px] mx-auto w-full">
          <button
            className="w-full bg-[#3b56f5] text-white rounded-3xl py-4 text-center text-base font-normal"
          >
            Call Hostel
          </button>
          <button
            className="w-full bg-[#3b56f5] text-white rounded-3xl py-4 text-center text-base font-normal"
          >
            Call Police
          </button>
          <button
            className="w-full bg-[#f2300f] text-white rounded-3xl py-4 text-center text-base font-normal"
          >
            Emergency
          </button>
        </div>

        <div
          className="absolute bottom-6 left-6 bg-gray-200 rounded-full flex space-x-4 px-4 py-3"
          style={{ width: '120px' }}
        >
          <button
            className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white"
            aria-label="Settings"
          >
            <i className="fas fa-cog"></i>
          </button>
          <button
            className="bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center text-white"
            aria-label="Share"
          >
            <i className="fas fa-share-alt"></i>
          </button>
        </div>

        <button
          className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-[#a6ff00] flex items-center justify-center shadow-[0_0_15px_5px_rgba(166,255,0,0.7)]"
          aria-label="Chat"
        >
          <i className="fas fa-comment-alt text-black text-lg"></i>
        </button>

        {showExtendDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="w-full max-w-xs rounded-3xl bg-[#d3dbff] p-6">
              <div className="bg-white rounded-3xl p-6 flex flex-col items-center">
                <p className="text-[10px] font-mono text-[#6b6b6b] mb-2 tracking-widest">EXTRA TIME</p>
                <h1 className="text-5xl font-extrabold font-sans text-black drop-shadow-[2px_2px_2px_rgba(99,102,241,0.5)] mb-6 select-none">{extendTime}:00</h1>
                <div className="w-full bg-[#5c6bf2] rounded-full flex items-center px-6 py-3 mb-6 space-x-4">
                  <button className="text-white text-xs font-normal rounded-full bg-[#5c6bf2] px-6 py-2 focus:outline-none">Extend time</button>
                  <div className="flex space-x-4 ml-auto">
                    <button className="w-10 h-10 rounded-full bg-[#8f9bff] text-white text-xs font-normal flex items-center justify-center" onClick={() => openExtendDialog(20)}>20</button>
                    <button className="w-10 h-10 rounded-full bg-[#8f9bff] text-white text-xs font-normal flex items-center justify-center" onClick={() => openExtendDialog(40)}>40</button>
                  </div>
                </div>
                <div className="w-full mb-6">
                  <p className="text-xs font-normal text-black mb-2">Select time</p>
                  <div className="flex items-center space-x-2">
                    <button className="text-[#5c6bf2] font-bold text-xl select-none" onClick={incrementTime}>+</button>
                    <span className="text-black font-extrabold text-xl select-none">{extendTime}</span>
                    <button className="text-[#5c6bf2] font-bold text-xl select-none" onClick={decrementTime}>-</button>
                  </div>
                  <hr className="border-t border-gray-300 mt-3" />
                </div>
                <div className="w-full mb-6">
                  <p className="text-xs font-normal text-black mb-2">Add personal message</p>
                  <div className="flex items-center space-x-2">
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black text-lg shadow">
                      <i className="fas fa-microphone"></i>
                    </button>
                    <input
                      type="text"
                      placeholder="Record your msg"
                      className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-xs text-black focus:outline-none"
                      value={personalMessage}
                      onChange={handleMessageChange}
                    />
                    <button className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black text-lg shadow">
                      <i className="fas fa-upload"></i>
                    </button>
                  </div>
                </div>
                <button
                  className="w-full bg-[#5c6bf2] text-white text-xs font-normal rounded-full py-3"
                  onClick={sendExtensionRequest}
                >
                  Send Extension Request
                </button>
                <button
                  className="mt-4 w-full bg-gray-300 text-black text-xs font-normal rounded-full py-3"
                  onClick={closeExtendDialog}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
