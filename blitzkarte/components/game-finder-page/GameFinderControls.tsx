import { FC } from "react";
import { GameFinderParameters, GameFinderSettings } from "../../models/objects/GameFinderObjects";
import { User } from "firebase/auth";

interface GameFinderControlsProps {
  settings: GameFinderSettings;
  user: User | null;
}

export const GameFinderControls: FC<GameFinderControlsProps> = ({settings, user}: GameFinderControlsProps) => {
  return (
    <div>
      <h3>Game Finder</h3>
      <div>
        <input type="checkbox"
          checked={settings.playing}
          onChange={() => settings.setPlaying(!settings.playing)}
          disabled={!user}
        />
        <label>Playing</label>
      </div>
      <div>
        <input type="checkbox"
          checked={settings.creator}
          onChange={() => settings.setCreator(!settings.creator)}
          disabled={!user}
        />
        <label>Creator</label>
      </div>
      {/* <div>
        <input type="checkbox" checked={settings.administrator} onChange={() => settings.setAdministrator(!settings.administrator)}/>
        <label>Administrator</label>
      </div> */}
    </div>
  )
}