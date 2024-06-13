import { FC } from 'react';
import { Country } from '../../utils/parsing/classes/country';

interface StatsTableRow {
  countries: Country[];
}

export const StatsTableBody: FC<StatsTableRow> = ({countries}: StatsTableRow) => {
  return (
    <tbody>
      {
        countries.map(country =>
          country.status !== 'Eliminated'
            ?
          <tr key={country.name}>
            <td>{country.name} ({country.rank.toUpperCase()})</td>
            <td>{country.cityCount}</td>
            <td>{country.votes}</td>
            <td>{country.bankedBuilds}</td>
            <td>{country.nuke === 0 ? 'U' : country.nuke}</td>
            <td>{country.adjustments}</td>
          </tr>
            :
          <tr key={country.name}>
            <td><s>{country.name} ({country.rank.toUpperCase()})</s></td>
          </tr>
        )
      }
    </tbody>
  )
}