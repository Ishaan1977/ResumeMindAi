import { useEffect, useRef, useState } from "react";

/**
 * ScoreGauge — the site's signature element.
 * An analog instrument dial (0–100) with a sweeping needle and tick marks,
 * evoking a diagnostic panel "reading" the resume.
 */
export default function ScoreGauge({ score = 0, size = 220, label = "Resume Score" }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    const from = animatedScore;
    const to = Math.max(0, Math.min(100, score));

    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out-cubic
      setAnimatedScore(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  // Gauge sweeps from -120deg (score 0) to +120deg (score 100)
  const needleAngle = -120 + (animatedScore / 100) * 240;
  const ticks = Array.from({ length: 25 }, (_, i) => i); // every 10deg across 240deg

  const tone =
    animatedScore >= 80 ? "#3D5AFE" : animatedScore >= 50 ? "#FFB020" : "#E8552F";

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${label}: ${Math.round(animatedScore)} out of 100`}
    >
      <svg viewBox="0 0 220 220" width={size} height={size} className="overflow-visible">
        {/* Outer ring */}
        <circle cx="110" cy="110" r="100" fill="#161D2E" stroke="#2A3347" strokeWidth="1" />

        {/* Tick marks */}
        {ticks.map((i) => {
          const angle = -120 + (i / 24) * 240;
          const rad = (angle * Math.PI) / 180;
          const isMajor = i % 6 === 0;
          const r1 = isMajor ? 78 : 84;
          const r2 = 92;
          const x1 = 110 + r1 * Math.sin(rad);
          const y1 = 110 - r1 * Math.cos(rad);
          const x2 = 110 + r2 * Math.sin(rad);
          const y2 = 110 - r2 * Math.cos(rad);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isMajor ? "#8A93A6" : "#4A5266"}
              strokeWidth={isMajor ? 2 : 1}
            />
          );
        })}

        {/* Progress arc */}
        <path
          d={describeArc(110, 110, 92, -120, -120 + (animatedScore / 100) * 240)}
          fill="none"
          stroke={tone}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Needle */}
        <g transform={`rotate(${needleAngle} 110 110)`}>
          <polygon points="110,32 105,110 115,110" fill={tone} />
        </g>
        <circle cx="110" cy="110" r="8" fill="#EDE6D6" stroke={tone} strokeWidth="3" />
      </svg>

      <div className="absolute bottom-4 flex flex-col items-center">
        <span className="font-mono text-3xl font-medium text-parchment tabular-nums">
          {Math.round(animatedScore)}
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-mist">
          {label}
        </span>
      </div>
    </div>
  );
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}
