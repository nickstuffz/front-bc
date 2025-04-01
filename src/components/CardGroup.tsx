import { CategoryCard } from "@/components/CategoryCard.tsx";
import { CompatComponentType, GroupedCompatDataType } from "@/types/types.ts";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { Accordion } from "@/components/ui/accordion";

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
    groupTitle = "Rear Drivetrain Group";
  } else if (Object.keys(catGroupData).includes("crankset")) {
    groupTitle = "Front Drivetrain Group";
  } else if (Object.keys(catGroupData).includes("brake")) {
    groupTitle = "Brake System Group";
  }

  return (
    <Card className="card_group bg-card flex flex-col gap-2 px-0 py-2">
      <CardTitle className="border-b pt-2 pr-0 pb-3 pl-4">
        <h3>{groupTitle}</h3>
      </CardTitle>

      <CardContent>
        <Accordion type="multiple" className="flex flex-col gap-2">
          {Object.keys(catGroupData).map((category) => (
            <CategoryCard
              key={category}
              category={category}
              catCardData={catGroupData[category]}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
