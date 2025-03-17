import CategoryCard from "./CategoryCard.tsx";
import { CompatComponentType, GroupedCompatDataType } from "../types/types.ts";

interface CardGroupProps {
  source_pod_id: number;
  groupData: CompatComponentType[];
}

export default function CardGroup({
  source_pod_id,
  groupData,
}: CardGroupProps) {
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

  // Correlate to category Phrase?
  console.log(source_pod_id);

  return (
    <div className="CardGroup m-6 flex justify-evenly rounded-2xl border-2 border-gray-200 p-6">
      {Object.keys(catGroupData).map((category) => (
        <CategoryCard
          key={category}
          category={category}
          catCardData={catGroupData[category]}
        />
      ))}
    </div>
  );
}
