import { ChangeEvent, FC, useEffect, useState } from "react"
import { UseQueryResult } from "react-query";
import TurnHistoryResults from "../history-tab/TurnHistoryResults";

interface HistoryTabProps {
  turns: any[];
  turnHistoryResult: UseQueryResult<any> | undefined;
  historyOps: any;
}

export const HistoryTab: FC<HistoryTabProps> = ({turns, turnHistoryResult, historyOps}) => {
  console.log('turns', turns);
  const [selectedTurn, setSelectedTurn] = useState(turns.length - 1);
  const [selectedEvent, setSelectedEvent] = useState('orders');

  const handleTurnNumberChange = (event: ChangeEvent<HTMLSelectElement>) => {
    historyOps.set(Number(event.target.value));
  }

  useEffect(() => {
    historyOps.set(selectedTurn);
  },[]);

  return (
    <div>
      <select value={historyOps.get}
        onChange={handleTurnNumberChange}
      >
        {
          turns.map((turn) => {
            return (
              <option key={turn.turnNumber} value={turn.turnNumber}>{turn.turnName} {turn.turnNumber === 0 && '(Starting Map)'}</option>
            )
          })
        }
      </select>
      {
        turnHistoryResult?.data &&
        <TurnHistoryResults turnResults={turnHistoryResult.data} />
      }
    </div>
  )
}