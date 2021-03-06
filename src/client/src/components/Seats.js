import React from "react";

export default function Seats({
  seats,
  selectSeat,
  selectedSeat,
  seatsValues,
  changeSeatsValues,
}) {
  const getClass = (seat) =>
    parseInt(seatsValues[seat]) > 0 ? "seat-column seat-column-selected" : "seat-column";
  return (
    <div className="seat-row">
      {console.log("rendered")}
      {seats.map((seat, i) => {
        return (
          <div key={"seat-" + seat} className={getClass(seat)}>
            <h5>Type {seat}</h5>
            <input
              type="number"
              value={seatsValues[seat]}
              min="0"
              max="100"
              id={"seat-" + seat}
              name={"seat-" + seat}
              onFocus={selectSeat}
              onChange={(e) => {
                changeSeatsValues(e);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
