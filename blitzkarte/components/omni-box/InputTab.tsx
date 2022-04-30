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
        <p>
          For the map to parse the layer names in Illustrator must follow a certain format.Improper formatting or detected mismatching elements will provide &quot;warning&quot;, &quot;error&quot;, or &quot;criticial&quot; feedback. Many of the properties can be abbreviated as noted. ALL properties should be together without any spaces, separated by commas, with an equal sign to assign the value.<br />
          <br />
          <b>Provinces:</b><br />
          <b>Example Full:</b> name=SYD,fullName=Sydney,type=coast,country=Germany<br />
          <b>Example Abbreviated:</b> n=SYD,f=Sydney,t=c,c=Germany<br />
          <br />
          <b>name (n)</b>: The all-caps abbreviation (SYD) displayed on the map. Required unless decorative province.<br />
          <b>fullName (f)</b>: The real-world name of the location (Sydney). Never required. Use underscores if there are spaces. Ex: New_York_City<br />
          <b>type (t)</b>: Type of province impacts game rules and helps with validation and design.Always required.Options: coast (c), decorative (d), impassible (im), inland (i), island (is), sea (s), land (l), pole (p)<br />
          <b>country (c)</b>: Leave empty if no country owns it. Use underscores instead of spaces. Ex: United_States<br />
        </p>
      </div>
    </div>
  )
}