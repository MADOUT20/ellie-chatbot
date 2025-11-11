# Ellie Chatbot - Complete Project Files

This document contains all the key files for the hybrid Android chatbot application. Each file is
shown with its full path and complete code, ready to copy and paste.

---

## File 1: `app/src/main/AndroidManifest.xml`

**Purpose**: App configuration with INTERNET permission and NoActionBar theme

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">

    <!-- Permission to access the internet (required for SDK) -->
    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:dataExtractionRules="@xml/data_extraction_rules"
        android:fullBackupContent="@xml/backup_rules"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.Light.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:label="@string/app_name"
            android:theme="@style/Theme.AppCompat.Light.NoActionBar">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

---

## File 2: `app/build.gradle.kts`

**Purpose**: Module-level build configuration with dependencies

```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.example.elliechatbot"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.example.elliechatbot"
        minSdk = 29
        targetSdk = 36
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
    }
    kotlinOptions {
        jvmTarget = "11"
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.appcompat)
    
    // TODO: Replace this with the actual RunAnywhere SDK dependency
    // Example: implementation("com.runanywhere:sdk:1.0.0")
    // For now, this is a placeholder comment
    
    testImplementation(libs.junit)
    androidTestImplementation(libs.androidx.junit)
    androidTestImplementation(libs.androidx.espresso.core)
}
```

---

## File 3: `app/src/main/res/layout/activity_main.xml`

**Purpose**: Layout file with full-screen WebView

```xml
<?xml version="1.0" encoding="utf-8"?>
<WebView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/webview"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

---

## File 4: `app/src/main/java/com/example/elliechatbot/MainActivity.kt`

**Purpose**: Main activity with WebView setup, JavaScript bridge, and AI integration

```kotlin
package com.example.elliechatbot

import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebSettings
import android.webkit.WebView
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView
    // TODO: Replace with actual RunAnywhere SDK model type
    private lateinit var aiModel: Any // Placeholder for the AI model

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        // Initialize the WebView
        webView = findViewById(R.id.webview)
        setupWebView()

        // TODO: Initialize the RunAnywhere SDK
        // Uncomment and configure when you have the actual SDK
        // RunAnywhere.initialize(this, "YOUR_API_KEY_HERE")

        // TODO: Load the AI model
        // Uncomment when you have the actual SDK
        // aiModel = RunAnywhere.loadModel("ellie-chatbot-model-v1")
    }

    /**
     * Configure the WebView settings and add the JavaScript interface
     */
    private fun setupWebView() {
        val webSettings: WebSettings = webView.settings
        webSettings.javaScriptEnabled = true
        webSettings.domStorageEnabled = true

        // Add the JavaScript interface (the bridge between JS and Kotlin)
        webView.addJavascriptInterface(WebAppInterface(), "Android")

        // Load the local HTML file from assets
        webView.loadUrl("file:///android_asset/index.html")
    }

    /**
     * Inner class that defines the JavaScript interface.
     * This is the "bridge" that allows JavaScript to call native Kotlin code.
     */
    private inner class WebAppInterface {

        /**
         * This method is called from JavaScript when the user sends a message.
         * It processes the message using the RunAnywhere AI SDK and sends the response back to JS.
         *
         * @param message The user's input message from the chat UI
         */
        @JavascriptInterface
        fun processUserMessage(message: String) {
            // TODO: Replace this with actual RunAnywhere SDK call
            // Example implementation (uncomment when SDK is available):
            /*
            aiModel.generateResponse(message, object : AIResponseListener {
                override fun onSuccess(response: String) {
                    // Send the AI response back to JavaScript
                    sendResponseToJavaScript(response)
                }

                override fun onError(error: Exception) {
                    // Handle errors and send error message to JavaScript
                    val errorMessage = "Error: ${error.message}"
                    sendResponseToJavaScript(errorMessage)
                }
            })
            */

            // For now, use a mock response for testing purposes
            val mockResponse = "This is a mock response. Replace this with the RunAnywhere SDK call."
            sendResponseToJavaScript(mockResponse)
        }

        /**
         * Sends the AI's response back to the JavaScript layer by calling the
         * onAIResponseReceived() function defined in script.js
         *
         * @param response The AI-generated response text
         */
        private fun sendResponseToJavaScript(response: String) {
            // Must run on UI thread to interact with WebView
            runOnUiThread {
                // Escape special characters in the response to safely pass to JavaScript
                val escapedResponse = response
                    .replace("\\", "\\\\")
                    .replace("\"", "\\\"")
                    .replace("\n", "\\n")
                    .replace("\r", "\\r")

                // Call the JavaScript function with the response
                webView.evaluateJavascript("onAIResponseReceived(\"$escapedResponse\");", null)
            }
        }
    }
}
```

---

## File 5: `app/src/main/assets/index.html`

**Purpose**: Main HTML page for the chat interface

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ellie Chatbot</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div id="chat-container">
        <!-- Messages will be appended here -->
    </div>
    <div id="input-container">
        <input type="text" id="user-input" placeholder="Type a message..." autocomplete="off">
        <button id="send-btn">Send</button>
    </div>
    <script src="js/script.js"></script>
</body>
</html>
```

---

## File 6: `app/src/main/assets/css/style.css`

**Purpose**: Styling for the chat interface with modern message bubbles

```css
body {
    font-family: sans-serif;
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f9;
}
#chat-container {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
.message {
    padding: 10px 15px;
    border-radius: 18px;
    max-width: 80%;
    line-height: 1.4;
}
.user {
    background-color: #007bff;
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
}
.ai {
    background-color: #e9e9eb;
    color: black;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
}
#input-container {
    display: flex;
    padding: 10px;
    border-top: 1px solid #ddd;
    background-color: #fff;
}
#user-input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 20px;
    outline: none;
}
#send-btn {
    padding: 10px 20px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 20px;
    margin-left: 10px;
    cursor: pointer;
}
```

---

## File 7: `app/src/main/assets/js/script.js`

**Purpose**: JavaScript logic with Android bridge communication

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });
});

function addMessageToUI(text, sender) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerText = text;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// THIS FUNCTION IS CALLED BY KOTLIN
function onAIResponseReceived(responseText) {
    addMessageToUI(responseText, 'ai');
}

function handleSend() {
    const userInputField = document.getElementById('user-input');
    const userText = userInputField.value.trim();
    if (!userText) return;

    addMessageToUI(userText, 'user');
    userInputField.value = '';

    // Check if the Android bridge object exists and call it
    if (window.Android && typeof window.Android.processUserMessage === 'function') {
        window.Android.processUserMessage(userText);
    } else {
        // Fallback for browser testing
        onAIResponseReceived("Bridge not available. Are you in a browser?");
    }
}
```

---

## Integration Steps

### Step 1: Add the RunAnywhere SDK Dependency

In `app/build.gradle.kts`, replace the TODO comment with:

```kotlin
implementation("com.runanywhere:sdk:1.0.0")  // Use actual version
```

Then sync Gradle.

### Step 2: Initialize the SDK

In `MainActivity.kt`, uncomment these lines in `onCreate()`:

```kotlin
RunAnywhere.initialize(this, "YOUR_API_KEY_HERE")
aiModel = RunAnywhere.loadModel("ellie-chatbot-model-v1")
```

### Step 3: Implement the AI Call

In `MainActivity.kt`, replace the mock response section in `processUserMessage()`:

```kotlin
aiModel.generateResponse(message, object : AIResponseListener {
    override fun onSuccess(response: String) {
        sendResponseToJavaScript(response)
    }
    
    override fun onError(error: Exception) {
        val errorMessage = "Error: ${error.message}"
        sendResponseToJavaScript(errorMessage)
    }
})
```

---

## Communication Flow Diagram

```
User Input in Web UI
        ↓
JavaScript: handleSend()
        ↓
JavaScript calls: window.Android.processUserMessage(message)
        ↓
Kotlin: @JavascriptInterface processUserMessage(message)
        ↓
Kotlin: aiModel.generateResponse(message, listener)
        ↓
RunAnywhere SDK processes message
        ↓
Kotlin: onSuccess(response)
        ↓
Kotlin: sendResponseToJavaScript(response)
        ↓
Kotlin: webView.evaluateJavascript("onAIResponseReceived(...)")
        ↓
JavaScript: onAIResponseReceived(responseText)
        ↓
JavaScript: addMessageToUI(responseText, 'ai')
        ↓
AI response displayed in chat UI
```

---

## Testing Checklist

- [ ] Project builds without errors
- [ ] App launches successfully
- [ ] WebView displays the chat interface
- [ ] User can type and send messages
- [ ] Mock responses appear (before SDK integration)
- [ ] No JavaScript console errors
- [ ] Bridge communication works in both directions
- [ ] After SDK integration: Real AI responses appear
- [ ] Error handling works correctly
- [ ] App works on different screen sizes

---

## File Structure Overview

```
ELLIECHATBOT/
├── app/
│   ├── src/main/
│   │   ├── AndroidManifest.xml          ✅ INTERNET permission, NoActionBar theme
│   │   ├── assets/
│   │   │   ├── index.html               ✅ Chat UI structure
│   │   │   ├── css/style.css            ✅ Modern chat styling
│   │   │   └── js/script.js             ✅ Bridge communication
│   │   ├── java/com/example/elliechatbot/
│   │   │   └── MainActivity.kt          ✅ WebView + Bridge + AI logic
│   │   └── res/layout/
│   │       └── activity_main.xml        ✅ Full-screen WebView
│   └── build.gradle.kts                 ✅ Dependencies configuration
├── gradle/libs.versions.toml            ✅ Version catalog
└── README.md                            ✅ Project documentation
```

---

## Summary

All files are now in place for a complete hybrid Android chatbot application:

✅ **AndroidManifest.xml** - Configured with INTERNET permission and NoActionBar theme  
✅ **build.gradle.kts** - Ready for RunAnywhere SDK dependency  
✅ **activity_main.xml** - Simple full-screen WebView layout  
✅ **MainActivity.kt** - Complete bridge implementation with TODO markers  
✅ **index.html** - Clean chat interface structure  
✅ **style.css** - Modern message bubble styling  
✅ **script.js** - Bidirectional bridge communication  
✅ **README.md** - Comprehensive documentation

The application is **ready to build and test** with mock responses. Once you add the actual
RunAnywhere SDK, simply uncomment the TODO sections and replace the mock implementation with real AI
calls.
