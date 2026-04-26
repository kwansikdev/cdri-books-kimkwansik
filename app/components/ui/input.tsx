import * as React from "react";

import { cn } from "~/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-7.5 w-full min-w-0 rounded-lg border border-widget-fill-secondary-light2 bg-transparent px-2.5 py-1 text-base transition-colors outline-none focus-visible:border-widget-fill-gray file:inline-flex file:h-6 file:border-0 file:bg-transparent placeholder:text-widget-text-subtitle disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
