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
  all: string[];
  army: string[];
  fleet: string[];
  wing: string[];
  nuke: string[];
  slowNuke: string[];
}

interface Counts {
  adjustmentsBeingBanked: number;
  adjustmentsIncreasingRange: number;
  nukeRangeEnd: number;
  bankedBuildsRemaining: number;
  bankedBuildsIncreasingRange?: number;
  bankedBuildsRushingNukes: number;
  bankedBuildsEnd: number;
}

export const BuildsPanel: FC<Props> = ({options, orders}: Props) => {
  const getNukesRushedCount = (): number => {
    let totalRushing = 0;

    orders.builds.forEach((build: Build) => {
      if (build.buildType === BuildType.NUKE_RUSH) {
        totalRushing++;
      }
    });

    return totalRushing;
  }
  const [nukeLocIds, setNukeLocIds] = useState<number[]>(orders.nukesReady.map((nuke: Build) => nuke.nodeId));
  const [nukeLocs, setNukeLocs] = useState<BuildLocRender[][]>([]);
  const [nukeRangeEnd, setNukeRangeEnd] = useState(orders.nukeRange);

  const [buildTypeIds, setBuildTypeIds] = useState<number[]>(orders.builds.map((build: Build) => build.typeId));
  const [buildTypes, setBuildTypes] = useState<UnitBuildOption[][]>([]);
  const [buildLocIds, setBuildLocIds] = useState<number[]>(orders.builds.map((build: Build) => build.nodeId));
  const [buildLocs, setBuildsLocs] = useState<BuildLocRender[][]>([]);

  const [adjustmentsBeingBanked, setAdjustmentsBeingBanked] = useState(0);
  const [adjustmentsIncreasingRange, setAdjustmentsIncreasingRange] = useState(0);

  const [bankedBuildsRemaining, setBankedBuildsRemaining] = useState(orders.bankedBuilds);
  const [bankedBuildsIncreasingRange, setBankedBuildsIncreasingRange] = useState(orders.increaseRange);
  const [bankedBuildsRushingNukes, setBankedBuildsRushingNukes] = useState(getNukesRushedCount());
  const [bankedBuildsEnd, setBankedBuildsEnd] = useState(orders.bankedBuilds);

  const [unitPresence, setUnitPresence] = useState<UnitPresence>();
  const [buildOrders, setBuildOrders] = useState(orders.builds);

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
      all: [...armyPresence, ...fleetPresence, ...wingPresence, ...nukePresence],
      army: armyPresence,
      fleet: fleetPresence,
      wing: wingPresence,
      nuke: nukePresence,
      slowNuke: orders.nukesReady.map((build: Build) => build.provinceName)
    }
  }

  const updateBuildTypeArrays = (bankedBuilds: number) => {
    const updatedBuildTypeArray: UnitBuildOption[][] = [];
    const presence = getPresence();
    const fullPresence = [...presence.army, ...presence.fleet, ...presence.wing, ...presence.nuke];

    orders.builds.forEach((order: Build) => {
      const coastAvailable = options.locations.sea.filter(
        (loc: BuildLoc) => !fullPresence.includes(loc.province) || order.provinceName === loc.province
      ).length > 0;

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

      if (order.buildType === BuildType.FLEET || coastAvailable) {
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

  const getNodeTypeFromBuildType = (buildType: BuildType | string): string => {
    switch(buildType) {
      case BuildType.ARMY:
        case BuildType.NUKE_RUSH:
          case BuildType.NUKE_FINISH:
        return 'land';
      case BuildType.FLEET:
        return 'sea';
      case BuildType.WING:
        return 'air';
      default:
        return 'skip';
    }
  }

  const getUnitTypeFromBuildType = (buildType: BuildType | string): string => {
    switch(buildType) {
      case BuildType.ARMY:
        return 'army';
      case BuildType.FLEET:
        return 'fleet';
      case BuildType.WING:
        return 'wing';
      case BuildType.NUKE_RUSH:
      case BuildType.NUKE_FINISH:
        return 'nuke';
      default:
        return 'skip';
    }
  }

  const getBuildTypeDefaultLoc = (buildType: BuildType): BuildLoc => {
    const nodeType = getNodeTypeFromBuildType(buildType);
    const unitType = getUnitTypeFromBuildType(buildType);
    const presences: UnitPresence = getPresence();

    return options.locations[nodeType].find((loc: BuildLoc) => !presences.all.includes(loc.province));
  }

  const updateLocationArrays = () => {
    const presences = getPresence();

    const updatedBuildLocs: BuildLocRender[][] = [];

    orders.builds.forEach((order: Build) => {
      const nodeType: string = getNodeTypeFromBuildType(order.buildType);
      const buildType = order.buildType.toLowerCase();

      if (nodeType === 'skip') {
        updatedBuildLocs.push([]);
        return;
      }

      const unitType = getUnitTypeFromBuildType(order.buildType);

      if (unitType === 'skip') {
        updatedBuildLocs.push([]);
        return;
      }

      const unitTypeLocs: BuildLoc[] = options.locations[nodeType].filter((loc: BuildLoc) =>
        !presences[unitType].includes(loc.province) || loc.province === order.provinceName
      );

      const unitTypeLocRender: BuildLocRender[] = unitTypeLocs.map((loc: BuildLoc) => {
        return {
          province: loc.province,
          display: loc.display,
          nodeId: loc.nodeId,
          nodeLoc: loc.nodeLoc,
          disabled: presences.all.includes(loc.province) && order.provinceName !== loc.province
        }
      });

      updatedBuildLocs.push(unitTypeLocRender);
    });

    const updatedNukeLocs: BuildLocRender[][] = [];

    orders.nukesReady.forEach((order: Build) => {
      const unitTypeLocs: BuildLoc[] = options.locations.land.filter((loc: BuildLoc) =>
        !presences.nuke.includes(loc.province) || loc.province === order.provinceName
      );

      const unitTypeLocRender: BuildLocRender[] = unitTypeLocs.map((loc: BuildLoc) => {
        return {
          province: loc.province,
          display: loc.display,
          nodeId: loc.nodeId,
          nodeLoc: loc.nodeLoc,
          disabled: presences.all.includes(loc.province) && order.provinceName !== loc.province
        }
      });

      updatedNukeLocs.push(unitTypeLocRender);
    });

    setBuildsLocs(updatedBuildLocs);
    setNukeLocs(updatedNukeLocs);
  }

  const updateBankedBuilds = () => {
    const bankedBuilds = orders.builds.filter((build: Build) => build.buildType === BuildType.BUILD).length;
    setAdjustmentsIncreasingRange(bankedBuilds);
  }

  const handleBuildTypeChange = (type: string, index: number) => {
    const buildType: UnitBuildOption | undefined = buildTypes[index].find((buildType: UnitBuildOption) => buildType.id === Number(type));
    if (buildType === undefined) {
      return;
    }

    const updatedBuiltTypeIds = buildTypeIds.slice();
    updatedBuiltTypeIds[index] = buildType.id;

    const nodeType = getNodeTypeFromBuildType(buildType.type);
    let newLoc: BuildLoc = {
      nodeId: 0,
      province: buildType.type,
      display: buildType.type,
      nodeLoc: []
    };

    if (orders.builds[index].nodeId === 0 && nodeType !== 'skip') {
      newLoc = getBuildTypeDefaultLoc(buildType.type);
    } else if (nodeType !== 'skip') {
      newLoc = options.locations[nodeType].find((loc: BuildLoc) => loc.province === orders.builds[index].provinceName);
      if (newLoc === undefined) {
        newLoc = getBuildTypeDefaultLoc(buildType.type);
      }
    }

    let countChanges: Counts = getCountChanges(buildType.type, index);


    orders.builds[index].typeId = buildType.id;
    orders.builds[index].buildType = buildType.type;

    orders.builds[index] = {
      typeId: buildType.id,
      buildType: buildType.type,
      nodeId: newLoc.nodeId,
      provinceName: newLoc.province,
      loc: newLoc.nodeLoc
    }

    setAdjustmentsIncreasingRange(adjustmentsIncreasingRange + countChanges.adjustmentsIncreasingRange);
    setNukeRangeEnd(nukeRangeEnd + countChanges.nukeRangeEnd);
    setAdjustmentsBeingBanked(adjustmentsBeingBanked + countChanges.adjustmentsBeingBanked);
    setBankedBuildsRushingNukes(bankedBuildsRushingNukes + countChanges.bankedBuildsRushingNukes);
    setBankedBuildsRemaining(bankedBuildsRemaining + countChanges.bankedBuildsRemaining);
    setBankedBuildsEnd(bankedBuildsEnd + countChanges.bankedBuildsEnd);

    setBuildTypeIds(updatedBuiltTypeIds);
    updateLocationArrays();
  }

  const getCountChanges = (buildType: BuildType, index: number): Counts => {
    let adjustmentsBeingBanked = 0;
    let adjustmentsIncreasingRange = 0;
    let nukeRangeEnd = 0;

    let bankedBuildsRemaining = 0;
    let bankedBuildsEnd = 0;
    let bankedBuildsRushingNukes = 0;

    const wasIncreasingNukeRange = orders.builds[index].buildType === BuildType.RANGE;
    const changeIncreasingNukeRange = buildType === BuildType.RANGE;

    if (wasIncreasingNukeRange !== changeIncreasingNukeRange) {
      adjustmentsIncreasingRange += changeIncreasingNukeRange ? 1 : -1;
      nukeRangeEnd += changeIncreasingNukeRange ? 1 : -1;
    }

    const wasBankingBuild = orders.builds[index].buildType === BuildType.BUILD;
    const changeBankingBuild = buildType === BuildType.BUILD;

    if (wasBankingBuild !== changeBankingBuild) {
      adjustmentsBeingBanked += changeBankingBuild ? 1 : -1;
      bankedBuildsEnd += changeBankingBuild ? 1 : -1;
    }

    const wasRushingNuke = orders.builds[index].buildType === BuildType.NUKE_RUSH;
    const changeRushingNuke = buildType === BuildType.NUKE_RUSH;

    if (wasRushingNuke !== changeRushingNuke) {
      bankedBuildsRushingNukes += changeRushingNuke ? 1 : -1;
      bankedBuildsRemaining += changeRushingNuke ? -1 : 1;
      bankedBuildsEnd += changeRushingNuke ? -1 : 1;
    }

    const countChanges: Counts = {
      adjustmentsIncreasingRange: adjustmentsIncreasingRange,
      nukeRangeEnd: nukeRangeEnd,
      bankedBuildsRushingNukes: bankedBuildsRushingNukes,
      bankedBuildsRemaining: bankedBuildsRemaining,
      adjustmentsBeingBanked: adjustmentsBeingBanked,
      bankedBuildsEnd: bankedBuildsEnd
    }

    return countChanges
  }

  const handleBuildIncreasingRangeChange = (amount: string) => {
    let newBbIncreasingRange = Number(amount);
    const startAbove0 = bankedBuildsRemaining > 0;

    const max = bankedBuildsIncreasingRange + bankedBuildsRemaining;
    if (newBbIncreasingRange > max) {
      newBbIncreasingRange = max;
    }

    orders.increaseRange = newBbIncreasingRange;
    const newBankedBuildsRemaining = bankedBuildsRemaining - (newBbIncreasingRange - bankedBuildsIncreasingRange);
    const endAbove0 = newBankedBuildsRemaining > 0;

    setBankedBuildsIncreasingRange(newBbIncreasingRange);
    setBankedBuildsRemaining(newBankedBuildsRemaining);
    setBankedBuildsEnd(newBankedBuildsRemaining + adjustmentsBeingBanked);
    setNukeRangeEnd(orders.nukeRange + adjustmentsIncreasingRange + newBbIncreasingRange);
    if (startAbove0 !== endAbove0) {
      updateBuildTypeArrays(newBankedBuildsRemaining);
    }
  }

  const handleBuildLocChange = (id: string, index: number, orders: BuildOrder) => {
    const newLoc: BuildLocRender | undefined = buildLocs[index].find((loc: BuildLocRender) => loc.nodeId === Number(id));

    if (newLoc !== undefined) {
      orders.builds[index] = {
        typeId: orders.builds[index].typeId,
        buildType: orders.builds[index].buildType,
        nodeId: newLoc.nodeId,
        provinceName: newLoc.province,
        loc: newLoc.nodeLoc
      }

      const newBuildLocIds: number[] = buildLocIds.slice();
      newBuildLocIds[index] = newLoc.nodeId;
      setBuildLocIds(newBuildLocIds);
      updateBuildTypeArrays(bankedBuildsRemaining);
      updateLocationArrays();
    }
  }
  const handleNukeLocChange = (id: string, index: number, orders: BuildOrder) => {
    const newLoc: BuildLocRender | undefined = nukeLocs[index].find((loc: BuildLocRender) => loc.nodeId === Number(id));

    if (newLoc !== undefined) {
      orders.nukesReady[index] = {
        typeId: orders.nukesReady[index].typeId,
        buildType: orders.nukesReady[index].buildType,
        nodeId: newLoc.nodeId,
        provinceName: newLoc.province,
        loc: newLoc.nodeLoc
      }

      const newNukeLocIds: number[] = nukeLocIds.slice();
      newNukeLocIds[index] = newLoc.nodeId;
      setNukeLocIds(newNukeLocIds);
      updateBuildTypeArrays(bankedBuildsRemaining);
      updateLocationArrays();
    }
  }

  return (
    <div>
      {
        orders.nukesReady.length > 0
          &&
        <div>
          <div>{orders.nukesReady.length} {orders.nukesReady.length === 1 ? 'Nuke Has Finished Production:' : 'Nukes Have Finished Production:' }</div>
          {
            orders.nukesReady.map((order: Build, index: number) => (
              <div className="build-order-row" key={index}>
                <select disabled={true}>
                  <option>{BuildType.NUKE_FINISH}</option>
                </select>
                {
                  nukeLocs[index]
                    &&
                  <select value={nukeLocIds[index]}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                      handleNukeLocChange(event.target.value, index, orders);
                    }}
                  >
                    {
                      nukeLocs[index].map((loc: BuildLocRender) => (
                        <option key={loc.nodeId} value={loc.nodeId} disabled={loc.disabled}>{loc.display}</option>
                      ))
                    }
                  </select>
                }
              </div>
            ))
          }
        </div>
      }
      <br/>

      <div>{options.builds} {options.builds === 1 ? 'Build:' : 'Builds'}</div>
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
              || order.buildType === BuildType.NUKE_RUSH)
              && buildLocs[index])
                &&
              <select value={buildLocIds[index]}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                  handleBuildLocChange(event.target.value, index, orders);
                }}
              >
                {
                  buildLocs[index].map((loc: BuildLocRender) => (
                    <option key={loc.nodeId} value={loc.nodeId} disabled={loc.disabled}>{loc.display}</option>
                  ))
                }
              </select>
            }
          </div>
        ))
      }
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
            <tr><td>Turn Start</td><td className="build-summary-value">{orders.nukeRange === 0 ? 'Unlimited' : orders.nukeRange}</td></tr>
            <tr><td>Adjustments</td><td className="build-summary-value">+{adjustmentsIncreasingRange}</td></tr>
            <tr>
              <td>Banked Builds</td>
              <td className="build-summary-value">
                +{bankedBuildsIncreasingRange}
              </td>
            </tr>
            <tr><td>Turn End</td><td className="build-summary-value">{nukeRangeEnd}</td></tr>
          </table>
        </div>
      }
      <br/>

      <div>Banked Builds</div>
      <table>
        <tr><td>Turn Start</td><td className="build-summary-value">{orders.bankedBuilds}</td></tr>
        {Number.isInteger(orders.nukeRange) && <tr><td>Rushing Nukes</td><td className="build-summary-value">-{bankedBuildsRushingNukes}</td></tr>}
        {Number.isInteger(orders.nukeRange) && <tr><td>Increasing Range</td><td className="build-summary-value">-{bankedBuildsIncreasingRange}</td></tr>}
        {Number.isInteger(orders.nukeRange) && <tr><td>Remaining:</td><td className="build-summary-value">{bankedBuildsRemaining}</td></tr>}
        <tr><td>Adjustments</td><td className="build-summary-value">+{adjustmentsBeingBanked}</td></tr>
        <tr><td>Turn End</td><td className="build-summary-value">{bankedBuildsEnd}</td></tr>
      </table>



    </div>
  )
}