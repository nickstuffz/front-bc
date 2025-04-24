import { LoaderCircle } from "lucide-react";

export function Spinner({ isActive }: { isActive: boolean }) {
  return (
    <LoaderCircle
      className={`size-4.5 animate-spin [animation-duration:300ms] ${isActive ? "opacity-100" : "opacity-0"}`}
    />
  );
}
