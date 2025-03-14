import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompatComponent, GroupedCompatData } from "../types/types.ts";

interface CategoryCardProps {
  source_pod_id: number;
  compatData: CompatComponent[];
}

export default function CategoryCard({
  source_pod_id,
  compatData,
}: CategoryCardProps) {
  console.log("compatData", compatData);

  const groupedCompatData = compatData.reduce(
    (acc: GroupedCompatData, compatComponent) => {
      if (!acc[compatComponent.category]) {
        acc[compatComponent.category] = [];
      }
      acc[compatComponent.category].push(compatComponent);
      return acc;
    },
    {},
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>source pod: {source_pod_id}</CardTitle>
        {/* <CardDescription> Description </CardDescription> */}
      </CardHeader>
      <CardContent className="text-sm">
        {Object.keys(groupedCompatData).map((category) => (
          <div key={category}>
            <h3>{category}</h3>
            <ul>
              {groupedCompatData[category].map((compatComponent) => (
                <li key={compatComponent.id}>{compatComponent.code}</li>
              ))}
            </ul>
          </div>
        ))}
      </CardContent>
      {/* <CardFooter className="text-sm">Footer</CardFooter> */}
    </Card>
  );
}
