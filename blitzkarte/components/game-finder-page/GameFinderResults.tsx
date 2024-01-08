import { FC } from "react";
import { GameSummaryObject } from "../../models/objects/GameSummaryDataObject";
import { GameSummaryRow } from "./GameSummaryRow";

interface FindGameResultsContainerProps {
  games: GameSummaryObject[];
}

export const FindGameResultsContainer: FC<FindGameResultsContainerProps> = ({games}: FindGameResultsContainerProps) => {
  console.log('FindGameResultsContainer', games.length);
  return (
    <div className="game-finder-container">
      {
        games.length === 0
          ? <h3>No games found with the selected criteria!</h3>
          :
        games.map((game: GameSummaryObject) => <GameSummaryRow key={game.gameId} game={game} />)
      }
    </div>
  )
}