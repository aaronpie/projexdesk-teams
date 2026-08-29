import Directory from "@/components/Directory";
import { getPackages } from "@/lib/packages";

export default function Home() {
  const packageIds = getPackages().map((entry) => entry.id);
  return <Directory packageIds={packageIds} />;
}
