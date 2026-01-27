import React, { useState, useRef, useEffect } from 'react';
import axios from '../../../utils/axiosInstance'; // Make sure this path is correct for your project
import ReactMarkdown from 'react-markdown';
import { Bell, Sparkles, RefreshCw, Paperclip, Mic, Send, Bot, User, BarChart, FileText, LayoutDashboard } from 'lucide-react';
import Sidebar from './sidebar';

const TypingAnimation = () => (
    <div className="flex items-center space-x-1 p-2">
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce"></div>
    </div>
);

const AccordionItem = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-zinc-200 last:border-b-0">
            <button className="w-full text-left py-3 flex justify-between items-center text-sm font-medium text-zinc-800 hover:bg-zinc-50" onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="p-3 text-sm text-zinc-600 bg-zinc-50/50 prose prose-sm max-w-none">{children}</div>}
        </div>
    );
};


// --- Refactored & Styled Chat Components ---
const ChatBubble = ({ message }) => {
  const isUser = message.from === 'user';
  const bubbleStyles = isUser ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white text-zinc-800 rounded-bl-none border border-zinc-200';
  const markdownStyles = isUser ? 'prose prose-sm prose-invert max-w-none' : 'prose prose-sm prose-zinc max-w-none';
  const Avatar = isUser ? (
    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center shadow-sm shrink-0"><User size={16} className="text-zinc-600"/></div>
  ) : (
    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm shrink-0"><Bot size={16} className="text-indigo-600"/></div>
  );

  return (
    <div className={`flex items-end gap-3 animate-fadeInUp ${isUser ? 'flex-row-reverse' : ''}`}>
      {Avatar}
      <div className={`max-w-xl p-4 rounded-2xl shadow-md ${bubbleStyles}`}>
        <article className={markdownStyles}>
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
};

const MessageInput = ({ input, setInput, handleSend, loading }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);
  const handleKeyPress = (e) => (e.key === 'Enter' && !e.shiftKey) && (e.preventDefault(), handleSend());

  return (
    <div className="p-4 border-t border-zinc-200 bg-white rounded-b-xl">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about regional health data, trends, or campaign materials..."
          className="w-full bg-zinc-100 border-2 border-transparent rounded-lg py-3 pl-12 pr-28 resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 max-h-48 overflow-y-auto text-sm"
          rows="1"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <button className="text-zinc-500 hover:text-indigo-600 transition-colors"><Paperclip size={20}/></button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button className="text-zinc-500 hover:text-indigo-600 transition-colors"><Mic size={20}/></button>
          <button onClick={() => handleSend()} disabled={loading || !input.trim()} className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white p-2.5 rounded-full shadow-md hover:shadow-lg hover:scale-105 disabled:from-zinc-400 disabled:to-zinc-400 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300">
            <Send size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};

const WelcomeScreen = ({ handleSuggestionClick }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fadeInUp">
    <div className="bg-indigo-100 text-indigo-600 p-4 rounded-full mb-4"><Bot size={40} /></div>
    <h2 className="text-2xl font-bold text-zinc-800 mb-2">Arogya Sahayak</h2>
    <p className="text-zinc-500 mb-8 max-w-md">Your AI assistant for public health insights in North East India. How can I help you today?</p>
    <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
      <button onClick={() => handleSuggestionClick("Provide a weekly summary of the current Dengue situation in Assam.")} className="text-sm text-left font-medium p-3 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors">Weekly Dengue summary for Assam</button>
      <button onClick={() => handleSuggestionClick("Compare the number of reported Measles cases in Nagaland for this quarter with the same period last year.")} className="text-sm text-left font-medium p-3 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors">Compare Measles cases in Nagaland</button>
      <button onClick={() => handleSuggestionClick("What are the latest ICMR guidelines for the diagnosis and treatment of Scrub Typhus?")} className="text-sm text-left font-medium p-3 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors">Latest ICMR Scrub Typhus guidelines</button>
      <button onClick={() => handleSuggestionClick("Generate a PSA script that can be read on local radio and also sent as a text message alert in both English and Mizo.")} className="text-sm text-left font-medium p-3 bg-white border border-zinc-200 hover:bg-zinc-50 rounded-lg transition-colors">Generate a PSA script that can be read on local radio and also sent as a text message alert in both English and Mizo.</button>
    </div>
  </div>
);


// --- Main App Component ---
export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  // --- PRE-BUILT RESPONSES FOR DEMO ---
  const cannedResponses = {
    dengue: `### Weekly Dengue Summary: Assam
**For the week of September 17 - September 23, 2025**

Here is the requested summary based on data from the State Integrated Disease Surveillance Programme (IDSP) portal.

**Overall Status:**
There has been a **slight increase (approx. 8%)** in weekly reported Dengue cases, consistent with post-monsoon seasonal trends. Continued vigilance is required, especially in urban and semi-urban areas.

**Key Metrics:**
* **New Cases Reported This Week:** 345
* **Total Active Cases:** 1,102
* **Weekly Test Positivity Rate (TPR):** 12.5%
* **Districts Reporting Cases:** 18 out of 31

**Hotspot Districts (Highest Caseload):**
| District | New Cases This Week |
| :--- | :--- |
| Kamrup (Metropolitan) | 98 |
| Dibrugarh | 45 |
| Cachar | 31 |
| Tinsukia | 28 |

**Recommendations:**
1.  Deploy Rapid Response Teams to Kamrup (M) and Dibrugarh to assess the situation.
2.  Intensify Information, Education, and Communication (IEC) activities regarding source reduction.
3.  Ensure all district hospitals have adequate stock of NS1 testing kits and paracetamol.

*Source: Assam State IDSP Portal, data accessed on September 24, 2025.*`, 
    measles: `### Measles Case Comparison: Nagaland (Q3 2024 vs. Q3 2025)

**Executive Summary:**
There has been a **significant 45% increase** in reported Measles cases in the third quarter (July 1 - present) of 2025 compared to the same period in 2024. The increase is most pronounced in Dimapur and Mon districts.

**Comparative Data Table:**
| Metric | Q3 2024 (Jul 1 - Sep 30) | Q3 2025 (Jul 1 - Sep 23) |
| :--- | :--- | :--- |
| **Total Reported Cases** | 112 | **162** |
| **Most Affected Districts** | Dimapur (45), Kohima (28) | Dimapur (75), Mon (41) |
| **Key Demographic** | Children under 5 | Children under 5 |

**Analysis & Probable Causes:**
* The data suggests potential gaps in routine immunization coverage from the past 1-2 years.
* Increased community transmission is likely occurring in densely populated areas of Dimapur.

**Actionable Insight:**
Immediate focus should be on planning and executing catch-up vaccination drives ("Mission Indradhanush") in the identified hotspot districts, particularly targeting unvaccinated or partially vaccinated children.`,
    scrubTyphus: `### ICMR Guidelines Summary: Diagnosis & Treatment of Scrub Typhus

**Disclaimer:** This information is for reference and decision-support for registered medical professionals only. It does not replace professional clinical judgment for individual patient care.

**1. Diagnosis:**
* **Clinical Suspicion:** Based on symptoms like high-grade fever, severe headache, myalgia, and potentially the presence of an **eschar** (a dark, scab-like lesion) at the site of the chigger bite.
* **Confirmatory Tests:**
    * **IgM ELISA:** The most commonly used and recommended test for diagnosis.
    * **Immunofluorescence Assay (IFA):** Considered the gold standard but has limited availability.
    * **PCR:** Useful for early diagnosis from blood or eschar samples.

**2. Treatment Protocol:**
* **First-Line Treatment (Adults):**
    * **Drug of Choice:** **Doxycycline**
    * **Dosage:** 100 mg twice daily for 7-14 days.
* **Alternative Treatment (For pregnant women or contraindications):**
    * **Drug of Choice:** **Azithromycin**
    * **Dosage:** 500 mg once daily for 5 days.
* **For Children:** Dosages should be calculated based on body weight as per standard pediatric guidelines.

**3. Management Notes:**
* Treatment should be initiated based on strong clinical suspicion without waiting for lab confirmation.
* Monitor for complications like pneumonitis, meningitis, or ARDS.

*Source: Guidelines from the Indian Council of Medical Research (ICMR).*`,
    alert: `### Urgent PSA Script: Cholera Outbreak Alert

Here is the requested content, formatted for different channels. The language is simple, direct, and actionable to ensure clarity during an emergency.

**Target Audience:** Residents of the Saiha district relief camp, Mizoram.
**Channels:** Local Radio, SMS/Text Message Alerts
**Languages:** English & Mizo

---

#### **1. Radio Announcement Script (English)**

**(Sound of an urgent alert siren, fades to background)**

**Announcer:** "URGENT HEALTH ANNOUNCEMENT for all residents of the Saiha relief camp. A few cases of Cholera, a severe diarrhoeal disease, have been confirmed in the camp. Please follow these safety rules immediately:"

* **One:** Drink ONLY boiled water or water from official, sealed bottles. Do NOT drink from open sources.
* **Two:** Wash your hands with soap frequently, especially before eating and after using the toilet.
* **Three:** Eat only thoroughly cooked, hot food. Avoid raw vegetables or fruits unless you wash them with safe water yourself.
* **Four:** If you or a family member experience watery diarrhoea and vomiting, go to the camp medical center IMMEDIATELY. Do not wait. Free treatment is available.

**Announcer:** "This is a serious but treatable disease. Your cooperation is essential to stop the spread. Stay safe, and follow the instructions from health workers."

**(Repeat message)**

---

#### **2. SMS / Text Message Content**

**Character Count:** Designed to be under or close to the 160-character limit per message.

**English SMS:**
> Urgent Health Alert: Cholera cases in Saiha camp. Drink ONLY boiled/bottled water. Wash hands with soap. If watery diarrhoea/vomiting, go to medical center NOW.

**Mizo SMS:**
> Hriselna Pawimawh: Saiha camp-ah Cholera (phirpuar) hmuhchhuah a ni. Tui lum chauh in rawh. Sahbawnin kut sil fo rawh. Phirpuar/luakchhuak i neih chuan damdawi in pan nghal rawh..`,
  };

  const handleSend = async (messageText = input) => {
    if (!messageText.trim()) return;

    const newUserMessage = { text: messageText, from: "user" };
    setMessages(prev => [...prev, newUserMessage]);
    setInput("");
    setLoading(true);

    try {
      let aiResponse;
      const lowerCaseMessage = messageText.toLowerCase();

      // Check if the input matches one of the demo questions
      if (lowerCaseMessage.includes("dengue situation in assam")) {
        aiResponse = cannedResponses.dengue;
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate a quick response
      } else if (lowerCaseMessage.includes("measles cases in nagaland")) {
        aiResponse = cannedResponses.measles;
        await new Promise(resolve => setTimeout(resolve, 500));
      } else if (lowerCaseMessage.includes("scrub typhus")) {
        aiResponse = cannedResponses.scrubTyphus;
        await new Promise(resolve => setTimeout(resolve, 500));
      } else if (lowerCaseMessage.includes("radio") ) {
        aiResponse = cannedResponses.alert;
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        // --- If it's not a demo question, make a REAL API call ---
        const updatedHistory = [...messages, newUserMessage].map((msg) => ({
          role: msg.from === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        }));

        const res = await axios.post("/ai/therapist", {
          history: updatedHistory,
        });
        
        aiResponse = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t understand that.";
      }
      
      setMessages((prev) => [...prev, { text: aiResponse, from: "ai" }]);

    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [...prev, { text: "There was an error connecting to the assistant. Please try again.", from: "ai" }]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleClearChat = () => setMessages([]);
  const handleSuggestionClick = (suggestion) => handleSend(suggestion);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="flex bg-zinc-50 min-h-screen font-sans text-zinc-800">
      <Sidebar activePage="AI chatbot" />
      <div className="flex-1 flex flex-col">
        <header className="bg-white/80 backdrop-blur-lg border-b border-zinc-200 sticky top-0 z-10">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-zinc-800">AI Chatbot Assistance</h2>
                <p className="text-sm text-zinc-500">Your smart health assistant for quick insights.</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative p-2 rounded-full hover:bg-zinc-100 transition-colors"><Bell className="text-zinc-600" size={22}/><span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span></button>
                <img src="https://img.freepik.com/free-photo/portrait-mature-therapist-sitting-table-looking-camera_1098-18156.jpg?t=st=1758662169~exp=1758665769~hmac=369786476ca1199b21075534f87d8f5119705dea188ec41c2bc55a25c62327cd&w=2000" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-zinc-200 hover:ring-2 hover:ring-indigo-500 transition-all"/>
              </div>
            </div>
        </header>
        <main className="container mx-auto px-6 py-8 flex-1 grid grid-cols-3 gap-8 items-start">
          <div className="col-span-2 bg-white rounded-xl shadow-lg border border-zinc-200 flex flex-col h-[calc(100vh-12rem)]">
            <div className="p-4 border-b border-zinc-200 flex justify-between items-center">
              <h3 className="font-bold text-lg flex items-center gap-2 text-zinc-800"><Sparkles className="text-indigo-500" /> Arogya Sahayak</h3>
              {messages.length > 0 && (
                <button onClick={handleClearChat} className="text-xs font-semibold text-zinc-500 hover:text-red-500 flex items-center gap-1.5 py-1 px-2 rounded-md hover:bg-red-50 transition-colors"><RefreshCw size={12}/> Clear Chat</button>
              )}
            </div>
            <div ref={chatBoxRef} className="flex-1 flex flex-col p-6 overflow-y-auto space-y-6 bg-zinc-50/50">
              {messages.length === 0 ? (
                <WelcomeScreen handleSuggestionClick={handleSuggestionClick} />
              ) : (
                <>
                  {messages.map((msg, index) => <ChatBubble key={index} message={msg} />)}
                  {loading && (
                    <div className="flex items-end gap-3 animate-fadeInUp">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center shadow-sm shrink-0"><Bot size={16} className="text-indigo-600"/></div>
                      <div className="max-w-lg p-3 rounded-2xl bg-white rounded-bl-none border border-zinc-100 shadow-sm"><TypingAnimation /></div>
                    </div>
                  )}
                </>
              )}
            </div>
            <MessageInput input={input} setInput={setInput} handleSend={handleSend} loading={loading} />
          </div>
          <div className="col-span-1 space-y-6">
            <div className="bg-white p-5 rounded-xl shadow-lg border border-zinc-200">
              <h3 className="font-bold text-lg mb-4">Quick Help Panel</h3>
              <AccordionItem title="How to interpret outbreak data?">The AI provides summaries with key metrics like case numbers, positivity rates, and affected demographics. Look for **bolded text** for critical information.</AccordionItem>
              <AccordionItem title="How to request campaign material?">Simply ask the AI to "create a poster about..." or "draft a PSA for..." a specific disease and language. It will generate structured content for you.</AccordionItem>
              <AccordionItem title="How to report a new case?">You can report a new case using the "Report Live Case" feature in the main dashboard. The AI can help you structure the report text.</AccordionItem>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
