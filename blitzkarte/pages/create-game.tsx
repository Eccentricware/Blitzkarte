import type { NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react';
import { Parser } from '../utils/parsing/services/parse-orchestrator';
import { RenderData, initialRenderData } from '../models/objects/RenderDataObject';
import { OmniBox } from '../components/omni-box/CreationOmniBox';
import { initialOmniBoxData, OmniBoxData } from '../models/objects/OmniBoxDataObject';
import { NavBarSignedIn } from '../components/nav-bar/NavBarSignedIn';
import Head from 'next/head';
import { Grid } from '@mui/material';
import { MapContainer } from '../components/map-elements/map/MapContainer';
import Blitzkontext from '../utils/Blitzkontext';
import { useRouter } from 'next/router';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavBarSignedOut } from '../components/nav-bar/NavBarSignedOut';
import StallGlobe from '../components/icons/StallGlobe';

const CreateGamePage: NextPage = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const [gameName, setGameName] = useState('');
  const [renderData, setRenderData] = useState<RenderData>(initialRenderData);
  const [omniBoxData, setOmniBoxData] = useState<OmniBoxData>(initialOmniBoxData);
  const [showNodeNetwork, setShowNodeNetwork] = useState(false);
  const [showLandNetwork, setShowLandNetwork] = useState(true);
  const [showSeaNetwork, setShowSeaNetwork] = useState(true);
  const [showAirNetwork, setShowAirNetwork] = useState(true);
  const [showEventNodes, setShowEventNodes] = useState(true);
  const [fileString, setFileString] = useState('');

  const bkCtx = useContext(Blitzkontext);

  const router = useRouter();

  const displayChecks: any = {
    fileString: fileString,
    node: showNodeNetwork,
    land: showLandNetwork,
    sea: showSeaNetwork,
    air: showAirNetwork,
    event: showEventNodes
  }

  const inputData: any = {
    fileString: fileString
  };

  const inputFunctions: any = {
    triggerParse: triggerParse
  }

  const debugFunctions: any = {
    triggerParse: triggerParse,
    toggleNodes: toggleNodes,
    toggleLand: toggleLand,
    toggleSea: toggleSea,
    toggleAir: toggleAir,
    toggleEvent: toggleEvent
  }

  initialOmniBoxData.input.functions = inputFunctions;
  initialOmniBoxData.input.data = inputData;
  initialOmniBoxData.debug.display = displayChecks;
  initialOmniBoxData.debug.functions = debugFunctions;

  let parser: Parser = new Parser();

  function triggerParse(fileString: string) {
    setFileString(fileString);
    parser.parse(fileString);
    setRenderData(parser.renderElements);
    bkCtx.newGame.dbRows = {
      countries: parser.dbRows.countries,
      provinces: parser.dbRows.provinces,
      terrain: parser.dbRows.terrain,
      labels: parser.dbRows.labels,
      labelLines: parser.dbRows.labelLines,
      nodes: parser.dbRows.nodes,
      links: parser.dbRows.links,
      units: parser.dbRows.units
    }
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

  if (loading) {
    return (
      <div>
        <Head>
          <title>Loading...</title>
          <meta name="description" content="Create a new game!"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <NavBarSignedOut title={`Create Game`}/>
        <StallGlobe mode="authenticating" message={"Create Game Page: Loading"}/>
      </div>
    )
  }

  if (user) {
    bkCtx.user.user = user;
    console.log(user);
    return (
      <div>
        <Head>
          <title>Blitzkarte</title>
          <meta name="description" content="Fully automated game of global domination" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBarSignedIn title={`New Game ${gameName}`}/>

        <Grid container columns={2}>
          <Grid item>
            <div className="column"><MapContainer renderData={renderData}/></div>
          </Grid>
          <Grid item>
            <div className="column"><OmniBox omniBoxData={omniBoxData}/></div>
          </Grid>
        </Grid>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <StallGlobe mode="error" message={"Create Game Page: Error"}/>
        <div>
          There was an error loading the page. Please report it to the administrator at zeldark@gmail.com
        </div>
      </div>
    )
  }

  router.push('/');
  return <div>YOU SHOULD NOT BE HERE!!</div>
}

export default CreateGamePage;