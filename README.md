# HealthSphere AI - Clinical Decision Support

This is a Multi-Modal AI Clinical Decision Support System built with Next.js, React, Tailwind CSS, Shadcn UI, and Genkit.

## 🚀 How to Get the Code to GitHub (FREE)

If you are asked to pay 15000rs to "Publish", that is for a paid hosting plan. You can avoid this by following these steps to push to your own GitHub for free:

1. **Download the ZIP:** Look at the **top-right header** of this browser. Click the **Cloud Icon with a downward arrow** (it's between the `?` and your profile picture). This is free.
2. **Extract & Open:** Unzip the folder and open it in Visual Studio Code.
3. **Initialize Git:**
   Open the terminal in VS Code (`Cmd+J` or `Ctrl+J`) and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
4. **Create GitHub Repo:** Go to [GitHub](https://github.com/new) and create a new repository (don't initialize with README).
5. **Connect and Push:**
   Copy the commands from GitHub's "push an existing repository" section:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## 💻 Local Setup Instructions

Once you have the files on your computer:

1. **Extract the project:** Unzip the downloaded file.
2. **Open in VS Code:** `File > Open Folder...` and select the extracted folder.
3. **Install dependencies:**
   ```bash
   npm install
   ```
4. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your key:
   ```env
   GOOGLE_GENAI_API_KEY=your_actual_api_key_here
   ```
5. **Run the development server:**
   ```bash
   npm run dev
   ```
6. **Open the app:** Go to [http://localhost:3000](http://localhost:3000) in your browser.

## Application Workflow
- **Risk Prediction:** ML-based assessment for Heart, Diabetes, Kidney, and Breast Cancer.
- **Image Analysis:** Deep learning analysis for Chest X-rays.
- **AI Health Assistant:** Intelligent chat support for symptoms and guidance.
- **Personalized Summary:** AI-powered consolidated health overview.
- **Patient Report:** High-fidelity documentation with preview and download options.

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + Shadcn UI
- **AI Engine:** Genkit + Google Gemini
- **Icons:** Lucide React