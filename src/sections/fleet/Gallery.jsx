import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import CircularCarousel from "../../components/reactbits/CircularCarousel";
import { FLEET } from "../../data/fleet";

// three.js is large, so the showroom drone loads separately
const DroneViewer = lazy(() => import("../../components/drone/DroneViewer"));

const BASE_ITEMS = FLEET.map((drone) => ({
    src: drone.photo,
    alt: `${drone.name} drone`,
    title: drone.name,
    subtitle: drone.role,
}));

// Repeat the fleet photos 4x to produce a full 12-item 360° carousel loop
const items = Array.from({ length: 4 }, () => BASE_ITEMS).flat();

const Gallery = () => {
    const [open, setOpen] = useState(null);

    useEffect(() => {
        if (!open) return undefined;
        const onKeyDown = (event) => event.key === "Escape" && setOpen(null);
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    return (
        <section id="gallery" className="py-20">
            <h2 className="flex items-center gap-4 font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
                <span
                    className="h-px w-10 bg-linear-to-r from-transparent to-sky-400"
                    aria-hidden="true"
                />
                Gallery
            </h2>

            {/* Panorama: cards curve inward around the viewer; click a card to open it full size */}
            <div
                className="mt-10"
                style={{ width: "100%", height: "560px", position: "relative" }}
            >
                <CircularCarousel
                    items={items}
                    preset="panorama"
                    intro="rise"
                    cardWidth={220}
                    aspectRatio={0.8}
                    speed={14}
                    captions={false}
                    gap={25}
                    autoplay="step"
                    interval={3}
                    direction="left"
                    momentum={0.6}
                    snap
                    pauseOnHover
                    focusOnClick={false}
                    onItemClick={(item) => setOpen(item)}
                    draggable
                    parallax={0.3}
                    stretch={0.5}
                    fadeColor="#000000"
                    depthFade={0.55}
                    innerShade={0.6}
                    cornerRadius={2}
                />
            </div>

            {/* Full-size photo view */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        key="lightbox"
                        className="fixed inset-0 z-[60] grid cursor-zoom-out place-items-center bg-night-950/90 p-4 backdrop-blur-md sm:p-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(null)}
                        role="dialog"
                        aria-modal="true"
                        aria-label={open.title}
                    >
                        <motion.figure
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.7, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="flex max-h-full flex-col items-center"
                        >
                            <img
                                src={open.src}
                                alt={open.alt}
                                className="max-h-[80vh] w-auto rounded-2xl border border-white/10 object-contain shadow-2xl"
                            />
                            <figcaption className="mt-4 text-center">
                                <span className="font-display text-lg font-bold text-white uppercase">{open.title}</span>
                                <span className="mt-1 block font-mono text-xs tracking-[0.2em] text-slate-400 uppercase">
                                    {open.subtitle} · Click or press Esc to close
                                </span>
                            </figcaption>
                        </motion.figure>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Showroom drone: turns slowly; can still be dragged to rotate */}
            <div className="mt-16">
                <div className="mx-auto h-[420px] max-w-3xl cursor-grab active:cursor-grabbing sm:h-[500px]">
                    <Suspense fallback={null}>
                        <DroneViewer />
                    </Suspense>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
