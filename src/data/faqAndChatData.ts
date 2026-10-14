import { CommunityChatMessage } from '../types/fundraising';

export interface FaqItem {
  id: string;
  category: 'all' | 'medical' | 'donation' | 'videocall' | 'international';
  question: string;
  answer: string;
  highlight?: string;
  badge?: string;
}

export const initialFaqList: FaqItem[] = [
  {
    id: 'faq_1',
    category: 'medical',
    badge: 'Clinical Diagnosis',
    question: 'What happened to Bibek Bhandari and what was his diagnosis?',
    answer: 'In May 2022, Bibek experienced sudden overnight lower limb weakness and paraparesis due to severe thoracic spinal cord compression. He underwent emergency open surgery (D1-D5 decompressive laminectomy) performed by renowned neurosurgeon Dr. Prakash Khetan at Vaishnavi Neuro Hospital. His MRI confirmed post-operative changes with multi-segmental cord myelopathy. His injury is classified as incomplete, meaning his neural pathways possess verified neuroplastic viability to recover motor signals with disciplined therapy.',
    highlight: 'D1-D5 Decompressive Laminectomy with preserved incomplete neuroplastic viability.'
  },
  {
    id: 'faq_2',
    category: 'medical',
    badge: 'Rehab Protocol',
    question: 'Why does he require 3.5 years of uninterrupted intensive rehabilitation?',
    answer: 'Spinal cord regeneration and neuro-motor rewiring do not happen overnight. Lead neuro-physiotherapist Dr. Pratap Kunwar Singh (BPT., MPT. - Founder of Neurigo360) and consulting physiotherapist Dr. Shakal Dev Gonda (BPT., MPT., practicing elsewhere) have formulated a 42-month (3.5-year) protocol. Uninterrupted daily therapy is clinically required to prevent permanent joint contractures, resolve foot drop through electrical nerve stimulation, rebuild quadriceps strength, conquer fear of falling, and achieve safe independent ambulation.',
    highlight: 'Directed at Neurigo360 Advance Neuro Rehabilitation Centre by Dr. Pratap Kunwar Singh.'
  },
  {
    id: 'faq_custom_amount',
    category: 'donation',
    badge: 'Any Amount Welcome',
    question: 'Can anyone donate any custom amount, like NPR 2,155, or starting from NPR 1 to NPR 1,00,000?',
    answer: 'YES, ABSOLUTELY! Donation means every single rupee counts from the heart. There is NO minimum threshold of 500 or fixed limit. Anyone can donate ANY amount starting from NPR 1 up to NPR 1,00,000+! For instance, if you wish to donate NPR 2,155 (or 51, 101, 500, 2,155, 10,000 etc.), simply enter that exact amount in your eSewa or mobile banking app, complete the transfer, and submit your Transaction Reference ID here. Your exact contribution will be credited to the public ledger and you will immediately receive an official donation verification ticket!',
    highlight: 'Every rupee counts: Donate any number from NPR 1 to NPR 1,00,000+ (e.g. NPR 2,155).'
  },
  {
    id: 'faq_doctors_roles',
    category: 'medical',
    badge: 'Doctor Separation',
    question: 'Who are the doctors involved in Bibek’s medical journey and what are their exact roles?',
    answer: 'Bibek’s medical journey involves distinct healthcare professionals: 1) Operating Neurosurgeon Dr. Prakash Khetan (Guinness Book of World Records Holder) who performed the emergency open D1-D5 thoracic decompressive laminectomy at Vaishnavi Neuro Hospital in Allahabad. 2) Dr. Pratap Kunwar Singh (BPT., MPT.), Founder and Lead Neuro-Physiotherapist at Neurigo360 Advance Neuro Rehabilitation Centre, Greater Noida, who directs Bibek’s daily intensive neuroplastic therapy sessions. 3) Dr. Shakal Dev Gonda (BPT., MPT.), an experienced Senior Physiotherapist currently practicing elsewhere (not at Neurigo360), who evaluated Bibek’s neuromotor capacity and contributed clinical expertise to the recovery protocol.',
    highlight: 'Dr. Pratap leads Neurigo360; Dr. Shakal Dev Gonda (BPT, MPT) is currently practicing elsewhere.'
  },
  {
    id: 'faq_3',
    category: 'donation',
    badge: '100% Direct & Safe',
    question: 'Is it safe to donate directly through eSewa and Nepal SBI Bank?',
    answer: 'Yes, 100% safe. There are NO third-party crowdfunding platforms taking cuts or holding funds in escrow. All funds are received directly by Bibek and his family account holder, Sashita Raj Bhandari. Every rupee is immediately available for his daily physiotherapy sessions at Neurigo360, clinical rent, and sterile medical supplies.',
    highlight: 'Zero platform fees. Direct peer-to-peer personal medical gift.'
  },
  {
    id: 'faq_4',
    category: 'videocall',
    badge: 'Direct Verification',
    question: 'Can I chat or video call with Bibek before or after donating?',
    answer: 'Yes! Bibek and his family actively encourage video calls on WhatsApp and Facebook Messenger. You can speak with him, see his rehabilitation progress, speak with his caretakers, and personally verify his situation. Bibek believes in complete human connection and total transparency.',
    highlight: 'WhatsApp & Messenger Video Calls welcome daily between 10:00 AM – 7:00 PM NPT.'
  },
  {
    id: 'faq_5',
    category: 'international',
    badge: 'Global Donors',
    question: 'How can friends and well-wishers donate from outside Nepal (USA, Australia, Europe, India, Gulf)?',
    answer: 'Donors outside Nepal can send funds via: 1) International Bank Wire / SWIFT transfer to Nepal SBI Bank Ltd (A/C: 20015243402269, Name: SASHITA RAJ BHANDARI, Hetauda Branch), 2) Remittance services like Remitly, Western Union, MoneyGram, IME, or Prabhu Remit credited directly to the SBI Bank account or eSewa ID 9861452923. If you need SWIFT assistance or IBAN verification, message Bibek on WhatsApp anytime.',
    highlight: 'Direct wire or remittance to account holder Sashita Raj Bhandari.'
  },
  {
    id: 'faq_6',
    category: 'donation',
    badge: 'Digital Receipt',
    question: 'How do I verify my donation and get an official receipt?',
    answer: 'After transferring funds via eSewa or SBI Bank, simply click the "Donate / Submit Ref" button on this portal and enter your transaction Reference ID and amount. You will instantly receive a downloadable official Digital Donation Ticket with verification QR code, and your contribution will be honored on our public Facebook Transparency Ledger.',
    highlight: 'Instant digital donation ticket and verifiable ledger entry.'
  },
  {
    id: 'faq_7',
    category: 'medical',
    badge: 'Hospital Proof',
    question: 'Where can I see the official hospital discharge notes and MRI scans?',
    answer: 'Click on the "Medical Proof" tab or button on this portal. You will find high-resolution digital scans of Dr. Prakash Khetan\'s surgical operative note from Vaishnavi Neuro Hospital, full thoracic & lumbar MRI scans, and Dr. Pratap\'s clinical assessment from Neurigo360.',
    highlight: 'All original medical documents are scanned and publicly accessible.'
  },
  {
    id: 'faq_8',
    category: 'donation',
    badge: 'Account Holder',
    question: 'Who is Sashita Raj Bhandari and why is the bank account in her name?',
    answer: 'Sashita Raj Bhandari is Bibek\'s mother and primary care manager. Because Bibek has severe motor limitations and is in daily active therapy, his family manages the official Nepal SBI Bank account to ensure hospital and physiotherapy invoices are paid on time without delay.',
    highlight: 'Legally authorized family caregiver account.'
  },
  {
    id: 'faq_9',
    category: 'videocall',
    badge: 'Visiting Hours',
    question: 'Can I visit Bibek in person in Nepal?',
    answer: 'Yes, well-wishers and supporters are warmly invited to visit Bibek at the Neurigo360 clinic or his accessible lodging. Please coordinate via WhatsApp (+977 9861452923) at least a day in advance so your visit doesn\'t conflict with his intensive clinical therapy schedule.',
    highlight: 'In-person visits welcome by prior coordination.'
  }
];

export const initialChatMessages: CommunityChatMessage[] = [
  {
    id: 'msg_1',
    senderName: 'Ramesh Adhikari',
    location: 'Kathmandu, Nepal',
    message: 'Stay strong Bibek bhai! Seeing your video doing standing exercises with Dr. Pratap gave all of us goosebumps. You will definitely walk again! Sent NPR 5,000 via eSewa.',
    timestamp: '2 hours ago',
    isDonor: true,
    avatarColor: 'from-emerald-600 to-teal-700',
    likes: 14,
    replyFromBibek: 'धेरै धेरै धन्यवाद रमेश दाइ! हजुरहरूको यो साथ र हौसलाले मलाई हरेक दिन थेरापीमा अझै कडा मिहिनेत गर्ने ऊर्जा दिन्छ। 🙏❤️'
  },
  {
    id: 'msg_2',
    senderName: 'Sunita Sharma & Family',
    location: 'Sydney, Australia',
    message: 'Praying for your speedy recovery from Australia. We did a direct bank transfer to Sashita aama\'s account. Keep your spirits high, we are all praying for your independent walking!',
    timestamp: '5 hours ago',
    isDonor: true,
    avatarColor: 'from-blue-600 to-indigo-700',
    likes: 21,
    replyFromBibek: 'Thank you so much Sunita didi and family from Australia! Your support means the world to our family. God bless you all!'
  },
  {
    id: 'msg_3',
    senderName: 'Rehab Supporter',
    location: 'Greater Noida / Nepal',
    message: 'Neurigo360 is in good hands with Dr. Pratap, and the clinical guidance from Dr. Shakal Dev Gonda has been tremendous. Do your dorsiflexor drills diligently everyday!',
    timestamp: '1 day ago',
    isDonor: false,
    avatarColor: 'from-amber-600 to-orange-700',
    likes: 9
  },
  {
    id: 'msg_4',
    senderName: 'Anil Ghimire',
    location: 'Chandrapur, Rautahat',
    message: 'हाम्रो चन्द्रपुरको गौरव हौ तिमी विवेक भाइ! गाउँका सबै दाजुभाइ तिम्रो स्वास्थ्य लाभको कामना गरिरहेका छौं। चाँडै आफ्नै खुट्टामा हिँडेर घर फर्केको हेर्न पाउँ!',
    timestamp: '2 days ago',
    isDonor: true,
    avatarColor: 'from-purple-600 to-pink-700',
    likes: 33,
    replyFromBibek: 'चन्द्रपुरका सम्पूर्ण आदरणीय दाजुभाइ तथा दिदीबहिनीहरूमा मेरो हृदयदेखि नमन! म अवश्य हिँडेर घर फर्कनेछु। 🙏'
  }
];
