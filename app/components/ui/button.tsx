import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center py-4 rounded-lg border border-transparent bg-clip-padding whitespace-nowrap transition-all outline-none select-none disabled:opacity-50[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-widget-fill-primary typo-widget-text-caption text-widget-fill-white [a]:hover:bg-widget-fill-primary/80",
        secondary:
          "bg-widget-fill-light-gray typo-widget-text-caption text-widget-text-secondary [a]:hover:bg-widget-fill-light-gray/80",
        outline:
          "bg-white border-widget-text-subtitle typo-widget-text-body2 text-widget-text-subtitle",
        ghost: "",
      },
      size: {
        default:
          "w-[115px] h-12 gap-[5px] px-7 has-data-[icon=inline-end]:pr-[17px] has-data-[icon=inline-end]:pl-5 has-data-[icon=inline-start]:pl-[17px] has-data-[icon=inline-start]:pr-5",
        sm: "w-18 h-[35px] px-[10px] py-[5px]",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
