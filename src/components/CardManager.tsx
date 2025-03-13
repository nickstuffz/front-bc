import * as React from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import { compatComponent } from "../types/types.ts";

interface CardManagerProps {
  selectedCode: string;
}

type GroupedCompatData = Record<string, compatComponent[]>;

export default function CardManager({ selectedCode }: CardManagerProps) {
  const [compatData, setCompatData] = React.useState<compatComponent[]>([]);

  React.useEffect(() => {
    if (selectedCode === "") {
      return;
    }

    async function fetchCompatData() {
      const response = await axios.get(
        `http://localhost:8080/api/compatibility?code=${selectedCode}`,
      );
      setCompatData(response.data);
    }

    fetchCompatData();
  }, [selectedCode]);

  if (selectedCode === "") {
    return <div> please select a component</div>;
  }

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

  console.log("groupedCompatData", groupedCompatData);

  return (
    <div className="card-manager">
      {Object.keys(groupedCompatData).map((category) => (
        <CategoryCard
          key={category}
          category={category}
          compatData={groupedCompatData[category]}
        />
      ))}
    </div>
  );
}
