import { Badge } from "@/components/ui/badge";
import { CircleX } from "lucide-react";

interface CodeBadgeProps {
  code: string;
  removeCode: (code: string) => void;
}

export function CodeBadge({ code, removeCode }: CodeBadgeProps) {
  return (
    <Badge className="hover:bg-primary/90 flex items-center justify-between gap-1.5">
      {code}
      <button onClick={() => removeCode(code)}>
        <CircleX />
      </button>
    </Badge>
  );
}
