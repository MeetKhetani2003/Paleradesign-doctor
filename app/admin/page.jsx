'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  ExternalLink, 
  Edit3, 
  Trash2, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Globe, 
  Sparkles,
  Layers,
  ArrowRight,
  RefreshCw,
  Search
} from 'lucide-react';

export default function AdminDashboard() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSlug, setNewSlug] = useState('');
  const [newName, setNewName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('dr-avinash-kasundra');
  const [creating, setCreating] = useState(false);
  const [copiedSlug, setCopiedSlug] = useState('');

  const [dbStatus, setDbStatus] = useState({ connected: false, loading: true });

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      const [pRes, sRes] = await Promise.all([
        fetch('/api/profiles'),
        fetch('/api/status')
      ]);
      const pData = await pRes.json();
      const sData = await sRes.json();
      if (pData.profiles) {
        setProfiles(pData.profiles);
      }
      setDbStatus(sData);
    } catch (err) {
      console.error('Failed to fetch profiles/status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newSlug.trim()) return;

    setCreating(true);
    try {
      const res = await fetch('/api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: newSlug.trim(),
          name: newName.trim() || newSlug.trim(),
          template: selectedTemplate
        })
      });
      const data = await res.json();
      if (data.success) {
        setIsCreateModalOpen(false);
        setNewSlug('');
        setNewName('');
        // Navigate to the editor for the new profile
        window.location.href = `/admin/editor/${data.profile.slug}`;
      } else {
        alert(data.error || 'Failed to create page');
      }
    } catch (err) {
      alert('Error creating profile: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (slug) => {
    if (!confirm(`Are you sure you want to delete profile "/${slug}"?`)) return;

    try {
      const res = await fetch(`/api/profiles/${slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        fetchProfiles();
      } else {
        alert(data.error || 'Failed to delete');
      }
    } catch (err) {
      alert('Error deleting: ' + err.message);
    }
  };

  const copyUrl = (slug) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(''), 2000);
  };

  const filtered = profiles.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.slug?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030712] text-white selection:bg-amber-400 selection:text-black">
      
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-[#071126]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-blue-600 flex items-center justify-center font-black text-slate-950 shadow-md">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight flex items-center gap-2">
                <span>DYNAMIC LINK BUILDER</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Admin v2.0
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Multi-business profile links &amp; GridFS media manager</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-lg shadow-amber-950/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Page</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* MongoDB Database Status Banner */}
        <div className={`p-4 rounded-2xl border shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${dbStatus.connected ? 'bg-gradient-to-r from-slate-900 via-emerald-950/30 to-slate-900 border-emerald-500/40' : 'bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/40'}`}>
          <div className="flex items-start sm:items-center gap-3">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${dbStatus.connected ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-amber-500/20 text-amber-400 border-amber-500/40'}`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">MongoDB &amp; GridFS Storage Status</h3>
                {dbStatus.connected ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[10px] font-semibold border border-emerald-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Atlas Connected ({dbStatus.database || 'active'})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-semibold border border-amber-400/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Local Storage Active (IP Whitelist Pending)
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                {dbStatus.connected ? (
                  <span>Connected to MongoDB Atlas! All uploaded images and GIFs are securely stored in MongoDB GridFS.</span>
                ) : (
                  <span>
                    <strong>Atlas IP Notice:</strong> To connect Atlas, go to <strong className="text-amber-300">MongoDB Atlas &gt; Network Access &gt; Add IP Address &gt; Allow Access from Anywhere (0.0.0.0/0)</strong>. The app is currently using safe local memory storage so everything works without crashing!
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={fetchProfiles}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Test Connection"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Check Connection</span>
            </button>
          </div>
        </div>

        {/* Search & Statistics Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search pages by name or slug..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <div className="text-xs text-slate-400">
            Showing <strong className="text-white">{filtered.length}</strong> dynamic business profiles
          </div>
        </div>

        {/* Profile Cards Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 flex flex-col items-center justify-center space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
            <span className="text-xs">Loading profile links...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-4">
            <Layers className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No pages found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Create your first dynamic business profile link to start customizing layouts, colors, and buttons!
            </p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs uppercase"
            >
              Create Page Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((prof) => (
              <div 
                key={prof.slug}
                className="rounded-2xl bg-[#071126]/90 border border-slate-800 hover:border-amber-400/50 transition-all duration-300 p-5 flex flex-col justify-between shadow-xl group relative overflow-hidden"
              >
                {/* Subtle top glow bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-amber-400 to-cyan-400 opacity-60"></div>

                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {prof.avatarUrl ? (
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/60 shadow-md shrink-0 bg-slate-800">
                          <img src={prof.avatarUrl} alt={prof.name} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-blue-600 flex items-center justify-center font-black text-slate-950 shrink-0">
                          {prof.name?.charAt(0) || 'P'}
                        </div>
                      )}
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                          {prof.name}
                        </h3>
                        <p className="text-xs text-cyan-300 font-mono mt-0.5">
                          /{prof.slug}
                        </p>
                      </div>
                    </div>
                  </div>

                  {prof.designation && (
                    <p className="text-xs text-slate-400 mt-3 line-clamp-1">
                      {prof.designation}
                    </p>
                  )}

                  {/* Slug Link Copy Bar */}
                  <div className="mt-4 p-2 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono text-slate-300">
                    <span className="truncate pr-2 select-all">/{prof.slug}</span>
                    <button
                      onClick={() => copyUrl(prof.slug)}
                      className="p-1 hover:text-amber-400 transition-colors shrink-0"
                      title="Copy Public Link"
                    >
                      {copiedSlug === prof.slug ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between gap-1.5">
                  <Link
                    href={`/admin/editor/${prof.slug}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Visual Editor</span>
                  </Link>

                  <a
                    href={`/api/export/${prof.slug}?format=zip`}
                    download
                    className="p-2 rounded-xl bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors"
                    title="Download Standalone Next.js Project (.zip)"
                  >
                    <Download className="w-4 h-4" />
                  </a>

                  <Link
                    href={`/${prof.slug}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Open Live Public View"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(prof.slug)}
                    className="p-2 rounded-xl bg-slate-800/60 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                    title="Delete Page"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* CREATE NEW PROFILE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#071126] border border-amber-400/40 rounded-3xl p-6 shadow-2xl text-white">
            <h3 className="text-xl font-black text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Create New Dynamic Page Link</span>
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Enter the unique URL slug and business name. You can customize all colors, buttons, and backgrounds in the visual editor.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Page URL Slug *
                </label>
                <div className="flex items-center bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm">
                  <span className="text-slate-500 font-mono">domain.com/</span>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, '-'))}
                    placeholder="my-business-link"
                    className="bg-transparent border-0 outline-hidden font-mono text-amber-300 w-full"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">This will be the dynamic link you share with clients.</p>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Business / Person Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Acme Studio / Dr. Sharma / Safar Tours"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                  Starting Preset Template
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedTemplate === 'dr-avinash-kasundra' ? 'bg-amber-400/10 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                    <input
                      type="radio"
                      name="template"
                      value="dr-avinash-kasundra"
                      checked={selectedTemplate === 'dr-avinash-kasundra'}
                      onChange={() => setSelectedTemplate('dr-avinash-kasundra')}
                      className="sr-only"
                    />
                    <div className="font-bold">Medical / Healthcare</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">ICU, Doctor, Clinic Layout</div>
                  </label>

                  <label className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedTemplate === 'safar-squad' ? 'bg-amber-400/10 border-amber-400 text-amber-300' : 'bg-slate-900 border-slate-800 text-slate-300'}`}>
                    <input
                      type="radio"
                      name="template"
                      value="safar-squad"
                      checked={selectedTemplate === 'safar-squad'}
                      onChange={() => setSelectedTemplate('safar-squad')}
                      className="sr-only"
                    />
                    <div className="font-bold">Tours &amp; Travel (Reference)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Safar Squad Visual Style</div>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  {creating ? 'Creating...' : 'Create & Open Editor'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

