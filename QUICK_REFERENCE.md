# Ellie Chatbot - Quick Reference Card

## 🚀 Quick Start Commands

### In the App Chat Interface:

```
/models                          → List all available AI models
/download SmolLM2 360M Q8_0      → Download smallest model (119 MB)
/load SmolLM2 360M Q8_0          → Load the model
Tell me a story                  → Chat with AI!
```

## 📦 Available Models

| Model | Size | Speed | Quality | Recommended For |
|-------|------|-------|---------|----------------|
| SmolLM2 360M Q8_0 | 119 MB | ⚡⚡⚡ | ⭐⭐ | Testing, Quick Start |
| Qwen 2.5 0.5B | 374 MB | ⚡⚡ | ⭐⭐⭐ | **Best Balance** |
| Llama 3.2 1B | 815 MB | ⚡ | ⭐⭐⭐⭐ | Quality Responses |
| Qwen 2.5 1.5B | 1.2 GB | 🐌 | ⭐⭐⭐⭐⭐ | Best Quality |

**First time?** Start with **SmolLM2 360M Q8_0**

## 💬 All Chat Commands

| Command | Usage | Description |
|---------|-------|-------------|
| `/models` | `/models` | List available models + download status |
| `/download` | `/download <model_name>` | Download a model from HuggingFace |
| `/load` | `/load <model_name>` | Load model into memory |
| `show models` | `show models` | Alternative to `/models` |

## 🔍 Checking Status

### In Android Studio Logcat:

**Filter by**: `EllieApp`

**Success looks like**:

```
✓ SDK initialized
✓ LLM service provider registered
✓ Models registered
✓ Scanned for downloaded models
✨ SDK initialization complete! Ready to chat.
```

**Errors show as**:

```
❌ SDK initialization failed: <reason>
```

## ⚡ Typical Workflow

```
1. Open app → SDK auto-initializes (5-10 seconds)
2. Type "hello" → Verify chat works (demo mode)
3. Type "/models" → See available models
4. Type "/download SmolLM2 360M Q8_0" → Wait 2-5 minutes
5. Type "/load SmolLM2 360M Q8_0" → Wait 10-30 seconds
6. Type "What is AI?" → Get real AI response!
```

## 🐛 Common Issues & Fixes

### SDK Not Initializing

```
Problem: Unresolved references in code
Fix: File → Sync Project with Gradle Files
```

### Download Fails

```
Problem: Model download stops or errors
Fix 1: Check internet connection
Fix 2: Ensure 500 MB free storage
Fix 3: Try again (might be server issue)
```

### Load Fails

```
Problem: "Failed to load model"
Fix 1: Ensure model fully downloaded
Fix 2: Close other apps (free RAM)
Fix 3: Restart app
```

### Slow Responses

```
Problem: AI takes forever to respond
Fix 1: Normal for on-device AI (be patient)
Fix 2: Try smaller model (SmolLM2 360M)
Fix 3: Close background apps
```

### App Crashes

```
Problem: App closes during generation
Fix 1: Use smaller model
Fix 2: Reboot device
Fix 3: Check device RAM (need 2GB+ free)
```

## 📱 Device Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Android OS | 8.0 (API 26) | 10.0+ |
| RAM | 2 GB | 4 GB+ |
| Storage | 500 MB | 2 GB+ |
| Processor | ARM64 | Snapdragon 7xx+ |

## 🎯 Performance Tips

1. **Use Wi-Fi** for model downloads (not mobile data)
2. **Close apps** before loading model
3. **Start small** with 119 MB model first
4. **Be patient** - first response takes 5-10 seconds
5. **Reboot device** if performance degrades

## 📂 File Locations

### Code Files:

```
MyApplication.kt      → SDK initialization
MainActivity.kt       → Chat logic & model management
js/script.js         → WebView commands
index.html           → Chat UI
```

### SDK Files:

```
app/libs/
  ├── RunAnywhereKotlinSDK-release.aar (4.0 MB)
  └── runanywhere-llm-llamacpp-release.aar (2.1 MB)
```

## 🔧 Development Commands

### In Android Studio:

```
Sync Gradle:    File → Sync Project with Gradle Files
Clean Build:    Build → Clean Project
Rebuild:        Build → Rebuild Project
Run:            Run (▶️) or Shift+F10
```

### View Logs:

```
Logcat:         View → Tool Windows → Logcat
Filter:         Tag: EllieApp or EllieMainActivity
```

## 💡 Pro Tips

1. **Download while coding** - models download in background
2. **Check model size** before downloading on mobile data
3. **Test demo mode first** - ensures bridge works
4. **Use Logcat** - shows download progress and errors
5. **Keep one model loaded** - switching requires reload

## 🎨 Customization Quick Links

### Change Welcome Message:

`MainActivity.kt` → Line ~236 → Greeting response

### Add New Model:

`MyApplication.kt` → Line ~68 → `registerModels()` function

### Modify UI Colors:

`app/src/main/assets/css/style.css`

### Add New Commands:

`js/script.js` → Line ~50 → `handleSend()` function

## 📊 Model Download Times (Approximate)

| Connection | SmolLM2 (119MB) | Qwen 0.5B (374MB) | Llama 1B (815MB) | Qwen 1.5B (1.2GB) |
|------------|-----------------|-------------------|------------------|-------------------|
| 5G | 15 sec | 45 sec | 1.5 min | 2 min |
| 4G | 30 sec | 1.5 min | 3 min | 5 min |
| Wi-Fi (Fast) | 20 sec | 1 min | 2 min | 3 min |
| Wi-Fi (Slow) | 2 min | 6 min | 13 min | 20 min |

## 🔗 Useful Links

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed setup instructions
- [RunAnywhere SDK](https://github.com/RunanywhereAI/runanywhere-sdks)
- [HuggingFace Models](https://huggingface.co/models?library=gguf)

## ⚠️ Important Notes

1. **Models persist** - download once, use forever
2. **Offline capable** - works without internet after download
3. **One model at a time** - loading new model unloads previous
4. **Private & secure** - all inference happens on-device
5. **First run is slower** - CPU optimization happens automatically

## 🆘 Getting Help

1. **Check Logcat** - shows detailed error messages
2. **Read SETUP_GUIDE.md** - comprehensive troubleshooting
3. **Review code comments** - inline documentation
4. **Check SDK docs** - RunAnywhere GitHub repository

---

**Keep this card handy while developing!** 📌
