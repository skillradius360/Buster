# Deploy Instagram Fact-Checker to Render.com

## Quick Deploy Steps

### 1. Go to Render Dashboard
- Visit https://dashboard.render.com
- Click **"New +"** → **"Web Service"**

### 2. Connect GitHub Repository
- Select your repository
- Click "Connect"

### 3. Configure Service

**Basic Settings:**
- **Name**: `buster-api` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your deployment branch)
- **Root Directory**: `factchecker-prototype`
- **Runtime**: `Python 3`

**Build & Deploy:**
- **Build Command**: 
  ```bash
  pip install uv && uv sync
  ```

- **Start Command**:
  ```bash
  cd app && uv run python -m uvicorn api:app --host 0.0.0.0 --port $PORT
  ```

### 4. Environment Variables

Click **"Add Environment Variable"** and add:

| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | Your Groq API key from https://console.groq.com |
| `BING_API_KEY` | (Optional) Your Bing API key |
| `FRONTEND_URL` | (Optional) Your frontend URL like `https://buster-frontend.onrender.com` |
| `PYTHON_VERSION` | `3.13.0` |

### 5. Deploy

- **Instance Type**: Free
- Click **"Create Web Service"**
- Wait 5-10 minutes for initial deployment

### 6. Verify Deployment

Once deployed, visit:
- Your API URL: `https://YOUR-SERVICE-NAME.onrender.com`
- API Docs: `https://YOUR-SERVICE-NAME.onrender.com/docs`

## CORS Configuration

The API is configured to accept requests from:
- `localhost:3000` (development)
- Any `*.onrender.com` subdomain
- Custom frontend URL (via `FRONTEND_URL` env var)

## Important Notes

### Free Tier Behavior
- ⚠️ Service spins down after 15 minutes of inactivity
- First request after idle takes ~30-50 seconds (cold start)
- 750 hours/month free

### Logs & Monitoring
- View logs: Service → **Logs** tab
- View metrics: Service → **Metrics** tab

### Auto-Deploy
- Pushes to `main` branch trigger automatic deployment
- You can disable this in Settings → Git

## Testing Your API

```bash
# Health check
curl https://YOUR-SERVICE-NAME.onrender.com/

# Test fact-check endpoint
curl -X POST https://YOUR-SERVICE-NAME.onrender.com/api/fact-check \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.instagram.com/p/EXAMPLE/", "version": "v1"}'
```

## Troubleshooting

**Build fails:**
- Check Environment Variables are set
- Verify `PYTHON_VERSION` is 3.13.0
- Check build logs for specific error

**API not responding:**
- Check service logs
- Verify start command is correct
- Ensure `PORT` environment variable is used (Render provides this)

**CORS errors:**
- Add your frontend URL to `FRONTEND_URL` environment variable
- Check browser console for exact origin being blocked

## Update Deployment

```bash
git add .
git commit -m "Update API"
git push origin main
```

Render will automatically detect the push and redeploy.
