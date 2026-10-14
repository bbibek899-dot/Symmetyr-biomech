import { Campaign, Donation, CampaignUpdate } from '../types/fundraising';
import campaignData from '../../data/publishedCampaign.json';
import donationsData from '../../data/publishedDonations.json';

export const sciPatientCampaign: Campaign = campaignData as unknown as Campaign;
export const initialCampaign: Campaign = sciPatientCampaign;
export const initialDonations: Donation[] = donationsData as unknown as Donation[];

export const initialUpdates: CampaignUpdate[] = [
  {
    id: 'up_1',
    title: 'Dr. Pratap’s Active Therapy Assessment & Standing Drills at Neurigo360',
    content: 'Completed another week of intensive neuromotor re-education at Neurigo360 Advance Neuro Rehab Centre under Founder Dr. Pratap Kunwar Singh, with clinical evaluation guidance from Dr. Shakal Dev Gonda (BPT., MPT., practicing elsewhere). Daily electrical stimulation on the anterior tibialis and supported standing frame balance are showing gradual motor response.',
    date: '2026-09-25',
    category: 'behind_the_scenes',
    imageUrl: './images/exercise_scapular_wall_slide_1790313398123.jpg',
    likesCount: 42,
    commentsCount: 9
  },
  {
    id: 'up_2',
    title: 'Hospital Operative Note & Post-Laminectomy Verification Published',
    content: 'Full surgical records from Dr. Prakash Khetan (Vaishnavi Neuro Hospital) and MRI films have been documented here with 100% public accountability.',
    date: '2026-09-18',
    category: 'medical_report',
    imageUrl: './images/bibek_recovery_hero_1790321508089.jpg',
    likesCount: 68,
    commentsCount: 14
  }
];
