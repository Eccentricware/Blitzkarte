import { FC } from "react";
import { FindGameParametersObject } from "../../models/objects/FindGameParametersObject";

interface GameFinderControlsProps {
  parameters: FindGameParametersObject;
}

export const GameFinderControls: FC<GameFinderControlsProps> = ({parameters}: GameFinderControlsProps) => {
  return (
    <div>
      Controls to query for games will go here.
    </div>
  )
}