import { Badge } from "@/components/ui/badge";
import { CircleX } from "lucide-react";
import { useSelectedCodesDispatch } from "@/providers/selectedCodesContext";
import { CodeObjType } from "@/types/types";
import { Button } from "@/components/ui/button";

interface CodeBadgeProps {
  codeObj: CodeObjType;
}

export function CodeBadge({ codeObj }: CodeBadgeProps) {
  const dispatch = useSelectedCodesDispatch(); // Consume selectedCodes dispatch function from context

  return (
    <Badge className="hover:bg-primary/90 flex items-center justify-between gap-1 py-1 pr-1 pl-1.5">
      {codeObj.code}
      <Button
        className="size-4.5"
        size="icon"
        variant="ghost"
        onClick={() => dispatch({ type: "deleted", codeObj: codeObj })}
      >
        <CircleX />
      </Button>
    </Badge>
  );
}
