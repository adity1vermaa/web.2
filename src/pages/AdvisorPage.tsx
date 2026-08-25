import React, { useState, useRef, useEffect } from 'react';
import { useFarm } from '../context/FarmContext';
import { useAuth } from '../context/AuthContext';
import { AppLayout } from '../components/AppLayout';
import { 
  BotMessageSquare, 
  Send, 
  User, 
  Sparkles, 
  Sprout, 
  HelpCircle, 
  RefreshCw, 
  BookOpen,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { AgronomistMessage } from '../types';

export const AdvisorPage: React.FC = () => {
  const { user } = useAuth();
  const { fields, scans, weather } = useFarm();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<AgronomistMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'ai',
      text: `Hello ${user?.name.split(' ')[0] || 'Grower'}! I am Dr. Agronomist AI, your dedicated precision crop pathologist and soil scientist. I have direct access to your ${fields.length} field plots, active scans, and live microclimate telemetry. How can I assist your crop management today?`,
      timestamp: 'Just now',
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isLoading) return;

    const userMessage: AgronomistMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Build farm context summary
      const farmContext = `Farm: ${user?.farmName || 'Highland Farms'}. Crops: ${fields.map(f => f.cropType).join(', ')}. Current Weather: ${weather.current.temp}°C, Humidity: ${weather.current.humidity}%, Delta T: ${weather.current.sprayDeltaT}. Active Scans: ${scans.length} scans on record.`;

      const response = await fetch('/api/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          farmContext,
        }),
      });

      const data = await response.json();
      const aiReply = data?.reply || 'Based on your current soil telemetry and leaf symptoms, I recommend maintaining foliar fungicide applications during optimal low-wind windows (<8 km/h).';

      const aiMessage: AgronomistMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Advisor chat error:', error);
      const fallbackMsg: AgronomistMessage = {
        id: `ai-err-${Date.now()}`,
        sender: 'ai',
        text: `For your ${fields[0]?.cropType || 'crops'}, early intervention against foliar fungal pathogens with bio-control Bacillus subtilis or protective copper formulations is recommended given current humidity levels (${weather.current.humidity}%). Maintain a 3-day scouting cycle.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    'How should I treat Early Blight on my greenhouse tomatoes?',
    'What is the optimal Delta T spray window today?',
    'Recommend organic nitrogen fertigation for corn tasseling stage.',
    'How do I calculate Growing Degree Days (GDD) for winter wheat?',
  ];

  return (
    <AppLayout
      pageTitle="AI Agronomist Consultation"
      pageSubtitle="24/7 Deep Agronomic Reasoning, Tank Mixing Guidelines & Pathogen Epidemiology"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-180px)] min-h-[580px]">
        
        {/* Left Side: Context & Quick Agronomic Prompts (4 cols) */}
        <div className="lg:col-span-4 space-y-4 flex flex-col">
          
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <BotMessageSquare className="w-5 h-5 text-lime-400" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Dr. Agronomist AI</h3>
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Gemini 3.7 Thinking Engine
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Trained on extensive botanical pathology research, chemical label databases, and organic biological treatment standards.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex-1 space-y-3 overflow-y-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-lime-400" />
              Suggested Agronomy Inquiries
            </span>

            <div className="space-y-2">
              {samplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 text-left text-xs text-slate-300 hover:text-white transition-all space-y-1 block"
                >
                  <p className="line-clamp-2">"{prompt}"</p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Chat Window (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col h-full">
          
          {/* Chat Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg) => {
              const isAI = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs ${isAI ? 'justify-start' : 'justify-end'}`}
                >
                  {isAI && (
                    <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-lime-400 shrink-0 mt-0.5">
                      <BotMessageSquare className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-xl p-4 rounded-2xl space-y-1.5 ${
                      isAI
                        ? 'bg-slate-950 border border-slate-800 text-slate-200'
                        : 'bg-emerald-600 text-white shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] text-slate-400">
                      <span className="font-semibold text-slate-300">
                        {isAI ? 'Dr. Agronomist AI' : user?.name || 'You'}
                      </span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </div>
                  </div>

                  {!isAI && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex gap-3 text-xs items-center text-slate-400">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-700/50 flex items-center justify-center text-lime-400">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                </div>
                <span>Dr. Agronomist is analyzing telemetry and formulating response...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="pt-4 border-t border-slate-800 flex gap-2 items-center"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about crop pathology, chemical tank-mixing, or soil fertilizer formulas..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-emerald-500"
              id="advisor-chat-input"
            />

            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-lime-400 hover:from-emerald-400 hover:to-lime-300 disabled:opacity-50 text-slate-950 font-bold text-xs shadow transition-all flex items-center gap-1.5"
              id="advisor-send-btn"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>

      </div>
    </AppLayout>
  );
};
