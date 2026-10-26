import CircularCarousel from "../../components/reactbits/CircularCarousel";
import { FLEET } from "../../data/fleet";

const BASE_ITEMS = FLEET.map((drone) => ({
    src: drone.photo,
    alt: `${drone.name} drone`,
    title: drone.name,
    subtitle: drone.role,
}));

// Repeat the fleet photos 4x to produce a full 12-item 360° carousel loop
const items = Array.from({ length: 4 }, () => BASE_ITEMS).flat();

const Gallery = () => (
    <section id="gallery" className="py-20">
        <h2 className="flex items-center gap-4 font-display text-3xl font-bold tracking-tight text-white uppercase sm:text-4xl">
            <span
                className="h-px w-10 bg-linear-to-r from-transparent to-sky-400"
                aria-hidden="true"
            />
            Gallery
        </h2>

        <div
            className="mt-10"
            style={{ width: "100%", height: "560px", position: "relative" }}
        >
            <CircularCarousel
                items={items}
                preset="cylinder"
                intro="rise"
                cardWidth={220}
                aspectRatio={1}
                speed={14}
                captions={false}
                gap={25}
                tilt={-5}
                curve={1}
                perspective={2500}
                autoplay="drift"
                interval={3}
                direction="left"
                momentum={0.6}
                snap
                pauseOnHover
                focusOnClick
                draggable
                parallax={0.3}
                stretch={0.5}
                fadeColor="#000000"
                depthFade={0.55}
                innerShade={0.6}
                cornerRadius={2}
            />
        </div>
    </section>
);

export default Gallery;
