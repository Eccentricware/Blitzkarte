import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/Parsing/svgParser';
import { RenderElement } from '../utils/Parsing/renderElement';
import { Unit } from '../utils/Parsing/unit';

import { GameMap } from '../components/map-elements/GameMap';

interface RenderData {
  terrain: {
    sea: RenderElement[],
    land: RenderElement[],
    bridge: RenderElement[],
    canal: RenderElement[]
  },
  labels: RenderElement[],
  units: Unit[]
}

const GameParserPage: NextPage = () => {
  // const [fileString, setFileString] = useState('Test');
  // const [fileStringified, setFileStringified] = useState('');
  // const [fileJSON, setFileJSON] = useState({});
  const [renderData, setRenderData] = useState <RenderData>({
    terrain: {
      sea: [],
      land: [],
      bridge: [],
      canal: []
    },
    labels: [],
    units: []
  });

  let parser: Parser = new Parser();

  function handleChange(fileString: string) {
    parser.parse(fileString);
    setRenderData(parser.renderElements);
  }

  return (
    <div>
      <h1>Super Visual Glorious Serializer</h1>
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
      <div><b>Map</b></div>
      <GameMap renderData={renderData}/>
      <div><b>Tables</b></div>
      <div>Coming soon!</div>
    </div>
  );
}

export default GameParserPage;