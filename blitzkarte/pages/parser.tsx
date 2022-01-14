import type { NextPage } from 'next';
import React, { useState } from 'react';
import { Parser } from '../utils/svgParser';

const GameParserPage: NextPage = () => {
  const [fileString, setFileString] = useState('');
  const [fileStringified, setFileStringified] = useState('');
  const [fileJSON, setFileJSON] = useState({});

  let parser: Parser = new Parser();

  function handleChange(fileString: string) {
    parser.parse(fileString);
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
      <div>{fileString}</div>
    </div>
  );
}

export default GameParserPage;