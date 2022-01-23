import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/Parsing/parser-util';
import { RenderElement } from '../utils/Parsing/renderElement';
import { Unit } from '../utils/Parsing/unit';
import { Pin } from '../utils/Parsing/pin';

import { GameMap } from '../components/map-elements/GameMap';

interface RenderData {
  terrain: {
    sea: RenderElement[],
    land: RenderElement[],
    bridge: RenderElement[],
    canal: RenderElement[]
  },
  labels: Pin[],
  cities: {
    supplyCenters: Pin[],
    votingCenters: Pin[]
  },
  units: Unit[]
}

const GameParserPage: NextPage = () => {
  const [renderData, setRenderData] = useState <RenderData>({
    terrain: {
      sea: [],
      land: [],
      bridge: [],
      canal: []
    },
    labels: [],
    cities: {
      supplyCenters: [],
      votingCenters: []
    },
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