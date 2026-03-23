"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { FormEvent, useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  duration: number;
  delay: number;
};

const skills = [
  "React.js",
  "Next.js",
  "TypeScript",
  "Frontend Development",
  "Responsive Web Design",
  "API Integration",
  "UI Animation",
  "Modern Web Interfaces",
  "Performance Optimization",
  "Creative Problem Solving",
  "Portfolio & Business Websites",
  "Interactive Experiences",
];

const techStack = [
  { name: "React", x: "12%", y: "18%" },
  { name: "Next.js", x: "28%", y: "8%" },
  { name: "TypeScript", x: "48%", y: "14%" },
  { name: "Tailwind", x: "68%", y: "10%" },
  { name: "Framer Motion", x: "82%", y: "20%" },
  { name: "JavaScript", x: "10%", y: "50%" },
  { name: "HTML5", x: "22%", y: "72%" },
  { name: "CSS3", x: "42%", y: "80%" },
  { name: "Node.js", x: "62%", y: "76%" },
  { name: "GitHub", x: "84%", y: "62%" },
  { name: "REST APIs", x: "72%", y: "44%" },
  { name: "Responsive UI", x: "36%", y: "42%" },
];

const projects = [
  {
    title: "Premium Portfolio Experiences",
    description:
      "Designed visually polished portfolio websites with immersive layouts, animated storytelling, and strong personal branding.",
    tag: "Personal Brand",
  },
  {
    title: "Business Landing Pages",
    description:
      "Built elegant landing pages for brands and professionals with premium structure, responsive design, and conversion-focused sections.",
    tag: "Conversion Design",
  },
  {
    title: "Interactive UI Concepts",
    description:
      "Created modern interfaces with transitions, motion feedback, layered visuals, and engaging user interactions.",
    tag: "Creative UI",
  },
  {
    title: "Custom Web Solutions",
    description:
      "Developed tailored websites that combine clean engineering, modern aesthetics, and business-focused presentation.",
    tag: "Custom Development",
  },
];

const highlights = [
  {
    title: "Modern Design Language",
    description:
      "A high-end interface inspired by premium digital products with elegant spacing, balanced typography, and refined visuals.",
  },
  {
    title: "Motion & Interaction",
    description:
      "Smooth transitions, animated reveals, magnetic hover feedback, click ripples, and cinematic section flow throughout the page.",
  },
  {
    title: "Professional Presentation",
    description:
      "Crafted to present you in a polished and credible way with strong hero messaging, clean structure, and premium branding.",
  },
];

export default function PortfolioPage() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.3 });
  const cursorY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.3 });
  const heroRotateX = useTransform(mouseY, [0, 1000], [10, -10]);
  const heroRotateY = useTransform(mouseX, [0, 1600], [-10, 10]);

  useEffect(() => {
    setIsMounted(true);
    const timer = window.setTimeout(() => setIsLoading(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${(i * 13) % 100}%`,
        top: `${(i * 19) % 100}%`,
        size: 4 + ((i * 7) % 10),
        duration: 6 + (i % 5),
        delay: i * 0.25,
      })),
    []
  );

  const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.floor(Math.random() * 1000);

    setRipples((prev) => [...prev, { id, x, y }]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 750);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("loading");
    setFormMessage("");

    try {
      await emailjs.send(
        "service_47im4yp",
        "template_30zt21h",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "M73POnQxkaJcQ2b-E"
      );

      setFormStatus("success");
      setFormMessage("Your message has been sent successfully.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setFormStatus("error");
      setFormMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#020617]"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.04, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex flex-col items-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute h-48 w-48 rounded-full border border-white/10"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                className="absolute h-64 w-64 rounded-full border border-cyan-300/10"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.9, 1.03, 0.96], opacity: 1 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-white/5 text-2xl font-semibold tracking-[0.24em] text-white shadow-[0_0_80px_rgba(255,255,255,0.08)] backdrop-blur-xl"
              >
                VK
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="mt-16 text-sm uppercase tracking-[0.45em] text-white/55"
              >
                Loading Experience
              </motion.p>
              <div className="mt-6 h-[2px] w-60 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full w-1/2 bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative min-h-screen overflow-hidden bg-[#030712] text-white selection:bg-cyan-300 selection:text-black"
        onClick={createRipple}
        onMouseMove={handleMouseMove}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.14),transparent_24%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.06),transparent_30%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:70px_70px]" />

        {isMounted && (
          <motion.div
            className="pointer-events-none fixed left-0 top-0 z-50 h-44 w-44 rounded-full bg-white/10 blur-3xl"
            style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
          />
        )}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute rounded-full bg-white/25"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.15, 0.45, 0.15], scale: [1, 1.25, 1] }}
              transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
            />
          ))}
        </div>

        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              initial={{ opacity: 0.5, scale: 0 }}
              animate={{ opacity: 0, scale: 7 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="pointer-events-none absolute rounded-full bg-black"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: 110,
                height: 110,
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </AnimatePresence>

        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/20 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-semibold tracking-[0.28em] text-white/90"
            >
              VAMSHI KRISHNA
            </motion.div>

            <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
              <a href="#about" className="transition hover:text-white">
                About
              </a>
              <a href="#skills" className="transition hover:text-white">
                Skills
              </a>
              <a href="#projects" className="transition hover:text-white">
                Projects
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white transition hover:bg-white/10"
              >
                Let’s Connect
              </a>
            </nav>
          </div>
        </header>

        <main>
          <section className="relative mx-auto flex min-h-[100vh] max-w-7xl items-center px-6 py-20 lg:px-10">
            <div className="grid w-full gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="mb-6 inline-flex rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200 backdrop-blur-xl"
                >
                  Premium Software Developer Portfolio
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.1 }}
                  className="max-w-5xl text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl"
                >
                  Building modern digital experiences with premium visuals, smooth motion, and clean engineering.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.2 }}
                  className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg"
                >
                  I’m Vamshi Krishna, a software developer focused on creating polished websites and interactive web experiences. I enjoy combining modern frontend development with elegant UI design to build digital products that feel premium, professional, and memorable.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.3 }}
                  className="mt-10 flex flex-wrap gap-4"
                >
                  <a
                    href="#projects"
                    className="group relative overflow-hidden rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.03]"
                  >
                    <span className="relative z-10">Explore Work</span>
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition duration-700 group-hover:translate-x-full" />
                  </a>
                  <a
                    href="#contact"
                    className="rounded-2xl border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10"
                  >
                    Start a Conversation
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.4 }}
                  className="mt-12 grid gap-4 sm:grid-cols-3"
                >
                  {["Elegant UI", "Responsive Layouts", "Motion-Driven Design"].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/75 backdrop-blur-xl"
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                style={{ rotateX: heroRotateX, rotateY: heroRotateY, transformStyle: "preserve-3d" }}
                className="relative perspective-[1400px]"
              >
                <div className="absolute -inset-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-400/25 via-blue-500/10 to-fuchsia-500/25 blur-3xl" />

                <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-white/5 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex gap-2">
                      <span className="h-3 w-3 rounded-full bg-red-400/80" />
                      <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                      <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                      Live Preview
                    </span>
                  </div>

                  <div className="rounded-[1.6rem] border border-white/10 bg-[#071120] p-6">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-xs uppercase tracking-[0.25em] text-cyan-200/70">
                          Developer Profile
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold">Vamshi Krishna</h2>
                        <p className="mt-3 max-w-md text-sm leading-7 text-white/60">
                          Building premium portfolio websites, polished user interfaces, and modern frontend experiences with strong visual identity.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-right">
                        <p className="text-xs text-white/45">Focus</p>
                        <p className="mt-1 text-sm font-medium text-white/85">Web & UI Development</p>
                      </div>
                    </div>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                      {["Premium aesthetic", "Smooth transitions", "Strong visual hierarchy", "Clean responsive structure"].map((feature) => (
                        <motion.div
                          key={feature}
                          whileHover={{ scale: 1.02, y: -4 }}
                          className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/70"
                        >
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-cyan-300/15 bg-gradient-to-r from-cyan-400/10 to-fuchsia-500/10 p-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/45">Creative Direction</p>
                      <p className="mt-3 text-sm leading-7 text-white/75">
                        A cinematic portfolio presentation designed to feel premium, immersive, and highly professional.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          <section id="about" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7 }}
              className="grid gap-8 rounded-[2.2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl lg:grid-cols-[0.85fr_1.15fr] lg:p-12"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">About Me</p>
                <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                  A professional introduction with a premium presentation.
                </h2>
              </div>
              <div className="space-y-5 text-base leading-8 text-white/70">
                <p>
                  I am a software developer with a strong interest in creating modern, polished, and user-friendly digital experiences. My work is centered around building websites that not only function well but also leave a strong visual impression.
                </p>
                <p>
                  I enjoy translating ideas into elegant interfaces, exploring modern web technologies, and refining every detail from layout to motion. My goal is to deliver digital products that feel clean, thoughtful, and professionally crafted.
                </p>
              </div>
            </motion.div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
            <div className="grid gap-6 md:grid-cols-3">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="rounded-[1.8rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-7 shadow-2xl backdrop-blur-xl"
                >
                  <div className="mb-5 h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-300 to-fuchsia-400" />
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-4 leading-8 text-white/65">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="skills" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Skills</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Technologies & capabilities</h2>
              </div>
              <p className="max-w-xl text-sm leading-7 text-white/55">
                A curated skill stack presented in a modern premium card layout.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, y: 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group rounded-[1.6rem] border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-xl"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/50">
                      Skill
                    </span>
                    <span className="text-white/20 transition group-hover:text-cyan-200/60">✦</span>
                  </div>
                  <h3 className="text-lg font-medium text-white/85">{skill}</h3>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2.2rem] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-2xl lg:p-12"
            >
              <div className="flex flex-col gap-4 text-center">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Animated Tech Stack</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">Interactive technology orbit</h2>
                <p className="mx-auto max-w-2xl leading-8 text-white/65">
                  A motion-driven stack section that highlights the tools and technologies behind modern web experiences.
                </p>
              </div>

              <div className="relative mx-auto mt-14 flex h-[32rem] max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.14),transparent_18%),radial-gradient(circle_at_center,rgba(168,85,247,0.12),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute h-[26rem] w-[26rem] rounded-full border border-white/10"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="absolute h-[19rem] w-[19rem] rounded-full border border-cyan-200/10"
                />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  className="absolute h-[12rem] w-[12rem] rounded-full border border-fuchsia-300/10"
                />

                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-white/10 text-center text-sm font-semibold tracking-[0.2em] text-white shadow-[0_0_80px_rgba(255,255,255,0.12)] backdrop-blur-xl"
                >
                  TECH
                </motion.div>

                {techStack.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, scale: 0.7 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3 + (index % 4), repeat: Infinity, ease: "easeInOut" }}
                    className="absolute z-20"
                    style={{ left: item.x, top: item.y }}
                  >
                    <div className="rounded-full border border-white/10 bg-black/35 px-4 py-2 text-xs font-medium text-white/80 shadow-xl backdrop-blur-xl transition hover:scale-110 hover:border-cyan-200/30 hover:text-white">
                      {item.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          <section id="projects" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Projects</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Example project capabilities</h2>
            </motion.div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_24%)]" />
                  <div className="relative">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/55">
                        {project.tag}
                      </span>
                      <span className="text-white/25 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white/55">
                        ↗
                      </span>
                    </div>
                    <h3 className="text-2xl font-semibold">{project.title}</h3>
                    <p className="mt-4 leading-8 text-white/65">{project.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden rounded-[2.3rem] border border-white/10 bg-gradient-to-br from-cyan-400/10 via-white/5 to-fuchsia-500/10 p-8 shadow-2xl backdrop-blur-2xl lg:p-12"
            >
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Design Philosophy</p>
                  <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                    Premium presentation is not just about visuals. It is about experience.
                  </h2>
                </div>
                <p className="text-base leading-8 text-white/70">
                  This website is designed to feel immersive from the first second. Every layer, blur, hover state, glow, transition, and section composition works together to create a portfolio that looks premium, feels interactive, and leaves a memorable impression.
                </p>
              </div>
            </motion.div>
          </section>

          <section id="contact" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-white/5 px-8 py-14 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:px-12"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_45%)]" />
              <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Contact</p>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">Let’s create something remarkable.</h2>
                  <p className="mt-5 max-w-xl leading-8 text-white/70">
                    Open to freelance opportunities, collaborations, and modern website projects that require premium design, smooth interaction, and professional presentation.
                  </p>

                  <div className="mt-8 space-y-4 text-sm text-white/65">
                    <a href="mailto:vamshikrishna.sde@gmail.com" className="block transition hover:text-white">
                      vamshikrishna.sde@gmail.com
                    </a>
                    <a
                      href="https://www.linkedin.com/in/vamshi-krishnadev"
                      target="_blank"
                      className="block transition hover:text-white"
                    >
                      LinkedIn Profile
                    </a>
                    <a
                      href="https://github.com/vamshikrishnadve-lab"
                      target="_blank"
                      className="block transition hover:text-white"
                    >
                      GitHub Portfolio
                    </a>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="grid gap-5 rounded-[2rem] border border-white/10 bg-black/20 p-6 backdrop-blur-xl"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-white/65">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/35"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-white/65">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/35"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/35"
                      placeholder="Project discussion"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-cyan-300/35"
                      placeholder="Tell me about your project"
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="group relative overflow-hidden rounded-2xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10">
                        {formStatus === "loading" ? "Sending..." : "Send Message"}
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/10 to-transparent transition duration-700 group-hover:translate-x-full" />
                    </button>
                  </div>

                  {formMessage && (
                    <p
                      className={`text-sm ${formStatus === "success" ? "text-emerald-300" : "text-red-300"
                        }`}
                    >
                      {formMessage}
                    </p>
                  )}
                </form>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/45 lg:px-10">
          © {new Date().getFullYear()} Vamshi Krishna
          <div className="mt-4 flex items-center justify-center gap-6 text-white/60">
            <a href="https://github.com/vamshikrishnadve-lab" target="_blank" className="hover:text-white">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/vamshi-krishnadev" target="_blank" className="hover:text-white">
              LinkedIn
            </a>
            <a href="mailto:vamshikrishna.sde@gmail.com" className="hover:text-white">
              Email
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
