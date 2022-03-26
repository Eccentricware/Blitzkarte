export class Country {
  name: string | undefined;
  rank: string | undefined;
  nuke: number | undefined;
  bankedBuilds: number | undefined;
  color!: string;
  flagKey?: string | undefined;
  region?: string | undefined;
}