import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/parsing/services/parse-orchestrator';

import { GameMap } from '../components/map-elements/GameMap';
import { RenderData, initialRenderData } from '../models/RenderData';
import { OmniBox } from '../components/omni-box/OmniBox';
import { Country } from '../utils/parsing/classes/country';
import { initialOmniBoxData, OmniBoxData } from '../models/OmniBoxData';
import { NavBar } from '../components/nav-bar/Navbar';
import Head from 'next/head';
import { Grid } from '@mui/material';

const GameParserPage: NextPage = () => {
  const [renderData, setRenderData] = useState<RenderData>(initialRenderData);
  const [omniBoxData, setOmniBoxData] = useState<OmniBoxData>(initialOmniBoxData);
  const [showNodeNetwork, setShowNodeNetwork] = useState(false);
  const [showLandNetwork, setShowLandNetwork] = useState(true);
  const [showSeaNetwork, setShowSeaNetwork] = useState(true);
  const [showAirNetwork, setShowAirNetwork] = useState(true);
  const [showEventNodes, setShowEventNodes] = useState(true);
  const [fileString, setFileString] = useState('');

  const displayChecks: any = {
    fileString: fileString,
    node: showNodeNetwork,
    land: showLandNetwork,
    sea: showSeaNetwork,
    air: showAirNetwork,
    event: showEventNodes
  }

  const functions: any = {
    triggerParse: triggerParse,
    toggleNodes: toggleNodes,
    toggleLand: toggleLand,
    toggleSea: toggleSea,
    toggleAir: toggleAir,
    toggleEvent: toggleEvent
  }

  initialOmniBoxData.debug.display = displayChecks;
  initialOmniBoxData.debug.functions = functions;

  let parser: Parser = new Parser();

  function triggerParse(fileString: string) {
    setFileString(fileString);
    parser.parse(fileString);
    setRenderData(parser.renderElements);
    setFileString('Thank you. For now, you must reload the page to update the map');
  }

  function toggleNodes() {
    setShowNodeNetwork(!showNodeNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.display = !updateRenderData.nodes.display;
    setRenderData(updateRenderData);
  }

  function toggleLand() {
    setShowLandNetwork(!showLandNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.land = !updateRenderData.nodes.pins.display.land;
    updateRenderData.nodes.links.display.land = !updateRenderData.nodes.links.display.land;
    setRenderData(updateRenderData);
  }

  function toggleSea() {
    setShowSeaNetwork(!showSeaNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.sea = !updateRenderData.nodes.pins.display.sea;
    updateRenderData.nodes.links.display.sea = !updateRenderData.nodes.links.display.sea;
    setRenderData(updateRenderData);
  }

  function toggleAir() {
    setShowAirNetwork(!showAirNetwork);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.air = !updateRenderData.nodes.pins.display.air;
    updateRenderData.nodes.links.display.air = !updateRenderData.nodes.links.display.air;
    setRenderData(updateRenderData);
  }

  function toggleEvent() {
    setShowEventNodes(!showEventNodes);
    let updateRenderData = renderData;
    updateRenderData.nodes.pins.display.event = !updateRenderData.nodes.pins.display.event;
    setRenderData(updateRenderData);
  }

  return (
    <div>
      <Head>
        <title>Blitzkarte</title>
        <meta name="description" content="Fully automated game of global domination" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar/>

      <Grid container columns={2}>
        <Grid item>
          <div className="column"><GameMap renderData={renderData}/></div>
        </Grid>
        <Grid item>
          <div className="column"><OmniBox omniBoxData={omniBoxData}/></div>
        </Grid>
      </Grid>
    </div>
  );
}

export default GameParserPage;