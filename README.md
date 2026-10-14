# Symmetry - AI Biomechanical Posture, Clinical Gait & Muscle Compensation Analysis

**Symmetry** is a clinical-grade, browser-based biomechanical movement analysis platform powered by Google MediaPipe Tasks Vision and WebAssembly. It provides real-time posture screening, kinematic angle tracking, muscle compensation diagnosis, and clinical gait analysis (Stance Phase, Swing Phase, Heel Off, and Toe Off) directly from mobile and desktop web browsers without external hardware.

---

## 🌟 Key Features

### 1. Patient Clinical Demographics & Intake System
* **Patient Intake Capsule**: Input and view **Patient Full Name**, **Age**, **Height** (cm or ft/in), **Biological Sex**, and **Chief Complaint / Joint Target**.
* **Session Persistence**: Saves patient profiles locally (`localStorage`) across sessions.
* **Official Clinical Documentation Header**: When generating assessment reports, the patient's demographics, evaluation timestamp, examiner notes, and official clinician signature lines are automatically included on the printed and exported PDF reports.

### 2. Clean Scanning Camera Viewport ("Outside-of-Screen" Layout)
* **Unobstructed Patient View**: All diagnostic cards, biomechanical compensation tags, and gait kinematics HUDs are placed **outside the camera scanning viewport** in a dedicated clinical dashboard below the video.
* **100% Clear Scanning Screen**: The camera viewfinder displays only the subject, clean skeletal chain dots, and plumb lines. Letters, text boxes, and links never cover the patient's head, chest, hips, or feet.
* **`✨ Clear Scan View` Toggle**: Allows toggling between minimal scan mode and optional HUD badges.

### 3. Zero-Background Camera & Strict Hardware Privacy
* **Complete Hardware Sensor Power-Off**: When you switch tabs, minimize the browser, lock your phone, or open reports, the hardware camera sensor tracks are stopped immediately (`track.stop()`), ensuring the phone's green indicator dot shuts off completely.
* **Auto-Standby Sleep**: If the user is idle for 60 seconds without an active exercise set, the camera powers down automatically to preserve device battery and prevent heat buildup.
* **1-Tap Power Toggle**: Explicit `[📹 Camera ON]` / `[🛑 Camera OFF]` button with an on-screen Standby Shield overlay so you always know when your camera is active or powered off.

### 4. Clinical Gait Kinematics (Rancho Los Amigos / Perry Biomechanical Standard)
* **Real-Time Stance vs. Swing Phase Distribution**: Tracks the clinical 60% Stance Phase to 40% Swing Phase ratio.
* **Heel Off (Terminal Stance)**: Detects terminal stance push-off mechanics, trailing hip extension angle behind body axis (normal: 10°–15°), and plantarflexor propulsion.
* **Toe Off (Pre-Swing)**: Measures rapid knee flexion release (~35°–40°) and great toe clearance into swing.
* **Swing Phase Clearance**: Measures peak knee flexion during limb advancement (target: 50°–65°) to assess tripping / toe-drag risks.
* **Contralateral Arm Swing**: Analyzes reciprocal coordination (e.g. right leg forward opposed to left arm forward).
* **Live Visual Gait HUD**: Dynamic 6-segment phase progression bar showing:
  `1. Heel Strike → 2. Foot Flat → 3. Mid-Stance → 4. HEEL OFF → 5. TOE OFF → 6. SWING PHASE`

### 5. True Vertical Full-Body Portrait (9:16) Capture
* Built specifically for mobile phone placement (2–3 meters away).
* Dynamic silhouette alignment guide ensures head, pelvis, knees, and feet are completely in frame before scanning.
* 1-tap toggle between **Portrait (9:16)** and **Wide (16:9)** modes.

### 6. Kinematic Chain Visualization & Plumb Line
* Mechanical glowing chain links connecting joint-to-joint.
* Central gravity plumb line down anatomical midline with horizontal shoulder and pelvic level guidelines.
* Real-time angle badges displayed directly on joints (e.g., knee flexion, elbow angles, shoulder tilt).

### 7. Musculoskeletal Compensation & Rebalancing Engine
* Diagnoses lateral tilt and drop-downs (e.g., Right Shoulder Depression, Right Pelvic Drop / Trendelenburg mechanism).
* Maps exact **Overactive / Tight muscles** requiring stretching/inhibition.
* Maps exact **Underactive / Inhibited muscles** requiring activation.
* Prescribes an actionable 4-step physical therapy corrective exercise routine (NASM / CES models).

### 8. Progressive Web App (PWA) & Offline Ready
* Installable to iPhone and Android home screens as a native app with app icon.
* Standalone offline service worker caching.

### 9. Photo Analysis Mode
* Upload any static posture photo for an instant computer vision analysis, joint overlay, and printable diagnostic report.

---

## 🚀 How to Run, Share & GitHub Privacy

### 1. Live Web Link (Ready for Immediate Submission)
The app is live and hosted at:
```
https://ais-pre-v36ev7ejomvg4o2rvkenh6-712254875975.asia-southeast1.run.app
```
Anyone can open this URL directly on mobile Chrome, Safari, or desktop browsers over HTTPS.

### 2. Can Friends / Teachers Run the App if GitHub is Private?
**YES! 100% YES!**
* The web link above runs directly on Google Cloud.
* Your teachers, friends, or examiners **do not need access to your GitHub repository** to use the application. They can test posture analysis, gait tracking, and generate PDF reports directly on their phones or laptops from the link.
* Making your GitHub repository **Private** protects your source code so no one else can view or copy it.

### 3. How to Make a Repository Private on GitHub
1. Log into your GitHub account at `github.com`.
2. Click the **`+`** icon in the top right corner → **New repository** (or go to `github.com/new`).
3. Enter a repository name (e.g. `symmetry-biomechanics`).
4. Under **Choose visibility**, select **🔒 Private**.
5. Click **Create repository**.
6. Upload the project files (`index.html`, `manifest.json`, `icon.svg`, `sw.js`, `README.md`).
7. Only you have access to your code!

### 4. Install to Mobile Home Screen (App Icon)
* **Android (Chrome)**: Tap the 3 dots menu `⋮` → **Install App** or **Add to Home screen**.
* **iPhone (Safari)**: Tap the Share button `⎙` → **Add to Home Screen**.
