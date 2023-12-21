import { CountryStatus } from "../enumeration/CountryEnumns";
import { CityType } from "../enumeration/ProvinceEnums";

export interface City {
    provinceId: number;
    name: string;
    type: CityType;
    status: string;
    controllerId: number;
    capitalOwnerId: number;
    capitalOwnerStatus: CountryStatus;
    loc: number[];
}