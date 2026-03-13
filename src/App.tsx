import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import { ArrowRight, ArrowUpRight, Menu, Star, X } from 'lucide-react'
import caras1Image from './assets/caras1.jpg'
import caras2Image from './assets/caras2.jpg'
import caras3Image from './assets/caras3.jpg'
import section1Image from './assets/section1.jpg'

const navigation = [
  { label: 'Home', href: '#inicio' },
  { label: 'About', href: '#resumen' },
  { label: 'Discover', href: '#discover' },
  { label: 'Team', href: '#equipo' },
  { label: 'Contact', href: '#contacto' },
]

const mailHref = 'mailto:francisco@hongares.com'

const partnerLogos = [
  'Casa Clara',
  'Puente Social',
  'Habita Local',
  'Valencia Base',
  'Contexto',
  'Red Hogar',
  'Nodo Vivienda',
  'Acogida+',
  'Clave Casa',
  'Piso Vivo',
]

const aboutStats = [
  { value: '3', label: 'Publicos clave' },
  { value: '1', label: 'Ciudad de foco' },
  { value: '360', label: 'Mediacion y seguimiento' },
  { value: '1', label: 'Interlocutor claro' },
]

const teamCards = [
  {
    title: 'Mediacion',
    role: 'Propietarios y familias',
    image: caras1Image,
  },
  {
    title: 'Coordinacion',
    role: 'Casos, requisitos y tiempos',
    image: caras2Image,
  },
  {
    title: 'Presencia local',
    role: 'Valencia y seguimiento real',
    image: caras3Image,
  },
]

const reviews = [
  {
    title: 'Propietarios',
    text: 'Hongares reduce friccion, filtra mejor y hace que la conversacion sea mas legible desde el inicio.',
  },
  {
    title: 'Familias migrantes',
    text: 'La documentacion se entiende mejor, el proceso se ordena y cada paso gana mas contexto y acompanamiento.',
  },
  {
    title: 'ONGs y programas',
    text: 'Cuando hay urgencia y varias partes implicadas, tener un interlocutor claro cambia por completo la operativa.',
  },
]

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    filter: 'blur(10px)',
  },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
      variants={revealVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function BrandMark() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eef3ff] text-[#4b6bff]">
      <svg viewBox="0 0 64 64" className="h-5 w-5 fill-none stroke-current">
        <path
          d="M16 28L32 16l16 12v18H16V28Z"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M24 28v18M40 28v18" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroImageY = useTransform(scrollYProgress, [0, 0.18], [0, 38])
  const heroImageScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.03])

  return (
    <div className="min-h-screen overflow-x-clip bg-white text-[#101114]">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/[0.05] bg-white/88 backdrop-blur-xl">
        <div className="page-shell flex h-[74px] items-center justify-between gap-6">
          <a
            href="#inicio"
            className="flex items-center gap-3"
            onClick={() => setMenuOpen(false)}
          >
            <BrandMark />
            <span className="text-[1.05rem] font-semibold tracking-[-0.04em]">
              Hongares
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a key={item.label} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={mailHref} className="nav-link">
              Email
            </a>
            <a href="#contacto" className="button-primary">
              Hablar ahora
            </a>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/[0.08] text-[#101114] lg:hidden"
            aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-black/[0.05] bg-white px-6 py-5 lg:hidden"
            >
              <div className="grid gap-2">
                {navigation.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="rounded-2xl border border-black/[0.06] px-4 py-3 text-sm font-medium text-black/72"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contacto"
                  className="button-primary mt-2 justify-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Hablar ahora
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="pt-[74px]">
        <section id="inicio" className="page-shell relative py-10 sm:py-14 lg:py-16">
          <div className="pointer-events-none absolute left-[-6rem] top-10 h-52 w-52 rounded-full bg-[#eef3ff] blur-3xl" />

          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <Reveal className="max-w-[34rem] pt-6">
              <h1 className="text-[clamp(3.3rem,7.8vw,5.8rem)] font-semibold leading-[0.9] tracking-[-0.075em] text-[#111217]">
                Alquila con <span className="text-[#4b6bff]">confianza</span>{' '}
                y contexto real
              </h1>
              <p className="mt-6 max-w-[30rem] text-[1rem] leading-7 text-black/58 sm:text-[1.04rem]">
                Hongares acompana alquileres en Valencia para propietarios,
                familias migrantes y organizaciones que necesitan criterio,
                mediacion y presencia local.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <a href="#discover" className="button-primary">
                  Ver la propuesta
                </a>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-black">
                  <Star className="h-4 w-4 fill-[#4b6bff] text-[#4b6bff]" />
                  <span>4.9</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <motion.div
                style={{ y: heroImageY, scale: heroImageScale }}
                className="relative mx-auto w-full max-w-[560px]"
              >
                <div className="hero-photo overflow-hidden rounded-[28px] border border-black/[0.06] bg-[#f3f4f6] shadow-[0_28px_60px_rgba(16,17,20,0.08)]">
                  <img
                    src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80"
                    alt="Mesa clara con plantas y cuaderno"
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="absolute bottom-5 left-5 inline-flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-[0_16px_34px_rgba(16,17,20,0.12)]">
                  <div className="flex -space-x-3">
                    {teamCards.map((item) => (
                      <img
                        key={item.title}
                        src={item.image}
                        alt={item.title}
                        className="h-9 w-9 rounded-full border-2 border-white object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold tracking-[-0.03em] text-[#101114]">
                    120+ casos
                  </span>
                </div>
              </motion.div>
            </Reveal>
          </div>

          <Reveal delay={0.12} className="mt-14 sm:mt-16">
            <div className="logo-cloud">
              {partnerLogos.map((item, index) => (
                <span
                  key={item}
                  className={cn(
                    'logo-cloud-item',
                    index % 3 === 0 ? 'text-[1.95rem]' : '',
                    index % 3 === 1 ? 'text-[1.25rem]' : '',
                    index % 3 === 2 ? 'text-[1.05rem]' : '',
                  )}
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section id="resumen" className="page-shell py-16 sm:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.96fr_0.74fr] lg:items-start">
            <Reveal className="max-w-[32rem]">
              <h2 className="text-[clamp(2.8rem,6vw,4.7rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-[#111217]">
                Una agencia para <span className="text-black/28">casos</span>{' '}
                donde el contexto cambia la decision
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:gap-x-14">
                {aboutStats.map((item) => (
                  <div key={item.label}>
                    <p className="text-[clamp(2.4rem,4.5vw,3.8rem)] font-semibold leading-none tracking-[-0.06em] text-[#111217]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-black/46">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-12 max-w-[54rem] text-center text-[1.18rem] leading-9 tracking-[-0.02em] text-black/62">
              Hongares ordena alquileres en Valencia cuando la vivienda no se
              entiende solo desde el mercado: traduce requisitos, media entre
              partes y sostiene confianza durante todo el proceso.
            </p>
          </Reveal>
        </section>

        <section id="discover" className="page-shell py-4 sm:py-6 lg:py-8">
          <Reveal className="mx-auto max-w-[34rem] text-center">
            <h2 className="text-[clamp(2.5rem,5.2vw,4.2rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[#111217]">
              Descubre <span className="text-black/28">Hongares</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-black/54">
              Una lectura mas clara de la vivienda, la migracion y la
              mediacion en la misma operacion.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <div className="media-frame">
              <img
                src={section1Image}
                alt="Equipe Hongares em reuniao"
                className="h-full w-full object-cover object-[center_38%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.34))]" />
              <div className="absolute left-6 top-4 text-[clamp(4.6rem,11vw,8rem)] font-semibold leading-none tracking-[-0.085em] text-white sm:left-8 sm:top-6">
                Hongares
              </div>
            </div>
          </Reveal>
        </section>

        <section id="equipo" className="page-shell py-16 sm:py-20 lg:py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal className="max-w-[36rem]">
              <h2 className="text-[clamp(2.6rem,5.4vw,4.1rem)] font-semibold leading-[0.94] tracking-[-0.07em] text-[#111217]">
                Las caras de <span className="text-black/28">Hongares</span>
              </h2>
              <p className="mt-3 max-w-[31rem] text-sm leading-6 text-black/54">
                Mediacion, coordinacion y presencia local para procesos de
                alquiler que necesitan mas cuidado y menos ruido.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <a href={mailHref} className="button-blue-ghost">
                Ver mas
              </a>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {teamCards.map((card, index) => (
              <Reveal key={card.title} delay={0.08 * index}>
                <article className="team-card">
                  <div className="overflow-hidden rounded-[20px] bg-[#f4f5f7]">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-[320px] w-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[1.45rem] font-semibold tracking-[-0.04em] text-[#111217]">
                        {card.title}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/42">
                        {card.role}
                      </p>
                    </div>
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f1f3f7] text-black/48">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="page-shell pb-20 pt-2 sm:pb-24" id="testimonios">
          <Reveal className="max-w-[42rem]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-[32rem] text-[clamp(2.6rem,5.5vw,4.15rem)] font-semibold leading-[0.94] tracking-[-0.075em] text-[#111217]">
                Elegida por <span className="text-black/28">quienes</span>{' '}
                necesitan claridad
              </h2>
              <div className="inline-flex items-center gap-3 rounded-full bg-[#f5f6f8] px-4 py-2 text-sm font-medium text-black/62">
                <div className="flex -space-x-2">
                  {teamCards.slice(0, 2).map((item) => (
                    <img
                      key={item.title}
                      src={item.image}
                      alt={item.title}
                      className="h-7 w-7 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                Casos coordinados
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((review, index) => (
              <Reveal key={review.title} delay={0.08 * index}>
                <article className="review-card">
                  <div className="flex items-center gap-1 text-[#f6b31e]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={`${review.title}-${starIndex}`}
                        className="h-4 w-4 fill-current"
                      />
                    ))}
                  </div>
                  <p className="mt-5 text-[1rem] leading-7 text-black/62">
                    {review.text}
                  </p>
                  <div className="mt-6 border-t border-black/[0.06] pt-4">
                    <p className="text-sm font-semibold tracking-[-0.03em] text-[#111217]">
                      {review.title}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.12em] text-black/40">
                      Hongares Valencia
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </main>

      <footer
        id="contacto"
        className="border-t border-black/[0.06] bg-white pb-10 pt-8"
      >
        <div className="page-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark />
            <div>
              <p className="text-sm font-semibold tracking-[-0.03em] text-[#111217]">
                Hongares
              </p>
              <p className="text-sm text-black/50">
                Vivienda, migracion y confianza en Valencia.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-black/60">
            <a href="tel:+34605592599" className="footer-link">
              605 592 599
            </a>
            <a href={mailHref} className="footer-link">
              francisco@hongares.com
            </a>
            <a
              href="https://maps.google.com/?q=Calle+Santa+Cruz+de+Tenerife+7,+Valencia"
              target="_blank"
              rel="noreferrer"
              className="footer-link inline-flex items-center gap-2"
            >
              Valencia
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
