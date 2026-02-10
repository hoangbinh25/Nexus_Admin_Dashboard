import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name: string;
  email?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
};

export function UserAvatar({ name, email, size = "md", className }: UserAvatarProps) {
  const initials = name
    ? name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
    : "U";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "rounded-full bg-primary/10 text-primary font-semibold flex items-center justify-center",
          sizeClasses[size]
        )}
      >
        {initials}
      </div>
      {email && (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-sm text-muted-foreground">{email}</span>
        </div>
      )}
    </div>
  );
}
