import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, FileText, ClipboardList, ArrowUpRight, Clock, CheckCircle, AlertTriangle, Users, Briefcase } from 'lucide-react';
import InvoiceList from './InvoiceList';
import InvoiceEditor from './InvoiceEditor';
import QuoteList from './QuoteList';
import QuoteEditor from './QuoteEditor';
import ProjectList from './ProjectList'; // We'll use this for the "Quotes" part if needed, or better, a filtered ProjectList
import { fetchInvoices } from '../../lib/crm/invoices';
import { supabase } from '../../lib/supabaseClient';

const BillingDashboard = () => {
    const [activeView, setActiveView] = useState('facturas'); // 'facturas' or 'presupuestos'
    const [stats, setStats] = useState({
        totalInvoiced: 0,
        pendingCollection: 0,
        totalQuotes: 0,
        paidCount: 0,
        overdueCount: 0
    });
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        setLoading(true);
        try {
            // This is a simplified fetch for stats. 
            // In a production app, we would use a more complex query or a database function.
            const { data: invoices } = await fetchInvoices();
            const { count: quotesCount } = await supabase.from('quotes').select('*', { count: 'exact', head: true });

            // Logic to calculate totals from invoices
            // Since we don't have a direct 'total' column (it's calculated from lines),
            // this is just placeholder logic for now.
            const invoiceList = invoices || [];
            setStats({
                totalInvoiced: 0, // Should sum all paid invoices
                pendingCollection: 0, // Should sum all 'enviada' invoices
                totalQuotes: quotesCount || 0,
                paidCount: invoiceList.filter(i => i.status === 'pagada').length,
                overdueCount: invoiceList.filter(i => i.status === 'atrasada').length
            });
        } catch (error) {
            console.error('Error loading billing stats:', error);
        }
        setLoading(false);
    };

    const MetricCard = ({ label, value, icon: Icon, color, subValue, trend }) => (
        <div className="bg-[#222222]/60 backdrop-blur-md border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${color}-500/5 blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-${color}-500/10`}></div>
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-2xl bg-${color}-500/10 border border-${color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {trend > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
            <div className="relative z-10">
                <div className="text-3xl font-black text-white italic tracking-tighter mb-1">{value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-500">{label}</div>
            </div>
            {subValue && (
                <div className="mt-4 pt-4 border-t border-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    {subValue}
                </div>
            )}
        </div>
    );

    return (
        <div className="space-y-8">
            {/* Header with Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                    label="Ingresos Totales"
                    value="-- €"
                    icon={DollarSign}
                    color="primary"
                    subValue="Facturas cobradas este año"
                    trend={12}
                />
                <MetricCard
                    label="Pendiente de Cobro"
                    value="-- €"
                    icon={Clock}
                    color="yellow"
                    subValue={`${stats.overdueCount} facturas atrasadas`}
                />
                <MetricCard
                    label="Presupuestos Totales"
                    value={stats.totalQuotes}
                    icon={ClipboardList}
                    color="blue"
                    subValue="Enviados o en borrador"
                />
                <MetricCard
                    label="Facturas Pagadas"
                    value={stats.paidCount}
                    icon={CheckCircle}
                    color="green"
                    subValue="Histórico total"
                />
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveView('facturas')}
                        className={`text-sm font-black uppercase tracking-widest pb-4 -mb-4.5 transition-all relative ${activeView === 'facturas' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
                    >
                        Facturas
                        {activeView === 'facturas' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(224,255,0,0.5)]"></div>}
                    </button>
                    <button
                        onClick={() => setActiveView('presupuestos')}
                        className={`text-sm font-black uppercase tracking-widest pb-4 -mb-4.5 transition-all relative ${activeView === 'presupuestos' ? 'text-primary' : 'text-gray-500 hover:text-white'}`}
                    >
                        Presupuestos
                        {activeView === 'presupuestos' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_10px_rgba(224,255,0,0.5)]"></div>}
                    </button>
                </div>
            </div>

            {/* View Content */}
            <div className="min-h-[400px]">
                {activeView === 'facturas' ? (
                    <InvoiceList
                        onSelectInvoice={(inv) => setSelectedInvoice(inv.id)}
                    />
                ) : (
                    <QuoteList
                        onSelectQuote={(quote) => setSelectedQuote(quote.id)}
                    />
                )}
            </div>

            {/* Invoice Detail Portal */}
            {selectedInvoice && (
                <InvoiceEditor
                    invoiceId={selectedInvoice === 'new' ? 'new' : selectedInvoice}
                    onClose={() => {
                        setSelectedInvoice(null);
                        loadStats();
                    }}
                    onUpdate={() => {
                        loadStats();
                    }}
                />
            )}

            {/* Quote Detail Portal */}
            {selectedQuote && (
                <QuoteEditor
                    quoteId={selectedQuote}
                    onClose={() => setSelectedQuote(null)}
                    onUpdate={() => {
                        loadStats();
                    }}
                />
            )}
        </div>
    );
};

export default BillingDashboard;
