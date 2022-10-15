import { FC } from "react";
import { GameSummaryObject } from "../../models/GameSummaryDataObject";
import { convertKeysSnakeToCamel } from "../../utils/general/formatters";
import { GameSummaryRow } from "./GameSummaryRow";

interface FindGameResultsContainerProps {
  games: GameSummaryObject[];
}

export const FindGameResultsContainer: FC<FindGameResultsContainerProps> = ({games}: FindGameResultsContainerProps) => {
  return (
    <div className="game-finder-container">
      {
        games.map((game: GameSummaryObject) => <GameSummaryRow game={game} />)
      }
    </div>
  )
}