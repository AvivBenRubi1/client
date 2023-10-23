import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import MapComponent from "./components/MapComponent";
import { socket } from "./socket";
import DroneData from "./dtos/drone-data.dto";

function App() {
  useEffect(() => {
    socket.on("drone-data", (droneData: DroneData) => {
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
