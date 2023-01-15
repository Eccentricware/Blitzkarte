import { ChangeEvent, FC, Fragment, useEffect, useState } from "react";
import { BuildType, UnitType } from "../../models/enumeration/unit-enumerations";
import { BuildLoc } from "../../models/objects/OptionsObjects";
import { Build, BuildOrder } from "../../models/objects/OrdersObjects";

interface Props {
  options: {
    turnStatus: string;
    builds: number;
    locations: {
      land: BuildLoc[],
      sea: BuildLoc[],
      air: BuildLoc[]
    }
  };
  orders: BuildOrder;
}

interface UnitBuildOption {
  id: number;
  type: BuildType;
}

export interface BuildLocRender {
  province: string;
  display: string;
  nodeId: number;
  nodeLoc: number[];
  disabled: boolean;
}

export interface UnitPresence {
  army: string[];
  fleet: string[];
  wing: string[];
  nuke: string[];
}

export const BuildsPanel: FC<Props> = ({options, orders}: Props) => {
  const [nukeLocIds, setNukeLocIds] = useState<number[]>(orders.nukesReady.map((nuke: Build) => nuke.nodeId));
  const [nukeLocs, setNukeLocs] = useState<BuildLoc[][]>([]);
  const [nukeRangeEnd, setNukeRangeEnd] = useState(orders.nukeRange);

  const [buildTypeIds, setBuildTypeIds] = useState<number[]>(orders.builds.map((build: Build) => build.typeId));
  const [buildTypes, setBuildTypes] = useState<UnitBuildOption[][]>([]);
  const [buildLocIds, setBuildLocIds] = useState<number[]>(orders.builds.map((build: Build) => build.nodeId));
  const [buildLocs, setBuildsLocs] = useState<BuildLoc[][]>([]);

  const [adjustmentsBeingBanked, setAdjustmentsBeingBanked] = useState(0);
  const [adjustmentsIncreasingRange, setAdjustmentsIncreasingRange] = useState(0);

  const [bankedBuildsRemaining, setBankedBuildsRemaining] = useState(orders.bankedBuilds);
  const [bankedBuildsIncreasingRange, setBankedBuildsIncreasingRange] = useState(0);
  const [buildsRushingNukes, setBuildsRushingNukes] = useState(0);
  const [bankedBuildsEnd, setBankedBuildsEnd] = useState(orders.bankedBuilds);

  const [unitPresence, setUnitPresence] = useState<UnitPresence>();
  const [buildOrders, setBuildOrders] = useState(orders.builds);
  const [bankedBuildsStored, setBankedBuildsStored] = useState(0);



  useEffect(() => {
    updateBuildTypeArrays(orders.bankedBuilds);
    updateLocationArrays();
    updateBankedBuilds();
  }, []);

  const getPresence = (): UnitPresence => {
    const armyPresence: string[]
      = orders.builds
        .filter((build: Build) => build.buildType === BuildType.ARMY)
        .map((build: Build) => build.provinceName);

    const fleetPresence: string[]
      = orders.builds
        .filter((build: Build) => build.buildType === BuildType.FLEET)
        .map((build: Build) => build.provinceName);

    const wingPresence: string[]
      = orders.builds
        .filter((build: Build) => build.buildType === BuildType.WING)
        .map((build: Build) => build.provinceName);

    const nukePresence: string[]
      = orders.builds
        .filter((build: Build) => build.buildType === BuildType.NUKE_RUSH)
        .map((build: Build) => build.provinceName);

    nukePresence.push(...orders.nukesReady.map((build: Build) => build.provinceName));

    return {
      army: armyPresence,
      fleet: fleetPresence,
      wing: wingPresence,
      nuke: nukePresence
    }
  }

  const updateBuildTypeArrays = (bankedBuilds: number) => {
    const updatedBuildTypeArray: UnitBuildOption[][] = [];

    orders.builds.forEach((order: Build) => {
      const buildTypeArray: UnitBuildOption[] = [
        {
          id: 0,
          type: BuildType.BUILD
        },
        {
          id: 1,
          type: BuildType.ARMY
        },
      ];

      if (order.buildType === BuildType.FLEET || options.locations.sea.filter((loc: BuildLoc) => loc.province === order.provinceName).length > 0) {
        buildTypeArray.push({
          id: 2,
          type: BuildType.FLEET
        });
      }

      buildTypeArray.push({
        id: 3,
        type: BuildType.WING
      });

      if (Number.isInteger(orders.nukeRange)) {
        buildTypeArray.push({
          id: -3,
          type: BuildType.NUKE_START
        });
      }

      if (
        Number.isInteger(orders.nukeRange)
        && (order.buildType === BuildType.NUKE_RUSH || bankedBuilds > 0 )) {
        buildTypeArray.unshift({
          id: -2,
          type: BuildType.RANGE
        });

        buildTypeArray.push({
          id: 4,
          type: BuildType.NUKE_RUSH
        });
      }

      updatedBuildTypeArray.push(buildTypeArray);
    });

    setBuildTypes(updatedBuildTypeArray);
  }

  const updateLocationArrays = () => {
    const presences = getPresence();

    const updatedBuildLocs: BuildLoc[][] = [];

    orders.builds.forEach((order: Build, index: number) => {
      let unitNodeType: string = '';
      let buildType = order.buildType.toLowerCase();
      if (order.buildType === BuildType.ARMY) {
        unitNodeType = 'land';
      } else if (order.buildType === BuildType.NUKE_RUSH || order.buildType === BuildType.NUKE_FINISH) {
        unitNodeType = 'land';
        buildType = 'nuke';
      } else if (order.buildType === BuildType.FLEET) {
        unitNodeType = 'sea';
      } else if (order.buildType === BuildType.WING) {
        unitNodeType = 'air';
      } else {
        updatedBuildLocs.push([]);
        return;
      }

      const unitTypePresence: string[] = presences[buildType];

      const unitTypeLocs: BuildLoc[] = options.locations[unitNodeType].filter((loc: BuildLoc) =>
        !presences[buildType].includes(loc.province) || loc.province === order.provinceName
      );

      const unitTypeLocRender: BuildLoc[] = unitTypeLocs.map((loc: BuildLoc) => {
        return {
          province: loc.province,
          display: loc.display,
          nodeId: loc.nodeId,
          nodeLoc: loc.nodeLoc
        }
      });

      updatedBuildLocs.push(unitTypeLocRender);
    });

    const updatedNukeLocs: BuildLoc[][] = [];

    orders.nukesReady.forEach((order: Build, index: number) => {
      const unitTypeLocs: BuildLoc[] = options.locations.land.filter((loc: BuildLoc) =>
        !presences.nuke.includes(loc.province) || loc.province === order.provinceName
      );

      const unitTypeLocRender: BuildLoc[] = unitTypeLocs.map((loc: BuildLoc) => {
        return {
          province: loc.province,
          display: loc.display,
          nodeId: loc.nodeId,
          nodeLoc: loc.nodeLoc
        }
      });

      updatedNukeLocs.push(unitTypeLocRender);
    });

    setBuildsLocs(updatedBuildLocs);
    setNukeLocs(updatedNukeLocs);
  }

  const updateBankedBuilds = () => {
    const bankedBuilds = orders.builds.filter((build: Build) => build.buildType === BuildType.BUILD).length;
    setBankedBuildsStored(bankedBuilds);
  }

  const handleBuildTypeChange = (type: string, index: number) => {
    console.log('type:', type);
    console.log('build', orders.builds[index]);
    const buildType: UnitBuildOption = typeOptionsArray[type];

    const updatedBuiltTypeIds = buildTypeIds.slice();
    updatedBuiltTypeIds[index] = buildType.id;

    orders.builds[index].typeId = buildType.id;
    orders.builds[index].buildType = buildType.type;
    setBuildTypeIds(updatedBuiltTypeIds);
    updateLocationArrays();
  }

  const handleBuildIncreasingRangeChange = (amount: string) => {
    let rangeAdded = Number(amount);
    const bankedBuildsStart = orders.bankedBuilds - getNukesRushedCount() - bankedBuildsIncreasingRange;
    const startAbove0 = bankedBuildsStart > 0;

    if (rangeAdded > bankedBuildsStart) {
      rangeAdded = bankedBuildsStart;
    }

    const newBankedBuildsRemaining = bankedBuildsStart - rangeAdded;
    const endAbove0 = newBankedBuildsRemaining > 0;
    setBankedBuildsIncreasingRange(rangeAdded);
    setBankedBuildsRemaining(newBankedBuildsRemaining);
    setBankedBuildsEnd(newBankedBuildsRemaining + bankedBuildsStored);
    setNukeRangeEnd(orders.nukeRange + adjustmentsIncreasingRange + rangeAdded);
    if (startAbove0 !== endAbove0) {
      updateBuildTypeArrays(newBankedBuildsRemaining);
    }
  }

  const getNukesRushedCount = (): number => {
    let totalRushing = 0;

    orders.builds.forEach((build: Build) => {
      if (build.buildType === BuildType.NUKE_RUSH) {
        totalRushing++;
      }
    });

    return totalRushing;
  }

  return (
    <div>
      <div>Total Builds: {orders.buildCount}</div>
      {
        orders.nukesReady.length > 0
          &&
        <div>
          <div>Nukes are ready for placement:</div>
          {
            orders.nukesReady.map((order: Build, index: number) => (
              <div className="build-order-row" key={index}>
                <select disabled={true}>
                  <option>{BuildType.NUKE_FINISH}</option>
                </select>
                {
                  nukeLocs[index]
                    &&
                  <select value={nukeLocIds[index]}>
                    {
                      nukeLocs[index].map((loc: BuildLoc) => (
                        <option key={loc.nodeId} value={loc.nodeId}>{loc.display}</option>
                      ))
                    }
                  </select>
                }
              </div>
            ))
          }
        </div>
      }

      <div>{options.builds > 0 ? 'Builds:' : 'You have no adjustments this turn'}</div>
      {
        orders.builds.map((order: Build, index: number) => (
          <div key={index} className="build-order-row">
            <select value={buildTypeIds[index]}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                handleBuildTypeChange(event.target.value, index);
              }}
            >
              {
                buildTypes[index]
                  &&
                buildTypes[index].map((type: UnitBuildOption) => (
                  <option key={type.id} value={type.id}>{type.type}</option>
                ))
              }
            </select>
            {
              ((order.buildType === BuildType.ARMY
              || order.buildType === BuildType.FLEET
              || order.buildType === BuildType.WING
              || order.buildType === BuildType.NUKE_FINISH)
              && buildLocs[index])
                &&
              <select value={buildLocIds[index]}>
                {
                  buildLocs[index].map((loc: BuildLoc) => (
                    <option key={loc.nodeId} value={loc.nodeId}>{loc.display}</option>
                  ))
                }
              </select>
            }
          </div>
        ))
      }

      <div>Banked Builds</div>
      <table>
        <tr><td>Turn Start</td><td className="build-summary-value">{orders.bankedBuilds}</td></tr>
        {Number.isInteger(orders.nukeRange) && <tr><td>Rushing Nukes</td><td className="build-summary-value">-{buildsRushingNukes}</td></tr>}
        {Number.isInteger(orders.nukeRange) && <tr><td>Increasing Range</td><td className="build-summary-value">-{bankedBuildsIncreasingRange}</td></tr>}
        <tr><td>Remaining:</td><td className="build-summary-value">{bankedBuildsRemaining}</td></tr>
        <tr><td>Adjustments</td><td className="build-summary-value">+{adjustmentsBeingBanked}</td></tr>
        <tr><td>Turn End</td><td className="build-summary-value">{bankedBuildsEnd}</td></tr>
      </table>
      <br/>

      {
        Number.isInteger(orders.nukeRange)
          &&
        <div>
          <div>Nuclear Range</div>
          <table>
            <tr><td>Turn Start</td><td className="build-summary-value">{orders.nukeRange === 0 ? 'Unlimited' : orders.nukeRange}</td></tr>
            <tr><td>Adjustments</td><td className="build-summary-value">+{adjustmentsIncreasingRange}</td></tr>
            <tr>
              <td>Banked Builds</td>
              <td className="build-summary-value">
                + <input className="summary-number-input" dir="rtl" type="number" min="0"
                    value={bankedBuildsIncreasingRange}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      handleBuildIncreasingRangeChange(event.target.value);
                    }}
                  />
              </td>
            </tr>
            <tr><td>Turn End</td><td className="build-summary-value">{nukeRangeEnd}</td></tr>
          </table>
        </div>
      }
    </div>
  )
}