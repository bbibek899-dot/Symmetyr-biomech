import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { initialChatMessages } from '../data/faqAndChatData';
import { CommunityChatMessage, VideoCallRequest } from '../types/fundraising';
import { safeCopyToClipboard } from '../utils/clipboard';
import {
  MessageCircle,
  Video,
  Phone,
  Send,
  Heart,
  Clock,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Copy,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Share2,
  Smile
} from 'lucide-react';

interface ChatAndVideoCallHubProps {
  onBackToCampaign?: () => void;
}

export const ChatAndVideoCallHub: React.FC<ChatAndVideoCallHubProps> = ({ onBackToCampaign }) => {
  const { campaign, showToast, setCurrentView, goBack, canGoBack } = useCampaign();

  const [messages, setMessages] = useState<CommunityChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('creatorfund_chat_messages_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return initialChatMessages;
  });

  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [location, setLocation] = useState('');
  const [isDonorBadge, setIsDonorBadge] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Video call request form
  const [scheduleName, setScheduleName] = useState('');
  const [scheduleContact, setScheduleContact] = useState('');
  const [schedulePlatform, setSchedulePlatform] = useState<'whatsapp' | 'messenger' | 'phone'>('whatsapp');
  const [scheduleTimeSlot, setScheduleTimeSlot] = useState('Morning (10:00 AM - 12:00 PM NPT)');
  const [scheduleNote, setScheduleNote] = useState('');
  const [scheduleSubmitted, setScheduleSubmitted] = useState(false);

  const WHATSAPP_NUMBER = '9861452923';
  const WHATSAPP_INTL = '+9779861452923';
  const FACEBOOK_URL = campaign.socialLinks?.facebook || 'https://www.facebook.com/share/1E1EVtPrPh/';

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !senderName.trim()) {
      showToast('Please enter your name and a heartfelt message.', 'error');
      return;
    }

    setIsSubmitting(true);
    const newEntry: CommunityChatMessage = {
      id: `msg_${Date.now()}`,
      senderName: senderName.trim(),
      location: location.trim() || 'Nepal / Global Well-Wisher',
      message: newMessage.trim(),
      timestamp: 'Just now',
      isDonor: isDonorBadge,
      avatarColor: 'from-emerald-600 to-teal-700',
      likes: 1
    };

    const updated = [newEntry, ...messages];
    setMessages(updated);
    try {
      localStorage.setItem('creatorfund_chat_messages_v1', JSON.stringify(updated));
    } catch (err) {
      console.warn(err);
    }

    setNewMessage('');
    setIsSubmitting(false);
    showToast('Your message has been posted to Bibek’s encouragement wall! 🙏');
  };

  const handleLikeMessage = (id: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, likes: (m.likes || 0) + 1 } : m))
    );
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduleName.trim() || !scheduleContact.trim()) {
      showToast('Please provide your name and contact info.', 'error');
      return;
    }

    setScheduleSubmitted(true);
    showToast('Video call request recorded! Opening direct chat for confirmation...');

    // Compose prefilled WhatsApp message
    const msg = `Namaste Bibek! I would like to schedule a 1-on-1 video call to speak with you and support your recovery.\n\n👤 Name: ${scheduleName}\n📱 Platform: ${schedulePlatform.toUpperCase()}\n⏰ Preferred Time: ${scheduleTimeSlot}\n💬 Note: ${scheduleNote || 'Wishing you speedy recovery and independent walking!'}`;
    
    if (schedulePlatform === 'whatsapp') {
      const waUrl = `https://wa.me/9779861452923?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    } else {
      window.open(FACEBOOK_URL, '_blank');
    }
  };

  const handleCopyPhone = async () => {
    await safeCopyToClipboard(WHATSAPP_INTL);
    setCopiedPhone(true);
    showToast('Copied phone number (+977 9861452923) to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-600" />
          <span>Back to Campaign</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Direct Patient Line Active</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">10:00 AM – 7:00 PM NPT</span>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-10 shadow-xl overflow-hidden border border-emerald-500/20">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold backdrop-blur-md border border-emerald-400/30">
            <Video className="w-3.5 h-3.5" />
            <span>Open Direct Communication · 100% Transparency</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Chat &amp; Video Call with Bibek Bhandari
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            We believe trust is earned through openness. Whether you want to personally verify Bibek’s condition, ask about his therapy drills with Dr. Pratap, or send words of courage from around the world, you are warmly invited to video call or chat with him directly.
          </p>

          {/* Quick Contact Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`https://wa.me/9779861452923?text=${encodeURIComponent('Namaste Bibek! I saw your campaign portal and would love to chat / video call with you.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 active:scale-95"
            >
              <Video className="w-4 h-4" />
              <span>Start WhatsApp Video Call</span>
            </a>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-blue-600/25 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Messenger Video &amp; Chat</span>
            </a>

            <button
              onClick={handleCopyPhone}
              className="inline-flex items-center gap-2 px-3.5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/10 active:scale-95"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{copiedPhone ? 'Copied (+977 9861452923)' : '+977 9861452923'}</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Grid: 1. Schedule Video Call, 2. Guidelines & Availability */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A: Schedule a Video Call */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Schedule a 1-on-1 Video Call</h2>
              <p className="text-xs text-slate-500">Pick a convenient time slot to speak directly with Bibek</p>
            </div>
          </div>

          {scheduleSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Call Request Sent!</span>
              </div>
              <p>
                Thank you, <strong>{scheduleName}</strong>! Bibek and his family have been notified. We look forward to speaking with you!
              </p>
              <button
                onClick={() => setScheduleSubmitted(false)}
                className="mt-2 font-semibold text-emerald-700 underline"
              >
                Schedule another call
              </button>
            </div>
          ) : (
            <form onSubmit={handleScheduleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Adhikari"
                  value={scheduleName}
                  onChange={(e) => setScheduleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Platform</label>
                  <select
                    value={schedulePlatform}
                    onChange={(e) => setSchedulePlatform(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs bg-white"
                  >
                    <option value="whatsapp">WhatsApp Video</option>
                    <option value="messenger">Facebook Messenger</option>
                    <option value="phone">Direct Mobile Phone</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your WhatsApp/Phone/Profile</label>
                  <input
                    type="text"
                    required
                    placeholder="+977 / username"
                    value={scheduleContact}
                    onChange={(e) => setScheduleContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Preferred Time Window (Nepal Time)</label>
                <select
                  value={scheduleTimeSlot}
                  onChange={(e) => setScheduleTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs bg-white"
                >
                  <option value="Morning (10:00 AM - 11:30 AM NPT)">Morning (10:00 AM – 11:30 AM NPT)</option>
                  <option value="Afternoon (3:00 PM - 5:00 PM NPT)">Afternoon (3:00 PM – 5:00 PM NPT)</option>
                  <option value="Evening (5:30 PM - 7:30 PM NPT)">Evening (5:30 PM – 7:30 PM NPT)</option>
                  <option value="Anytime today when available">Anytime today when available</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Note / Prayer (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="I want to check on Bibek's recovery, or pray for him..."
                  value={scheduleNote}
                  onChange={(e) => setScheduleNote(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Video className="w-4 h-4" />
                <span>Confirm &amp; Request Call on WhatsApp</span>
              </button>
            </form>
          )}
        </div>

        {/* Card B: Call Guidelines & Daily Hours */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900">Calling Guidelines &amp; Hours</h2>
                <p className="text-xs text-slate-500">Respecting Bibek’s daily clinical therapy sessions</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Why We Offer Video Calls</strong>
                  To provide 100% human authenticity. You can see Bibek’s genuine recovery progress, meet his mother Sashita Raj Bhandari, and ask any questions before making a donation.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Clinical Therapy Window (11:30 AM – 2:30 PM)</strong>
                  During these hours, Bibek is actively undergoing intensive neuro-physiotherapy at Neurigo360 with Dr. Pratap. If you call then, his family will pick up or return your call immediately after therapy.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
                <Heart className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block mb-0.5">Languages Spoken</strong>
                  Nepali (नेपाली), Hindi (हिंदी), and English. Bibek and his family are fluent in all three.
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Direct WhatsApp: <strong>9861452923</strong></span>
            <button
              onClick={handleCopyPhone}
              className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Community Encouragement & Prayer Wall */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Supporter Well-Wishes &amp; Prayers Wall
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                {messages.length} Messages
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Leave a public message or prayer to boost Bibek’s spirit during his 3.5-year rehabilitation
            </p>
          </div>

          {/* Quick preset prayer chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              'Praying for your walking 🙏',
              'Stay strong Bibek dai! 💪',
              'Sending love from abroad ❤️',
              'Donated via eSewa 🌿'
            ].map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setNewMessage(preset)}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input Form */}
        <form onSubmit={handleSendMessage} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Anjali Shrestha"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">City / Country (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Pokhara / London, UK"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1 text-xs">Your Message or Prayer for Bibek</label>
            <textarea
              required
              rows={2}
              placeholder="Write your words of strength, recovery wishes, or prayer here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-600">
              <input
                type="checkbox"
                checked={isDonorBadge}
                onChange={(e) => setIsDonorBadge(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>I have contributed to Bibek&apos;s medical fund (Add &quot;Verified Donor&quot; badge)</span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post Message</span>
            </button>
          </div>
        </form>

        {/* Message List */}
        <div className="space-y-4 pt-2">
          {messages.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:border-slate-300 transition-all space-y-2.5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${item.avatarColor || 'from-emerald-600 to-teal-700'} text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs`}>
                    {item.senderName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{item.senderName}</span>
                      {item.isDonor && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold text-[10px] flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Donor</span>
                        </span>
                      )}
                    </div>
                    {item.location && (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{item.location}</span>
                        <span>·</span>
                        <span>{item.timestamp}</span>
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleLikeMessage(item.id)}
                  className="flex items-center gap-1 text-slate-400 hover:text-rose-500 transition-colors text-xs px-2 py-1 rounded-lg hover:bg-rose-50"
                  title="Send Heart"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{item.likes || 1}</span>
                </button>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-normal pl-10">
                {item.message}
              </p>

              {/* Verified reply from Bibek if present */}
              {item.replyFromBibek && (
                <div className="ml-10 mt-2 p-3 rounded-xl bg-emerald-50/80 border border-emerald-200/70 text-xs text-emerald-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[11px] text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>Bibek Bhandari (Verified Response):</span>
                  </div>
                  <p className="leading-relaxed text-[11px] text-emerald-900">
                    {item.replyFromBibek}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
