import React, { FC } from "react";
import { Country } from "../../utils/parsing/classes/country";
import { CountryInfoTableBody } from '../country-info-table/CountryInfoTableBody'

interface CountryList {
  countries: Country[];
}

export const CountryInfoTable: FC<CountryList> = ({countries}: CountryList) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Cities</th>
          <th>Votes</th>
          <th>BBs</th>
          <th>Range</th>
          <th>Ajd</th>
        </tr>
      </thead>
      <CountryInfoTableBody countries={countries}/>
    </table>
  )
}