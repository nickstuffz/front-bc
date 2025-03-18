import { CompatComponentType } from "../types/types.ts";
import { Toggle } from "@/components/ui/toggle";
import { Card, CardContent } from "@/components/ui/card";

interface CompatComponentProps {
  compCompData: CompatComponentType;
}

export default function CompatComponent({
  compCompData,
}: CompatComponentProps) {
  return (
    <Card className="m-1 rounded-sm p-1">
      <CardContent>
        <Toggle>{compCompData.code}</Toggle>
        <br />
        <small>{compCompData.note}</small>
      </CardContent>
    </Card>
  );
}
