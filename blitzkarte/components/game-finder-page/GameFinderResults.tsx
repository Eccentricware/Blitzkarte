import { FC } from "react";

interface FindGameResultsContainerProps {
  games: any[];
}

export const FindGameResultsContainer: FC<FindGameResultsContainerProps> = ({games}: FindGameResultsContainerProps) => {
  return (
    <div>
      Found Games Will Go here
    </div>
  )
}