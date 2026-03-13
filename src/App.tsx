import { useState } from 'react'
import type { ChangeEvent, FormEvent, ReactNode } from 'react'
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
  Building2,
  Handshake,
  House,
  Mail,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Sparkles,
  Users2,
  X,
} from 'lucide-react'

const navigation = [
  { label: 'Manifiesto', href: '#manifiesto' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Metodo', href: '#metodo' },
  { label: 'Impacto', href: '#impacto' },
  { label: 'Contacto', href: '#contacto' },
]

const heroNotes = [
  {
    title: 'Propietarios',
    text: 'Rigor, filtrado y acompaniamiento para alquilar con mas tranquilidad.',
  },
  {
    title: 'Familias migrantes',
    text: 'Una gestion cercana para desbloquear acceso real a vivienda en Valencia.',
  },
  {
    title: 'ONGs y programas',
    text: 'Un interlocutor profesional para procesos de acogida con tiempos y contexto complejos.',
  },
]

const audienceCards = [
  {
    title: 'Para quien alquila su inmueble',
    text: 'Protegemos la confianza del propietario con seleccion, mediacion y seguimiento continuo.',
  },
  {
    title: 'Para quien necesita rehacer hogar',
    text: 'Traducimos requisitos, contexto y documentacion en un proceso mas claro y acompanado.',
  },
  {
    title: 'Para entidades y colaboradores',
    text: 'Coordinamos necesidades habitacionales con una operativa sobria, humana y ordenada.',
  },
]

const manifestoFlow = [
  {
    number: '01',
    title: 'Diagnostico del contexto',
    text: 'Entendemos necesidades, riesgos y urgencias antes de plantear una operacion.',
  },
  {
    number: '02',
    title: 'Traduccion entre partes',
    text: 'Convertimos requisitos complejos en una conversacion clara entre propietario, familia y entidad.',
  },
  {
    number: '03',
    title: 'Matching con criterio',
    text: 'Buscamos afinidad real entre vivienda, perfil y condiciones del proceso.',
  },
  {
    number: '04',
    title: 'Mediacion y acompanamiento',
    text: 'Reducimos fricciones y damos seguimiento humano durante toda la relacion.',
  },
  {
    number: '05',
    title: 'Una categoria propia',
    text: 'Sensibilidad social y metodo inmobiliario conviven en una misma propuesta premium.',
  },
]

const serviceCards = [
  {
    number: '01',
    title: 'Gestion premium para propietarios',
    description:
      'Hongares convierte una operacion sensible en un proceso claro: validacion del perfil, encaje real y relacion cuidada con el inquilino.',
    features: [
      'Evaluacion del inmueble y del escenario de alquiler',
      'Filtrado y presentacion de candidatos con criterio',
      'Acompanamiento cercano durante toda la relacion',
    ],
    icon: House,
  },
  {
    number: '02',
    title: 'Busqueda y acompaniamiento para inquilinos',
    description:
      'Para personas migrantes y familias en proceso de arraigo, la propuesta se centra en traducir barreras del mercado en pasos concretos.',
    features: [
      'Orientacion sobre requisitos y documentacion',
      'Intermediacion respetuosa con propietarios y agencias',
      'Apoyo en la lectura del proceso de alquiler',
    ],
    icon: Users2,
  },
  {
    number: '03',
    title: 'Interfaz fiable para ONGs y programas de acogida',
    description:
      'La marca se posiciona como socio operativo para organizaciones que necesitan vivienda digna, velocidad de respuesta y sensibilidad cultural.',
    features: [
      'Coordinacion de casos y necesidades habitacionales',
      'Lenguaje comun entre entidad, familia y propietario',
      'Capacidad de seguimiento mas alla de la firma',
    ],
    icon: Building2,
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Escucha y diagnostico',
    text: 'Cada proceso empieza entendiendo riesgos, expectativas, urgencias y contexto humano antes de mover una sola ficha.',
  },
  {
    number: '02',
    title: 'Matching con criterio',
    text: 'No se trata de encajar perfiles por descarte, sino de construir afinidad real entre vivienda, propietario y situacion del caso.',
  },
  {
    number: '03',
    title: 'Mediacion clara',
    text: 'Hongares ordena la conversacion, reduce fricciones y convierte dudas complejas en decisiones comprensibles para todas las partes.',
  },
  {
    number: '04',
    title: 'Seguimiento humano',
    text: 'El valor no termina en la llave: la relacion se sostiene con presencia, capacidad de respuesta y sensibilidad intercultural.',
  },
]

const principles = [
  {
    title: 'Confianza',
    text: 'La marca habla desde la transparencia y la cercania. No promete lujo inmobiliario; promete criterio, honestidad y calma en un proceso delicado.',
    accent: 'from-brand-clay/25 via-transparent to-transparent',
  },
  {
    title: 'Profesionalidad',
    text: 'El diferencial no es solo social. Tambien hay una voluntad clara de operar con metodo, seleccion y estructura frente a un mercado exigente.',
    accent: 'from-brand-gold/25 via-transparent to-transparent',
  },
  {
    title: 'Impacto social',
    text: 'Hongares se presenta como un negocio con causa: una empresa que crea acceso a vivienda y favorece integracion, estabilidad y arraigo.',
    accent: 'from-brand-sage/25 via-transparent to-transparent',
  },
]

const contactItems = [
  {
    label: 'Telefono',
    value: '605 592 599',
    href: 'tel:+34605592599',
    icon: Phone,
  },
  {
    label: 'Correo',
    value: 'francisco@hongares.com',
    href: 'mailto:francisco@hongares.com',
    icon: Mail,
  },
  {
    label: 'Direccion',
    value: 'Calle Santa Cruz de Tenerife 7, Valencia',
    href: 'https://maps.google.com/?q=Calle+Santa+Cruz+de+Tenerife+7,+Valencia',
    icon: MapPin,
  },
]

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: 'blur(12px)',
  },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
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
  light?: boolean
}

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function Reveal({ children, className, delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      custom={delay}
      variants={revealVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function BrandMark({ light = false }: BrandMarkProps) {
  return (
    <div
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-sm',
        light
          ? 'border-white/[0.15] bg-white/10 text-brand-ivory'
          : 'border-brand-ink/10 bg-white text-brand-ink',
      )}
    >
      <svg viewBox="0 0 64 64" className="h-7 w-7 fill-none stroke-current">
        <path
          d="M16 28L32 16l16 12v18H16V28Z"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M24 28v18M40 28v18" strokeWidth="1.6" strokeLinecap="round" />
        <path
          d="M23 23h18M21 47h22"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, 140])
  const heroScale = useTransform(scrollYProgress, [0, 0.22], [1, 1.14])
  const heroGlow = useTransform(scrollYProgress, [0, 0.22], [0.85, 1.1])

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const params = new URLSearchParams({
      subject: `Consulta web Hongares - ${formData.name || 'Nuevo contacto'}`,
      body: `Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`,
    })

    window.location.href = `mailto:francisco@hongares.com?${params
      .toString()
      .replace(/\+/g, '%20')}`
  }

  return (
    <div className="relative min-h-screen overflow-x-clip bg-brand-ivory text-brand-ink">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="grain absolute inset-0 opacity-40" />
        <div className="absolute left-[-12rem] top-[12rem] h-[28rem] w-[28rem] rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-brand-clay/[0.15] blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-brand-ink/[0.72] px-4 py-3 text-brand-ivory shadow-panel backdrop-blur-xl">
            <a
              href="#inicio"
              className="group flex items-center gap-3"
              onClick={() => setMenuOpen(false)}
            >
              <BrandMark light />
              <div className="hidden sm:block">
                <p className="font-display text-2xl leading-none tracking-[0.12em]">
                  Hongares
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-brand-ivory/[0.55]">
                  Valencia
                </p>
              </div>
            </a>

            <nav className="hidden items-center gap-6 lg:flex">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm tracking-[0.14em] text-brand-ivory/[0.68] transition duration-500 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden lg:block">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-ink transition duration-500 hover:-translate-y-0.5 hover:bg-brand-ivory"
              >
                Hablar con Hongares
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.12] bg-white/5 text-brand-ivory transition duration-300 hover:bg-white/10 lg:hidden"
              aria-label={menuOpen ? 'Cerrar menu' : 'Abrir menu'}
              onClick={() => setMenuOpen((current) => !current)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 overflow-hidden rounded-[2rem] border border-white/10 bg-brand-ink/90 p-4 text-brand-ivory shadow-panel backdrop-blur-xl lg:hidden"
              >
                <div className="grid gap-2">
                  {navigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="rounded-2xl border border-white/[0.08] px-4 py-3 text-sm tracking-[0.14em] text-brand-ivory/75 transition duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                  <a
                    href="#contacto"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-gold px-4 py-3 text-sm font-semibold text-brand-ink"
                    onClick={() => setMenuOpen(false)}
                  >
                    Contactar
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </header>

      <main className="relative z-10">
        <section
          id="inicio"
          className="relative isolate min-h-[100svh] overflow-hidden bg-[linear-gradient(180deg,#d8d0c5_0%,#cfc6bb_100%)]"
        >
          <motion.div
            style={{ y: heroY, scale: heroScale }}
            className="absolute left-[-10rem] top-12 h-[34rem] w-[34rem] rounded-full bg-brand-paper/70 blur-[120px]"
          />
          <motion.div
            style={{ opacity: heroGlow }}
            className="absolute inset-x-0 top-0 h-[52rem] bg-[radial-gradient(circle_at_18%_18%,rgba(227,190,100,0.28),transparent_24%),radial-gradient(circle_at_85%_14%,rgba(11,18,20,0.18),transparent_20%),radial-gradient(circle_at_62%_72%,rgba(170,104,63,0.16),transparent_28%)]"
          />

          <div className="relative">
            <div className="hero-surface relative min-h-[100svh] overflow-hidden rounded-none border-x-0 border-t-0 px-4 pb-8 pt-28 sm:px-6 lg:px-8 lg:pt-32">
              <div className="absolute right-0 top-0 h-28 w-36 rounded-bl-[3rem] bg-brand-ink sm:h-36 sm:w-48" />
              <div className="absolute left-0 top-16 h-[26rem] w-[26rem] rounded-full bg-white/[0.58] blur-[90px]" />

              <div className="relative mx-auto flex min-h-[calc(100svh-7rem)] max-w-7xl flex-col">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-ink/[0.08] pb-5">
                  <div className="flex items-center gap-4">
                    <BrandMark />
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-brand-ink/[0.42]">
                        Hongares
                      </p>
                      <p className="font-display text-3xl leading-none">
                        Homes with context
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="hero-meta-chip">Social real estate</span>
                    <span className="hero-meta-chip">Valencia</span>
                  </div>
                </div>

                <div className="grid flex-1 gap-10 py-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
                  <Reveal className="max-w-3xl">
                    <span className="eyebrow border-brand-ink/[0.08] bg-brand-paper/80 text-brand-clay">
                      Valencia / Gestion de alquiler especializada
                    </span>
                    <h1 className="mt-6 text-balance font-display text-[clamp(4rem,8vw,6.6rem)] leading-[0.9] tracking-[-0.045em] text-brand-ink">
                      Alquilar con rigor. <br />
                      Habitar con dignidad.
                    </h1>
                    <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ink/[0.7] sm:text-xl">
                      Hongares conecta propietarios, familias migrantes y
                      organizaciones con una gestion sobria, humana y
                      profundamente actual para el mercado de Valencia.
                    </p>

                    <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                      <a href="#servicios" className="button-primary">
                        Explorar servicios
                        <ArrowRight className="h-4 w-4" />
                      </a>
                      <a
                        href="#manifiesto"
                        className="inline-flex items-center justify-center rounded-full border border-brand-ink/[0.12] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-brand-ink/[0.7] transition duration-500 hover:-translate-y-0.5 hover:border-brand-ink/[0.22] hover:bg-white/[0.55] hover:text-brand-ink"
                      >
                        Descubrir la propuesta
                      </a>
                    </div>
                  </Reveal>

                  <Reveal delay={0.15} className="relative">
                    <div className="relative mx-auto max-w-[40rem] pb-10 lg:ml-auto lg:pb-0">
                      <motion.div
                        style={{ y: heroY }}
                        className="hero-visual-main relative h-[24rem] overflow-hidden rounded-[2.5rem] p-6 shadow-panel sm:h-[29rem] sm:p-8"
                      >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(227,190,100,0.22),transparent_18%),radial-gradient(circle_at_76%_22%,rgba(255,255,255,0.08),transparent_18%),linear-gradient(135deg,#0f1719_0%,#192429_46%,#223238_100%)]" />
                        <div className="absolute -left-14 bottom-[-7rem] h-60 w-60 rounded-full border border-white/[0.08]" />
                        <div className="absolute left-8 top-8 h-40 w-[48%] rounded-[2rem] border border-white/[0.1] bg-white/[0.05] backdrop-blur-sm sm:h-48" />
                        <div className="absolute right-12 top-12 h-28 w-28 rounded-[1.8rem] border border-brand-gold/[0.28] bg-brand-gold/[0.08]" />
                        <div className="absolute left-[42%] top-[34%] h-32 w-32 rounded-full border border-white/[0.08]" />

                        <div className="relative flex h-full flex-col justify-between">
                          <div className="flex flex-wrap gap-2">
                            {heroNotes.map((note) => (
                              <span
                                key={note.title}
                                className="rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-brand-ivory/[0.76] backdrop-blur-sm"
                              >
                                {note.title}
                              </span>
                            ))}
                          </div>

                          <div className="max-w-sm">
                            <p className="text-xs uppercase tracking-[0.3em] text-brand-ivory/[0.46]">
                              Posicionamiento
                            </p>
                            <p className="mt-4 font-display text-4xl leading-[0.96] text-brand-ivory sm:text-[3.2rem]">
                              Una agencia que entiende vivienda, migracion y
                              confianza en la misma conversacion.
                            </p>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 30, y: 16 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.85,
                          delay: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute right-0 top-8 hidden w-44 rounded-[2rem] border border-brand-ink/[0.08] bg-white/[0.74] p-5 shadow-elevated backdrop-blur-sm sm:block"
                      >
                        <p className="text-xs uppercase tracking-[0.28em] text-brand-ink/[0.42]">
                          Tono de marca
                        </p>
                        <p className="mt-4 text-sm leading-6 text-brand-ink/[0.72]">
                          Cercana, creible y elegante sin caer en la estetica
                          fria de una inmobiliaria convencional.
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -18, y: 24 }}
                        whileInView={{ opacity: 1, x: 0, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{
                          duration: 0.9,
                          delay: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute -bottom-2 right-6 max-w-[16rem] rounded-[2rem] bg-brand-gold p-5 text-brand-ink shadow-elevated sm:-bottom-10 sm:right-8"
                      >
                        <p className="text-xs uppercase tracking-[0.28em] text-brand-ink/[0.55]">
                          Diferencial
                        </p>
                        <p className="mt-4 font-display text-3xl leading-[0.95]">
                          Primera agencia en Valencia
                        </p>
                        <p className="mt-3 text-sm leading-6 text-brand-ink/[0.76]">
                          Gestion de alquiler para inmigrantes y ONGs.
                        </p>
                      </motion.div>
                    </div>
                  </Reveal>
                </div>

                <div className="mt-10 grid gap-4 border-t border-brand-ink/[0.08] pt-6 xl:grid-cols-[0.9fr_1.1fr]">
                  <Reveal className="rounded-[2rem] border border-brand-ink/[0.08] bg-white/[0.58] p-6 shadow-soft backdrop-blur-sm">
                    <p className="text-xs uppercase tracking-[0.28em] text-brand-ink/[0.42]">
                      Desde la experiencia vivida
                    </p>
                    <p className="mt-4 max-w-md font-display text-4xl leading-[0.95] text-brand-ink">
                      Una marca nacida para humanizar el acceso a hogar.
                    </p>
                  </Reveal>

                  <div className="grid gap-4 md:grid-cols-3">
                    {heroNotes.map((note, index) => {
                      const Icon =
                        index === 0 ? House : index === 1 ? Users2 : Building2

                      return (
                        <Reveal
                          key={note.title}
                          delay={0.08 * index}
                          className="rounded-[1.9rem] border border-brand-ink/[0.08] bg-white/[0.58] p-5 shadow-soft backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-brand-ink/[0.14] hover:shadow-elevated"
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-brand-ink/[0.08] bg-brand-paper">
                            <Icon className="h-5 w-5 text-brand-clay" />
                          </div>
                          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-brand-ink">
                            {note.title}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-brand-ink/[0.68]">
                            {note.text}
                          </p>
                        </Reveal>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="manifiesto"
          className="relative overflow-hidden bg-[linear-gradient(180deg,#f1f3f6_0%,#edf0f4_100%)] py-24 sm:py-28"
        >
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.8),transparent_55%)]" />

          <div className="section-shell relative">
            <Reveal className="mx-auto max-w-5xl text-center">
              <span className="eyebrow border-brand-ink/[0.08] bg-white/75 text-brand-clay">
                Manifiesto
              </span>
              <h2 className="mt-6 text-balance font-display text-[clamp(3.4rem,7vw,6rem)] leading-[0.94] tracking-[-0.05em] text-brand-ink">
                Hongares no vende solo alquiler. Disenia confianza entre partes
                que rara vez hablan el mismo lenguaje.
              </h2>
            </Reveal>

            <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-[1fr_1.45fr_0.9fr]">
              {audienceCards.map((card, index) => {
                const Icon =
                  index === 0 ? House : index === 1 ? Users2 : Building2

                return (
                  <Reveal
                    key={card.title}
                    delay={0.08 * index}
                    className="manifesto-mini-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-paper shadow-soft">
                        <Icon className="h-5 w-5 text-brand-clay" />
                      </div>
                      <div>
                        <p className="text-xl font-semibold leading-tight text-brand-ink">
                          {card.title}
                        </p>
                        <p className="mt-3 text-sm leading-6 text-brand-ink/[0.62]">
                          {card.text}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <div className="mt-20 grid gap-12 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
              <Reveal className="manifesto-stage">
                <div className="absolute inset-5 rounded-[2.2rem] bg-[linear-gradient(135deg,rgba(234,220,245,0.92),rgba(214,231,242,0.92),rgba(217,242,229,0.9))]" />
                <div className="absolute left-8 top-1/2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-[1.6rem] bg-white/80 shadow-soft backdrop-blur-sm">
                  <Sparkles className="h-5 w-5 text-brand-clay" />
                </div>
                <div className="absolute bottom-14 left-10 rounded-[1.4rem] bg-white/82 px-5 py-4 shadow-soft backdrop-blur-sm">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-ink/[0.38]">
                    Insight
                  </p>
                  <p className="mt-2 text-xl font-semibold text-brand-ink">
                    Un hogar seguro
                  </p>
                </div>
                <div className="absolute right-10 top-14 rounded-[1.4rem] bg-white/82 px-5 py-4 shadow-soft backdrop-blur-sm">
                  <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-ink/[0.38]">
                    Categoria
                  </p>
                  <p className="mt-2 text-xl font-semibold text-brand-ink">
                    Social + Real estate
                  </p>
                </div>

                <div className="relative mx-auto max-w-[28rem] rounded-[2.4rem] border border-white/60 bg-white/85 p-5 shadow-elevated backdrop-blur-sm sm:p-6">
                  <div className="flex items-center justify-between border-b border-brand-ink/[0.08] pb-4">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-ink/[0.4]">
                        Hongares framework
                      </p>
                      <p className="mt-2 text-xl font-semibold text-brand-ink">
                        Una inmobiliaria de impacto social con modales premium.
                      </p>
                    </div>
                    <Handshake className="h-6 w-6 text-brand-clay" />
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-[0.7fr_1.3fr]">
                    <div className="rounded-[1.5rem] bg-brand-paper p-4">
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-ink/[0.35]">
                        Punto de partida
                      </p>
                      <div className="mt-4 space-y-2">
                        <div className="h-2 rounded-full bg-brand-gold/70" />
                        <div className="h-2 w-4/5 rounded-full bg-brand-ink/[0.15]" />
                        <div className="h-2 w-3/5 rounded-full bg-brand-ink/[0.1]" />
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <div className="rounded-[1.4rem] border border-brand-ink/[0.08] bg-white p-4">
                        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-ink/[0.35]">
                          Insight central
                        </p>
                        <p className="mt-3 text-sm leading-6 text-brand-ink/[0.72]">
                          Hay familias y entidades que no encajan en los filtros
                          del mercado tradicional aunque necesitan exactamente lo
                          mismo: hogar, estabilidad y confianza.
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-[1.2rem] bg-brand-paper p-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-ink/[0.35]">
                            Sensibilidad social
                          </p>
                        </div>
                        <div className="rounded-[1.2rem] bg-brand-paper p-4">
                          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-ink/[0.35]">
                            Metodo inmobiliario
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="max-w-2xl">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.32em] text-brand-clay">
                  Como funciona el manifiesto
                </p>
                <h3 className="mt-5 text-balance font-display text-[clamp(3rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.05em] text-brand-ink">
                  Sensibilidad social y metodo inmobiliario en la misma
                  conversacion.
                </h3>

                <div className="mt-8 space-y-5">
                  {manifestoFlow.map((item, index) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: 24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.08 * index,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="flex gap-4"
                    >
                      <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-gold/30 text-sm font-semibold text-brand-ink">
                        {item.number}
                      </div>
                      <div className="border-b border-brand-ink/[0.08] pb-5 last:border-b-0 last:pb-0">
                        <p className="text-2xl font-semibold leading-tight text-brand-ink">
                          {item.title}
                        </p>
                        <p className="mt-2 max-w-xl text-base leading-7 text-brand-ink/[0.66]">
                          {item.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="servicios" className="bg-brand-ink py-24 text-brand-ivory sm:py-28">
          <div className="section-shell grid gap-12 xl:grid-cols-[0.78fr_1.22fr]">
            <Reveal className="xl:sticky xl:top-28 xl:h-fit">
              <span className="eyebrow">Servicios</span>
              <h2 className="mt-6 max-w-xl text-balance font-display text-[clamp(3rem,6vw,5rem)] leading-[0.92] tracking-[-0.04em] text-brand-ivory">
                Tres frentes. Una misma promesa: orden, criterio y hogar.
              </h2>
              <p className="mt-7 max-w-md text-base leading-7 text-brand-ivory/[0.68]">
                La nueva landing organiza mejor la oferta para que cada audiencia
                entienda rapido donde esta el valor. Menos ruido, mas claridad
                comercial.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.24em] text-brand-ivory/[0.62]">
                Confianza / Profesionalidad / Impacto
              </div>
            </Reveal>

            <div className="space-y-5">
              {serviceCards.map((card, index) => {
                const Icon = card.icon

                return (
                  <Reveal
                    key={card.title}
                    delay={0.08 * index}
                    className={cn(
                      'service-card group',
                      index === 1 ? 'xl:translate-x-10' : '',
                      index === 2 ? 'xl:-translate-x-4' : '',
                    )}
                  >
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-4">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                            <Icon className="h-6 w-6 text-brand-gold" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-brand-ivory/40">
                              {card.number}
                            </p>
                            <h3 className="mt-2 font-display text-4xl leading-none text-brand-ivory">
                              {card.title}
                            </h3>
                          </div>
                        </div>

                        <p className="mt-6 max-w-2xl text-base leading-7 text-brand-ivory/70">
                          {card.description}
                        </p>
                      </div>

                      <a
                        href="#contacto"
                        className="inline-flex items-center gap-2 self-start rounded-full border border-white/[0.12] px-4 py-2 text-sm uppercase tracking-[0.18em] text-brand-ivory/[0.72] transition duration-500 group-hover:border-brand-gold/40 group-hover:text-brand-gold"
                      >
                        Hablar del caso
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-3">
                      {card.features.map((feature) => (
                        <div
                          key={feature}
                          className="rounded-[1.5rem] border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-sm leading-6 text-brand-ivory/[0.68] transition duration-500 group-hover:border-white/[0.16] group-hover:bg-white/[0.05]"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>

        <section id="metodo" className="relative py-24 sm:py-28">
          <div className="section-shell grid gap-12 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
            <Reveal className="overflow-hidden rounded-[2.5rem] border border-brand-ink/[0.08] bg-brand-paper p-8 shadow-elevated sm:p-10">
              <span className="eyebrow text-brand-clay">Metodo</span>
              <h2 className="mt-6 text-balance font-display text-[clamp(3rem,5.5vw,4.8rem)] leading-[0.92] tracking-[-0.04em]">
                Una metodologia sobria para un contexto emocionalmente
                complejo.
              </h2>
              <p className="mt-6 max-w-lg text-base leading-7 text-brand-ink/[0.68]">
                El lujo aqui no es ornamental. Se expresa en claridad,
                estructura y control de cada punto de contacto. Esa es la
                sensacion que debia respirar el sitio.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-brand-ink/[0.08] bg-white/70 p-5">
                  <ShieldCheck className="h-6 w-6 text-brand-clay" />
                  <p className="mt-4 text-xs uppercase tracking-[0.28em] text-brand-ink/40">
                    Tono institucional
                  </p>
                  <p className="mt-3 text-sm leading-6 text-brand-ink/[0.68]">
                    Mas creible y mas sofisticado, sin perder el pulso humano
                    que sostiene la marca.
                  </p>
                </div>
                <div className="rounded-[1.8rem] border border-brand-ink/[0.08] bg-brand-ink p-5 text-brand-ivory">
                  <Sparkles className="h-6 w-6 text-brand-gold" />
                  <p className="mt-4 text-xs uppercase tracking-[0.28em] text-brand-ivory/40">
                    Motion
                  </p>
                  <p className="mt-3 text-sm leading-6 text-brand-ivory/[0.68]">
                    Revelaciones suaves, parallax leve y hover states refinados
                    para un acabado mucho mas premium.
                  </p>
                </div>
              </div>
            </Reveal>

            <div className="space-y-4">
              {processSteps.map((step, index) => (
                <Reveal
                  key={step.title}
                  delay={0.08 * index}
                  className={cn(
                    'group rounded-[2rem] border border-brand-ink/[0.08] bg-white/[0.72] p-6 shadow-soft backdrop-blur-sm transition duration-500 hover:-translate-y-1 hover:border-brand-ink/[0.14] hover:shadow-elevated sm:p-8',
                    index % 2 === 1 ? 'md:ml-12' : '',
                  )}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.28em] text-brand-clay">
                        Paso {step.number}
                      </p>
                      <h3 className="mt-3 font-display text-4xl leading-none">
                        {step.title}
                      </h3>
                    </div>
                    <div className="h-px w-full bg-brand-ink/10 md:mt-8 md:max-w-[8rem]" />
                  </div>
                  <p className="mt-6 max-w-2xl text-base leading-7 text-brand-ink/[0.68]">
                    {step.text}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="impacto"
          className="relative overflow-hidden bg-[linear-gradient(180deg,#e7d1a2_0%,#e5c679_56%,#d6b466_100%)] py-24 sm:py-28"
        >
          <div className="section-shell relative">
            <Reveal className="max-w-3xl">
              <span className="eyebrow text-brand-ink/[0.65]">Impacto</span>
              <h2 className="mt-6 text-balance font-display text-[clamp(3rem,6vw,5.1rem)] leading-[0.92] tracking-[-0.04em]">
                Una marca que puede verse premium sin renunciar a su causa.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-7 text-brand-ink/70">
                Aqui el valor no se mide en exceso visual, sino en como el
                diseno hace mas creibles sus principios. La narrativa se apoya
                en tres pilares que ya existian en Hongares y ahora quedan mucho
                mejor articulados.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 lg:grid-cols-12">
              {principles.map((principle, index) => (
                <Reveal
                  key={principle.title}
                  delay={0.1 * index}
                  className={cn(
                    'relative overflow-hidden rounded-[2.3rem] border border-brand-ink/[0.08] bg-brand-paper p-7 shadow-elevated',
                    index === 0 ? 'lg:col-span-4' : '',
                    index === 1 ? 'lg:col-span-5 lg:translate-y-8' : '',
                    index === 2 ? 'lg:col-span-3' : '',
                  )}
                >
                  <div
                    className={cn(
                      'absolute inset-0 bg-gradient-to-br opacity-100',
                      principle.accent,
                    )}
                  />
                  <div className="relative">
                    <p className="text-xs uppercase tracking-[0.28em] text-brand-ink/[0.42]">
                      Valor central
                    </p>
                    <h3 className="mt-4 font-display text-4xl leading-none">
                      {principle.title}
                    </h3>
                    <p className="mt-5 text-base leading-7 text-brand-ink/[0.72]">
                      {principle.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-brand-ink py-24 text-brand-ivory sm:py-28">
          <div className="section-shell">
            <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
              <Reveal className="rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-8 shadow-panel sm:p-10">
                <span className="eyebrow">Contacto</span>
                <h2 className="mt-6 max-w-lg text-balance font-display text-[clamp(3rem,6vw,4.9rem)] leading-[0.92] tracking-[-0.04em] text-brand-ivory">
                  Una presencia premium tambien se siente en como invita a
                  conversar.
                </h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-brand-ivory/[0.68]">
                  Si el caso requiere alquiler, acompanamiento o colaboracion con
                  una entidad, el sitio ahora puede cerrar la experiencia con un
                  CTA mucho mas elegante y directo.
                </p>

                <div className="mt-10 space-y-4">
                  {contactItems.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="group flex items-start gap-4 rounded-[1.7rem] border border-white/10 bg-white/[0.03] px-5 py-5 transition duration-500 hover:-translate-y-0.5 hover:border-white/[0.18] hover:bg-white/[0.06]"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-brand-gold">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs uppercase tracking-[0.26em] text-brand-ivory/[0.42]">
                            {item.label}
                          </p>
                          <p className="mt-2 text-base leading-7 text-brand-ivory/[0.78]">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    )
                  })}
                </div>
              </Reveal>

              <Reveal delay={0.14} className="contact-panel rounded-[2.5rem] p-8 shadow-panel sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-brand-ink/[0.42]">
                      Formulario de contacto
                    </p>
                    <h3 className="mt-3 font-display text-4xl leading-none text-brand-ink">
                      Cuentanos el contexto.
                    </h3>
                  </div>
                  <div className="hidden rounded-full border border-brand-ink/10 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.28em] text-brand-ink/[0.48] sm:block">
                    Abre tu correo
                  </div>
                </div>

                <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="grid gap-2">
                      <span className="text-sm uppercase tracking-[0.2em] text-brand-ink/[0.48]">
                        Nombre
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        required
                        className="input-field"
                        placeholder="Tu nombre"
                      />
                    </label>

                    <label className="grid gap-2">
                      <span className="text-sm uppercase tracking-[0.2em] text-brand-ink/[0.48]">
                        Email
                      </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        className="input-field"
                        placeholder="tu@email.com"
                      />
                    </label>
                  </div>

                  <label className="grid gap-2">
                    <span className="text-sm uppercase tracking-[0.2em] text-brand-ink/[0.48]">
                      Mensaje
                    </span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={7}
                      className="input-field min-h-[14rem] resize-none"
                      placeholder="Cuentanos si necesitas alquilar, ofrecer una vivienda o coordinar un caso con una entidad."
                    />
                  </label>

                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-sm text-sm leading-6 text-brand-ink/[0.55]">
                      Al enviar, se abrira tu cliente de correo con el mensaje
                      preparado para Hongares.
                    </p>

                    <button type="submit" className="button-ink">
                      Enviar consulta
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-brand-ink/[0.08] bg-brand-paper/80">
        <div className="section-shell flex flex-col gap-6 py-8 text-sm text-brand-ink/[0.58] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <BrandMark />
            <p>Hongares / Gestion de alquiler con mirada humana para Valencia.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="transition duration-300 hover:text-brand-ink"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
