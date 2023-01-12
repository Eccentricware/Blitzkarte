import { FC, useEffect, useState } from "react";
import { BuildLoc } from "../../models/objects/OptionsObjects";

interface Props {
  options: {
    turnStatus: string;
    builds: number;
    locations: {
      land: BuildLoc[],
      sea: BuildLoc[],
      air: BuildLoc[]
    }
  };
  orders: any[];
}

export const BuildsPanel: FC<Props> = ({options, orders}: Props) => {
  const [buildArray, setBuildArray] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <div>
      <div>Builds</div>
      {

      }
    </div>
  )
}