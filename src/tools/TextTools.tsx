import React, { useState, useEffect, useRef } from 'react';

export function TextTools({ toolId }: { toolId: string }) {
  if (toolId === 'txt-hashtag') return <SeoHashtagGenerator />;
  if (toolId === 'txt-word') return <WordCounter />;
  if (toolId === 'txt-base64') return <Base64Encoder />;
  if (toolId === 'txt-tts') return <TextToSpeech />;
  if (toolId === 'txt-stt') return <SpeechToText />;
  if (toolId === 'txt-json') return <JsonFormatter />;
  if (toolId === 'pdf-totext') return <PdfToText />;
  if (toolId === 'txt-topdf') return <TextToPdf />;
  return null;
}

function SeoHashtagGenerator() {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);

  const generate = () => {
    if (!topic.trim()) return;
    const words = topic.split(/\s+/).filter(w => w.length > 2);
    let tags = new Set<string>();
    
    // Generate trending-like hashtags
    const suffixes = ['tips', 'hack', 'viral', '2026', 'guide', 'pro', 'daily'];
    
    words.forEach(w => {
      tags.add('#' + w.toLowerCase().replace(/[^a-z0-9]/g, ''));
      tags.add('#' + w.toLowerCase().replace(/[^a-z0-9]/g, '') + suffixes[Math.floor(Math.random() * suffixes.length)]);
    });
    
    // Add some generic popular ones
    tags.add('#trending');
    tags.add('#viral');
    tags.add('#explorepage');
    tags.add('#foryou');
    
    setHashtags(Array.from(tags).sort(() => 0.5 - Math.random()).slice(0, 15));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    alert('Hashtags copied to clipboard!');
  };

  return (
    <div className="space-y-4">
      <input 
        type="text" 
        value={topic} 
        onChange={e => setTopic(e.target.value)} 
        placeholder="Enter topic or keywords (e.g. digital marketing, fitness...)" 
        className="w-full bg-btn border border-cyan-accent/30 rounded p-2 text-main-white focus:outline-none focus:border-cyan-accent transition-colors" 
      />
      <button 
        onClick={generate} 
        className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow"
      >
        Generate SEO Hashtags
      </button>
      
      {hashtags.length > 0 && (
        <div className="p-4 bg-nav border border-cyan-accent/30 rounded mt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {hashtags.map((tag, i) => (
              <span key={i} className="px-2 py-1 bg-btn text-cyan-accent border border-cyan-accent/50 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <button 
              onClick={copyToClipboard} 
              className="flex-1 border border-cyan-accent text-cyan-accent font-bold py-2 rounded hover:bg-cyan-accent/10 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              Copy All
            </button>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Generated Hashtags',
                    text: hashtags.join(' ')
                  }).catch(console.error);
                } else {
                   copyToClipboard();
                }
              }}
              className="flex-1 border border-cyan-accent text-cyan-accent font-bold py-2 rounded hover:bg-cyan-accent/10 transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              Share
            </button>
            <button 
              onClick={() => {
                const blob = new Blob([hashtags.join(' ')], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'hashtags.txt';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function TextAreaField({ value, onChange, placeholder, className = '' }: any) {
  return (
    <textarea 
      className={`w-full bg-btn border border-cyan-accent/30 rounded p-4 text-main-white focus:outline-none focus:border-cyan-accent transition-colors min-h-[150px] resize-y ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

function WordCounter() {
  const [text, setText] = useState('');
  
  const stats = {
    chars: text.length,
    words: text.trim().split(/\s+/).filter(w => w.length > 0).length,
    lines: text.split('\n').filter(l => l.trim().length > 0).length
  };

  return (
    <div className="space-y-4">
      <TextAreaField 
        value={text} 
        onChange={(e: any) => setText(e.target.value)} 
        placeholder="Type or paste your text here..."
      />
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Characters', val: stats.chars },
          { label: 'Words', val: stats.words },
          { label: 'Lines', val: stats.lines }
        ].map((s, i) => (
          <div key={i} className="bg-btn p-4 rounded border border-cyan-accent/20 text-center flex flex-col gap-1">
            <span className="text-2xl font-bold text-cyan-accent">{s.val}</span>
            <span className="text-sm text-dim">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode'|'decode'>('encode');

  useEffect(() => {
    try {
      if (mode === 'encode') {
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
      }
    } catch (e) {
      setOutput('Invalid format');
    }
  }, [input, mode]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 mb-4">
        <button 
          onClick={() => setMode('encode')} 
          className={`flex-1 py-2 rounded font-medium border border-cyan-accent transition-colors ${mode==='encode' ? 'bg-cyan-accent text-main' : 'text-cyan-accent hover:bg-cyan-accent/10'}`}
        >Encode</button>
        <button 
          onClick={() => setMode('decode')} 
          className={`flex-1 py-2 rounded font-medium border border-cyan-accent transition-colors ${mode==='decode' ? 'bg-cyan-accent text-main' : 'text-cyan-accent hover:bg-cyan-accent/10'}`}
        >Decode</button>
      </div>
      <TextAreaField value={input} onChange={(e: any) => setInput(e.target.value)} placeholder="Input text..." />
      {output && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button 
              onClick={() => { navigator.clipboard.writeText(output); alert("Copied output!"); }} 
              className="flex-1 border border-cyan-accent text-cyan-accent font-bold py-2 rounded hover:bg-cyan-accent/10 transition-colors text-sm flex justify-center items-center gap-2"
            >
              Copy
            </button>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'Base64 Output', text: output }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(output);
                  alert("Copied directly (Share not supported)");
                }
              }} 
              className="flex-1 border border-cyan-accent text-cyan-accent font-bold py-2 rounded hover:bg-cyan-accent/10 transition-colors text-sm flex justify-center items-center gap-2"
            >
              Share
            </button>
            <button 
              onClick={() => {
                const blob = new Blob([output], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'base64_output.txt';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow text-sm flex justify-center items-center gap-2"
            >
              Save file
            </button>
          </div>
          <div className="p-4 bg-btn rounded border border-cyan-accent/30 text-dim whitespace-pre-wrap word-break min-h-[100px]">
            {output}
          </div>
        </div>
      )}
      {!output && (
        <div className="p-4 bg-btn rounded border border-cyan-accent/30 text-dim whitespace-pre-wrap word-break min-h-[100px]">
          Output will appear here...
        </div>
      )}
    </div>
  );
}

function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = () => {
    if (!text || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="space-y-4">
      <TextAreaField value={text} onChange={(e: any) => setText(e.target.value)} placeholder="Enter text to speak..." />
      <div className="flex gap-4">
        <button onClick={speak} disabled={isSpeaking} className="flex-1 bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow disabled:opacity-50">Speak</button>
        <button onClick={stop} disabled={!isSpeaking} className="flex-1 border border-cyan-accent text-cyan-accent font-bold py-2 rounded hover:bg-cyan-accent/10 disabled:opacity-50">Stop</button>
      </div>
    </div>
  );
}

function SpeechToText() {
  const [text, setText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setText(prev => prev + ' ' + currentTranscript);
      };
      recognitionRef.current.onerror = (e: any) => {
        console.error('Speech recognition error', e);
        setIsListening(false);
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleListen = () => {
    if (!recognitionRef.current) return alert("Speech recognition not supported in this browser.");
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setText('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-btn min-h-[150px] border border-cyan-accent/30 rounded text-main-white">
        {text || <span className="text-dim/50">Listening output will appear here...</span>}
      </div>
      <button 
        onClick={toggleListen} 
        className={`w-full font-bold py-3 rounded transition-all ${isListening ? 'bg-red-500/20 text-red-400 border border-red-500 animate-pulse' : 'bg-cyan-accent text-main hover:glow-shadow'}`}
      >
        {isListening ? 'Listening... Click to Stop' : 'Start Listening'}
      </button>
    </div>
  );
}

function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatJson = () => {
    try {
      if (!input.trim()) { setOutput(''); setError(null); return; }
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-4">
      <TextAreaField value={input} onChange={(e: any) => setInput(e.target.value)} placeholder="Paste JSON here..." className="font-mono text-sm" />
      <button onClick={formatJson} className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Format JSON</button>
      {error && <div className="text-red-400 p-3 bg-red-900/20 rounded border border-red-900/50 text-sm">{error}</div>}
      {output && (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button 
              onClick={() => { navigator.clipboard.writeText(output); alert("Copied JSON!"); }} 
              className="flex-1 border border-cyan-accent text-cyan-accent font-bold py-2 rounded hover:bg-cyan-accent/10 transition-colors text-sm flex justify-center items-center gap-2"
            >
              Copy
            </button>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'JSON Formatted Output', text: output }).catch(console.error);
                } else {
                  navigator.clipboard.writeText(output);
                  alert("Copied directly (Share not supported)");
                }
              }} 
              className="flex-1 border border-cyan-accent text-cyan-accent font-bold py-2 rounded hover:bg-cyan-accent/10 transition-colors text-sm flex justify-center items-center gap-2"
            >
              Share
            </button>
            <button 
              onClick={() => {
                const blob = new Blob([output], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'formatted.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex-1 bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow text-sm flex justify-center items-center gap-2"
            >
              Save file
            </button>
          </div>
          <pre className="p-4 bg-btn rounded border border-cyan-accent/30 text-cyan-alt text-sm font-mono overflow-auto max-h-[300px]">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}

function PdfToText() {
  return (
    <div className="space-y-4">
      <div className="text-dim text-sm p-8 border border-white/10 rounded border-dashed bg-nav flex flex-col items-center justify-center gap-4 hover:border-cyan-accent/50 transition-colors cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-accent opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <div className="text-center">
          <p className="text-cyan-accent font-medium mb-1">Upload PDF Document</p>
          <p>Extract text from your file</p>
        </div>
      </div>
      <button className="w-full bg-nav text-dim border border-white/5 font-bold py-2 rounded cursor-not-allowed">
        Extract Text
      </button>
    </div>
  );
}

function TextToPdf() {
  const [text, setText] = useState('');
  return (
    <div className="space-y-4">
      <TextAreaField value={text} onChange={(e: any) => setText(e.target.value)} placeholder="Type or paste text to convert to PDF..." />
      <button className={`w-full font-bold py-2 rounded transition-shadow ${text.length > 0 ? 'bg-cyan-accent text-main hover:glow-shadow' : 'bg-nav text-dim border border-white/5 cursor-not-allowed'}`}>
        Download as PDF
      </button>
    </div>
  );
}
