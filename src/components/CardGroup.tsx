import {
  Card,
  CardContent,
  // CardDescription,
  // CardFooter,
  // CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompatComponent, GroupedCompatData } from "../types/types.ts";

interface CardGroupProps {
  source_pod_id: number;
  groupData: CompatComponent[];
}

export default function CardGroup({
  source_pod_id,
  groupData,
}: CardGroupProps) {
  const catGroupData = groupData.reduce(
    (acc: GroupedCompatData, compatComponent) => {
      if (!acc[compatComponent.category]) {
        acc[compatComponent.category] = [];
      }
      acc[compatComponent.category].push(compatComponent);
      return acc;
    },
    {},
  );

  console.log(source_pod_id);

  return (
    <div className="CardGroup flex justify-evenly">
      {Object.keys(catGroupData).map((category) => (
        <Card key={category}>
          <CardTitle>
            <h4>{category}</h4>
          </CardTitle>
          <CardContent>
            <ul className="list-none">
              {catGroupData[category].map((compatComponent) => (
                <li key={compatComponent.id}>{compatComponent.code}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
