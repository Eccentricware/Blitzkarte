import { FC } from "react";
import { GameFinderParameters, GameFinderSettings } from "../../models/objects/GameFinderObjects";

interface GameFinderControlsProps {
  settings: GameFinderSettings;
}

export const GameFinderControls: FC<GameFinderControlsProps> = ({settings}: GameFinderControlsProps) => {
  return (
    <div>
      <h3>Game Finder</h3>
      <div>
        <input type="checkbox" checked={settings.playing} onChange={() => settings.setPlaying(!settings.playing)}/>
        <label>Playing</label>
      </div>
      <div>
        <input type="checkbox" checked={settings.creator} onChange={() => settings.setCreator(!settings.creator)}/>
        <label>Creator</label>
      </div>
      <div>
        <input type="checkbox" checked={settings.administrator} onChange={() => settings.setAdministrator(!settings.administrator)}/>
        <label>Administrator</label>
      </div>
    </div>
  )
}