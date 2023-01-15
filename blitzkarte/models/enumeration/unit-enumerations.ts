export enum UnitType {
  ARMY = 'Army',
  BUILD = 'Banked Build',
  FLEET = 'Fleet',
  GARRISON = 'Garrison',
  NUKE = 'Nuke',
  WING = 'Wing'
}

export enum BuildType { // Build Types
  RANGE = 'Nuke Range',           //-4
  NUKE_FINISH = 'Finish Nuke',    //-3
  NUKE_START = 'Start Nuke',      //-2
  DISBAND = 'Disband',            //-1
  BUILD = 'Banked Build',         // 0
  ARMY = 'Army',                  // 1
  FLEET = 'Fleet',                // 2
  WING = 'Wing',                  // 3
  NUKE_RUSH = 'Rush Nuke'         // 4
}