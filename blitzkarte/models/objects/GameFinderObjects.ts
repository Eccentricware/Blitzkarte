export interface GameFinderSettings {
  playing: boolean;
  setPlaying: Function;
  creator: boolean;
  setCreator: Function;
  administrator: boolean;
  setAdministrator: Function;
}

export interface GameFinderParameters {
  playing: boolean;
  creator: boolean;
  administrator: boolean;
}