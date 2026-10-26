/*
  Profile card with a V crest behind the photo. Rank is shown by tier:
    captain    gold crest + crown, gold ring with a light sweep, ★★★
    lead       silver crest, ★★
    domainLead silver crest, ★
    member     smaller steel crest
*/
const TIERS = {
  // All tiers share the domain card size; rank shows through metal, crown and stars
  captain: { avatar: 'size-28', crest: 'w-[220px]', metal: 'gold', stars: 3, card: 'px-5 py-7' },
  lead: { avatar: 'size-28', crest: 'w-[220px]', metal: 'silver', stars: 2, card: 'px-5 py-7' },
  domainLead: { avatar: 'size-28', crest: 'w-[220px]', metal: 'silver', stars: 1, card: 'px-5 py-7' },
  member: { avatar: 'size-24', crest: 'w-[190px]', metal: 'steel', stars: 0, card: 'px-5 py-7' },
}

const METALS = {
  gold: { stops: ['#fff6cc', '#f5c542', '#b7791f', '#fde68a'], glow: 'rgba(245,197,66,0.55)' },
  silver: { stops: ['#ffffff', '#cbd5e1', '#64748b', '#f1f5f9'], glow: 'rgba(226,232,240,0.5)' },
  steel: { stops: ['#cbd5e1', '#64748b', '#334155', '#94a3b8'], glow: 'rgba(148,163,184,0.35)' },
}

const Crest = ({ metal, id }) => {
  const [a, b, c, d] = METALS[metal].stops
  const gradient = `crest-${metal}-${id}`
  const blades = (
    <>
      <polygon points="10,6 60,6 120,120 106,128" />
      <polygon points="2,42 34,38 94,120 82,126" opacity="0.85" />
    </>
  )
  return (
    <svg viewBox="0 0 240 150" className="block w-full" aria-hidden="true">
      <defs>
        <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="0.35" stopColor={b} />
          <stop offset="0.7" stopColor={c} />
          <stop offset="1" stopColor={d} />
        </linearGradient>
      </defs>
      <g fill={`url(#${gradient})`}>
        {blades}
        <g transform="translate(240,0) scale(-1,1)">{blades}</g>
        <polygon points="108,130 132,130 120,148" />
      </g>
    </svg>
  )
}

const Crown = () => (
  <svg viewBox="0 0 40 24" className="w-10 drop-shadow-[0_0_10px_rgba(245,197,66,0.7)]" aria-hidden="true">
    <defs>
      <linearGradient id="crown-gold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff6cc" />
        <stop offset="1" stopColor="#d69e2e" />
      </linearGradient>
    </defs>
    <path d="M2 22 L5 6 L13 14 L20 2 L27 14 L35 6 L38 22 Z" fill="url(#crown-gold)" />
    <circle cx="20" cy="2.5" r="2" fill="#fff6cc" />
  </svg>
)

const Avatar = ({ person, tier }) => {
  const { avatar, metal } = TIERS[tier]
  const [a, b, c] = METALS[metal].stops
  const initials = person.initials ?? person.name.slice(0, 2).toUpperCase()

  return (
    <div
      className={`group/avatar relative z-10 cursor-pointer rounded-full p-[5px] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04] ${avatar}`}
      style={{
        background: `linear-gradient(135deg, ${a} 0%, ${b} 35%, ${c} 70%, ${a} 100%)`,
        '--avatar-glow': METALS[metal].glow,
      }}
    >
      {/* Captain only: light sweeping round the gold ring */}
      {tier === 'captain' && (
        <span className="absolute inset-0 overflow-hidden rounded-full" aria-hidden="true">
          <span className="absolute -inset-1/2 animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.95)_30deg,transparent_70deg)] motion-reduce:animate-none" />
        </span>
      )}
      <span className="absolute inset-0 rounded-full shadow-[0_0_30px_var(--avatar-glow),inset_0_0_15px_rgba(0,0,0,0.9)] transition-shadow duration-500 group-hover/avatar:shadow-[0_0_45px_var(--avatar-glow),0_0_0_4px_var(--avatar-glow)]" />
      <div className="relative size-full overflow-hidden rounded-full bg-night-900">
        {person.photo ? (
          <img
            src={person.photo}
            alt={person.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/avatar:scale-[1.08]"
          />
        ) : (
          <span className="grid size-full place-items-center font-display text-2xl font-bold text-slate-200">{initials}</span>
        )}
      </div>
    </div>
  )
}

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11.5H3V9.75zm7 0h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.85h-4v-5.2c0-1.24-.02-2.83-1.73-2.83-1.73 0-2 1.35-2 2.74v5.29h-4V9.75z" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
)

const SOCIAL_ICONS = [
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedInIcon },
  { key: 'github', label: 'GitHub', Icon: GitHubIcon },
]

const socialClass =
  'grid size-9 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-slate-400 transition duration-300 hover:-translate-y-0.5 hover:border-sky-300/60 hover:bg-white/15 hover:text-white hover:shadow-[0_0_12px_rgba(255,255,255,0.25)]'

const Socials = ({ person }) => (
  <ul className="mt-6 flex justify-center gap-3">
    {SOCIAL_ICONS.map(({ key, label, Icon }) => {
      const href = person.socials?.[key]
      return (
        <li key={key}>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${person.name} on ${label}`} className={socialClass}>
              <Icon />
            </a>
          ) : (
            // No link yet: the icon only animates on hover
            <span className={socialClass} aria-hidden="true">
              <Icon />
            </span>
          )}
        </li>
      )
    })}
  </ul>
)

const Badge = ({ tier, label }) => {
  const stars = '★'.repeat(TIERS[tier].stars)
  const style =
    tier === 'captain'
      ? 'bg-linear-to-r from-amber-100 via-amber-300 to-amber-500 text-night-950 shadow-[0_0_18px_rgba(245,197,66,0.45)]'
      : tier === 'lead'
        ? 'bg-linear-to-r from-white via-slate-200 to-slate-400 text-night-950'
        : 'border border-white/20 bg-white/10 text-slate-100'
  return (
    <span className={`relative z-10 -mt-2 inline-flex items-center gap-2 rounded-sm px-3 py-1 font-mono text-[11px] font-bold tracking-[0.2em] uppercase ${style}`}>
      {stars && <span className="tracking-normal">{stars}</span>}
      {label}
    </span>
  )
}

const TeamCard = ({ person, tier = 'member', badge }) => {
  const t = TIERS[tier]
  const nameSize = 'text-xl'

  return (
    <article
      className={`group relative flex w-full flex-col items-center rounded-2xl border bg-linear-to-br from-night-800/80 to-night-950/90 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 ${t.card} ${
        tier === 'captain'
          ? 'border-amber-200/25 shadow-[0_16px_50px_rgba(0,0,0,0.5),0_0_40px_rgba(245,197,66,0.12)] hover:border-amber-200/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_55px_rgba(245,197,66,0.25)]'
          : 'border-white/10 hover:border-white/35 hover:shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_35px_rgba(255,255,255,0.12)]'
      }`}
    >
      {tier === 'captain' && (
        <div className="relative z-20 -mb-1">
          <Crown />
        </div>
      )}

      <div className="relative flex items-center justify-center">
        {/* Crest grows and glows when the card is hovered */}
        <div
          className={`pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[46%] transition duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[52%] group-hover:scale-[1.08] ${t.crest}`}
          style={{
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8)) drop-shadow(0 0 10px var(--crest-glow))',
            '--crest-glow': METALS[t.metal].glow,
          }}
        >
          <div className="transition duration-500 group-hover:brightness-125">
            <Crest metal={t.metal} id={`${person.id}-${tier}`} />
          </div>
        </div>
        <Avatar person={person} tier={tier} />
      </div>

      {badge && <div className="mt-6"><Badge tier={tier} label={badge} /></div>}

      <h3 className={`font-display font-bold text-white ${badge ? 'mt-4' : 'mt-8'} ${nameSize}`}>{person.name}</h3>
      {person.role && <p className="mt-2 font-mono text-sm tracking-[0.25em] text-slate-200 uppercase">{person.role}</p>}
      <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-slate-500 uppercase">Callsign // {person.callsign}</p>

      <dl className="mt-6 w-full space-y-3 text-left">
        <div className="rounded-xl border border-white/10 bg-night-950/60 px-4 py-3">
          <dt className="font-mono text-[11px] font-bold tracking-[0.15em] text-slate-100 uppercase">Area of Expertise</dt>
          <dd className="mt-1 text-sm text-slate-300">{person.expertise}</dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-night-950/60 px-4 py-3">
          <dt className="font-mono text-[11px] font-bold tracking-[0.15em] text-slate-100 uppercase">Contributions</dt>
          <dd className="mt-1 text-sm text-slate-300">{person.contributions}</dd>
        </div>
      </dl>

      <Socials person={person} />
    </article>
  )
}

export default TeamCard
