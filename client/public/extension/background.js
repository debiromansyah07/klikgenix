// KlixGenix.ID Background Service Worker

chrome.runtime.onInstalled.addListener(() => {
  console.log("KlixGenix.ID Extension installed successfully");

  // Set initial storage data
  chrome.storage.local.set({
    recentApps: [],
    favorites: [],
    installDate: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Handle extension icon click
chrome.action.onClicked.addListener((tab) => {
  // This will open the popup instead since we have a popup defined
  console.log("KlixGenix.ID Extension clicked");
});

// Handle tab updates for premium site detection
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    // Detect premium sites
    const premiumSites = [
      "netflix.com",
      "chat.openai.com",
      "canva.com",
      "grammarly.com",
      "spotify.com",
    ];

    const currentSite = premiumSites.find((site) => tab.url.includes(site));
    if (currentSite) {
      console.log(`KlixGenix.ID detected premium site: ${currentSite}`);

      // You can inject content scripts or show notifications here
      chrome.action.setBadgeText({
        text: "✓",
        tabId: tabId,
      });

      chrome.action.setBadgeBackgroundColor({
        color: "#10b981",
        tabId: tabId,
      });
    } else {
      // Clear badge for non-premium sites
      chrome.action.setBadgeText({
        text: "",
        tabId: tabId,
      });
    }
  }
});

// Handle messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "openApp") {
    chrome.tabs.create({ url: request.url });
    sendResponse({ success: true });
  }

  if (request.action === "getPremiumStatus") {
    // In a real implementation, this would check with your backend
    sendResponse({
      premium: true,
      plan: "PREMIUM",
      apps: 71,
    });
  }

  if (request.type === "checkAuth") {
    // Check authentication by looking for KlixGenix.ID domain cookies
    checkAuthenticationStatus(sendResponse);
    return true; // Keep the message channel open for async response
  }

  return true;
});

// Check if user is authenticated by checking cookies from KlixGenix.ID
async function checkAuthenticationStatus(sendResponse) {
  try {
    // Check for authentication cookies from the main domain
    const cookies = await chrome.cookies.getAll({ domain: "klixgenix.id" });
    const authCookie = cookies.find(
      (cookie) => cookie.name === "auth_token" || cookie.name === "jwt_token",
    );

    if (authCookie) {
      // Try to get user plan from another cookie or storage
      const planCookie = cookies.find((cookie) => cookie.name === "user_plan");
      const userPlan = planCookie ? planCookie.value : "premium";

      sendResponse({
        authenticated: true,
        plan: userPlan,
      });
    } else {
      // Check local storage or try to fetch from website
      chrome.tabs.query({ url: "*://klixgenix.id/*" }, (tabs) => {
        if (tabs.length > 0) {
          // Send message to website tab to check auth
          chrome.tabs.sendMessage(
            tabs[0].id,
            { type: "getAuthStatus" },
            (response) => {
              if (response && response.authenticated) {
                sendResponse({
                  authenticated: true,
                  plan: response.plan || "premium",
                });
              } else {
                sendResponse({ authenticated: false });
              }
            },
          );
        } else {
          sendResponse({ authenticated: false });
        }
      });
    }
  } catch (error) {
    console.log("Auth check failed:", error);
    sendResponse({ authenticated: false });
  }
}

// Periodic cleanup of old data
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "cleanup") {
    chrome.storage.local.get(["recentApps"], (result) => {
      if (result.recentApps) {
        // Keep only last 30 days of recent apps
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const cleanedApps = result.recentApps.filter(
          (app) => new Date(app.lastUsed) > thirtyDaysAgo,
        );

        chrome.storage.local.set({ recentApps: cleanedApps });
      }
    });
  }
});

// Set up cleanup alarm (runs daily)
chrome.runtime.onStartup.addListener(() => {
  chrome.alarms.create("cleanup", {
    delayInMinutes: 1,
    periodInMinutes: 24 * 60, // 24 hours
  });
});
