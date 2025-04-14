import { Badge } from "@/components/ui/badge";
import { CircleX } from "lucide-react";
import { useSelectedCodesDispatch } from "@/lib/selectedCodeUtils";
import { CodeObjType } from "@/types/types";

interface CodeBadgeProps {
  codeObj: CodeObjType;
}

export function CodeBadge({ codeObj }: CodeBadgeProps) {
  const dispatch = useSelectedCodesDispatch();

  return (
    <Badge className="hover:bg-primary/90 flex items-center justify-between gap-1 py-0.5 pr-1 pl-1.5">
      {codeObj.code}
      <button onClick={() => dispatch({ type: "deleted", codeObj: codeObj })}>
        <CircleX className="w-4.5" />
      </button>
    </Badge>
  );
}
