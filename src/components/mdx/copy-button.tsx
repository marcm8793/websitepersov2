"use client";

import * as React from "react";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

import { Button, type ButtonProps } from "@/components/ui/button";

interface CopyButtonProps extends Omit<ButtonProps, "onClick"> {
  value: string;
}

export function CopyButton({ value, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <Button
      variant="outline"
      size="sm"
      className="absolute right-2 top-2 z-30 h-8 w-8 p-0 hover:bg-muted"
      onClick={async () => {
        if (typeof window === "undefined") return;
        if (!navigator.clipboard) {
          console.warn("Clipboard API not available");
          return;
        }

        try {
          await navigator.clipboard.writeText(value || "");
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
          console.error("Failed to copy text: ", err);
        }
      }}
      {...props}
    >
      {isCopied ? (
        <CheckIcon className="size-3" aria-hidden="true" />
      ) : (
        <CopyIcon className="size-3" aria-hidden="true" />
      )}
      <span className="sr-only">
        {isCopied ? "Copied" : "Copy to clipboard"}
      </span>
    </Button>
  );
}
