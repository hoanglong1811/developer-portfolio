import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva("tech-badge", {
  variants: {
    variant: {
      default: "",
      success: "border-success-border bg-success-bg text-success-text",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function Badge({ className, variant = "default", ...props }) {
  return <span className={cn(badgeVariants({ variant, className }))} {...props} />;
}
