/**
 * Soft page-to-page transition: each navigation fades the new page in (opacity only, 350ms).
 * Pure CSS, so server-rendered content never waits on JavaScript; reduced motion removes it (globals.css).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
