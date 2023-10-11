import useDeviceType from "../hooks/useDeviceType";
import { cellResolutions } from "./BattleshipGrid";
import "./Score.css";

export default function Score({ shipStatus, data, grid, hits }: any) {
  let hitsAmount = 0;

  Object.keys(hits).forEach((hit) => {
    const [x, y] = hit.split(",");

    if (grid[x][y]) {
      hitsAmount++;
    }
  });

  const deviceType = useDeviceType()!;

  let cellSize = cellResolutions[deviceType];

  const shipsUi: any = [];

  Object.keys(shipStatus).forEach((ship) => {
    const shipSize = data.shipTypes[ship].size;

    const circles = [];
    for (let i = 0; i < shipSize; i++) {
      if (i >= shipStatus[ship].length) {
        circles.push(
          <img
            key={ship + i}
            src="hit-small.png"
            style={{ height: cellSize }}
          />
        );
      } else {
        circles.push(
          <img
            key={ship + i}
            src="miss-small.png"
            style={{ height: cellSize }}
          />
        );
      }
    }

    shipsUi.push(
      <div key={ship} style={{ display: "flex", alignItems: "center" }}>
        <img key={ship} src={`${ship}.png`} height={cellSize} />
        {circles}
      </div>
    );
  });

  return (
    <div>
      <div className="players">
        <div className="player-box">
          <p>Player 1</p>
          <p>{hitsAmount}</p>
        </div>

        <div className="player-box" style={{ backgroundColor: "lightblue" }}>
          <p>Player 2</p>
          <p>0</p>
        </div>
      </div>

      <div className="ships">{shipsUi}</div>
    </div>
  );
}
