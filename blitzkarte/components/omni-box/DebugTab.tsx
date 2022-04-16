import React, { FC } from 'react';

interface DebugProps {
  debug: any;
}

export const DebugTab: FC<DebugProps> = ({debug}: DebugProps) => {
   const handleDataInput = (fileString: string) => {

    debug.functions.triggerParse(fileString);

  }

  const handleNodeDisplayChange = () => {
    debug.functions.toggleNodes();
  }

  const handleLandDisplayChange = () => {
    debug.functions.toggleLand();
  }

  const handleSeaDisplayChange = () => {
    debug.functions.toggleSea();
  }

  const handleAirDisplayChange = () => {
    debug.functions.toggleAir();
  }

  const handleEventDisplayChange = () => {
    debug.functions.toggleEvent();
  }

  return (
    <div>
        <div>
          <label>SVG Input</label>
          <textarea placeholder="Paste SVG Formatted File"
            value={debug.display.fileString}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
              handleDataInput(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <input type="checkbox" checked={debug.display.node} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleNodeDisplayChange(); }
          } />
          Show Node Network
        </div>
        <div>
          <input type="checkbox" checked={debug.display.land} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleLandDisplayChange(); }
          } />
          Show Land Network
        </div>
        <div>
          <input type="checkbox" checked={debug.display.sea} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleSeaDisplayChange(); }
          } />
          Show Sea Network
        </div>
        <div>
          <input type="checkbox" checked={debug.display.air} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleAirDisplayChange(); }
          } />
          Show Air Network
        </div>
        <div>
          <input type="checkbox" checked={debug.display.event} onChange={
            (e: React.ChangeEvent<HTMLInputElement>) => { handleEventDisplayChange(); }
          } />
          Show Events
        </div>
        <div>
          {debug.errors.length} Errors:
          <p className="errors">
          {
            debug.errors.map((error: string, key: number) => {
              return <React.Fragment key="key">-{error}<br /></React.Fragment>
            })
          }
          </p>
        </div>
    </div>
  )
}