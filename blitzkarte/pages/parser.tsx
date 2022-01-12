import type { NextPage } from 'next';
import React, { useState } from 'react';

const GameParserPage: NextPage = () => {
  const [mapString, setMapString] = useState('');
  const [mapStringified, setMapStringified] = useState('');
  const [mapJSON, setMapJSON] = useState({});

  function handleChange(mapString: string) {
    console.log(mapString.split('><'));
    // console.log(JSON.stringify(mapStringified));
    setMapString(mapString);
    // setMapStringified(mapStringified);
  }

  return (
    <div>
      <h1>SVG Stringifier</h1>
      <form className="map-parser">
        <div>
          <label>SVG Input:</label>
          <input type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              handleChange(e.target.value);
            }}>
          </input>
        </div>
      </form>
      <div>JSON Output:</div>
      <div>{mapString}</div>
    </div>
  );
}

export default GameParserPage;