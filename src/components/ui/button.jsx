import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 border font-mono text-xs font-semibold uppercase tracking-[0.14em] transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50 sm:text-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
        variant: {
          default:
          "border-accent bg-accent text-background hover:border-accent-hover hover:bg-accent-hover",
        outline:
          "border-border bg-secondary text-foreground hover:border-accent hover:text-accent",
        secondary:
          "border-border bg-card text-foreground hover:border-accent hover:text-accent",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:text-accent",
        destructive:
          "border-destructive bg-transparent text-destructive hover:bg-destructive/10",
        link: "border-transparent bg-transparent p-0 text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-3 sm:px-4",
        xs: "h-7 px-2.5 text-[10px] sm:text-xs",
        sm: "h-9 px-3",
        lg: "h-10 px-4 sm:h-11 sm:px-5",
        icon: "size-10",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant = "default", size = "default", ...props }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
