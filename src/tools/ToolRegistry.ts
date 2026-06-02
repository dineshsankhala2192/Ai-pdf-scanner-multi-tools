import { Tool } from '../types';

export const TOOLS: Tool[] = [
  // Media
  { id: 'img-conv', name: 'Image Converter', description: 'Convert images to PNG, JPG, or WebP.', category: 'media', icon: 'image' },
  { id: 'img-comp', name: 'Image Compressor', description: 'Compress images to save space without losing much quality.', category: 'media', icon: 'minimize' },
  { id: 'img-crop', name: 'Image Cropper', description: 'Crop images to your desired dimensions.', category: 'media', icon: 'crop' },
  { id: 'vid-conv', name: 'Video Converter', description: 'Basic video format conversion stub.', category: 'media', icon: 'video' },
  { id: 'aud-conv', name: 'Audio Converter', description: 'Basic audio format conversion stub.', category: 'media', icon: 'music' },
  { id: 'aud-trim', name: 'Audio Trimmer', description: 'Trim start and end of audio files.', category: 'media', icon: 'scissors' },
  { id: 'pdf-ebook', name: 'PDF to eBook', description: 'Convert PDF documents to EPUB format.', category: 'media', icon: 'book' },
  { id: 'pdf-kindle', name: 'PDF to Kindle', description: 'Convert PDF documents to MOBI/AZW3 format.', category: 'media', icon: 'book-open' },
  { id: 'pdf-edit', name: 'Edit PDF', description: 'Annotate and modify existing PDF documents.', category: 'media', icon: 'edit-2' },
  { id: 'pdf-create', name: 'Create PDF', description: 'Create new PDF documents from text or images.', category: 'media', icon: 'file-plus' },
  
  // Calculators
  { id: 'calc-age', name: 'Age Calculator', description: 'Calculate exact age from date of birth.', category: 'calc', icon: 'calendar' },
  { id: 'calc-emi', name: 'EMI Calculator', description: 'Calculate monthly loan EMI.', category: 'calc', icon: 'calculator' },
  { id: 'calc-sip', name: 'SIP Calculator', description: 'Calculate mutual fund returns.', category: 'calc', icon: 'trending-up' },
  { id: 'calc-bmi', name: 'BMI Calculator', description: 'Check your Body Mass Index.', category: 'calc', icon: 'activity' },
  { id: 'calc-hourly', name: 'Hourly Rate / Earning', description: 'Calculate freelance hourly rate and project earnings.', category: 'calc', icon: 'briefcase' },
  { id: 'calc-yt-rev', name: 'YouTube Revenue Estimator', description: 'Estimate YouTube ad earnings based on views and CPM.', category: 'calc', icon: 'youtube' },
  { id: 'calc-roi', name: 'ROI Calculator', description: 'Calculate Return on Investment and net profit.', category: 'calc', icon: 'percent' },
  { id: 'calc-discount', name: 'Discount Calculator', description: 'Calculate final price after discount and amount saved.', category: 'calc', icon: 'tag' },
  { id: 'calc-loan-comp', name: 'Loan Comparator', description: 'Compare two different loan scenarios side-by-side.', category: 'calc', icon: 'git-compare' },
  
  // Utility
  { id: 'util-seo-check', name: 'SEO Checklist', description: 'Step-by-step checklist to audit on-page SEO.', category: 'utility', icon: 'check-square' },
  { id: 'util-traffic', name: 'Website Traffic Estimator', description: 'Estimate website traffic and analyze SEO metadata.', category: 'utility', icon: 'bar-chart' },
  { id: 'util-yt-thumb', name: 'YT Thumbnail Downloader', description: 'Instantly download high-quality thumbnails from any YouTube video.', category: 'utility', icon: 'youtube' },
  { id: 'util-qr-scan', name: 'QR Code Scanner', description: 'Scan QR codes from images.', category: 'utility', icon: 'camera' },
  { id: 'util-qr', name: 'QR Code Generator', description: 'Generate QR codes from text or URLs.', category: 'utility', icon: 'qr-code' },
  { id: 'util-pass', name: 'Password Generator', description: 'Create strong random passwords.', category: 'utility', icon: 'key' },
  { id: 'util-pass-check', name: 'Password Strength Check', description: 'Check the security strength of a password.', category: 'utility', icon: 'shield' },
  { id: 'util-file-merge', name: 'Merge Files', description: 'Merge multiple documents or PDFs into one.', category: 'utility', icon: 'layers' },
  { id: 'util-color', name: 'Color Picker Tool', description: 'Pick and convert colors.', category: 'utility', icon: 'palette' },
  { id: 'util-unit', name: 'Unit Converter', description: 'Convert between different units.', category: 'utility', icon: 'refresh-ccw' },
  { id: 'util-timer', name: 'Timer / Stopwatch', description: 'Simple timer and stopwatch.', category: 'utility', icon: 'clock' },
  
  // Text
  { id: 'pdf-totext', name: 'PDF to Text', description: 'Extract plain text from PDF documents.', category: 'text', icon: 'file-text' },
  { id: 'txt-topdf', name: 'Text to PDF', description: 'Convert plain text into PDF documents.', category: 'text', icon: 'file' },
  { id: 'txt-hashtag', name: 'SEO Hashtag Generator', description: 'Generate trending hashtags for your topics.', category: 'text', icon: 'hash' },
  { id: 'txt-word', name: 'Word Counter', description: 'Count characters, words, and lines.', category: 'text', icon: 'type' },
  { id: 'txt-base64', name: 'Base64 Encoder/Decoder', description: 'Encode or decode Base64 strings.', category: 'text', icon: 'hash' },
  { id: 'txt-tts', name: 'Text to Speech', description: 'Convert text to spoken audio.', category: 'text', icon: 'mic' },
  { id: 'txt-stt', name: 'Speech to Text', description: 'Convert spoken words to text.', category: 'text', icon: 'mic-2' },
  { id: 'txt-json', name: 'JSON Formatter', description: 'Format and validate JSON code.', category: 'text', icon: 'code' }
];
