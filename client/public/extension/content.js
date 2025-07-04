// KlixGenix.ID Content Script
console.log("KlixGenix.ID Extension loaded on:", window.location.hostname);

// Check if this is a premium site
const premiumSites = {
  "netflix.com": "Netflix Premium",
  "chat.openai.com": "ChatGPT Premium",
  "canva.com": "Canva Pro",
  "grammarly.com": "Grammarly Premium",
  "spotify.com": "Spotify Premium",
  "youtube.com": "YouTube Premium",
};

const currentSite = Object.keys(premiumSites).find((site) =>
  window.location.hostname.includes(site),
);

if (currentSite) {
  console.log(`KlixGenix.ID: ${premiumSites[currentSite]} access enabled`);

  // Add premium indicator
  addPremiumIndicator(premiumSites[currentSite]);

  // Site-specific functionality
  if (currentSite.includes("netflix.com")) {
    console.log("KlixGenix.ID: Netflix premium features enabled");
  } else if (currentSite.includes("chat.openai.com")) {
    console.log("KlixGenix.ID: ChatGPT premium features enabled");
  }
}

// Add premium indicator to the page
function addPremiumIndicator(siteName) {
  const indicator = document.createElement("div");
  indicator.className = "klixgenix-indicator";
  indicator.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <div style="width: 8px; height: 8px; background: #10b981; border-radius: 50%; animation: pulse 2s infinite;"></div>
      <span>KlixGenix.ID - ${siteName}</span>
    </div>
  `;

  // Add styles for the indicator
  const style = document.createElement("style");
  style.textContent = `
    .klixgenix-indicator {
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #0a1628 0%, #1e293b 100%);
      color: white;
      padding: 8px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      z-index: 10000;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.1);
      backdrop-filter: blur(10px);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(indicator);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    indicator.style.transition = "opacity 0.5s ease";
    indicator.style.opacity = "0";
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 500);
  }, 5000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkPremiumStatus") {
    sendResponse({
      site: currentSite,
      premiumEnabled: !!currentSite,
    });
  }

  return true;
});

// Auto-login functionality (placeholder)
if (currentSite) {
  // This is where you would implement auto-login logic
  // For security and legal reasons, this is just a placeholder
  console.log("KlixGenix.ID: Auto-login functionality ready");
}
