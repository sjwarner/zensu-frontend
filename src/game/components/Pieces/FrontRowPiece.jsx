import React from "react";

const FrontRowPiece = ({ colour, forBoard }) => (
    <div className="cube">
      <img src={colour === "red" ? "/zensu-red-front-row.png" : "/zensu-blue-front-row.png"}
           alt={`${colour} front row piece`}
           className={forBoard && "h-16 m-auto"}
      />
    </div>
);

export default FrontRowPiece;
