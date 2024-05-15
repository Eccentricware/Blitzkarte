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
  const [selectedEvent, setSelectedEvent] = useState('historic');

  const handleTurnNumberChange = (event: ChangeEvent<HTMLSelectElement>) => {
    historyOps.setTurnNumber(Number(event.target.value));
  }

  const handleEventChange = (eventChange: string) => {
    historyOps.setPhase(eventChange);
  }

  useEffect(() => {
    historyOps.setTurnNumber(selectedTurn);
  },[]);

  return (
    <div>
      <div style={{display: 'flex', textAlign: 'center'}}>
        <select style={{width: '50%'}}
          value={historyOps.turnNumber}
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
        <div
          style={{
            width: '25%',
            backgroundColor: historyOps.phase === 'historic' ? 'red' : 'lightgray',
            cursor: 'pointer'
          }}
          onClick={() => handleEventChange('historic')}
        >
          Orders
        </div>
        <div
          style={{
            width: '25%',
            backgroundColor: historyOps.phase === 'results' ? 'green' : 'lightgray',
            cursor: 'pointer'
          }}
          onClick={() => handleEventChange('results')}
        >
          Results
        </div>
      </div>
      {
        turnHistoryResult?.data &&
        <TurnHistoryResults turnResults={turnHistoryResult.data} />
      }
    </div>
  )
}