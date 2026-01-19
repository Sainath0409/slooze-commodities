
# Deployment Guide (Vercel)

This project is built with **Next.js** and is optimized for deployment on **Vercel**.

## Prerequisites
- A [Vercel Account](https://vercel.com/signup).
- [Git](https://git-scm.com/) installed.


## Option 1: Deploy using GitHub (Recommended)
1. Go to [GitHub.com/new](https://github.com/new) and create a repository named `slooze-commodities`.
2. Run the following commands in your terminal:
   ```bash
   git remote add origin https://github.com/sainath0409/slooze-commodities.git
   git push -u origin master
   ```
3. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
4. Click **"Add New..."** -> **"Project"**.
5. Import `slooze-commodities` from your GitHub list.
6. Click **Deploy**.


## Option 2: Deploy using Vercel CLI
If you don't want to use GitHub, you can deploy directly from your terminal.

1. **Login to Vercel**:
   ```bash
   npx vercel login
   ```
   Follow the instructions to log in via your browser.

2. **Deploy**:
   ```bash
   npx vercel
   ```
   - Set up and deploy? **Yes**
   - Which scope? **(Select your account)**
   - Link to existing project? **No**
   - Project name? **(Press Enter or type a name)**
   - Directory? **(Press Enter ./ )**
   - Modify settings? **No**

3. **Production Deployment**:
   to deploy to production (live URL):
   ```bash
   npx vercel --prod
   ```

## Post-Deployment Checks
- Ensure the **Environment Variables** (if any) are set in the Vercel Project Settings.
- Verify the `Build Command` is `npm run build` or `next build`.
- Verify the `Install Command` is `npm install`.

Your app should now be live! 🚀
