document.addEventListener('DOMContentLoaded', () => {
  // --- Setup and Sanity Checks ---
  const urlParams = new URLSearchParams(window.location.search);
  let rawName = urlParams.get('name') || '';
  
  // Sanitize the input to prevent XSS
  function sanitizeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
  
  const visitorName = rawName.trim() ? sanitizeHTML(rawName.trim()) : 'Friend';
  
  // Update name elements in DOM
  const nameSpans = document.querySelectorAll('.visitor-name');
  nameSpans.forEach(span => {
    span.textContent = visitorName;
  });
  
  const terminalNameSpan = document.getElementById('terminal-target-name');
  if (terminalNameSpan) {
    terminalNameSpan.textContent = visitorName;
  }

  // Set active tab switcher logic (purely visual for VS Code feel)
  const tabAppreciation = document.getElementById('tab-appreciation');
  const tabTerminal = document.getElementById('tab-terminal');
  const previewScreen = document.getElementById('preview-screen');
  const terminalScreen = document.getElementById('terminal-screen');
  
  function switchTab(activeTab, inactiveTab, showScreen, hideScreen) {
    activeTab.classList.add('active');
    inactiveTab.classList.remove('active');
    showScreen.classList.remove('hidden');
    hideScreen.classList.add('hidden');
  }

  tabAppreciation.addEventListener('click', () => {
    switchTab(tabAppreciation, tabTerminal, previewScreen, terminalScreen);
  });

  tabTerminal.addEventListener('click', () => {
    switchTab(tabTerminal, tabAppreciation, terminalScreen, previewScreen);
  });

  // Initialize Confetti Engine
  let confetti = null;
  if (window.ConfettiEngine) {
    confetti = new ConfettiEngine('confetti-canvas');
  }

  // --- Boot Sequence Simulator ---
  const bootLogsContainer = document.getElementById('boot-sequence-logs');
  const statusBuildText = document.getElementById('status-build-text');

  const bootSteps = [
    { text: 'Initializing Gratitude Engine v42.0...', delay: 300, type: 'info' },
    { text: 'Loading birthday memories...', delay: 500, type: 'info' },
    { text: 'PROGRESS_BAR', delay: 800 },
    { text: 'Wish received from: ' + visitorName, delay: 300, type: 'success' },
    { text: 'Smile generated: 100% efficiency', delay: 200, type: 'success' },
    { text: 'Happiness quotient: +10 XP', delay: 250, type: 'success' },
    { text: 'Friend connection verified: SECURE', delay: 200, type: 'success' },
    { text: 'Compiling appreciation page...', delay: 400, type: 'info' },
    { text: 'Build Status: SUCCESS', delay: 300, type: 'success' }
  ];

  function createLogLine(text, type = '') {
    const div = document.createElement('div');
    div.className = 'terminal-log';
    if (type === 'success') div.classList.add('log-success');
    if (type === 'info') div.classList.add('log-info');
    if (type === 'warning') div.classList.add('log-warning');
    div.textContent = text;
    return div;
  }

  function simulateProgressBar(container, callback) {
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'progress-bar-container';
    
    const label = document.createElement('span');
    label.textContent = 'Scanning: ';
    label.style.color = 'var(--text-muted)';
    
    const bar = document.createElement('div');
    bar.className = 'progress-bar';
    
    const fill = document.createElement('div');
    fill.className = 'progress-fill';
    
    const percent = document.createElement('span');
    percent.textContent = '0%';
    percent.style.fontFamily = 'var(--font-mono)';
    percent.style.width = '45px';
    percent.style.display = 'inline-block';
    
    bar.appendChild(fill);
    progressWrapper.appendChild(label);
    progressWrapper.appendChild(bar);
    progressWrapper.appendChild(percent);
    container.appendChild(progressWrapper);

    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        fill.style.width = '100%';
        percent.textContent = '100%';
        percent.style.color = 'var(--text-green)';
        setTimeout(callback, 200);
      } else {
        fill.style.width = progress + '%';
        percent.textContent = progress + '%';
      }
    }, 80);
  }

  let stepIndex = 0;
  function executeBootSequence() {
    if (stepIndex >= bootSteps.length) {
      // Completed boot sequence
      setTimeout(() => {
        // Transition screen
        switchTab(tabAppreciation, tabTerminal, previewScreen, terminalScreen);
        if (statusBuildText) {
          statusBuildText.textContent = '✓ Build SUCCESS';
          statusBuildText.className = 'status-item text-green';
        }
        // Blast Confetti
        if (confetti) {
          confetti.blast(2500);
        }
      }, 600);
      return;
    }

    const step = bootSteps[stepIndex];
    if (step.text === 'PROGRESS_BAR') {
      simulateProgressBar(bootLogsContainer, () => {
        stepIndex++;
        executeBootSequence();
      });
    } else {
      setTimeout(() => {
        const line = createLogLine(step.text, step.type);
        bootLogsContainer.appendChild(line);
        // Scroll terminal to bottom
        terminalScreen.scrollTop = terminalScreen.scrollHeight;
        stepIndex++;
        executeBootSequence();
      }, step.delay);
    }
  }

  // Trigger boot sequence on start
  setTimeout(executeBootSequence, 500);

  // --- AI Gratitude Engine (20 custom heartfelt messages) ---
  const aiMessages = [
    "Some people send gifts.\nSome people send cake.\nYou sent your time.\nThat means just as much.\nThank you! ❤️",
    "A message from you always brightens my day.\nThanks for taking the time to send such kind birthday wishes! ✨",
    "Thank you for the warm birthday wishes!\nHaving you in my life is the best gift I could ask for. 🌟",
    "Your words put a huge smile on my face today.\nThank you for being such a wonderful part of my journey. 😊",
    "Your wish is stored in the database of my favorite memories now.\nThank you for making today special! 💾",
    "You made a busy day feel incredibly warm and celebrated.\nThanks for thinking of me! ☕",
    "Thank you for the birthday wishes!\nIt's friends like you who make getting older feel like leveling up. 🎮",
    "A simple text can carry a lot of warmth.\nThank you for taking a moment to send yours today. 💬",
    "Your message brought a piece of sunshine to my day.\nThank you so much! ☀️",
    "Words have energy, and yours filled me with absolute gratitude.\nThank you for wishing me! 🔋",
    "Thank you for the birthday love!\nMay the good vibes you sent my way return to you tenfold. 🔄",
    "It's not the years that count, but the people we share them with.\nThank you for being there. 👥",
    "Your message is compiled, verified, and successfully deployed to my heart.\nThank you! 💻",
    "Birthdays come and go, but kind friends leave a lasting impact.\nThanks for the beautiful wish. 🎯",
    "I appreciate the thought and the time you spent wishing me a happy birthday.\nThank you! 🙌",
    "Your wish was the perfect reminder of how lucky I am to have people like you in my life.\nThank you. 🍀",
    "A little virtual birthday cheer goes a long way.\nThank you for making me smile! 🎈",
    "Every wish counts, but yours added some extra magic to my day.\nThank you! 🪄",
    "Thank you for celebrating my milestone with me, even from afar.\nYour words mean a lot. 🗺️",
    "In the console log of life, your friendship is a critical success factor.\nThanks for the wishes! 🖥️"
  ];

  const btnGenerateAi = document.getElementById('btn-generate-ai');
  const aiMessageBox = document.getElementById('ai-message-box');
  const aiMessageContent = document.getElementById('ai-message-content');
  const aiStatusLabel = aiMessageBox.querySelector('.ai-status');

  let lastIndex = -1;
  let isTyping = false;

  function typeWriterEffect(text, element, speed = 25, callback) {
    let index = 0;
    element.textContent = '';
    
    function type() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }

  btnGenerateAi.addEventListener('click', () => {
    if (isTyping) return;
    isTyping = true;
    
    aiMessageBox.classList.remove('hidden');
    aiStatusLabel.textContent = 'Streaming...';
    aiStatusLabel.style.color = 'var(--text-yellow)';
    aiStatusLabel.style.textShadow = '0 0 10px rgba(220, 220, 170, 0.4)';
    
    // Choose index ensuring no duplicates back-to-back
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * aiMessages.length);
    } while (randomIndex === lastIndex && aiMessages.length > 1);
    
    lastIndex = randomIndex;
    const msg = aiMessages[randomIndex];
    
    // Smooth scroll down to the AI message container (critical for mobile WhatsApp view)
    setTimeout(() => {
      aiMessageBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);

    typeWriterEffect(msg, aiMessageContent, 20, () => {
      isTyping = false;
      aiStatusLabel.textContent = 'Ready';
      aiStatusLabel.style.color = 'var(--text-green)';
      aiStatusLabel.style.textShadow = 'var(--glow-green)';
      
      // Blast light confetti
      if (confetti) {
        confetti.blast(1000);
      }
    });
  });

  // --- Double Tap Cake Achievement Easter Egg ---
  const cakeWrapper = document.getElementById('cake-wrapper');
  let lastTap = 0;

  function triggerAchievement(message) {
    const toast = document.getElementById('achievement-toast');
    const desc = document.getElementById('achievement-desc');
    
    desc.textContent = message;
    toast.classList.remove('hidden');
    
    // Trigger confetti
    if (confetti) {
      confetti.blast(2500);
    }

    // Auto dismiss toast
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 6000);
  }

  cakeWrapper.addEventListener('click', () => {
    const now = Date.now();
    const TIMESPAN = 300; // ms
    if ((now - lastTap) < TIMESPAN) {
      // Double tap!
      triggerAchievement("You found the hidden birthday cake feature. Achievement Unlocked! 🏆");
    }
    lastTap = now;
  });

  // Tap hint for mobile tap events
  cakeWrapper.addEventListener('touchstart', () => {
    const now = Date.now();
    const TIMESPAN = 300; // ms
    if ((now - lastTap) < TIMESPAN) {
      triggerAchievement("You found the hidden birthday cake feature. Achievement Unlocked! 🏆");
    }
    lastTap = now;
  });

  // Toast close button
  document.getElementById('btn-close-toast').addEventListener('click', () => {
    document.getElementById('achievement-toast').classList.add('hidden');
  });

  // --- Keyboard 'happybirthday' Easter Egg ---
  const eggCode = 'happybirthday';
  let eggBuffer = '';

  window.addEventListener('keydown', (e) => {
    // Only register alphabetical characters
    if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
      eggBuffer += e.key.toLowerCase();
      
      // Keep buffer length matching the code length
      if (eggBuffer.length > eggCode.length) {
        eggBuffer = eggBuffer.substring(eggBuffer.length - eggCode.length);
      }
      
      if (eggBuffer === eggCode) {
        // Achievement triggered
        triggerAchievement("Command 'sudo gratitude --all' executed successfully. Infinite thanks loaded! ❤️");
        eggBuffer = ''; // clear buffer
      }
    }
  });
});
