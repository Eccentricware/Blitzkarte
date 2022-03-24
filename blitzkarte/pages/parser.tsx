import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/parsing/services/parse-orchestrator';
import { Terrain } from '../utils/parsing/classes/terrain';
import { Unit } from '../utils/parsing/classes/unit';
import { LabelPin } from '../utils/parsing/classes/label';
import { City } from '../utils/parsing/classes/city';

import { GameMap } from '../components/map-elements/GameMap';

interface RenderData {
  terrain: {
    sea: Terrain[],
    land: Terrain[],
    bridge: Terrain[],
    canal: Terrain[]
  },
  cities: {
    supplyCenters: City[],
    votingCenters: City[]
  },
  units: Unit[]
  labels: LabelPin[],
}

const GameParserPage: NextPage = () => {
  const [renderData, setRenderData] = useState<RenderData>({
    terrain: {
      sea: [],
      land: [],
      bridge: [],
      canal: []
    },
    cities: {
      supplyCenters: [],
      votingCenters: []
    },
    units: [],
    labels: []
  });

  let parser: Parser = new Parser();

  function handleChange(fileString: string) {
    parser.parse(fileString);
    setRenderData(parser.renderElements);
  }

  return (
    <div>
      <form className="map-parser">
        <div>
          <label>SVG Input</label>
          <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              handleChange(e.target.value);
            }}>
          </input>
        </div>
      </form>
      <GameMap renderData={renderData}/>
      <div><b>Tables</b></div>
      <div>Coming soon!</div>
    </div>
  );
}

export default GameParserPage;