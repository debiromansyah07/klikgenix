import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface App {
  name: string;
  icon: string;
  category: string;
  description: string;
}

interface AppsListModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  planPrice: string;
  accessMethod: string;
}

const premiumApps: App[] = [
  {
    name: "ChatGPT",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746611969622.png",
    category: "AI",
    description: "AI assistant premium",
  },
  {
    name: "Netflix",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746611849606.png",
    category: "Streaming",
    description: "Film dan series premium",
  },
  {
    name: "Prime Video",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746612054926.png",
    category: "Streaming",
    description: "Amazon streaming service",
  },
  {
    name: "Bstation",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323394943.png",
    category: "Streaming",
    description: "Bilibili streaming",
  },
  {
    name: "Crunchyroll",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746612117525.png",
    category: "Streaming",
    description: "Anime streaming platform",
  },
  {
    name: "DeepL",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331534749.png",
    category: "Language",
    description: "Advanced language translator",
  },
  {
    name: "Canva",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747072394897.png",
    category: "Design",
    description: "Design tool online premium",
  },
  {
    name: "Turnitin",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331054170.png",
    category: "Education",
    description: "Plagiarism checker",
  },
  {
    name: "Envato Elements",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331061271.png",
    category: "Design",
    description: "Design assets unlimited",
  },
  {
    name: "Viu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331067913.png",
    category: "Streaming",
    description: "Asian drama streaming",
  },
  {
    name: "Viu Premium+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731920209155.png",
    category: "Streaming",
    description: "Viu premium features",
  },
  {
    name: "QuillBot",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331083847.png",
    category: "Writing",
    description: "Paraphrasing tool premium",
  },
  {
    name: "Perplexity",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331118569.png",
    category: "AI",
    description: "AI search engine",
  },
  {
    name: "Capcut Website",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331130077.png",
    category: "Video",
    description: "Video editing online",
  },
  {
    name: "Scribd",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331170322.png",
    category: "Education",
    description: "Digital library unlimited",
  },
  {
    name: "Everand",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331186085.png",
    category: "Education",
    description: "Ebooks dan audiobooks",
  },
  {
    name: "Slideshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331200277.png",
    category: "Education",
    description: "Presentation sharing platform",
  },
  {
    name: "Scholarcy",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331211227.png",
    category: "Research",
    description: "Research paper summarizer",
  },
  {
    name: "WeTV",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331247021.png",
    category: "Streaming",
    description: "Chinese drama streaming",
  },
  {
    name: "iflix",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331360016.png",
    category: "Streaming",
    description: "Southeast Asia streaming",
  },
  {
    name: "Grammarly",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331265501.png",
    category: "Writing",
    description: "Grammar checker premium",
  },
  {
    name: "Academia Edu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331277249.png",
    category: "Education",
    description: "Academic research platform",
  },
  {
    name: "iLoveIMG",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747077032124.png",
    category: "Tools",
    description: "Image editing tools",
  },
  {
    name: "iLovePDF",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747077018950.png",
    category: "Tools",
    description: "PDF editing tools",
  },
  {
    name: "Duolingo",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331338823.png",
    category: "Language",
    description: "Language learning premium",
  },
  {
    name: "Freepik",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331369581.png",
    category: "Design",
    description: "Premium design resources",
  },
  {
    name: "Flaticon",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1736840945897.png",
    category: "Design",
    description: "Icon library premium",
  },
  {
    name: "YouTube No Ads",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730641254123.png",
    category: "Streaming",
    description: "Ad-free YouTube experience",
  },
  {
    name: "Coursera",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331424928.png",
    category: "Education",
    description: "Online course platform",
  },
  {
    name: "Semrush",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732257003678.png",
    category: "Marketing",
    description: "SEO & marketing toolkit",
  },
  {
    name: "Epidemic Sound",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331436616.png",
    category: "Audio",
    description: "Royalty-free music library",
  },
  {
    name: "HBO Max",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323279912.png",
    category: "Streaming",
    description: "HBO premium content",
  },
  {
    name: "Busuu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323415059.png",
    category: "Language",
    description: "Language learning app",
  },
  {
    name: "Scite AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732257044432.png",
    category: "Research",
    description: "Smart citation analysis",
  },
  {
    name: "iQIYI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730448810175.jpg",
    category: "Streaming",
    description: "Chinese streaming platform",
  },
  {
    name: "Skillshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730693747061.jpg",
    category: "Education",
    description: "Creative learning platform",
  },
  {
    name: "SciSpace",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731051815321.png",
    category: "Research",
    description: "Scientific research tool",
  },
  {
    name: "Production Crate",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731855623564.png",
    category: "Video",
    description: "Video production assets",
  },
  {
    name: "Sider AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731854871727.jpg",
    category: "AI",
    description: "AI writing assistant",
  },
  {
    name: "CatchPlay+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731859910216.png",
    category: "Streaming",
    description: "Asian movies streaming",
  },
  {
    name: "YOUKU",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731990136216.png",
    category: "Streaming",
    description: "Chinese video platform",
  },
  {
    name: "AskYourPDF",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323369891.png",
    category: "AI",
    description: "AI PDF analysis",
  },
  {
    name: "Wattpad Premium",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732185782594.jpg",
    category: "Reading",
    description: "Story reading platform",
  },
  {
    name: "Curiosity Stream",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732205553839.png",
    category: "Documentary",
    description: "Documentary streaming",
  },
  {
    name: "Consensus",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732204515132.png",
    category: "Research",
    description: "Scientific search engine",
  },
  {
    name: "Character AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732612711504.jpg",
    category: "AI",
    description: "AI character chatbots",
  },
  {
    name: "Gamma",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732610563803.jpg",
    category: "Presentation",
    description: "AI presentation maker",
  },
  {
    name: "Vision+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732612974128.png",
    category: "Streaming",
    description: "Indonesian streaming platform",
  },
  {
    name: "Tabnine",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1735138299559.png",
    category: "Development",
    description: "AI code completion",
  },
  {
    name: "Slidesgo",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1733226866846.png",
    category: "Presentation",
    description: "Presentation templates",
  },
  {
    name: "Vecteezy",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331447055.png",
    category: "Design",
    description: "Vector graphics library",
  },
  {
    name: "Jenni AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1735024317747.jpg",
    category: "Writing",
    description: "AI academic writing",
  },
  {
    name: "Apple TV+",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1739989183213.png",
    category: "Streaming",
    description: "Apple streaming service",
  },
  {
    name: "Ubersuggest",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730807172007.png",
    category: "Marketing",
    description: "SEO analysis tool",
  },
  {
    name: "Motion Array",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331389539.png",
    category: "Video",
    description: "Video templates & assets",
  },
  {
    name: "Loklok",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731858512680.png",
    category: "Streaming",
    description: "Asian drama streaming",
  },
  {
    name: "BypassGPT",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323456546.png",
    category: "AI",
    description: "AI content humanizer",
  },
  {
    name: "All Debrid",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743144718593.png",
    category: "Tools",
    description: "Download accelerator",
  },
  {
    name: "Pikbest",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145750076.png",
    category: "Design",
    description: "Design templates",
  },
  {
    name: "Quizlet",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743146609054.png",
    category: "Education",
    description: "Study tools & flashcards",
  },
  {
    name: "Vector Magic",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743146082937.png",
    category: "Tools",
    description: "Image vectorization",
  },
  {
    name: "Rawpixel",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145097224.png",
    category: "Design",
    description: "Stock photos & designs",
  },
  {
    name: "Lovepik",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745648452399.png",
    category: "Design",
    description: "Stock photos & graphics",
  },
  {
    name: "Pngtree",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145925428.png",
    category: "Design",
    description: "PNG & graphic resources",
  },
  {
    name: "Slidesdocs",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145966747.png",
    category: "Presentation",
    description: "Document templates",
  },
  {
    name: "Sora AI Plus",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745635559367.png",
    category: "AI",
    description: "AI video generation",
  },
  {
    name: "Speechify",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1744808862117.png",
    category: "Tools",
    description: "Text-to-speech premium",
  },
  {
    name: "Trae AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1749530048535.png",
    category: "AI",
    description: "AI assistant platform",
  },
  {
    name: "Marvel Unlimited",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1736564477280.png",
    category: "Reading",
    description: "Digital comic platform",
  },
  {
    name: "Creative Fabrica",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742975667195.png",
    category: "Design",
    description: "Design resources library",
  },
  {
    name: "IconScout",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331349336.png",
    category: "Design",
    description: "Icon and illustration library",
  },
];

const exclusiveOnlyApps: App[] = [
  {
    name: "Exclusive Netflix",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742276395218.png",
    category: "Exclusive Streaming",
    description: "Netflix dengan akses khusus",
  },
  {
    name: "Exclusive ChatGPT Plus",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742972212659.png",
    category: "Exclusive AI",
    description: "ChatGPT Plus eksklusif",
  },
  {
    name: "Exclusive ChatGPT PRO",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742277395672.png",
    category: "Exclusive AI",
    description: "ChatGPT PRO akses khusus",
  },
  {
    name: "Exclusive beIN Sports",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742972235931.png",
    category: "Exclusive Streaming",
    description: "beIN Sports premium access",
  },
  {
    name: "Exclusive Disney+ Hotstar",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742272953621.png",
    category: "Exclusive Streaming",
    description: "Disney+ Hotstar eksklusif",
  },
  {
    name: "Exclusive Vidio.com",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273215456.png",
    category: "Exclusive Streaming",
    description: "Vidio.com premium access",
  },
  {
    name: "Exclusive Perplexity",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273033964.png",
    category: "Exclusive AI",
    description: "Perplexity AI eksklusif",
  },
  {
    name: "Exclusive Coohom",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742272886137.png",
    category: "Exclusive Design",
    description: "Coohom design platform",
  },
  {
    name: "Exclusive Sora Pro",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273203148.png",
    category: "Exclusive AI",
    description: "Sora Pro video generation",
  },
  {
    name: "Exclusive Sora Plus",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273100681.png",
    category: "Exclusive AI",
    description: "Sora Plus premium access",
  },
  {
    name: "Exclusive Blackbox AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747729192193.png",
    category: "Exclusive AI",
    description: "Blackbox AI coding assistant",
  },
  {
    name: "Exclusive Trae AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1749527372782.png",
    category: "Exclusive AI",
    description: "Trae AI platform eksklusif",
  },
  {
    name: "Exclusive Cursor AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1749553775737.png",
    category: "Exclusive Development",
    description: "Cursor AI code editor",
  },
];

const exclusiveApps: App[] = [...premiumApps, ...exclusiveOnlyApps];

const educationApps: App[] = [
  {
    name: "ChatGPT",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746611969622.png",
    category: "AI",
    description: "AI assistant untuk pembelajaran",
  },
  {
    name: "DeepL",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331534749.png",
    category: "Language",
    description: "Advanced language translator",
  },
  {
    name: "Canva",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747072394897.png",
    category: "Design",
    description: "Design tool untuk presentasi",
  },
  {
    name: "Turnitin",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331054170.png",
    category: "Education",
    description: "Plagiarism checker",
  },
  {
    name: "QuillBot",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331083847.png",
    category: "Writing",
    description: "Paraphrasing dan writing assistant",
  },
  {
    name: "Envato Elements",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331061271.png",
    category: "Design",
    description: "Design assets dan templates",
  },
  {
    name: "Perplexity",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331118569.png",
    category: "AI",
    description: "AI research assistant",
  },
  {
    name: "Scribd",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331170322.png",
    category: "Education",
    description: "Digital library dan audiobooks",
  },
  {
    name: "Everand",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331186085.png",
    category: "Education",
    description: "Ebooks dan audiobooks",
  },
  {
    name: "Slideshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331200277.png",
    category: "Education",
    description: "Presentation sharing platform",
  },
  {
    name: "Scholarcy",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331211227.png",
    category: "Research",
    description: "Research paper summarizer",
  },
  {
    name: "Grammarly",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331265501.png",
    category: "Writing",
    description: "Grammar checker advanced",
  },
  {
    name: "Academia Edu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331277249.png",
    category: "Education",
    description: "Academic research platform",
  },
  {
    name: "iLoveIMG",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747077032124.png",
    category: "Tools",
    description: "Image editing tools",
  },
  {
    name: "iLovePDF",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747077018950.png",
    category: "Tools",
    description: "PDF editing tools",
  },
  {
    name: "Busuu",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323415059.png",
    category: "Language",
    description: "Language learning platform",
  },
  {
    name: "Freepik",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331369581.png",
    category: "Design",
    description: "Free design resources",
  },
  {
    name: "Duolingo",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331338823.png",
    category: "Language",
    description: "Language learning app",
  },
  {
    name: "Coursera",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331424928.png",
    category: "Education",
    description: "Online course platform",
  },
  {
    name: "Scite AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732257044432.png",
    category: "Research",
    description: "Research citation analysis",
  },
  {
    name: "Flaticon",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1736840945897.png",
    category: "Design",
    description: "Icon resources",
  },
  {
    name: "Tabnine",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1735138299559.png",
    category: "Development",
    description: "AI code completion",
  },
  {
    name: "Skillshare",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730693747061.jpg",
    category: "Education",
    description: "Creative learning platform",
  },
  {
    name: "Production Crate",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731855623564.png",
    category: "Video",
    description: "Video production assets",
  },
  {
    name: "Capcut Website",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331130077.png",
    category: "Video",
    description: "Video editing online",
  },
  {
    name: "Epidemic Sound",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331436616.png",
    category: "Audio",
    description: "Royalty-free music",
  },
  {
    name: "Wattpad Premium",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732185782594.jpg",
    category: "Reading",
    description: "Story reading platform",
  },
  {
    name: "Gamma",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732610563803.jpg",
    category: "Presentation",
    description: "AI presentation maker",
  },
  {
    name: "Consensus",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732204515132.png",
    category: "Research",
    description: "Scientific research engine",
  },
  {
    name: "Marvel Unlimited",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1736564477280.png",
    category: "Reading",
    description: "Digital comic library",
  },
  {
    name: "IconScout",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331349336.png",
    category: "Design",
    description: "Icon and illustration library",
  },
  {
    name: "Pikbest",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145750076.png",
    category: "Design",
    description: "Design templates",
  },
  {
    name: "SciSpace",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1731051815321.png",
    category: "Research",
    description: "Research paper reader",
  },
  {
    name: "Jenni AI",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1735024317747.jpg",
    category: "Writing",
    description: "AI writing assistant",
  },
  {
    name: "Motion Array",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331389539.png",
    category: "Video",
    description: "Video templates dan assets",
  },
  {
    name: "Semrush",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1732257003678.png",
    category: "Marketing",
    description: "SEO dan marketing tools",
  },
  {
    name: "Ubersuggest",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730807172007.png",
    category: "Marketing",
    description: "Keyword research tool",
  },
  {
    name: "Creative Fabrica",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742975667195.png",
    category: "Design",
    description: "Design resources",
  },
  {
    name: "Rawpixel",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145097224.png",
    category: "Design",
    description: "Stock photos dan vectors",
  },
  {
    name: "Vector Magic",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743146082937.png",
    category: "Design",
    description: "Image vectorization tool",
  },
  {
    name: "Lovepik",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745648452399.png",
    category: "Design",
    description: "Design resources",
  },
  {
    name: "Slidesdocs",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145966747.png",
    category: "Presentation",
    description: "Presentation templates",
  },
  {
    name: "Pngtree",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743145925428.png",
    category: "Design",
    description: "PNG resources",
  },
  {
    name: "All Debrid",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743144718593.png",
    category: "Tools",
    description: "Download manager",
  },
  {
    name: "Quizlet",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1743146609054.png",
    category: "Education",
    description: "Study flashcards platform",
  },
  {
    name: "Slidesgo",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1733226866846.png",
    category: "Presentation",
    description: "Slide templates premium",
  },
  {
    name: "Vecteezy",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1730331447055.png",
    category: "Design",
    description: "Vector graphics education",
  },
];

export default function AppsListModal({
  isOpen,
  onClose,
  planName,
  planPrice,
  accessMethod,
}: AppsListModalProps) {
  const getAppsForPlan = (plan: string): App[] => {
    switch (plan.toLowerCase()) {
      case "premium":
        return premiumApps;
      case "exclusive":
        return exclusiveApps;
      case "education":
        return educationApps;
      default:
        return premiumApps;
    }
  };

  const apps = getAppsForPlan(planName);
  const categories = [...new Set(apps.map((app) => app.category))];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-white/20 text-white max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-4">
            <div>
              <DialogTitle className="text-2xl text-white flex items-center gap-3">
                <span className="text-3xl">
                  {planName === "EXCLUSIVE"
                    ? "💎"
                    : planName === "EDUCATION"
                      ? "🎓"
                      : "⭐"}
                </span>
                Paket {planName}
              </DialogTitle>
              <DialogDescription className="text-gray-300 mt-2">
                {apps.length} aplikasi premium tersedia • {accessMethod}
              </DialogDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{planPrice}</div>
              <div className="text-sm text-gray-400">per bulan</div>
            </div>
          </div>

          {/* Access Method Info */}
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-400">🔧</span>
              <span className="font-medium text-blue-400">
                Extension Browser
              </span>
            </div>
            <p className="text-gray-300 text-sm">
              Download extension KlixGenix untuk akses mudah ke semua aplikasi{" "}
              {planName.toLowerCase() === "exclusive"
                ? "84"
                : planName.toLowerCase() === "education"
                  ? "46"
                  : "71"}{" "}
              aplikasi{" "}
              {planName.toLowerCase() === "exclusive"
                ? "premium dan exclusive"
                : "premium"}
            </p>
          </div>
        </DialogHeader>

        {/* Apps by Category */}
        <div className="space-y-6">
          {categories.map((category) => {
            const categoryApps = apps.filter(
              (app) => app.category === category,
            );
            return (
              <div key={category}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-primary text-primary"
                  >
                    {category}
                  </Badge>
                  <span className="text-gray-400 text-sm">
                    ({categoryApps.length} apps)
                  </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {categoryApps.map((app, index) => (
                    <div
                      key={index}
                      className="glass-morphism border-white/10 rounded-lg p-4 hover:border-primary/50 transition-all duration-300 group hover:scale-[1.02]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <img
                            src={app.icon}
                            alt={app.name}
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-white group-hover:text-primary transition-colors truncate">
                            {app.name}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
          <Button
            asChild
            className="flex-1 gradient-primary text-white font-medium"
          >
            <a href={`/payment?plan=${planName.toLowerCase()}`}>
              Mulai Berlangganan {planName}
            </a>
          </Button>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={onClose}
          >
            Tutup
          </Button>
        </div>

        {/* Footer Note */}
        <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3 mt-4">
          <p className="text-yellow-400 text-sm flex items-start gap-2">
            <span>ℹ️</span>
            <span>
              Daftar aplikasi dapat berubah sewaktu-waktu. Semua aplikasi
              dijamin aktif dan terupdate secara berkala.
            </span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
