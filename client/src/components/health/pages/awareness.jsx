import React, { useState, useMemo } from 'react';
import { Search, Bell, ChevronDown, PlayCircle, Download, Share2, MessageSquare, MonitorPlay, HeartHandshake, BookCopy, Megaphone, Droplets, CheckCircle, LayoutDashboard, FileText, MapPin, CircleHelp } from 'lucide-react';
import Sidebar from './sidebar';
// Mock data for demonstration with corrected image placeholders
const mockPrograms = [
  {
    id: '1',
    title: 'Community Health Awareness',
    category: 'Health Education',
    language: 'English',
    status: 'Published',
    description: 'This program aims to educate communities about common health issues, preventive measures, and available resources. It covers topics such as disease awareness, healthy lifestyle choices, and access to healthcare services.',
    publishedDate: '2023-09-15',
    targetAudience: 'General Public',
    imageUrl: 'https://picsum.photos/seed/health/150/150',
    videoUrl: 'https://www.youtube.com/embed/pTBfPf0Z3FE?autoplay=1&mute=1'

  },
  {
    id: '2',
    title: 'Child Nutrition Program',
    category: 'Nutrition',
    language: 'Hindi',
    status: 'Published',
    description: 'Learn about essential nutrients for child development, balanced diets, and how to prepare nutritious meals for children of all ages. Includes tips for picky eaters and addressing common nutritional deficiencies.',
    publishedDate: '2023-08-20',
    targetAudience: 'Parents & Caregivers',
    imageUrl: 'https://picsum.photos/seed/nutrition/150/150',
    videoUrl: 'https://www.youtube.com/embed/TP8E3-Y66kw?autoplay=1&mute=1',
  },
  {
    id: '3',
    title: 'Hygiene and Sanitation',
    category: 'Hygiene',
    language: 'English',
    status: 'Published',
    description: 'A comprehensive guide to personal hygiene and community sanitation practices. Topics include handwashing techniques, safe water storage, waste management, and preventing the spread of infectious diseases.',
    publishedDate: '2023-07-01',
    targetAudience: 'Community Members',
    imageUrl: 'https://picsum.photos/seed/hygiene/150/150',
    videoUrl: 'https://www.youtube.com/embed/JbuSTlyNgGM?autoplay=1&mute=1',
  },
  {
    id: '4',
    title: 'Disease Prevention',
    category: 'Prevention',
    language: 'Hindi',
    status: 'Draft',
    description: 'Understand common infectious and non-infectious diseases, their symptoms, and effective strategies for prevention. Focuses on vaccination, early detection, and lifestyle modifications.',
    publishedDate: '2023-06-10',
    targetAudience: 'General Public',
    imageUrl: 'https://picsum.photos/seed/prevention/150/150',
    videoUrl: 'https://www.youtube.com/embed/KcTssKP0FyE?autoplay=1&mute=1',
  },
  {
    id: '5',
    title: 'Disease Prevention',
    category: 'Prevention',
    language: 'Assamese',
    status: 'Draft',
    description: 'Understand common infectious and non-infectious diseases, their symptoms, and effective strategies for prevention. Focuses on vaccination, early detection, and lifestyle modifications.',
    publishedDate: '2023-06-10',
    targetAudience: 'General Public',
    imageUrl: 'https://picsum.photos/seed/prevention/150/150',
    videoUrl: 'https://www.youtube.com/embed/gJRqkjofeoE?autoplay=1&mute=1',
  },
];

const mockMandatoryPrograms = [
    {
        id: 'm1',
        title: 'Infectious Disease Control',
        subtitle: 'Control Measures',
        imageUrl: 'https://picsum.photos/seed/infectious/120/120',
    },
    {
        id: 'm2',
        title: 'Maternal Health Guidelines',
        subtitle: 'Maternal Care',
        imageUrl: 'https://picsum.photos/seed/maternal/120/120',
    },
];

// --- A Link component for the Sidebar ---
const Link = ({ to, children, className }) => <a href={to} className={className}>{children}</a>;

// --- Sidebar Component ---



const Dropdown = ({ label, options, selected, onChange }) => (
  <div className="relative inline-block text-left mr-2">
    <select
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <option value="">{label}</option>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

const ProgramItem = ({ program, isSelected, onClick }) => (
  <div
    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-50'}`}
    onClick={() => onClick(program)}
  >
    <img src={program.imageUrl} alt={program.title} className="w-16 h-16 rounded-md object-cover" />
    <div className="flex-1">
      <p className="font-semibold text-gray-800">{program.title}</p>
      <p className="text-sm text-gray-600">{program.category}</p>
    </div>
  </div>
);


const AwarenessProgramsPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(mockPrograms[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const availableCategories = useMemo(() => [...new Set(mockPrograms.map(p => p.category))], []);
  const availableLanguages = useMemo(() => [...new Set(mockPrograms.map(p => p.language))], []);
  const availableStatuses = useMemo(() => [...new Set(mockPrograms.map(p => p.status))], []);

  const filteredPrograms = useMemo(() => {
    let filtered = mockPrograms.filter(program =>
      program.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (categoryFilter) {
      filtered = filtered.filter(program => program.category === categoryFilter);
    }
    if (languageFilter) {
      filtered = filtered.filter(program => program.language === languageFilter);
    }
    if (statusFilter) {
      filtered = filtered.filter(program => program.status === statusFilter);
    }

    if (sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
    }

    return filtered;
  }, [searchTerm, categoryFilter, languageFilter, statusFilter, sortBy]);

  const handleMarkAsWatched = () => alert(`Marking "${selectedProgram.title}" as watched!`);
  const handleShare = () => alert(`Sharing "${selectedProgram.title}" with ASHA Workers!`);
  const handleDownload = () => alert(`Downloading material for "${selectedProgram.title}"!`);
  const handleFeedback = () => alert(`Giving feedback for "${selectedProgram.title}"!`);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar activePage="Awareness Programs" />
      <div className="flex-1 flex flex-col">
          {/* Main Content Area */}
          <main className="flex-1 p-6">
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Program Library */}
                <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Awareness Programs</h2>

                  {/* Search and Filters */}
                  <div className="mb-6">
                    <div className="relative mb-4">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search programs"
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                        <Dropdown label="Category" options={availableCategories} selected={categoryFilter} onChange={setCategoryFilter} />
                        <Dropdown label="Language" options={availableLanguages} selected={languageFilter} onChange={setLanguageFilter} />
                        <Dropdown label="Status" options={availableStatuses} selected={statusFilter} onChange={setStatusFilter} />
                        <Dropdown label="Sort by" options={['title', 'date']} selected={sortBy} onChange={setSortBy} />
                    </div>
                  </div>

                  {/* Program Library List */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Program Library</h3>
                  <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                    {filteredPrograms.length > 0 ? (
                      filteredPrograms.map(program => (
                        <ProgramItem
                          key={program.id}
                          program={program}
                          isSelected={selectedProgram && selectedProgram.id === program.id}
                          onClick={setSelectedProgram}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500">No programs found matching your criteria.</p>
                    )}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center items-center mt-6 space-x-2">
                    <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">&lt;</button>
                    <span className="px-3 py-1 rounded-md bg-blue-600 text-white">1</span>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600">2</button>
                    <button className="px-3 py-1 rounded-md hover:bg-gray-100 text-gray-600">3</button>
                    <button className="p-2 rounded-md hover:bg-gray-100 text-gray-600">&gt;</button>
                  </div>
                </div>

                {/* Right Column: Video Player and Details */}
                <div className="lg:col-span-2 space-y-6">
                  {selectedProgram && (
                    <>
                      {/* Video Player */}
                      <div className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="relative w-full aspect-video">
                          <iframe
                            src={selectedProgram.videoUrl}
                            title={selectedProgram.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute top-0 left-0 w-full h-full"
                          ></iframe>
                        </div>
                      </div>

                      {/* Program Details */}
                      <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">{selectedProgram.title}</h3>
                        <p className="text-blue-600 font-semibold mb-4">{selectedProgram.category}</p>
                        <p className="text-gray-700 mb-6">{selectedProgram.description}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
                          <div>
                            <p><span className="font-semibold">Published:</span> {selectedProgram.publishedDate}</p>
                            <p><span className="font-semibold">Language:</span> {selectedProgram.language}</p>
                          </div>
                          <div>
                            <p><span className="font-semibold">Target Audience:</span> {selectedProgram.targetAudience}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-8">
                          <button onClick={handleMarkAsWatched} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                            <CheckCircle size={18} /> Mark as Watched
                          </button>
                          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
                            <Share2 size={18} /> Share with ASHA Workers
                          </button>
                          <button onClick={handleDownload} className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition">
                            <Download size={18} /> Download Material
                          </button>
                          <button onClick={handleFeedback} className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition">
                            <MessageSquare size={18} /> Give Feedback
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Mandatory Programs Section */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Mandatory Programs</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {mockMandatoryPrograms.map(program => (
                        <div key={program.id} className="border border-gray-200 rounded-lg overflow-hidden flex items-center space-x-4 p-4 hover:shadow-lg transition-shadow">
                          <img src={program.imageUrl} alt={program.title} className="w-20 h-20 object-cover rounded-md" />
                          <div>
                            <p className="font-semibold text-gray-800">{program.title}</p>
                            <p className="text-sm text-gray-600">{program.subtitle}</p>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">75% Completed</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
          </main>
      </div>
    </div>
  );
};

export default AwarenessProgramsPage;