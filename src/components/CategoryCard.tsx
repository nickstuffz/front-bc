import { Card, CardContent, CardTitle } from "@/components/ui/card";
import CompatComponent from "./CompatComponent.tsx";
import { CompatComponentType } from "../types/types.ts";
import { Separator } from "@/components/ui/separator";

interface CategoryCardProps {
  category: string;
  catCardData: CompatComponentType[];
}

export default function CategoryCard({
  category,
  catCardData,
}: CategoryCardProps) {
  let prevPodId: number | null = null;
  return (
    <Card>
      <CardTitle>
        <h4>{category}</h4>
      </CardTitle>
      <CardContent>
        <ul className="flex list-none flex-col">
          {catCardData.map((compatComponent) => {
            const showSeparator =
              prevPodId !== null && prevPodId !== compatComponent.pod_id;
            prevPodId = compatComponent.pod_id;

            return (
              <li key={compatComponent.id}>
                {showSeparator && <Separator className="border-2" />}
                <CompatComponent compCompData={compatComponent} />
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
