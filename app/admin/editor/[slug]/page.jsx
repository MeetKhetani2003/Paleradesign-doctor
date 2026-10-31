'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Save, 
  ExternalLink, 
  Upload, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  ImageIcon, 
  Palette, 
  Smartphone, 
  Tablet, 
  Monitor, 
  CheckCircle2, 
  Loader2, 
  Layers, 
  Eye, 
  Type, 
  Sparkles, 
  Share2,
  Clock,
  MessageSquare,
  Globe,
  Award,
  Shield,
  HelpCircle,
  Download,
  Code,
  Sliders,
  ChevronDown,
  Layout
} from 'lucide-react';
import DynamicProfileView, { ALL_ICONS } from '@/components/DynamicProfileView';

export default function VisualEditorPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('sections');
  const [previewDevice, setPreviewDevice] = useState('mobile');
  const [uploadingTarget, setUploadingTarget] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch(`/api/profiles/${slug}`);
        const data = await res.json();
        if (data.profile) {
          setProfile(data.profile);
        } else {
          alert('Profile not found');
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [slug]);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/profiles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
      } else {
        alert(data.error || 'Failed to save changes');
      }
    } catch (err) {
      alert('Error saving: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  // Upload handler for GridFS
  const handleFileUpload = async (e, callbackKey, sectionId = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingTarget(sectionId ? `${callbackKey}-${sectionId}` : callbackKey);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.success && data.url) {
        if (sectionId) {
          setProfile(prev => ({
            ...prev,
            sections: prev.sections.map(s => s.id === sectionId ? { ...s, thumbnailUrl: data.url } : s)
          }));
        } else if (callbackKey === 'avatarUrl') {
          setProfile(prev => ({ ...prev, avatarUrl: data.url }));
        } else if (callbackKey === 'backgroundImageUrl') {
          setProfile(prev => ({
            ...prev,
            theme: { ...prev.theme, backgroundImageUrl: data.url }
          }));
        } else if (callbackKey === 'brandLogoUrl') {
          setProfile(prev => ({ ...prev, brandLogoUrl: data.url }));
        }
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    } finally {
      setUploadingTarget(null);
    }
  };

  // Section reordering
  const moveSection = (index, direction) => {
    const newSections = [...profile.sections];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newSections.length) return;

    const temp = newSections[index];
    newSections[index] = newSections[targetIndex];
    newSections[targetIndex] = temp;

    const updated = newSections.map((s, idx) => ({ ...s, order: idx + 1 }));
    setProfile(prev => ({ ...prev, sections: updated }));
  };

  // Add new section block
  const addSection = (type) => {
    const newId = `sec-${Date.now()}`;
    const newOrder = (profile.sections?.length || 0) + 1;
    let newBlock;

    if (type === 'button') {
      newBlock = {
        id: newId,
        type: 'button',
        order: newOrder,
        buttonTitle: 'New Interactive Button',
        buttonSubtitle: 'Custom subtitle description',
        buttonIcon: 'globe',
        buttonTheme: 'amber',
        thumbnailUrl: '',
        thumbnailOpacity: 35,
        actionType: 'url',
        actionTarget: 'https://',
        customBg: '',
        customBorderColor: '',
        customTitleColor: '',
        customSubtitleColor: '',
        customIconBg: '',
        customIconColor: ''
      };
    } else if (type === 'text_block') {
      newBlock = {
        id: newId,
        type: 'text_block',
        order: newOrder,
        textContent: 'Write custom announcement, notes or section title here...',
        textType: 'paragraph',
        textAlign: 'center',
        textColor: '#FFFFFF',
        fontSize: 14,
        textBgColor: ''
      };
    } else if (type === 'feature_grid') {
      newBlock = {
        id: newId,
        type: 'feature_grid',
        order: newOrder,
        gridColumns: 4,
        gridItems: [
          { icon: 'star', title: 'Highlight 1', subtitle: 'Detail' },
          { icon: 'award', title: 'Highlight 2', subtitle: 'Detail' },
          { icon: 'shield-check', title: 'Highlight 3', subtitle: 'Detail' },
          { icon: 'sparkles', title: 'Highlight 4', subtitle: 'Detail' }
        ]
      };
    } else if (type === 'badge_pill') {
      newBlock = {
        id: newId,
        type: 'badge_pill',
        order: newOrder,
        pillText: 'Your Custom Trust Badge',
        pillIcon: 'shield-check',
        pillBorderColor: '#F59E0B',
        pillTextColor: '#FDE68A',
        pillBgColor: 'rgba(2, 6, 23, 0.8)'
      };
    } else if (type === 'html_embed') {
      newBlock = {
        id: newId,
        type: 'html_embed',
        order: newOrder,
        embedHtml: '<div class="p-3 bg-slate-900 text-center text-xs text-amber-300">Custom HTML / Map / Iframe embed here</div>'
      };
    }

    setProfile(prev => ({
      ...prev,
      sections: [...(prev.sections || []), newBlock]
    }));
  };

  const removeSection = (id) => {
    setProfile(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== id)
    }));
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white space-x-2">
        <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
        <span className="text-sm">Loading Visual Editor...</span>
      </div>
    );
  }

  const iconOptions = Object.keys(ALL_ICONS);

  return (
    <div className="h-screen flex flex-col bg-[#030712] text-white overflow-hidden font-sans select-none">
      
      {/* Top Header Bar */}
      <header className="h-14 border-b border-slate-800 bg-[#071126] px-4 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">{profile.name}</span>
            <span className="text-[11px] font-mono text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              /{profile.slug}
            </span>
          </div>
        </div>

        {/* Viewport Toggles, Downloads & Save */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Viewport Mode Toggles */}
          <div className="hidden md:flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800 text-xs">
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-md flex items-center gap-1 ${previewDevice === 'mobile' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Mobile Device View"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile</span>
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`p-1.5 rounded-md flex items-center gap-1 ${previewDevice === 'tablet' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Tablet Device View"
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet</span>
            </button>
          </div>

          {/* DOWNLOAD & EXPORT DROPDOWN (KEY USER REQUIREMENT!) */}
          <div className="relative">
            <button
              onClick={() => setIsDownloadMenuOpen(!isDownloadMenuOpen)}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Page</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {isDownloadMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-[#0b152d] border border-blue-400/40 shadow-2xl p-2 z-50 text-xs space-y-1">
                <div className="px-3 py-1.5 border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400">
                  Export Options for /{profile.slug}
                </div>

                <a
                  href={`/api/export/${profile.slug}?format=zip`}
                  download
                  onClick={() => setIsDownloadMenuOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-600/20 text-slate-200 hover:text-white transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Standalone Next.js Project (.zip)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Turnkey project ready to run with `npm install` as its own homepage!</div>
                  </div>
                </a>

                <a
                  href={`/api/export/${profile.slug}?format=html`}
                  download
                  onClick={() => setIsDownloadMenuOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-600/20 text-slate-200 hover:text-white transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-emerald-400/20 text-emerald-300 shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Single-File Website (.html)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Zero-setup HTML that double-clicks and runs in any browser!</div>
                  </div>
                </a>

                <a
                  href={`/api/export/${profile.slug}?format=json`}
                  download
                  onClick={() => setIsDownloadMenuOpen(false)}
                  className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-600/20 text-slate-200 hover:text-white transition-colors"
                >
                  <div className="p-1.5 rounded-lg bg-cyan-400/20 text-cyan-300 shrink-0">
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-white">Profile Schema (.json)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Raw JSON backup to import into any platform.</div>
                  </div>
                </a>
              </div>
            )}
          </div>

          <Link
            href={`/${profile.slug}`}
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-xs text-slate-300 hover:text-amber-400 px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 transition-colors"
          >
            <span>Live Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-amber-950/40 cursor-pointer"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saveSuccess ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-950" /> : <Save className="w-3.5 h-3.5" />}
            <span>{saving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Page'}</span>
          </button>
        </div>
      </header>

      {/* Split Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT COLUMN: VISUAL CONTROLS */}
        <aside className="w-full lg:w-[490px] xl:w-[540px] border-r border-slate-800 bg-[#071126]/60 backdrop-blur-md flex flex-col shrink-0 overflow-hidden">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-slate-800 bg-[#071126] text-xs overflow-x-auto shrink-0">
            <button
              onClick={() => setActiveTab('sections')}
              className={`py-3 px-3.5 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${activeTab === 'sections' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Sections &amp; Buttons</span>
            </button>

            <button
              onClick={() => setActiveTab('identity')}
              className={`py-3 px-3.5 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${activeTab === 'identity' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>Identity &amp; Avatar</span>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`py-3 px-3.5 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${activeTab === 'theme' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Theme &amp; BG</span>
            </button>

            <button
              onClick={() => setActiveTab('actions')}
              className={`py-3 px-3.5 font-bold border-b-2 flex items-center gap-1.5 whitespace-nowrap transition-colors ${activeTab === 'actions' ? 'border-amber-400 text-amber-400 bg-amber-400/5' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quick Circles</span>
            </button>
          </div>

          {/* Tab Content Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            
            {/* TAB 1: SECTIONS & BUTTONS BUILDER */}
            {activeTab === 'sections' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-white">Dynamic Sections</h2>
                    <p className="text-[11px] text-slate-400">Position buttons, text &amp; grids in any order</p>
                  </div>

                  {/* Add Block Dropdown / Buttons */}
                  <div className="flex items-center gap-1 flex-wrap">
                    <button
                      onClick={() => addSection('button')}
                      className="px-2.5 py-1 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold hover:bg-amber-400 hover:text-slate-950 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Button</span>
                    </button>
                    <button
                      onClick={() => addSection('text_block')}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Text</span>
                    </button>
                    <button
                      onClick={() => addSection('feature_grid')}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Grid</span>
                    </button>
                    <button
                      onClick={() => addSection('html_embed')}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-[11px] font-bold hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <Code className="w-3 h-3" />
                      <span>Embed</span>
                    </button>
                  </div>
                </div>

                {/* Ordered Sections List */}
                <div className="space-y-3">
                  {(profile.sections || []).map((sec, idx) => (
                    <div 
                      key={sec.id}
                      className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3 relative group"
                    >
                      {/* Section Header with Reorder Arrows */}
                      <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-800/80">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="font-bold text-white uppercase text-[11px]">
                            {sec.type === 'button' ? '🔗 Interactive Button' : (sec.type === 'text_block' ? '📝 Custom Text Block' : (sec.type === 'feature_grid' ? '📊 Feature Highlights' : (sec.type === 'html_embed' ? '💻 Custom HTML Embed' : '🛡️ Badge Pill')))}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveSection(idx, -1)}
                            disabled={idx === 0}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveSection(idx, 1)}
                            disabled={idx === profile.sections.length - 1}
                            className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white disabled:opacity-30"
                            title="Move Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => removeSection(sec.id)}
                            className="p-1 rounded bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* COMPLETE CONTROL: BUTTON BLOCK */}
                      {sec.type === 'button' && (
                        <div className="space-y-3 text-xs">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Title</label>
                              <input
                                type="text"
                                value={sec.buttonTitle || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, buttonTitle: val } : s)
                                  }));
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-bold"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Subtitle</label>
                              <input
                                type="text"
                                value={sec.buttonSubtitle || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, buttonSubtitle: val } : s)
                                  }));
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                              />
                            </div>
                          </div>

                          {/* Theme Preset OR Custom Color Control */}
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Theme Preset</label>
                              <select
                                value={sec.buttonTheme || 'amber'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, buttonTheme: val } : s)
                                  }));
                                }}
                                className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                              >
                                <option value="amber">Amber Gold</option>
                                <option value="red">Emergency Red</option>
                                <option value="cyan">Cyan Teal</option>
                                <option value="emerald">Emerald Green</option>
                                <option value="blue">Royal Blue</option>
                                <option value="indigo">Indigo Violet</option>
                                <option value="purple">Purple Pink</option>
                                <option value="slate">Slate Dark</option>
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Icon (40+ Choices)</label>
                              <select
                                value={sec.buttonIcon || 'globe'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, buttonIcon: val } : s)
                                  }));
                                }}
                                className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                              >
                                {iconOptions.map(ico => (
                                  <option key={ico} value={ico}>{ico}</option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Action Target</label>
                              <select
                                value={sec.actionType || 'url'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, actionType: val } : s)
                                  }));
                                }}
                                className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                              >
                                <option value="url">Open External URL</option>
                                <option value="modal_booking">Open Booking Modal</option>
                                <option value="modal_quals">Open Qualifications Modal</option>
                                <option value="modal_specialties">Open Specialties Modal</option>
                                <option value="call">Call Phone Directly</option>
                                <option value="whatsapp">Open WhatsApp Chat</option>
                              </select>
                            </div>
                          </div>

                          {/* Custom Color Overrides (Full Control!) */}
                          <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                            <span className="font-bold text-[10px] uppercase text-amber-300 block">Custom Color Overrides</span>
                            <div className="grid grid-cols-3 gap-2">
                              <div>
                                <label className="text-[9px] uppercase text-slate-400 block mb-0.5">Custom Card Background</label>
                                <input
                                  type="text"
                                  placeholder="e.g. #111827 or linear-gradient(...)"
                                  value={sec.customBg || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setProfile(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === sec.id ? { ...s, customBg: val } : s)
                                    }));
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] uppercase text-slate-400 block mb-0.5">Border Color</label>
                                <input
                                  type="text"
                                  placeholder="e.g. #F59E0B"
                                  value={sec.customBorderColor || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setProfile(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === sec.id ? { ...s, customBorderColor: val } : s)
                                    }));
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white"
                                />
                              </div>
                              <div>
                                <label className="text-[9px] uppercase text-slate-400 block mb-0.5">Title Text Color</label>
                                <input
                                  type="text"
                                  placeholder="e.g. #FFFFFF"
                                  value={sec.customTitleColor || ''}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setProfile(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === sec.id ? { ...s, customTitleColor: val } : s)
                                    }));
                                  }}
                                  className="w-full px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Blended Right-Side Thumbnail Image/GIF Upload */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="text-[10px] uppercase font-bold text-slate-400">
                                Right Blended Photo / GIF Thumbnail
                              </label>
                              <span className="text-[10px] text-slate-400">Opacity: {sec.thumbnailOpacity ?? 30}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                placeholder="/assets/thumb.jpg or GridFS URL"
                                value={sec.thumbnailUrl || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, thumbnailUrl: val } : s)
                                  }));
                                }}
                                className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                              />
                              <label className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shrink-0">
                                <Upload className="w-3.5 h-3.5" />
                                <span>{uploadingTarget === `thumb-${sec.id}` ? 'Uploading...' : 'Upload'}</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={(e) => handleFileUpload(e, 'thumb', sec.id)}
                                />
                              </label>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={sec.thumbnailOpacity ?? 30}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                setProfile(prev => ({
                                  ...prev,
                                  sections: prev.sections.map(s => s.id === sec.id ? { ...s, thumbnailOpacity: val } : s)
                                }));
                              }}
                              className="w-full mt-1.5 accent-amber-400"
                            />
                          </div>

                          {sec.actionType !== 'modal_booking' && sec.actionType !== 'modal_quals' && sec.actionType !== 'modal_specialties' && (
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Target Destination (URL, Tel, WhatsApp)</label>
                              <input
                                type="text"
                                value={sec.actionTarget || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, actionTarget: val } : s)
                                  }));
                                }}
                                placeholder="https://... or tel:+91... or https://wa.me/..."
                                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* COMPLETE CONTROL: TEXT BLOCK */}
                      {sec.type === 'text_block' && (
                        <div className="space-y-2.5 text-xs">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Text Content</label>
                            <textarea
                              rows={2}
                              value={sec.textContent || ''}
                              onChange={(e) => {
                                const val = e.target.value;
                                setProfile(prev => ({
                                  ...prev,
                                  sections: prev.sections.map(s => s.id === sec.id ? { ...s, textContent: val } : s)
                                }));
                              }}
                              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                            ></textarea>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Style</label>
                              <select
                                value={sec.textType || 'paragraph'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, textType: val } : s)
                                  }));
                                }}
                                className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                              >
                                <option value="h1">Header 1 (XL)</option>
                                <option value="h2">Header 2 (Large)</option>
                                <option value="h3">Subheader (Gold)</option>
                                <option value="paragraph">Paragraph</option>
                                <option value="callout">Callout Box</option>
                                <option value="quote">Quote Block</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Align</label>
                              <select
                                value={sec.textAlign || 'center'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, textAlign: val } : s)
                                  }));
                                }}
                                className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                              >
                                <option value="left">Left</option>
                                <option value="center">Center</option>
                                <option value="right">Right</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Text Color</label>
                              <input
                                type="color"
                                value={sec.textColor || '#FFFFFF'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, textColor: val } : s)
                                  }));
                                }}
                                className="w-full h-7 bg-slate-950 border border-slate-700 rounded-lg cursor-pointer"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Font Size ({sec.fontSize || 14}px)</label>
                              <input
                                type="range"
                                min="11"
                                max="32"
                                value={sec.fontSize || 14}
                                onChange={(e) => {
                                  const val = Number(e.target.value);
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, fontSize: val } : s)
                                  }));
                                }}
                                className="w-full mt-1 accent-amber-400"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COMPLETE CONTROL: FEATURE GRID (DYNAMIC ITEMS!) */}
                      {sec.type === 'feature_grid' && (
                        <div className="space-y-2.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-300">Columns &amp; Items</span>
                            <button
                              onClick={() => {
                                const newItems = [...(sec.gridItems || []), { icon: 'star', title: 'New Item', subtitle: 'Detail' }];
                                setProfile(prev => ({
                                  ...prev,
                                  sections: prev.sections.map(s => s.id === sec.id ? { ...s, gridItems: newItems } : s)
                                }));
                              }}
                              className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-bold"
                            >
                              + Add Item
                            </button>
                          </div>

                          <div className="space-y-2">
                            {(sec.gridItems || []).map((item, itemIdx) => (
                              <div key={itemIdx} className="p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                                <select
                                  value={item.icon || 'star'}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const newItems = sec.gridItems.map((it, i) => i === itemIdx ? { ...it, icon: val } : it);
                                    setProfile(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === sec.id ? { ...s, gridItems: newItems } : s)
                                    }));
                                  }}
                                  className="px-1.5 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white"
                                >
                                  {iconOptions.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                                </select>
                                <input
                                  type="text"
                                  value={item.title || ''}
                                  placeholder="Title"
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    const newItems = sec.gridItems.map((it, i) => i === itemIdx ? { ...it, title: val } : it);
                                    setProfile(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === sec.id ? { ...s, gridItems: newItems } : s)
                                    }));
                                  }}
                                  className="flex-1 px-2 py-1 bg-slate-900 border border-slate-700 rounded text-[11px] text-white"
                                />
                                <button
                                  onClick={() => {
                                    const newItems = sec.gridItems.filter((_, i) => i !== itemIdx);
                                    setProfile(prev => ({
                                      ...prev,
                                      sections: prev.sections.map(s => s.id === sec.id ? { ...s, gridItems: newItems } : s)
                                    }));
                                  }}
                                  className="text-slate-400 hover:text-red-400 p-1"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* COMPLETE CONTROL: BADGE PILL */}
                      {sec.type === 'badge_pill' && (
                        <div className="space-y-2 text-xs">
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Badge Text</label>
                              <input
                                type="text"
                                value={sec.pillText || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, pillText: val } : s)
                                  }));
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Border Color</label>
                              <input
                                type="text"
                                value={sec.pillBorderColor || '#F59E0B'}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setProfile(prev => ({
                                    ...prev,
                                    sections: prev.sections.map(s => s.id === sec.id ? { ...s, pillBorderColor: val } : s)
                                  }));
                                }}
                                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* COMPLETE CONTROL: HTML EMBED */}
                      {sec.type === 'html_embed' && (
                        <div className="space-y-2 text-xs">
                          <label className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Raw HTML or Iframe Embed</label>
                          <textarea
                            rows={3}
                            value={sec.embedHtml || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setProfile(prev => ({
                                ...prev,
                                sections: prev.sections.map(s => s.id === sec.id ? { ...s, embedHtml: val } : s)
                              }));
                            }}
                            placeholder="<iframe src='...' /> or custom widget"
                            className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono text-[11px]"
                          ></textarea>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: IDENTITY & AVATAR */}
            {activeTab === 'identity' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Doctor / Business Name</label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-bold"
                  />
                </div>

                {/* Dual Tone Title Configuration */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-300">Dual-Tone Title Style</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profile.isDualToneTitle}
                        onChange={(e) => setProfile({ ...profile, isDualToneTitle: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-8 h-4 bg-slate-700 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-amber-400"></div>
                    </label>
                  </div>

                  {profile.isDualToneTitle && (
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Part 1 (White)</label>
                        <input
                          type="text"
                          value={profile.titlePart1 || ''}
                          onChange={(e) => setProfile({ ...profile, titlePart1: e.target.value })}
                          placeholder="DR. AVINASH"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Part 2 (Gradient)</label>
                        <input
                          type="text"
                          value={profile.titlePart2 || ''}
                          onChange={(e) => setProfile({ ...profile, titlePart2: e.target.value })}
                          placeholder="KASUNDRA"
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-amber-400 font-bold"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Designation</label>
                  <input
                    type="text"
                    value={profile.designation || ''}
                    onChange={(e) => setProfile({ ...profile, designation: e.target.value })}
                    placeholder="Consultant Intensivist & Pulmonologist"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Sub-Designation / Qualifications</label>
                  <input
                    type="text"
                    value={profile.subDesignation || ''}
                    onChange={(e) => setProfile({ ...profile, subDesignation: e.target.value })}
                    placeholder="MBBS, MD (Respiratory Medicine) • Critical Care"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                {/* Avatar Image Upload to GridFS */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                  <span className="font-bold text-white block">Circular Avatar Image / GIF</span>
                  <div className="flex items-center gap-3">
                    {profile.avatarUrl && (
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 shadow-md shrink-0 bg-slate-950">
                        <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={profile.avatarUrl || ''}
                        onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                        placeholder="Avatar Image URL or upload to GridFS"
                        className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-lg text-xs font-bold cursor-pointer hover:bg-amber-400 hover:text-slate-950 transition-colors">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{uploadingTarget === 'avatarUrl' ? 'Uploading...' : 'Upload to GridFS'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'avatarUrl')}
                        />
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Avatar Ring Glow</label>
                      <select
                        value={profile.avatarRingColor || 'amber'}
                        onChange={(e) => setProfile({ ...profile, avatarRingColor: e.target.value })}
                        className="w-full px-2 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                      >
                        <option value="amber">Amber Gold</option>
                        <option value="cyan">Cyan Teal</option>
                        <option value="blue">Royal Blue</option>
                        <option value="emerald">Emerald</option>
                        <option value="purple">Purple</option>
                        <option value="rose">Rose Red</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Badge Text</label>
                      <input
                        type="text"
                        value={profile.avatarBadgeText || ''}
                        onChange={(e) => setProfile({ ...profile, avatarBadgeText: e.target.value })}
                        placeholder="Lilavati Fellow"
                        className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Brand Logo Upload to GridFS */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-white block">Official Brand / Hospital Logo</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={profile.brandLogoUrl || ''}
                      onChange={(e) => setProfile({ ...profile, brandLogoUrl: e.target.value })}
                      placeholder="Logo URL or upload"
                      className="flex-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                    />
                    <label className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold cursor-pointer transition-colors flex items-center gap-1 shrink-0">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingTarget === 'brandLogoUrl' ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'brandLogoUrl')}
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: THEME & BACKGROUND */}
            {activeTab === 'theme' && (
              <div className="space-y-4 text-xs">
                
                {/* Desktop Layout Mode (Phone vs Expanded) */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <label className="text-[10px] uppercase font-bold text-amber-300 block">Desktop Layout Style</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setProfile({
                        ...profile,
                        theme: { ...profile.theme, layoutMode: 'smartphone' }
                      })}
                      className={`p-2.5 rounded-xl border text-left transition-all ${profile.theme?.layoutMode !== 'expanded' ? 'bg-amber-400/10 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <div className="font-bold">📱 Smartphone Frame</div>
                      <div className="text-[10px] opacity-70">iPhone mockup on desktop</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setProfile({
                        ...profile,
                        theme: { ...profile.theme, layoutMode: 'expanded' }
                      })}
                      className={`p-2.5 rounded-xl border text-left transition-all ${profile.theme?.layoutMode === 'expanded' ? 'bg-amber-400/10 border-amber-400 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                    >
                      <div className="font-bold">🖥️ Full-Width Page</div>
                      <div className="text-[10px] opacity-70">Wide editorial website view</div>
                    </button>
                  </div>
                </div>

                {/* Background Image / GIF Upload to GridFS */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                  <span className="font-bold text-white block">Page Background Wallpaper (Image or GIF)</span>
                  <input
                    type="text"
                    value={profile.theme?.backgroundImageUrl || ''}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: { ...profile.theme, backgroundImageUrl: e.target.value }
                    })}
                    placeholder="URL to wallpaper or GIF"
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />

                  <div className="flex items-center gap-2">
                    <label className="px-3 py-1.5 bg-amber-400 text-slate-950 rounded-lg text-xs font-black cursor-pointer hover:bg-amber-300 transition-colors flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingTarget === 'backgroundImageUrl' ? 'Uploading...' : 'Upload to GridFS'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'backgroundImageUrl')}
                      />
                    </label>

                    <button
                      type="button"
                      onClick={() => setProfile({
                        ...profile,
                        theme: { ...profile.theme, backgroundImageUrl: '/assets/cinematic-medical-bg.jpg' }
                      })}
                      className="px-2.5 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs hover:text-white"
                    >
                      Medical Preset
                    </button>
                  </div>
                </div>

                {/* Dark Vignette Overlay Slider */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">Background Darkness Overlay</span>
                    <span className="font-mono text-amber-400 font-bold">{profile.theme?.overlayOpacity ?? 75}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="95"
                    value={profile.theme?.overlayOpacity ?? 75}
                    onChange={(e) => setProfile({
                      ...profile,
                      theme: { ...profile.theme, overlayOpacity: Number(e.target.value) }
                    })}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <p className="text-[10px] text-slate-400">Controls readability of profile cards on top of wallpaper.</p>
                </div>

                {/* Status Bar text */}
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-bold text-white block">Status Badge Text</span>
                  <input
                    type="text"
                    value={profile.header?.statusPillText || ''}
                    onChange={(e) => setProfile({
                      ...profile,
                      header: { ...profile.header, statusPillText: e.target.value }
                    })}
                    placeholder="OPD Open &bull; Morning (10 AM – 1 PM)"
                    className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: QUICK ACTION CIRCLES */}
            {activeTab === 'actions' && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white uppercase text-xs">Quick Action Circles</h3>
                    <p className="text-[11px] text-slate-400">Icon circles below the title</p>
                  </div>
                  <button
                    onClick={() => {
                      const newQA = {
                        id: `qa-${Date.now()}`,
                        type: 'custom',
                        label: 'New Action',
                        icon: 'globe',
                        url: 'https://',
                        bgColor: 'blue',
                        pingBadge: false
                      };
                      setProfile({
                        ...profile,
                        quickActions: [...(profile.quickActions || []), newQA]
                      });
                    }}
                    className="px-2.5 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 rounded-lg text-xs font-bold hover:bg-amber-400 hover:text-slate-950 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Circle</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {(profile.quickActions || []).map((qa, idx) => (
                    <div key={qa.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px] flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                          <span>Action #{idx + 1} ({qa.label || 'Action'})</span>
                        </span>
                        <button
                          onClick={() => {
                            setProfile({
                              ...profile,
                              quickActions: profile.quickActions.filter(q => q.id !== qa.id)
                            });
                          }}
                          className="text-slate-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Label</label>
                          <input
                            type="text"
                            value={qa.label || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setProfile({
                                ...profile,
                                quickActions: profile.quickActions.map(q => q.id === qa.id ? { ...q, label: val } : q)
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Icon</label>
                          <select
                            value={qa.icon || 'phone'}
                            onChange={(e) => {
                              const val = e.target.value;
                              setProfile({
                                ...profile,
                                quickActions: profile.quickActions.map(q => q.id === qa.id ? { ...q, icon: val } : q)
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                          >
                            {iconOptions.map(ico => <option key={ico} value={ico}>{ico}</option>)}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Color</label>
                          <select
                            value={qa.bgColor || 'blue'}
                            onChange={(e) => {
                              const val = e.target.value;
                              setProfile({
                                ...profile,
                                quickActions: profile.quickActions.map(q => q.id === qa.id ? { ...q, bgColor: val } : q)
                              });
                            }}
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                          >
                            <option value="blue">Royal Blue</option>
                            <option value="emerald">Emerald Green</option>
                            <option value="red">Emergency Red</option>
                            <option value="cyan">Cyan Teal</option>
                            <option value="amber">Amber Gold</option>
                            <option value="purple">Purple</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] uppercase text-slate-400 block mb-0.5">Target URL / Phone</label>
                          <input
                            type="text"
                            value={qa.url || ''}
                            onChange={(e) => {
                              const val = e.target.value;
                              setProfile({
                                ...profile,
                                quickActions: profile.quickActions.map(q => q.id === qa.id ? { ...q, url: val } : q)
                              });
                            }}
                            placeholder="tel:+91... or https://..."
                            className="w-full px-2 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </aside>

        {/* RIGHT COLUMN: REAL-TIME SIMULATOR PREVIEW */}
        <main className="flex-1 bg-[#02050e] flex flex-col items-center justify-center p-4 relative overflow-hidden">
          
          {/* Subtle live indicator badge */}
          <div className="absolute top-4 left-6 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Interactive Preview</span>
          </div>

          <div className="w-full h-full flex items-center justify-center overflow-auto py-2">
            <div className={`transition-all duration-300 ${previewDevice === 'mobile' ? 'w-[420px] max-w-full' : 'w-[540px] max-w-full'}`}>
              <DynamicProfileView profile={profile} isPreview={true} />
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
