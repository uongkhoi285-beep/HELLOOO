/**
 * MÓN QUÀ SINH NHẬT TỪ MÈO MILE 🐾🎂
 * Interactive Script: Scene Management, Evasive Button, Web Audio SFX & Confetti
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. WEB AUDIO API SOUND SYNTHESIZER (100% Offline, Zero External Assets)
  // =========================================================================
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.bgmAudio = null;
      this.isBgmPlaying = false;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      if (!this.bgmAudio) {
        this.bgmAudio = document.getElementById('bgm-music');
        if (this.bgmAudio) {
          this.bgmAudio.volume = 0.2; // Tiếng nhạc piano nhẹ nhàng, êm dịu
        }
      }
    }

    // Door Knock Sound (Two distinct wooden taps: tok... tok!)
    playKnock() {
      this.init();
      if (!this.ctx) return;

      const playSingleTap = (delay) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, this.ctx.currentTime + delay);
        osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + delay + 0.08);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime + delay);

        gain.gain.setValueAtTime(0.7, this.ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + delay + 0.09);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + delay);
        osc.stop(this.ctx.currentTime + delay + 0.1);
      };

      playSingleTap(0);
      playSingleTap(0.18);
    }

    // Wooden Door Creak Sound
    playDoorCreak() {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(260, now + 0.25);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    }

    // Cute Bubble Pop
    playPop() {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.1);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.11);
    }

    // Whoosh Sound for Evasive Button Escape
    playWhoosh() {
      this.init();
      if (!this.ctx) return;

      const bufferSize = this.ctx.sampleRate * 0.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1500, this.ctx.currentTime + 0.1);
      filter.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.2);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start();
    }

    // Cute Cat Meow / Chime (disabled to ensure only 1 piano track plays)
    playMeow() {
      // Kept silent so only the piano music plays
    }

    // Celebration Fanfare (disabled to ensure only 1 piano track plays without synth beeps)
    playFanfare() {
      // Kept silent so only the piano music plays
    }

    // Background Music Controls (High Quality Instrumental Music Box)
    startBgm() {
      this.init();
      if (!this.bgmAudio) return;
      this.bgmAudio.play().then(() => {
        this.isBgmPlaying = true;
      }).catch(err => {
        // Autoplay policy prevented playback until user interaction
      });
    }

    stopBgm() {
      if (!this.bgmAudio) return;
      this.bgmAudio.pause();
      this.isBgmPlaying = false;
    }

    toggleBgm() {
      this.init();
      if (this.bgmAudio && !this.bgmAudio.paused) {
        this.stopBgm();
        return false;
      } else {
        this.startBgm();
        return true;
      }
    }
  }

  // =========================================================================
  // 2. CANVAS CONFETTI PARTICLE SYSTEM
  // =========================================================================
  class ConfettiSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
      this.particles = [];
      this.animationId = null;

      this.resize();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      if (!this.canvas) return;
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    launch(options = {}) {
      if (!this.canvas || !this.ctx) return;
      const count = options.count || 60;
      const originX = options.x !== undefined ? options.x : this.canvas.width / 2;
      const originY = options.y !== undefined ? options.y : this.canvas.height / 2;

      // Cheerful non-pink comic color palette
      const colors = ['#F59E0B', '#FBBF24', '#34D399', '#38BDF8', '#818CF8', '#FB923C', '#E2E8F0'];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        this.particles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 8 + 5,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 10,
          opacity: 1,
          gravity: 0.18,
          drag: 0.96,
          shape: Math.random() > 0.4 ? 'rect' : 'circle'
        });
      }

      if (!this.animationId) {
        this.animate();
      }
    }

    animate() {
      if (!this.ctx) return;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.vx *= p.drag;
        p.vy *= p.drag;
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;

        if (p.opacity <= 0 || p.y > this.canvas.height + 20) {
          this.particles.splice(i, 1);
          continue;
        }

        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate((p.rotation * Math.PI) / 180);
        this.ctx.fillStyle = p.color;
        this.ctx.globalAlpha = Math.max(0, p.opacity);

        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2);
          this.ctx.fill();
        }

        this.ctx.restore();
      }

      if (this.particles.length > 0) {
        this.animationId = requestAnimationFrame(() => this.animate());
      } else {
        this.animationId = null;
      }
    }
  }

  // =========================================================================
  // 3. MAIN CONTROLLER & APPLICATION LOGIC
  // =========================================================================
  const sound = new SoundEngine();
  const confetti = new ConfettiSystem('confetti-canvas');

  // Scenes
  const scene1 = document.getElementById('scene-1');
  const sceneDialogue = document.getElementById('scene-dialogue');
  const scene5 = document.getElementById('scene-5');

  // Scene 1 Elements
  const cakeInteractive = document.getElementById('cake-interactive');
  const cakeClosedImg = document.getElementById('cake-closed-img');
  const cakeOpenImg = document.getElementById('cake-open-img');
  const doorTarget = document.getElementById('door-target');

  // Dialogue Scene Elements
  const bubbleText = document.getElementById('bubble-text');
  const catHello = document.getElementById('cat-hello');
  const catThinking = document.getElementById('cat-thinking');
  const catWithFlowers = document.getElementById('cat-with-flowers');

  const actionsScene2 = document.getElementById('actions-scene-2');
  const actionsScene3 = document.getElementById('actions-scene-3');
  const actionsScene4 = document.getElementById('actions-scene-4');

  const btnIntroNext = document.getElementById('btn-intro-next');
  const btnBirthdayYes = document.getElementById('btn-birthday-yes');
  const btnBirthdayNo = document.getElementById('btn-birthday-no');
  const btnGiftAccept = document.getElementById('btn-gift-accept');
  const btnGiftDecline = document.getElementById('btn-gift-decline');

  // Scene 5 Elements
  const flowerCardTrigger = document.getElementById('flower-card-trigger');

  // Scene 6 Letter Modal Elements
  const letterModal = document.getElementById('letter-modal');
  const envelopeAssembly = document.getElementById('envelope-assembly');
  const waxSealBtn = document.getElementById('wax-seal-btn');
  const btnCloseLetter = document.getElementById('btn-close-letter');
  const btnConfettiMore = document.getElementById('btn-confetti-more');
  const btnReplayJourney = document.getElementById('btn-replay-journey');

  // Typewriter effect state
  let typewriterTimer = null;
  function setDialogue(text, callback) {
    if (!bubbleText) return;
    if (typewriterTimer) clearInterval(typewriterTimer);

    bubbleText.textContent = '';
    let index = 0;
    typewriterTimer = setInterval(() => {
      if (index < text.length) {
        bubbleText.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
        if (callback) callback();
      }
    }, 28);
  }

  // Background Music: Chỉ 1 bản Piano duy nhất, âm lượng nhỏ nhẹ êm dịu
  const bgmAudio = document.getElementById('bgm-music');
  if (bgmAudio) {
    bgmAudio.volume = 0.2; // Tiếng nhạc bé theo yêu cầu
  }

  // Tự động phát nhạc piano khi người dùng chạm/click lần đầu
  const handleFirstInteraction = () => {
    sound.startBgm();
  };
  window.addEventListener('pointerdown', handleFirstInteraction, { once: true });
  window.addEventListener('click', handleFirstInteraction, { once: true });
  window.addEventListener('touchstart', handleFirstInteraction, { once: true });

  // =========================================================================
  // SCENE 1: CAKE DOOR KNOCK & TRANSITION
  // =========================================================================
  let doorClicked = false;

  function triggerDoorOpen() {
    if (doorClicked) return;
    doorClicked = true;

    // Start gentle music if not yet playing
    sound.startBgm();

    // Play knock sound
    sound.playKnock();

    setTimeout(() => {
      // Play creak & reveal open door
      sound.playDoorCreak();
      if (cakeClosedImg) cakeClosedImg.classList.add('hidden');
      if (cakeOpenImg) cakeOpenImg.classList.add('active');
      if (doorTarget) doorTarget.style.display = 'none';

      // Confetti burst from open door
      const rect = cakeInteractive ? cakeInteractive.getBoundingClientRect() : { left: 200, top: 300, width: 100, height: 100 };
      confetti.launch({
        count: 40,
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height * 0.65
      });

      // Transition to Scene 2 after 1.2s
      setTimeout(() => {
        goToScene2();
      }, 1250);
    }, 450);
  }

  if (doorTarget) {
    doorTarget.addEventListener('click', triggerDoorOpen);
  }
  if (cakeInteractive) {
    cakeInteractive.addEventListener('click', triggerDoorOpen);
  }

  // =========================================================================
  // SCENE 2: MILE APPEARS & HELLO
  // =========================================================================
  function goToScene2() {
    // Switch active scene
    if (scene1) scene1.classList.remove('active');
    if (sceneDialogue) sceneDialogue.classList.add('active');

    // Show Cat Hello pose
    hideAllCatPoses();
    if (catHello) catHello.classList.add('active');

    // Show Scene 2 actions
    hideAllActions();
    if (actionsScene2) actionsScene2.classList.add('active');

    sound.playMeow();
    setDialogue("Chào cậu! Tớ là Mile 🐾, tớ được một người bạn nhờ để gửi cho cậu một vài thứ.");
  }

  function hideAllCatPoses() {
    [catHello, catThinking, catWithFlowers].forEach(cat => {
      if (cat) cat.classList.remove('active');
    });
  }

  function hideAllActions() {
    [actionsScene2, actionsScene3, actionsScene4].forEach(act => {
      if (act) act.classList.remove('active');
    });
  }

  if (btnIntroNext) {
    btnIntroNext.addEventListener('click', () => {
      sound.playPop();
      goToScene3();
    });
  }

  // Reset Helper for Evasive Button
  function resetEvasiveButton(btn, defaultText) {
    if (!btn) return;
    btn.style.display = 'inline-flex';
    btn.style.position = 'static';
    btn.style.left = '';
    btn.style.top = '';
    btn.style.zIndex = '';
    btn.style.opacity = '1';
    btn.style.transform = '';
    btn.classList.remove('escaping', 'poofed');
    const span = btn.querySelector('span');
    if (span) span.textContent = defaultText;
    if (btn._resetDodge) btn._resetDodge();
  }

  // =========================================================================
  // SCENE 3: ASK BIRTHDAY & EVASIVE "KHÔNG PHẢI ĐÂU" BUTTON
  // =========================================================================
  function goToScene3() {
    hideAllCatPoses();
    if (catThinking) catThinking.classList.add('active');

    hideAllActions();
    if (actionsScene3) actionsScene3.classList.add('active');

    resetEvasiveButton(btnBirthdayNo, 'Không phải đâu 😜');
    if (btnBirthdayNo && btnBirthdayNo._setGracePeriod) {
      btnBirthdayNo._setGracePeriod(600);
    }

    setDialogue("Cho tớ hỏi, hôm nay là sinh nhật của cậu phải không nè?");
  }

  // Setup Evasive Button Helper with relative containment & anti-rapid-fire debounce
  function makeEvasive(buttonElement, messages, onPoofCallback) {
    if (!buttonElement) return;

    let dodgeCount = 0;
    let isDodging = false;
    let canDodge = false;
    const maxDodges = messages.length;

    buttonElement._resetDodge = () => {
      dodgeCount = 0;
      isDodging = false;
    };

    buttonElement._setGracePeriod = (ms) => {
      canDodge = false;
      setTimeout(() => {
        canDodge = true;
      }, ms || 600);
    };

    const dodge = (e) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      if (!canDodge) return;
      if (isDodging) return;
      isDodging = true;

      // Cooldown to prevent multi-triggering within single interaction
      setTimeout(() => {
        isDodging = false;
      }, 450);

      dodgeCount++;
      sound.playWhoosh();

      // If maximum dodges reached, show cute yielding message then gracefully fade out
      if (dodgeCount >= maxDodges) {
        buttonElement.querySelector('span').textContent = "Mile biết cậu thích mà! 🐾";
        setTimeout(() => {
          buttonElement.classList.add('poofed');
          setTimeout(() => {
            buttonElement.style.display = 'none';
            if (onPoofCallback) onPoofCallback();
          }, 400);
        }, 1200);
        return;
      }

      // Update playful text
      buttonElement.querySelector('span').textContent = messages[dodgeCount - 1];

      // Jump to a random safe position strictly WITHIN #scene-dialogue
      buttonElement.classList.add('escaping');

      const sceneWidth = sceneDialogue ? sceneDialogue.clientWidth : 380;
      const sceneHeight = sceneDialogue ? sceneDialogue.clientHeight : 640;

      const btnWidth = buttonElement.offsetWidth || 135;
      const btnHeight = buttonElement.offsetHeight || 46;
      const pad = 16;

      const minX = pad;
      const maxX = Math.max(minX + 30, sceneWidth - btnWidth - pad);
      const minY = 160; // Below speech bubble
      const maxY = Math.max(minY + 30, sceneHeight - btnHeight - 30);

      const sceneRect = sceneDialogue ? sceneDialogue.getBoundingClientRect() : { left: 0, top: 0 };
      const btnRect = buttonElement.getBoundingClientRect();
      const currentX = btnRect.left - sceneRect.left;
      const currentY = btnRect.top - sceneRect.top;

      let newX = minX;
      let newY = minY;
      let attempts = 0;

      do {
        newX = Math.floor(minX + Math.random() * (maxX - minX));
        newY = Math.floor(minY + Math.random() * (maxY - minY));
        attempts++;
      } while (attempts < 15 && Math.hypot(newX - currentX, newY - currentY) < 130);

      buttonElement.style.position = 'absolute';
      buttonElement.style.left = `${newX}px`;
      buttonElement.style.top = `${newY}px`;
    };

    buttonElement.addEventListener('touchstart', dodge, { passive: false });
    buttonElement.addEventListener('mouseenter', dodge);
    buttonElement.addEventListener('click', dodge);
  }

  // Attach evasion to "Không phải đâu"
  const birthdayNoMessages = [
    "Ủa sao hụt kìa? 😜",
    "Trượt rồi nha! 🐾",
    "Hôm nay sinh nhật mà! 🎂",
    "Mile biết hết á nha! ✨",
    "Mile tới chúc mừng mà! 🐱",
    "Thôi đừng chối nữa! 🎉",
    "Đúng là cậu rồi nè! 🐾"
  ];

  makeEvasive(btnBirthdayNo, birthdayNoMessages, () => {
    // If user chased it down, make "Phải rồi" bounce bigger
    if (btnBirthdayYes) {
      btnBirthdayYes.classList.add('bounce-btn');
      btnBirthdayYes.style.transform = 'scale(1.1)';
    }
  });

  if (btnBirthdayYes) {
    btnBirthdayYes.addEventListener('click', () => {
      sound.playPop();
      confetti.launch({ count: 35 });
      goToScene4();
    });
  }

  // =========================================================================
  // SCENE 4: GIFT DELIVERY (MILE HOLDS FLOWERS) & EVASIVE DECLINE
  // =========================================================================
  function goToScene4() {
    hideAllCatPoses();
    if (catWithFlowers) catWithFlowers.classList.add('active');

    hideAllActions();
    if (actionsScene4) {
      actionsScene4.classList.add('active');
      actionsScene4.style.opacity = '';
      actionsScene4.style.transform = '';
      actionsScene4.style.pointerEvents = '';
    }

    resetEvasiveButton(btnGiftDecline, 'Không nhận 🙈');
    if (btnGiftDecline && btnGiftDecline._setGracePeriod) {
      btnGiftDecline._setGracePeriod(600);
    }

    sound.playMeow();
    setDialogue(
      "Nếu đúng là như vậy thì đây là món quà mà cậu ấy nhờ tớ chuyển lại cho cậu! Cậu có đồng ý nhận món quà này không? 💐"
    );
  }

  // Subtle, delicate, respectful and adorable messages (NO "chê" phrasing)
  const giftDeclineMessages = [
    "Cậu ấy chuẩn bị kỹ lắm! ✨",
    "Nhận đi mà, Mile xin đó! 🐾",
    "Gửi nhiều tình cảm lắm nè! 💐",
    "Mile tới giao quà nè, nhận nha! 🐱",
    "Ngày đặc biệt của cậu mà! 🎂",
    "Cậu nhận cho bạn an tâm nha! 💌",
    "Mile biết cậu thích mà! 🌸"
  ];

  makeEvasive(btnGiftDecline, giftDeclineMessages, () => {
    if (btnGiftAccept) {
      btnGiftAccept.classList.add('bounce-btn');
    }
  });

  if (btnGiftAccept) {
    btnGiftAccept.addEventListener('click', () => {
      sound.playFanfare();
      
      // Multi-wave celebration confetti
      confetti.launch({ count: 50, y: window.innerHeight * 0.45 });
      setTimeout(() => {
        confetti.launch({ count: 40, x: window.innerWidth * 0.2, y: window.innerHeight * 0.4 });
        confetti.launch({ count: 40, x: window.innerWidth * 0.8, y: window.innerHeight * 0.4 });
      }, 300);

      // Trigger the dramatic flower blooming zoom transition
      triggerFlowerZoomTransition();
    });
  }

  // =========================================================================
  // SCENE 5: FLOWER ZOOM & MINI MILE LETTER HINT
  // =========================================================================
  function triggerFlowerZoomTransition() {
    // Hide buttons smoothly
    if (actionsScene4) {
      actionsScene4.style.opacity = '0';
      actionsScene4.style.transform = 'scale(0.85)';
      actionsScene4.style.pointerEvents = 'none';
    }

    setTimeout(() => {
      sound.playPop();
    }, 150);

    // Switch scenes
    if (sceneDialogue) sceneDialogue.classList.remove('active');
    if (scene5) {
      scene5.classList.add('active');

      const flowerWrapper = document.getElementById('flower-card-trigger');
      if (flowerWrapper) {
        flowerWrapper.classList.remove('zoom-bloom', 'floating');
        void flowerWrapper.offsetWidth; // Force reflow
        flowerWrapper.classList.add('zoom-bloom');

        // After blooming animation finishes (900ms), transition into gentle float
        setTimeout(() => {
          flowerWrapper.classList.remove('zoom-bloom');
          flowerWrapper.classList.add('floating');
        }, 900);
      }
    }
  }

  function goToScene5() {
    triggerFlowerZoomTransition();
  }

  if (flowerCardTrigger) {
    flowerCardTrigger.addEventListener('click', () => {
      sound.playPop();
      openLetterModal();
    });
  }

  const letterTargetIndicator = document.getElementById('letter-target-indicator');
  if (letterTargetIndicator) {
    letterTargetIndicator.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playPop();
      openLetterModal();
    });
  }

  // =========================================================================
  // SCENE 6: LETTER MODAL & UNVEILING
  // =========================================================================
  let isEnvelopeUnfolded = false;

  function openLetterModal() {
    if (!letterModal) return;
    letterModal.classList.add('open');

    // If already unfolded before, keep it readable
    if (isEnvelopeUnfolded && envelopeAssembly) {
      envelopeAssembly.classList.add('unfolded');
    }
  }

  function closeLetterModal() {
    if (!letterModal) return;
    letterModal.classList.remove('open');
  }

  if (waxSealBtn) {
    waxSealBtn.addEventListener('click', () => {
      if (isEnvelopeUnfolded) return;
      isEnvelopeUnfolded = true;

      // Sound and opening sequence
      sound.playPop();
      if (envelopeAssembly) envelopeAssembly.classList.add('opening');

      setTimeout(() => {
        sound.playFanfare();
        if (envelopeAssembly) {
          envelopeAssembly.classList.remove('opening');
          envelopeAssembly.classList.add('unfolded');
        }

        // Grand confetti celebration!
        confetti.launch({ count: 80, y: window.innerHeight * 0.3 });
        setTimeout(() => {
          confetti.launch({ count: 50, x: window.innerWidth * 0.25, y: window.innerHeight * 0.4 });
          confetti.launch({ count: 50, x: window.innerWidth * 0.75, y: window.innerHeight * 0.4 });
        }, 300);

        // Đảm bảo nhạc piano nền đang phát
        if (!sound.isBgmPlaying) {
          sound.startBgm();
        }
      }, 500);
    });
  }

  if (btnCloseLetter) {
    btnCloseLetter.addEventListener('click', closeLetterModal);
  }

  // Close letter when clicking outside modal container
  if (letterModal) {
    letterModal.addEventListener('click', (e) => {
      if (e.target === letterModal) {
        closeLetterModal();
      }
    });
  }

  // More confetti button
  if (btnConfettiMore) {
    btnConfettiMore.addEventListener('click', () => {
      sound.playFanfare();
      confetti.launch({ count: 70, y: window.innerHeight * 0.3 });
    });
  }

  // Replay from beginning
  if (btnReplayJourney) {
    btnReplayJourney.addEventListener('click', () => {
      sound.playPop();
      closeLetterModal();

      // Reset state
      doorClicked = false;
      isEnvelopeUnfolded = false;
      if (envelopeAssembly) {
        envelopeAssembly.classList.remove('unfolded', 'opening');
      }

      // Reset evasive buttons
      resetEvasiveButton(btnBirthdayNo, 'Không phải đâu 😜');
      resetEvasiveButton(btnGiftDecline, 'Không nhận 🙈');

      if (actionsScene4) {
        actionsScene4.style.opacity = '';
        actionsScene4.style.transform = '';
        actionsScene4.style.pointerEvents = '';
      }
      const flowerWrapper = document.getElementById('flower-card-trigger');
      if (flowerWrapper) {
        flowerWrapper.classList.remove('zoom-bloom', 'floating');
      }

      // Reset cake
      if (cakeClosedImg) cakeClosedImg.classList.remove('hidden');
      if (cakeOpenImg) cakeOpenImg.classList.remove('active');
      if (doorTarget) doorTarget.style.display = 'flex';

      // Reset scenes
      if (scene5) scene5.classList.remove('active');
      if (sceneDialogue) sceneDialogue.classList.remove('active');
      if (scene1) scene1.classList.add('active');
    });
  }

})();
