import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  variant?: "default" | "destructive" | "ghost";
  tooltip?: string;
  className?: string;
}

export function ActionButton({
  icon: Icon,
  onClick,
  variant = "ghost",
  tooltip,
  className,
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      size="icon"
      onClick={onClick}
      className={cn("h-8 w-8", className)}
      title={tooltip}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
