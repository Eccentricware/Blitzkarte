import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/svgParser';
import { RenderElement } from '../utils/renderElement';

import { GameMap } from '../components/map-elements/GameMap';

interface TerrainRenderData {
  sea: RenderElement[],
  land: RenderElement[],
  bridge: RenderElement[],
  canal: RenderElement[]
}

const GameParserPage: NextPage = () => {
  // const [fileString, setFileString] = useState('Test');
  // const [fileStringified, setFileStringified] = useState('');
  // const [fileJSON, setFileJSON] = useState({});
  const [terrainRenderData, setTerrainRenderData] = useState <TerrainRenderData>({
    sea: [],
    land: [],
    bridge: [],
    canal: []
  });

  let parser: Parser = new Parser();

  function handleChange(fileString: string) {
    parser.parse(fileString);
    setTerrainRenderData(parser.renderElements);
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
      <GameMap terrainRenderData={terrainRenderData}/>
      <div><b>Tables</b></div>
      <div>Coming soon!</div>
    </div>
  );
}

export default GameParserPage;