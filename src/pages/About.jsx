import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Brain, ShieldCheck, ArrowRight, Zap, Quote, Target, Star, Linkedin } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';
import DiagnosisCTA from '../components/diagnosis/DiagnosisCTA';
import { supabase } from '../lib/supabaseClient';

const About = () => {
    const [siteConfig, setSiteConfig] = useState({ linkedin_url: 'https://linkedin.com/in/engorilate' });

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await supabase.from('site_config').select('key, value');
                if (data) {
                    const config = {};
                    data.forEach(item => { config[item.key] = item.value || ''; });
                    setSiteConfig(prev => ({ ...prev, ...config }));
                }
            } catch (e) { console.error(e); }
        };
        fetchConfig();
    }, []);

    return (
        <div className="relative pt-64 pb-32 min-h-screen selection:bg-primary selection:text-black">
            <SEO
                title="Sobre mí | Rafael Alcalde Molina | Engorilate"
                description="Economista y Business Controller transformado en Arquitecto de Automatización. Ayudo a pequeños negocios a poner orden operativo antes de automatizar."
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* HERO SECTION / PROFILE */}
                <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 items-center mb-32 lg:mb-48">
                    <div className="lg:w-2/5 relative">
                        {/* Ambient Glow behind photo */}
                        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[120px] opacity-40 animate-pulse"></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-[3/4] max-w-[400px] mx-auto rounded-[2rem] overflow-hidden border border-white/10 shadow-3xl group"
                        >
                            <img
                                alt="Rafael Alcalde Molina"
                                className="w-full h-full object-cover object-[center_15%] grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                src="/rafael.png"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                            {/* Stats overlay */}
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl">
                                    <p className="text-[10px] uppercase tracking-widest text-primary font-bold mb-0.5">Perfil</p>
                                    <p className="text-white text-sm font-display font-bold">Economista & Controller</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Zap className="w-5 h-5 text-black" />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-3/5">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono tracking-widest uppercase">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                Economista de formación
                            </div>

                            <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] text-white tracking-tighter">
                                Engorilao por <br />
                                <span className="text-primary italic">vocación.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl italic">
                                Ayudo a poner un orden industrial donde hay caos operativo. Mi trabajo no es venderte software, sino construir el motor que te devuelva tu tiempo.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                                    <p className="text-2xl font-bold text-white mb-1">+5 años</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">En Control de Gestión</p>
                                </div>
                                <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                                    <p className="text-2xl font-bold text-white mb-1">Economista</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest">Colegiado & Especialista</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* THE MANIFESTO / APPROACH */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <h2 className="font-display text-4xl font-bold text-white mb-8 tracking-tight">
                                De dónde sale <br />
                                <span className="text-primary italic">este enfoque</span>
                            </h2>
                            <Quote className="w-12 h-12 text-primary/20 mb-6" />
                            <p className="text-gray-400 text-lg font-light leading-relaxed italic">
                                "La tecnología aplicada al desorden solo lo acelera. Primero ordenamos, luego automatizamos. No hay otro camino."
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-8 space-y-16">
                        <section className="prose prose-invert prose-2xl text-gray-300 leading-relaxed font-light">
                            <p>
                                Vengo de los números. Durante años en el mundo del control de gestión, analicé por qué las empresas perdían dinero.
                                <span className="text-white font-medium"> La respuesta nunca era falta de herramientas</span>, siempre era falta de claridad operativa.
                            </p>
                            <p className="mt-8">
                                He visto a dueños de negocios brillantes quemarse en tareas de copiar y pegar. He visto el techo de cristal de "no puedo crecer sin explotar". Por eso creé Engorilate: para aplicar lógica industrial a negocios que quieren ser libres.
                            </p>
                        </section>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {[
                                {
                                    title: "Simplicidad Radical",
                                    text: "Si se puede hacer con un papel y un lápiz, no montemos un software complejo. Menos piezas = menos roturas.",
                                    icon: Target,
                                    color: "hover:border-blue-400/40"
                                },
                                {
                                    title: "Cero Humo",
                                    text: "Hablamos claro. Tu negocio no necesita sinergias, necesita que los pedidos salgan y no se pierdan leads.",
                                    icon: ShieldCheck,
                                    color: "hover:border-primary/40"
                                },
                                {
                                    title: "Foco Exclusivo",
                                    text: "Trabajo con proyectos limitados. Necesito entender tu negocio casi tan bien como tú para automatizarlo con éxito.",
                                    icon: Brain,
                                    color: "hover:border-purple-400/40"
                                },
                                {
                                    title: "Garantía de Tiempo",
                                    text: "Si no veo claro un ahorro de al menos 5-10 horas semanales para ti, no acepto el proyecto. Así de simple.",
                                    icon: Star,
                                    color: "hover:border-green-400/40"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className={`bg-[#141414] border border-white/10 p-8 rounded-[2rem] transition-all duration-500 ${item.color} group`}
                                >
                                    <item.icon className="w-8 h-8 text-gray-500 group-hover:text-white transition-colors mb-6" />
                                    <h4 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h4>
                                    <p className="text-gray-500 text-sm leading-relaxed font-light italic">{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* MISSION SECTION */}
                <div className="mb-20 relative">
                    <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full opacity-20 -z-10"></div>
                    <div className="max-w-4xl mx-auto bg-[#141414] border border-white/15 rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden">
                        <Star className="w-10 h-10 text-primary mx-auto mb-6 animate-pulse" />
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight italic">Mi Misión</h2>
                        <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed italic">
                            "Que dejes de ser el bombero de tu propio negocio. Mi misión es que recuperes tus tardes y que tu empresa funcione por fin como un reloj."
                        </p>
                    </div>
                </div>

                {/* VALUES SECTION */}
                <div className="mb-24">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-4xl font-bold text-white tracking-tight">Mis Valores</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Honestidad Brutal",
                                text: "Si algo no va a funcionar o no tiene sentido automatizarlo, te lo diré de frente. Prefiero perder un proyecto que perder mi reputación.",
                                icon: ShieldCheck
                            },
                            {
                                title: "Claridad",
                                text: "Los números no mienten. Busco que entiendas exactamente qué pasa en tu negocio sin tecnicismos innecesarios.",
                                icon: Target
                            },
                            {
                                title: "Compromiso",
                                text: "No soy de los que 'instalan y desaparecen'. Me involucro en el resultado porque tu éxito operativo es mi mejor carta de presentación.",
                                icon: Zap
                            }
                        ].map((val, i) => (
                            <div key={i} className="bg-[#141414] border border-white/15 p-8 rounded-3xl text-center hover:border-primary/30 transition-colors">
                                <val.icon className="w-10 h-10 text-primary mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-white mb-4">{val.title}</h3>
                                <p className="text-gray-400 font-light italic text-sm leading-relaxed">{val.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <DiagnosisCTA className="mb-20" />
                {/* FINAL CTA BOX */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-white/10 rounded-[3rem] p-10 md:p-20 overflow-hidden shadow-3xl text-center"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full opacity-40"></div>
                    <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-primary/5 blur-[120px] rounded-full opacity-30"></div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-7xl text-white font-bold mb-10 tracking-tight leading-[1.05]">
                            ¿Hablamos de <br />
                            <span className="text-primary italic text-shadow-glow">tu próximo nivel?</span>
                        </h2>
                        <p className="text-xl text-gray-400 mb-12 font-light italic">
                            Si buscas una conversación honesta sobre eficiencia y resultados sin atajos mágicos, rellena este formulario y hablemos.
                        </p>


                        <div className="text-left">
                            <ContactForm
                                source="About Page"
                                className="bg-[#111] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl"
                            />
                        </div>

                        <div className="mt-10 flex flex-col items-center gap-3">
                            <span className="text-sm text-gray-500 font-medium">Rafael Alcalde Molina</span>
                            <span className="text-[10px] uppercase tracking-[4px] text-primary font-bold">Economista & Business Controller</span>
                            <a
                                href={siteConfig.linkedin_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 mt-2 px-4 py-2 rounded-full bg-[#0077B5]/10 border border-[#0077B5]/30 hover:bg-[#0077B5]/20 transition-all group"
                            >
                                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                                <span className="text-xs text-[#0077B5] font-medium group-hover:underline">Conóceme en LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
