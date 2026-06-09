import { useEffect, useRef } from "react";

interface EventTimelineProps {
  events: string[];
}

export function EventTimeline({ events }: EventTimelineProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events.length]);

  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground py-4 text-center">No events yet</p>;
  }

  return (
    <div className="space-y-1 max-h-60 overflow-y-auto">
      {[...events].reverse().map((entry, i) => {
        const ts = entry.startsWith("[") ? entry.slice(0, entry.indexOf("]") + 1) : "";
        const msg = ts ? entry.slice(entry.indexOf("]") + 2).trim() : entry;
        return (
          <div key={i} className="flex items-start gap-2 text-sm py-1.5 border-b border-border last:border-0">
            {ts && (
              <span className="text-xs text-muted-foreground font-mono shrink-0 w-16">{ts}</span>
            )}
            <span className="text-foreground">{msg}</span>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
