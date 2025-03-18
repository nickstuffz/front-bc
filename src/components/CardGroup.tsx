import CategoryCard from "./CategoryCard.tsx";
import { CompatComponentType, GroupedCompatDataType } from "../types/types.ts";

interface CardGroupProps {
  groupData: CompatComponentType[];
}

export default function CardGroup({ groupData }: CardGroupProps) {
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
    <div className="CardGroup m-6 flex-col rounded-2xl border-2 border-gray-200 p-8">
      <h2 className="mb-6">{groupTitle}</h2>
      <div className="flex justify-evenly">
        {Object.keys(catGroupData).map((category) => (
          <CategoryCard
            key={category}
            category={category}
            catCardData={catGroupData[category]}
          />
        ))}
      </div>
    </div>
  );
}
