import { useState } from 'react'
import type { ReactNode } from 'react'
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion'
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Menu,
  Phone,
  Star,
  X,
} from 'lucide-react'
import caras1Image from './assets/caras1.jpg'
import caras2Image from './assets/caras2.jpg'
import caras3Image from './assets/caras3.jpg'
import discoverVideo from './assets/video.mp4'
import logoImage from './assets/logo.png'

const navigation = [
  { label: 'Home', href: '#inicio' },
  { label: 'About', href: '#resumen' },
  { label: 'Discover', href: '#discover' },
  { label: 'Team', href: '#equipo' },
  { label: 'Contact', href: '#contacto' },
]

const mailHref = 'mailto:francisco@hongares.com'
const phoneHref = 'tel:+34605592599'
const mapHref =
  'https://maps.google.com/?q=Calle+Santa+Cruz+de+Tenerife+7,+Valencia'

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
    text: 'Agradecido al momento de contactar a HONGARES, ya que la honestidad y la firmesa de su loable labor es muy importante, tanto por el trato y la transparencia de su trabajo. Agradezco ante mano por esta oportunidad.',
  },
  {
    title: 'Familias migrantes',
    text: 'Quiero agradecerte sinceramente por la excelente gestion y servicio que me brindaron al alquilarme el cuarto. Desde el principio, tu profesionalismo y amabilidad hicieron que todo el proceso fuera mucho mas facil y agradable. Me senti muy comodo y bien atendido. Totalmente recomendado.',
  },
  {
    title: 'ONGs y programas',
    text: 'Gente honesta, responsable y sobretodo con mucha empatia. Hicieron que nuestro proceso de mudanza sea llevadero y resolutivo. La habitacion esta tal cual la foto. Lo recomendaria 100%',
  },
]

const contactCards = [
  {
    label: 'Correo directo',
    value: 'francisco@hongares.com',
    detail: 'Para propietarios, familias migrantes y organizaciones.',
    href: mailHref,
    icon: Mail,
  },
  {
    label: 'Telefono',
    value: '605 592 599',
    detail: 'Respuesta rapida para casos y coordinacion.',
    href: phoneHref,
    icon: Phone,
  },
  {
    label: 'Base local',
    value: 'Calle Santa Cruz de Tenerife 7, Valencia',
    detail: 'Presencia local y seguimiento real en la ciudad.',
    href: mapHref,
    icon: MapPin,
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

type BrandMarkProps = {
  className?: string
  imageClassName?: string
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

function BrandMark({ className, imageClassName }: BrandMarkProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <img
        src={logoImage}
        alt="Hongares"
        className={cn(
          'absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain object-center',
          imageClassName,
        )}
      />
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
            className="flex items-center"
            onClick={() => setMenuOpen(false)}
          >
            <BrandMark
              className="h-[44px] w-[168px]"
              imageClassName="scale-[2.08]"
            />
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
          <div className="grid gap-10">
            <Reveal className="mx-auto max-w-[72rem] text-center">
              <h2 className="text-[clamp(2.7rem,5.4vw,4.7rem)] font-semibold leading-[0.92] tracking-[-0.075em] text-[#111217]">
                <span className="block md:whitespace-nowrap">
                  Una agencia para <span className="text-black/28">casos</span>{' '}
                  donde
                </span>
                <span className="block md:whitespace-nowrap">
                  el contexto cambia la decision
                </span>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-12 max-w-[54rem] text-center text-[1.18rem] leading-9 tracking-[-0.02em] text-black/62">
              Somos un grupo de emprendedores que ha vivido en primera persona
              las dificultades de establecerse en un pais distinto buscando
              mejores oportunidades para sus familias. Sabemos lo que hacemos y
              los retos que aparecen en ese proceso, por eso, junto a un equipo
              multicultural y asesores nacionales de Asociacion con Valores,
              representamos una esperanza habitacional para muchas familias
              inmigrantes y ONGs en Valencia.
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
              <video
                src={discoverVideo}
                className="h-full w-full object-cover object-center"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
                  <p className="mt-5 whitespace-pre-line text-[1rem] leading-7 text-black/62">
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

        <section id="contacto" className="page-shell pb-20 pt-2 sm:pb-24 lg:pb-28">
          <Reveal className="contact-cta">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="max-w-[36rem]">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-[#4b6bff]">
                  Contacto
                </p>
                <h2 className="mt-4 text-[clamp(2.8rem,5.7vw,4.9rem)] font-semibold leading-[0.93] tracking-[-0.075em] text-[#111217]">
                  Si el caso necesita contexto, aqui empieza la conversacion.
                </h2>
                <p className="mt-5 max-w-[32rem] text-[1rem] leading-7 text-black/58">
                  Hongares trabaja con propietarios, familias y entidades que
                  necesitan una gestion clara, local y bien acompanada.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a href={mailHref} className="button-primary">
                    Escribir ahora
                  </a>
                  <a href={phoneHref} className="button-outline">
                    Llamar
                  </a>
                </div>
              </div>

              <div className="grid gap-4">
                {contactCards.map((item, index) => {
                  const Icon = item.icon

                  return (
                    <Reveal key={item.label} delay={0.08 * index}>
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="contact-card"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3ff] text-[#4b6bff]">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/38">
                            {item.label}
                          </p>
                          <p className="mt-2 text-[1.05rem] font-semibold leading-6 tracking-[-0.03em] text-[#111217]">
                            {item.value}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-black/54">
                            {item.detail}
                          </p>
                        </div>
                        <div className="contact-card-arrow">
                          <ArrowUpRight className="h-4 w-4" />
                        </div>
                      </a>
                    </Reveal>
                  )
                })}
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-black/[0.06] bg-[#fafbfe] pb-8 pt-10">
        <div className="page-shell">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.7fr_0.9fr]">
            <div className="max-w-[24rem]">
              <div>
                <BrandMark
                  className="h-[52px] w-[188px]"
                  imageClassName="scale-[1.92]"
                />
                <p className="mt-3 text-sm text-black/46">
                  Vivienda, migracion y confianza en Valencia.
                </p>
              </div>
              <p className="mt-5 text-sm leading-7 text-black/56">
                Una agencia que acompana operaciones de alquiler donde hace falta
                traducir requisitos, ordenar expectativas y sostener confianza.
              </p>
            </div>

            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/38">
                Navegacion
              </p>
              <div className="mt-4 grid gap-3 text-sm text-black/58">
                {navigation.map((item) => (
                  <a key={item.label} href={item.href} className="footer-link">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-black/38">
                Contacto
              </p>
              <div className="mt-4 grid gap-3 text-sm text-black/58">
                <a href={phoneHref} className="footer-link">
                  605 592 599
                </a>
                <a href={mailHref} className="footer-link">
                  francisco@hongares.com
                </a>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="footer-link inline-flex items-center gap-2"
                >
                  Valencia
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-black/[0.06] pt-6 text-sm text-black/44 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Hongares. Todos los derechos reservados.</p>
            <p>Gestion de alquiler con sensibilidad humana y criterio local.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
