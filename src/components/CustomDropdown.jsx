import React, { useState } from 'react';

const GATES = ['AND', 'OR', 'NOT', 'XOR', 'NOR', 'NAND', 'XNOR'];

const CustomDropdown = ({ gate, setGate }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-xs">
      <div
        className="bg-[#242c3b] text-white px-4 py-3 rounded-lg cursor-pointer flex justify-between items-center shadow-md transition-all"
        onClick={() => setOpen(!open)}
      >
        {gate}
        <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>▼</span>
      </div>

      {open && (
        <ul className="absolute top-full left-0 right-0 mt-1 bg-[#1a1f2b] rounded-lg shadow-lg overflow-hidden animate-fade-in-down z-10">
          {GATES.map((g) => (
            <li
              key={g}
              className="px-4 py-2 hover:bg-[#00cfff33] transition-all cursor-pointer"
              onClick={() => {
                setGate(g);
                setOpen(false);
              }}
            >
              {g}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
