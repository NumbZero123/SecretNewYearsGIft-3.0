const messageElement = document.getElementById("message");
const choicesContainer = document.getElementById("choices");

const messages = [
  "I’ve known you since February, and over these months, you’ve become someone incredibly special to me. You bring me joy just by being around, and I’ve started smiling more when we hang out—something I almost never did before. I love your kindness, your adorable personality, and your beauty. It would truly be an honor if I could be your boyfriend this year and make you as happy as you make me. ❤️",
  "Hey princess 👑… I know this might sound a little silly, but I can’t hide it anymore. Being around you makes me smile and laugh like I never thought I would. I still think about our movie night watching *The Nun*! Would you grant me the honor of being your boyfriend this year and creating even more memories together? 💖",
  "These past months with you have meant a lot to me. You make ordinary days feel brighter just by being present, and I’ve found myself smiling more and more. Your sweetness, kindness, and charm make every moment special. It would mean the world to me if I could have the honor of being your boyfriend this year and sharing all the little and big moments with you. 💙❤️",
  "I can’t help but smile when I think about the time we’ve spent together. I never imagined someone could make ordinary moments feel so special. You’re thoughtful, adorable, and genuinely beautiful. Would you give me the honor of being your boyfriend this year, so we can laugh, enjoy, and make memories together? 😄💖",
  "Princess 👑, I’ve been wanting to tell you this for a while. You’ve made me laugh, smile, and feel happier just by being yourself. Thinking about our movie night with *The Nun* and all the little moments we’ve shared makes me want more. I would be truly honored if I could be your boyfriend this year and see where this journey takes us. ❤️💙"
];

let currentMessage = messages[Math.floor(Math.random()*messages.length)];
let isTyping = false;

// --- Stable typewriter ---
function typeWriter(text, callback = null) {
  if (isTyping) return;
  isTyping = true;

  const chars = Array.from(text);
  let i = 0;
  messageElement.innerHTML = "";

  function type() {
    if (i < chars.length) {
      const char = chars[i];
      messageElement.innerHTML += (char === "\n") ? "<br>" : char;
      i++;
      const delay = 20 + Math.random() * 50; // quill effect
      setTimeout(type, delay);
    } else {
      isTyping = false;
      if (callback) callback();
    }
  }

  type();
}

// --- Initial message ---
typeWriter(currentMessage, () => choicesContainer.classList.remove("hidden"));

// --- Button clicks ---
choicesContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("choice-btn") || isTyping) return;

  const choice = e.target.dataset.choice;
  choicesContainer.classList.add("hidden");

  if (choice === "yes") {
    typeWriter("Yay! 💖 I’m so happy! I promise I’ll do my best to make you smile and laugh every day. 😍");
  } else if (choice === "no") {
    typeWriter("Aw… 😢 That's okay. If you want, you can try again or reconsider!", 0, () => {
      choicesContainer.innerHTML = `
        <button class="choice-btn" data-choice="retry">Try Again 🔄</button>
        <button class="choice-btn" data-choice="exit">Maybe Later ❌</button>
      `;
      choicesContainer.classList.remove("hidden");
    });
  } else if (choice === "retry") {
    currentMessage = messages[Math.floor(Math.random() * messages.length)];
    typeWriter(currentMessage, () => {
      choicesContainer.innerHTML = `
        <button class="choice-btn" data-choice="yes">Yes 💖</button>
        <button class="choice-btn" data-choice="no">No 😢</button>
      `;
      choicesContainer.classList.remove("hidden");
    });
  } else if (choice === "exit") {
    typeWriter("Okay… maybe another time! 💙");
  }
});
