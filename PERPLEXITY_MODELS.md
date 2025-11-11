# 🌐 Perplexity API Models

## Current Valid Models (2025)

Your app is configured to use the latest Perplexity API models.

### 1. **sonar** (Default - Recommended)

- **Speed:** ⚡⚡⚡ Very Fast
- **Quality:** ⭐⭐⭐⭐ Excellent
- **Search:** ✅ Yes
- **Cost:** Most affordable
- **Best for:** General chat, questions, research

**Used by default in your app!**

### 2. **sonar-pro**

- **Speed:** ⚡⚡ Fast
- **Quality:** ⭐⭐⭐⭐⭐ Best
- **Search:** ✅ Yes
- **Cost:** Higher
- **Best for:** Complex questions, detailed analysis

### 3. **sonar-reasoning**

- **Speed:** ⚡ Moderate
- **Quality:** ⭐⭐⭐⭐⭐ Best (with reasoning)
- **Search:** ✅ Yes
- **Cost:** Highest
- **Best for:** Complex problem-solving, step-by-step reasoning

### 4. **llama-3.1-sonar-small-128k-chat**

- **Speed:** ⚡⚡⚡ Very Fast
- **Quality:** ⭐⭐⭐ Good
- **Search:** ❌ No
- **Cost:** Cheapest
- **Best for:** Simple chat without search

### 5. **llama-3.1-sonar-large-128k-chat**

- **Speed:** ⚡⚡ Fast
- **Quality:** ⭐⭐⭐⭐ Very Good
- **Search:** ❌ No
- **Cost:** Low
- **Best for:** Chat without needing web search

---

## How to Change Models

### In Code

Edit `MainActivity.kt`, line ~246:

```kotlin
val result = perplexityHelper.generateResponse(
    userMessage = userMessage,
    model = PerplexityApiHelper.MODEL_SONAR_LARGE, // Change this
    systemPrompt = systemPrompt,
    includeSearch = true,
    temperature = 0.7,
    maxTokens = 1000
)
```

### Available Constants

```kotlin
PerplexityApiHelper.MODEL_SONAR_SMALL        // "sonar-pro"
PerplexityApiHelper.MODEL_SONAR_LARGE        // "sonar" (default)
PerplexityApiHelper.MODEL_SONAR_REASONING    // "sonar-reasoning"
PerplexityApiHelper.MODEL_CHAT_SMALL         // "llama-3.1-sonar-small-128k-chat"
PerplexityApiHelper.MODEL_CHAT_LARGE         // "llama-3.1-sonar-large-128k-chat"
```

---

## Cost Comparison

| Model | Input (per 1M tokens) | Output (per 1M tokens) |
|-------|----------------------|------------------------|
| **sonar** | $1.00 | $1.00 |
| **sonar-pro** | $3.00 | $15.00 |
| **sonar-reasoning** | $5.00 | $15.00 |
| **chat-small** | $0.20 | $0.20 |
| **chat-large** | $1.00 | $1.00 |

*Prices are approximate and subject to change*

---

## Model Features

### With Internet Search

- ✅ sonar
- ✅ sonar-pro
- ✅ sonar-reasoning

**Use these for:**

- Current events
- Real-time information
- Research questions
- Fact-checking

### Without Search (Chat Only)

- ❌ llama-3.1-sonar-small-128k-chat
- ❌ llama-3.1-sonar-large-128k-chat

**Use these for:**

- General conversation
- Creative writing
- Brainstorming
- When you don't need web data

---

## Recommended Setup

### For Most Users (Default)

```kotlin
model = PerplexityApiHelper.MODEL_SONAR_LARGE // "sonar"
```

- Good balance of speed, quality, and cost
- Internet search enabled
- Best for general use

### For Budget-Conscious

```kotlin
model = PerplexityApiHelper.MODEL_CHAT_SMALL
includeSearch = false
```

- Cheapest option
- Still good quality
- No search needed

### For Best Quality

```kotlin
model = PerplexityApiHelper.MODEL_SONAR_SMALL // "sonar-pro"
```

- Highest quality responses
- Advanced reasoning
- Worth the extra cost for important queries

### For Complex Problems

```kotlin
model = PerplexityApiHelper.MODEL_SONAR_REASONING
```

- Step-by-step reasoning
- Best for math, logic, analysis
- Most expensive but most capable

---

## Testing Different Models

You can easily test by changing the model in your code:

```kotlin
// Test 1: Basic chat (cheap)
model = PerplexityApiHelper.MODEL_CHAT_SMALL

// Test 2: General use (default)
model = PerplexityApiHelper.MODEL_SONAR_LARGE

// Test 3: Best quality
model = PerplexityApiHelper.MODEL_SONAR_SMALL

// Test 4: Complex reasoning
model = PerplexityApiHelper.MODEL_SONAR_REASONING
```

---

## Model Selection Tips

1. **Start with `sonar`** (default) - It's the best balance
2. **Use chat models** if you don't need web search
3. **Upgrade to `sonar-pro`** for important questions
4. **Use `sonar-reasoning`** for complex problems only

---

## What Changed?

### Old Model Names (Invalid)

- ❌ llama-3.1-sonar-small-128k-online
- ❌ llama-3.1-sonar-large-128k-online
- ❌ llama-3.1-sonar-huge-128k-online

### New Model Names (Valid)

- ✅ sonar
- ✅ sonar-pro
- ✅ sonar-reasoning

**Your app now uses the correct model names!**

---

## Current Configuration

Your app is set to:

- **Model:** `sonar` (fast, affordable, with search)
- **Search:** Enabled
- **Temperature:** 0.7 (balanced creativity)
- **Max Tokens:** 1000 (good response length)

This is a great default setup! 🎉