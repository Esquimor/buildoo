import { Site, SiteProps } from "../site/site";

interface SitesProps {
  sites: SiteProps[]
}

export function Sites({
  sites
}: SitesProps) {

  return sites.map(site => (
    <Site
      key={site.id}
      id={site.id}
      name={site.name}
    />
  ))
}