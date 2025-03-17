import * as React from "react";
import axios from "axios";
import CardGroup from "./CardGroup.tsx";
import { CompatComponentType, GroupedCompatDataType } from "../types/types.ts";

interface GroupManagerProps {
  selectedCode: string;
}

export default function GroupManager({ selectedCode }: GroupManagerProps) {
  const [compatData, setCompatData] = React.useState<CompatComponentType[]>([]);
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
    (acc: GroupedCompatDataType, compatComponent) => {
      if (!acc[compatComponent.source_pod_id]) {
        acc[compatComponent.source_pod_id] = [];
      }
      acc[compatComponent.source_pod_id].push(compatComponent);
      return acc;
    },
    {},
  );
  return (
    <>
      {Object.keys(groupedCompatData).map((source_pod_id) => (
        <CardGroup
          key={source_pod_id}
          source_pod_id={Number(source_pod_id)}
          groupData={groupedCompatData[source_pod_id]}
        />
      ))}
    </>
  );
}
