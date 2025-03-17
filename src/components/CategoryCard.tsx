import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CompatComponent from "./CompatComponent.tsx";
import { CompatComponentType } from "../types/types.ts";

interface CategoryCardProps {
  category: string;
  catCardData: CompatComponentType[];
}

export default function CategoryCard({
  category,
  catCardData,
}: CategoryCardProps) {
  return (
    <Card>
      <CardTitle>
        <h4>{category}</h4>
      </CardTitle>
      <CardContent>
        <ul className="list-none">
          {catCardData.map((compatComponent) => (
            <CompatComponent
              key={compatComponent.id}
              compCompData={compatComponent}
            />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
