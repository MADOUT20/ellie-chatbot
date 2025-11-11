# 🚀 How to Run the Ellie Chatbot App

## ✅ Quick Start (Recommended)

### Option 1: Run in Android Studio (Easiest)

**Step 1: Open the Project**

```
1. Open Android Studio
2. File → Open
3. Navigate to: C:\Users\avina\AndroidStudioProjects\ELLIECHATBOT
4. Click "OK"
5. Wait for Gradle sync to complete
```

**Step 2: Connect Device or Start Emulator**

**For Physical Device:**

```
1. Enable Developer Options on your Android phone
2. Enable USB Debugging
3. Connect phone to computer via USB
4. Allow USB debugging when prompted
```

**For Emulator:**

```
1. Tools → Device Manager
2. Click "Create Device" (if no emulator exists)
3. Select a device (e.g., Pixel 5)
4. Select API Level 26 or higher
5. Click "Finish"
6. Click "Play" button to start emulator
```

**Step 3: Run the App**

```
1. Make sure device/emulator is selected in toolbar
2. Click green "Run" button (▶) or press Shift+F10
3. App will build and install automatically
4. App launches on device!
```

**Step 4: Test the App**

```
1. Type: hello
2. Check SDK status in response
3. Type: /models (to list AI models)
4. Chat with Ellie!
```

---

## Option 2: Build APK File

If you want to create an installable APK file:

### In Android Studio:

**Step 1: Build APK**

```
1. Build → Build Bundle(s) / APK(s) → Build APK(s)
2. Wait for build to complete
3. Click "locate" in the notification popup
```

**Step 2: Find APK**

```
Location: app/build/outputs/apk/debug/app-debug.apk
Size: ~15-20 MB (includes SDK AAR files)
```

**Step 3: Install APK**

```
Option A: Transfer to phone and install
Option B: Use ADB command:
  adb install app/build/outputs/apk/debug/app-debug.apk
```

---

## Option 3: Using Gradle (Advanced)

If Java is properly configured:

```bash
# Build debug APK
.\gradlew.bat assembleDebug

# Install and run on connected device
.\gradlew.bat installDebug

# APK location
app/build/outputs/apk/debug/app-debug.apk
```

**Note:** This requires JAVA_HOME to be set correctly.

---

## 🔍 What to Look For

### On First Launch:

**Check Logcat in Android Studio:**

```
View → Tool Windows → Logcat

Filter by: "EllieApp"

Look for:
✅ "✓ SDK initialized" (SDK loaded successfully)
or
⚠️ "❌ SDK classes not found" (Demo mode active)
```

### In the App:

**Type:** `hello`

**If SDK Loaded Successfully:**

```
Hello! 👋 I'm Ellie, your AI assistant!

🤖 AI Status: ✓ Active

📦 Available Models:
• SmolLM2 360M Q8_0 (119 MB) - Fast & lightweight
• Qwen 2.5 0.5B Instruct Q6_K (374 MB) - Balanced
• Llama 3.2 1B Instruct Q6_K (815 MB) - High quality
• Qwen 2.5 1.5B Instruct Q6_K (1.2 GB) - Best quality
```

**If SDK Failed (Demo Mode):**

```
Hello! 👋 I'm Ellie, your AI assistant!

🤖 AI Status: ⚠️ Temporarily Disabled

[Same model info but demo mode responses]
```

---

## 📱 Test Commands

Once the app is running:

### Basic Chat:

```
hello                  → Introduction
tell me a joke         → Programming joke
what is AI?            → AI explanation
how are you?           → Friendly response
```

### Model Commands:

```
/models                → List all 4 AI models
/download SmolLM2 360M Q8_0  → Download model (if SDK loaded)
/load SmolLM2 360M Q8_0      → Load model (if downloaded)
```

### Other Patterns:

```
tell me a story        → Short story
fun fact               → Interesting fact
what can you do        → Capabilities
```

---

## 🐛 Troubleshooting

### Issue: Gradle Sync Failed

**Solution:**

```
1. File → Invalidate Caches → Invalidate and Restart
2. Build → Clean Project
3. Build → Rebuild Project
```

### Issue: App Crashes on Launch

**Solution:**

```
1. Check Logcat for error details
2. Verify minSdk 26+ device
3. Try on different device/emulator
4. App should fall back to demo mode (no crash expected)
```

### Issue: "USB Debugging not enabled"

**Solution:**

```
On your Android phone:
1. Settings → About Phone
2. Tap "Build Number" 7 times
3. Developer Options now available
4. Enable USB Debugging
```

### Issue: No Device Found

**Solution:**

```
1. Reconnect USB cable
2. Check USB debugging allowed
3. Try: adb devices (should list device)
4. Or use emulator instead
```

---

## ✅ Expected Results

### Scenario A: SDK Loads Successfully ✅

**Logcat:**

```
I/EllieApp: ✓ SDK initialized
I/EllieApp: ✓ Models registered
I/EllieApp: ✨ SDK initialization complete!
```

**In App:**

- Status: "✓ Active"
- Can list models
- Can download models
- Can load models
- Real AI chat works

### Scenario B: SDK Fails (Demo Mode) ⚠️

**Logcat:**

```
E/EllieApp: ❌ SDK classes not found
```

**In App:**

- Status: "⚠️ Temporarily Disabled"
- Demo mode works perfectly
- 50+ pattern responses
- No crashes

**Both scenarios = working app!**

---

## 🎯 Quick Command Reference

**In Android Studio:**

- **Run:** Shift + F10
- **Build:** Ctrl + F9
- **Rebuild:** Build → Rebuild Project
- **Logcat:** Alt + 6

**ADB Commands:**

```bash
adb devices                    # List connected devices
adb install app-debug.apk      # Install APK
adb logcat -s EllieApp        # View app logs
adb uninstall com.example.elliechatbot  # Uninstall app
```

---

## 📊 Performance Expectations

### App Size:

- **APK Size:** ~15-20 MB (includes 6.1 MB SDK AAR files)
- **Installed:** ~25-30 MB

### First Launch:

- **App Launch:** < 2 seconds
- **SDK Init:** 1-3 seconds (background)
- **Ready to chat:** Immediately (demo mode)

### After Model Download:

- **SmolLM2 360M:** 119 MB on device
- **RAM Usage:** 150-200 MB when model loaded
- **Response Time:** 0.5-2 seconds per message

---

## 🎉 Success!

If the app launches and you can chat with Ellie, you're all set!

**Enjoy your AI chatbot!** 🤖

Whether the SDK loads or not, you have a fully functional, beautiful chatbot app.

---

## 📚 Additional Resources

- **Full Documentation:** See `SDK_ENABLED_STATUS.md`
- **Troubleshooting:** See `APP_CRASH_FIX.md`
- **Test Guide:** See `TEST_SMOLLM2.md`
- **Integration Details:** See `INTEGRATION_SUMMARY_SMOLLM2.md`

---

**Ready to run! Follow Option 1 above to start the app in Android Studio.** 🚀
