import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

const BlogRenderer = ({ post }) => {
    if (!post) return null;

    const renderContent = (content) => {
        const lines = (content || '').split('\n');
        const elements = [];
        let currentTable = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Table handling
            if (line.startsWith('|')) {
                const cells = line.split('|').filter(c => c.trim() !== '' || (line.startsWith('|') && line.endsWith('|'))).map(c => c.trim());
                if (line.includes('---')) continue; // Skip separator line

                if (!currentTable) {
                    currentTable = { header: cells, rows: [] };
                } else {
                    currentTable.rows.push(cells);
                }

                // Check if next line is not a table line
                if (i + 1 >= lines.length || !lines[i + 1].trim().startsWith('|')) {
                    elements.push(
                        <div key={`table-${i}`} className="overflow-x-auto my-8 -mx-4 md:mx-0">
                            <table className="w-full border-collapse bg-white/5 rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm">
                                <thead>
                                    <tr className="bg-primary/10 border-b border-white/10">
                                        {currentTable.header.map((cell, idx) => (
                                            <th key={idx} className="p-4 text-left text-sm font-black uppercase tracking-tighter text-primary">{cell}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentTable.rows.map((row, rowIdx) => (
                                        <tr key={rowIdx} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                            {row.map((cell, cellIdx) => (
                                                <td key={cellIdx} className="p-4 text-sm text-gray-300 leading-tight">
                                                    {cell.includes('**') ? (
                                                        cell.split('**').map((part, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="text-white font-bold">{part}</strong> : part)
                                                    ) : cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    );
                    currentTable = null;
                }
                continue;
            }

            // Headers
            if (line.startsWith('## ')) {
                elements.push(<h2 key={i} className="text-3xl font-display font-black text-primary mt-8 mb-4 uppercase tracking-tight italic border-b border-primary/20 pb-4">{line.replace('## ', '')}</h2>);
                continue;
            }
            if (line.startsWith('### ')) {
                elements.push(<h3 key={i} className="text-2xl font-display font-black text-primary/90 mt-6 mb-3 uppercase tracking-tight italic">{line.replace('### ', '')}</h3>);
                continue;
            }

            // Blockquotes
            if (line.startsWith('> ')) {
                elements.push(
                    <blockquote key={i} className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-2xl my-6 italic text-xl text-white font-light leading-relaxed">
                        {line.replace('> ', '').split('**').map((part, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="text-primary font-bold">{part}</strong> : part)}
                    </blockquote>
                );
                continue;
            }

            // Horizontal rule
            if (line === '---') {
                elements.push(<hr key={i} className="border-white/5 my-8" />);
                continue;
            }

            // Empty line - skip explicit h-4 to let space-y handle it
            if (line === '') {
                continue;
            }

            // List items
            if (line.startsWith('- ') || (line.match(/^\d+\./))) {
                const isOrdered = line.match(/^\d+\./);
                const contentText = line.replace(/^[- \d.]+\s/, '');
                elements.push(
                    <div key={i} className="flex items-start gap-4 ml-2 group">
                        <span className="text-primary font-bold mt-1.5 flex-shrink-0 group-hover:scale-125 transition-transform text-xs">
                            {isOrdered ? line.match(/^\d+/)[0] + '.' : '▸'}
                        </span>
                        <span className="leading-relaxed">
                            {contentText.split('**').map((part, pidx) => pidx % 2 === 1 ? <strong key={pidx} className="text-white font-bold bg-white/5 px-1 rounded">{part}</strong> : part)}
                        </span>
                    </div>
                );
                continue;
            }

            // Checkboxes
            if (line.startsWith('[ ]') || line.startsWith('[x]')) {
                const checked = line.startsWith('[x]');
                elements.push(
                    <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 my-4">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${checked ? 'bg-primary border-primary' : 'border-white/20'}`}>
                            {checked && <span className="text-[10px] text-black font-bold">✓</span>}
                        </div>
                        <span className={checked ? 'text-gray-500 line-through' : 'text-gray-200'}>
                            {line.substring(4)}
                        </span>
                    </div>
                );
                continue;
            }

            // Regular paragraph
            elements.push(
                <p key={i} className="leading-[1.6] tracking-wide text-gray-100/95 font-normal">
                    {line.split(/(\[.*?\]\(.*?\))/g).map((part, pidx) => {
                        const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
                        if (linkMatch) {
                            return <Link key={pidx} to={linkMatch[2]} className="text-primary hover:underline font-bold text-white lg:text-primary">{linkMatch[1]}</Link>;
                        }
                        return part.split('**').map((subpart, spidx) =>
                            spidx % 2 === 1 ? <strong key={spidx} className="text-white font-bold bg-primary/10 px-1.5 py-0.5 rounded-md border border-primary/20">{subpart}</strong> : subpart
                        );
                    })}
                </p>
            );
        }
        return elements;
    };

    return (
        <article>
            <div className="mb-12 border-b border-white/5 pb-12">
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-primary text-gray-900 text-xs font-black uppercase tracking-tighter shadow-[0_0_15px_rgba(110,231,183,0.3)]">
                        Zero Humo
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-primary/20 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
                        {post.category}
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5 text-gray-400 text-xs font-mono uppercase tracking-widest">
                        Ahorro: {post.savings || '10h/mes'}
                    </div>
                </div>

                <h1 className="font-display text-4xl md:text-7xl font-black leading-[1.05] mb-8 text-gray-200 tracking-tighter uppercase italic drop-shadow-2xl">
                    {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-xs text-gray-500 font-mono uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {new Date(post.publish_date || post.publishDate || new Date()).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {post.read_time || post.readTime || '5 min'} de lectura
                    </span>
                </div>
            </div>

            <div className="max-w-none mb-20">
                <div className="bg-[#1A1A1A] border-2 border-white/20 p-8 md:p-16 rounded-[2.5rem] shadow-[0_32px_120px_rgba(0,0,0,0.8)] relative overflow-hidden group/article">
                    {/* Radial highlight for reading comfort */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(110,231,183,0.03),transparent_70%)] pointer-events-none"></div>

                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <div className="w-32 h-32 border-8 border-primary/30 rounded-full"></div>
                    </div>

                    <div className="relative z-10 space-y-6 blog-content text-lg font-normal">
                        {renderContent(post.content || post.excerpt)}
                    </div>
                </div>
            </div>

            {/* Paso a paso Engorilao */}
            <div className="mt-16 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-primary-hover rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-[#0f0f0f] border border-primary/20 p-10 md:p-14 rounded-3xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-primary/20 rounded-xl text-primary font-bold animate-pulse">
                            PLAN DE ACCIÓN
                        </div>
                        <h3 className="font-display text-3xl font-black text-white uppercase italic tracking-tighter">
                            Paso a paso <span className="text-primary italic underline decoration-wavy">Engorilao</span>
                        </h3>
                    </div>

                    <div className="space-y-6 text-left mb-10">
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold text-sm">1</div>
                            <p className="text-gray-300"><strong>Identifica el dolor:</strong> Relee este post y confirma si de verdad te está pasando esto. Si no, no pierdas el tiempo.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold text-sm">2</div>
                            <p className="text-gray-300"><strong>Mide el coste:</strong> Calcula cuántas horas reales estás tirando a la basura a la semana por este proceso.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full border border-primary/50 flex items-center justify-center text-primary font-bold text-sm">3</div>
                            <p className="text-gray-300"><strong>Pega el grito:</strong> Si el coste es alto, escríbeme. No te voy a vender un software, te voy a dar libertad.</p>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-gray-900 font-black px-10 py-5 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(110,231,183,0.2)] uppercase tracking-tighter"
                        >
                            <span>Quiero mi tiempo de vuelta</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/sobre-mi"
                            className="inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 text-white font-bold px-10 py-5 rounded-xl border border-white/10 transition-all uppercase tracking-tighter"
                        >
                            ¿Quién es este tío?
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default BlogRenderer;
