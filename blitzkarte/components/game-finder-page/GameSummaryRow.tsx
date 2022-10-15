import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import React, { FC, useContext } from "react";
import { GameDataObject } from "../../models/GameDataObject";
import { GameSummaryObject } from "../../models/GameSummaryDataObject";
import Blitzkontext from "../../utils/Blitzkontext";
import { convertSnakeToTitleCase } from "../../utils/general/formatters";

interface GameSummaryRowProps {
  game: GameSummaryObject;
}

export const GameSummaryRow: FC<GameSummaryRowProps> = ({game}: GameSummaryRowProps) => {
  const bkCtx = useContext(Blitzkontext);
  const router = useRouter();
  return (
    <Grid container className="game-summary-row" onClick={() => {
      bkCtx.currentGame.id = game.gameId;
      console.log('Context game ID set:', bkCtx.currentGame.id);
      router.push('/game-details');
    }}>
      <Grid item xs={2}>{game.gameName}</Grid>
      <Grid item xs={2}>
        <div>Status: {game.gameStatus}</div>
        <div>Players: {game.playerCount}/{game.countryCount}</div>
        <div>Scheduling: {game.deadlineType}</div>
      </Grid>
      <Grid item xs={3}>
        <div>Orders: {game.ordersDay} - {game.ordersTime}</div>
        <div>Retreats: {game.retreatsDay} - {game.retreatsTime}</div>
        <div>Builds: {game.adjustmentsDay} - {game.adjustmentsTime}</div>
      </Grid>
      <Grid item xs={2}>
        <div>Nominations:
          {
            game.nominationTiming === 'set'
            ? ` Year ${game.nominationYear}`
            : `${game.nominationTiming}`
          }
        </div>
      </Grid>
      <Grid item xs={2}>
        Creator: {game.creator}</Grid>
    </Grid>
  )
}