import * as React from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";
import { CompatComponent, GroupedCompatData } from "../types/types.ts";

interface CardManagerProps {
  selectedCode: string;
}

export default function CardManager({ selectedCode }: CardManagerProps) {
  const [compatData, setCompatData] = React.useState<CompatComponent[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (selectedCode === "") {
      return;
    }

    async function fetchCompatData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/compatibility?code=${selectedCode}`,
        );
        setCompatData(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch compatiblity data.");
      }
    }

    fetchCompatData();
  }, [selectedCode]);

  if (selectedCode === "") {
    return <div>select a component to find compatible components</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupedCompatData = compatData.reduce(
    (acc: GroupedCompatData, compatComponent) => {
      if (!acc[compatComponent.source_pod_id]) {
        acc[compatComponent.source_pod_id] = [];
      }
      acc[compatComponent.source_pod_id].push(compatComponent);
      return acc;
    },
    {},
  );

  return (
    <div className="card-manager">
      {Object.keys(groupedCompatData).map((source_pod_id) => (
        <CategoryCard
          key={source_pod_id}
          source_pod_id={Number(source_pod_id)}
          compatData={groupedCompatData[source_pod_id]}
        />
      ))}
    </div>
  );
}
