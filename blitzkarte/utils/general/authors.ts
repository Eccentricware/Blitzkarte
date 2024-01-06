import { GameStatus } from "../../models/enumeration/game-status-enum"

export const getGameStatusDescription = (
  gameStatus: GameStatus): string => {
  switch (gameStatus) {
    case GameStatus.REGISTRATION:
      return `The game is currently open for registration.`
        + ` Assignment Announcements and First Turn deadline are tentative and may be delayed if game is not declared ready.`;
    case GameStatus.CANCELLED:
      return `The game was cancelled.`;
    case GameStatus.ABANDONED:
      return `The game was abandoned.`;
    case GameStatus.ENDED:
      return `The game ended. Congratulations to the winners!`;
    case GameStatus.PAUSED:
      return `The game was paused. Ask the game administrator for more information.`;
    case GameStatus.PLAYING:
      return `The game is currently being played.`;
    case GameStatus.PROCESSING:
      return `The most recent deadline has passed. The results are being processed.`;
    case GameStatus.READY:
      return `The game is ready and will start with country assignments announced at the given time.`;
    default:
      return `The game is in an unknown state. Please contact the game administrator.`;
  }
}