import site from "@/data/site.json";

export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  stats: { label: string; value: string }[];
}

export function getSiteInfo(): SiteInfo {
  return site as SiteInfo;
}
