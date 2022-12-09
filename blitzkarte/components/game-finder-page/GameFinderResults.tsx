import { FC } from "react";
import { GameSummaryObject } from "../../models/objects/GameSummaryDataObject";
import { GameSummaryRow } from "./GameSummaryRow";

interface FindGameResultsContainerProps {
  games: GameSummaryObject[];
}

export const FindGameResultsContainer: FC<FindGameResultsContainerProps> = ({games}: FindGameResultsContainerProps) => {
  return (
    <div className="game-finder-container">
      {
        games.map((game: GameSummaryObject) => <GameSummaryRow key={game.gameId} game={game} />)
      }
    </div>
  )
}