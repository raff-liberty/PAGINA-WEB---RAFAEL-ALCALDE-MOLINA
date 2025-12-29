import React from 'react';
import { motion } from 'framer-motion';
import { History, Brain, ShieldCheck, ArrowRight } from 'lucide-react';
import BackgroundMesh from '../components/BackgroundMesh';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div className="relative pt-40 pb-16 min-h-screen">
            <SEO
                title="Sobre mí | Rafael Alcalde Molina"
                description="Economista y Business Controller. Ayudo a pequeños negocios a poner orden operativo antes de automatizar. Claridad antes que velocidad."
            />
            <BackgroundMesh />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center mb-24">
                    <div className="lg:w-1/2 order-2 lg:order-1">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
                            <div className="relative aspect-square max-w-[420px] mx-auto rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl group">
                                <img
                                    alt="Rafael Alcalde Molina"
                                    className="w-full h-full object-cover object-[center_20%] grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    src="/rafael.png"
                                />
                                <div className="absolute inset-0 border-[1px] border-white/10 rounded-full pointer-events-none"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/40 to-transparent pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 order-1 lg:order-2">
                        <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-bold leading-tight mb-6 text-white">
                            Sobre mí <br />
                            <span className="text-primary">Rafael Alcalde Molina</span>
                        </h1>
                        <div className="h-1 w-20 bg-primary mb-8"></div>
                        <h2 className="font-display text-2xl text-white font-semibold mb-6">
                            No soy una agencia. <br />Tampoco una consultora.
                        </h2>
                        <p className="text-lg text-gray-400 font-light leading-relaxed mb-6">
                            Soy una persona que ayuda a poner orden donde hay caos. Mi trabajo no consiste en venderte software, sino en darte claridad.
                        </p>
                        <div className="inline-flex gap-2 items-center text-sm font-mono text-primary/80 border border-primary/20 px-3 py-1 rounded-full bg-primary/5">
                            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                            Economista & Business Controller
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-32">
                    <div className="md:col-span-4 lg:col-span-3 hidden md:block relative">
                        <div className="sticky top-32 border-l border-white/10 pl-6 space-y-4">
                            <span className="text-xs uppercase tracking-widest text-gray-500 font-bold block mb-4">En esta página</span>
                            <a className="block text-sm text-gray-400 hover:text-primary transition-colors" href="#origen">De dónde sale este enfoque</a>
                            <a className="block text-sm text-gray-400 hover:text-primary transition-colors" href="#que-hago">Qué hago realmente</a>
                            <a className="block text-sm text-gray-400 hover:text-primary transition-colors" href="#postura">Mi postura</a>
                            <a className="block text-sm text-gray-400 hover:text-primary transition-colors" href="#valores">Antes de hacer</a>
                        </div>
                    </div>
                    <div className="md:col-span-8 lg:col-span-8 space-y-24">
                        <section className="group" id="origen">
                            <div className="flex items-center gap-4 mb-6">
                                <History className="text-primary w-8 h-8" />
                                <h3 className="text-3xl font-display font-bold text-white">De dónde sale este enfoque</h3>
                            </div>
                            <div className="prose prose-invert prose-lg text-gray-400 leading-relaxed">
                                <p>
                                    Vengo del mundo de los números y el control de gestión. Durante años, trabajé analizando por qué las empresas perdían dinero o eficiencia. ¿La respuesta casi siempre? No era falta de ventas, era <strong>desorden operativo</strong>.
                                </p>
                                <p className="mt-4">
                                    Vi a dueños de negocios brillantes ahogarse en tareas administrativas absurdas. Vi equipos quemados haciendo copy-paste en hojas de cálculo infinitas. Entendí que la tecnología, si se aplica sobre el caos, solo lo acelera. Primero hay que ordenar.
                                </p>
                            </div>
                        </section>

                        <section className="relative bg-surface-dark border border-white/5 p-8 md:p-10 rounded-xl hover:border-primary/20 transition-all duration-500" id="que-hago">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -z-10"></div>
                            <h3 className="text-2xl font-display font-bold text-white mb-6">Qué hago realmente</h3>
                            <ul className="space-y-6">
                                {[
                                    { title: "Entender:", text: "Me siento contigo a ver cómo funciona tu negocio hoy. Sin juzgar, solo observando la realidad de los datos y los flujos de trabajo." },
                                    { title: "Decidir reglas:", text: "Establecemos protocolos. 'Si pasa A, hacemos B'. Eliminamos la fatiga de decisión diaria." },
                                    { title: "Eliminar pasos:", text: "Solo cuando las reglas están claras, automatizo lo que sobra. Quito la grasa para que quede el músculo." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                                        <p className="text-gray-300">
                                            <strong>{item.title}</strong> {item.text}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section id="postura">
                            <div className="flex items-center gap-4 mb-8">
                                <Brain className="text-primary w-8 h-8" />
                                <h3 className="text-3xl font-display font-bold text-white">Por qué trabajo así</h3>
                            </div>
                            <div className="grid md:grid-cols-2 gap-8">
                                {[
                                    { title: "Simplicidad radical", text: "Odio las complicaciones innecesarias. Si se puede hacer con un papel y un lápiz, no montemos un CRM de 500€ al mes.", primary: true },
                                    { title: "Cero humo", text: "No uso palabras de moda. Hablamos claro, directo y al grano. Tu negocio no necesita 'sinergias', necesita facturar y entregar a tiempo." },
                                    { title: "Pocos clientes", text: "Trabajo con un número limitado de proyectos a la vez. Necesito entender tu negocio casi tan bien como tú, y eso requiere tiempo y foco." },
                                    { title: "Orden sostenible", text: "No busco soluciones parche. Busco sistemas que sigan funcionando cuando yo ya no esté mirando." }
                                ].map((item, i) => (
                                    <div key={i} className={`bg-surface-dark/50 p-6 rounded-lg border-l-2 ${item.primary ? 'border-primary' : 'border-gray-700 hover:border-primary'} transition-colors`}>
                                        <h4 className="text-white font-bold mb-2">{item.title}</h4>
                                        <p className="text-sm text-gray-400">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/10" id="valores">
                            <h3 className="text-2xl font-display font-bold text-white mb-8">Para quién tiene sentido esto</h3>
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <p className="text-gray-400 leading-relaxed md:w-1/2">
                                    Esto es para dueños de pequeños negocios que sienten que han perdido el control. Para los que saben que deberían estar haciendo estrategia pero se pasan el día apagando fuegos operativos. Si buscas a alguien que te instale un software y desaparezca, no soy yo.
                                </p>
                                <div className="md:w-1/2 bg-gradient-to-br from-surface-dark to-background-dark p-6 rounded-xl border border-white/5">
                                    <h4 className="text-primary font-bold mb-4 flex items-center gap-2">
                                        <ShieldCheck className="w-5 h-5" />
                                        Mi postura
                                    </h4>
                                    <p className="text-white italic text-lg leading-relaxed">
                                        "La tecnología debe ser invisible. El orden debe ser evidente."
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="relative mt-20 mb-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-3xl opacity-50"></div>
                    <div className="relative bg-surface-dark border border-white/10 rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-6">
                            Antes de hacer
                        </h3>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                            Si valoras la claridad y buscas resultados tangibles sin atajos mágicos, hablemos. Una conversación honesta para ver si encajamos.
                        </p>
                        <div className="flex flex-col items-center gap-4">
                            <motion.a
                                whileHover={{ y: -2 }}
                                className="group relative inline-flex items-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-bold text-lg px-10 py-4 rounded transition-all shadow-[0_0_25px_rgba(110,231,183,0.3)]"
                                href="/contact"
                            >
                                <span>Contactar con Rafael</span>
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </motion.a>
                            <span className="text-sm text-gray-600 mt-2">Sin compromisos comerciales.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
