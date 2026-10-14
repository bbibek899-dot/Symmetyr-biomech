import { SocialScriptTemplate } from '../types/fundraising';

export interface SocialStrategyStep {
  stepNumber: number;
  title: string;
  action: string;
  details: string;
  proTip: string;
}

export interface SocialStrategyGuide {
  platform: 'instagram' | 'tiktok' | 'facebook';
  platformName: string;
  oneLiner: string;
  keyRule: string;
  steps: SocialStrategyStep[];
}

export const socialStrategyGuides: SocialStrategyGuide[] = [
  {
    platform: 'instagram',
    platformName: 'Instagram',
    oneLiner: 'High-trust visual storytelling connecting personal recovery with biological milestones.',
    keyRule: 'Never put external links directly in post captions where Instagram will suppress organic reach. Always route traffic through your Bio Link and Stories with link stickers.',
    steps: [
      {
        stepNumber: 1,
        title: 'Optimize Bio with Verified Link',
        action: 'Add your clean campaign link in bio with clear patient credentials.',
        details: 'State the D1-D5 open laminectomy surgery and active Neurigo360 therapy with Dr. Pratap so new visitors immediately understand.',
        proTip: 'Use emoji bullets to keep the bio scannable in under 3 seconds.'
      },
      {
        stepNumber: 2,
        title: 'Daily Therapy Stories with Link Sticker',
        action: 'Post real 5-10 second clips during daily quadriceps and ankle dorsiflexion practice.',
        details: 'Authentic physical therapy drills show undeniable determination and medical authenticity.',
        proTip: 'Tag @neurigo360 or Dr. Pratap to foster organic collaborative reposts.'
      },
      {
        stepNumber: 3,
        title: 'Pin 3 Core Educational Reels',
        action: 'Create 3 pinned reels: The Injury, The Surgery, and The 3.5-Year Walking Goal.',
        details: 'New visitors check pinned reels first. These answer 90% of questions before donors contribute.',
        proTip: 'Add clear bold on-screen subtitles for muted viewing.'
      },
      {
        stepNumber: 4,
        title: 'Public Donor Gratitude Stories',
        action: 'Share digital receipt tickets honoring each verified supporter.',
        details: 'Public gratitude reinforces 100% transparency and inspires others to contribute.',
        proTip: 'Always ask permission before sharing donor names publicly.'
      }
    ]
  },
  {
    platform: 'tiktok',
    platformName: 'TikTok',
    oneLiner: 'Raw, emotional journey documenting progressive motor recovery and waking dormant nerves.',
    keyRule: 'Hooks matter in the first 2 seconds. Show the real physical struggle, the effort to move a single toe, or assisted standing balance.',
    steps: [
      {
        stepNumber: 1,
        title: 'Authentic 2-Second Hook',
        action: 'Start videos mid-action with verbal or visual struggle.',
        details: '“Day 840 trying to wake up my paralyzed ankle after D1-D5 spine surgery.”',
        proTip: 'Avoid generic stock intro music; use natural ambient room sounds.'
      },
      {
        stepNumber: 2,
        title: 'Educational Voiceover with Dr. Pratap',
        action: 'Explain what neuroplasticity means and why 3.5 years of therapy is necessary.',
        details: 'Viewers donate when they understand the scientific reality and clinical dedication.',
        proTip: 'Show Dr. Pratap explaining the clinical drill in the video.'
      },
      {
        stepNumber: 3,
        title: 'Clear Call to Action & Bio Navigation',
        action: 'Remind viewers that the link in bio contains full MRI scan proof and eSewa QR.',
        details: 'Direct viewers to the permanent link for all medical verification.',
        proTip: 'Pin your comment with the official verified details.'
      },
      {
        stepNumber: 4,
        title: 'Engage Every Comment with Video Replies',
        action: 'Reply to questions using TikTok video reply feature.',
        details: 'Video replies trigger algorithm spikes and show sincere engagement.',
        proTip: 'Express genuine gratitude to people praying from other countries.'
      }
    ]
  },
  {
    platform: 'facebook',
    platformName: 'Facebook',
    oneLiner: 'Complete community accountability, family credibility, and bank verification.',
    keyRule: 'Facebook is the primary payment verification network in Nepal. Always post complete itemized transparency lists with verified eSewa and SBI reference IDs.',
    steps: [
      {
        stepNumber: 1,
        title: 'Weekly Transparency Ledger Posts',
        action: 'Copy and publish the formatted Facebook transparency update from CreatorFund.',
        details: 'List every single rupee received, donor names, and therapy expenses with zero omission.',
        proTip: 'Tag close friends and family members so the post spreads across local community groups.'
      },
      {
        stepNumber: 2,
        title: 'Document Clinic Receipts & Doctor Visits',
        action: 'Upload photos of official clinic receipts, Dr. Pratap’s assessments, and therapy sessions.',
        details: 'Visual receipts build unbreakable trust across Nepal and the diaspora.',
        proTip: 'Blur out personal patient ID numbers or sensitive payment barcodes if requested.'
      },
      {
        stepNumber: 3,
        title: 'Facebook Live from Therapy Clinic',
        action: 'Host a short 10-minute Facebook Live session once a month during therapy.',
        details: 'Live video is 100% immune to skepticism. Supporters can see Bibek talking and exercising in real time.',
        proTip: 'Announce the live session a day before so supporters can tune in.'
      },
      {
        stepNumber: 4,
        title: 'Personal Direct Messenger Follow-ups',
        action: 'Send direct voice notes or video messages to donors thanking them personally.',
        details: 'A 20-second heartfelt voice note creates lasting lifelong human bonds.',
        proTip: 'Include your official ticket link so they have proof of their contribution.'
      }
    ]
  }
];

export const socialScriptTemplates: SocialScriptTemplate[] = [
  {
    id: 'ig_bio_1',
    platform: 'instagram',
    type: 'bio',
    title: 'Instagram Bio · Recovery Advocate',
    description: 'Clean bio maximizing clicks to verified medical rehabilitation fund.',
    content: `🎗️ {CREATOR_NAME} ({CREATOR_HANDLE})
🏥 Fighting back from D1-D5 Spinal Cord Injury (Open Surgery)
🏋️‍♂️ Daily neuro-physio at Neurigo360 with Dr. Pratap
🎯 Target: 3.5 Yrs Intensive Rehabilitation ({TARGET_AMOUNT})
👇 Verified MRI Scans, eSewa QR & Ledger:
{CAMPAIGN_URL}`,
    proTip: 'Add this exact link to your Instagram bio profile website link field.'
  },
  {
    id: 'fb_post_1',
    platform: 'facebook',
    type: 'caption',
    title: 'Facebook Weekly Transparency & Accountability Update',
    description: 'Comprehensive post thanking donors and showing hospital proof.',
    content: `🙏 100% TRANSPARENCY & DONOR GRATITUDE UPDATE 🙏

My name is {CREATOR_NAME} (Chandrapur, Rautahat). Every single rupee contributed toward my 3.5-year neuro-rehabilitation protocol at Neurigo360 is publicly documented.

📊 Total Verified Funds Raised: {TOTAL_RAISED}
🎯 Goal: {TARGET_AMOUNT} (42 Months Protocol)
📱 Direct Support:
• eSewa / Khalti ID: {ESEWA_ID}
• Nepal SBI Bank Ltd: {BANK_ACC} ({BANK_BRANCH})
🔗 Verified Medical Proof & Full Ledger: {CAMPAIGN_URL}`,
    proTip: 'Tag kind donors in the comments to express heartfelt personal gratitude.'
  },
  {
    id: 'tt_script_1',
    platform: 'tiktok',
    type: 'video_script',
    title: 'TikTok Video Caption · Real Recovery Day',
    description: 'Relatable, heartfelt caption for rehabilitation exercise videos.',
    content: `Day 840 fighting D1-D5 spinal injury: every single toe movement is a victory. Guided by Dr. Pratap at Neurigo360. Link in bio to support my 3.5-year rehabilitation fund! 🙏🇳🇵 #SpinalCordInjury #NeuroRehab #NeverGiveUp #BibekRecovery`,
    proTip: 'Pin your campaign link or mention it in the video spoken audio.'
  }
];
