import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/parsing/services/parse-orchestrator';

import { GameMap } from '../components/map-elements/GameMap';
import { RenderData, initialRenderData } from '../models/RenderData';
import { OmniBox } from '../components/omni-box/OmniBox';
import { Country } from '../utils/parsing/classes/country';
import { initialOmniBoxData, OmniBoxData } from '../models/OmniBox';

const GameParserPage: NextPage = () => {
  const [infoTable, setInfoTable] = useState<Country[]>([]);
  const [renderData, setRenderData] = useState<RenderData>(initialRenderData);
  const [omniBoxData, setOmniBoxData] = useState<OmniBoxData>(initialOmniBoxData);
  const [showNodeNetwork, setShowNodeNetwork] = useState(false);
  const [showLandNetwork, setShowLandNetwork] = useState(true);
  const [showSeaNetwork, setShowSeaNetwork] = useState(true);
  const [showAirNetwork, setShowAirNetwork] = useState(true);
  const [showEventNodes, setShowEventNodes] = useState(true);
  const [fileString, setFileString] = useState('Paste File Here');

  let parser: Parser = new Parser();

  function handleFileFieldChange(fileString: string) {
    setFileString(fileString);
    parser.parse(fileString);
    setRenderData(parser.renderElements);
    setInfoTable(parser.countryDisplayArray);
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
    updateRenderData.nodes.links.display.land = !updateRenderData.nodes.links.display.land;
    setRenderData(updateRenderData);
  }

  function handleSeaDisplayChange() {
    setShowSeaNetwork(!showSeaNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.sea = !updateRenderData.nodes.pins.display.sea;
    updateRenderData.nodes.links.display.sea = !updateRenderData.nodes.links.display.sea;
    setRenderData(updateRenderData);
  }

  function handleAirDisplayChange() {
    setShowAirNetwork(!showAirNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.air = !updateRenderData.nodes.pins.display.air;
    updateRenderData.nodes.links.display.air = !updateRenderData.nodes.links.display.air;
    setRenderData(updateRenderData);
  }

  function handleEventDisplayChange() {
    setShowEventNodes(!showEventNodes);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.event = !updateRenderData.nodes.pins.display.event;
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
          Show Land Network ||||

          <input type="checkbox" checked={showSeaNetwork} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleSeaDisplayChange(); }
          }/>
          Show Sea Network ||||

          <input type="checkbox" checked={showAirNetwork} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleAirDisplayChange(); }
          }/>
          Show Air Network  ||||

          <input type="checkbox" checked={showEventNodes} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleEventDisplayChange(); }
          }/>
          Show Events
        </div>
      </form>
      <div className="primary-display-container">
        <GameMap renderData={renderData}/>
        <OmniBox omniBoxData={omniBoxData}/>
      </div>
    </div>
  );
}

export default GameParserPage;