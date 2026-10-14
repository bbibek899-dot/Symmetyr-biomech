import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { PaymentMethodType } from '../types/fundraising';
import {
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  Ticket,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Heart,
  DollarSign,
  PieChart,
  Activity,
  Calendar,
  Layers,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface DonationTrackerViewProps {
  onBackToCampaign?: () => void;
}

export const DonationTrackerView: React.FC<DonationTrackerViewProps> = ({ onBackToCampaign }) => {
  const {
    campaign,
    donations,
    totalVerifiedRaised,
    totalPendingRaised,
    progressPercent,
    verifiedSupportersCount,
    setIsDonateModalOpen,
    setActiveTicketDonation,
    setCurrentView,
    goBack,
    canGoBack
  } = useCampaign();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterMethod, setFilterMethod] = useState<'all' | 'esewa' | 'bank'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'verified' | 'pending'>('all');

  const targetAmount = campaign.targetAmount || 7500000;
  const verifiedDonations = donations.filter(d => d.status === 'verified');
  const averageDonation = verifiedDonations.length > 0
    ? Math.round(totalVerifiedRaised / verifiedDonations.length)
    : 0;

  // Filtered donations for the live tracker table
  const filteredDonations = donations.filter((d) => {
    const matchesSearch =
      d.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.referenceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.ticketNumber && d.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (d.message && d.message.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesMethod =
      filterMethod === 'all' ||
      (filterMethod === 'esewa' && (d.paymentMethod === 'esewa' || d.paymentMethod === 'khalti')) ||
      (filterMethod === 'bank' && d.paymentMethod === 'bank');

    const matchesStatus =
      filterStatus === 'all' || d.status === filterStatus;

    return matchesSearch && matchesMethod && matchesStatus;
  });

  const handleBack = () => {
    if (onBackToCampaign) {
      onBackToCampaign();
    } else if (canGoBack) {
      goBack();
    } else {
      setCurrentView('public');
    }
  };

  const milestones = [
    {
      id: 'm1',
      phase: 'Phase 1 · Emergency Surgery',
      title: 'Emergency D1-D5 Decompressive Laminectomy',
      institution: 'Vaishnavi Neuro Hospital, Allahabad',
      doctor: 'Dr. Prakash Khetan (Neurosurgeon)',
      budget: 'NPR 12,50,000',
      status: 'completed',
      date: 'May 30, 2022',
      details: 'Emergency surgical decompression of thoracic spinal cord following sudden paraparesis. Successfully preserved viable motor neural pathways.'
    },
    {
      id: 'm2',
      phase: 'Phase 2 · Active Protocol (Current)',
      title: 'Intensive Neuroplasticity & Spasticity Management',
      institution: 'Neurigo360 Advance Neuro Rehab Centre',
      doctor: 'Dr. Pratap Kunwar Singh (Neurigo360) · Protocol Guidance: Dr. Shakal Dev Gonda (BPT, MPT)',
      budget: 'NPR 25,00,000 (Target)',
      status: 'active',
      date: 'Active · 2026',
      details: 'Daily electrical nerve stimulation for foot drop, intensive quadriceps activation drills, core postural balancing, and preventing joint contractures.'
    },
    {
      id: 'm3',
      phase: 'Phase 3 · Standing & Gait Preparation',
      title: 'Supported Standing Frame & Knee Joint Stabilization',
      institution: 'Neurigo360 Advance Neuro Rehab Centre',
      doctor: 'Dr. Pratap Kunwar Singh',
      budget: 'NPR 25,00,000',
      status: 'upcoming',
      date: 'Next Milestone',
      details: 'Conquering fear of falling through assisted weight-bearing stands, neuromuscular re-education, and specialized bilateral ankle-foot orthosis (AFO) fitting.'
    },
    {
      id: 'm4',
      phase: 'Phase 4 · Independent Ambulation',
      title: 'Safe Unassisted Walking & Community Re-integration',
      institution: 'Neurigo360 Clinical Discharge Goal',
      doctor: 'Full Clinical Team',
      budget: 'NPR 12,50,000',
      status: 'upcoming',
      date: 'Final Objective',
      details: 'Transition from walking frame to cane, mastering stair navigation, independent vehicle transfers, and complete functional independence.'
    }
  ];

  const budgetItems = [
    {
      label: 'Neurigo360 Neuro-Physiotherapy & Electro-Stimulation',
      percent: 45,
      amount: 'NPR 33,75,000',
      description: 'Daily clinical sessions, neuromuscular stimulation machines, specialized manual therapy.',
      color: 'bg-emerald-600',
      barColor: 'bg-emerald-500'
    },
    {
      label: 'Accessible Clinic-Adjacent Living & Care Lodging',
      percent: 20,
      amount: 'NPR 15,00,000',
      description: 'Wheelchair-accessible ground-floor room, water heating, caregiver accommodation near clinic.',
      color: 'bg-blue-600',
      barColor: 'bg-blue-500'
    },
    {
      label: 'Sterile Daily Medical Supplies & Neurogenic Bowel Care',
      percent: 15,
      amount: 'NPR 11,25,000',
      description: 'Sterile catheters, antiseptic washes, wound prevention cushions, neuropathic supplements.',
      color: 'bg-purple-600',
      barColor: 'bg-purple-500'
    },
    {
      label: 'Specialized Mobility Equipment & Daily Accessible Transit',
      percent: 10,
      amount: 'NPR 7,50,000',
      description: 'Custom orthotic braces (AFOs), standing frame apparatus, transit to daily clinic sessions.',
      color: 'bg-amber-600',
      barColor: 'bg-amber-500'
    },
    {
      label: 'Periodic Spine MRI Follow-ups & Clinical Contingency',
      percent: 10,
      amount: 'NPR 7,50,000',
      description: 'Diagnostic MRI scans, neuro-physician evaluations, emergency clinical reserve fund.',
      color: 'bg-rose-600',
      barColor: 'bg-rose-500'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Top Header & Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-all active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 text-emerald-600" />
          <span>Back to Campaign</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsDonateModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Submit Reference / Get Ticket</span>
          </button>
        </div>
      </div>

      {/* Main Donation Tracker Dashboard Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="relative z-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-400 text-xs font-semibold backdrop-blur-md border border-white/10">
              <Activity className="w-3.5 h-3.5" />
              <span>Live Rehabilitation Funding Tracker · 3.5-Year Protocol</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Goal: NPR 75,00,000 (75 Lakhs)</span>
            </div>
          </div>

          {/* Primary Numbers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-slate-400 font-medium block">Total Verified Raised</span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 tabular-nums">
                NPR {totalVerifiedRaised.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-400/80 block mt-1">100% Direct SBI &amp; eSewa</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-slate-400 font-medium block">Progress to 75 Lakhs</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                {progressPercent.toFixed(1)}%
              </span>
              <span className="text-[10px] text-slate-400 block mt-1">42-Month Protocol</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-slate-400 font-medium block">Verified Supporters</span>
              <span className="text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                {verifiedSupportersCount}
              </span>
              <span className="text-[10px] text-blue-300 block mt-1">Nepal &amp; Worldwide</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs">
              <span className="text-[11px] text-slate-400 font-medium block">Pending Verification</span>
              <span className="text-xl sm:text-2xl font-extrabold text-amber-300 tabular-nums">
                NPR {totalPendingRaised.toLocaleString()}
              </span>
              <span className="text-[10px] text-amber-400/80 block mt-1">Bank Slip Cross-check</span>
            </div>
          </div>

          {/* Real-time Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Current Active Therapy Funds
              </span>
              <span className="text-slate-300">
                NPR {totalVerifiedRaised.toLocaleString()} of NPR {targetAmount.toLocaleString()}
              </span>
            </div>

            <div className="w-full h-4 rounded-full bg-white/10 p-0.5 overflow-hidden border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 transition-all duration-1000 shadow-md shadow-emerald-500/50"
                style={{ width: `${Math.min(100, Math.max(2, progressPercent))}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 pt-0.5 font-mono">
              <span>NPR 0</span>
              <span>25 Lakhs (Phase 2)</span>
              <span>50 Lakhs (Phase 3)</span>
              <span>75 Lakhs (Full Ambulation)</span>
            </div>
          </div>
        </div>

        {/* Ambient glow */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* 4-Stage Recovery Roadmap */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Clinical Milestone Roadmap</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Rehabilitation Phases &amp; Milestones
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Tracking each clinical stage designed by Dr. Prakash Khetan and Dr. Pratap Kunwar Singh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border transition-all space-y-3 relative overflow-hidden ${
                m.status === 'completed'
                  ? 'bg-slate-50/80 border-slate-300'
                  : m.status === 'active'
                  ? 'bg-emerald-50/40 border-emerald-400 shadow-sm ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {m.phase}
                </span>
                {m.status === 'completed' ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Completed</span>
                  </span>
                ) : m.status === 'active' ? (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 animate-pulse">
                    <span>Active Now</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
                    Upcoming
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {m.title}
                </h3>
                <span className="text-xs font-semibold text-emerald-800 block mt-0.5">
                  {m.institution} · {m.doctor}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {m.details}
              </p>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Estimated Budget:</span>
                <span className="font-bold text-slate-900 font-mono">{m.budget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Allocation Breakdown */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <PieChart className="w-3.5 h-3.5" />
            <span>Complete Financial Transparency</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            Where Every Rupee Is Allocated
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Zero overhead. 100% of funds go toward Bibek’s clinical treatment and rehabilitation living expenses.
          </p>
        </div>

        <div className="space-y-4">
          {budgetItems.map((item, index) => (
            <div key={index} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-900">
                <span className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-md ${item.color}`} />
                  <span>{item.label}</span>
                </span>
                <span className="font-mono text-slate-700">
                  {item.percent}% · {item.amount}
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${item.barColor}`}
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Donations Feed & Search */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Live Supporter Registry</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredDonations.length} recorded contributions across eSewa &amp; Nepal SBI Bank
            </p>
          </div>

          <button
            onClick={() => setIsDonateModalOpen(true)}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Verify My Donation</span>
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-wrap gap-2 text-xs">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search donor name, reference ID, ticket..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            {(['all', 'esewa', 'bank'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setFilterMethod(m)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  filterMethod === m
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m === 'all' ? 'All Channels' : m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Donations Table / List */}
        <div className="divide-y divide-slate-100">
          {filteredDonations.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-500">
              No matching donations found. Try clearing your search query.
            </div>
          ) : (
            filteredDonations.slice(0, 15).map((d) => (
              <div
                key={d.id}
                className="py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs hover:bg-slate-50/80 px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {d.isAnonymous ? '?' : d.donorName.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">
                        {d.isAnonymous ? 'Kind Well-Wisher (Anonymous)' : d.donorName}
                      </span>
                      {d.status === 'verified' ? (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold flex items-center gap-0.5">
                          <Clock className="w-3 h-3 text-amber-600" />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref: {d.referenceId} · {new Date(d.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <span className="font-extrabold text-slate-900 block font-mono text-sm">
                      NPR {d.amount.toLocaleString()}
                    </span>
                    <span className="text-[10px] uppercase font-semibold text-slate-500">
                      {d.paymentMethod === 'bank' ? 'Nepal SBI Bank' : d.paymentMethod}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTicketDonation(d)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors"
                    title="View & Download Digital Ticket"
                  >
                    <Ticket className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
