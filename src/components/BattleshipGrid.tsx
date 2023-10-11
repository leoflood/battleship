import React from "react";
import "./BattleshipGrid.css";
import useDeviceType, { DeviceType } from "../hooks/useDeviceType";

export const cellResolutions = {
  [DeviceType.Computer]: 48,
  [DeviceType.Tablet]: 48,
  [DeviceType.Mobile]: 32,
};

interface BattleshipGridProps {
  data: any;
  grid: (string | null)[][];
  hits: any;
  shipStatus: any;
  onClick: (x: number, y: number) => void;
}

const BattleshipGrid: React.FC<BattleshipGridProps> = ({
  data,
  grid,
  hits,
  shipStatus,
  onClick,
}) => {
  const deviceType = useDeviceType()!;

  let cellSize = cellResolutions[deviceType] || 0;

  const getShip = (ship: string) => {
    return data.layout.find((shipData: any) => {
      return shipData.ship === ship;
    });
  };

  const shouldShowShipImg = (x: number, y: number, ship: string) => {
    const shipData = getShip(ship);
    const firstPos = shipData.positions[0];

    return (
      shipStatus[ship as any]?.length === 0 &&
      firstPos[0] === x &&
      firstPos[1] === y
    );
  };

  const isVerticalShip = (shipData: any) => {
    return shipData.positions[0][1] === shipData.positions[1][1];
  };

  return (
    <div
      className="battleship-grid"
      style={{ width: cellSize * 10 + 10, height: cellSize * 10 + 15}}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => {
            const isVertical = cell && isVerticalShip(getShip(cell));

            return (
              <div
                key={colIndex}
                className={`grid-cell ${cell}`}
                style={{ width: cellSize, height: cellSize }}
                onClick={() => onClick(rowIndex, colIndex)}
              >
                {cell && shouldShowShipImg(rowIndex, colIndex, cell) ? (
                  <img
                    src={`${cell}.png`}
                    width={data.shipTypes[cell].size * cellSize}
                    height={cellSize}
                    className={`ship-img ${isVertical ? "vertical" : ""}`}
                    style={{ left: isVertical ? cellSize : 0 }}
                  />
                ) : null}

                {hits[`${rowIndex},${colIndex}`] ? (
                  cell ? (
                    <img src="Hit.png" className="hit-img" />
                  ) : (
                    <img src="Miss.png" className="hit-img" />
                  )
                ) : null}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default BattleshipGrid;
