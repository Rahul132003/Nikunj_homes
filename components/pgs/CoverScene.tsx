import Image from "next/image";
import { pgsGreens } from "@/data/projects";
import { Parallax } from "@/components/motion/Parallax";

/**
 * The catalogue cover is two layers: a farmland photograph and a separate tree
 * cut-out composited over it (the photo itself carries a faint ghost of the tree
 * in that spot). Rebuilding both layers lets the tree sit exactly where the
 * ghost is while drifting slightly faster than the field — real depth, from the
 * catalogue's own assets.
 *
 * The scene keeps the cover's aspect ratio (1190:839) and scales to *cover* its
 * parent using container-query units, so the tree never slips off its mark.
 */
const RATIO = 1190 / 839;

// Tree cut-out position within the cover, from the catalogue page (pt → %)
const TREE = { left: (356 / 1190) * 100, top: (269 / 839) * 100, width: (357 / 1190) * 100, height: (418 / 839) * 100 };

export function CoverScene({ priority = false, sizes = "100vw", className = "" }: { priority?: boolean; sizes?: string; className?: string }) {
  const { photo, tree } = pgsGreens.hero;
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden ${className}`} style={{ containerType: "size" }}>
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ aspectRatio: String(RATIO), width: `max(100cqw, calc(100cqh * ${RATIO}))` }}
      >
        <Parallax className="absolute inset-0" amount={3} scale={1.08}>
          <Image src={photo.src} alt="" fill priority={priority} sizes={sizes} className="object-cover" />
        </Parallax>
        {/* Same scale as the field, slightly more travel → depth without drifting off the ghost */}
        <Parallax className="absolute inset-0" amount={4} scale={1.08}>
          <div className="absolute" style={{ left: `${TREE.left}%`, top: `${TREE.top}%`, width: `${TREE.width}%`, height: `${TREE.height}%` }}>
            <Image src={tree.src} alt="" fill priority={priority} quality={62} sizes="(min-width: 1024px) 30vw, 340px" className="object-contain" />
          </div>
        </Parallax>
      </div>
    </div>
  );
}
