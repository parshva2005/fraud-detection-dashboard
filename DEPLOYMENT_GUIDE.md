# Deployment Guide: Free Hosting for React + Flask

To make your Machine Learning Portfolio Dashboard live and completely free for anyone to access, you need to host two separate components:
1.  **Frontend (React/Vite)**
2.  **Backend (Python/Flask API)**

Here is the step-by-step guide to hosting both on the best free platforms available today.

---

## 🚀 Step 1: Host the Frontend (Vite + React) on Vercel [FREE]

Vercel is the creator of Next.js and the absolute best place to host modern frontend applications like Vite for free. Since your code is already on GitHub, this will take 60 seconds.

1.  **Go to [Vercel.com](https://vercel.com/)** and sign up using your **GitHub** account.
2.  Click **"Add New Project"**.
3.  Vercel will show a list of your GitHub repositories. Find **`fraud-detection-dashboard`** and click **Import**.
4.  **Configuration Settings (CRITICAL)**:
    *   **Project Name:** `fraud-detection-dashboard` (or whatever you like)
    *   **Framework Preset:** Vercel should auto-detect **Vite**.
    *   **Root Directory:** Click "Edit" and type `frontend`. This is very important because your `package.json` and React code are inside the `frontend` folder, not the root folder.
    *   **Build Command:** Auto (should be `npm run build`)
    *   **Output Directory:** Auto (should be `dist`)
5.  Click **Deploy**.
6.  Wait 1-2 minutes. Vercel will install the packages, build your app, and give you a live URL (e.g., `https://fraud-detection-dashboard.vercel.app`).

> [!NOTE] 
> Your frontend is now live! However, the AI predictions won't work yet because it is trying to talk to `http://127.0.0.1:5000` (your local computer). We need to host the backend and update the frontend code.

---

## ⚙️ Step 2: Host the Backend (Flask + ML Model) on Render [FREE]

Render.com offers excellent free tiers for hosting Python web services.

1.  **Prepare the Backend Code (Do this locally first):**
    Render needs to know what packages to install. In your terminal, make sure you are in the root directory (`A:\_SEM_6\ML\Project\Fraud_Detection_WebSite`) and run:
    ```bash
    pip freeze > requirements.txt
    ```
    This creates a `requirements.txt` file. We need to commit this to GitHub:
    ```bash
    git add requirements.txt
    git commit -m "Add requirements for Render hosting"
    git push origin main
    ```

2.  **Go to [Render.com](https://render.com/)** and sign up using your **GitHub** account.
3.  Click **"New +" -> "Web Service"**.
4.  Select **"Build and deploy from a Git repository"** and click **Next**.
5.  Connect your GitHub and select the **`fraud-detection-dashboard`** repository.
6.  **Configuration Settings (CRITICAL):**
    *   **Name:** `fraudsafeml-api` (or similar).
    *   **Region:** Choose the one closest to you.
    *   **Branch:** `main`
    *   **Root Directory:** Leave blank.
    *   **Runtime:** `Python 3`
    *   **Build Command:** `pip install -r requirements.txt`
    *   **Start Command:** `gunicorn app:app` 
        *   *(Note: You will need to install gunicorn locally first: `pip install gunicorn` and update your requirements.txt. Flask's built-in server is for development, Gunicorn is for production).*
    *   **Instance Type:** Select **Free ($0/month)**.
7.  Click **Create Web Service**.
8.  Wait 3-5 minutes. Render will build the environment, install pandas/flask/scikit-learn, load your `model.pkl`, and give you a live URL (e.g., `https://fraudsafeml-api.onrender.com`).

---

## 🔗 Step 3: Connect Frontend to the Live Backend

Now that your API is live on the internet, you must tell your React app to send data *there* instead of your local machine.

1.  Open your local code editor.
2.  Go to `frontend/src/pages/Predictor.tsx`.
3.  Find line 30 where the fetch URL is:
    ```typescript
    const response = await fetch('http://127.0.0.1:5000/api/predict', {
    ```
4.  Change it to your new Render URL:
    ```typescript
    const response = await fetch('https://YOUR_NEW_RENDER_URL.onrender.com/api/predict', {
    ```
5.  Save the file, commit the changes, and push to GitHub:
    ```bash
    git add frontend/src/pages/Predictor.tsx
    git commit -m "Updated ML API endpoint to production URL"
    git push origin main
    ```
6.  Vercel will **automatically detect** the push to GitHub and instantly deploy the updated frontend within 30 seconds!

You are done! 🎉 Your entire Full-Stack AI project is now 100% live on the internet for free.
