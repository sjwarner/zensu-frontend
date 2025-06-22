import React from "react";
import FrontRowPiece from "../../../game/components/Pieces/FrontRowPiece.jsx";

const Header = () => {
  return (
    <header className="py-5 bg-[#fbefdf] text-white text-center flex flex-row justify-between">
      <div className="h-8 w-8 ml-8 mr-8 mt-auto mb-auto">
        <FrontRowPiece colour="red" forBoard={false} />
      </div>
      <h1 className="font-bold text-2xl text-[#ce3731]">
        <a href="/src/pages">🌸 Zensū 🌸</a>
      </h1>
      <div className="h-8 w-8 ml-8 mr-8 mt-auto mb-auto">
        <FrontRowPiece colour="blue" forBoard={false} />
      </div>
    </header>
  );
};

export default Header;
