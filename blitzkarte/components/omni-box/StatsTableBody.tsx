import { FC } from 'react';
import { Country } from '../../utils/parsing/classes/country';

interface StatsTableRow {
  countries: Country[];
}

export const StatsTableBody: FC<StatsTableRow> = ({countries}: StatsTableRow) => {
  return (
    <tbody>
      {
        countries.map(country => {
          return (
            <tr key={country.name}>
              <td>{country.name} ({country.rank.toUpperCase()})</td>
              <td>{country.cities.length}</td>
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