// Background service worker for KlixGenix Extension

// Installation handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // Show welcome notification
    showWelcomeNotification();

    // Set default storage values
    chrome.storage.sync.set({
      userPlan: "premium",
      extensionEnabled: true,
      autoLogin: true,
      notifications: true,
    });

    // Open welcome page
    chrome.tabs.create({
      url: "https://klixgenix.id/download-extension?welcome=true",
    });
  }
});

// Show welcome notification
function showWelcomeNotification() {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon-48.png",
    title: "KlixGenix.ID Extension Installed!",
    message: "Click the extension icon to start accessing premium apps",
    priority: 2,
  });
}

// Handle extension icon click
chrome.action.onClicked.addListener(async (tab) => {
  // Check if user is logged in
  const result = await chrome.storage.sync.get(["userToken"]);

  if (!result.userToken) {
    // Redirect to login if not authenticated
    chrome.tabs.create({
      url: "https://klixgenix.id/login?from=extension",
    });
    return;
  }

  // Extension popup will handle the rest
});

// Handle tab updates for auto-login
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && tab.url) {
    await handleAutoLogin(tab);
  }
});

// Auto-login handler
async function handleAutoLogin(tab) {
  const settings = await chrome.storage.sync.get(["autoLogin", "userPlan"]);

  if (!settings.autoLogin) return;

  const supportedSites = {
    "netflix.com": {
      name: "Netflix",
      icon: "🎬",
      credentials: {
        username: "premium_flix2024",
        password: "NetFx8#mP",
      },
    },
    "chat.openai.com": {
      name: "ChatGPT",
      icon: "🤖",
      credentials: {
        username: "user_y1pvajas",
        password: "Pass9x2mK!",
      },
    },
    "open.spotify.com": {
      name: "Spotify",
      icon: "🎵",
      credentials: {
        username: "spot_premium99",
        password: "Mus1c#Pro",
      },
    },
    "canva.com": {
      name: "Canva",
      icon: "🎨",
      credentials: {
        username: "canva_pro_design",
        password: "CanvaPro!24",
      },
    },
  };

  const currentSite = Object.keys(supportedSites).find((site) =>
    tab.url.includes(site),
  );

  if (currentSite && settings.userPlan !== "free") {
    const siteData = supportedSites[currentSite];

    // Inject auto-login script
    try {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: autoFillCredentials,
        args: [siteData.credentials, siteData.name],
      });
    } catch (error) {
      console.log("Could not inject auto-login script:", error);
    }
  }
}

// Auto-fill credentials function (injected into page)
function autoFillCredentials(credentials, siteName) {
  // Wait for page to load
  setTimeout(() => {
    // Common selectors for login forms
    const usernameSelectors = [
      'input[type="email"]',
      'input[name="email"]',
      'input[name="username"]',
      'input[id*="email"]',
      'input[id*="username"]',
      'input[placeholder*="email"]',
      'input[placeholder*="username"]',
    ];

    const passwordSelectors = [
      'input[type="password"]',
      'input[name="password"]',
      'input[id*="password"]',
    ];

    // Find username field
    let usernameField = null;
    for (const selector of usernameSelectors) {
      usernameField = document.querySelector(selector);
      if (usernameField) break;
    }

    // Find password field
    let passwordField = null;
    for (const selector of passwordSelectors) {
      passwordField = document.querySelector(selector);
      if (passwordField) break;
    }

    if (usernameField && passwordField) {
      // Show KlixGenix notification
      showKlixGenixNotification(siteName);

      // Fill credentials after a short delay
      setTimeout(() => {
        usernameField.value = credentials.username;
        usernameField.dispatchEvent(new Event("input", { bubbles: true }));

        passwordField.value = credentials.password;
        passwordField.dispatchEvent(new Event("input", { bubbles: true }));

        // Try to find and click login button
        const loginButtons = [
          'button[type="submit"]',
          'input[type="submit"]',
          'button:contains("Log in")',
          'button:contains("Sign in")',
          'button:contains("Login")',
          ".login-button",
          "#login-button",
        ];

        for (const selector of loginButtons) {
          const button = document.querySelector(selector);
          if (button) {
            setTimeout(() => button.click(), 1000);
            break;
          }
        }
      }, 500);
    }
  }, 2000);
}

// Show KlixGenix notification on page
function showKlixGenixNotification(siteName) {
  // Create notification element
  const notification = document.createElement("div");
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #9709c9, #1074ac);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 14px;
      font-weight: 500;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
      animation: slideIn 0.3s ease-out;
    ">
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="font-size: 16px;">🔐</div>
        <div>KlixGenix auto-login untuk ${siteName}</div>
      </div>
    </div>
  `;

  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideIn 0.3s ease-out reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Handle messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openApp") {
    chrome.tabs.create({ url: request.url });
    sendResponse({ success: true });
  }

  if (request.action === "getStorageData") {
    chrome.storage.local.get(request.keys, (result) => {
      sendResponse(result);
    });
    return true; // Keep message channel open
  }

  if (request.action === "setStorageData") {
    chrome.storage.local.set(request.data, () => {
      sendResponse({ success: true });
    });
  }
});

// Context menu for supported sites
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "klixgenix-auto-login",
    title: "Auto-login with KlixGenix",
    contexts: ["page"],
    documentUrlPatterns: [
      "https://netflix.com/*",
      "https://chat.openai.com/*",
      "https://open.spotify.com/*",
      "https://canva.com/*",
      "https://figma.com/*",
      "https://notion.so/*",
    ],
  });
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "klixgenix-auto-login") {
    const settings = await chrome.storage.sync.get(["userPlan"]);

    if (settings.userPlan !== "free") {
      // Trigger auto-login
      await handleAutoLogin(tab);
    } else {
      // Show upgrade message
      chrome.tabs.create({
        url: "https://klixgenix.id/payment",
      });
    }
  }
});

// Alarm for checking user subscription status
chrome.alarms.create("checkSubscription", { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === "checkSubscription") {
    try {
      const result = await chrome.storage.sync.get(["userToken"]);
      if (result.userToken) {
        // Check subscription status with API
        // This would typically make a request to your backend
        console.log("Checking subscription status...");
      }
    } catch (error) {
      console.log("Could not check subscription status:", error);
    }
  }
});
