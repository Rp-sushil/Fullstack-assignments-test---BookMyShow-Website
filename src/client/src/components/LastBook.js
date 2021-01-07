import React from "react";

export default function LastBook({ LastOrderdata }) {
  const { movie, seats, slot } = LastOrderdata;
  if (!movie || !seats || !slot)
    return (
      <div className="last-order">
        <strong>no previous booking found</strong>
      </div>
    );
  return (
    <div className="last-order">
      <h3>Last Booking Details</h3>
      <h6>seats</h6>
      <strong>A1</strong>:{seats.A1}
      <br />
      <strong>A2</strong>:{seats.A2}
      <br />
      <strong>A3</strong>:{seats.A3}
      <br />
      <strong>A4</strong>:{seats.A4}
      <br />
      <strong>D1</strong>:{seats.D1}
      <br />
      <strong>D2</strong>:{seats.D2}
      <br />
      <strong>slot</strong>:{slot}
      <br />
      <strong>movie</strong>:{movie}
    </div>
  );
}
