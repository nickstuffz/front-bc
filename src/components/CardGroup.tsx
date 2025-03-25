import { CategoryCard } from "@/components/CategoryCard.tsx";
import { CompatComponentType, GroupedCompatDataType } from "@/types/types.ts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface CardGroupProps {
  groupData: CompatComponentType[];
}

export function CardGroup({ groupData }: CardGroupProps) {
  // groups the compat data by category
  const catGroupData = groupData.reduce(
    (acc: GroupedCompatDataType, compatComponent) => {
      if (!acc[compatComponent.category]) {
        acc[compatComponent.category] = [];
      }
      acc[compatComponent.category].push(compatComponent);
      return acc;
    },
    {},
  );

  // Determine the group title based on the keys of catGroupData
  let groupTitle = "";
  if (Object.keys(catGroupData).includes("rear derailleur")) {
    groupTitle = "Rear Drivetrain Compatibility Group";
  } else if (Object.keys(catGroupData).includes("crankset")) {
    groupTitle = "Front Drivetrain Compatibility Group";
  } else if (Object.keys(catGroupData).includes("brake")) {
    groupTitle = "Brake System Compatibility Group";
  }

  return (
    <Card className="CardGroup bg-accent m-4 flex-col p-2">
      <CardTitle>
        <h3>{groupTitle}</h3>
      </CardTitle>
      <CardContent className="flex justify-start gap-4">
        {Object.keys(catGroupData).map((category) => (
          <CategoryCard
            key={category}
            category={category}
            catCardData={catGroupData[category]}
          />
        ))}
      </CardContent>
    </Card>
  );
}
