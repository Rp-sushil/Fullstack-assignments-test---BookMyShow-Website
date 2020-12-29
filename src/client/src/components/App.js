import React, { useState, useEffect } from "react";
import "../styles/App.css";
import "../styles/bootstrap.min.css";
import { movies, seats, slots } from "./data";

// comonents
import Moives from "./Moives";
import Slots from "./Slots";
import Seats from "./Seats";
import LastBook from "./LastBook";

const App = () => {
  // write your code here
  const [selectedMovie, setSelectedMovie] = useState(
    localStorage.getItem("movie")
  );
  const [seletedslot, setSelectedslot] = useState(
    localStorage.getItem("slots")
  );
  const [seatsValues, setSeatsValues] = useState(new Map());
  const [selectedSeat, setSelectedSeat] = useState(
    localStorage.getItem("seats")
  );
  const [lastOrder, setlastOrder] = useState({});

  const fetchLastOrder = async () => {
    const res = await fetch("/api/booking");
    const data = await res.json();
    setlastOrder(data);
  };

  const makeOrder = async () => {
    // POST request using fetch with async/await
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        movie: selectedMovie,
        seats: {
          A1: seatsValues["A1"],
          A2: seatsValues["A2"],
          A3: seatsValues["A3"],
          A4: seatsValues["A4"],
          D1: seatsValues["D1"],
          D2: seatsValues["D2"],
        },
        slot: seletedslot,
      }),
    };
    const response = await fetch("/api/booking", requestOptions);
    const data = await response.json();
    console.log(data);
  };

  const validateData = () => {
    let flag = 1;
    let count = 0;
    if (!selectedSeat || !selectedMovie || !seletedslot) flag = 0;
    seats.forEach((seat) => {
      if (isNaN(seatsValues[seat])) flag = 0;
      count += seatsValues[seat];
    });
    console.log(count);
    if (count < 1) flag = 0;
    return flag;
  };

  useEffect(() => {
    fetchLastOrder();
    if (!localStorage.getItem("seats")) {
      const temp = seatsValues;
      temp["A1"] = 0;
      temp["A2"] = 0;
      temp["A3"] = 0;
      temp["A4"] = 0;
      temp["D1"] = 0;
      temp["D2"] = 0;
      setSeatsValues(temp);
    } else {
      setSeatsValues(localStorage.getItem("seats"));
    }
  }, []);

  const clearRequest = () => {
    setSelectedSeat(null);
    setSelectedMovie(null);
    setSelectedslot(null);
    seats.forEach((seat) => {
      seatsValues[seat] = 0;
    });
  };

  const handleClick = async () => {
    if (validateData()) {
      await makeOrder();
      await fetchLastOrder();
    } else {
      console.log("invalidData");
    }
    clearRequest();
  };

  return (
    <>
      <h1>Book that show</h1>
      <Moives
        moives={movies}
        selectMovie={(e) => setSelectedMovie(e.target.innerHTML)}
        selectedMoive={selectedMovie}
      />
      <Slots
        slots={slots}
        selectSlot={(e) => setSelectedslot(e.target.innerHTML)}
        seletedslot={seletedslot}
      />
      <Seats
        seats={seats}
        selectSeat={(e) => {
          setSelectedSeat(e.target.id.slice(5));
        }}
        selectedSeat={selectedSeat}
        seatsValues={seatsValues}
        changeSeatsValues={(e) => {
          seatsValues[e.target.id.slice(5)] =
            isNaN(e.target.value) ||
            !parseInt(e.target.value) ||
            parseInt(e.target.value) < 0
              ? 0
              : parseInt(e.target.value);
          e.target.value = seatsValues[e.target.id.slice(5)];
          setSeatsValues(seatsValues);
          console.log(seatsValues);
        }}
      />
      <LastBook LastOrderdata={lastOrder} />
      <div key="button" className="book-button">
        <button onClick={handleClick}>Book Now</button>
      </div>
    </>
  );
};

export default App;
