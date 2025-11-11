document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const newChatBtn = document.getElementById('new-chat-btn');
    const appTitle = document.getElementById('app-title');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const backToChat = document.getElementById('back-to-chat');
    const openMenuBtn = document.getElementById('open-menu-btn');

    // Display random greeting message
    displayRandomGreeting();

    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // New Chat button functionality
    newChatBtn.addEventListener('click', startNewChat);

    // Sidebar functionality
    appTitle.addEventListener('click', openSidebar);
    closeSidebar.addEventListener('click', closeSidebarMenu);
    sidebarOverlay.addEventListener('click', closeSidebarMenu);

    // Back to chat button
    backToChat.addEventListener('click', hideInfoScreen);

    // Open menu button from info screen
    openMenuBtn.addEventListener('click', openSidebar);

    // Sidebar menu items
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const action = item.getAttribute('data-action');
            handleSidebarAction(action);
            closeSidebarMenu();
        });
    });
});

function displayRandomGreeting() {
    const greetings = [
        "Hey there! Ready to chat?",
        "Hi! What's on your mind today?",
        "Hello! How can I help you?",
        "What's up? Let's talk!",
        "Hey! Ask me anything.",
        "Hi there! I'm here to chat."
    ];
    
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    document.getElementById('greeting-message').innerText = randomGreeting;
}

function addMessageToUI(text, sender) {
    const chatContainer = document.getElementById('chat-container');
    
    // Hide welcome screen on first message
    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen && welcomeScreen.style.display !== 'none') {
        welcomeScreen.style.display = 'none';
    }
    
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper', sender);
    
    // Add name tag for AI messages
    if (sender === 'ai') {
        const nameTag = document.createElement('div');
        nameTag.classList.add('name-tag');
        nameTag.innerText = 'Ellie';
        messageWrapper.appendChild(nameTag);
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerText = text;
    
    // Add timestamp
    const timestamp = document.createElement('span');
    timestamp.classList.add('timestamp');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    timestamp.innerText = `${hours}:${minutes}`;
    messageDiv.appendChild(timestamp);
    
    messageWrapper.appendChild(messageDiv);
    
    chatContainer.appendChild(messageWrapper);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// THIS FUNCTION IS CALLED BY KOTLIN
function onAIResponseReceived(responseText) {
    addMessageToUI(responseText, 'ai');
}

// Update the last message (for progress updates)
function updateLastMessage(newText) {
    const chatContainer = document.getElementById('chat-container');
    const messageWrappers = chatContainer.getElementsByClassName('message-wrapper');
    if (messageWrappers.length > 0) {
        const lastWrapper = messageWrappers[messageWrappers.length - 1];
        const messageDiv = lastWrapper.getElementsByClassName('message')[0];
        if (messageDiv) {
            messageDiv.innerText = newText;
        }
    }
}

function handleSend() {
    const userInputField = document.getElementById('user-input');
    const userText = userInputField.value.trim();
    if (!userText) return;

    addMessageToUI(userText, 'user');
    userInputField.value = '';

    // Check if the Android bridge object exists
    if (window.Android) {
        // Handle special commands
        if (userText === '/models' || userText.toLowerCase() === 'show models') {
            if (typeof window.Android.getAvailableModels === 'function') {
                window.Android.getAvailableModels();
            } else {
                onAIResponseReceived("Model management not available.");
            }
        } else if (userText.startsWith('/download ')) {
            const modelId = userText.substring(10).trim();
            if (modelId && typeof window.Android.downloadModel === 'function') {
                window.Android.downloadModel(modelId);
            } else {
                onAIResponseReceived("Usage: /download <model_id>");
            }
        } else if (userText.startsWith('/load ')) {
            const modelId = userText.substring(6).trim();
            if (modelId && typeof window.Android.loadModel === 'function') {
                window.Android.loadModel(modelId);
            } else {
                onAIResponseReceived("Usage: /load <model_id>");
            }
        } else if (typeof window.Android.processUserMessage === 'function') {
            // Regular chat message
            window.Android.processUserMessage(userText);
        } else {
            onAIResponseReceived("Bridge not available.");
        }
    } else {
        // Fallback for browser testing
        onAIResponseReceived("Bridge not available. Are you in a browser?");
    }
}

function startNewChat() {
    const chatContainer = document.getElementById('chat-container');
    const welcomeScreen = document.getElementById('welcome-screen');
    
    // Remove all message wrappers
    const messages = chatContainer.querySelectorAll('.message-wrapper');
    messages.forEach(msg => msg.remove());
    
    // Show welcome screen again
    if (welcomeScreen) {
        welcomeScreen.style.display = 'flex';
        displayRandomGreeting();
    }
    
    // Clear input field
    document.getElementById('user-input').value = '';
    
    // Scroll to top
    chatContainer.scrollTop = 0;
}

function openSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
}

function closeSidebarMenu() {
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
}

function hideInfoScreen() {
    const infoScreen = document.getElementById('info-screen');
    const chatContainer = document.getElementById('chat-container');
    const header = document.getElementById('header');
    const inputContainer = document.getElementById('input-container');
    
    if (infoScreen) {
        infoScreen.classList.add('hidden');
        infoScreen.classList.remove('visible');
    }
    chatContainer.style.display = 'flex';
    header.style.display = 'block';
    inputContainer.style.display = 'flex';
}

function handleSidebarAction(action) {
    console.log('Sidebar action:', action);
    
    const chatContainer = document.getElementById('chat-container');
    const infoScreen = document.getElementById('info-screen');
    const infoContent = document.getElementById('info-content');
    const header = document.getElementById('header');
    const inputContainer = document.getElementById('input-container');
    
    // Hide chat interface completely
    chatContainer.style.display = 'none';
    header.style.display = 'none';
    inputContainer.style.display = 'none';
    
    // Show info screen properly
    if (infoScreen) {
        infoScreen.classList.remove('hidden');
        infoScreen.classList.add('visible');
        infoScreen.style.display = 'flex';
        console.log('Info screen classes:', infoScreen.className);
    }

    let htmlContent = '';
    
    switch(action) {
        case 'about':
            htmlContent = `
                <h1>📱 About Us – Team Quantum Spark ⚡</h1>
                <p>We are Quantum Spark, a passionate group of innovators driven by curiosity, logic, and creativity. Our team believes in fusing technology with imagination to create impactful solutions that make a difference.</p>
                
                <p>Every project we build is powered by teamwork, precision, and a spark of innovation — whether it's solving real-world challenges, optimizing systems, or experimenting with cutting-edge AI.</p>
                
                <p>We don't just code — we ignite ideas that matter. 💡</p>
                
                <p style="margin-top: 40px; text-align: center; color: #6366f1; font-size: 14px;">Version 1.0 • Developed with ❤️</p>
            `;
            break;
            
        case 'faq':
            htmlContent = `
                <h1>❓ Frequently Asked Questions</h1>
                
                <div class="faq-item">
                    <div class="faq-question">What can Ellie do?</div>
                    <div class="faq-answer">I can answer questions, have conversations, provide information, and help with various tasks. I'm designed to be your friendly AI assistant!</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How do I start a new chat?</div>
                    <div class="faq-answer">Click the 'New Chat' button at the top right corner of the screen to clear the conversation and start fresh.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">Is my data private?</div>
                    <div class="faq-answer">Yes! Your conversations are private and secure. We prioritize your privacy and data protection.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">Can I customize Ellie?</div>
                    <div class="faq-answer">Customization options are coming soon! We're working on adding themes, settings, and personalization features.</div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">How do I access the menu?</div>
                    <div class="faq-answer">Click on the "Ellie" logo in the top left corner to open the sidebar menu with various options.</div>
                </div>
                
                <p style="margin-top: 40px; color: #cbd5e1;">Have more questions? Feel free to ask me anything in the chat!</p>
            `;
            break;
            
        case 'contact':
            htmlContent = `
                <h1>📧 Contact Developer</h1>
                <p>We'd love to hear from you! Whether you have feedback, suggestions, or collaboration opportunities, don't hesitate to reach out.</p>
                
                <div class="info-card">
                    <h3>Get in Touch</h3>
                    <div class="contact-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>developer@elliechatbot.com</span>
                    </div>
                    <div class="contact-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                        <span>www.elliechatbot.com</span>
                    </div>
                    <div class="contact-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        <span>github.com/elliechatbot</span>
                    </div>
                </div>
                
                <div class="info-card">
                    <h3>Response Time</h3>
                    <p>We typically respond within 24-48 hours during business days. For urgent issues, please mark your email as "Urgent".</p>
                </div>
                
                <p style="margin-top: 32px; color: #94a3b8;">Feel free to reach out with suggestions, feedback, bug reports, or collaboration opportunities!</p>
            `;
            break;
            
        case 'report':
            htmlContent = `
                <h1>⚠️ Report a Problem</h1>
                <p>We're sorry you're experiencing issues. Your feedback helps us improve Ellie for everyone!</p>
                
                <div class="info-card">
                    <h3>Information to Include</h3>
                    <ul>
                        <li>Clear description of the problem</li>
                        <li>Steps to reproduce the issue</li>
                        <li>Device model and OS version</li>
                        <li>Screenshots or screen recordings (if applicable)</li>
                        <li>When the problem started occurring</li>
                    </ul>
                </div>
                
                <div class="info-card">
                    <h3>How to Report</h3>
                    <div class="contact-item">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <span>support@elliechatbot.com</span>
                    </div>
                    <p style="margin-top: 12px; color: #94a3b8; font-size: 14px;">Please include "Bug Report" in the subject line</p>
                </div>
                
                <div class="info-card">
                    <h3>What Happens Next?</h3>
                    <p>Our team will investigate the issue and work on a fix. We'll keep you updated on the progress via email.</p>
                </div>
                
                <p style="margin-top: 32px; color: #94a3b8;">Thank you for helping us improve Ellie! Your reports make a difference. 🙏</p>
            `;
            break;
    }
    
    // Display the HTML content
    if (htmlContent) {
        infoContent.innerHTML = htmlContent;
        infoContent.scrollTop = 0; // Scroll to top
        console.log('Content set, length:', htmlContent.length);
    }
}
