# Ellie Chatbot - On-Device AI Assistant

An Android chatbot application powered by the **RunAnywhere SDK** that runs AI models entirely
on-device using llama.cpp.

## Features

- **On-Device AI**: Run real language models locally on your Android device
- **Multiple Models**: Support for various model sizes (119 MB to 1.2 GB)
- **No Internet Required**: Once downloaded, models work completely offline
- **Smart Fallback**: Demo mode with pattern-based responses when no model is loaded
- **Modern UI**: Clean WebView-based chat interface
- **Model Management**: Easy download, load, and switch between models

## Quick Start

### Prerequisites

- Android Studio (latest version)
- JDK 17+
- Android device/emulator with:
    - Minimum SDK 26 (Android 8.0)
    - ARM64 processor (most modern devices)
    - At least 2 GB free storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ELLIECHATBOT
   ```

2. **Open in Android Studio**
    - File → Open → Select the project folder

3. **Sync Gradle**
    - The project will automatically sync dependencies
    - The RunAnywhere SDK AAR files are included in `app/libs/`

4. **Run the app**
    - Connect your Android device or start an emulator
    - Click Run (▶️) in Android Studio

## Using AI Models

### Step 1: Check Available Models

Open the app and type:
```
/models
```

You'll see a list of available models:

- **SmolLM2 360M Q8_0** (119 MB) - Fastest, great for testing
- **Qwen 2.5 0.5B Instruct Q6_K** (374 MB) - Good balance
- **Llama 3.2 1B Instruct Q6_K** (815 MB) - Better quality
- **Qwen 2.5 1.5B Instruct Q6_K** (1.2 GB) - Best quality

### Step 2: Download a Model

Start with the smallest model for testing:

```
/download SmolLM2 360M Q8_0
```

The download progress will be displayed in the chat. This may take a few minutes depending on your
internet connection.

### Step 3: Load the Model

Once downloaded, load the model:
```
/load SmolLM2 360M Q8_0
```

The model will be loaded into memory. This may take 10-30 seconds.

### Step 4: Chat with AI!

Once a model is loaded, just type your messages normally:
```
What is machine learning?
Tell me a creative story about a robot
Explain quantum computing in simple terms
```

The AI will generate responses in real-time!

## Chat Commands

| Command                | Description                                |
|------------------------|--------------------------------------------|
| `/models`              | List all available models and their status |
| `/download <model_id>` | Download a specific model                  |
| `/load <model_id>`     | Load a downloaded model into memory        |
| `show models`          | Alternative way to list models             |

## Architecture

```
┌─────────────────────────────────────┐
│          WebView UI Layer           │
│  (HTML/CSS/JavaScript Interface)    │
└─────────────────┬───────────────────┘
                  │ JavaScript Bridge
┌─────────────────▼───────────────────┐
│         MainActivity.kt             │
│  • WebView setup                    │
│  • Message processing               │
│  • Model management                 │
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│      RunAnywhere SDK (v0.1.3)       │
│  • Model downloading                │
│  • Model loading                    │
│  • Text generation (llama.cpp)      │
└─────────────────────────────────────┘
```

## Project Structure

```
ELLIECHATBOT/
├── app/
│   ├── libs/
│   │   ├── RunAnywhereKotlinSDK-release.aar (4.0 MB)
│   │   └── runanywhere-llm-llamacpp-release.aar (2.1 MB)
│   ├── src/main/
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   └── style.css
│   │   │   ├── js/
│   │   │   │   └── script.js
│   │   │   └── index.html
│   │   ├── java/com/example/elliechatbot/
│   │   │   ├── MyApplication.kt (SDK initialization)
│   │   │   └── MainActivity.kt (Chat logic)
│   │   └── AndroidManifest.xml
│   └── build.gradle.kts
├── build.gradle.kts
└── settings.gradle.kts
```

## Technical Details

### SDK Integration

The app uses the **RunAnywhere SDK v0.1.3-alpha** which includes:

- **Core SDK** (4.0 MB): Component architecture, model management, event system
- **LlamaCpp Module** (2.1 MB): 7 optimized llama.cpp native libraries for ARM64
    - Variants: Baseline, fp16, dotprod, v8.4, i8mm, sve, i8mm+sve
    - Runtime CPU feature detection selects the best variant

### Initialization Flow

1. **App Launch** → `MyApplication.onCreate()`
2. **SDK Initialization** (background thread):
    - Initialize RunAnywhere SDK
    - Register LlamaCpp service provider
    - Register available models
    - Scan for previously downloaded models
3. **Ready to use** → `isSDKInitialized = true`

### Response Generation Flow

1. **User Input** → JavaScript → Android Bridge
2. **Check SDK Status**:
    - If model loaded → Generate AI response
    - If SDK ready but no model → Show model instructions
    - If SDK not ready → Use demo mode (pattern matching)
3. **Response** → JavaScript → Display in UI

## Customization

### Adding More Models

Edit `MyApplication.kt` in the `registerModels()` function:

```kotlin
addModelFromURL(
    url = "https://huggingface.co/<repo>/resolve/main/<model>.gguf",
    name = "My Custom Model",
    type = "LLM"
)
```

### Customizing UI

Edit the files in `app/src/main/assets/`:

- `index.html` - Structure
- `css/style.css` - Styling
- `js/script.js` - JavaScript logic

### Changing Demo Responses

Edit the `generateSmartResponse()` function in `MainActivity.kt` to customize pattern-based
responses.

## Model Comparison

| Model         | Size   | Quality | Speed   | Use Case              |
|---------------|--------|---------|---------|-----------------------|
| SmolLM2 360M  | 119 MB | Basic   | Fast    | Testing, simple Q&A   |
| Qwen 2.5 0.5B | 374 MB | Good    | Medium  | General conversations |
| Llama 3.2 1B  | 815 MB | Better  | Slower  | Quality responses     |
| Qwen 2.5 1.5B | 1.2 GB | Best    | Slowest | High-quality chat     |

**Recommendation**: Start with **SmolLM2 360M** for testing, then upgrade to **Qwen 2.5 0.5B** for
production.

## Troubleshooting

### Model Download Fails

- Check internet connection
- Verify `INTERNET` permission in `AndroidManifest.xml`
- Ensure sufficient storage space

### Model Load Fails

- Ensure model is fully downloaded
- Check available device memory (models need RAM)
- Try closing other apps to free memory
- Restart the app

### Generation is Slow

- Normal for on-device inference
- Try a smaller model (SmolLM2 360M)
- Ensure `android:largeHeap="true"` in manifest
- Close background apps

### App Crashes

- Reduce model size
- Enable `android:largeHeap="true"`
- Use release build (faster than debug)
- Check device RAM availability

### SDK Not Initializing

- Check logcat for error messages
- Verify AAR files are in `app/libs/`
- Ensure Gradle sync completed successfully
- Check minSdk is 26 or higher

## Development Notes

### Dependencies

```kotlin
// Core SDK
implementation(files("libs/RunAnywhereKotlinSDK-release.aar"))

// LLM Module
implementation(files("libs/runanywhere-llm-llamacpp-release.aar"))

// Required
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
```

### Required Permissions

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
                 android:maxSdkVersion="28" />
```

### Build Configuration

- **compileSdk**: 36
- **minSdk**: 26
- **targetSdk**: 36
- **JVM Target**: 17

## Future Enhancements

- [ ] Persistent chat history
- [ ] Voice input/output
- [ ] Image generation capabilities
- [ ] Multi-modal models (text + images)
- [ ] Custom system prompts
- [ ] Model performance metrics
- [ ] Export/import conversations
- [ ] Theme customization

## License

This project uses the RunAnywhere SDK. Please refer to the SDK's license terms.

## Resources

- [RunAnywhere SDK Documentation](https://github.com/RunanywhereAI/runanywhere-sdks)
- [llama.cpp](https://github.com/ggerganov/llama.cpp)
- [HuggingFace Models](https://huggingface.co/models)

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

---
**Made with ❤️ using RunAnywhere SDK and llama.cpp**
