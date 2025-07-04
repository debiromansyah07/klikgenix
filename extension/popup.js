// Application data - Synchronized with website (71 premium apps)
const apps = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746611969622.png",
    category: "ai",
    url: "https://chat.openai.com",
    description: "AI assistant premium",
  },
  {
    id: "netflix",
    name: "Netflix",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746611849606.png",
    category: "streaming",
    url: "https://netflix.com",
    description: "Film dan series premium",
  },
  {
    id: "prime-video",
    name: "Prime Video",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746612054926.png",
    category: "streaming",
    url: "https://primevideo.com",
    description: "Amazon streaming service",
  },
  {
    id: "bstation",
    name: "Bstation",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323394943.png",
    category: "streaming",
    url: "https://bstation.net",
    description: "Bilibili streaming",
  },
  {
    id: "crunchyroll",
    name: "Crunchyroll",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746612117525.png",
    category: "streaming",
    url: "https://crunchyroll.com",
    description: "Anime streaming platform",
  },
  {
    id: "deepl",
    name: "DeepL",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331534749.png",
    category: "language",
    url: "https://deepl.com",
    description: "Advanced language translator",
  },
  {
    id: "canva",
    name: "Canva",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747072394897.png",
    category: "design",
    url: "https://canva.com",
    description: "Design tool online premium",
  },
  {
    id: "turnitin",
    name: "Turnitin",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331054170.png",
    category: "education",
    url: "https://turnitin.com",
    description: "Plagiarism checker",
  },
  {
    id: "envato-elements",
    name: "Envato Elements",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331061271.png",
    category: "design",
    url: "https://elements.envato.com",
    description: "Design assets unlimited",
  },
  {
    id: "viu",
    name: "Viu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331067913.png",
    category: "streaming",
    url: "https://viu.com",
    description: "Asian drama streaming",
  },
  {
    id: "viu-premium",
    name: "Viu Premium+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731920209155.png",
    category: "streaming",
    url: "https://viu.com",
    description: "Viu premium features",
  },
  {
    id: "quillbot",
    name: "QuillBot",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331083847.png",
    category: "writing",
    url: "https://quillbot.com",
    description: "Paraphrasing tool premium",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331118569.png",
    category: "ai",
    url: "https://perplexity.ai",
    description: "AI search engine",
  },
  {
    id: "capcut-website",
    name: "Capcut Website",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331130077.png",
    category: "video",
    url: "https://capcut.com",
    description: "Video editing online",
  },
  {
    id: "scribd",
    name: "Scribd",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331170322.png",
    category: "education",
    url: "https://scribd.com",
    description: "Digital library unlimited",
  },
  {
    id: "everand",
    name: "Everand",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331186085.png",
    category: "education",
    url: "https://everand.com",
    description: "Ebooks dan audiobooks",
  },
  {
    id: "slideshare",
    name: "Slideshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331200277.png",
    category: "education",
    url: "https://slideshare.net",
    description: "Presentation sharing platform",
  },
  {
    id: "scholarcy",
    name: "Scholarcy",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331211227.png",
    category: "research",
    url: "https://scholarcy.com",
    description: "Research paper summarizer",
  },
  {
    id: "wetv",
    name: "WeTV",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331247021.png",
    category: "streaming",
    url: "https://wetv.vip",
    description: "Chinese drama streaming",
  },
  {
    id: "iflix",
    name: "iflix",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331360016.png",
    category: "streaming",
    url: "https://iflix.com",
    description: "Southeast Asia streaming",
  },
  {
    id: "grammarly",
    name: "Grammarly",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331265501.png",
    category: "writing",
    url: "https://grammarly.com",
    description: "Grammar checker premium",
  },
  {
    id: "academia-edu",
    name: "Academia Edu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331277249.png",
    category: "education",
    url: "https://academia.edu",
    description: "Academic research platform",
  },
  {
    id: "iloveimg",
    name: "iLoveIMG",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747077032124.png",
    category: "tools",
    url: "https://iloveimg.com",
    description: "Image editing tools",
  },
  {
    id: "ilovepdf",
    name: "iLovePDF",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747077018950.png",
    category: "tools",
    url: "https://ilovepdf.com",
    description: "PDF editing tools",
  },
  {
    id: "duolingo",
    name: "Duolingo",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331338823.png",
    category: "language",
    url: "https://duolingo.com",
    description: "Language learning premium",
  },
  {
    id: "freepik",
    name: "Freepik",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331369581.png",
    category: "design",
    url: "https://freepik.com",
    description: "Premium design resources",
  },
  {
    id: "flaticon",
    name: "Flaticon",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1736840945897.png",
    category: "design",
    url: "https://flaticon.com",
    description: "Icon library premium",
  },
  {
    id: "youtube",
    name: "YouTube No Ads",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730641254123.png",
    category: "streaming",
    url: "https://youtube.com",
    description: "Ad-free YouTube experience",
  },
  {
    id: "coursera",
    name: "Coursera",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331424928.png",
    category: "education",
    url: "https://coursera.org",
    description: "Online course platform",
  },
  {
    id: "semrush",
    name: "Semrush",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732257003678.png",
    category: "marketing",
    url: "https://semrush.com",
    description: "SEO & marketing toolkit",
  },
  {
    id: "epidemic-sound",
    name: "Epidemic Sound",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331436616.png",
    category: "audio",
    url: "https://epidemicsound.com",
    description: "Royalty-free music library",
  },
  {
    id: "hbo-max",
    name: "HBO Max",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323279912.png",
    category: "streaming",
    url: "https://hbomax.com",
    description: "HBO premium content",
  },
  {
    id: "busuu",
    name: "Busuu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323415059.png",
    category: "language",
    url: "https://busuu.com",
    description: "Language learning app",
  },
  {
    id: "scite-ai",
    name: "Scite AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732257044432.png",
    category: "research",
    url: "https://scite.ai",
    description: "Smart citation analysis",
  },
  {
    id: "iqiyi",
    name: "iQIYI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730448810175.jpg",
    category: "streaming",
    url: "https://iqiyi.com",
    description: "Chinese streaming platform",
  },
  {
    id: "skillshare",
    name: "Skillshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730693747061.jpg",
    category: "education",
    url: "https://skillshare.com",
    description: "Creative learning platform",
  },
  {
    id: "scispace",
    name: "SciSpace",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731051815321.png",
    category: "research",
    url: "https://scispace.com",
    description: "Scientific research tool",
  },
  {
    id: "production-crate",
    name: "Production Crate",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731855623564.png",
    category: "video",
    url: "https://productioncrate.com",
    description: "Video production assets",
  },
  {
    id: "sider-ai",
    name: "Sider AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731854871727.jpg",
    category: "ai",
    url: "https://sider.ai",
    description: "AI writing assistant",
  },
  {
    id: "catchplay",
    name: "CatchPlay+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731859910216.png",
    category: "streaming",
    url: "https://catchplay.com",
    description: "Asian movies streaming",
  },
  {
    id: "youku",
    name: "YOUKU",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731990136216.png",
    category: "streaming",
    url: "https://youku.com",
    description: "Chinese video platform",
  },
  {
    id: "askyourpdf",
    name: "AskYourPDF",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323369891.png",
    category: "ai",
    url: "https://askyourpdf.com",
    description: "AI PDF analysis",
  },
  {
    id: "wattpad-premium",
    name: "Wattpad Premium",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732185782594.jpg",
    category: "reading",
    url: "https://wattpad.com",
    description: "Story reading platform",
  },
  {
    id: "curiosity-stream",
    name: "Curiosity Stream",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732205553839.png",
    category: "documentary",
    url: "https://curiositystream.com",
    description: "Documentary streaming",
  },
  {
    id: "consensus",
    name: "Consensus",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732204515132.png",
    category: "research",
    url: "https://consensus.app",
    description: "Scientific search engine",
  },
  {
    id: "character-ai",
    name: "Character AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732612711504.jpg",
    category: "ai",
    url: "https://character.ai",
    description: "AI character chatbots",
  },
  {
    id: "gamma",
    name: "Gamma",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732610563803.jpg",
    category: "presentation",
    url: "https://gamma.app",
    description: "AI presentation maker",
  },
  {
    id: "vision-plus",
    name: "Vision+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732612974128.png",
    category: "streaming",
    url: "https://visionplus.id",
    description: "Indonesian streaming platform",
  },
  {
    id: "tabnine",
    name: "Tabnine",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1735138299559.png",
    category: "development",
    url: "https://tabnine.com",
    description: "AI code completion",
  },
  {
    id: "slidesgo",
    name: "Slidesgo",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1733226866846.png",
    category: "presentation",
    url: "https://slidesgo.com",
    description: "Presentation templates",
  },
  {
    id: "vecteezy",
    name: "Vecteezy",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331447055.png",
    category: "design",
    url: "https://vecteezy.com",
    description: "Vector graphics library",
  },
  {
    id: "jenni-ai",
    name: "Jenni AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1735024317747.jpg",
    category: "writing",
    url: "https://jenni.ai",
    description: "AI academic writing",
  },
  {
    id: "apple-tv",
    name: "Apple TV+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1739989183213.png",
    category: "streaming",
    url: "https://tv.apple.com",
    description: "Apple streaming service",
  },
  {
    id: "ubersuggest",
    name: "Ubersuggest",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730807172007.png",
    category: "marketing",
    url: "https://ubersuggest.com",
    description: "SEO analysis tool",
  },
  {
    id: "motion-array",
    name: "Motion Array",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331389539.png",
    category: "video",
    url: "https://motionarray.com",
    description: "Video templates & assets",
  },
  {
    id: "loklok",
    name: "Loklok",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731858512680.png",
    category: "streaming",
    url: "https://loklok.com",
    description: "Asian drama streaming",
  },
  {
    id: "bypassgpt",
    name: "BypassGPT",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323456546.png",
    category: "ai",
    url: "https://bypassgpt.ai",
    description: "AI content humanizer",
  },
  {
    id: "all-debrid",
    name: "All Debrid",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743144718593.png",
    category: "tools",
    url: "https://alldebrid.com",
    description: "Download accelerator",
  },
  {
    id: "pikbest",
    name: "Pikbest",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145750076.png",
    category: "design",
    url: "https://pikbest.com",
    description: "Design templates",
  },
  {
    id: "quizlet",
    name: "Quizlet",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743146609054.png",
    category: "education",
    url: "https://quizlet.com",
    description: "Study tools & flashcards",
  },
  {
    id: "vector-magic",
    name: "Vector Magic",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743146082937.png",
    category: "tools",
    url: "https://vectormagic.com",
    description: "Image vectorization",
  },
  {
    id: "rawpixel",
    name: "Rawpixel",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145097224.png",
    category: "design",
    url: "https://rawpixel.com",
    description: "Stock photos & designs",
  },
  {
    id: "lovepik",
    name: "Lovepik",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745648452399.png",
    category: "design",
    url: "https://lovepik.com",
    description: "Stock photos & graphics",
  },
  {
    id: "pngtree",
    name: "Pngtree",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145925428.png",
    category: "design",
    url: "https://pngtree.com",
    description: "PNG & graphic resources",
  },
  {
    id: "slidesdocs",
    name: "Slidesdocs",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145966747.png",
    category: "presentation",
    url: "https://slidesdocs.com",
    description: "Document templates",
  },
  {
    id: "sora-ai-plus",
    name: "Sora AI Plus",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745635559367.png",
    category: "ai",
    url: "https://sora.com",
    description: "AI video generation",
  },
  {
    id: "speechify",
    name: "Speechify",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1744808862117.png",
    category: "tools",
    url: "https://speechify.com",
    description: "Text-to-speech premium",
  },
  {
    id: "trae-ai",
    name: "Trae AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1749530048535.png",
    category: "ai",
    url: "https://trae.ai",
    description: "AI assistant platform",
  },
  {
    id: "marvel-unlimited",
    name: "Marvel Unlimited",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1736564477280.png",
    category: "reading",
    url: "https://marvel.com",
    description: "Digital comic platform",
  },
  {
    id: "creative-fabrica",
    name: "Creative Fabrica",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742975667195.png",
    category: "design",
    url: "https://creativefabrica.com",
    description: "Design resources library",
  },
  {
    id: "iconscout",
    name: "IconScout",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331349336.png",
    category: "design",
    url: "https://iconscout.com",
    description: "Icon and illustration library",
  },
  {
    id: "scribd",
    name: "Scribd",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745325327932.png",
    category: "education",
    url: "https://scribd.com",
    description: "Digital library unlimited",
  },
  {
    id: "skillshare",
    name: "Skillshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745325244891.png",
    category: "education",
    url: "https://skillshare.com",
    description: "Creative learning platform",
  },
  {
    id: "freepik",
    name: "Freepik",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331629503.png",
    category: "design",
    url: "https://freepik.com",
    description: "Premium design resources",
  },
  {
    id: "duolingo",
    name: "Duolingo",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331338823.png",
    category: "language",
    url: "https://duolingo.com",
    description: "Language learning premium",
  },
  {
    id: "envato-elements",
    name: "Envato Elements",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331061271.png",
    category: "design",
    url: "https://elements.envato.com",
    description: "Design assets unlimited",
  },
  {
    id: "viu",
    name: "Viu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331067913.png",
    category: "streaming",
    url: "https://viu.com",
    description: "Asian drama streaming",
  },
  {
    id: "slideshare",
    name: "Slideshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331200277.png",
    category: "education",
    url: "https://slideshare.net",
    description: "Presentation sharing",
  },
  {
    id: "everand",
    name: "Everand",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331186085.png",
    category: "education",
    url: "https://everand.com",
    description: "Ebooks dan audiobooks",
  },
  {
    id: "academia-edu",
    name: "Academia Edu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331277249.png",
    category: "education",
    url: "https://academia.edu",
    description: "Academic research platform",
  },
  {
    id: "flaticon",
    name: "Flaticon",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1736840945897.png",
    category: "design",
    url: "https://flaticon.com",
    description: "Icon library premium",
  },
  {
    id: "epidemic-sound",
    name: "Epidemic Sound",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331436616.png",
    category: "audio",
    url: "https://epidemicsound.com",
    description: "Royalty-free music",
  },
  {
    id: "busuu",
    name: "Busuu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323415059.png",
    category: "language",
    url: "https://busuu.com",
    description: "Language learning app",
  },
  {
    id: "bstation",
    name: "Bstation",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323394943.png",
    category: "streaming",
    url: "https://bilibili.tv",
    description: "Bilibili streaming",
  },
];

let currentTab = "apps";
let currentCategory = "all";
let favorites = [];
let recentApps = [];

// Initialize extension
document.addEventListener("DOMContentLoaded", async () => {
  // Load user data
  await loadUserData();

  // Initialize UI
  initializeTabs();
  initializeSearch();
  initializeCategories();
  initializeApps();

  // Hide loading screen after delay
  setTimeout(() => {
    document.getElementById("loading").style.display = "none";
    document.getElementById("main-content").classList.remove("hidden");
  }, 2500);

  // Load recent apps and favorites from storage
  await loadStorageData();
  updateStats();
});

// Load user data
async function loadUserData() {
  try {
    const result = await chrome.storage.sync.get(["userPlan", "userName"]);
    const planBadge = document.getElementById("plan-badge");

    if (result.userPlan) {
      planBadge.textContent = result.userPlan.toUpperCase();
      planBadge.className = `plan-badge plan-${result.userPlan.toLowerCase()}`;
    } else {
      planBadge.textContent = "PREMIUM";
    }
  } catch (error) {
    console.log("No user data found, using defaults");
  }
}

// Initialize tabs
function initializeTabs() {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.dataset.tab;

      // Update active tab
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Update active content
      tabContents.forEach((content) => content.classList.remove("active"));
      document.getElementById(`${tabId}-content`).classList.add("active");

      currentTab = tabId;

      // Load appropriate content
      if (tabId === "recent") {
        renderRecentApps();
      } else if (tabId === "favorites") {
        renderFavoriteApps();
      }
    });
  });
}

// Initialize search
function initializeSearch() {
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    filterApps(query);
  });
}

// Initialize categories
function initializeCategories() {
  const categoryBtns = document.querySelectorAll(".category-btn");

  categoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      currentCategory = btn.dataset.category;
      renderApps();
    });
  });
}

// Initialize apps
function initializeApps() {
  renderApps();

  // Initialize modal
  initializeModal();

  // Initialize footer buttons
  document.getElementById("dashboard-btn").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://klixgenix.id/dashboard" });
  });

  document.getElementById("settings-btn").addEventListener("click", () => {
    chrome.tabs.create({ url: "https://klixgenix.id/profile/edit" });
  });
}

// Render apps
function renderApps() {
  const appsGrid = document.getElementById("apps-grid");
  const filteredApps = apps.filter(
    (app) => currentCategory === "all" || app.category === currentCategory,
  );

  appsGrid.innerHTML = filteredApps
    .map(
      (app) => `
        <div class="app-card" data-app-id="${app.id}">
            <div class="app-status"></div>
            <div class="app-icon"><img src="${app.icon}" alt="${app.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;"></div>
            <div class="app-name">${app.name}</div>
            <div class="app-category">${app.category}</div>
        </div>
    `,
    )
    .join("");

  // Add click listeners
  appsGrid.querySelectorAll(".app-card").forEach((card) => {
    card.addEventListener("click", () => {
      const appId = card.dataset.appId;
      const app = apps.find((a) => a.id === appId);
      openAppModal(app);
    });
  });
}

// Filter apps based on search
function filterApps(query) {
  if (currentTab !== "apps") return;

  const appsGrid = document.getElementById("apps-grid");
  const filteredApps = apps.filter(
    (app) =>
      (currentCategory === "all" || app.category === currentCategory) &&
      (app.name.toLowerCase().includes(query) ||
        app.category.toLowerCase().includes(query) ||
        app.description.toLowerCase().includes(query)),
  );

  appsGrid.innerHTML = filteredApps
    .map(
      (app) => `
        <div class="app-card" data-app-id="${app.id}">
            <div class="app-status"></div>
            <div class="app-icon"><img src="${app.icon}" alt="${app.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;"></div>
            <div class="app-name">${app.name}</div>
            <div class="app-category">${app.category}</div>
        </div>
    `,
    )
    .join("");

  // Add click listeners
  appsGrid.querySelectorAll(".app-card").forEach((card) => {
    card.addEventListener("click", () => {
      const appId = card.dataset.appId;
      const app = apps.find((a) => a.id === appId);
      openAppModal(app);
    });
  });
}

// Initialize modal
function initializeModal() {
  const modal = document.getElementById("app-modal");
  const closeBtn = document.getElementById("close-modal");
  const openAppBtn = document.getElementById("open-app-btn");
  const addFavoriteBtn = document.getElementById("add-favorite-btn");

  closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
    }
  });

  openAppBtn.addEventListener("click", async () => {
    const appId = modal.dataset.currentApp;
    const app = apps.find((a) => a.id === appId);

    if (app) {
      // Add to recent apps
      await addToRecent(app);

      // Open app in new tab
      chrome.tabs.create({ url: app.url });

      // Close modal and popup
      modal.classList.add("hidden");
      window.close();
    }
  });

  addFavoriteBtn.addEventListener("click", async () => {
    const appId = modal.dataset.currentApp;
    const app = apps.find((a) => a.id === appId);

    if (app) {
      await toggleFavorite(app);
      updateFavoriteButton(app);
    }
  });
}

// Open app modal
function openAppModal(app) {
  const modal = document.getElementById("app-modal");

  document.getElementById("modal-app-icon").innerHTML =
    `<img src="${app.icon}" alt="${app.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 8px;">`;
  document.getElementById("modal-app-name").textContent = app.name;
  document.getElementById("modal-app-category").textContent = app.category;

  modal.dataset.currentApp = app.id;
  updateFavoriteButton(app);

  modal.classList.remove("hidden");
}

// Update favorite button
function updateFavoriteButton(app) {
  const btn = document.getElementById("add-favorite-btn");
  const isFavorite = favorites.some((fav) => fav.id === app.id);

  if (isFavorite) {
    btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
            Remove from Favorites
        `;
  } else {
    btn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" stroke-width="2"/>
            </svg>
            Add to Favorites
        `;
  }
}

// Add to recent apps
async function addToRecent(app) {
  recentApps = recentApps.filter((recent) => recent.id !== app.id);
  recentApps.unshift({
    ...app,
    lastUsed: new Date().toISOString(),
  });

  // Keep only last 10 recent apps
  if (recentApps.length > 10) {
    recentApps = recentApps.slice(0, 10);
  }

  await chrome.storage.local.set({ recentApps });
  updateStats();
}

// Toggle favorite
async function toggleFavorite(app) {
  const index = favorites.findIndex((fav) => fav.id === app.id);

  if (index >= 0) {
    favorites.splice(index, 1);
  } else {
    favorites.push(app);
  }

  await chrome.storage.local.set({ favorites });
}

// Render recent apps
function renderRecentApps() {
  const recentContainer = document.getElementById("recent-apps");

  if (recentApps.length === 0) {
    recentContainer.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 48px; margin-bottom: 16px;">📱</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6);">No recent apps</div>
                <div style="font-size: 12px; color: rgba(255,255,255,0.4);">Apps you use will appear here</div>
            </div>
        `;
    return;
  }

  recentContainer.innerHTML = recentApps
    .map(
      (app) => `
        <div class="recent-app" data-app-id="${app.id}">
            <div class="app-icon"><img src="${app.icon}" alt="${app.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;"></div>
            <div class="app-info">
                <div class="app-name">${app.name}</div>
                <div class="app-time">${timeAgo(app.lastUsed)}</div>
            </div>
        </div>
    `,
    )
    .join("");

  // Add click listeners
  recentContainer.querySelectorAll(".recent-app").forEach((item) => {
    item.addEventListener("click", () => {
      const appId = item.dataset.appId;
      const app = apps.find((a) => a.id === appId);
      openAppModal(app);
    });
  });
}

// Render favorite apps
function renderFavoriteApps() {
  const favoritesContainer = document.getElementById("favorites-apps");

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = `
            <div class="empty-state">
                <div style="font-size: 48px; margin-bottom: 16px;">⭐</div>
                <div style="font-size: 14px; color: rgba(255,255,255,0.6);">No favorites yet</div>
                <div style="font-size: 12px; color: rgba(255,255,255,0.4);">Star apps to add them here</div>
            </div>
        `;
    return;
  }

  favoritesContainer.innerHTML = favorites
    .map(
      (app) => `
        <div class="favorite-app" data-app-id="${app.id}">
            <div class="app-icon"><img src="${app.icon}" alt="${app.name}" style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;"></div>
            <div class="app-info">
                <div class="app-name">${app.name}</div>
                <div class="app-category">${app.category}</div>
            </div>
        </div>
    `,
    )
    .join("");

  // Add click listeners
  favoritesContainer.querySelectorAll(".favorite-app").forEach((item) => {
    item.addEventListener("click", () => {
      const appId = item.dataset.appId;
      const app = apps.find((a) => a.id === appId);
      openAppModal(app);
    });
  });
}

// Load storage data
async function loadStorageData() {
  try {
    const result = await chrome.storage.local.get(["recentApps", "favorites"]);
    recentApps = result.recentApps || [];
    favorites = result.favorites || [];
  } catch (error) {
    console.log("No storage data found");
  }
}

// Update stats
function updateStats() {
  const today = new Date().toDateString();
  const todayApps = recentApps.filter(
    (app) => new Date(app.lastUsed).toDateString() === today,
  );

  document.getElementById("total-apps").textContent = `${apps.length}+`;
  document.getElementById("used-today").textContent = todayApps.length;
}

// Time ago utility
function timeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 1) return "Just now";
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
}

// Handle keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    const modal = document.getElementById("app-modal");
    if (!modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }
  }

  if (e.key === "/" && e.target.tagName !== "INPUT") {
    e.preventDefault();
    document.getElementById("search-input").focus();
  }
});
