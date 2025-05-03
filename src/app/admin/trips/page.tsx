export default function AdminTripsPage() {
  return (
    <main className="min-h-screen p-6 bg-white text-black">
      
      

      {/* Desktop view UI */}
      <div className="flex items-center justify-center w-full h-screen p-4">
        <div className="w-full h-full rounded-3xl bg-[#d3dbff] p-6 flex flex-col">
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center flex-grow">
            <div className="w-full bg-[#5c6bf2] rounded-full flex items-center px-6 py-4 mb-8 space-x-6">
              <h1 className="text-white text-5xl font-bold rounded-full bg-[#5c6bf2] px-3 py-3 focus:outline-none text-center">Allocate time</h1>
              <div className="flex space-x-6 ml-auto">
                <button className="w-20 h-12 rounded-full bg-[#8f9bff] text-white text-sm font-normal flex items-center justify-center">1 hr</button>
                <button className="w-20 h-12 rounded-full bg-[#8f9bff] text-white text-sm font-normal flex items-center justify-center">2 hr</button>
              </div>
            </div>
            <div className="w-full mb-8">
              <p className="text-sm font-normal text-black mb-3">Select time</p>
              <div className="flex items-center space-x-4">
                <button className="text-[#5c6bf2] font-bold text-2xl select-none">+</button>
                <span className="text-black font-extrabold text-2xl select-none">40</span>
                <button className="text-[#5c6bf2] font-bold text-2xl select-none">-</button>
              </div>
              <hr className="border-t border-gray-300 mt-4" />
            </div>
            <div className="w-full mb-8">
              <p className="text-sm font-normal text-black mb-3">Add personal message</p>
              <div className="flex items-center space-x-4">
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black text-lg shadow">
                  <i className="fas fa-microphone"></i>
                </button>
                <input
                  type="text"
                  placeholder="Record your msg"
                  className="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm text-black focus:outline-none"
                />
                <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black text-lg shadow">
                  <i className="fas fa-upload"></i>
                </button>
              </div>
            </div>
            <button className="w-full bg-[#5c6bf2] text-white text-sm font-normal rounded-full py-4">
              Add Students to Trip
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
