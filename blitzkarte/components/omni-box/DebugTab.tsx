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
          <p>
            For the map to parse the layer names in Illustrator must follow a certain format.Improper formatting or detected mismatching elements will provide &quot;warning&quot;, &quot;error&quot;, or &quot;criticial&quot; feedback. Many of the properties can be abbreviated as noted. ALL properties should be together without any spaces, separated by commas, with an equal sign to assign the value.<br/>
            <br/>
            <b>Provinces:</b><br/>
            <b>Example Full:</b> name=SYD,fullName=Sydney,type=coast,country=Germany<br/>
            <b>Example Abbreviated:</b> n=SYD,f=Sydney,t=c,c=Germany<br/>
            <br/>
            <b>name (n)</b>: The all-caps abbreviation (SYD) displayed on the map. Required unless decorative province.<br/>
            <b>fullName (f)</b>: The real-world name of the location (Sydney). Never required. Use underscores if there are spaces. Ex: New_York_City<br/>
            <b>type (t)</b>: Type of province impacts game rules and helps with validation and design.Always required.Options: coast (c), decorative (d), impassible (im), inland (i), island (is), sea (s), land (l), pole (p)<br/>
            <b>country (c)</b>: Leave empty if no country owns it. Use underscores instead of spaces. Ex: United_States<br/>
          </p>
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
          {
            debug.critical.length > 0 &&
            <p className="errors">
              <b>{debug.critical.length} Critical:</b><br/>
              {
                debug.critical.map((critical: string, key: number) => {
                  return <React.Fragment key={key}>-{critical}<br /></React.Fragment>
                })
              }
            </p>
          }
          {
            debug.errors.length > 0 &&
            <p className="errors">
              <b>{debug.errors.length} Errors:</b><br/>
              {
                debug.errors.map((error: string, key: number) => {
                  return <React.Fragment key={key}>-{error}<br /></React.Fragment>
                })
              }
            </p>
          }
          {
            debug.warnings.length > 0 &&
            <p className="errors">
              <b>{debug.warnings.length} Warnings:</b><br/>
              {
                debug.warnings.map((warning: string, key: number) => {
                  return <React.Fragment key={key}>-{warning}<br /></React.Fragment>
                })
              }
            </p>
          }
        </div>
    </div>
  )
}