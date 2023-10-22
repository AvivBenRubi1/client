import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import MapComponent from "./components/MapComponent";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    socket.on("drone-data", (droneData) => {
      console.log(droneData);
    });
  });

  return (
    <div className="App">
      <MapComponent />
    </div>
  );
}

export default App;
