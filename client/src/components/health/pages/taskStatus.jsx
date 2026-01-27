import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import {
    LayoutDashboard, Bell, Droplets, FileText, Megaphone, MapPin, CircleHelp,
    Users, CheckCircle, X, Plus, Bot, Award, Siren, Lightbulb, Clock
} from 'lucide-react';
import bgimage from "../../../assets/image.jpeg";
import Sidebar from './sidebar';
// --- MOCK DATA (Unchanged) ---
const initialWorkers = [
    { id: 1, name: 'Priya Sharma', tasksCompleted: 28, points: 1450, level: 'Expert', avatar: 'https://i.pravatar.cc/150?u=priya', location: { top: '30%', left: '40%' }, workload: 5 },
    { id: 2, name: 'Anjali Verma', tasksCompleted: 18, points: 950, level: 'Intermediate', avatar: 'https://i.pravatar.cc/150?u=anjali', location: { top: '55%', left: '65%' }, workload: 8 },
    { id: 3, name: 'Deepika Patel', tasksCompleted: 22, points: 1100, level: 'Intermediate', avatar: 'https://i.pravatar.cc/150?u=deepika', location: { top: '70%', left: '35%' }, workload: 3 },
    { id: 4, name: 'Sunita Singh', tasksCompleted: 12, points: 600, level: 'Beginner', avatar: 'https://i.pravatar.cc/150?u=sunita', location: { top: '25%', left: '75%' }, workload: 6 },
];

const initialTasks = [
    { id: 107, workerId: 1, village: 'Rampur', taskName: 'Patient Follow-up', dueDate: '2025-10-01', status: 'Completed', priority: 'Medium', location: { top: '35%', left: '42%' } },
    { id: 106, workerId: 2, village: 'Shampur', taskName: 'Water Sample Collection', dueDate: '2025-10-05', status: 'In Progress', priority: 'High', location: { top: '50%', left: '60%' } },
    { id: 105, workerId: 3, village: 'Rampur', taskName: 'Awareness Visit', dueDate: '2025-09-28', status: 'Pending', priority: 'Low', location: { top: '75%', left: '38%' } },
    { id: 104, workerId: 4, village: 'Shampur', taskName: 'Medication Delivery', dueDate: '2025-09-25', status: 'Completed', priority: 'High', location: { top: '28%', left: '70%' } },
];

const aiInsightsData = {
    prediction: "High probability (85%) of a waterborne disease outbreak in Shampur village within the next 7 days due to recent water quality reports.",
    recommendation: "Proactively assign Anjali Verma to conduct house-to-house symptom checks in Shampur. Her proximity and experience are optimal.",
};

const alertsData = [
    { id: 1, text: "Urgent: Contaminated water source reported in Shampur. Notify all workers in the area.", time: "10m ago", type: "critical" },
    { id: 2, text: "Low stock warning: Water testing kits are below 20%. Please re-order.", time: "45m ago", type: "warning" },
    { id: 3, text: "Priya Sharma has been awarded the 'Community Health Star' badge.", time: "2h ago", type: "info" },
];

// --- A Link component for the Sidebar ---
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;



// --- REFINED UI COMPONENTS (LIGHT THEME) ---
const StatCard = ({ title, value, percentage, icon, color }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-md">
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <div className={`text-${color}-500`}>{icon}</div>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
            <span className={`text-sm font-semibold ${percentage > 0 ? 'text-green-600' : 'text-red-500'}`}>
                {percentage > 0 ? '+' : ''}{percentage}%
            </span>
        </div>
    </div>
);

const BaseModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg relative m-4" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

const AssignTaskModal = ({ isOpen, onClose, onAssignTask, workers }) => {
    const recommendedWorker = useMemo(() => {
        if (!workers || workers.length === 0) return null;
        return [...workers].sort((a, b) => a.workload - b.workload)[0];
    }, [workers]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const taskData = Object.fromEntries(formData.entries());
        const worker = workers.find(w => w.id === parseInt(taskData.workerId));
        const newTask = {
            id: Date.now(),
            workerId: worker.id,
            village: taskData.village,
            taskName: taskData.description,
            dueDate: taskData.deadline,
            status: 'Pending',
            priority: 'Medium',
            location: { top: `${Math.random() * 80 + 10}%`, left: `${Math.random() * 80 + 10}%` }
        };
        onAssignTask(newTask);
        onClose();
    };

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold mb-6 text-slate-800">Assign New Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Select Worker</label>
                    <select name="workerId" defaultValue={recommendedWorker?.id} className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-800">
                        <option value="" disabled>Choose a worker</option>
                        {recommendedWorker && <option value={recommendedWorker.id}>⭐ {recommendedWorker.name} (Recommended)</option>}
                        {workers.filter(w => w.id !== recommendedWorker?.id).map(w => <option key={w.id} value={w.id}>{w.name} (Workload: {w.workload})</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">Task Description</label>
                    <input name="description" placeholder="e.g., Conduct health survey" className="w-full p-2 border border-slate-300 rounded-md" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Village</label>
                        <input name="village" placeholder="Village Name" className="w-full p-2 border border-slate-300 rounded-md" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-600 mb-1">Deadline</label>
                        <input name="deadline" type="date" className="w-full p-2 border border-slate-300 rounded-md" required />
                    </div>
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition">
                        Confirm Assignment
                    </button>
                </div>
            </form>
        </BaseModal>
    );
};

const WorkerProfileModal = ({ isOpen, onClose, worker, tasks }) => {
    const workerTasks = tasks.filter(t => t.workerId === worker?.id);
    const taskStatusData = [
        { name: 'Completed', value: workerTasks.filter(t => t.status === 'Completed').length },
        { name: 'In Progress', value: workerTasks.filter(t => t.status === 'In Progress').length },
        { name: 'Pending', value: workerTasks.filter(t => t.status === 'Pending').length },
    ];
    const COLORS = ['#22c55e', '#f59e0b', '#ef4444'];
    if (!worker) return null;

    return (
        <BaseModal isOpen={isOpen} onClose={onClose}>
            <div className="flex items-center gap-4 mb-6">
                <img src={worker.avatar} alt={worker.name} className="w-20 h-20 rounded-full object-cover border-4 border-slate-200" />
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">{worker.name}</h2>
                    <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{worker.level}</span>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div><p className="text-slate-500 text-sm">Points</p><p className="font-bold text-2xl text-slate-800">{worker.points}</p></div>
                <div><p className="text-slate-500 text-sm">Tasks Done</p><p className="font-bold text-2xl text-slate-800">{worker.tasksCompleted}</p></div>
                <div><p className="text-slate-500 text-sm">Workload</p><p className="font-bold text-2xl text-slate-800">{worker.workload}</p></div>
            </div>
            <div className="h-64">
                <h4 className="font-semibold text-slate-700 mb-2 text-center">Task Status Breakdown</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={taskStatusData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {taskStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </BaseModal>
    );
};

// --- MAIN DASHBOARD COMPONENT ---
const HealthCommandCenterDashboard = () => {
    const [workers, setWorkers] = useState(initialWorkers);
    const [tasks, setTasks] = useState(initialTasks);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectedWorker, setSelectedWorker] = useState(null);
    const [activePin, setActivePin] = useState(null);

    const handleAssignTask = (newTask) => {
        setTasks(prev => [newTask, ...prev]);
        setWorkers(prev => prev.map(w => w.id === newTask.workerId ? { ...w, workload: w.workload + 1 } : w));
    };

    const handleOpenProfile = (worker) => {
        setSelectedWorker(worker);
        setIsProfileModalOpen(true);
    };

    const sortedWorkers = useMemo(() => [...workers].sort((a, b) => b.points - a.points), [workers]);

    return (
        <div className="flex bg-slate-50 text-slate-800 min-h-screen font-sans">
            <Sidebar activePage="Task Status" />

            <main className="flex-1 p-6 overflow-y-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-slate-800"> ASHA Worker Progress </h1>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsAssignModalOpen(true)} className="hidden md:flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition shadow-sm">
                            <Plus size={18} /> Assign Task
                        </button>
                        <Bell size={20} className="text-slate-500" />
                        <img src="https://img.freepik.com/free-photo/portrait-mature-therapist-sitting-table-looking-camera_1098-18156.jpg?t=st=1758662169~exp=1758665769~hmac=369786476ca1199b21075534f87d8f5119705dea188ec41c2bc55a25c62327cd&w=2000" alt="Admin" className="w-10 h-10 rounded-full" />
                    </div>
                </header>

                <div className="grid grid-cols-12 gap-6">
                    {/* Center Column */}
                    <div className="col-span-12 lg:col-span-8 space-y-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <StatCard title="Active Workers" value={workers.length} percentage={5} icon={<Users size={20}/>} color="blue" />
                            <StatCard title="In Progress" value={tasks.filter(t => t.status === 'In Progress').length} percentage={-3} icon={<Clock size={20}/>} color="yellow" />
                            <StatCard title="Completed" value={tasks.filter(t => t.status === 'Completed').length} percentage={8} icon={<CheckCircle size={20}/>} color="green" />
                            <StatCard title="High Priority" value={tasks.filter(t => t.priority === 'High').length} percentage={15} icon={<Siren size={20}/>} color="red" />
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-[75vh] relative overflow-hidden">
                             <h3 className="font-bold text-lg mb-2 text-slate-800">Geospatial Operations Map</h3>
                             <div className="absolute top-12 left-4 right-4 bottom-4 rounded-xl overflow-hidden">
                                <div className="absolute inset-0 bg-cover bg-center " style={{ backgroundImage: `url(${bgimage})` }}></div>
                                 {workers.map(w => (
                                    <div key={`w-${w.id}`} className="absolute z-10" style={{ top: w.location.top, left: w.location.left }} onMouseEnter={() => setActivePin(`worker-${w.id}`)} onMouseLeave={() => setActivePin(null)}>
                                        <img src={w.avatar} alt={w.name} className="w-9 h-9 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform transform hover:scale-125" />
                                        {activePin === `worker-${w.id}` && <span className="absolute bottom-full mb-2 -translate-x-1/2 left-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md shadow-lg">{w.name}</span>}
                                    </div>
                                ))}
                                {tasks.filter(t => t.status !== 'Completed').map(t => (
                                    <div key={`t-${t.id}`} className="absolute z-10" style={{ top: t.location.top, left: t.location.left, transform: 'translateX(-50%) translateY(-50%)' }} onMouseEnter={() => setActivePin(`task-${t.id}`)} onMouseLeave={() => setActivePin(null)}>
                                        <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer flex items-center justify-center ${t.priority === 'High' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                                            {t.priority === 'High' && <Siren size={8} className="text-white" />}
                                        </div>
                                        {activePin === `task-${t.id}` && <span className="absolute bottom-full mb-2 -translate-x-1/2 left-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded-md shadow-lg whitespace-nowrap">{t.taskName}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Bot className="text-blue-600" /> AI Smart Assistant</h3>
                            <div className="space-y-4 text-sm">
                                <div className="flex items-start gap-3"><Siren className="text-red-500 mt-1 flex-shrink-0" size={18} /><p><strong className="text-red-600">Prediction:</strong> <span className="text-slate-600">{aiInsightsData.prediction}</span></p></div>
                                <div className="flex items-start gap-3"><Lightbulb className="text-yellow-500 mt-1 flex-shrink-0" size={18} /><p><strong className="text-yellow-600">Recommendation:</strong> <span className="text-slate-600">{aiInsightsData.recommendation}</span></p></div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Award className="text-amber-500" /> Performance Leaderboard</h3>
                            <div className="space-y-2">
                                {sortedWorkers.map((worker, index) => (
                                    <div key={worker.id} onClick={() => handleOpenProfile(worker)} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <span className="font-bold text-slate-400 w-5">{index + 1}</span>
                                            <img src={worker.avatar} alt={worker.name} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-slate-800">{worker.name}</p>
                                                <p className="text-xs text-slate-500">{worker.points} Points</p>
                                            </div>
                                        </div>
                                        {index < 3 && <span className="text-2xl">{['🥇', '🥈', '🥉'][index]}</span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Bell className="text-indigo-500" /> Real-time Alerts</h3>
                            <div className="space-y-3">
                                {alertsData.map(alert => (
                                    <div key={alert.id} className={`p-3 rounded-lg text-sm border-l-4 ${alert.type === 'critical' ? 'bg-red-50 border-red-500 text-red-800' : alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' : 'bg-blue-50 border-blue-500 text-blue-800'}`}>
                                        <p>{alert.text}</p>
                                        <p className="text-xs opacity-70 mt-1">{alert.time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <button onClick={() => setIsAssignModalOpen(true)} className="md:hidden fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg z-20">
                    <Plus size={28} />
                </button>
                <AssignTaskModal isOpen={isAssignModalOpen} onClose={() => setIsAssignModalOpen(false)} onAssignTask={handleAssignTask} workers={workers} />
                <WorkerProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} worker={selectedWorker} tasks={tasks} />
            </main>
        </div>
    );
};

export default HealthCommandCenterDashboard;