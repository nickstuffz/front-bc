import * as React from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

interface CategoryManagerProps {
  selectedCode: string;
}

export default function CardManager({ selectedCode }: CategoryManagerProps) {
  const [compatData, setCompatData] = React.useState(null);

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

  console.log("compatData", compatData);

  return (
    <div>
      <CategoryCard />
    </div>
  );
}
