import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

const V = "/videos/pgs-greens";

/** Site-visit clips. Portrait, low resolution — shown in a phone-shaped frame, click to play. */
const clips = [
  { file: "site-walk", title: "Site walk-through", note: "With sound · 1 min 31 s", label: "Site walk-through, 1 minute 31 seconds, with sound", audio: true },
  { file: "cottage-gardens", title: "Cottage and gardens", note: "15 s", label: "Cottage and landscaped gardens, 15 seconds", audio: false },
  { file: "open-land", title: "Open land and internal road", note: "17 s", label: "Open land and internal road, 17 seconds", audio: false },
  { file: "site-road", title: "Approach road", note: "4 s · with sound", label: "Approach road, 4 seconds, with sound", audio: true },
] as const;

export function PgsSiteVideos() {
  return (
    <section id="site-visit" aria-labelledby="site-visit-heading" className="section-y bg-ivory-200">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Site visit</Eyebrow></Reveal>
            <Reveal delay={0.08}><Heading id="site-visit-heading" className="mt-6 text-forest-900">See the land for yourself.</Heading></Reveal>
          </div>
          <Reveal delay={0.12} className="lg:col-span-5">
            <p className="text-muted">Short clips filmed on a visit to the PGS GREENS site. Press play — nothing starts on its own.</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {clips.map((c, i) => (
            <li key={c.file}>
              <Reveal delay={i * 0.07}>
                <figure>
                  <div className="overflow-hidden border border-hairline bg-forest-950">
                    <video
                      controls
                      playsInline
                      preload="none"
                      poster={`${V}/${c.file}.jpg`}
                      aria-label={c.label}
                      className="aspect-[9/16] w-full bg-forest-950 object-cover"
                    >
                      <source src={`${V}/${c.file}.mp4`} type="video/mp4" />
                      Your browser can’t play this video.
                    </video>
                  </div>
                  <figcaption className="mt-3">
                    <span className="block font-display text-[1.25rem] leading-tight text-forest-900">{c.title}</span>
                    <span className="text-small text-muted">{c.note}</span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-small text-muted">Site-visit footage — conditions on site may differ from the final development. Not a legal offer.</p>
      </div>
    </section>
  );
}