import React, { FC } from 'react';

interface InputProps {
  input: any;
}

export const InputTab: FC<InputProps> = ({input}: InputProps) => {
  const handleDataInput = (fileString: string) => {

    input.functions.triggerParse(fileString);

  }
  return (
    <div>
      <div>
        <label>SVG Input</label>
        <textarea placeholder="Paste SVG Formatted File"
          value={input.data.fileString}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void => {
            handleDataInput(e.target.value);
          }}
        ></textarea>
        <p className="guidelines">
          For the map to parse the layer names in Illustrator must follow a certain format.Improper formatting or detected mismatching elements will provide &quot;warning&quot;, &quot;error&quot;, or &quot;criticial&quot; feedback. Many of the properties can be abbreviated as noted. ALL properties should be together without any spaces, separated by commas, with an equal sign to assign the value.<br />
          <br />

          <b>SVG Element: g | Provinces</b><br />
          <b>Example Full:</b> name=SYD,fullName=Sydney,type=coast,country=Germany<br />
          <b>Example Abbreviated:</b> n=SYD,f=Sydney,t=c,c=Germany<br />
          <br />
          <b>name (n):</b> The all-caps abbreviation (SYD) displayed on the map. Required unless decorative province.
          <br />
          <b>fullName (f):</b> The real-world name of the location (Sydney). Never required. Use underscores if there are spaces. Ex: New_York_City
          <br />
          <b>type (t):</b> Type of province impacts game rules and helps with validation and design.Always required.Options: coast (c), decorative (d), impassible (im), inland (i), island (is), sea (s), land (l), pole (p)
          <br />
          <b>country (c):</b> Leave empty if no country owns it. Use underscores instead of spaces. Ex: United_States
          <br />
          <br/>

          <b>SVG Element: circle | Nodes, Cities, Labels</b>
          <br/>
          <b>PinType (p):</b> Notes what logic is applied to the circle. Alway required. node (n) for nodes (where units can go, and if there is a unit there), city (c) to establish the presence and status of a supply center/vote, and label (l) for the location of all labels. Provinces can have more than 1 label on account of provinces that wrap around the map and multi-coast provinces.
          <br/>
          <br/>
          <b>Nodes (Where units can go, location of invasion arrow, retreating unit, nuclear detonations)</b><br/>
          <b>pinType (p):</b> node (n)<br/>
          <b>Example Full:</b> pinType=node,type=sea,name=syd_s,adj=bri_s/tas_s/mel_s
          <br/>
          <b>Example Abbreviated:</b> p=n,t=s,n=syd_s,a=bri_s/tas_s/mel_s
          <br/>
          <b>type (t):</b> land (l), sea (s), air (a), event (e). Always required.<br/>
          <b>name:</b> Prefix should match province. Suffix should match first letter of node type. All lower case. Always required. Example: n=syd_s for SYD sea node.<br/>
          <b>adj (a)</b>: Adjacent nodes. List of the names of nodes the unit type can travel to. Split with &quot; /&quot;. Required if not an event node. Example: a=bri_s/tas_s/mel_s<br/>
          <b>unit (u):</b> army (a), fleet (f), wing (w), nuke (n), garrison (g). Not required<br/>
          <br/>
          <b>Cities (Designates capitals, supply and voting centers)</b><br/>
          <b>pinType (p):</b> city (c)<br/>
          <b>Example Full:</b> pinType=city,type=capital,country=Australia,rank=d,color=#6da6db<br/>
          <b>Example Abbreviated:</b> p=c,t=c,country=Australia,rank=d,color=#6da6db<br/>
          <b>city (c):</b> capital (c), vote (v), supplyCenter (s) is used for controlled cities, dormant (d) used for uncontrolled cities. Do not add if province does not have a city. If it is a capital, furhter information is required. <b>Country:</b> Name of the country. Use _ instead of spaces. <b>rank:</b> a, b, c, d, e for players, n for non-player countries (where the garrisons are assigned). <b>color:</b> in valid CSS format. It should be easy to get the hex version (#ffffff) from Illustrator.<br/>
          <br/>
          <b>Labels (Displays province name or specific coasts)</b><br/>
          <b>pinType (p):</b> label (l). Always required.<br/>
          <b>number (n):</b> Set to any number to distinguish labels apart. Useful for provinces that wrap around the map and multi-coast provinces. Only required when multiple lables are used in the same province.<br/>
          <b>text:</b> Leave blank if the province label. It will auto-populate. Use this to name coasts (nc, wc, ec, sc, etc). Not required<br/>
        </p>
      </div>
    </div>
  )
}