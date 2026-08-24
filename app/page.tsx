import Directory from "@/components/Directory";
import { getPackages, packageStats } from "@/lib/packages";

export default function Home() {
  const packages = getPackages();
  return <Directory packages={packages} stats={packageStats(packages)} />;
}
