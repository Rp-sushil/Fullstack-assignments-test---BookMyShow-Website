import React from "react";

export default function Slots({ slots, selectSlot, seletedslot }) {
  const getClass = (slot) =>
    slot === seletedslot ? "slot-column slot-column-selected" : "slot-column";
  return (
    <div className="slot-row">
      {slots.map((slot, i) => {
        return (
          <article
            onClick={selectSlot}
            className={getClass(slot)}
            key={"slot" + i}
          >
            {slot}
          </article>
        );
      })}
    </div>
  );
}
