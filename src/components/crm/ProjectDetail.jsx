import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Edit, Save, User, Calendar, FileText, Plus, Send, Check, XCircle, Copy, Trash2, ArrowLeft, DollarSign, Clock, AlertCircle, TrendingUp, CheckCircle, Circle, PlayCircle, PauseCircle, Flag, Upload, Download, FolderOpen } from 'lucide-react';
import { fetchProjectById, updateProject, changeProjectStatus, deleteProject, createProject } from '../../lib/crm/projects';
import { fetchQuotesByProject, createQuote, sendQuote, acceptQuote, rejectQuote, createNewVersion, deleteQuote } from '../../lib/crm/quotes';
import { fetchTasksByProject, createTask, updateTask, deleteTask, changeTaskStatus, getTaskStats } from '../../lib/crm/tasks';
import {
    fetchProjectDocuments, uploadProjectDocument, deleteProjectDocument, getDocumentDownloadUrl,
    uploadTaskDocument, fetchTaskDocuments, deleteTaskDocument,
    createTaskNote, fetchTaskNotes, updateTaskNote, deleteTaskNote
} from '../../lib/crm/documents';
import { fetchContacts } from '../../lib/crm/contacts';
import { fetchInvoices, createInvoiceFromQuote, createInvoice } from '../../lib/crm/invoices';
import QuoteEditor from './QuoteEditor';
import InvoiceEditor from './InvoiceEditor';
import InvoiceList from './InvoiceList';
import DocumentUploader from '../DocumentUploader';


const ProjectDetail = ({ projectId, onClose, onUpdate }) => {
    const [project, setProject] = useState(null);
    const [quotes, setQuotes] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [editData, setEditData] = useState({});
    const [activeTab, setActiveTab] = useState('info');
    const [selectedQuote, setSelectedQuote] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [creatingQuote, setCreatingQuote] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [newProjectData, setNewProjectData] = useState({ name: '', description: '', responsible: '' });
    const [creating, setCreating] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskStats, setTaskStats] = useState(null);
    const [creatingTask, setCreatingTask] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', description: '', assigned_to: '', priority: 'media', due_date: '', is_milestone: false });
    const [documents, setDocuments] = useState([]);
    const [documentCategory, setDocumentCategory] = useState('general');
    const [documentDescription, setDocumentDescription] = useState('');
    const [expandedTask, setExpandedTask] = useState(null);
    const [taskDocuments, setTaskDocuments] = useState({});
    const [taskNotes, setTaskNotes] = useState({});
    const [newNote, setNewNote] = useState('');
    const [editingNote, setEditingNote] = useState(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = 'unset'; };
    }, []);

    useEffect(() => {
        if (projectId === 'new') {
            loadContacts();
            setLoading(false);
        } else if (projectId) {
            loadProject();
        }
    }, [projectId]);

    const loadContacts = async () => {
        const { data } = await fetchContacts();
        if (data) setContacts(data);
    };

    const loadProject = async () => {
        setLoading(true);
        const { data } = await fetchProjectById(projectId);
        if (data) {
            setProject(data);
            setEditData(data);
            await Promise.all([
                loadQuotes(),
                loadTasks(),
                loadDocuments(),
                loadInvoices()
            ]);
        }
        setLoading(false);
    };

    const loadInvoices = async () => {
        const { data } = await fetchInvoices({ project_id: projectId });
        if (data) setInvoices(data);
    };

    const handleCreateInvoice = async () => {
        if (!project) return;
        setLoading(true);
        const { data } = await createInvoice({
            project_id: projectId,
            contact_id: project.contact_id,
            status: 'borrador'
        });
        if (data) {
            await loadInvoices();
            setSelectedInvoice(data.id);
        }
        setLoading(false);
    };

    const loadQuotes = async () => {
        const { data } = await fetchQuotesByProject(projectId);
        if (data) setQuotes(data);
    };

    const loadTasks = async () => {
        const { data } = await fetchTasksByProject(projectId);
        if (data) setTasks(data);

        const { data: stats } = await getTaskStats(projectId);
        if (stats) setTaskStats(stats);
    };

    const loadDocuments = async () => {
        const { data } = await fetchProjectDocuments(projectId);
        if (data) setDocuments(data);
    };

    const handleUploadDocument = async (file, category, description) => {
        const { error } = await uploadProjectDocument(projectId, file, category, description);
        if (!error) {
            await loadDocuments();
            setDocumentDescription('');
        } else {
            alert('Error al subir el documento');
        }
    };

    const handleDownloadDocument = async (filePath, fileName) => {
        const { url, error } = await getDocumentDownloadUrl(filePath);
        if (!error && url) {
            const link = document.createElement('a');
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            alert('Error al descargar el documento');
        }
    };

    const handleDeleteDocument = async (documentId, filePath) => {
        if (!confirm('¿Eliminar este documento?')) return;
        const { error } = await deleteProjectDocument(documentId, filePath);
        if (!error) {
            await loadDocuments();
        } else {
            alert('Error al eliminar el documento');
        }
    };

    const handleSave = async () => {
        const { contact, quotes: _, ...updates } = editData;
        const { error } = await updateProject(projectId, updates);
        if (!error) {
            await loadProject();
            setEditing(false);
            if (onUpdate) onUpdate();
        }
    };

    const handleCreateProject = async () => {
        if (!selectedContactId || !newProjectData.name.trim()) {
            alert('Por favor selecciona un contacto y añade un nombre al proyecto');
            return;
        }

        setCreating(true);
        const { data, error } = await createProject(selectedContactId, newProjectData);
        if (!error && data) {
            if (onUpdate) onUpdate();
            // Siempre cerrar después de crear un nuevo proyecto para volver a la lista
            onClose();
        } else {
            alert('Error al crear el proyecto');
        }
        setCreating(false);
    };

    const handleStatusChange = async (status) => {
        await changeProjectStatus(projectId, status);
        await loadProject();
        if (onUpdate) onUpdate();
    };

    const handleCreateQuote = async () => {
        setCreatingQuote(true);
        const { data } = await createQuote(projectId);
        if (data) {
            await loadProject();
            setSelectedQuote(data.id);
        }
        setCreatingQuote(false);
    };

    const handleQuoteAction = async (action, quoteId) => {
        switch (action) {
            case 'send':
                await sendQuote(quoteId);
                break;
            case 'accept':
                await acceptQuote(quoteId);
                break;
            case 'reject':
                await rejectQuote(quoteId);
                break;
            case 'newVersion':
                const { data } = await createNewVersion(quoteId);
                if (data) setSelectedQuote(data.id);
                break;
            case 'delete':
                if (confirm('¿Eliminar este presupuesto en borrador?')) {
                    await deleteQuote(quoteId);
                }
                break;
        }
        await loadProject();
        if (onUpdate) onUpdate();
    };

    const handleDeleteProject = async () => {
        if (!confirm('¿Eliminar este proyecto y todos sus presupuestos?')) return;
        const { error } = await deleteProject(projectId);
        if (!error) onClose();
    };

    const handleCreateTask = async () => {
        if (!newTask.title.trim()) {
            alert('El título de la tarea es obligatorio');
            return;
        }

        setCreatingTask(true);
        const { error } = await createTask(projectId, { ...newTask, position: tasks.length });
        if (!error) {
            await loadTasks();
            setNewTask({ title: '', description: '', assigned_to: '', priority: 'media', due_date: '', is_milestone: false });
        }
        setCreatingTask(false);
    };

    const handleUpdateTask = async (taskId, updates) => {
        await updateTask(taskId, updates);
        await loadTasks();
    };

    const handleToggleTaskStatus = async (task) => {
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';
        await changeTaskStatus(task.id, newStatus);
        await loadTasks();
    };

    const handleDeleteTask = async (taskId) => {
        if (!confirm('¿Eliminar esta tarea?')) return;
        await deleteTask(taskId);
        await loadTasks();
    };

    const handleExpandTask = async (taskId) => {
        if (expandedTask === taskId) {
            setExpandedTask(null);
        } else {
            setExpandedTask(taskId);
            // Load documents and notes for this task
            const { data: docs } = await fetchTaskDocuments(taskId);
            const { data: notes } = await fetchTaskNotes(taskId);
            setTaskDocuments({ ...taskDocuments, [taskId]: docs || [] });
            setTaskNotes({ ...taskNotes, [taskId]: notes || [] });
        }
    };

    const handleUploadTaskDocument = async (taskId, file, description) => {
        const { error } = await uploadTaskDocument(taskId, file, description);
        if (!error) {
            const { data } = await fetchTaskDocuments(taskId);
            setTaskDocuments({ ...taskDocuments, [taskId]: data || [] });
        } else {
            alert('Error al subir el documento');
        }
    };

    const handleDeleteTaskDocument = async (taskId, documentId, filePath) => {
        if (!confirm('¿Eliminar este documento?')) return;
        const { error } = await deleteTaskDocument(documentId, filePath);
        if (!error) {
            const { data } = await fetchTaskDocuments(taskId);
            setTaskDocuments({ ...taskDocuments, [taskId]: data || [] });
        } else {
            alert('Error al eliminar el documento');
        }
    };

    const handleCreateTaskNote = async (taskId) => {
        if (!newNote.trim()) return;
        const { error } = await createTaskNote(taskId, newNote);
        if (!error) {
            const { data } = await fetchTaskNotes(taskId);
            setTaskNotes({ ...taskNotes, [taskId]: data || [] });
            setNewNote('');
        } else {
            alert('Error al crear la nota');
        }
    };

    const handleUpdateTaskNote = async (taskId, noteId, content) => {
        const { error } = await updateTaskNote(noteId, content);
        if (!error) {
            const { data } = await fetchTaskNotes(taskId);
            setTaskNotes({ ...taskNotes, [taskId]: data || [] });
            setEditingNote(null);
        } else {
            alert('Error al actualizar la nota');
        }
    };

    const handleDeleteTaskNote = async (taskId, noteId) => {
        if (!confirm('¿Eliminar esta nota?')) return;
        const { error } = await deleteTaskNote(noteId);
        if (!error) {
            const { data } = await fetchTaskNotes(taskId);
            setTaskNotes({ ...taskNotes, [taskId]: data || [] });
        } else {
            alert('Error al eliminar la nota');
        }
    };

    const getTaskStatusIcon = (status) => {
        switch (status) {
            case 'completed': return CheckCircle;
            case 'in_progress': return PlayCircle;
            case 'blocked': return PauseCircle;
            default: return Circle;
        }
    };

    const getTaskStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'text-green-400';
            case 'in_progress': return 'text-blue-400';
            case 'blocked': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            propuesta: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
            presupuestado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            aceptado: 'bg-green-500/10 text-green-400 border-green-500/20',
            en_ejecucion: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            cerrado: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            cancelado: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
        return colors[status] || colors.propuesta;
    };

    const getQuoteStatusColor = (status) => {
        const colors = {
            borrador: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
            enviado: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            aceptado: 'bg-green-500/10 text-green-400 border-green-500/20',
            rechazado: 'bg-red-500/10 text-red-400 border-red-500/20',
            caducado: 'bg-orange-500/10 text-orange-400 border-orange-500/20'
        };
        return colors[status] || colors.borrador;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount || 0);
    };

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60000] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    // Modo creación de proyecto
    if (projectId === 'new') {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60000] flex items-start justify-center pt-16 p-4 overflow-y-auto">
                <div className="bg-[#1a1a1a] border border-white/20 rounded-2xl max-w-2xl w-full shadow-2xl mb-20">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <div className="flex items-center gap-4">
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                                <ArrowLeft className="w-5 h-5 text-gray-400" />
                            </button>
                            <h2 className="text-xl font-bold text-white">Nuevo Proyecto</h2>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="p-6 space-y-6">
                        {/* Selector de Contacto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Cliente / Contacto *</label>
                            <select
                                value={selectedContactId || ''}
                                onChange={(e) => setSelectedContactId(e.target.value)}
                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                            >
                                <option value="">Selecciona un contacto...</option>
                                {contacts.map(contact => (
                                    <option key={contact.id} value={contact.id}>
                                        {contact.full_name} {contact.company ? `(${contact.company})` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Nombre del Proyecto */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Nombre del Proyecto *</label>
                            <input
                                type="text"
                                value={newProjectData.name}
                                onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })}
                                placeholder="Ej: Automatización CRM"
                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                            />
                        </div>

                        {/* Descripción */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Descripción</label>
                            <textarea
                                value={newProjectData.description}
                                onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })}
                                rows={3}
                                placeholder="Describe brevemente el proyecto..."
                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                            />
                        </div>

                        {/* Responsable */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Responsable</label>
                            <input
                                type="text"
                                value={newProjectData.responsible}
                                onChange={(e) => setNewProjectData({ ...newProjectData, responsible: e.target.value })}
                                placeholder="Nombre del responsable del proyecto"
                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                            />
                        </div>

                        {/* Botones */}
                        <div className="flex gap-3 pt-4">
                            <button
                                onClick={onClose}
                                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3 rounded-lg transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleCreateProject}
                                disabled={creating || !selectedContactId || !newProjectData.name.trim()}
                                className="flex-1 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {creating ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-gray-900/20 border-t-gray-900 rounded-full animate-spin"></div>
                                        Creando...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4" />
                                        Crear Proyecto
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!project) return null;

    // Si hay un presupuesto seleccionado, mostrar el editor
    if (selectedQuote) {
        return (
            <QuoteEditor
                quoteId={selectedQuote}
                onClose={() => { setSelectedQuote(null); loadProject(); }}
                onUpdate={() => { loadProject(); if (onUpdate) onUpdate(); }}
            />
        );
    }

    return createPortal(
        <div className="fixed inset-0 bg-[#0a0a0a] z-[9998] flex flex-col overflow-hidden">
            <div className="flex flex-col h-full w-full max-w-7xl mx-auto border-x border-white/5 relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 px-8 border-b border-white/10 bg-black/20 backdrop-blur-xl sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <ArrowLeft className="w-5 h-5 text-gray-400" />
                        </button>
                        <div>
                            {editing ? (
                                <input
                                    type="text"
                                    value={editData.name || ''}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="text-xl font-bold text-white bg-black/30 border border-white/20 rounded px-2 focus:border-primary focus:outline-none"
                                />
                            ) : (
                                <h2 className="text-xl font-bold text-white">{project.name}</h2>
                            )}
                            <p className="text-sm text-gray-400">
                                {project.contact?.full_name} · {project.contact?.email}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {editing ? (
                            <button onClick={handleSave} className="flex items-center gap-2 bg-primary hover:bg-primary-hover text-gray-900 font-bold px-4 py-2 rounded-lg">
                                <Save className="w-4 h-4" /> Guardar
                            </button>
                        ) : (
                            <button onClick={() => setEditing(true)} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg">
                                <Edit className="w-4 h-4" /> Editar
                            </button>
                        )}
                        <button onClick={handleDeleteProject} className="p-2 hover:bg-red-500/20 rounded-lg" title="Eliminar proyecto">
                            <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                        <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg">
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-white/10 px-6 overflow-x-auto">
                    {[
                        { id: 'info', label: 'Información', icon: FileText },
                        { id: 'tasks', label: `Tareas (${tasks.length})`, icon: CheckCircle },
                        { id: 'documents', label: `Documentos (${documents.length})`, icon: FolderOpen },
                        { id: 'financial', label: `Facturación (${invoices.length})`, icon: DollarSign },
                        { id: 'planning', label: 'Planificación', icon: Calendar },
                        { id: 'quotes', label: `Presupuestos (${quotes.length})`, icon: FileText }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${activeTab === tab.id
                                ? 'border-primary text-primary'
                                : 'border-transparent text-gray-400 hover:text-white'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                    {activeTab === 'info' && (
                        <div className="space-y-6">
                            {/* Project Overview Card */}
                            <div className="bg-[#1F1F1F] border border-white/10 rounded-2xl p-6 shadow-md">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-primary" />
                                    Resumen del Proyecto
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {/* Estado */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Estado</label>
                                        <div className="flex gap-2 flex-wrap">
                                            {['propuesta', 'presupuestado', 'aceptado', 'en_ejecucion', 'cerrado', 'cancelado'].map(status => (
                                                <button
                                                    key={status}
                                                    onClick={() => handleStatusChange(status)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${getStatusColor(status)} ${project.status === status ? 'ring-2 ring-offset-2 ring-offset-[#1F1F1F]' : 'opacity-60 hover:opacity-100'
                                                        }`}
                                                >
                                                    {status === 'en_ejecucion' ? 'En Ejecución' : status.charAt(0).toUpperCase() + status.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Prioridad */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Prioridad</label>
                                        {editing ? (
                                            <select
                                                value={editData.priority || 'media'}
                                                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                            >
                                                <option value="baja">Baja</option>
                                                <option value="media">Media</option>
                                                <option value="alta">Alta</option>
                                                <option value="urgente">Urgente</option>
                                            </select>
                                        ) : (
                                            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block ${editData.priority === 'urgente' ? 'bg-red-500/20 text-red-400' :
                                                editData.priority === 'alta' ? 'bg-orange-500/20 text-orange-400' :
                                                    editData.priority === 'media' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {editData.priority?.charAt(0).toUpperCase() + editData.priority?.slice(1) || 'Media'}
                                            </span>
                                        )}
                                    </div>

                                    {/* Tipo de Servicio */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo de Servicio</label>
                                        {editing ? (
                                            <select
                                                value={editData.service_type || ''}
                                                onChange={(e) => setEditData({ ...editData, service_type: e.target.value })}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                            >
                                                <option value="">Seleccionar...</option>
                                                <option value="automation">Automatización</option>
                                                <option value="crm">CRM</option>
                                                <option value="web">Desarrollo Web</option>
                                                <option value="consulting">Consultoría</option>
                                                <option value="integration">Integración</option>
                                                <option value="other">Otro</option>
                                            </select>
                                        ) : (
                                            <p className="text-white font-medium">{editData.service_type === 'automation' ? 'Automatización' :
                                                editData.service_type === 'crm' ? 'CRM' :
                                                    editData.service_type === 'web' ? 'Desarrollo Web' :
                                                        editData.service_type === 'consulting' ? 'Consultoría' :
                                                            editData.service_type === 'integration' ? 'Integración' :
                                                                editData.service_type === 'other' ? 'Otro' :
                                                                    editData.service_type || 'No especificado'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Details Card */}
                            <div className="bg-[#1F1F1F] border border-white/10 rounded-2xl p-6 shadow-md">
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-primary" />
                                    Detalles
                                </h3>
                                <div className="space-y-4">
                                    {/* Responsable */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Responsable</label>
                                        {editing ? (
                                            <input
                                                type="text"
                                                value={editData.responsible || ''}
                                                onChange={(e) => setEditData({ ...editData, responsible: e.target.value })}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-white font-medium">{project.responsible || 'Sin asignar'}</p>
                                        )}
                                    </div>

                                    {/* Descripción */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
                                        {editing ? (
                                            <textarea
                                                value={editData.description || ''}
                                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                                rows={3}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                            />
                                        ) : (
                                            <p className="text-white leading-relaxed">{project.description || 'Sin descripción'}</p>
                                        )}
                                    </div>

                                    {/* Notas */}
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Notas Internas</label>
                                        {editing ? (
                                            <textarea
                                                value={editData.notes || ''}
                                                onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                                                rows={3}
                                                className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                                placeholder="Notas internas del equipo..."
                                            />
                                        ) : (
                                            <p className="text-white whitespace-pre-wrap text-sm text-gray-300">{project.notes || 'Sin notas'}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Fechas */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-[#1F1F1F] border border-white/10 rounded-2xl p-6 shadow-md">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Creado</p>
                                    </div>
                                    <p className="text-white font-medium pl-7">
                                        {new Date(project.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                                <div className="bg-[#1F1F1F] border border-white/10 rounded-2xl p-6 shadow-md">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Última actualización</p>
                                    </div>
                                    <p className="text-white font-medium pl-7">
                                        {new Date(project.updated_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'financial' && (
                        <div className="space-y-6">
                            {/* Presupuesto y Coste */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Presupuesto Estimado (€)</label>
                                    {editing ? (
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editData.budget || ''}
                                            onChange={(e) => setEditData({ ...editData, budget: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                            placeholder="0.00"
                                        />
                                    ) : (
                                        <p className="text-2xl font-bold text-primary">
                                            {formatCurrency(project.budget)}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Coste Real (€)</label>
                                    {editing ? (
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={editData.actual_cost || ''}
                                            onChange={(e) => setEditData({ ...editData, actual_cost: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                            placeholder="0.00"
                                        />
                                    ) : (
                                        <p className="text-2xl font-bold text-white">
                                            {formatCurrency(project.actual_cost)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Margen de Beneficio */}
                            {(project.budget || project.actual_cost) && (
                                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="w-5 h-5 text-primary" />
                                            <span className="text-sm font-medium text-gray-400">Margen de Beneficio</span>
                                        </div>
                                        <div className="text-right">
                                            <p className={`text-2xl font-bold ${(project.budget - project.actual_cost) >= 0 ? 'text-green-400' : 'text-red-400'
                                                }`}>
                                                {formatCurrency((project.budget || 0) - (project.actual_cost || 0))}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {project.budget ? `${(((project.budget - (project.actual_cost || 0)) / project.budget) * 100).toFixed(1)}%` : '0%'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Estado de Pago */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Estado de Pago</label>
                                {editing ? (
                                    <select
                                        value={editData.payment_status || 'pendiente'}
                                        onChange={(e) => setEditData({ ...editData, payment_status: e.target.value })}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                    >
                                        <option value="pendiente">Pendiente</option>
                                        <option value="parcial">Pago Parcial</option>
                                        <option value="pagado">Pagado</option>
                                        <option value="atrasado">Atrasado</option>
                                    </select>
                                ) : (
                                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${project.payment_status === 'pagado' ? 'bg-green-500/20 text-green-400' :
                                        project.payment_status === 'parcial' ? 'bg-yellow-500/20 text-yellow-400' :
                                            project.payment_status === 'atrasado' ? 'bg-red-500/20 text-red-400' :
                                                'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {project.payment_status === 'pagado' ? 'Pagado' :
                                            project.payment_status === 'parcial' ? 'Pago Parcial' :
                                                project.payment_status === 'atrasado' ? 'Atrasado' :
                                                    'Pendiente'}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'planning' && (
                        <div className="space-y-6">
                            {/* Fechas del Proyecto */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Fecha de Inicio</label>
                                    {editing ? (
                                        <input
                                            type="date"
                                            value={editData.start_date || ''}
                                            onChange={(e) => setEditData({ ...editData, start_date: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-white">
                                            {project.start_date ? new Date(project.start_date).toLocaleDateString('es-ES') : 'No definida'}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Fecha de Fin</label>
                                    {editing ? (
                                        <input
                                            type="date"
                                            value={editData.end_date || ''}
                                            onChange={(e) => setEditData({ ...editData, end_date: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-white">
                                            {project.end_date ? new Date(project.end_date).toLocaleDateString('es-ES') : 'No definida'}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Fecha de Entrega</label>
                                    {editing ? (
                                        <input
                                            type="date"
                                            value={editData.delivery_date || ''}
                                            onChange={(e) => setEditData({ ...editData, delivery_date: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                        />
                                    ) : (
                                        <p className="text-white">
                                            {project.delivery_date ? new Date(project.delivery_date).toLocaleDateString('es-ES') : 'No definida'}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Horas Estimadas vs Reales */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Horas Estimadas</label>
                                    {editing ? (
                                        <input
                                            type="number"
                                            step="0.5"
                                            value={editData.estimated_hours || ''}
                                            onChange={(e) => setEditData({ ...editData, estimated_hours: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                            placeholder="0"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-primary" />
                                            <p className="text-2xl font-bold text-white">
                                                {project.estimated_hours || 0}h
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Horas Reales</label>
                                    {editing ? (
                                        <input
                                            type="number"
                                            step="0.5"
                                            value={editData.actual_hours || ''}
                                            onChange={(e) => setEditData({ ...editData, actual_hours: e.target.value })}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-primary focus:outline-none"
                                            placeholder="0"
                                        />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-5 h-5 text-gray-400" />
                                            <p className="text-2xl font-bold text-white">
                                                {project.actual_hours || 0}h
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Progreso de Horas */}
                            {(project.estimated_hours || project.actual_hours) && (
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-400">Progreso de Horas</span>
                                        <span className="text-sm font-bold text-white">
                                            {project.estimated_hours ? `${((project.actual_hours || 0) / project.estimated_hours * 100).toFixed(1)}%` : '0%'}
                                        </span>
                                    </div>
                                    <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all ${(project.actual_hours || 0) > (project.estimated_hours || 0)
                                                ? 'bg-red-500'
                                                : 'bg-gradient-to-r from-primary to-secondary'
                                                }`}
                                            style={{
                                                width: `${Math.min(((project.actual_hours || 0) / (project.estimated_hours || 1)) * 100, 100)}%`
                                            }}
                                        />
                                    </div>
                                    {(project.actual_hours || 0) > (project.estimated_hours || 0) && (
                                        <div className="flex items-center gap-2 mt-2">
                                            <AlertCircle className="w-4 h-4 text-red-400" />
                                            <p className="text-xs text-red-400">
                                                Sobrepasado por {((project.actual_hours || 0) - (project.estimated_hours || 0)).toFixed(1)}h
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Duración del Proyecto */}
                            {project.start_date && project.end_date && (
                                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-5 h-5 text-blue-400" />
                                            <span className="text-sm font-medium text-gray-400">Duración del Proyecto</span>
                                        </div>
                                        <p className="text-xl font-bold text-white">
                                            {Math.ceil((new Date(project.end_date) - new Date(project.start_date)) / (1000 * 60 * 60 * 24))} días
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'tasks' && (
                        <div className="space-y-6">
                            {/* Estadísticas de Tareas */}
                            {taskStats && (
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                        <p className="text-xs text-gray-500 mb-1">Total</p>
                                        <p className="text-2xl font-bold text-white">{taskStats.total}</p>
                                    </div>
                                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                        <p className="text-xs text-green-400 mb-1">Completadas</p>
                                        <p className="text-2xl font-bold text-green-400">{taskStats.completed}</p>
                                    </div>
                                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                                        <p className="text-xs text-blue-400 mb-1">En Progreso</p>
                                        <p className="text-2xl font-bold text-blue-400">{taskStats.in_progress}</p>
                                    </div>
                                    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                                        <p className="text-xs text-primary mb-1">Progreso</p>
                                        <p className="text-2xl font-bold text-primary">{taskStats.completion_rate}%</p>
                                    </div>
                                </div>
                            )}

                            {/* Barra de Progreso */}
                            {taskStats && taskStats.total > 0 && (
                                <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-400">Progreso General</span>
                                        <span className="text-sm font-bold text-white">{taskStats.completion_rate}%</span>
                                    </div>
                                    <div className="w-full bg-black/30 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                                            style={{ width: `${taskStats.completion_rate}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Crear Nueva Tarea */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <h3 className="text-sm font-bold text-white mb-4">Nueva Tarea</h3>
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            placeholder="Título de la tarea *"
                                            value={newTask.title}
                                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                            className="bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Asignado a"
                                            value={newTask.assigned_to}
                                            onChange={(e) => setNewTask({ ...newTask, assigned_to: e.target.value })}
                                            className="bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <textarea
                                        placeholder="Descripción (opcional)"
                                        value={newTask.description}
                                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                        rows={2}
                                        className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                    />
                                    <div className="grid grid-cols-3 gap-3">
                                        <select
                                            value={newTask.priority}
                                            onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                            className="bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                        >
                                            <option value="baja">Baja</option>
                                            <option value="media">Media</option>
                                            <option value="alta">Alta</option>
                                            <option value="urgente">Urgente</option>
                                        </select>
                                        <input
                                            type="date"
                                            value={newTask.due_date}
                                            onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                                            className="bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:border-primary focus:outline-none"
                                        />
                                        <label className="flex items-center gap-2 bg-black/30 border border-white/20 rounded-lg px-3 py-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={newTask.is_milestone}
                                                onChange={(e) => setNewTask({ ...newTask, is_milestone: e.target.checked })}
                                                className="w-4 h-4 accent-primary"
                                            />
                                            <span className="text-xs text-gray-400">Hito</span>
                                        </label>
                                    </div>
                                    <button
                                        onClick={handleCreateTask}
                                        disabled={creatingTask || !newTask.title.trim()}
                                        className="w-full bg-primary hover:bg-primary-hover text-black font-bold py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        <Plus className="w-4 h-4" />
                                        {creatingTask ? 'Creando...' : 'Añadir Tarea'}
                                    </button>
                                </div>
                            </div>

                            {/* Lista de Tareas */}
                            <div className="space-y-2">
                                <h3 className="text-sm font-bold text-white mb-3">Tareas del Proyecto</h3>
                                {tasks.length === 0 ? (
                                    <p className="text-center text-gray-400 py-8">No hay tareas creadas</p>
                                ) : (
                                    tasks.map((task) => {
                                        const StatusIcon = getTaskStatusIcon(task.status);
                                        const isEditing = editingTask === task.id;

                                        return (
                                            <div key={task.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all">
                                                <div className="flex items-start gap-3">
                                                    {/* Checkbox */}
                                                    <button
                                                        onClick={() => handleToggleTaskStatus(task)}
                                                        className={`mt-1 ${getTaskStatusColor(task.status)}`}
                                                    >
                                                        <StatusIcon className="w-5 h-5" />
                                                    </button>

                                                    {/* Contenido */}
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-2">
                                                            <div className="flex-1">
                                                                {isEditing ? (
                                                                    <input
                                                                        type="text"
                                                                        defaultValue={task.title}
                                                                        onBlur={(e) => {
                                                                            handleUpdateTask(task.id, { title: e.target.value });
                                                                            setEditingTask(null);
                                                                        }}
                                                                        className="w-full bg-black/30 border border-white/20 rounded px-2 py-1 text-white text-sm focus:border-primary focus:outline-none"
                                                                        autoFocus
                                                                    />
                                                                ) : (
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : 'text-white'}`}>
                                                                            {task.title}
                                                                        </h4>
                                                                        {task.is_milestone && (
                                                                            <Flag className="w-4 h-4 text-primary" />
                                                                        )}
                                                                    </div>
                                                                )}
                                                                {task.description && (
                                                                    <p className="text-xs text-gray-400 mt-1">{task.description}</p>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 ml-4">
                                                                <button
                                                                    onClick={() => setEditingTask(task.id)}
                                                                    className="p-1 hover:bg-white/10 rounded"
                                                                >
                                                                    <Edit className="w-3 h-3 text-gray-400" />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteTask(task.id)}
                                                                    className="p-1 hover:bg-red-500/20 rounded"
                                                                >
                                                                    <Trash2 className="w-3 h-3 text-red-400" />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Metadata */}
                                                        <div className="flex items-center gap-4 text-xs">
                                                            {task.assigned_to && (
                                                                <span className="text-gray-400">
                                                                    <User className="w-3 h-3 inline mr-1" />
                                                                    {task.assigned_to}
                                                                </span>
                                                            )}
                                                            {task.due_date && (
                                                                <span className={`${new Date(task.due_date) < new Date() && task.status !== 'completed'
                                                                    ? 'text-red-400'
                                                                    : 'text-gray-400'
                                                                    }`}>
                                                                    <Calendar className="w-3 h-3 inline mr-1" />
                                                                    {new Date(task.due_date).toLocaleDateString('es-ES')}
                                                                </span>
                                                            )}
                                                            <span className={`px-2 py-0.5 rounded-full ${task.priority === 'urgente' ? 'bg-red-500/20 text-red-400' :
                                                                task.priority === 'alta' ? 'bg-orange-500/20 text-orange-400' :
                                                                    task.priority === 'media' ? 'bg-yellow-500/20 text-yellow-400' :
                                                                        'bg-gray-500/20 text-gray-400'
                                                                }`}>
                                                                {task.priority}
                                                            </span>
                                                            <select
                                                                value={task.status}
                                                                onChange={(e) => handleUpdateTask(task.id, { status: e.target.value })}
                                                                className="bg-black/30 border border-white/20 rounded px-2 py-0.5 text-white text-xs focus:border-primary focus:outline-none"
                                                            >
                                                                <option value="pending">Pendiente</option>
                                                                <option value="in_progress">En Progreso</option>
                                                                <option value="completed">Completada</option>
                                                                <option value="blocked">Bloqueada</option>
                                                                <option value="cancelled">Cancelada</option>
                                                            </select>
                                                            <button
                                                                onClick={() => handleExpandTask(task.id)}
                                                                className="ml-2 px-2 py-0.5 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary rounded text-xs transition-all"
                                                            >
                                                                {expandedTask === task.id ? '▲ Ocultar' : '▼ Ver más'}
                                                            </button>
                                                        </div>

                                                        {/* Expanded Section: Documents & Notes */}
                                                        {expandedTask === task.id && (
                                                            <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                                                                {/* Documents Section */}
                                                                <div>
                                                                    <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                                                                        <FileText className="w-4 h-4 text-primary" />
                                                                        Documentos ({taskDocuments[task.id]?.length || 0})
                                                                    </h5>

                                                                    {/* Upload Document */}
                                                                    <div className="mb-3">
                                                                        <DocumentUploader
                                                                            onUpload={(file, _, desc) => handleUploadTaskDocument(task.id, file, desc)}
                                                                            accept="*/*"
                                                                            maxSize={5 * 1024 * 1024}
                                                                        />
                                                                    </div>

                                                                    {/* Documents List */}
                                                                    {taskDocuments[task.id]?.length > 0 && (
                                                                        <div className="space-y-2">
                                                                            {taskDocuments[task.id].map((doc) => (
                                                                                <div key={doc.id} className="bg-black/30 border border-white/10 rounded p-2 flex items-center justify-between">
                                                                                    <div className="flex items-center gap-2 flex-1">
                                                                                        <FileText className="w-4 h-4 text-primary" />
                                                                                        <div className="flex-1">
                                                                                            <p className="text-xs text-white">{doc.file_name}</p>
                                                                                            {doc.description && (
                                                                                                <p className="text-xs text-gray-500">{doc.description}</p>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="flex items-center gap-1">
                                                                                        <button
                                                                                            onClick={() => handleDownloadDocument(doc.file_path, doc.file_name)}
                                                                                            className="p-1 hover:bg-primary/20 rounded"
                                                                                        >
                                                                                            <Download className="w-3 h-3 text-primary" />
                                                                                        </button>
                                                                                        <button
                                                                                            onClick={() => handleDeleteTaskDocument(task.id, doc.id, doc.file_path)}
                                                                                            className="p-1 hover:bg-red-500/20 rounded"
                                                                                        >
                                                                                            <Trash2 className="w-3 h-3 text-red-400" />
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {/* Notes Section */}
                                                                <div>
                                                                    <h5 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                                                                        <Edit className="w-4 h-4 text-primary" />
                                                                        Notas de Desarrollo ({taskNotes[task.id]?.length || 0})
                                                                    </h5>

                                                                    {/* Existing Notes */}
                                                                    {taskNotes[task.id]?.length > 0 && (
                                                                        <div className="space-y-2 mb-3">
                                                                            {taskNotes[task.id].map((note) => (
                                                                                <div key={note.id} className="bg-black/30 border border-white/10 rounded p-3">
                                                                                    {editingNote === note.id ? (
                                                                                        <div className="space-y-2">
                                                                                            <textarea
                                                                                                defaultValue={note.content}
                                                                                                onBlur={(e) => handleUpdateTaskNote(task.id, note.id, e.target.value)}
                                                                                                className="w-full bg-black/30 border border-white/20 rounded px-2 py-1 text-white text-xs focus:border-primary focus:outline-none"
                                                                                                rows={3}
                                                                                                autoFocus
                                                                                            />
                                                                                        </div>
                                                                                    ) : (
                                                                                        <>
                                                                                            <p className="text-xs text-white whitespace-pre-wrap mb-2">{note.content}</p>
                                                                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                                                                <span>Por: {note.author} • {new Date(note.created_at).toLocaleDateString('es-ES')}</span>
                                                                                                <div className="flex gap-1">
                                                                                                    <button
                                                                                                        onClick={() => setEditingNote(note.id)}
                                                                                                        className="p-1 hover:bg-white/10 rounded"
                                                                                                    >
                                                                                                        <Edit className="w-3 h-3 text-gray-400" />
                                                                                                    </button>
                                                                                                    <button
                                                                                                        onClick={() => handleDeleteTaskNote(task.id, note.id)}
                                                                                                        className="p-1 hover:bg-red-500/20 rounded"
                                                                                                    >
                                                                                                        <Trash2 className="w-3 h-3 text-red-400" />
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}

                                                                    {/* New Note Form */}
                                                                    <div className="space-y-2">
                                                                        <textarea
                                                                            value={newNote}
                                                                            onChange={(e) => setNewNote(e.target.value)}
                                                                            placeholder="Escribe tus ideas, investigación, decisiones..."
                                                                            rows={3}
                                                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-3 py-2 text-white text-xs focus:border-primary focus:outline-none resize-none"
                                                                        />
                                                                        <button
                                                                            onClick={() => handleCreateTaskNote(task.id)}
                                                                            disabled={!newNote.trim()}
                                                                            className="w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-medium py-2 rounded-lg text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                                        >
                                                                            <Plus className="w-3 h-3 inline mr-1" />
                                                                            Añadir Nota
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="space-y-6">
                            {/* Category Selector */}
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Categoría</label>
                                <select
                                    value={documentCategory}
                                    onChange={(e) => setDocumentCategory(e.target.value)}
                                    className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none"
                                >
                                    <option value="general">General</option>
                                    <option value="contract">Contrato</option>
                                    <option value="technical">Documentación Técnica</option>
                                    <option value="delivery">Entregables</option>
                                    <option value="invoice">Facturas</option>
                                    <option value="other">Otro</option>
                                </select>
                            </div>

                            {/* Upload Area */}
                            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                                <h3 className="text-sm font-bold text-white mb-4">Subir Documento</h3>
                                <DocumentUploader
                                    onUpload={handleUploadDocument}
                                    category={documentCategory}
                                    description={documentDescription}
                                    setDescription={setDocumentDescription}
                                />
                            </div>

                            {/* Documents List */}
                            <div>
                                <h3 className="text-sm font-bold text-white mb-3">Documentos del Proyecto</h3>
                                {documents.length === 0 ? (
                                    <p className="text-center text-gray-400 py-8">No hay documentos subidos</p>
                                ) : (
                                    <div className="space-y-2">
                                        {/* Group by category */}
                                        {['general', 'contract', 'technical', 'delivery', 'invoice', 'other'].map(cat => {
                                            const categoryDocs = documents.filter(doc => doc.category === cat);
                                            if (categoryDocs.length === 0) return null;

                                            const categoryLabels = {
                                                general: 'General',
                                                contract: 'Contratos',
                                                technical: 'Documentación Técnica',
                                                delivery: 'Entregables',
                                                invoice: 'Facturas',
                                                other: 'Otros'
                                            };

                                            return (
                                                <div key={cat} className="mb-4">
                                                    <h4 className="text-xs font-bold text-gray-400 mb-2 uppercase">{categoryLabels[cat]}</h4>
                                                    <div className="space-y-2">
                                                        {categoryDocs.map((doc) => (
                                                            <div key={doc.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all">
                                                                <div className="flex items-start justify-between">
                                                                    <div className="flex items-start gap-3 flex-1">
                                                                        <FileText className="w-5 h-5 text-primary mt-1" />
                                                                        <div className="flex-1">
                                                                            <h5 className="font-medium text-white">{doc.file_name}</h5>
                                                                            {doc.description && (
                                                                                <p className="text-xs text-gray-400 mt-1">{doc.description}</p>
                                                                            )}
                                                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                                                <span>{(doc.file_size / 1024).toFixed(1)} KB</span>
                                                                                <span>{new Date(doc.created_at).toLocaleDateString('es-ES')}</span>
                                                                                {doc.uploaded_by && <span>Por: {doc.uploaded_by}</span>}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center gap-2 ml-4">
                                                                        <button
                                                                            onClick={() => handleDownloadDocument(doc.file_path, doc.file_name)}
                                                                            className="p-2 hover:bg-primary/20 rounded transition-colors"
                                                                            title="Descargar"
                                                                        >
                                                                            <Download className="w-4 h-4 text-primary" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteDocument(doc.id, doc.file_path)}
                                                                            className="p-2 hover:bg-red-500/20 rounded transition-colors"
                                                                            title="Eliminar"
                                                                        >
                                                                            <Trash2 className="w-4 h-4 text-red-400" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'quotes' && (
                        <div className="space-y-4">
                            {/* Crear Presupuesto */}
                            <button
                                onClick={handleCreateQuote}
                                disabled={creatingQuote}
                                className="w-full flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-bold py-3 rounded-xl transition-all"
                            >
                                <Plus className="w-4 h-4" />
                                {creatingQuote ? 'Creando...' : 'Nuevo Presupuesto'}
                            </button>

                            {/* Lista de Presupuestos */}
                            {quotes.length === 0 ? (
                                <p className="text-center text-gray-400 py-8">No hay presupuestos</p>
                            ) : (
                                <div className="space-y-3">
                                    {quotes.map((quote) => (
                                        <div key={quote.id} className="bg-white/5 border border-white/10 rounded-lg p-4 hover:border-white/20 transition-all">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-white font-bold">v{quote.version}</span>
                                                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getQuoteStatusColor(quote.status)}`}>
                                                        {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                                                    </span>
                                                </div>
                                                <span className="text-xl font-bold text-primary">{formatCurrency(quote.total)}</span>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <span className="text-xs text-gray-500">
                                                    {new Date(quote.created_at).toLocaleDateString('es-ES')}
                                                    {quote.sent_at && ` · Enviado ${new Date(quote.sent_at).toLocaleDateString('es-ES')}`}
                                                </span>

                                                <div className="flex items-center gap-2">
                                                    {quote.status === 'borrador' && (
                                                        <>
                                                            <button
                                                                onClick={() => setSelectedQuote(quote.id)}
                                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg"
                                                            >
                                                                Editar
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('send', quote.id)}
                                                                className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs rounded-lg flex items-center gap-1"
                                                            >
                                                                <Send className="w-3 h-3" /> Enviar
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('delete', quote.id)}
                                                                className="p-1 hover:bg-red-500/20 rounded"
                                                            >
                                                                <Trash2 className="w-3 h-3 text-red-400" />
                                                            </button>
                                                        </>
                                                    )}
                                                    {quote.status === 'enviado' && (
                                                        <>
                                                            <button
                                                                onClick={() => setSelectedQuote(quote.id)}
                                                                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg"
                                                            >
                                                                Ver
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('accept', quote.id)}
                                                                className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 text-xs rounded-lg flex items-center gap-1"
                                                            >
                                                                <Check className="w-3 h-3" /> Aceptar
                                                            </button>
                                                            <button
                                                                onClick={() => handleQuoteAction('reject', quote.id)}
                                                                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-xs rounded-lg flex items-center gap-1"
                                                            >
                                                                <XCircle className="w-3 h-3" /> Rechazar
                                                            </button>
                                                        </>
                                                    )}
                                                    {['rechazado', 'caducado'].includes(quote.status) && (
                                                        <button
                                                            onClick={() => handleQuoteAction('newVersion', quote.id)}
                                                            className="px-3 py-1 bg-primary/20 hover:bg-primary/30 text-primary text-xs rounded-lg flex items-center gap-1"
                                                        >
                                                            <Copy className="w-3 h-3" /> Nueva Versión
                                                        </button>
                                                    )}
                                                    {['aceptado', 'rechazado', 'caducado'].includes(quote.status) && (
                                                        <button
                                                            onClick={() => setSelectedQuote(quote.id)}
                                                            className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-lg"
                                                        >
                                                            Ver
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'financial' && (
                        <div className="space-y-4">
                            <InvoiceList
                                invoices={invoices}
                                onCreateInvoice={handleCreateInvoice}
                                onSelectInvoice={(invoice) => setSelectedInvoice(invoice.id)}
                                projectId={projectId}
                            />
                        </div>
                    )}
                </div>
            </div>

            {selectedQuote && (
                <QuoteEditor
                    quoteId={selectedQuote}
                    onClose={() => setSelectedQuote(null)}
                    onUpdate={() => {
                        loadQuotes();
                        loadInvoices(); // Update invoices in case one was created from quote
                        onUpdate && onUpdate();
                    }}
                />
            )}

            {selectedInvoice && (
                <InvoiceEditor
                    invoiceId={selectedInvoice === 'new' ? 'new' : selectedInvoice}
                    projectId={projectId}
                    onClose={() => setSelectedInvoice(null)}
                    onUpdate={() => {
                        loadInvoices();
                        onUpdate && onUpdate();
                    }}
                />
            )}

            {creatingQuote && (
                <QuoteEditor
                    quoteId="new"
                    projectId={projectId}
                    onClose={() => setCreatingQuote(false)}
                    onUpdate={() => {
                        setCreatingQuote(false);
                        loadQuotes();
                        onUpdate && onUpdate();
                    }}
                />
            )}
        </div>,
        document.body
    );
};

export default ProjectDetail;
