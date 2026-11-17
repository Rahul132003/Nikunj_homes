/** Simple line icons drawn for the four catalogue "Key features". 48×48, stroke only. */
const common = { viewBox: "0 0 48 48", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export function GateIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M6 40V12M42 40V12M6 12h2M40 12h2" />
      <path d="M8 18c4-5 9-6 14-4M40 18c-4-5-9-6-14-4" />
      <path d="M12 40V19M17 40V16M22 40V14.5M26 40V14.5M31 40V16M36 40V19" />
      <path d="M4 40h40" />
    </svg>
  );
}
export function ClubIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <circle cx="14" cy="14" r="8" /><circle cx="34" cy="14" r="8" /><circle cx="14" cy="34" r="8" /><circle cx="34" cy="34" r="8" />
      <path d="M14 10v4.5l3 2" /><path d="M29 15h10M31 12l3 3 3-3" />
      <circle cx="14" cy="34" r="3" /><path d="M28.5 34h11M34 28.5v11M30 30l8 8M38 30l-8 8" />
    </svg>
  );
}
export function SecurityIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <path d="M15 14c0-4 4-7 9-7s9 3 9 7" /><path d="M12 15h24" /><path d="M16 15v5a8 8 0 0 0 16 0v-5" />
      <path d="M8 42c0-7 5-11 12-12l4 5 4-5c7 1 12 5 12 12" /><path d="M22 30l2 6 2-6" />
    </svg>
  );
}
export function MaintenanceIcon({ className }: { className?: string }) {
  return (
    <svg {...common} className={className}>
      <circle cx="16" cy="26" r="5" />
      <path d="M16 14v4M16 34v4M6 26h4M22 26h4M9 19l3 3M23 19l-3 3M9 33l3-3M23 33l-3-3" />
      <path d="M30 40l9-17a6 6 0 1 0-6-6" /><path d="M33 17l5 5" />
    </svg>
  );
}

export const featureIcons = { gate: GateIcon, club: ClubIcon, security: SecurityIcon, maintenance: MaintenanceIcon } as const;
