import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Activity, Info, RotateCcw, Sparkles } from "lucide-react";
import Container from "./Container";
import Card from "./Card";
import SectionHeading from "./SectionHeading";

// Default inputs picked to land near "neurology brand"-scale numbers so the
// first paint looks like a real example rather than zeros. All values are
// inputs to a patient-based forecasting skeleton (the same shape used in
// real launch analytics, simplified for browser-side compute).
const DEFAULTS = {
  marketSize: 800000,     // patient pool (size of the disease population)
  dxRate: 55,             // % diagnosed
  txRate: 65,             // % of diagnosed who get treated
  peakShare: 12,          // peak % brand share of treated patients
  netPrice: 18000,        // net price per patient per year ($)
  persistence: 75,        // annual patient persistence on drug (%)
};

// Standard 5-year launch S-curve as fraction-of-peak by year. This is the
// shape recruiters working in pharma will recognize as a believable launch
// trajectory; the exact values are illustrative.
const LAUNCH_CURVE = [0.18, 0.55, 0.85, 0.95, 1.0];

function persistenceMultiplier(yearIdx, persistence) {
  // Year 1 is full new-patient cohort; later years feel cumulative attrition.
  // Bound at 0.5 so the curve doesn't collapse for low-persistence inputs.
  return Math.max(0.5, 1 - (1 - persistence / 100) * 0.3 * yearIdx);
}

function computeForecast(inputs) {
  const treatable = inputs.marketSize * (inputs.dxRate / 100) * (inputs.txRate / 100);
  return LAUNCH_CURVE.map((curveFactor, i) => {
    const year = i + 1;
    const share = (inputs.peakShare / 100) * curveFactor;
    const patientsOnDrug = treatable * share * persistenceMultiplier(i, inputs.persistence);
    const revenue = patientsOnDrug * inputs.netPrice;
    return { year, patientsOnDrug, revenue };
  });
}

function formatRevenue(value) {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(2)}B`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(0)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${Math.round(value)}`;
}

function formatPatients(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`;
  return Math.round(value).toString();
}

function Slider({ label, hint, value, min, max, step, onChange, format }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-[11px] font-mono uppercase tracking-wider text-white/55">
          {label}
        </label>
        <span className="font-mono text-sm font-semibold text-lime-300">
          {format ? format(value) : value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-1.5 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-lime-400 focus:outline-none focus:ring-2 focus:ring-lime-400/40"
      />
      {hint ? (
        <div className="mt-1 text-[10px] text-white/40">{hint}</div>
      ) : null}
    </div>
  );
}

function ForecastChart({ data, height = 200 }) {
  const padX = 36;
  const padTop = 24;
  const padBottom = 32;
  const width = 480;
  const innerW = width - padX * 2;
  const innerH = height - padTop - padBottom;

  const maxRev = Math.max(1, ...data.map((d) => d.revenue));
  const x = (i) => padX + (i / (data.length - 1)) * innerW;
  const y = (v) => padTop + innerH - (v / maxRev) * innerH;

  const pathPoints = data.map((d, i) => `${x(i)},${y(d.revenue)}`).join(" ");
  const areaPoints = `${padX},${padTop + innerH} ${pathPoints} ${padX + innerW},${padTop + innerH}`;

  // Y axis gridlines (4 segments)
  const gridY = [0, 0.25, 0.5, 0.75, 1].map((frac) => ({
    y: padTop + innerH - frac * innerH,
    label: formatRevenue(maxRev * frac),
  }));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="5-year forecast revenue chart"
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="forecastFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgb(132, 204, 22)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="rgb(132, 204, 22)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="forecastStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgb(190, 242, 100)" />
          <stop offset="100%" stopColor="rgb(103, 232, 249)" />
        </linearGradient>
      </defs>

      {/* Gridlines + Y labels */}
      {gridY.map((g, i) => (
        <g key={i}>
          <line
            x1={padX}
            x2={padX + innerW}
            y1={g.y}
            y2={g.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
          <text
            x={padX - 6}
            y={g.y + 3}
            fontSize="9"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="rgba(255,255,255,0.4)"
            textAnchor="end"
          >
            {g.label}
          </text>
        </g>
      ))}

      {/* Area + line */}
      <polygon points={areaPoints} fill="url(#forecastFill)" />
      <polyline
        points={pathPoints}
        fill="none"
        stroke="url(#forecastStroke)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Points + year labels */}
      {data.map((d, i) => (
        <g key={d.year}>
          <circle cx={x(i)} cy={y(d.revenue)} r="3.5" fill="rgb(190, 242, 100)" />
          <text
            x={x(i)}
            y={padTop + innerH + 16}
            fontSize="10"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="rgba(255,255,255,0.55)"
            textAnchor="middle"
          >
            Y{d.year}
          </text>
          <text
            x={x(i)}
            y={y(d.revenue) - 8}
            fontSize="9"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fill="rgba(190, 242, 100, 0.9)"
            textAnchor="middle"
          >
            {formatRevenue(d.revenue)}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default function LaunchForecastDemo() {
  const [inputs, setInputs] = useState(DEFAULTS);

  const set = (key) => (val) => setInputs((prev) => ({ ...prev, [key]: val }));
  const reset = () => setInputs(DEFAULTS);

  const forecast = useMemo(() => computeForecast(inputs), [inputs]);

  const peak = useMemo(
    () => forecast.reduce((acc, d) => (d.revenue > acc.revenue ? d : acc), forecast[0]),
    [forecast]
  );
  const cumulative = useMemo(
    () => forecast.reduce((sum, d) => sum + d.revenue, 0),
    [forecast]
  );
  const peakPatients = peak.patientsOnDrug;

  return (
    <section
      id="forecast-demo"
      className="relative scroll-mt-24 py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Live demo - patient-based forecast"
          title="Try the forecasting methodology in real time"
          subtitle="Move the sliders to see how each commercial lever changes a 5-year launch forecast. Same skeleton I use for real patient-based forecasts in pharma commercial analytics - simplified so it runs entirely in your browser, no signups."
          accent="lime"
          className="lg:max-w-5xl"
        />

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/70">
          <Sparkles className="h-3.5 w-3.5 text-lime-300" />
          100% client-side · no data leaves your browser · methodology shown, not a black box
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left - sliders */}
          <Card accent="lime">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-lime-300" />
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                  Inputs
                </h3>
              </div>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-white/65 hover:border-white/25 hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </button>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Slider
                label="Market size (patients)"
                hint="Total addressable disease population"
                value={inputs.marketSize}
                min={50000}
                max={2000000}
                step={10000}
                onChange={set("marketSize")}
                format={formatPatients}
              />
              <Slider
                label="Diagnosis rate"
                hint="% of pool actually diagnosed"
                value={inputs.dxRate}
                min={5}
                max={90}
                step={1}
                onChange={set("dxRate")}
                format={(v) => `${v}%`}
              />
              <Slider
                label="Treatment rate"
                hint="% of diagnosed who get treated"
                value={inputs.txRate}
                min={10}
                max={95}
                step={1}
                onChange={set("txRate")}
                format={(v) => `${v}%`}
              />
              <Slider
                label="Peak brand share"
                hint="% of treated patients on this brand at peak"
                value={inputs.peakShare}
                min={1}
                max={40}
                step={1}
                onChange={set("peakShare")}
                format={(v) => `${v}%`}
              />
              <Slider
                label="Net price (per patient / year)"
                hint="Net of gross-to-net deductions"
                value={inputs.netPrice}
                min={1000}
                max={150000}
                step={500}
                onChange={set("netPrice")}
                format={(v) => formatRevenue(v)}
              />
              <Slider
                label="Annual persistence"
                hint="% of patients staying on therapy year-over-year"
                value={inputs.persistence}
                min={40}
                max={95}
                step={1}
                onChange={set("persistence")}
                format={(v) => `${v}%`}
              />
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-[11px] leading-relaxed text-white/55">
              <Info className="mt-0.5 h-3 w-3 shrink-0 text-cyan-300" />
              <span>
                Forecast skeleton: treatable patients × launch S-curve × brand share × net price,
                with persistence applied as compounding attrition. Real production models layer
                in promotional response, competitive entry, lifecycle events, country splits,
                and assumption governance - shown in the Oncology Launch industry highlight above.
              </span>
            </div>
          </Card>

          {/* Right - output */}
          <Card accent="cyan">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                5-year forecast
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/45">
                Updated live
              </span>
            </div>

            <div className="mt-5">
              <ForecastChart data={forecast} />
            </div>

            <motion.div
              key={`${peak.revenue}-${cumulative}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-5 grid grid-cols-3 gap-3"
            >
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                  Peak-year revenue
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {formatRevenue(peak.revenue)}
                </div>
                <div className="text-[10px] text-white/40">Year {peak.year}</div>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                  Cumulative 5yr
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {formatRevenue(cumulative)}
                </div>
                <div className="text-[10px] text-white/40">Sum of years 1-5</div>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-white/45">
                  Patients at peak
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {formatPatients(peakPatients)}
                </div>
                <div className="text-[10px] text-white/40">On drug at peak year</div>
              </div>
            </motion.div>

            <div className="mt-5 text-[11px] leading-relaxed text-white/55">
              This is an illustrative skeleton, not a production forecast - it shows shape and
              direction, and lets you build intuition for how the levers interact. For real launch
              forecasts I layer in promotional response curves, competitor entry timing, line-of-
              therapy splits, country-level decomposition, and assumption governance.
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
