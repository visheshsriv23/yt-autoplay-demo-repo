import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-[#222] bg-[#0f0f0f] px-6 text-white font-sans">
      {/* Left Section: Logo & Menu */}
      <div className="flex items-center gap-4">
        <button className="bg-transparent border-none text-white text-xl cursor-pointer p-2 hover:bg-[#222] rounded-full transition-colors">
          ☰
        </button>
        
        {/* Brand */}
        <div className="flex items-center gap-1 cursor-pointer">
          <div className="bg-[#FF0000] text-white px-2 py-0.5 rounded-md font-bold text-sm">
            ▶
          </div>
          <span className="font-bold text-lg tracking-tighter">
            YouTube<span className="text-xs text-[#aaa] ml-1 align-super font-normal">Clone</span>
          </span>
        </div>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex flex-1 max-w-[600px] items-center mx-4">
        <div className="flex w-full rounded-full overflow-hidden border border-[#303030]">
          <input 
            type="text" 
            placeholder="Search" 
            className="flex-1 bg-[#121212] border-none px-4 h-10 text-white text-base outline-none focus:border focus:border-blue-500"
          />
          <button className="bg-[#222222] border-none border-l border-[#303030] w-16 text-white cursor-pointer text-base flex items-center justify-center hover:bg-[#333]">
            🔍
          </button>
        </div>
      </div>

      {/* Right Section: Actions */}
      <div className="flex items-center gap-4">
        <button className="bg-transparent border-none text-white text-lg cursor-pointer hover:bg-[#222] p-2 rounded-full">
          📹
        </button>
        <button className="bg-transparent border-none text-white text-lg cursor-pointer hover:bg-[#222] p-2 rounded-full">
          🔔
        </button>
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#555] cursor-pointer bg-[url('https://via.placeholder.com/32/007FFF/FFFFFF?text=V')] bg-cover" />
      </div>
    </nav>
  );
};

export default Navbar;