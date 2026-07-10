"use client"

import { ChatWidget } from "@/components/chat-widget"
import { useI18n } from "@/components/i18n-provider"
import { useTheme } from "@/components/theme-provider"
import { SplineScene } from "@/components/ui/splite"
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  ChevronDown,
  Cloud,
  Code2,
  Cpu,
  Eye,
  Globe,
  Layers,
  Menu,
  MessageSquare,
  Moon,
  Shield,
  Sparkles,
  Sun,
  Wrench,
  X,
  Zap
} from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

const BRAND = {
  name: "YYC³",
  fullName: "YanYuCloudCube",
  sloganEn: "Words Initiate Quadrants, Language Serves as Core for Future",
  email: "admin@0379.email",
  year: "2025-2026",
}

const SCENARIO_ICONS = [Bot, Brain, Layers, Shield]
const SCENARIO_GRADIENTS = [
  "from-violet-500 to-purple-600",
  "from-cyan-500 to-blue-600",
  "from-emerald-500 to-green-600",
  "from-amber-500 to-orange-600",
]

function useMousePosition() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15 })
  const springY = useSpring(y, { stiffness: 150, damping: 15 })

  useEffect(() => {
    const handler = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [x, y])

  return { x: springX, y: springY }
}

function ParallaxSection({ children, className = "", speed = 0.5 }: { children: ReactNode; className?: string; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100])
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setInView(true) }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / 2000, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = []
    const count = 60

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener("resize", resize)

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5,
        a: Math.random() * 0.5 + 0.1,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(139, 92, 246, ${p.a})`
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 * (1 - dist / 120)})`
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-[1] pointer-events-none" />
}

function TypewriterText({ text, delay = 0, speed = 50 }: { text: string; delay?: number; speed?: number }) {
  const [displayed, setDisplayed] = useState("")
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!started) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-violet-400 ml-0.5 animate-pulse align-middle" />
      )}
    </span>
  )
}

function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme()
  if (!mounted) return <div className="w-8 h-8" />
  return (
    <button onClick={toggleTheme} className="flex items-center justify-center w-8 h-8 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300" aria-label="Toggle theme">
      <motion.div initial={false} animate={{ rotate: theme === "dark" ? 0 : 180, scale: 1 }} transition={{ duration: 0.4, ease: "easeInOut" }}>
        {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </motion.div>
    </button>
  )
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 z-[100] origin-left"
      style={{ scaleX }}
    />
  )
}

function LanguageSwitcher() {
  const { locale, setLocale, supportedLocales, localeLabels } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-white/60 hover:text-white text-sm transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl py-2 min-w-[160px] z-50"
          >
            {supportedLocales.map((loc) => (
              <button
                key={loc}
                onClick={() => { setLocale(loc); setOpen(false) }}
                className={`w-full text-left px-4 py-2 text-sm transition-colors ${loc === locale ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
              >
                {localeLabels[loc]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Navbar() {
  const { t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navItems = [
    { key: "nav.architecture", hash: "架构" },
    { key: "nav.scenarios", hash: "场景" },
    { key: "nav.philosophy", hash: "理念" },
    { key: "nav.contact", hash: "联系" },
  ]

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 yyc-nav ${scrolled ? "bg-black/80 backdrop-blur-xl shadow-lg shadow-black/20" : "bg-transparent"}`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">{BRAND.name}</span>
          <span className="hidden sm:inline text-white/40 text-xs tracking-widest uppercase ml-2">{BRAND.fullName}</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a key={item.key} href={`#${item.hash}`} className="text-white/60 hover:text-white text-sm transition-colors duration-300 tracking-wide">
              {t(item.key)}
            </a>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white/80 hover:text-white" aria-label={t("nav.menu")}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a key={item.key} href={`#${item.hash}`} onClick={() => setMenuOpen(false)} className="text-white/70 hover:text-white text-base py-2">
                  {t(item.key)}
                </a>
              ))}
              <div className="pt-2 border-t border-white/10 flex items-center gap-3"><LanguageSwitcher /><ThemeToggle /></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function HeroSection() {
  const { t } = useI18n()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })
  const bgX = useTransform(springX, [0, typeof window !== "undefined" ? window.innerWidth : 1920], [-20, 20])
  const bgY = useTransform(springY, [0, typeof window !== "undefined" ? window.innerHeight : 1080], [-20, 20])

  useEffect(() => {
    const handler = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY) }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [mouseX, mouseY])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <ParticleField />
      <motion.div className="absolute inset-0 grid-background opacity-20" style={{ x: bgX, y: bgY }} />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black z-[1]" />
      <div className="absolute inset-0 z-[2]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div className="flex-1 text-center lg:text-left" initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <motion.div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-white/60 text-xs tracking-widest uppercase">{t("hero.badge")}</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-white">{t("hero.title.line1")}</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">{t("hero.title.line2")}</span>
            </h1>

            <p className="mt-6 text-white/50 text-sm md:text-base tracking-[0.3em] uppercase font-light">
              <TypewriterText text={BRAND.sloganEn} delay={800} speed={30} />
            </p>
            <p className="mt-6 text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">{t("hero.description")}</p>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <motion.a href="#场景" className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white px-8 py-3.5 rounded-full font-medium text-sm tracking-wide overflow-hidden" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <span className="relative z-10">{t("hero.cta.explore")}</span>
                <ArrowRight className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
              <motion.a href="#架构" className="inline-flex items-center gap-2 text-white/60 hover:text-white px-6 py-3.5 rounded-full border border-white/10 hover:border-white/30 text-sm tracking-wide transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Eye className="w-4 h-4" />
                <span>{t("hero.cta.architecture")}</span>
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="flex-1 w-full max-w-xl lg:max-w-none aspect-square lg:aspect-auto lg:h-[600px] relative" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}>
            <motion.div className="absolute inset-0 rounded-2xl overflow-hidden border border-white/5" style={{ rotateX: bgY, rotateY: bgX }} animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
        <ChevronDown className="w-6 h-6 text-white/30" />
      </motion.div>
    </section>
  )
}

function PhilosophyBar({ items, label, icon: Icon }: { items: string[]; label: string; icon: React.ElementType }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-white/40 text-xs tracking-widest uppercase mb-1">
        <Icon className="w-3.5 h-3.5" />
        <span>{label}</span>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((item, i) => (
          <motion.span key={item} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }} className="px-3 py-1.5 text-xs tracking-wider rounded-full bg-white/5 border border-white/10 text-white/70">
            {item}
          </motion.span>
        ))}
      </div>
    </div>
  )
}

function PhilosophySection() {
  const { t } = useI18n()
  const wuGao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wugao.${i}`))
  const wuBiao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wubiao.${i}`))
  const wuHua = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuhua.${i}`))
  const wuWei = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuwei.${i}`))

  return (
    <section id="理念" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <ParallaxSection speed={0.15}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-violet-400 text-xs tracking-[0.3em] uppercase">{t("philosophy.label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{t("philosophy.title")}</h2>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("philosophy.description")}</p>
          </motion.div>
        </ParallaxSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <PhilosophyBar items={wuGao} label={t("philosophy.wugao.label")} icon={Zap} />
          <PhilosophyBar items={wuBiao} label={t("philosophy.wubiao.label")} icon={BarChart3} />
          <PhilosophyBar items={wuHua} label={t("philosophy.wuhua.label")} icon={Layers} />
          <PhilosophyBar items={wuWei} label={t("philosophy.wuwei.label")} icon={Eye} />
        </div>

        <motion.div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
          {(["sla", "qps", "coverage", "members"] as const).map((stat) => (
            <div key={stat} className="text-center p-4">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                <AnimatedCounter target={stat === "sla" ? 99 : stat === "qps" ? 10000 : stat === "coverage" ? 80 : 8} suffix={t(`philosophy.stat.${stat}.value`).replace(/\d/g, "") || (stat === "sla" ? ".99%" : stat === "qps" ? "+" : stat === "coverage" ? "%+" : "+")} />
              </div>
              <div className="mt-2 text-white/40 text-xs tracking-wider">{t(`philosophy.stat.${stat}`)}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ScenarioSection() {
  const { t } = useI18n()

  return (
    <section id="场景" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ParallaxSection speed={0.1}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-cyan-400 text-xs tracking-[0.3em] uppercase">{t("scenario.label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{t("scenario.title")}</h2>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("scenario.description")}</p>
          </motion.div>
        </ParallaxSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[0, 1, 2, 3].map((index) => {
            const Icon = SCENARIO_ICONS[index]
            return (
              <motion.div key={index} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                <motion.div className="group relative h-full p-6 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden cursor-pointer" whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.15)" }} transition={{ duration: 0.3 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${SCENARIO_GRADIENTS[index]} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${SCENARIO_GRADIENTS[index]} mb-5`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{t(`scenario.${index}.title`)}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{t(`scenario.${index}.desc`)}</p>
                  <div className="mt-4 flex items-center gap-1 text-white/30 group-hover:text-white/60 transition-colors text-xs">
                    <span>{t("scenario.learn_more")}</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  const { t } = useI18n()
  const wuGao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wugao.${i}`))
  const wuBiao = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wubiao.${i}`))
  const wuHua = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuhua.${i}`))
  const wuWei = [0, 1, 2, 3, 4].map((i) => t(`philosophy.wuwei.${i}`))

  const layers = [
    { titleKey: "architecture.eval.title", subtitleKey: "architecture.eval.subtitle", items: wuWei, color: "from-amber-500/20 to-orange-500/20", border: "border-amber-500/20", textColor: "text-amber-400" },
    { titleKey: "architecture.transform.title", subtitleKey: "architecture.transform.subtitle", items: wuHua, color: "from-emerald-500/20 to-green-500/20", border: "border-emerald-500/20", textColor: "text-emerald-400" },
    { titleKey: "architecture.standard.title", subtitleKey: "architecture.standard.subtitle", items: wuBiao, color: "from-cyan-500/20 to-blue-500/20", border: "border-cyan-500/20", textColor: "text-cyan-400" },
    { titleKey: "architecture.arch.title", subtitleKey: "architecture.arch.subtitle", items: wuGao, color: "from-violet-500/20 to-purple-500/20", border: "border-violet-500/20", textColor: "text-violet-400" },
  ]

  return (
    <section id="架构" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950/50 to-black" />
      <div className="relative z-10 max-w-4xl mx-auto px-6">
        <ParallaxSection speed={0.1}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-emerald-400 text-xs tracking-[0.3em] uppercase">{t("architecture.label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{t("architecture.title")}</h2>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("architecture.description")}</p>
          </motion.div>
        </ParallaxSection>

        <div className="flex flex-col gap-4">
          {layers.map((layer, index) => (
            <motion.div key={layer.titleKey} initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <motion.div className={`relative p-5 md:p-6 rounded-xl border ${layer.border} bg-gradient-to-r ${layer.color} backdrop-blur-sm`} whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className={`text-xs tracking-widest uppercase ${layer.textColor} font-medium`}>{t(layer.titleKey)}</div>
                    <div className="text-white/70 text-sm font-medium mt-0.5">{t(layer.subtitleKey)}</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <span key={item} className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-white/60">{item}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const AI_FAMILY_MEMBERS = [
  { id: "meta-oracle", name: "Meta-Oracle", nameCn: "元·神谕", role: "Decision Engine", desc: "自适应决策引擎，根据上下文动态调整策略", icon: Brain, gradient: "from-violet-500 to-purple-600", stats: { reasoning: 95, planning: 90, orchestration: 88 } },
  { id: "bolero", name: "Bolero", nameCn: "博·雷洛", role: "Personalization", desc: "个性化推荐引擎，精准匹配用户偏好", icon: Sparkles, gradient: "from-pink-500 to-rose-600", stats: { accuracy: 92, speed: 88, coverage: 85 } },
  { id: "master", name: "Master", nameCn: "大·师", role: "Quality Optimizer", desc: "代码质量优化大师，持续提升工程标准", icon: Code2, gradient: "from-cyan-500 to-blue-600", stats: { quality: 96, coverage: 90, automation: 85 } },
  { id: "sentinel", name: "Sentinel", nameCn: "哨·兵", role: "Security Monitor", desc: "全程安全监控，纵深防御体系守护者", icon: Shield, gradient: "from-amber-500 to-orange-600", stats: { detection: 94, response: 91, compliance: 89 } },
  { id: "prophet", name: "Prophet", nameCn: "预·言", role: "Trend Predictor", desc: "趋势预测引擎，AI驱动的未来洞察", icon: Eye, gradient: "from-emerald-500 to-green-600", stats: { accuracy: 88, foresight: 92, adaptation: 86 } },
  { id: "max-code", name: "Max-代码", nameCn: "极·代码", role: "API Backend", desc: "50+端点API后端，全栈服务基础设施", icon: Cpu, gradient: "from-indigo-500 to-blue-600", stats: { endpoints: 50, uptime: 99, latency: 92 } },
  { id: "chuping", name: "chuping", nameCn: "触·屏", role: "Zero UI Assistant", desc: "去界面化AI助手，手势/语音/3D视觉交互", icon: MessageSquare, gradient: "from-teal-500 to-cyan-600", stats: { multimodal: 90, privacy: 95, immersion: 88 } },
  { id: "fffffff", name: "FFFFFFF", nameCn: "七合工坊", role: "4-in-1 Workstation", desc: "聊天室+协同平台+开发工具+会议中心", icon: Wrench, gradient: "from-fuchsia-500 to-pink-600", stats: { modules: 4, integration: 91, scalability: 87 } },
]

const KNOWLEDGE_ASSETS = [
  { label: "AI Skills", value: "120+", icon: Sparkles, desc: "Prompt Skills Library" },
  { label: "API Endpoints", value: "50+", icon: Cpu, desc: "Max-代码 Backend" },
  { label: "MCP Tools", value: "30+", icon: Wrench, desc: "Model Context Protocol" },
  { label: "Languages", value: "10", icon: Globe, desc: "i18n Coverage" },
]

function AIFamilySection() {
  const { t } = useI18n()

  return (
    <section id="ai-family" className="relative py-24 md:py-32 bg-black overflow-hidden yyc-section">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <ParallaxSection speed={0.1}>
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-fuchsia-400 text-xs tracking-[0.3em] uppercase">{t("family.label")}</span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{t("family.title")}</h2>
            <p className="mt-4 text-white/50 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">{t("family.description")}</p>
          </motion.div>
        </ParallaxSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {AI_FAMILY_MEMBERS.map((member, index) => {
            const Icon = member.icon
            return (
              <motion.div key={member.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.06 }}>
                <motion.div className="group relative h-full p-5 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden cursor-pointer yyc-card" whileHover={{ y: -3, borderColor: "rgba(255,255,255,0.15)" }} transition={{ duration: 0.25 }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${member.gradient}`}>
                      <Icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm leading-tight">{member.name}</div>
                      <div className="text-white/30 text-xs">{member.nameCn}</div>
                    </div>
                  </div>
                  <div className="text-white/30 text-[10px] tracking-widest uppercase mb-2">{member.role}</div>
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{member.desc}</p>
                  <div className="space-y-1.5">
                    {Object.entries(member.stats).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-2">
                        <span className="text-white/30 text-[10px] w-16 capitalize">{key}</span>
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div className={`h-full bg-gradient-to-r ${member.gradient} rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${val}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 + index * 0.06 }} />
                        </div>
                        <span className="text-white/40 text-[10px] w-7 text-right">{val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function KnowledgeSection() {
  const { t } = useI18n()

  return (
    <section className="relative py-20 bg-black overflow-hidden yyc-section">
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {KNOWLEDGE_ASSETS.map((asset, index) => {
            const Icon = asset.icon
            return (
              <motion.div key={asset.label} className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02] yyc-card" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                <Icon className="w-6 h-6 text-white/30 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">{asset.value}</div>
                <div className="mt-1 text-white/60 text-sm font-medium">{asset.label}</div>
                <div className="mt-0.5 text-white/25 text-xs">{asset.desc}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const { t } = useI18n()

  return (
    <footer id="联系" className="relative py-16 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold text-lg">{BRAND.name}</span>
            </div>
            <p className="text-white/30 text-xs tracking-[0.2em] text-center md:text-left">{t("footer.slogan.cn")}</p>
            <p className="text-white/20 text-xs tracking-wider">{t("footer.vision")}</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <a href={`mailto:${BRAND.email}`} className="text-white/40 hover:text-white/70 text-sm transition-colors">{BRAND.email}</a>
            <div className="text-white/20 text-xs tracking-wider">{t("footer.copyright")}</div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-white/10 text-xs tracking-[0.3em] uppercase">{t("footer.techstack")}</p>
        </div>
      </div>
    </footer>
  )
}

export function NewYorkerSpline() {
  const { theme } = useTheme()
  return (
    <main className="min-h-screen transition-colors duration-500" style={{ backgroundColor: "var(--yyc-bg)", color: "var(--yyc-text)" }}>
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <ScenarioSection />
      <ArchitectureSection />
      <AIFamilySection />
      <KnowledgeSection />
      <Footer />
      <ChatWidget />
    </main>
  )
}
