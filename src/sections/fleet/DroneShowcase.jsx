import { useState } from "react";

const TABS = [
    { id: "capabilities", label: "Mission Capabilities" },
    { id: "components", label: "Components & Specs" },
];

const DroneCard = ({ drone, reverse }) => {
    const [tab, setTab] = useState("capabilities");
    const panelId = `${drone.id}-panel`;

    return (
        <article
            id={drone.id}
            className={`grid scroll-mt-28 gap-8 rounded-sm border border-white/10 bg-night-900/60 p-6 backdrop-blur-md sm:p-8 lg:gap-12 lg:p-10 ${
                reverse ? "lg:grid-cols-[7fr_5fr]" : "lg:grid-cols-[5fr_7fr]"
            }`}
        >
            {/* Photo: alternates sides on desktop */}
            {/* self-start: the frame hugs the photo instead of stretching to the card's height */}
            <figure
                className={`group relative self-start overflow-hidden rounded-sm border border-white/10 ${reverse ? "lg:order-last" : ""}`}
            >
                <img
                    src={drone.photo}
                    alt={`${drone.name}, Team VAYU ${drone.configuration.toLowerCase()}`}
                    loading="lazy"
                    className="block aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
            </figure>

            <div className="min-w-0">
                <p className="font-mono text-xs tracking-[0.2em] text-slate-300 uppercase">
                    Callsign // {drone.callsign} — {drone.role}
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-white uppercase sm:text-5xl">
                    {drone.name}
                </h2>
                <p className="mt-2 font-mono text-xs tracking-[0.2em] text-slate-500 uppercase">
                    Configuration: {drone.configuration}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-white/10 bg-white/10">
                    {drone.stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="flex flex-col-reverse gap-1 bg-night-950/80 px-4 py-3"
                        >
                            <dt className="font-mono text-[10px] tracking-[0.2em] text-slate-400 uppercase">
                                {stat.label}
                            </dt>
                            <dd className="font-display text-base font-bold text-white sm:text-lg">
                                {stat.value}
                            </dd>
                        </div>
                    ))}
                </dl>

                <h3 className="mt-6 font-semibold text-white sm:text-lg">
                    {drone.headline}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-300">
                    {drone.description}
                </p>

                {/* Capabilities | Components tabs */}
                <div
                    className="mt-6 flex gap-1 border-b border-white/10"
                    role="tablist"
                    aria-label={`${drone.name} details`}
                >
                    {TABS.map((t) => (
                        <button
                            key={t.id}
                            type="button"
                            role="tab"
                            id={`${drone.id}-${t.id}-tab`}
                            aria-selected={tab === t.id}
                            aria-controls={panelId}
                            onClick={() => setTab(t.id)}
                            className={`relative px-3 py-2.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors ${
                                tab === t.id
                                    ? "text-sky-300"
                                    : "text-slate-400 hover:text-white"
                            }`}
                        >
                            {t.label}
                            {tab === t.id && (
                                <span
                                    className="absolute inset-x-0 -bottom-px h-0.5 bg-sky-400"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    ))}
                </div>

                <div
                    id={panelId}
                    role="tabpanel"
                    aria-labelledby={`${drone.id}-${tab}-tab`}
                    className="pt-5"
                >
                    {tab === "capabilities" ? (
                        <ul className="space-y-3">
                            {drone.capabilities.map((item) => (
                                <li
                                    key={item}
                                    className="flex gap-3 text-slate-200"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        className="mt-0.5 size-4 flex-none text-sky-400"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12.5l4.5 4.5L19 7.5" />
                                    </svg>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <dl className="space-y-2">
                            {drone.components.map((part) => (
                                <div
                                    key={part.label}
                                    className="grid gap-1 rounded-sm border border-white/10 bg-night-950/60 px-4 py-3 sm:grid-cols-[11rem_1fr] sm:gap-4"
                                >
                                    <dt className="font-mono text-[11px] tracking-[0.15em] text-slate-400 uppercase">
                                        {part.label}
                                    </dt>
                                    <dd className="text-sm text-slate-100">
                                        {part.value}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    )}
                </div>
            </div>
        </article>
    );
};

const DroneShowcase = ({ fleet }) => (
    <div className="space-y-10">
        {fleet.map((drone, index) => (
            <DroneCard key={drone.id} drone={drone} reverse={index % 2 === 1} />
        ))}
    </div>
);

export default DroneShowcase;
