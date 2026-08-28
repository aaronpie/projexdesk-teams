import Directory from "@/components/Directory";
import { getPackages } from "@/lib/packages";

export default function Home() {
  const packages = getPackages();
  return <Directory packages={packages} />;
}
