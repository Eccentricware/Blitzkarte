import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/parsing/services/parse-orchestrator';
import { Terrain } from '../utils/parsing/classes/terrain';
import { Unit } from '../utils/parsing/classes/unit';
import { LabelPin } from '../utils/parsing/classes/label';
import { City } from '../utils/parsing/classes/city';

import { GameMap } from '../components/map-elements/GameMap';
import { RenderData, initialRenderData } from '../models/RenderData';

const GameParserPage: NextPage = () => {
  const [renderData, setRenderData] = useState<RenderData>(initialRenderData);
  const [fileString, setFileString] = useState('Paste File Here');

  let parser: Parser = new Parser();

  function handleChange(fileString: string) {
    setFileString(fileString);
    parser.parse(fileString);
    setRenderData(parser.renderElements);
    setFileString('Paste File Here Again');
  }

  return (
    <div>
      <form className="map-parser">
        <div>
          <label>SVG Input</label>
          <input type="text"
            value={fileString}
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