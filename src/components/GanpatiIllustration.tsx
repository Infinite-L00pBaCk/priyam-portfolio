import React from 'react';

interface GanpatiIllustrationProps {
  className?: string;
  onClick?: () => void;
}

export const GanpatiIllustration: React.FC<GanpatiIllustrationProps> = ({
  className = '',
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`relative select-none cursor-pointer transition-transform hover:scale-105 active:scale-95 group ${className}`}
      title="Lord Ganpati (Ganesha) • Shubh Labh & Engineering Wisdom"
    >
      {/* Interactive Tooltip on Hover */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-[#1c1d21] text-[#facc15] text-[7.5px] font-mono font-bold rounded border border-[#facc15] shadow-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30">
        ॐ Shree Ganeshay Namah ॐ
      </div>

      {/* Vector Illustration matching Image 1: Detailed, cute baby Ganpati with golden Mukut, parashu axe, modaks and mouse */}
      <svg
        viewBox="0 0 200 210"
        className="w-32 sm:w-40 md:w-44 h-auto drop-shadow-[4px_4px_0px_#1c1d21]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft Grounding Shadow on Desk Grid */}
        <ellipse cx="100" cy="198" rx="76" ry="9" fill="#1c1d21" opacity="0.3" />

        {/* 1. Large Fluffy Baby Elephant Ears */}
        {/* Left Ear Outer */}
        <path
          d="M62 70 C30 52, 12 78, 22 108 C30 126, 50 120, 60 108 Z"
          fill="#ffd7ba"
          stroke="#1c1d21"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Left Ear Inner Pink Fluff */}
        <path
          d="M54 78 C36 66, 24 84, 32 104 C38 114, 48 110, 52 102 Z"
          fill="#fbcfe8"
          stroke="#1c1d21"
          strokeWidth="1.5"
        />

        {/* Right Ear Outer */}
        <path
          d="M138 70 C170 52, 188 78, 178 108 C170 126, 150 120, 140 108 Z"
          fill="#ffd7ba"
          stroke="#1c1d21"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Right Ear Inner Pink Fluff */}
        <path
          d="M146 78 C164 66, 176 84, 168 104 C162 114, 152 110, 148 102 Z"
          fill="#fbcfe8"
          stroke="#1c1d21"
          strokeWidth="1.5"
        />

        {/* 2. Red & Gold Silk Dhoti with Lotus Legs (Padmasana) */}
        {/* Left Leg Knee */}
        <path
          d="M36 172 C36 150, 62 144, 94 148 C94 176, 58 194, 36 172 Z"
          fill="#ef4444"
          stroke="#1c1d21"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M42 165 C54 156, 74 158, 86 166" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M40 174 C50 168, 70 172, 80 180" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />

        {/* Right Leg Knee */}
        <path
          d="M164 172 C164 150, 138 144, 106 148 C106 176, 142 194, 164 172 Z"
          fill="#ef4444"
          stroke="#1c1d21"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M158 165 C146 156, 126 158, 114 166" stroke="#b91c1c" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M160 174 C150 168, 130 172, 120 180" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />

        {/* Golden Central Dhoti Pleat / Knot (Patka) */}
        <path
          d="M84 150 L116 150 L108 174 L92 174 Z"
          fill="#f59e0b"
          stroke="#1c1d21"
          strokeWidth="2.5"
        />
        <circle cx="100" cy="154" r="5" fill="#dc2626" stroke="#1c1d21" strokeWidth="2" />

        {/* Cute Tiny Chubby Feet Peeking Out */}
        {/* Left Foot */}
        <g>
          <ellipse cx="88" cy="186" rx="9" ry="7" fill="#ffd7ba" stroke="#1c1d21" strokeWidth="2.5" />
          <circle cx="83" cy="189" r="1.5" fill="#1c1d21" />
          <circle cx="86" cy="190" r="1.5" fill="#1c1d21" />
          <circle cx="89" cy="190" r="1.5" fill="#1c1d21" />
          <circle cx="92" cy="189" r="1.5" fill="#1c1d21" />
          <circle cx="95" cy="187" r="1.5" fill="#1c1d21" />
        </g>
        {/* Right Foot */}
        <g>
          <ellipse cx="112" cy="186" rx="9" ry="7" fill="#ffd7ba" stroke="#1c1d21" strokeWidth="2.5" />
          <circle cx="105" cy="187" r="1.5" fill="#1c1d21" />
          <circle cx="108" cy="189" r="1.5" fill="#1c1d21" />
          <circle cx="111" cy="190" r="1.5" fill="#1c1d21" />
          <circle cx="114" cy="190" r="1.5" fill="#1c1d21" />
          <circle cx="117" cy="189" r="1.5" fill="#1c1d21" />
        </g>

        {/* 3. Round Chubby Body / Tummy (Lambodara) */}
        <ellipse
          cx="100"
          cy="142"
          rx="38"
          ry="28"
          fill="#ffd7ba"
          stroke="#1c1d21"
          strokeWidth="3.5"
        />
        {/* Golden Torso Necklace */}
        <path
          d="M74 122 Q100 148 126 122"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M74 122 Q100 148 126 122"
          fill="none"
          stroke="#1c1d21"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Sacred Thread (Janeu) across body */}
        <path
          d="M78 128 Q96 150 114 170"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="4 2"
          strokeLinecap="round"
        />
        <path
          d="M78 128 Q96 150 114 170"
          stroke="#1c1d21"
          strokeWidth="0.8"
          strokeDasharray="4 2"
          strokeLinecap="round"
        />

        {/* Cute Baby Belly Creases */}
        <path d="M86 138 Q100 144 114 138" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M90 146 Q100 150 110 146" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* 4. Upper Left Hand: Holding Parashu (Ancient Battle Axe) */}
        <g>
          {/* Wooden Axe Handle */}
          <line
            x1="18"
            y1="82"
            x2="48"
            y2="148"
            stroke="#78350f"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Silver/Steel Axe Blade with Curved Edge */}
          <path
            d="M20 86 C8 92, 6 116, 26 124 C34 114, 32 94, 20 86 Z"
            fill="#cbd5e1"
            stroke="#1c1d21"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M14 96 C12 104, 14 114, 22 118"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand clasping the axe shaft */}
          <circle cx="36" cy="122" r="7" fill="#ffd7ba" stroke="#1c1d21" strokeWidth="3" />
          <path d="M32 118 L40 120" stroke="#1c1d21" strokeWidth="2" strokeLinecap="round" />
          <path d="M31 123 L39 125" stroke="#1c1d21" strokeWidth="2" strokeLinecap="round" />
          <path d="M32 127 L39 129" stroke="#1c1d21" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* 5. Lower Left Hand: Raised in Abhaya Mudra / Open Palm Blessing */}
        <g>
          {/* Chubby Arm */}
          <path
            d="M66 132 C52 136, 44 148, 52 160 C58 160, 68 152, 74 144"
            fill="#ffd7ba"
            stroke="#1c1d21"
            strokeWidth="3"
          />
          {/* Palm with cute fingers */}
          <path
            d="M52 144 C48 138, 54 132, 60 132 C64 132, 66 140, 62 148 Z"
            fill="#ffd7ba"
            stroke="#1c1d21"
            strokeWidth="2.5"
          />
          <circle cx="56" cy="140" r="1.5" fill="#f43f5e" />
        </g>

        {/* 6. Upper & Lower Right Hands: Holding Delicious Golden Modak & Pouch */}
        <g>
          {/* Right Arm */}
          <path
            d="M130 134 C146 138, 158 144, 150 160 C142 160, 134 150, 126 142"
            fill="#ffd7ba"
            stroke="#1c1d21"
            strokeWidth="3"
          />
          {/* Sweet Prasad Pouch / Large Modak in hand */}
          <path
            d="M142 130 C134 116, 160 102, 168 116 C174 126, 162 140, 150 148 C144 146, 138 140, 142 130 Z"
            fill="#f59e0b"
            stroke="#1c1d21"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Modak Swirl Lines */}
          <path d="M152 110 Q156 122 148 134" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M158 112 Q162 124 156 136" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M164 118 Q166 126 162 136" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Golden Modak Peak */}
          <path
            d="M150 116 Q156 102 162 116 Z"
            fill="#fbbf24"
            stroke="#1c1d21"
            strokeWidth="2"
          />

          {/* Lower Sweet Pouch/Bundle */}
          <path
            d="M136 150 C128 142, 144 136, 150 144 C156 152, 148 162, 140 162 C134 160, 132 154, 136 150 Z"
            fill="#d97706"
            stroke="#1c1d21"
            strokeWidth="2.5"
          />
          {/* Fingers holding the prasad */}
          <circle cx="140" cy="156" r="4.5" fill="#ffd7ba" stroke="#1c1d21" strokeWidth="2" />
          <circle cx="146" cy="154" r="4" fill="#ffd7ba" stroke="#1c1d21" strokeWidth="2" />
        </g>

        {/* 7. Cute Round Head with Big Expressive Eyes & Rosy Cheeks */}
        <path
          d="M64 78 C64 54, 136 54, 136 78 C136 102, 126 116, 100 118 C74 116, 64 102, 64 78 Z"
          fill="#ffd7ba"
          stroke="#1c1d21"
          strokeWidth="3.5"
        />

        {/* Rosy Pink Cheeks */}
        <ellipse cx="70" cy="94" rx="6" ry="4" fill="#fda4af" opacity="0.9" />
        <ellipse cx="130" cy="94" rx="6" ry="4" fill="#fda4af" opacity="0.9" />

        {/* Big Sparkling Anime/Cartoon Kind Eyes */}
        {/* Left Eye */}
        <ellipse cx="78" cy="80" rx="6.5" ry="8.5" fill="#1c1d21" />
        <ellipse cx="76" cy="77" rx="2.5" ry="3.5" fill="#ffffff" />
        <circle cx="81" cy="84" r="1.5" fill="#ffffff" />
        {/* Left Eyelash/Brow */}
        <path d="M72 70 Q78 66 84 69" stroke="#1c1d21" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Right Eye */}
        <ellipse cx="122" cy="80" rx="6.5" ry="8.5" fill="#1c1d21" />
        <ellipse cx="120" cy="77" rx="2.5" ry="3.5" fill="#ffffff" />
        <circle cx="125" cy="84" r="1.5" fill="#ffffff" />
        {/* Right Eyelash/Brow */}
        <path d="M116 69 Q122 66 128 70" stroke="#1c1d21" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Red Sacred Trishul/Urdhva Pundra Tilak on Forehead */}
        <path
          d="M94 56 C94 56, 96 68, 100 70 C104 68, 106 56, 106 56"
          stroke="#dc2626"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <line x1="100" y1="58" x2="100" y2="68" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="73" r="2" fill="#f59e0b" />

        {/* Single Tusk (Ekadanta) */}
        <path d="M86 98 L92 98 L90 106 Z" fill="#ffffff" stroke="#1c1d21" strokeWidth="2" strokeLinejoin="round" />

        {/* 8. Playfully Curved Elephant Trunk (Vakratunda) Curving Toward Right */}
        <path
          d="M92 90 C92 108, 98 126, 116 128 C128 128, 134 120, 132 112 C130 106, 118 108, 110 100 C106 94, 108 90, 108 90"
          fill="#ffd7ba"
          stroke="#1c1d21"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Trunk Wrinkle Lines */}
        <path d="M96 98 Q102 102 106 98" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M98 106 Q106 110 110 106" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M104 114 Q112 118 118 114" stroke="#f97316" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* 9. Elaborate Ornate Golden Mukut (Crown) exactly as in Image 1 */}
        {/* Crown Base Rim */}
        <path
          d="M66 58 C66 42, 134 42, 134 58 C124 64, 76 64, 66 58 Z"
          fill="#f59e0b"
          stroke="#1c1d21"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Crown Lower Band Arch */}
        <path
          d="M72 52 C72 32, 128 32, 128 52 Z"
          fill="#fbbf24"
          stroke="#1c1d21"
          strokeWidth="3"
        />
        {/* Red Teardrop Gem in Crown Center */}
        <path
          d="M100 24 C94 34, 94 44, 100 48 C106 44, 106 34, 100 24 Z"
          fill="#ef4444"
          stroke="#1c1d21"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <circle cx="98" cy="38" r="1.5" fill="#ffffff" />

        {/* Crown Top Tier Peaks & Filigree */}
        <path
          d="M84 32 C84 18, 96 14, 100 8 C104 14, 116 18, 116 32 Z"
          fill="#f59e0b"
          stroke="#1c1d21"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Crown Ornate Side Wings */}
        <path d="M78 40 Q84 28 92 34" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M122 40 Q116 28 108 34" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        {/* Crown Finial Pearl Top */}
        <circle cx="100" cy="8" r="3.5" fill="#fbbf24" stroke="#1c1d21" strokeWidth="2" />

        {/* 10. Cute Little Mouse Companion (Mooshak) in Lower Right */}
        <g transform="translate(144, 166)">
          {/* Mouse Shadow */}
          <ellipse cx="20" cy="24" rx="16" ry="4" fill="#1c1d21" opacity="0.25" />
          {/* Mouse Body */}
          <ellipse cx="18" cy="17" rx="14" ry="10" fill="#94a3b8" stroke="#1c1d21" strokeWidth="2.5" />
          {/* Mouse Snout & Head */}
          <path
            d="M6 16 C2 19, 2 21, 6 22 C12 23, 14 17, 10 14 Z"
            fill="#94a3b8"
            stroke="#1c1d21"
            strokeWidth="2"
          />
          {/* Nose Tip */}
          <circle cx="3" cy="20" r="1.5" fill="#ef4444" />
          {/* Round Cute Mouse Ear */}
          <circle cx="14" cy="9" r="5.5" fill="#94a3b8" stroke="#1c1d21" strokeWidth="2" />
          <circle cx="14" cy="9" r="3" fill="#fbcfe8" />
          {/* Mouse Eye */}
          <circle cx="7" cy="16" r="1.5" fill="#1c1d21" />
          <circle cx="6.5" cy="15.5" r="0.5" fill="#ffffff" />
          {/* Paws */}
          <ellipse cx="12" cy="24" rx="3.5" ry="2" fill="#94a3b8" stroke="#1c1d21" strokeWidth="1.5" />
          <ellipse cx="22" cy="24" rx="3.5" ry="2" fill="#94a3b8" stroke="#1c1d21" strokeWidth="1.5" />
          {/* Long Curled Tail */}
          <path
            d="M31 17 C38 18, 42 14, 38 7"
            stroke="#1c1d21"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
