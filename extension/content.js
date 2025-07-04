// Content script for KlixGenix Extension
// Runs on all web pages to provide auto-login functionality

// Check if KlixGenix extension is already initialized
if (!window.klixGenixInitialized) {
  window.klixGenixInitialized = true;

  // Initialize extension
  initializeKlixGenix();
}

function initializeKlixGenix() {
  console.log("KlixGenix Extension: Content script loaded");

  // Add KlixGenix indicator to supported sites
  addKlixGenixIndicator();

  // Listen for auto-login triggers
  listenForAutoLogin();

  // Add keyboard shortcuts
  addKeyboardShortcuts();
}

// Add KlixGenix indicator to supported sites
function addKlixGenixIndicator() {
  const supportedSites = [
    "netflix.com",
    "chat.openai.com",
    "spotify.com",
    "canva.com",
    "figma.com",
    "notion.so",
    "youtube.com",
    "adobe.com",
    "discord.com",
  ];

  const currentDomain = window.location.hostname;
  const isSupported = supportedSites.some((site) =>
    currentDomain.includes(site),
  );

  if (isSupported) {
    createIndicator();
  }
}

// Create visual indicator
function createIndicator() {
  const indicator = document.createElement("div");
  indicator.id = "klixgenix-indicator";
  indicator.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #9709c9, #1074ac);
      color: white;
      padding: 12px 16px;
      border-radius: 25px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      z-index: 10000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.3s ease;
      user-select: none;
      display: flex;
      align-items: center;
      gap: 8px;
    " title="KlixGenix Premium Access">
      <div style="
        width: 20px;
        height: 20px;
        background: rgba(255,255,255,0.2);
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
        font-weight: bold;
      ">K</div>
      <span>KlixGenix</span>
    </div>
  `;

  // Add hover effect
  const indicatorElement = indicator.firstElementChild;
  indicatorElement.addEventListener("mouseenter", () => {
    indicatorElement.style.transform = "scale(1.05)";
    indicatorElement.style.boxShadow = "0 6px 25px rgba(151, 9, 201, 0.4)";
  });

  indicatorElement.addEventListener("mouseleave", () => {
    indicatorElement.style.transform = "scale(1)";
    indicatorElement.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3)";
  });

  // Add click handler
  indicatorElement.addEventListener("click", () => {
    showKlixGenixMenu();
  });

  document.body.appendChild(indicator);

  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (indicator && indicator.parentNode) {
      indicator.style.animation = "slideOut 0.3s ease-out forwards";
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.remove();
        }
      }, 300);
    }
  }, 5000);

  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideOut {
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Show KlixGenix menu
function showKlixGenixMenu() {
  // Remove existing menu
  const existingMenu = document.getElementById("klixgenix-menu");
  if (existingMenu) {
    existingMenu.remove();
    return;
  }

  const menu = document.createElement("div");
  menu.id = "klixgenix-menu";
  menu.innerHTML = `
    <div style="
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: rgba(26, 32, 44, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 16px;
      z-index: 10001;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      min-width: 200px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      animation: slideInUp 0.3s ease-out;
    ">
      <div style="color: white; font-size: 14px; font-weight: 600; margin-bottom: 12px;">
        KlixGenix Premium Access
      </div>
      
      <div style="margin-bottom: 12px;">
        <button id="auto-login-btn" style="
          width: 100%;
          background: linear-gradient(135deg, #9709c9, #1074ac);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 8px;
        ">
          🔐 Auto Login
        </button>
        
        <button id="open-dashboard-btn" style="
          width: 100%;
          background: rgba(255,255,255,0.1);
          color: white;
          border: 1px solid rgba(255,255,255,0.2);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        ">
          📊 Dashboard
        </button>
      </div>
      
      <div style="
        color: rgba(255,255,255,0.6);
        font-size: 10px;
        text-align: center;
        padding-top: 8px;
        border-top: 1px solid rgba(255,255,255,0.1);
      ">
        Press Alt+K for quick access
      </div>
    </div>
  `;

  // Add event listeners
  menu.querySelector("#auto-login-btn").addEventListener("click", () => {
    triggerAutoLogin();
    menu.remove();
  });

  menu.querySelector("#open-dashboard-btn").addEventListener("click", () => {
    window.open("https://klixgenix.id/dashboard", "_blank");
    menu.remove();
  });

  document.body.appendChild(menu);

  // Close menu when clicking outside
  document.addEventListener("click", function closeMenu(e) {
    if (
      !menu.contains(e.target) &&
      !document.getElementById("klixgenix-indicator").contains(e.target)
    ) {
      menu.remove();
      document.removeEventListener("click", closeMenu);
    }
  });

  // Add animation styles
  const style = document.createElement("style");
  style.textContent = `
    @keyframes slideInUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

// Trigger auto-login
function triggerAutoLogin() {
  const credentials = getCredentialsForSite();

  if (credentials) {
    fillLoginForm(credentials);
    showSuccessNotification("Auto-login activated!");
  } else {
    showErrorNotification("Auto-login not available for this site");
  }
}

// Get credentials for current site
function getCredentialsForSite() {
  const domain = window.location.hostname;

  const siteCredentials = {
    "netflix.com": {
      username: "premium_flix2024",
      password: "NetFx8#mP",
      usernameSelector: 'input[name="userLoginId"], input[type="email"]',
      passwordSelector: 'input[type="password"]',
      submitSelector: 'button[type="submit"], .login-button',
    },
    "chat.openai.com": {
      username: "user_y1pvajas",
      password: "Pass9x2mK!",
      usernameSelector: 'input[type="email"]',
      passwordSelector: 'input[type="password"]',
      submitSelector: 'button[type="submit"]',
    },
    "open.spotify.com": {
      username: "spot_premium99",
      password: "Mus1c#Pro",
      usernameSelector: 'input[id="login-username"]',
      passwordSelector: 'input[id="login-password"]',
      submitSelector: 'button[id="login-button"]',
    },
    "canva.com": {
      username: "canva_pro_design",
      password: "CanvaPro!24",
      usernameSelector: 'input[type="email"]',
      passwordSelector: 'input[type="password"]',
      submitSelector: 'button[type="submit"]',
    },
  };

  return Object.keys(siteCredentials).find((site) => domain.includes(site))
    ? siteCredentials[
        Object.keys(siteCredentials).find((site) => domain.includes(site))
      ]
    : null;
}

// Fill login form
function fillLoginForm(credentials) {
  const usernameField = document.querySelector(credentials.usernameSelector);
  const passwordField = document.querySelector(credentials.passwordSelector);

  if (usernameField && passwordField) {
    // Fill username
    usernameField.value = credentials.username;
    usernameField.dispatchEvent(new Event("input", { bubbles: true }));
    usernameField.dispatchEvent(new Event("change", { bubbles: true }));

    // Fill password
    passwordField.value = credentials.password;
    passwordField.dispatchEvent(new Event("input", { bubbles: true }));
    passwordField.dispatchEvent(new Event("change", { bubbles: true }));

    // Try to submit form
    setTimeout(() => {
      const submitButton = document.querySelector(credentials.submitSelector);
      if (submitButton) {
        submitButton.click();
      }
    }, 500);

    return true;
  }

  return false;
}

// Listen for auto-login messages
function listenForAutoLogin() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "autoLogin") {
      const success = triggerAutoLogin();
      sendResponse({ success });
    }
  });
}

// Add keyboard shortcuts
function addKeyboardShortcuts() {
  document.addEventListener("keydown", (e) => {
    // Alt + K to open KlixGenix menu
    if (e.altKey && e.key === "k") {
      e.preventDefault();
      showKlixGenixMenu();
    }

    // Alt + L to trigger auto-login
    if (e.altKey && e.key === "l") {
      e.preventDefault();
      triggerAutoLogin();
    }
  });
}

// Show success notification
function showSuccessNotification(message) {
  showNotification(message, "success");
}

// Show error notification
function showErrorNotification(message) {
  showNotification(message, "error");
}

// Show notification
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${
      type === "success"
        ? "linear-gradient(135deg, #10b981, #059669)"
        : type === "error"
          ? "linear-gradient(135deg, #ef4444, #dc2626)"
          : "linear-gradient(135deg, #9709c9, #1074ac)"
    };
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    z-index: 10002;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    font-weight: 500;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    animation: slideInNotification 0.3s ease-out;
  `;

  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 8px;">
      <span>${type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}</span>
      <span>${message}</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation =
      "slideOutNotification 0.3s ease-out forwards";
    setTimeout(() => notification.remove(), 300);
  }, 3000);

  // Add animation styles if not already added
  if (!document.querySelector("#klixgenix-notification-styles")) {
    const style = document.createElement("style");
    style.id = "klixgenix-notification-styles";
    style.textContent = `
      @keyframes slideInNotification {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOutNotification {
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}
