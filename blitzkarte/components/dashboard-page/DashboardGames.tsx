import { User } from "firebase/auth";
import { FC } from "react";

interface DashboardGamesProps {
  user: User | null
}

const DashboardGames: FC<DashboardGamesProps> = ({user}: DashboardGamesProps) => {
  return (
    <div>
      <h3>Games</h3>
    </div>
  )
}

export default DashboardGames;