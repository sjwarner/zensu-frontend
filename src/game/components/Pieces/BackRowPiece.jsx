import React from "react";

const FrontRowPiece = ({ colour, forBoard }) => (
    <div className="cube">
      <img src={colour === "red" ? "/zensu-red-back-row.png" : "/zensu-blue-back-row.png"}
           alt={`${colour} back row piece`}
           className={forBoard && "h-16 m-auto"}
      />
    </div>
);

export default FrontRowPiece;
