import React, { useState, useEffect } from 'react';
import { TOOLS } from './tools/ToolRegistry';
import { Modal } from './components/Modal';
import * as Icons from 'lucide-react';
import { Tool } from './types';
import { Calculators } from './tools/Calculators';
import { MediaTools } from './tools/MediaTools';
import { TextTools } from './tools/TextTools';
import { UtilityTools } from './tools/UtilityTools';

export default function App() {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [recentToolIds, setRecentToolIds] = useState<string[]>([]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('recentTools');
      if (stored) {
        setRecentToolIds(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleOpenTool = (tool: Tool) => {
    setActiveTool(tool);
    setRecentToolIds(prev => {
      const updated = [tool.id, ...prev.filter(id => id !== tool.id)].slice(0, 3);
      try {
        localStorage.setItem('recentTools', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (activeTool) {
      document.title = `${activeTool.name} - AI-PDF Scanner Multitools`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', activeTool.description);
      }
    } else {
      document.title = 'AI-PDF Scanner Multitools - Free Online Utility Hub';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'AI-PDF Scanner Multitools - A comprehensive collection of free online tools for PDF editing, format conversion, QR scanning, SEO checking, password generation, and more.');
      }
    }
  }, [activeTool]);

  const renderToolComponent = (tool: Tool) => {
    switch (tool.category) {
      case 'calc': return <Calculators toolId={tool.id} />;
      case 'text': return <TextTools toolId={tool.id} />;
      case 'media': return <MediaTools toolId={tool.id} />;
      case 'utility': return <UtilityTools toolId={tool.id} />;
      default: return <div>Tool not found</div>;
    }
  };

  const IconComponent = ({ name }: { name: string }) => {
    // @ts-ignore
    const Icon = Icons[name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')] || Icons.Wrench;
    return <Icon size={20} />;
  };

  const filteredTools = TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-main font-sans">
      <header className="h-[70px] bg-nav border-nav-bottom shadow-nav flex items-center justify-between px-4 sm:px-10 z-50 gap-4">
        {/* Hidden SEO Tags for visibility */}
        <div className="sr-only" aria-hidden="true">
          <h3>Collection of Free Online Tools</h3>
          <p>
            Welcome to AI-PDF Scanner Multitools, your comprehensive utility hub. Here you will find tools such as:
            YouTube Tag Extractor, YouTube Title Extractor, YouTube Description Extractor, SEO Checklist, 
            Website Traffic Estimator, YouTube Thumbnail Downloader, QR Code Scanner, QR Code Generator, 
            Password Generator, Password Strength Check, Merge Files, Merge PDFs, Color Picker Tool, 
            Unit Converter, Timer, Stopwatch, Age Calculator, Percentage Calculator, Discount Calculator, 
            BMI Calculator, Loan EMI Calculator, SIP Calculator, Hourly Rate Calculator, YouTube Revenue Estimator,
            ROI Calculator, Scientific Calculator, Video Format Converter, 
            Audio Format Converter, Audio Trimmer, PDF to eBook (EPUB), PDF to Kindle (MOBI/AZW3), 
            Edit PDF Document, Create PDF, PDF to Text Converter, Text to PDF Converter, 
            SEO Hashtag Generator, Word Counter, and Base64 Encoder Decoder.
          </p>
        </div>
        
        <h1 className="text-[20px] sm:text-[24px] font-[800] text-cyan-accent tracking-[-0.5px] flex items-center gap-2 glow-text cursor-pointer shrink-0 m-0">
          AI<span className="text-main-white hidden lg:inline">-PDF Scanner Multitools</span> 
          <span className="text-main-white lg:hidden">-PDF</span> 
        </h1>
        
        <div className="flex-1 max-w-md w-full relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icons.Search size={16} className="text-dim" />
          </div>
          <input 
            type="text" 
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-main border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-main-white focus:outline-none focus:border-cyan-accent/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button 
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-2 text-sm text-dim hover:text-cyan-accent transition-colors"
            title="Toggle Theme"
          >
            {theme === 'dark' ? <Icons.Sun size={18} /> : <Icons.Moon size={18} />}
            <span className="hidden sm:inline-block">Theme</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 text-sm text-dim hover:text-cyan-accent transition-colors"
            title="Print Page"
          >
            <Icons.Printer size={18} />
            <span className="hidden sm:inline-block">Print</span>
          </button>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'AI-PDF Scanner Multitools',
                  url: window.location.href
                }).catch(console.error);
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="flex items-center gap-2 text-sm text-dim hover:text-cyan-accent transition-colors"
            title="Share"
          >
            <Icons.Share2 size={18} />
            <span className="hidden sm:inline-block">Share</span>
          </button>
        </div>
      </header>
      
      {/* Social Stats Banner */}
      <div className="w-full flex justify-end px-4 sm:px-10 pt-2 pb-0 gap-3 text-xs sm:text-sm font-medium items-center max-w-[1400px] mx-auto">
        <div className="flex items-center gap-1.5 text-main-white px-3 py-1.5 bg-btn border border-cyan-accent/20 rounded-full glow-shadow-hover transition-all cursor-default">
          <Icons.Eye size={16} className="text-cyan-accent" />
          <span>10Cr+ Views</span>
        </div>
        <div className="flex items-center gap-1.5 text-main-white px-3 py-1.5 bg-btn border border-pink-500/20 rounded-full hover:border-pink-500/50 glow-shadow-hover transition-all cursor-pointer group">
          <Icons.Heart size={16} className="text-pink-500 group-hover:fill-pink-500 transition-all" />
          <span>1Cr+ Likes</span>
        </div>
        <button className="flex items-center gap-1.5 text-main bg-cyan-accent hover:bg-cyan-accent/90 px-4 py-1.5 rounded-full font-bold glow-shadow transition-all group">
          <Icons.Bell size={16} className="group-hover:scale-110 transition-transform" />
          <span>Subscribe</span>
        </button>
      </div>

      <main className="flex-1 px-4 sm:px-10 py-[10px] sm:py-[20px] flex flex-col gap-[24px] w-full max-w-[1400px] mx-auto">
        {!searchQuery && recentToolIds.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-main-white mb-4 flex items-center gap-2">
              <Icons.Clock size={20} className="text-cyan-accent" />
              Recent Tools
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-[20px]">
              {recentToolIds.map(id => {
                const tool = TOOLS.find(t => t.id === id);
                if (!tool) return null;
                return (
                  <div 
                    key={`recent-${tool.id}`}
                    className="bg-card border border-cyan-accent/20 rounded-xl p-[12px] sm:p-[20px] flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 sm:gap-4 glow-shadow-hover cursor-pointer group transition-all text-center sm:text-left"
                    onClick={() => handleOpenTool(tool)}
                  >
                    <div className="w-[32px] sm:w-[40px] h-[32px] sm:h-[40px] shrink-0 bg-cyan-accent/10 rounded-lg flex items-center justify-center text-cyan-accent font-bold">
                      <IconComponent name={tool.icon} />
                    </div>
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="text-[14px] sm:text-[16px] font-[700] text-main-white truncate">{tool.name}</h3>
                      <p className="text-[11px] sm:text-[12px] text-dim truncate">{tool.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-[20px] flex-1 items-start">
          {filteredTools.length === 0 && (
            <div className="col-span-full py-10 text-center text-dim text-lg">
              No tools found matching "{searchQuery}"
            </div>
          )}
          {filteredTools.map(tool => (
            <div 
              key={tool.id}
              className="bg-card border border-cyan-accent/10 rounded-xl p-[16px] sm:p-[24px] flex flex-col tool-card-gradient glow-shadow-hover cursor-pointer group h-full"
              onClick={() => handleOpenTool(tool)}
            >
              <div className="w-[32px] sm:w-[40px] h-[32px] sm:h-[40px] bg-cyan-accent/10 rounded-lg mb-[12px] sm:mb-[16px] flex items-center justify-center text-cyan-accent font-bold">
                <IconComponent name={tool.icon} />
              </div>
              <h2 className="text-[15px] sm:text-[18px] font-[700] mb-[4px] sm:mb-[8px] text-main-white leading-tight">{tool.name}</h2>
              <p className="text-[12px] sm:text-[13px] text-dim leading-[1.4] sm:leading-[1.5] mb-[16px] sm:mb-[20px] flex-1 line-clamp-2 md:line-clamp-none">{tool.description}</p>
              <div className="bg-btn border border-cyan-accent text-cyan-accent text-[10px] sm:text-[12px] font-[700] p-[8px] sm:p-[10px] rounded-[5px] uppercase tracking-[0.5px] text-center btn-hover-fx">
                Launch Tool
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-3 flex flex-wrap items-center justify-center sm:justify-between px-4 sm:px-10 text-[11px] text-dim border-t border-white/5 bg-nav/50">
        <div className="opacity-50 text-center sm:text-left mb-2 sm:mb-0">
          AIPDFMULTITOOL v2.0 &nbsp;•&nbsp; 100% Client-Side Encryption &nbsp;•&nbsp; &copy; 2026 Dinesh sankhala
        </div>
        <div className={`flex items-center gap-1.5 ${isOnline ? 'opacity-70 text-green-400' : 'opacity-100 text-red-400'}`}>
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'} ${isOnline ? 'animate-pulse' : ''}`}></div>
          <span className="font-medium tracking-wide uppercase">{isOnline ? 'Online' : 'Offline'}</span>
        </div>
      </footer>

      <Modal 
        isOpen={!!activeTool} 
        onClose={() => setActiveTool(null)} 
        title={activeTool?.name || ''}
      >
        {activeTool && renderToolComponent(activeTool)}
      </Modal>
    </div>
  );
}
