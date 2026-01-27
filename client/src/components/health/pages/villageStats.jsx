import React, { useState, useRef, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import {
  LayoutDashboard, Droplets, Bell, FileText, Megaphone, MapPin, CircleHelp,
  Siren, TrendingUp, BarChart3, TestTube2,
  FileDown, Share2, Filter, Lightbulb, Bot, Map, UserCheck, X, 
} from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Sidebar from './sidebar';

// --- MOCK DATA FOR NORTHEASTERN STATES & VILLAGES ---
const northeastData = {
  "Select State": [],
  "Arunachal Pradesh": ["Tawang", "Ziro", "Itanagar"],
  "Assam": ["Majuli", "Guwahati", "Dibrugarh"],
  "Manipur": ["Imphal", "Ukhrul", "Moirang"],
  "Meghalaya": ["Mawlynnong", "Cherrapunji", "Shillong"],
  "Mizoram": ["Aizawl", "Lunglei", "Champhai"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung"],
  "Sikkim": ["Gangtok", "Pelling", "Lachung"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar"],
};

const diseases = ["Cholera", "Typhoid", "Dysentery", "Hepatitis A"];
const statuses = ["Active", "Recovered"];

const generateDashboardData = (state, villages) => {
    const randomValue = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const totalCases = randomValue(800, 2500);
    const activeCases = randomValue(200, 600);
    const recoveredCases = totalCases - activeCases - randomValue(50, 100);
    const sentToLab = totalCases - activeCases - recoveredCases;
    const allVillages = state === "Select State" ? ["Village A", "Village B"] : villages.length > 0 ? villages : northeastData[state].slice(0, 2);
    const threshold = randomValue(totalCases / 4, totalCases / 3.5);
    // Deliberately make one week cross the threshold for demonstration
    const breachWeekIndex = randomValue(1, 3);

    return {
        stats: { totalCases, activeCases, recoveredCases, sentToLab },
        casesOverTime: ['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week, index) => ({
            name: week,
            "Actual Cases": index === breachWeekIndex ? randomValue(threshold + 10, threshold + 50) : randomValue(totalCases / 5, threshold - 10),
            "Threshold": threshold
        })),
        villageComparison: allVillages.map(v => ({ name: v, cases: randomValue(10, 80) })),
        tableData: Array.from({ length: 8 }, (_, i) => ({
            id: i,
            date: new Date(2025, 8, 24 - i).toISOString().slice(0, 10),
            village: allVillages[randomValue(0, allVillages.length - 1)],
            disease: diseases[randomValue(0, diseases.length - 1)],
            status: statuses[randomValue(0, 1)]
        })),
        aiInsights: {
            trendingDisease: diseases[randomValue(0, diseases.length - 1)],
            prediction: `High risk of ${diseases[randomValue(0, diseases.length - 1)]} outbreak in ${allVillages[0]} within 7-10 days.`,
            recommendation: "Advise immediate dispatch of mobile testing units and distribution of water purification tablets.",
            hotspot: `Water source near ${allVillages[1]} shows high coliform levels. Immediate inspection required.`
        }
    };
};

const AlertTriangle = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);
// --- SIDEBAR COMPONENT (AS PROVIDED, SLIGHTLY STYLED) ---
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;


const StatCard = ({ title, value, percentage, icon, color }) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{title}</p><div className={`text-${color}-500`}>{icon}</div></div>
        <div className="mt-2 flex items-baseline gap-2"><h3 className="text-3xl font-bold text-slate-800">{value.toLocaleString()}</h3><span className={`text-sm font-semibold ${percentage > 0 ? 'text-green-600' : 'text-red-500'}`}>{percentage > 0 ? '+' : ''}{percentage}%</span></div>
    </div>
);
const useTypingEffect = (text, speed = 50) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
};

const TypingInsightCard = ({ icon, title, text }) => {
  const typedText = useTypingEffect(text, 30);
  const isTyping = typedText.length < text.length;

  return (
    <div className="flex items-start gap-4">
      <div className="bg-blue-100 text-blue-600 p-2 rounded-lg mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h5 className="font-semibold text-slate-700">{title}</h5>
        <p className="text-sm text-slate-500 leading-relaxed">
          {typedText}
          {isTyping && (
            <span className="inline-block w-2 h-4 bg-slate-600 ml-1 animate-pulse"></span>
          )}
        </p>
      </div>
    </div>
  );
};

const AlertPopup = ({ alert, onClose }) => (
    <div className="fixed bottom-8 right-8 bg-white border-l-4 border-red-500 rounded-lg shadow-2xl p-4 w-full max-w-sm z-50 animate-fade-in-up">
        <div className="flex items-start gap-4">
            <div className="bg-red-100 text-red-600 p-2 rounded-full"><Siren size={24}/></div>
            <div>
                <h4 className="font-bold text-slate-800">Critical Alert!</h4>
                <p className="text-sm text-slate-600 mt-1">{alert.message}</p>
            </div>
            <button onClick={onClose} className="ml-auto text-slate-400 hover:text-slate-600"><X size={20}/></button>
        </div>
    </div>
);

// --- MAIN DASHBOARD COMPONENT ---
const VillageHealthDashboard = () => {
  const [selectedState, setSelectedState] = useState("Meghalaya");
  const [availableVillages, setAvailableVillages] = useState(northeastData["Meghalaya"]);
  const [selectedVillages, setSelectedVillages] = useState(["Mawlynnong", "Cherrapunji"]);
  const [dashboardData, setDashboardData] = useState(generateDashboardData(selectedState, selectedVillages));
  const [alert, setAlert] = useState(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    setAvailableVillages(northeastData[selectedState]);
    setSelectedVillages([]);
  }, [selectedState]);

  // Effect to check for threshold breach and trigger alert
  useEffect(() => {
    const breachPoint = dashboardData.casesOverTime.find(d => d["Actual Cases"] > d["Threshold"]);
    if (breachPoint) {
        setAlert({
            message: `Case count in ${breachPoint.name} (${breachPoint["Actual Cases"]}) has exceeded the threshold of ${breachPoint.Threshold}. Immediate action may be required.`
        });
        const timer = setTimeout(() => setAlert(null), 10000); // Auto-hide after 10 seconds
        return () => clearTimeout(timer);
    } else {
        setAlert(null);
    }
  }, [dashboardData]);

  const handleApplyFilters = () => {
    setDashboardData(generateDashboardData(selectedState, selectedVillages));
  };
  
  const handleExportPDF = () => {
    const input = dashboardRef.current;
    if (input) {
      html2canvas(input, { scale: 2, backgroundColor: '#f8fafc' }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`aquasentials-report-${new Date().toISOString().slice(0, 10)}.pdf`);
      });
    }
  };
  
  const handleVillageSelection = (village) => {
    setSelectedVillages(prev => 
      prev.includes(village) ? prev.filter(v => v !== village) : [...prev, village]
    );
  };

  return (
    <div className="flex bg-slate-50 min-h-screen font-sans text-slate-800">
      <Sidebar activePage="Village Stats" />
      
      <main className="flex-1 p-8">
        <header className="flex items-center justify-between mb-6">
          <div><h1 className="text-3xl font-bold text-slate-900">Village Health Data Stats</h1><p className="text-slate-500 mt-1">Displaying health metrics for selected regions.</p></div>
          <div className="flex items-center gap-3">
            <button onClick={handleExportPDF} className="flex items-center gap-2 bg-white border border-slate-300 px-4 py-2 rounded-lg text-slate-700 font-semibold text-sm hover:bg-slate-100 transition"><FileDown size={16} /> Export PDF</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition flex items-center gap-2"><Share2 size={16} /> Share</button>
          </div>
        </header>

        {/* Filters Section */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4"><Filter size={18} className="text-slate-600"/><h3 className="text-lg font-semibold">Filters & Village Selection</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1"><label htmlFor="state-select" className="block text-sm font-medium text-slate-600 mb-1">State</label><select id="state-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg text-sm">{Object.keys(northeastData).map(state => <option key={state} value={state}>{state}</option>)}</select></div>
                <div className="md:col-span-2"><label className="block text-sm font-medium text-slate-600 mb-1">Villages</label><div className="p-2 border border-slate-300 rounded-lg flex flex-wrap gap-2 min-h-[42px]">{availableVillages.length > 0 ? availableVillages.map(village => (<button key={village} onClick={() => handleVillageSelection(village)} className={`px-3 py-1 text-sm rounded-full transition ${selectedVillages.includes(village) ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>{village}</button>)) : <span className="text-sm text-slate-400 self-center px-1">Please select a state first.</span>}</div></div>
                <div className="md:col-span-1 self-end"><button onClick={handleApplyFilters} className="w-full bg-slate-800 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-900 transition h-full">Apply Filters</button></div>
            </div>
        </div>

        <div ref={dashboardRef} className="bg-slate-50 p-1"> 
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatCard title="Total Cases" value={dashboardData.stats.totalCases} percentage={10} icon={<BarChart3 />} color="blue" />
                <StatCard title="Active" value={dashboardData.stats.activeCases} percentage={-5} icon={<Siren />} color="yellow" />
                <StatCard title="Recovered" value={dashboardData.stats.recoveredCases} percentage={15} icon={<UserCheck />} color="green" />
                <StatCard title="Sent to Lab" value={dashboardData.stats.sentToLab} percentage={2} icon={<TestTube2 />} color="indigo" />
              </div>

              {/* MODIFIED Chart Section */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <h4 className="font-semibold text-slate-800 mb-2">New Cases Over Time</h4>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dashboardData.casesOverTime} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#64748b" />
                            <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                            <Tooltip contentStyle={{ borderRadius: '0.5rem', borderColor: '#e2e8f0' }} />
                            <Legend />
                            <Line type="monotone" dataKey="Actual Cases" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="Threshold" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <h4 className="font-semibold text-slate-800 mb-4">Recent Case Details</h4>
                  <div className="overflow-x-auto"><table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-500 uppercase"><tr><th className="px-4 py-2">Date</th><th className="px-4 py-2">Village</th><th className="px-4 py-2">Disease</th><th className="px-4 py-2">Status</th></tr></thead><tbody>{dashboardData.tableData.map(row => (<tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50"><td className="px-4 py-3">{row.date}</td><td className="px-4 py-3">{row.village}</td><td className="px-4 py-3">{row.disease}</td><td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Recovered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{row.status}</span></td></tr>))}</tbody></table></div>
              </div>
            </div>

            {/* MODIFIED AI Insights Sidebar */}
            <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-6 h-fit">
                <div className="flex items-center gap-3">
                    <Bot size={24} className="text-blue-600" />
                    <h3 className="text-xl font-bold">AI Insights</h3>
                </div>
                <div className="space-y-6">
                   <TypingInsightCard icon={<TrendingUp size={20} />} title="Trending Disease" text={`${dashboardData.aiInsights.trendingDisease} cases are up by 25% this week.`} />
                   <TypingInsightCard icon={<Siren size={20} />} title="Predictive Risk Alert" text={dashboardData.aiInsights.prediction} />
                   <TypingInsightCard icon={<Lightbulb size={20} />} title="Recommended Action" text={dashboardData.aiInsights.recommendation} />
                   <TypingInsightCard icon={<Map size={20} />} title="Hotspot Identified" text={dashboardData.aiInsights.hotspot} />
                </div>
            </div>
          </div>
        </div>

        {/* Alert Popup */}
        {alert && <AlertPopup alert={alert} onClose={() => setAlert(null)} />}
      </main>
    </div>
  );
};

export default VillageHealthDashboard;