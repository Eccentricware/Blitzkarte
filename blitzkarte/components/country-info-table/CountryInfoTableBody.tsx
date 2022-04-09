import { FC } from 'react';
import { Country } from '../../utils/parsing/classes/country';

interface CountryInfoTableRow {
  countries: Country[];
}

export const CountryInfoTableBody: FC<CountryInfoTableRow> = ({countries}: CountryInfoTableRow) => {
  return (
    <tbody>
      {
        countries.map(country => {
          return (
            <tr key={country.name}>
              <td>{country.name} ({country.rank.toUpperCase()})</td>
              <td>{country.cities}</td>
              <td>{country.votes}</td>
              <td>{country.bankedBuilds}</td>
              <td>{country.nuke}</td>
              <td>{country.adjustments}</td>
            </tr>
          )
        })
      }
    </tbody>
  )
}