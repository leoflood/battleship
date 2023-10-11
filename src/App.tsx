import { useState } from "react";
import "./App.css";
import BattleshipGrid from "./components/BattleshipGrid";
import Score from "./components/Score";
import useDeviceType, { DeviceType } from "./hooks/useDeviceType";

const data = {
  shipTypes: {
    carrier: { size: 5, count: 1 },
    battleship: { size: 4, count: 1 },
    cruiser: { size: 3, count: 1 },
    submarine: { size: 3, count: 1 },
    destroyer: { size: 2, count: 1 },
  },
  layout: [
    {
      ship: "carrier",
      positions: [
        [2, 9],
        [3, 9],
        [4, 9],
        [5, 9],
        [6, 9],
      ],
    },
    {
      ship: "battleship",
      positions: [
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
      ],
    },
    {
      ship: "cruiser",
      positions: [
        [8, 1],
        [8, 2],
        [8, 3],
      ],
    },
    {
      ship: "submarine",
      positions: [
        [3, 0],
        [3, 1],
        [3, 2],
      ],
    },
    {
      ship: "destroyer",
      positions: [
        [0, 0],
        [1, 0],
      ],
    },
  ],
};

const generateGrid = (): (string | null)[][] => {
  const grid = [];

  for (let i = 0; i < 10; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(null);
    }
    grid.push(row);
  }

  return grid;
};

const grid = generateGrid();

data.layout.forEach((ship) => {
  ship.positions.forEach(([x, y]) => {
    grid[x][y] = ship.ship;
  });
});

const initialShipStatus: any = {};
data.layout.forEach((ship) => {
  initialShipStatus[ship.ship] = [...ship.positions];
});

function App() {
  const deviceType = useDeviceType();

  const [hits, setHits] = useState({});
  const [shipStatus, setShipStatus] = useState(initialShipStatus);

  function updateShipStatus(x: number, y: number) {
    for (const shipName in shipStatus) {
      const shipPositions = shipStatus[shipName];
      const index = shipPositions.findIndex(
        (position: number[]) => position[0] === x && position[1] === y
      );

      if (index !== -1) {
        shipPositions.splice(index, 1);

        if (shipPositions.length === 0) {
          let gameOver = true;
          for (const shipName2 in shipStatus) {
            const shipPositions = shipStatus[shipName2];

            if (shipPositions.length) {
              gameOver = false;
              break;
            }
          }

          if (gameOver) {
            alert("GAME OVER!");
          }
        }
      }
    }

    setShipStatus({ ...shipStatus });
  }

  const score = (
    <Score shipStatus={shipStatus} grid={grid} data={data} hits={hits} />
  );
  const battleshipGrid = (
    <BattleshipGrid
      data={data}
      grid={grid}
      hits={hits}
      shipStatus={shipStatus}
      onClick={(x, y) => {
        setHits({
          ...hits,
          [x + "," + y]: true,
        });

        updateShipStatus(x, y);
      }}
    />
  );

  const content =
    deviceType === DeviceType.Computer ? (
      <div style={{ display: "flex", flexDirection: "row" }}>
        {score}
        {battleshipGrid}
      </div>
    ) : (
      <div>
        {battleshipGrid}
        {score}
      </div>
    );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Battleship by Leonardo Massaroli</h2>
      {content}
    </div>
  );
}

export default App;
