import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle2, AlertTriangle, ExternalLink, Scale, Heart } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

interface LegalSafetyGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalSafetyGuideModal: React.FC<LegalSafetyGuideModalProps> = ({ isOpen, onClose }) => {
  const { campaign } = useCampaign();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Legal, Safety &amp; Medical Compliance Disclosure
              </h2>
              <p className="text-xs text-slate-300">
                Bibek Bhandari Personal Medical Rehabilitation Fund
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Direct Peer-to-Peer Medical Gift</span>
            </div>
            <p>
              This fundraiser is a direct, personal medical assistance campaign managed directly by Bibek Bhandari and his authorized family caregiver, Sashita Raj Bhandari. 100% of funds sent via eSewa or Nepal SBI Bank go straight to personal medical and rehabilitation expenses.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-slate-700" />
              <span>Legal Disclosures &amp; Terms</span>
            </h3>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">1. No Third-Party Platform Intermediary</strong>
              <p>CreatorFund is an open-source, client-side transparency toolkit. It does not hold, deduct, or escrow user funds. Transactions take place strictly peer-to-peer via official Nepal banking and digital wallet networks.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">2. Verified Hospital &amp; Medical Documentation</strong>
              <p>All surgical discharge records, operative notes signed by Dr. Prakash Khetan, clinical therapy assessments from Neurigo360 signed by Dr. Pratap Kunwar Singh, and diagnostic MRI scans are original records documented for public inspection.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <strong className="text-slate-900 block">3. Donor Transparency &amp; Digital Receipts</strong>
              <p>Every contributor is provided with an instant digital donation ticket containing a verification QR code and transaction reference for their records.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Beneficiary: Bibek Bhandari · Chandrapur, Rautahat, Nepal
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
