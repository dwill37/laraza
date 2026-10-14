import { isPlaceholder } from "@/content/site";

/** Renders a content string, flagging `[PLACEHOLDER: ...]` values with a dashed chip so they are easy to spot. */
export function Fill({ children, className }: { children: string; className?: string }) {
  if (isPlaceholder(children)) return <span className="ph">{children}</span>;
  return className ? <span className={className}>{children}</span> : <>{children}</>;
}
