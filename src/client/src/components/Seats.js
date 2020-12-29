import React from "react";

export default function Seats({
  seats,
  selectSeat,
  selectedSeat,
  seatsValues,
  changeSeatsValues,
}) {
  const getClass = (seat) =>
    seat === selectedSeat ? "seat-column seat-column-selected" : "seat-column";
  return (
    <div className="seat-row">
      {seats.map((seat, i) => {
        return (
          <div key={"seat-" + seat} className={getClass(seat)}>
            <h5>Type-{seat}</h5>
            <input
              type="number"
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
