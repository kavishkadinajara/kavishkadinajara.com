"use client";

import { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      aria-label="Copy code"
      className="flex items-center gap-1 font-mono text-[10px] text-[#8B9EC0] hover:text-[#F0F4FF] transition-colors"
    >
      {copied ? (
        <>
          <IconCheck size={13} className="text-[#10B981]" />
          <span className="text-[#10B981]">Copied</span>
        </>
      ) : (
        <>
          <IconCopy size={13} />
          Copy
        </>
      )}
    </button>
  );
}
