import React, { useState, useMemo, useEffect } from 'react';
import { Bell, User, Plus, Search, Siren, AlertTriangle, Info, CheckCircle, X } from 'lucide-react';
import Sidebar from './sidebar'; // Importing the sidebar

// --- MOCK DATA ---
const initialAlerts = [
    { id: 1, title: 'Outbreak Detected in Sector 7', category: 'Urgent Health Risk', from: 'Admin', type: 'Critical', status: 'New' },
    { id: 2, title: 'Upcoming Awareness Campaign', category: 'Awareness Program Notice', from: 'Admin', type: 'Info', status: 'New' },
    { id: 3, title: 'Verify Case ID 12345', category: 'Verification Request', from: 'Admin', type: 'Warning', status: 'Acknowledged' },
    { id: 4, title: 'System Maintenance Scheduled', category: 'General Info', from: 'Admin', type: 'Info', status: 'Acknowledged' },
];

// --- HELPER COMPONENTS ---
const FilterDropdown = ({ label, options, value, onChange }) => (
    <select onChange={e => onChange(e.target.value)} value={value} className="bg-slate-100 border-none rounded-md px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500">
        <option value="">{label}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
);

const AlertItem = ({ alert, onAcknowledge }) => {
    const isAcknowledged = alert.status === 'Acknowledged';
    const typeStyles = {
        'Critical': 'border-red-500',
        'Warning': 'border-yellow-500',
        'Info': 'border-blue-500'
    };

    return (
        <div className={`bg-white p-4 rounded-lg border-l-4 ${typeStyles[alert.type]} shadow-sm flex items-center justify-between`}>
            <div>
                <h3 className="font-bold text-slate-800">{alert.title}</h3>
                <p className="text-sm text-blue-600 font-medium">{alert.category}</p>
                <p className="text-xs text-slate-500 mt-1">From: {alert.from}</p>
            </div>
            <button
                onClick={() => onAcknowledge(alert.id)}
                disabled={isAcknowledged}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition ${isAcknowledged ? 'bg-green-100 text-green-700 cursor-not-allowed' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
            >
                {isAcknowledged ? 'Acknowledged' : 'Acknowledge'}
            </button>
        </div>
    );
};

const SentAlertItem = ({ alert }) => {
    const typeStyles = {
        'Critical': 'border-red-500 text-red-600',
        'Warning': 'border-yellow-500 text-yellow-600',
        'Info': 'border-blue-500 text-blue-600'
    };

    return (
        <div className={`bg-white p-4 rounded-lg border-l-4 ${typeStyles[alert.type].split(' ')[0]} shadow-sm flex items-center justify-between`}>
            <div>
                <h3 className="font-bold text-slate-800">{alert.title}</h3>
                <p className="text-sm text-slate-500">To: <span className="font-medium text-slate-700">{alert.recipient}</span></p>
                <p className="text-xs text-slate-400 mt-1">Sent: {new Date(alert.id).toLocaleString()}</p>
            </div>
            <div className={`text-sm font-semibold px-3 py-1 rounded-full ${typeStyles[alert.type].replace('border', 'bg').replace('-500', '-100')}`}>
                {alert.type}
            </div>
        </div>
    );
};


const Toast = ({ message, onClose }) => (
    <div className="fixed bottom-5 right-5 bg-green-500 text-white py-3 px-5 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in-up">
        <CheckCircle size={20} />
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-green-100 hover:text-white"><X size={18} /></button>
    </div>
);

// --- MAIN COMPONENT ---
const AlertsPage = () => {
    const [view, setView] = useState('dashboard');
    const [alerts, setAlerts] = useState(initialAlerts);
    const [sentAlerts, setSentAlerts] = useState([]);
    const [toast, setToast] = useState('');

    const [recipient, setRecipient] = useState('ASHA Workers');
    const [alertType, setAlertType] = useState('Warning');
    const [message, setMessage] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const [typeFilter, setTypeFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [keyword, setKeyword] = useState('');
    
    const [sentTypeFilter, setSentTypeFilter] = useState('');
    const [sentKeyword, setSentKeyword] = useState('');


    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleAcknowledge = (id) => {
        setAlerts(alerts.map(alert => alert.id === id ? { ...alert, status: 'Acknowledged' } : alert));
    };

    const handleSendAlert = (e) => {
        e.preventDefault();
        const newAlert = {
            id: Date.now(),
            title: message,
            recipient: recipient,
            from: 'Admin',
            type: alertType,
        };
        setSentAlerts([newAlert, ...sentAlerts]);
        setToast(`Alert sent successfully to ${recipient}!`);
        setView('dashboard');
        setMessage('');
        setSymptoms('');
        setAlertType('Warning');
    };

    const filteredAlerts = useMemo(() => {
        return alerts.filter(alert => 
            (typeFilter ? alert.type === typeFilter : true) &&
            (statusFilter ? alert.status === statusFilter : true) &&
            (keyword ? alert.title.toLowerCase().includes(keyword.toLowerCase()) : true)
        );
    }, [alerts, typeFilter, statusFilter, keyword]);
    
    const filteredSentAlerts = useMemo(() => {
        return sentAlerts.filter(alert => 
            (sentTypeFilter ? alert.type === sentTypeFilter : true) &&
            (sentKeyword ? alert.title.toLowerCase().includes(sentKeyword.toLowerCase()) : true)
        );
    }, [sentAlerts, sentTypeFilter, sentKeyword]);


    return (
        <div className="flex bg-slate-50 min-h-screen font-sans">
            <Sidebar activePage="Alerts" />

            <main className="flex-1 flex flex-col">
                <header className="bg-white py-4 px-8 border-b border-slate-200 flex items-center justify-end gap-6">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 rounded-lg bg-slate-100 border-transparent focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <Bell size={22} className="text-slate-500 cursor-pointer" />
                    <img src="https://img.freepik.com/free-photo/portrait-mature-therapist-sitting-table-looking-camera_1098-18156.jpg?t=st=1758662169~exp=1758665769~hmac=369786476ca1199b21075534f87d8f5119705dea188ec41c2bc55a25c62327cd&w=2000" alt="User" className="w-9 h-9 rounded-full" />
                </header>

                <div className="flex-1 p-8">
                    {view === 'dashboard' && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold text-slate-800">Alerts</h1>
                                <button onClick={() => setView('create')} className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm">
                                    <Plus size={18} /> Create Alert
                                </button>
                            </div>
                            
                            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                                <h2 className="text-lg font-bold mb-4 text-slate-800">Incoming Alerts</h2>
                                <div className="flex gap-4">
                                    <FilterDropdown label="Type" options={['Info', 'Warning', 'Critical']} value={typeFilter} onChange={setTypeFilter} />
                                    <FilterDropdown label="Status" options={['New', 'Acknowledged']} value={statusFilter} onChange={setStatusFilter} />
                                    <input type="text" placeholder="Keyword..." value={keyword} onChange={e => setKeyword(e.target.value)} className="bg-slate-100 border-none rounded-md px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            
                            <div className="space-y-4 mb-10">
                                {filteredAlerts.map(alert => <AlertItem key={alert.id} alert={alert} onAcknowledge={handleAcknowledge} />)}
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                                <h2 className="text-lg font-bold mb-4 text-slate-800">Sent Alert History</h2>
                                <div className="flex gap-4">
                                     <FilterDropdown label="Type" options={['Info', 'Warning', 'Critical']} value={sentTypeFilter} onChange={setSentTypeFilter} />
                                     <input type="text" placeholder="Keyword..." value={sentKeyword} onChange={e => setSentKeyword(e.target.value)} className="bg-slate-100 border-none rounded-md px-4 py-2 text-sm text-slate-700 focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                            
                             <div className="space-y-4">
                                {filteredSentAlerts.length > 0 ? (
                                    filteredSentAlerts.map(alert => <SentAlertItem key={alert.id} alert={alert} />)
                                ) : (
                                    <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                                        <p className="text-slate-500">You haven't sent any alerts yet.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {view === 'create' && (
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3"><AlertTriangle className="text-yellow-500"/> Send Alert</h1>
                            <p className="text-slate-500 mb-8">Broadcast important information to relevant groups.</p>
                            <form onSubmit={handleSendAlert}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Recipient Group</label>
                                            <select value={recipient} onChange={e => setRecipient(e.target.value)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                                                <option>ASHA Workers</option>
                                                <option>Admin</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Alert Type</label>
                                            <div className="flex gap-2">
                                                <button type="button" onClick={() => setAlertType('Info')} className={`flex-1 py-2 rounded-lg transition ${alertType === 'Info' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>Info</button>
                                                <button type="button" onClick={() => setAlertType('Warning')} className={`flex-1 py-2 rounded-lg transition ${alertType === 'Warning' ? 'bg-yellow-500 text-white' : 'bg-slate-200'}`}>Warning</button>
                                                <button type="button" onClick={() => setAlertType('Critical')} className={`flex-1 py-2 rounded-lg transition ${alertType === 'Critical' ? 'bg-red-600 text-white' : 'bg-slate-200'}`}>Critical</button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Alert Message</label>
                                            <textarea value={message} onChange={e => setMessage(e.target.value)} rows="5" placeholder="Water quality in the region has been compromised..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-slate-700 mb-2">Observed Patient Symptoms (Optional)</label>
                                            <textarea value={symptoms} onChange={e => setSymptoms(e.target.value)} rows="3" placeholder="e.g., Fever, dehydration..." className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-6">
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Preview</label>
                                        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="w-24 h-24 bg-slate-100 border-4 border-white rounded-lg shadow-md mb-4 flex items-center justify-center">
                                                    {alertType === 'Critical' && <Siren size={48} className="text-red-500" />}
                                                    {alertType === 'Warning' && <AlertTriangle size={48} className="text-yellow-500" />}
                                                    {alertType === 'Info' && <Info size={48} className="text-blue-500" />}
                                                </div>
                                                <h3 className="font-bold text-xl text-slate-800">{alertType} Alert</h3>
                                                <p className="text-slate-600 mt-2">{message || "Your message will appear here..."}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-4 mt-8">
                                            <button type="button" onClick={() => setView('dashboard')} className="px-6 py-2 rounded-lg text-slate-700 font-semibold bg-slate-200 hover:bg-slate-300">Cancel</button>
                                            <button type="submit" className="px-6 py-2 rounded-lg text-white font-semibold bg-red-500 hover:bg-red-600">Send Alert</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </main>

            {toast && <Toast message={toast} onClose={() => setToast('')} />}
        </div>
    );
};

export default AlertsPage;