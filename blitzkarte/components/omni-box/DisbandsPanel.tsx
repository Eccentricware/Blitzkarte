import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { BuildType } from "../../models/enumeration/unit-enumerations";
import { AtRiskUnit, BuildLoc, DisbandOptions } from "../../models/objects/OptionsObjects";
import { Build, DisbandOrders, NukeBuildInDisband } from "../../models/objects/OrdersObjects";
import { BuildLocRender } from "./BuildsPanel";

interface DisbandProps {
  options: DisbandOptions;
  orders: DisbandOrders;
  setSubmitDisabled: Function;
}

export const DisbandsPanel: FC<DisbandProps> = ({options, orders, setSubmitDisabled}: DisbandProps) => {
  const [existingPresence, setExistingPresence] = useState<string[]>([]);

  const [disbandedIds, setDisbandedIds] = useState(orders.unitsDisbanding);
  const [nukeLocIds, setNukeLocIds] = useState(orders.nukeLocs);
  const [nukeLocs, setNukeLocs] = useState<BuildLoc[][]>([]);

  const [bankedBuildsIncreasingRange, setBankedBuildsIncreasingRange] = useState(orders.increaseRange);
  const [bankedBuildsRemaining, setBankedBuildsRemaining] = useState(orders.bankedBuilds - orders.increaseRange);
  const [nukeRangeEnd, setNukeRangeEnd] = useState(orders.nukeRange + orders.increaseRange);

  const [showNoNukeLocError, setShowNoNukeLocError] = useState<boolean>(false);

  useEffect(() => {
    updateExistingPresence(orders.unitsDisbanding);
    updateNukeLocArrays();
    checkSubmitDisabled();
  }, []);

  const updateExistingPresence = (unitsDisbanding: number[]) => {
    const updatedExistingPresence: string[]
      = options.units
        .filter((unit: AtRiskUnit) => unit.unitId > 0 && !unitsDisbanding.includes(unit.unitId))
        .map((unit: AtRiskUnit) => unit.provinceName);

    if (orders.nukeBuildDetails) {
      const nukePresence = orders.nukeBuildDetails
        .filter((nuke: NukeBuildInDisband) => nuke.nodeId !== 0 && !unitsDisbanding.includes(nuke.unitId));

      updatedExistingPresence.push(
        ...nukePresence.map((nuke: NukeBuildInDisband) => nuke.province)
      );
    }

    setExistingPresence(updatedExistingPresence);
  }

  const updateNukeLocArrays = () => {
    const updatedNukeLocs: BuildLoc[][] = [];
    orders.nukeLocs.forEach((locId: number) => {
      const nukeOptions = options.nukeLocs.filter((option: BuildLoc) =>
        !nukeLocIds.includes(option.nodeId) || option.nodeId === locId || option.nodeId === 0
      );

      updatedNukeLocs.push(nukeOptions);
    });

    setNukeLocs(updatedNukeLocs);
  }

  const handleDisbandCheckboxClick = (unitId: number) => {
    const newDisbandIds = orders.unitsDisbanding;
    const unitIndex = newDisbandIds.indexOf(unitId);
    const unit = options.units.find((unit: AtRiskUnit) => unit.unitId === unitId);

    if (unit === undefined) {
      return;
    }

    if (unitIndex > -1) {
      newDisbandIds.splice(unitIndex, 1);
      orders.unitDisbandingDetailed.splice(unitIndex, 1);
    } else {
      newDisbandIds.push(unitId);
      orders.unitDisbandingDetailed.push(unit);
    }

    setDisbandedIds(newDisbandIds);
    updateExistingPresence(newDisbandIds);
    checkSubmitDisabled();
  }

  const handleBuildIncreasingRangeChange = (amount: string) => {
    let newBbIncreasingRange = Number(amount);

    const max = bankedBuildsIncreasingRange + bankedBuildsRemaining;
    if (newBbIncreasingRange > max) {
      newBbIncreasingRange = max;
    }

    orders.increaseRange = newBbIncreasingRange;
    const newBankedBuildsRemaining = orders.bankedBuilds - newBbIncreasingRange;

    setBankedBuildsIncreasingRange(newBbIncreasingRange);
    setBankedBuildsRemaining(newBankedBuildsRemaining);
    setNukeRangeEnd(orders.nukeRange + newBbIncreasingRange);
  }

  const handleNukeBuildLocationChange = (id: string, index: number, orders: DisbandOrders) => {
    const newLoc: BuildLoc | undefined = nukeLocs[index].find((loc: BuildLoc) => loc.nodeId === Number(id));

    if (newLoc !== undefined && orders.nukeBuildDetails) {
      orders.nukeBuildDetails[index] = {
        unitId: orders.nukeBuildDetails[index].unitId,
        nodeId: newLoc.nodeId,
        province: newLoc.province,
        display: newLoc.display,
        loc: newLoc.nodeLoc
      };

      // eslint-disable-next-line
      // @ts-ignore
      const option = options.units.find((unit: AtRiskUnit) => unit.unitId === orders.nukeBuildDetails[index].unitId);
      if (option) {
        option.provinceName = newLoc.province;
      }

      orders.nukeLocs[index] = newLoc.nodeId;
      checkSubmitDisabled();
    }

    setNukeLocIds(orders.nukeLocs);
    updateNukeLocArrays();
    updateExistingPresence(disbandedIds);
  }

  const checkSubmitDisabled = () => {
    const incorrectDisbandCount = disbandedIds.length !== options.disbandCount;
    let nukesNotAssigned = false;
    if (orders.nukeBuildDetails) {
      nukesNotAssigned
        = orders.nukeBuildDetails
          .filter((nuke: NukeBuildInDisband) => !disbandedIds.includes(nuke.unitId))
          .filter((nuke: NukeBuildInDisband) => nuke.nodeId == 0)
          .length !== 0;

      setShowNoNukeLocError(nukesNotAssigned);
    }
    setSubmitDisabled(incorrectDisbandCount || nukesNotAssigned);
  }

  return (
    <div>
      {
        <p className="omni-paragraph">
          {`With ${options.cityCount} ${ options.cityCount === 1 ? 'city' : 'cities'}
          and ${options.unitCount} ${ options.unitCount === 1 ? 'unit' : 'units' },
          you must disband ${options.disbandCount} ${ options.disbandCount === 1 ? 'unit' : 'units'}.`}
        </p>
      }
      {
        options.nukesInProduction > 0
          &&
        <p className="omni-paragraph">Even though you are disbanding, you can still place your nukes in production if you have empty centers.</p>
      }
      <table>
        <tbody>
          {
            options.units.map((unit: AtRiskUnit, index: number) => (
              <tr key={unit.unitId}>
                <td>{unit.unitType}</td>
                <td>
                  {
                    unit.unitId > 0
                      ?
                    unit.provinceName
                      :
                    <select value={nukeLocIds[index]}
                      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                        handleNukeBuildLocationChange(event.target.value, index, orders);
                      }}
                    >
                      {
                        nukeLocs[index]
                          &&
                        nukeLocs[index].map((loc: BuildLoc) => (
                          <option key={loc.nodeId}
                            value={loc.nodeId}
                            disabled={existingPresence.includes(loc.province)}
                          >{loc.province}</option>
                        ))
                      }
                    </select>
                  }
                </td>
                <td>
                  <input type="checkbox"
                    onChange={() => {
                      handleDisbandCheckboxClick(unit.unitId);
                    }}
                    checked={disbandedIds.includes(unit.unitId)}
                    disabled={
                      (!disbandedIds.includes(unit.unitId) && disbandedIds.length >= options.disbandCount)
                        ||
                      (existingPresence.includes(unit.provinceName) && disbandedIds.includes(unit.unitId))
                    }
                  />
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <br/>

      {
        Number.isInteger(orders.nukeRange)
          &&
        <div>
          <div>
            Banked Builds =&gt; Nuke Range:
            <br/>
            <input type="number" min="0"
              value={bankedBuildsIncreasingRange}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleBuildIncreasingRangeChange(event.target.value);
              }}
            />
          </div>

          <br/>
          <div>Nuclear Range</div>
          <table>
            <tbody>
              <tr><td>Turn Start</td><td className="build-summary-value">{orders.nukeRange === 0 ? 'Unlimited' : orders.nukeRange}</td></tr>
              <tr><td>Banked Builds</td><td className="build-summary-value">+{bankedBuildsIncreasingRange}</td></tr>
              <tr><td>Turn End</td><td className="build-summary-value">{nukeRangeEnd}</td></tr>
            </tbody>
          </table>

          <br/>
          <div>Banked Builds</div>
          <table>
            <tbody>
              <tr><td>Turn Start</td><td className="build-summary-value">{orders.bankedBuilds}</td></tr>
              <tr><td>Increasing Range</td><td className="build-summary-value">-{bankedBuildsIncreasingRange}</td></tr>
              <tr><td>Turn End</td><td className="build-summary-value">{bankedBuildsRemaining}</td></tr>
            </tbody>
          </table>
        </div>
      }

      {
        disbandedIds.length < options.disbandCount
          &&
        <p className="submission-error">
          {
            `You must disband ${options.disbandCount - disbandedIds.length}`
            + ` more ${options.disbandCount - disbandedIds.length === 1 ? 'unit' : 'units'}!`
          }
        </p>
      }
      {
        showNoNukeLocError
          &&
        <p className="submission-error">You have at least one nuke that is not being disbanded yet has no location assigned!</p>
      }
    </div>
  )
}