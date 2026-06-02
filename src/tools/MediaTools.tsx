import React, { useState, useRef } from 'react';

export function MediaTools({ toolId }: { toolId: string }) {
  if (toolId === 'img-conv') return <ImageConverter />;
  if (toolId === 'img-comp') return <ImageCompressor />;
  if (toolId === 'img-crop') return <ImageCropper />;
  if (toolId === 'vid-conv') return <MockMediaTool type="Video" title="Video Converter" />;
  if (toolId === 'aud-conv') return <MockMediaTool type="Audio" title="Audio Converter" />;
  if (toolId === 'aud-trim') return <MockMediaTool type="Audio" title="Audio Trimmer" />;
  if (toolId === 'pdf-ebook') return <MockMediaTool type="PDF document" title="PDF to EPUB eBook Converter" />;
  if (toolId === 'pdf-kindle') return <MockMediaTool type="PDF document" title="PDF to Kindle (MOBI/AZW3) Converter" />;
  if (toolId === 'pdf-edit') return <MockMediaTool type="PDF document" title="Edit PDF Document" />;
  if (toolId === 'pdf-create') return <MockMediaTool type="Content (Text/Images)" title="Create new PDF Document" />;
  return null;
}

function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [format, setFormat] = useState('image/png');
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleConvert = () => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      setResult(canvas.toDataURL(format));
    };
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-dim file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-btn file:text-cyan-accent file:font-semibold hover:file:bg-cyan-accent/10" />
      <select value={format} onChange={e => setFormat(e.target.value)} className="w-full bg-btn border border-cyan-accent/30 rounded p-2 text-main-white focus:outline-none">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
        <option value="image/webp">WebP</option>
      </select>
      <button onClick={handleConvert} disabled={!file} className="w-full bg-cyan-accent text-main font-bold py-2 rounded disabled:opacity-50 hover:glow-shadow transition-shadow">Convert Image</button>
      <canvas ref={canvasRef} className="hidden" />
      {result && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <img src={result} alt="Converted" className="max-w-full h-auto max-h-[200px] border border-cyan-accent/30 rounded" />
          <div className="flex gap-2 w-full">
            <button 
              onClick={async () => {
                if (navigator.share) {
                  try {
                    const response = await fetch(result);
                    const blob = await response.blob();
                    const fileToShare = new File([blob], `converted.${format.split('/')[1]}`, { type: format });
                    await navigator.share({
                      title: 'Converted Image',
                      files: [fileToShare]
                    });
                  } catch (e) {
                    console.error("Error sharing", e);
                    alert("Could not share image.");
                  }
                } else {
                  alert("Share feature is not supported on this browser.");
                }
              }}
              className="flex-1 bg-btn border border-cyan-accent text-cyan-accent px-6 py-2 rounded hover:bg-cyan-accent hover:text-main transition-colors flex justify-center items-center gap-2"
            >
              Share Image
            </button>
            <a href={result} download={`converted.${format.split('/')[1]}`} className="flex-1 text-center bg-cyan-accent text-main font-bold px-6 py-2 rounded hover:glow-shadow transition-shadow flex justify-center items-center gap-2">Download File</a>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [result, setResult] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleCompress = () => {
    if (!file) return;
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      setResult(canvas.toDataURL('image/jpeg', quality));
    };
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-dim file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-btn file:text-cyan-accent file:font-semibold hover:file:bg-cyan-accent/10" />
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-cyan-accent">Quality: {quality * 100}%</label>
        <input type="range" min="0.1" max="1" step="0.1" value={quality} onChange={e => setQuality(parseFloat(e.target.value))} className="w-full accent-cyan-accent" />
      </div>
      <button onClick={handleCompress} disabled={!file} className="w-full bg-cyan-accent text-main font-bold py-2 rounded disabled:opacity-50 hover:glow-shadow transition-shadow">Compress Image</button>
      <canvas ref={canvasRef} className="hidden" />
      {result && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <img src={result} alt="Compressed" className="max-w-full h-auto max-h-[200px] border border-cyan-accent/30 rounded" />
          <div className="flex gap-2 w-full">
            <button 
              onClick={async () => {
                if (navigator.share) {
                  try {
                    const response = await fetch(result);
                    const blob = await response.blob();
                    const fileToShare = new File([blob], 'compressed.jpg', { type: 'image/jpeg' });
                    await navigator.share({
                      title: 'Compressed Image',
                      files: [fileToShare]
                    });
                  } catch (e) {
                    console.error("Error sharing", e);
                    alert("Could not share image.");
                  }
                } else {
                  alert("Share feature is not supported on this browser.");
                }
              }}
              className="flex-1 bg-btn border border-cyan-accent text-cyan-accent px-6 py-2 rounded hover:bg-cyan-accent hover:text-main transition-colors flex justify-center items-center gap-2"
            >
              Share Image
            </button>
            <a href={result} download="compressed.jpg" className="flex-1 text-center bg-cyan-accent text-main font-bold px-6 py-2 rounded hover:glow-shadow transition-shadow flex justify-center items-center gap-2">Download</a>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageCropper() {
  // A simplified placeholder for cropper logic
  return (
    <div className="space-y-4 text-center">
      <p className="text-dim">Basic image cropping tool.</p>
      <input type="file" accept="image/*" className="w-full text-dim file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-btn file:text-cyan-accent file:font-semibold hover:file:bg-cyan-accent/10 block" />
      <div className="h-[200px] w-full border-2 border-dashed border-cyan-accent/30 rounded flex items-center justify-center text-dim bg-nav/50">
        Cropping UI workspace...
      </div>
      <button className="w-full bg-cyan-accent text-main font-bold py-2 rounded hover:glow-shadow transition-shadow">Apply Crop</button>
    </div>
  );
}

function MockMediaTool({ type, title }: { type: string, title: string }) {
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const simulate = () => {
    if (processing || done) return;
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-6 text-center py-4">
      <p className="text-dim text-sm text-center mb-6">Select a {type.toLowerCase()} file to process. (Simulated for frontend-only demo).</p>
      
      <input type="file" accept={`${type.toLowerCase()}/*`} className="w-full text-dim file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-btn file:text-cyan-accent file:font-semibold hover:file:bg-cyan-accent/10 block mb-4" />
      
      <button onClick={simulate} disabled={processing || done} className="w-full bg-cyan-accent text-main font-bold py-3 rounded disabled:opacity-50 hover:glow-shadow transition-all relative overflow-hidden">
        {processing ? 'Processing...' : done ? 'Success!' : `Start ${title}`}
        {processing && <div className="absolute inset-0 bg-cyan-alt/20 animate-pulse" />}
      </button>
      
      {done && (
         <div className="p-4 bg-btn/50 rounded border border-cyan-accent/30">
            <p className="text-cyan-accent mb-3">File processed successfully!</p>
            <button onClick={() => setDone(false)} className="mx-auto block text-sm text-dim hover:text-white underline">Process another</button>
         </div>
      )}
    </div>
  );
}
