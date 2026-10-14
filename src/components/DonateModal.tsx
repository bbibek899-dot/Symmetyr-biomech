import React, { useState } from 'react';
import { useCampaign } from '../context/CampaignContext';
import { PaymentMethodType, Donation } from '../types/fundraising';
import { RealScannableQr } from './RealScannableQr';
import { getShareableCampaignUrl } from '../utils/urlUtils';
import { safeCopyToClipboard } from '../utils/clipboard';
import { X, Copy, Check, QrCode, Building, Wallet, ShieldCheck, Heart, Sparkles, Send, ExternalLink, Maximize2, Ticket, Share2, MessageCircle, Phone, Award, CheckCircle2 } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const {
    campaign,
    addDonation,
    showToast,
    triggerCelebration,
    setActiveTicketDonation,
    setActiveThankYouDonation,
    setIsShareModalOpen
  } = useCampaign();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('esewa');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Form states
  const [donorName, setDonorName] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [amount, setAmount] = useState('1000');
  const [referenceId, setReferenceId] = useState('');
  const [message, setMessage] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [socialPlatform, setSocialPlatform] = useState<'instagram' | 'tiktok' | 'facebook' | 'whatsapp'>('whatsapp');
  const [modalTab, setModalTab] = useState<'qr_pay' | 'submit_tx'>('qr_pay');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedDonation, setSubmittedDonation] = useState<Donation | null>(null);
  const [thankYouCopied, setThankYouCopied] = useState(false);

  if (!isOpen) return null;

  const campaignUrl = getShareableCampaignUrl(campaign.livePublicUrl);

  const copyToClipboard = async (text: string, label: string) => {
    await safeCopyToClipboard(text);
    setCopiedField(label);
    showToast(`Copied ${label}: ${text}`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handlePresetAmount = (preset: number) => {
    setAmount(preset.toString());
  };

  const handleSubmitProof = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0) {
      showToast('Please enter a valid contribution amount', 'error');
      return;
    }
    if (!referenceId.trim()) {
      showToast('Please enter the transaction reference or transaction code', 'error');
      return;
    }

    const newDonationObj: Donation = {
      id: `don_${Date.now()}`,
      donorName: isAnonymous ? 'Kind Supporter' : (donorName.trim() || 'Supporter'),
      isAnonymous,
      amount: parsedAmount,
      currency: campaign.currency,
      paymentMethod: selectedMethod,
      referenceId: referenceId.trim(),
      message: message.trim() || undefined,
      timestamp: new Date().toISOString(),
      status: 'pending',
      donorPhone: donorPhone.trim() || undefined,
      donorSocialHandle: socialHandle.trim() || undefined,
      donorSocialPlatform: socialPlatform,
      ticketNumber: `NEPAL-SCI-2026-${referenceId.trim().slice(-6).toUpperCase() || '88219A'}`
    };

    addDonation(newDonationObj);
    setSubmittedDonation(newDonationObj);
    setIsSubmitted(true);
    triggerCelebration();
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedDonation(null);
    setDonorName('');
    setDonorPhone('');
    setReferenceId('');
    setMessage('');
    setSocialHandle('');
    setModalTab('qr_pay');
    onClose();
  };

  const handleOpenTicket = () => {
    if (submittedDonation) {
      setActiveTicketDonation(submittedDonation);
      onClose();
    }
  };

  const handleOpenThankYou = () => {
    if (submittedDonation) {
      setActiveThankYouDonation(submittedDonation);
      onClose();
    }
  };

  const handleOpenShare = () => {
    setIsShareModalOpen(true);
    onClose();
  };

  // Generate thank you message text
  const thankYouTextNepali = submittedDonation
    ? `नमस्ते ${submittedDonation.donorName} ज्यु! विवेक भण्डारीको स्पाइनल कर्ड इन्जुरी (D1-D5 open laminectomy) उपचार तथा Neurigo360 Advance Neuro Rehabilitation Centre (Greater Noida Paramount Golf Foreste) मा Founder Dr. Pratap Kunwar Singh को रेखदेखमा दैनिक फिजियोथेरापी र Dr. Shakal Dev Gonda (BPT., MPT. - हाल अन्यत्र कार्यरत) को क्लिनिकल मार्गदर्शनको लागि तपाईंले गर्नुभएको रु ${submittedDonation.amount.toLocaleString()} (${submittedDonation.paymentMethod.toUpperCase()} मार्फत, Ref: ${submittedDonation.referenceId}) को अमूल्य सहयोगको लागि हृदयदेखि नै धेरै धेरै धन्यवाद! तपाईंको सहयोग हाम्रो पारदर्शी फेसबुक पेजमा पनि सम्मानपूर्वक सार्वजनिक गरिएको छ। 🔗 ${campaignUrl}`
    : '';

  const handleCopyThankYouNote = async () => {
    await safeCopyToClipboard(thankYouTextNepali);
    setThankYouCopied(true);
    showToast('Copied personalized Thank-You note to clipboard!');
    setTimeout(() => setThankYouCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              {isSubmitted ? 'Payment Proof Submitted!' : 'Direct Medical Contribution'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              100% direct to {campaign.creatorName} &amp; Family Account (No platform cuts)
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Facebook Transparency Commitment Banner */}
        <div className="px-4 py-2.5 bg-blue-50/90 border-b border-blue-200/80 flex items-start gap-2.5 text-xs text-blue-900">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span className="font-bold text-blue-950">Facebook Public Accountability Pledge:</span> Every single penny is accounted for. Verified donor names &amp; amounts are published with gratitude on{' '}
            <a
              href="https://www.facebook.com/share/1E1EVtPrPh/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline text-blue-800 hover:text-blue-900 inline-flex items-center gap-0.5"
            >
              <span>Bibek's Facebook</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            {' '}(unless marked Anonymous).
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            {/* Header Success State */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Heart className="w-7 h-7 fill-emerald-600 text-emerald-600 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Danyabad! Thank You From My Heart!</h4>
                <p className="text-xs text-slate-600 mt-0.5 max-w-sm mx-auto">
                  Your direct contribution of <strong className="text-slate-900">NPR {parseFloat(amount).toLocaleString()}</strong> has been recorded under Reference <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-800">{referenceId}</span>.
                </p>
              </div>
            </div>

            {/* Official Digital Thank-You & Appreciation Certificate Card */}
            <div className="bg-gradient-to-br from-amber-50/90 via-white to-emerald-50/90 border-2 border-amber-300/80 rounded-2xl p-4 sm:p-5 shadow-sm text-left relative overflow-hidden space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-amber-900 uppercase tracking-wider">
                      Official Certificate of Appreciation
                    </div>
                    <div className="text-xs font-bold text-slate-900">
                      Bibek Bhandari SCI Recovery Fund
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
                  {submittedDonation?.ticketNumber || 'VERIFIED-DONOR'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-800 leading-relaxed">
                <p className="font-medium">
                  "आदरणीय <strong className="text-slate-950 font-bold">{submittedDonation?.donorName}</strong> ज्यु, तपाईंले मेरो स्पाइनल कर्ड इन्जुरी (D1-D5 open laminectomy) उपचार तथा <strong>Neurigo360 Advance Neuro Rehabilitation Centre, Greater Noida</strong> मा <strong>Founder Dr. Pratap Kunwar Singh (BPT., MPT.)</strong> को प्रत्यक्ष रेखदेखमा दैनिक फिजियोथेरापी र <strong>Dr. Shakal Dev Gonda (BPT., MPT. - हाल अन्यत्र कार्यरत)</strong> को क्लिनिकल मार्गदर्शनको लागि गर्नुभएको <strong>रु {submittedDonation?.amount.toLocaleString()}</strong> को सहयोगको लागि सशीता राज भण्डारी तथा विवेक भण्डारी परिवार हृदयदेखि नै कृतज्ञता व्यक्त गर्दछौं।"
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Surgical Care: Dr. Prakash Khetan (Guinness World Record Holder)</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Direct Thank You Actions */}
            <div className="space-y-2 pt-1 text-left">
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Gratitude &amp; Receipt Options:</span>
              </div>

              {/* Action 1: Send on WhatsApp */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href={`https://wa.me/${(submittedDonation?.donorPhone || '').replace(/[^0-9]/g, '') || '9779861452923'}?text=${encodeURIComponent(thankYouTextNepali)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs active:scale-98"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>1-Tap WhatsApp Thank-You</span>
                </a>

                <a
                  href={`https://wa.me/9779861452923?text=${encodeURIComponent(`नमस्ते विवेक जी! मैले तपाईंको स्पाइनल कर्ड इन्जुरी उपचार अभियानको लागि रु ${parseFloat(amount).toLocaleString()} (${selectedMethod.toUpperCase()}) सहयोग पठाएको छु। Reference ID: ${referenceId}। मेरो नाम: ${donorName.trim() || 'Supporter'}। स्वास्थ्यलाभको कामना गर्दछु!`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-700" />
                  <span>Confirm with Bibek (+977 9861452923)</span>
                </a>
              </div>

              {/* Action 2: View Ticket & Copy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleOpenTicket}
                  className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Ticket className="w-4 h-4 text-blue-700" />
                  <span>Save Official Donation Ticket</span>
                </button>

                <button
                  onClick={handleCopyThankYouNote}
                  className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  {thankYouCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{thankYouCopied ? 'Copied Thank-You Note!' : 'Copy Thank-You Text'}</span>
                </button>
              </div>

              {/* Action 3: Social Share */}
              <button
                onClick={handleOpenShare}
                className="w-full py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5 text-indigo-700" />
                <span>Share Campaign Link on Messenger / WhatsApp</span>
              </button>
            </div>

            {/* Clarification Box: How Thank-You Works */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 text-left text-xs text-emerald-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900 text-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Will a thank you message be sent to you?</span>
              </div>
              <p className="text-[11px] leading-relaxed text-emerald-900">
                <strong>YES!</strong> Because eSewa and bank transfers are direct personal transfers, our portal has instantly generated your official Appreciation Certificate above. You can tap the <strong>WhatsApp</strong> button above to receive or forward it right away. In addition, your contribution is honored publicly on <strong>Bibek's Facebook Transparency Ledger</strong> and listed on the live Supporters Wall.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Back to Campaign
            </button>
          </div>
        ) : (
          <div className="p-4 sm:p-6 space-y-4 max-h-[82vh] overflow-y-auto">
            {/* Step Switcher Tabs */}
            <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
              <button
                type="button"
                onClick={() => setModalTab('qr_pay')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalTab === 'qr_pay'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>Step 1: Scan QR &amp; Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setModalTab('submit_tx')}
                className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  modalTab === 'submit_tx'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/50'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Step 2: Submit Tx ID &amp; Verify</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  modalTab === 'submit_tx' ? 'bg-emerald-800 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  Any Amount
                </span>
              </button>
            </div>

            {/* TAB 1: SCAN QR & PAY */}
            {modalTab === 'qr_pay' && (
              <div className="space-y-4">
                {/* Clean Direct Payment Method Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Select Official QR &amp; Account
                    </span>
                    <span className="text-[11px] text-emerald-700 font-semibold">100% Direct Family Account</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('esewa')}
                      className={`p-3 rounded-2xl border-2 text-center transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                        selectedMethod === 'esewa'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-black text-xs flex items-center justify-center shrink-0">
                        eS
                      </div>
                      <div className="text-left">
                        <span className="text-xs block font-bold text-slate-900">Official eSewa QR</span>
                        <span className="text-[10px] text-slate-500 block">ID: 9861452923</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedMethod('bank')}
                      className={`p-3 rounded-2xl border-2 text-center transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                        selectedMethod === 'bank'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                        SBI
                      </div>
                      <div className="text-left">
                        <span className="text-xs block font-bold text-slate-900">Nepal SBI Bank QR</span>
                        <span className="text-[10px] text-slate-500 block">A/C: 20015243402269</span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Official Real Scannable QR Code */}
                <div>
                  <RealScannableQr
                    method={selectedMethod === 'bank' || selectedMethod === 'fonepay' ? 'bank' : 'esewa'}
                    size={240}
                    showDetails={true}
                  />
                </div>

                {/* Any Amount Reassurance Banner */}
                <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
                  <Heart className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 fill-emerald-600" />
                  <div className="leading-relaxed">
                    <span className="font-bold text-emerald-900">Donate ANY amount from NPR 1 to NPR 1,00,000+:</span> You can transfer any figure (for example: exactly <strong className="underline decoration-emerald-500">NPR 2,155</strong>, NPR 500, NPR 100, etc.) from your mobile banking or eSewa app.
                  </div>
                </div>

                {/* Direct CTA to Jump to Step 2 */}
                <button
                  type="button"
                  onClick={() => setModalTab('submit_tx')}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Already Paid? Click to Submit Transaction ID &amp; Get Ticket</span>
                  <span className="text-[11px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded-full font-mono">Fast Step</span>
                </button>

                {/* 100% Facebook Transparency Guarantee */}
                <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-3 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-900 leading-relaxed">
                    <span className="font-bold">Facebook Public Transparency:</span>{' '}
                    Bibek publicly acknowledges every single rupee received on his{' '}
                    <a
                      href={campaign.socialLinks.facebook || 'https://www.facebook.com/share/1E1EVtPrPh/'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline text-blue-700 hover:text-blue-900"
                    >
                      Facebook Profile
                    </a>{' '}
                    with donor name &amp; receipt verification.
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: EASY LOG PAYMENT WITH TRANSACTION ID */}
            {modalTab === 'submit_tx' && (
              <form onSubmit={handleSubmitProof} className="space-y-4">
                {/* Clear Step Info Header */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                        2
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        Fast Verification with Transaction ID
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                      Any Amount Welcome
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Donation means any amount from the heart! You can donate from <strong>NPR 1 to NPR 1,00,000+</strong> (e.g. <strong>NPR 2,155</strong>, NPR 500, NPR 100). Enter your transaction ID below to immediately generate your verified appreciation ticket.
                  </p>
                </div>

                {/* 1. Transaction ID / Reference Code (PROMINENT FIRST FIELD) */}
                <div className="bg-white p-3 rounded-2xl border-2 border-emerald-500/80 shadow-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <Ticket className="w-4 h-4 text-emerald-600" />
                      <span>Transaction ID / Reference Code <span className="text-red-500">*</span></span>
                    </label>
                    <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                      Required
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    value={referenceId}
                    onChange={e => setReferenceId(e.target.value)}
                    placeholder="e.g. 8472910 or ESW-8472910 or Bank Tx Ref"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <span className="text-[11px] text-slate-500 block pt-0.5">
                    💡 Found instantly in your eSewa receipt, Khalti history, or mobile banking SMS.
                  </span>
                </div>

                {/* 2. Amount Sent (NPR) - Easy presets + Free custom input from 1 to 100,000+ */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-800">
                      Amount Donated (NPR) <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-emerald-700 font-medium">
                      Start from NPR 1 to 1,00,000+
                    </span>
                  </div>

                  {/* Preset chips including NPR 2,155 */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                    {[100, 500, 1000, 2155, 5000, 10000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handlePresetAmount(val)}
                        className={`py-1.5 px-1 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                          amount === val.toString()
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-102'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        Rs. {val.toLocaleString()}
                      </button>
                    ))}
                  </div>

                  {/* Custom Amount Input allowing ANY number like 2155 */}
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs font-bold text-slate-500">NPR</span>
                    <input
                      type="number"
                      required
                      min="1"
                      max="1000000"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="Enter ANY custom amount (e.g. 2155)"
                      className="w-full pl-14 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 tabular-nums"
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center justify-between">
                    <span>Selected: <strong>NPR {parseFloat(amount || '0').toLocaleString()}</strong></span>
                    <span className="text-emerald-700 font-medium">Any custom amount allowed</span>
                  </div>
                </div>

                {/* 3. Payment Method Used */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    Which payment method did you send through?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('esewa')}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                        selectedMethod === 'esewa'
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>eSewa (9861452923)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedMethod('bank')}
                      className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer ${
                        selectedMethod === 'bank'
                          ? 'border-blue-600 bg-blue-50 text-blue-950 font-bold'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                    >
                      <span>Nepal SBI Bank</span>
                    </button>
                  </div>
                </div>

                {/* 4. Donor Name & Anonymous Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Name (for Wall &amp; Ticket)
                    </label>
                    <input
                      type="text"
                      disabled={isAnonymous}
                      value={donorName}
                      onChange={e => setDonorName(e.target.value)}
                      placeholder={isAnonymous ? 'Kind Supporter (Anonymous)' : 'e.g. Ramesh / Sunita'}
                      className={`w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 ${
                        isAnonymous ? 'opacity-50 cursor-not-allowed bg-slate-100' : ''
                      }`}
                    />
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="checkbox"
                        id="anonCheckModal"
                        checked={isAnonymous}
                        onChange={e => setIsAnonymous(e.target.checked)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <label htmlFor="anonCheckModal" className="text-xs text-slate-600 cursor-pointer">
                        Keep my name anonymous
                      </label>
                    </div>
                  </div>

                  {/* WhatsApp or Mobile Number for Instant Thank-You & Ticket */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp / Mobile (Optional)</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                        For Receipt
                      </span>
                    </label>
                    <input
                      type="tel"
                      value={donorPhone}
                      onChange={e => setDonorPhone(e.target.value)}
                      placeholder="e.g. 9861452923 or +977..."
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      To send you an instant appreciation message
                    </span>
                  </div>
                </div>

                {/* Message of Encouragement */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Message of Encouragement (Optional)
                  </label>
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="e.g. Stay strong Bibek, prayers for your recovery!"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Payment Proof &amp; Generate Ticket</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setModalTab('qr_pay')}
                    className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 transition-colors cursor-pointer text-center"
                  >
                    ← Need to see QR code and account details again?
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
