import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { initialFaqList, FaqItem } from '../data/faqAndChatData';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  MessageCircle,
  Phone,
  ShieldCheck,
  Video,
  FileText,
  ExternalLink,
  Sparkles,
  Heart
} from 'lucide-react';

interface FaqSectionProps {
  onBackToCampaign?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onBackToCampaign }) => {
  const { campaign, setCurrentView, goBack, canGoBack } = useCampaign();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'medical' | 'donation' | 'videocall' | 'international'>('all');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq_1', 'faq_3']);

  const toggleFaq = (id: string) => {
    setOpenFaqIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = initialFaqList.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.highlight && item.highlight.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.badge && item.badge.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'medical', label: 'Medical & Diagnosis' },
    { id: 'donation', label: 'Donation & Bank Safety' },
    { id: 'videocall', label: 'Video Call & Visits' },
    { id: 'international', label: 'International Donors' }
  ];

  const handleBack = () => {
    if (onBackToCampaign) {
      onBackToCampaign();
    } else if (canGoBack) {
      goBack();
    } else {
      setCurrentView('public');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-600" />
          <span>Back to Campaign</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Clinically &amp; Legally Verified FAQ</span>
        </div>
      </div>

      {/* Hero FAQ Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold backdrop-blur-md border border-indigo-400/30">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Transparency &amp; Verification Knowledge Base</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Frequently Asked Questions (FAQ)
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Everything you need to know about Bibek Bhandari&apos;s D1-D5 spinal cord injury, his 3.5-year rehabilitation protocol under Dr. Pratap, bank safety, and how to video call him.
          </p>
        </div>

        {/* Ambient glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Search and Category Filter Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search questions (e.g. eSewa, Dr. Pratap, MRI, abroad, video call)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm shadow-2xs"
          />
        </div>

        <div className="flex flex-wrap gap-1.5 overflow-x-auto py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500 space-y-2">
            <p>No questions matched your search query &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-emerald-700 font-semibold underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 text-left flex items-start justify-between gap-4 hover:bg-slate-50/60 transition-colors"
                >
                  <div className="space-y-1">
                    {faq.badge && (
                      <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                        {faq.badge}
                      </span>
                    )}
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <div className="p-1 rounded-lg bg-slate-100 text-slate-500 shrink-0 mt-1">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                    {faq.highlight && (
                      <div className="p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-xl text-xs text-emerald-900 font-medium flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{faq.highlight}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Still Have Questions? Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
            Still have a specific medical or donation question?
          </h3>
          <p className="text-xs text-slate-600">
            Bibek and his family are available on WhatsApp and welcome your message.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://wa.me/9779861452923"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={() => setCurrentView('chat_video')}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs border border-slate-200 shadow-2xs transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <Video className="w-4 h-4 text-emerald-600" />
            <span>Video Call Hub</span>
          </button>
        </div>
      </div>
    </div>
  );
};
