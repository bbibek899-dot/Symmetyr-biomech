import React, { useState } from 'react';
import { X, Plus, Video, Sparkles } from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';
import { RehabExerciseVideo } from '../types/fundraising';

interface AddExerciseVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddExerciseVideoModal: React.FC<AddExerciseVideoModalProps> = ({ isOpen, onClose }) => {
  const { addExerciseVideo, showToast } = useCampaign();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'quad_activation' | 'core_trunk' | 'rotator_cuff' | 'gait_standing' | 'range_of_motion'>('quad_activation');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [frequency, setFrequency] = useState('3 sets of 10 reps daily');
  const [therapistNotes, setTherapistNotes] = useState('Dr. Pratap: Maintain proper spinal alignment and focus on conscious neuromuscular intent.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      showToast('Please fill in required exercise details.', 'error');
      return;
    }

    const newEx: RehabExerciseVideo = {
      id: `ex_${Date.now()}`,
      title: title.trim(),
      category,
      description: description.trim(),
      imageUrl: imageUrl.trim() || './images/exercise_isometric_knee_quad_1790313410854.jpg',
      videoUrl: videoUrl.trim() || 'https://www.tiktok.com/@sasibibek',
      frequency,
      therapistNotes,
      dateLogged: new Date().toISOString().split('T')[0]
    };

    addExerciseVideo(newEx);
    showToast(`Added exercise drill: ${newEx.title}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Video className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white leading-tight">
                Log New Recovery Exercise Drill
              </h2>
              <p className="text-xs text-slate-300">Neurigo360 Clinical Practice</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Exercise Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Quadriceps Isometric Activation Drills"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs bg-white"
              >
                <option value="quad_activation">Quadriceps Activation</option>
                <option value="core_trunk">Trunk &amp; Balance</option>
                <option value="gait_standing">Standing Frame &amp; Gait</option>
                <option value="range_of_motion">Foot Drop / ROM</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
              <input
                type="text"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Clinical Description</label>
            <textarea
              required
              rows={2}
              placeholder="Describe the drill and targeted muscles..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Dr. Pratap’s Clinical Notes</label>
            <input
              type="text"
              value={therapistNotes}
              onChange={(e) => setTherapistNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">TikTok Video URL (Optional)</label>
            <input
              type="text"
              placeholder="https://www.tiktok.com/@sasibibek"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-600 font-semibold hover:bg-slate-100 text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Exercise</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
