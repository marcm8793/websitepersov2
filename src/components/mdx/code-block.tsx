"use client";

import * as React from "react";
import { CopyButton } from "./copy-button";

type CodeBlockProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
> & {
  raw?: string;
  "data-language"?: string;
  "data-theme"?: string;
};

export function CodeBlock({ children, raw, ...props }: CodeBlockProps) {
  const preRef = React.useRef<HTMLPreElement>(null);

  React.useEffect(() => {
    if (preRef.current) {
      const pre = preRef.current;
      const code = pre.querySelector("code");
      if (code && !raw) {
        // Extract raw text content for copy functionality
        const rawText = code.textContent || "";
        pre.setAttribute("data-raw", rawText);
      }
    }
  }, [raw]);

  return (
    <pre
      ref={preRef}
      className="relative mb-4 mt-6 max-h-[640px] overflow-x-auto rounded-lg border p-4 font-mono text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-inherit [&>code]:before:content-none [&>code]:after:content-none"
      {...props}
    >
      <CopyButton
        value={raw || preRef.current?.getAttribute("data-raw") || ""}
        className="absolute right-2 top-2"
      />
      {children}
    </pre>
  );
}
