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
  const [showNodeNetwork, setShowNodeNetwork] = useState(false);
  const [showLandNetwork, setShowLandNetwork] = useState(true);
  const [showSeaNetwork, setShowSeaNetwork] = useState(true);
  const [showAirNetwork, setShowAirNetwork] = useState(true);
  const [fileString, setFileString] = useState('Paste File Here');

  let parser: Parser = new Parser();

  function handleFileFieldChange(fileString: string) {
    setFileString(fileString);
    parser.parse(fileString);
    setRenderData(parser.renderElements);
    setFileString('Paste File Here Again');
  }

  function handleNodeDisplayChange() {
    setShowNodeNetwork(!showNodeNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.display = !updateRenderData.nodes.display;
    setRenderData(updateRenderData);
  }

  function handleLandDisplayChange() {
    setShowLandNetwork(!showLandNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.land = !updateRenderData.nodes.pins.display.land;
    setRenderData(updateRenderData);
  }

  function handleSeaDisplayChange() {
    setShowSeaNetwork(!showSeaNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.sea = !updateRenderData.nodes.pins.display.sea;
    setRenderData(updateRenderData);
  }

  function handleAirDisplayChange() {
    setShowAirNetwork(!showAirNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.air = !updateRenderData.nodes.pins.display.air;
    setRenderData(updateRenderData);
  }

  return (
    <div>
      <form className="map-parser">
        <div>
          <label>SVG Input</label>
          <input type="text"
            value={fileString}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              handleFileFieldChange(e.target.value);
            }}>
          </input>
        </div>
        <div className="view-checkbox">
          <input type="checkbox" checked={showNodeNetwork} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleNodeDisplayChange(); }
          }/>
          Show Node Network ||||

          <input type="checkbox" checked={showLandNetwork} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleLandDisplayChange(); }
          }/>
          Show Land Nodes ||||

          <input type="checkbox" checked={showSeaNetwork} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleSeaDisplayChange(); }
          }/>
          Show Sea Nodes ||||

          <input type="checkbox" checked={showAirNetwork} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleAirDisplayChange(); }
          }/>
          Show Air Nodes
        </div>
      </form>
      <GameMap renderData={renderData}/>
      <div><b>Tables</b></div>
      <div>Coming soon!</div>
    </div>
  );
}

export default GameParserPage;