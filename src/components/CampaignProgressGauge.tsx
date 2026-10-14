import React from 'react';
import { useCampaign } from '../context/CampaignContext';
import { Activity, TrendingUp, Users, ShieldCheck, Target, Heart } from 'lucide-react';

export const CampaignProgressGauge: React.FC = () => {
  const { campaign, totalVerifiedRaised, totalPendingRaised, progressPercent, verifiedSupportersCount } = useCampaign();

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-1">
            <Activity className="w-3.5 h-3.5" />
            <span>Fundraising Velocity &amp; Goal Progress</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Neuro-Rehabilitation Campaign Gauge
          </h2>
        </div>

        <div className="text-right">
          <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
            {progressPercent.toFixed(1)}%
          </span>
          <span className="text-xs text-slate-500 block">of 75 Lakhs Target</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="w-full h-4 rounded-full bg-slate-100 p-0.5 overflow-hidden border border-slate-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 transition-all duration-700 shadow-sm"
            style={{ width: `${Math.min(100, Math.max(2, progressPercent))}%` }}
          />
        </div>

        <div className="flex justify-between text-xs text-slate-500 font-mono pt-1">
          <span>NPR 0</span>
          <span>Target: NPR {campaign.targetAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Grid Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Total Verified</span>
          <span className="text-lg font-bold text-slate-900 font-mono">
            NPR {totalVerifiedRaised.toLocaleString()}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Pending Verification</span>
          <span className="text-lg font-bold text-amber-600 font-mono">
            NPR {totalPendingRaised.toLocaleString()}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Supporters Count</span>
          <span className="text-lg font-bold text-slate-900 font-mono">
            {verifiedSupportersCount} Donors
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <span className="text-[11px] text-slate-500 block">Platform Cut</span>
          <span className="text-lg font-bold text-emerald-700 font-mono">
            0% (100% Direct)
          </span>
        </div>
      </div>
    </div>
  );
};
