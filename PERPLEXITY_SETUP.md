# 🌐 Perplexity API Setup Guide

## Overview

Your Ellie chatbot now supports **HYBRID AI** with three modes:

1. **Cloud AI** (Perplexity) - Fast, powerful, internet-connected
2. **On-Device AI** (RunAnywhere SDK) - Private, offline, free
3. **Auto Mode** - Intelligently chooses the best option

---

## 🔑 Getting Your Perplexity API Key

### Step 1: Sign Up

1. Go to [https://www.perplexity.ai/](https://www.perplexity.ai/)
2. Click **Sign Up** or **Get API Key**
3. Create an account or sign in
4. Navigate to **API** section in your dashboard

### Step 2: Generate API Key

1. Click **Create New API Key**
2. Give it a name (e.g., "Ellie Chatbot")
3. Copy the API key (starts with `pplx-...`)
4. **IMPORTANT:** Save it securely - you won't see it again!

### Step 3: Add Credits (if needed)

- Perplexity API is pay-as-you-go
- Add credits to your account to use the API
- Pricing: ~$0.001-0.005 per request (very affordable!)

---

## 📱 Adding API Key to Your App

### Option 1: Direct in Code (Quick Test)

1. Open `app/src/main/java/com/example/elliechatbot/MyApplication.kt`
2. Find line 18:
   ```kotlin
   private const val PERPLEXITY_API_KEY = "your-perplexity-api-key-here"
   ```
3. Replace with your actual key:
   ```kotlin
   private const val PERPLEXITY_API_KEY = "pplx-abc123xyz..."
   ```
4. Save and rebuild the app

### Option 2: Environment Variable (Recommended for Production)

1. Add to your `local.properties` file:
   ```properties
   perplexity.api.key=pplx-abc123xyz...
   ```

2. Update `build.gradle.kts` to read it:
   ```kotlin
   android {
       defaultConfig {
           buildConfigField("String", "PERPLEXITY_API_KEY", 
               "\"${project.findProperty("perplexity.api.key") ?: ""}\"")
       }
   }
   ```

3. Update `MyApplication.kt`:
   ```kotlin
   private const val PERPLEXITY_API_KEY = BuildConfig.PERPLEXITY_API_KEY
   ```

---

## 🚀 Using the Hybrid AI System

### AI Modes

Type these commands in the chat:

```
/mode cloud      → Use Perplexity API only
/mode device     → Use on-device models only  
/mode auto       → Smart fallback (default)
/status          → See current configuration
```

### Auto Mode (Default)

The app automatically chooses the best AI:

1. **On-Device Model Loaded?** → Use it (fastest, private)
2. **Perplexity API Configured?** → Use it (powerful, search-enabled)
3. **Neither Available?** → Use demo responses

### Cloud Mode

Force all responses through Perplexity API:

```
/mode cloud
hello             → Response from Perplexity
```

Benefits:

- ✓ Fast and powerful
- ✓ Internet search capabilities
- ✓ Real-time information
- ✓ No model downloads needed

Requires:

- Internet connection
- API credits

### Device Mode

Force all responses through on-device models:

```
/mode device
/models           → See available models
/download SmolLM2 360M Q8_0  → Download model
/load SmolLM2 360M Q8_0      → Load into memory
hello             → Response from on-device AI
```

Benefits:

- ✓ 100% private
- ✓ Works offline
- ✓ No API costs
- ✓ No data sent to cloud

Requires:

- Model downloaded (~120MB - 1.2GB)
- Sufficient device storage
- RAM for model loading

---

## 💰 Perplexity API Pricing

### Available Models

| Model | Speed | Quality | Search | Cost/1K tokens |
|-------|-------|---------|--------|----------------|
| **sonar-small** | ⚡⚡⚡ | ⭐⭐ | ✓ | $0.001 |
| **sonar-large** | ⚡⚡ | ⭐⭐⭐ | ✓ | $0.003 |
| **sonar-huge** | ⚡ | ⭐⭐⭐⭐ | ✓ | $0.005 |
| **sonar-chat** | ⚡⚡ | ⭐⭐⭐ | ✗ | $0.0005 |

**Default:** The app uses `sonar-small` for best speed/cost balance.

### Cost Examples

- **100 messages/day** (avg 500 tokens each) → ~$0.05/day → **$1.50/month**
- **1000 messages/day** → **$15/month**
- Mix with on-device models → **Reduce costs by 50-80%**

---

## 🔐 Security Best Practices

### ❌ DON'T

- Hardcode API key in version control
- Share API key publicly
- Commit API key to GitHub
- Store in plaintext files

### ✅ DO

- Use environment variables
- Add `local.properties` to `.gitignore`
- Rotate keys periodically
- Monitor usage in Perplexity dashboard
- Use on-device models when possible

---

## 🎯 Recommended Setup

### For Development

```kotlin
// MyApplication.kt - Quick testing
private const val PERPLEXITY_API_KEY = "pplx-test-key-123"
```

### For Production

```properties
# local.properties
perplexity.api.key=pplx-production-key-456
```

### For Open Source Projects

Don't include API key at all:

- Document setup process in README
- Provide example configuration
- Use on-device models as primary option
- Make Perplexity optional enhancement

---

## 🧪 Testing the Integration

### 1. Check Configuration

```
/status
```

Should show:

```
Cloud AI (Perplexity):
✓ Configured and ready
```

### 2. Test Cloud Response

```
/mode cloud
What is quantum computing?
```

Should get a detailed response with "🌐 **Perplexity AI**" header.

### 3. Test Auto Mode

```
/mode auto
Tell me about AI
```

Should automatically use Perplexity (if no on-device model loaded).

### 4. Check Logs

Open **Logcat** and filter by `PerplexityAPI`:

- `Generating response for: ...`
- `Response generated. Tokens used: XXX`
- `Response generated successfully`

---

## 🐛 Troubleshooting

### "Perplexity API key not configured"

**Problem:** API key not set or invalid

**Solution:**

1. Check you copied the full key (starts with `pplx-`)
2. Verify no extra spaces or quotes
3. Rebuild the app after adding key

### "API request failed: 401"

**Problem:** Invalid or expired API key

**Solution:**

1. Generate new API key from Perplexity dashboard
2. Update in `MyApplication.kt`
3. Rebuild app

### "API request failed: 429"

**Problem:** Rate limit exceeded

**Solution:**

1. Wait a few minutes
2. Add more credits to account
3. Use on-device models as fallback

### "Cloud AI Error"

**Problem:** Network or API issue

**Solution:**

1. Check internet connection
2. Verify Perplexity API status
3. App automatically falls back to demo mode

---

## 📊 Monitoring Usage

### In Perplexity Dashboard

1. Go to [https://www.perplexity.ai/settings/api](https://www.perplexity.ai/settings/api)
2. View **API Usage** tab
3. Monitor:
    - Requests per day
    - Tokens used
    - Cost breakdown
    - Response times

### In Your App (Logcat)

Search for:

- `TAG = "PerplexityAPI"` - API calls and responses
- `Tokens used: XXX` - Per-request token usage
- `Response generated successfully` - Successful calls
- `API request failed` - Errors and issues

---

## 🎨 Customizing Responses

### Change Model

In `MainActivity.kt`, line ~245:

```kotlin
val result = perplexityHelper.generateResponse(
    userMessage = userMessage,
    model = PerplexityApiHelper.MODEL_SONAR_LARGE, // Change here
    systemPrompt = systemPrompt,
    includeSearch = true,
    temperature = 0.7,
    maxTokens = 1000
)
```

### Adjust Personality

Change `systemPrompt` (line ~240):

```kotlin
val systemPrompt = "You are Ellie, a witty and sarcastic AI assistant. " +
                  "Use humor and pop culture references. " +
                  "Keep responses brief but entertaining."
```

### Enable/Disable Search

```kotlin
includeSearch = false, // Disable for faster, cheaper responses
```

### Adjust Creativity

```kotlin
temperature = 0.3, // More deterministic (0.0 = very consistent)
temperature = 1.0, // More creative (1.0 = more varied)
```

---

## 🌟 Advanced Features

### Streaming Responses (Real-time)

```kotlin
perplexityHelper.generateStreamingResponse(
    userMessage = userMessage,
    onChunk = { chunk ->
        // Update UI with each word/chunk in real-time
        sendProgressUpdate(chunk)
    }
)
```

### Conversation History

Automatically managed! Each conversation maintains context:

```kotlin
// User: "What is AI?"
// Bot: "AI is..."
// User: "Tell me more about it"  ← "it" refers to AI
// Bot understands context from history
```

Clear history:

```kotlin
perplexityHelper.clearHistory()
```

### Citation Support

For "online" models, responses include sources:

```kotlin
includeSearch = true,
// Perplexity will include citations in response
```

---

## 📚 Additional Resources

- [Perplexity API Docs](https://docs.perplexity.ai/)
- [Perplexity Pricing](https://www.perplexity.ai/pricing)
- [Perplexity Discord](https://discord.gg/perplexity)
- [API Status Page](https://status.perplexity.ai/)

---

## ✅ Quick Start Checklist

- [ ] Get Perplexity API key
- [ ] Add API key to `MyApplication.kt`
- [ ] Rebuild app in Android Studio
- [ ] Run app on device
- [ ] Type `/status` to verify configuration
- [ ] Type `/mode cloud` to test
- [ ] Ask a question and get AI response!

---

## 🎉 You're All Set!

Your Ellie chatbot now has:

- ✓ Cloud AI with internet search (Perplexity)
- ✓ On-device AI for privacy (RunAnywhere)
- ✓ Smart automatic fallback
- ✓ Flexible mode switching
- ✓ Cost optimization

**Enjoy your hybrid AI assistant!** 🤖✨