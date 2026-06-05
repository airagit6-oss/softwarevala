import horizontalAsset from "@/assets/brand/software-vala-horizontal.png.asset.json";
import roundAsset from "@/assets/brand/software-vala-round.png.asset.json";

type Variant = "auto" | "horizontal" | "round" | "icon" | "mark";
type Tone = "auto" | "dark" | "light";

interface LogoProps {
  /**
   * - `horizontal` full wordmark with tagline (use for wide spaces ≥160px)
   * - `round` / `icon` / `mark` round badge (sidebars, favicons, chips)
   * - `auto` chooses based on height (≥44 → horizontal, else round)
   */
  variant?: Variant;
  /** Visual height in px. Width auto-scales preserving aspect ratio. */
  height?: number;
  className?: string;
  alt?: string;
  /** Adds a royal-blue outer glow for hero/login placements. */
  withGlow?: boolean;
  /** Background plate style hint (rarely needed — both assets are pre-finished). */
  tone?: Tone;
  /** Reserved for API compatibility — both assets render raw with crisp shadow. */
  plain?: boolean;
}

/**
 * Software Vala brand mark.
 *
 * The supplied artwork is already finished (the round file has its own deep
 * blue ring + drop-shadow, the horizontal file has its own "THE NAME OF TRUST"
 * tagline bar). We render the images raw — no synthetic plate, no second ring —
 * so the brand reads exactly as designed at every size. A subtle drop-shadow
 * (and optional royal-blue glow) lifts the mark off dark navy surfaces without
 * touching the artwork itself. Aspect ratio is preserved; the image is never
 * stretched, cropped, or distorted.
 */
export function Logo({
  variant = "auto",
  height = 40,
  className = "",
  alt = "Software Vala — The Name of Trust",
  withGlow = false,
}: LogoProps) {
  const resolved: "horizontal" | "round" =
    variant === "auto"
      ? height >= 44
        ? "horizontal"
        : "round"
      : variant === "horizontal"
      ? "horizontal"
      : "round";

  const isRound = resolved === "round";
  const src = isRound ? roundAsset.url : horizontalAsset.url;

  const shadow = withGlow
    ? "drop-shadow(0 0 24px rgba(10,91,255,0.55)) drop-shadow(0 0 8px rgba(45,140,255,0.45)) drop-shadow(0 4px 12px rgba(0,0,0,0.45))"
    : "drop-shadow(0 2px 6px rgba(0,0,0,0.35)) drop-shadow(0 0 1px rgba(10,91,255,0.25))";

  // Horizontal asset native ratio ≈ 540 × 140 (≈ 3.86:1)
  const width = isRound ? height : Math.round(height * 3.86);

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="eager"
      decoding="async"
      draggable={false}
      className={className}
      style={{
        height,
        width: isRound ? height : "auto",
        maxWidth: "100%",
        objectFit: "contain",
        display: "block",
        filter: shadow,
        imageRendering: "auto",
        userSelect: "none",
      }}
    />
  );
}

export default Logo;
