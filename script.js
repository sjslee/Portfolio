let portfolioData = null;

fetch("portfolio-data.json")
  .then(response => response.json())
  .then(data => {
    portfolioData = data;
    console.log("Portfolio data loaded:", portfolioData);
  })
  .catch(error => {
    console.error("Error loading portfolio data:", error);
  });

const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");

const chatbotLauncher = document.getElementById("chatbot-launcher");
const chatbotPopup = document.getElementById("chatbot-popup");
const closeChatbot = document.getElementById("close-chatbot");

console.log("chatbotLauncher:", chatbotLauncher);
console.log("chatbotPopup:", chatbotPopup);
console.log("closeChatbot:", closeChatbot);

function addMessage(text, sender) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.innerHTML = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getBotResponse(userMessage) {
  if (!portfolioData) {
    return "My portfolio data is still loading. Please try again.";
  }

  const message = userMessage.toLowerCase().trim();

  if (
    message.includes("about") ||
    message.includes("who are you") ||
    message.includes("tell me about yourself") ||
    message.includes("background")
  ) {
    return portfolioData.about;
  }

  if (message.includes("resume")) {
    return `${portfolioData.resume_summary} <br><a href="${portfolioData.resume_link}" target="_blank">View Resume</a>`;
  }

  if (
    message.includes("skills") ||
    message.includes("tools") ||
    message.includes("technical")
  ) {
    return `My skills include: ${portfolioData.skills.join(", ")}.`;
  }

  if (message.includes("github")) {
    return `You can view my GitHub here: <br><a href="${portfolioData.github_link}" target="_blank">GitHub Profile</a>`;
  }

  for (const project of portfolioData.projects) {
    for (const keyword of project.keywords) {
      if (message.includes(keyword.toLowerCase())) {
        return `${project.name}: ${project.summary} Tools used: ${project.tools.join(", ")}.`;
      }
    }
  }

  return "I can help you explore my background, resume, skills, or projects. Try asking about my Wisconsin Mortgage Probability Default model, Hotel Penality-Reward analysis, or technical skills.";
}

function handleChat() {
  const userText = chatInput.value.trim();
  if (!userText) return;

  addMessage(userText, "user");
  const botReply = getBotResponse(userText);
  addMessage(botReply, "bot");
  chatInput.value = "";
}

function handleChatFromButton(text) {
  addMessage(text, "user");
  const botReply = getBotResponse(text);
  addMessage(botReply, "bot");
}

if (sendButton) {
  sendButton.addEventListener("click", handleChat);
}

if (chatInput) {
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      handleChat();
    }
  });
}

if (chatbotLauncher && chatbotPopup) {
  chatbotLauncher.addEventListener("click", function () {
    chatbotPopup.classList.toggle("hidden");
  });
}

if (closeChatbot && chatbotPopup) {
  closeChatbot.addEventListener("click", function () {
    chatbotPopup.classList.add("hidden");
  });
}
