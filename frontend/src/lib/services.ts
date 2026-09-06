export interface ServiceDetail {
  slug: string;
  name: string;
  intro: string;
  included: string[];
  outcomes: string[];
  metaTitle: string;
  metaDescription: string;
}

export const SERVICES_DETAIL: ServiceDetail[] = [
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    intro:
      "Your customers spend hours every day on social media. We make sure your brand shows up there with purpose — consistent, on-brand content backed by a strategy built around your business goals, not vanity metrics.",
    included: [
      "Platform & content strategy",
      "Content calendars & creative direction",
      "Community management & engagement",
      "Paid social amplification (with Meta Ads)",
      "Monthly growth & performance reporting",
    ],
    outcomes: [
      "A consistent, professional presence across platforms",
      "A growing, genuinely engaged follower base",
      "More enquiries coming from social channels",
      "Clear reporting on what is working and why",
    ],
    metaTitle: "Social Media Marketing Agency | Branding Amigos",
    metaDescription:
      "Build your brand on Facebook, Instagram & LinkedIn with data-driven social media marketing that engages audiences and drives real business growth.",
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    intro:
      "Search is changing. Customers now find businesses through Google, AI Overviews, and AI assistants like ChatGPT. Our AI SEO approach optimises for all of them — technical foundations, entity clarity, and content that machines trust and cite.",
    included: [
      "Technical SEO & Core Web Vitals",
      "Google AI Overview optimisation",
      "AI assistant (ChatGPT) visibility",
      "Entity & structured data optimisation",
      "Conversational & long-tail query targeting",
    ],
    outcomes: [
      "Visibility in both classic and AI-driven search",
      "Content that AI assistants trust and cite",
      "Future-proof organic growth",
      "Qualified traffic that actually converts",
    ],
    metaTitle: "AI SEO Services — Google & AI Assistants | Branding Amigos",
    metaDescription:
      "Rank on Google Search, AI Overviews & AI assistants like ChatGPT. Advanced AI SEO strategies for the new era of search.",
  },
  {
    slug: "meta-ads",
    name: "Meta Ads",
    intro:
      "Facebook and Instagram remain two of the most powerful places to reach customers. We plan, launch, and optimise Meta campaigns around one thing: return on your ad spend.",
    included: [
      "Campaign strategy & account structure",
      "Audience research, targeting & lookalikes",
      "Creative direction & testing",
      "Retargeting funnels",
      "ROAS-focused optimisation & reporting",
    ],
    outcomes: [
      "Quality leads at a predictable cost",
      "Creative that stops the scroll",
      "Full-funnel coverage from awareness to conversion",
      "Transparent reporting on every rupee spent",
    ],
    metaTitle: "Meta Ads Management — Facebook & Instagram | Branding Amigos",
    metaDescription:
      "High-converting Meta ad campaigns on Facebook & Instagram. Quality leads, brand awareness, and ROAS-focused optimisation.",
  },
  {
    slug: "google-ads",
    name: "Google Ads",
    intro:
      "When someone searches for what you sell, Google Ads puts you at the top — today, not in six months. We build tightly managed campaigns where every rupee is accountable.",
    included: [
      "Search & Performance Max campaigns",
      "Keyword, bidding & budget strategy",
      "Ad copywriting & extensions",
      "Conversion tracking setup",
      "Landing page alignment",
    ],
    outcomes: [
      "Immediate visibility for buying-intent searches",
      "Lower cost per lead over time",
      "Full conversion tracking from day one",
      "No wasted spend on irrelevant clicks",
    ],
    metaTitle: "Google Ads Management Services | Branding Amigos",
    metaDescription:
      "Drive targeted traffic & instant leads with optimized Google Ads campaigns. Reach customers actively searching for your products or services.",
  },
  {
    slug: "web-design",
    name: "Web Design",
    intro:
      "Your website is where every marketing rupee lands. We design fast, modern, mobile-friendly sites that look like your brand, load instantly, and are built from day one to rank and convert.",
    included: [
      "Custom, on-brand design",
      "Mobile-first responsive build",
      "Speed & Core Web Vitals optimisation",
      "SEO-ready structure & metadata",
      "Contact & lead capture setup",
    ],
    outcomes: [
      "A site you are proud to send people to",
      "Faster load times and better rankings",
      "More enquiries from the same traffic",
      "A website that is easy to update and grow",
    ],
    metaTitle: "Web Design Services — Fast, SEO-Ready Sites | Branding Amigos",
    metaDescription:
      "Modern, fast, mobile-friendly websites that reflect your brand & convert visitors into customers. SEO-ready structure included.",
  },
  {
    slug: "content-marketing",
    name: "Content Marketing",
    intro:
      "Good content compounds. We plan and produce strategic content that answers real customer questions, builds trust, and steadily grows your organic traffic and authority.",
    included: [
      "Content strategy & topic planning",
      "Blogs, articles & guides",
      "Landing page & website copy",
      "Distribution & repurposing",
      "Performance tracking & refreshes",
    ],
    outcomes: [
      "Steady organic traffic growth",
      "Recognised authority in your industry",
      "Content that supports sales conversations",
      "An asset library that compounds over time",
    ],
    metaTitle: "Content Marketing Services | Branding Amigos",
    metaDescription:
      "Strategic content that builds trust & search visibility. Generate organic traffic, educate customers & establish authority in your industry.",
  },
  {
    slug: "ai-influencer-marketing",
    name: "AI Influencer Marketing",
    intro:
      "The right creator can put your brand in front of thousands of perfect-fit customers overnight. We use AI-powered discovery to find influencers whose audiences actually match yours — then build partnerships that feel authentic, not transactional.",
    included: [
      "AI-powered creator discovery & vetting",
      "Audience fit & authenticity analysis",
      "Campaign & partnership management",
      "Content briefs & coordination",
      "Reach, engagement & ROI tracking",
    ],
    outcomes: [
      "Partnerships with genuinely relevant creators",
      "Reach into highly engaged audiences",
      "Authentic content that builds trust",
      "Measurable campaign results",
    ],
    metaTitle: "AI Influencer Marketing Services | Branding Amigos",
    metaDescription:
      "AI-powered influencer discovery connects your brand with the right creators. Authentic partnerships that amplify your reach to engaged audiences.",
  },
  {
    slug: "whatsapp-automation",
    name: "WhatsApp Business Automation",
    intro:
      "Your customers already live on WhatsApp. We set up smart automation that answers instantly, follows up on every lead, and keeps conversations moving — even while you sleep.",
    included: [
      "WhatsApp Business API setup",
      "Automated lead follow-up flows",
      "Chatbot conversation design",
      "Broadcast & campaign messaging",
      "CRM & tool integrations",
    ],
    outcomes: [
      "No lead left unanswered",
      "Faster response times, happier customers",
      "Hours of manual work saved every week",
      "More prospects converted into customers",
    ],
    metaTitle: "WhatsApp Business Automation | Branding Amigos",
    metaDescription:
      "Automate customer conversations, lead follow-ups & marketing on WhatsApp. Improve engagement, save time & convert more prospects.",
  },
  {
    slug: "ai-agents-automation",
    name: "AI Agents & Automation",
    intro:
      "Repetitive work is expensive. We design AI agents and automations that handle lead qualification, instant responses, and routine operations — so your team spends time on work that actually needs them.",
    included: [
      "Lead qualification & routing agents",
      "24/7 instant response systems",
      "Workflow & process automation",
      "Tool & CRM integrations",
      "Monitoring & continuous improvement",
    ],
    outcomes: [
      "Operations that run around the clock",
      "Faster, consistent customer interactions",
      "Lower operational overhead",
      "Systems that scale without extra hiring",
    ],
    metaTitle: "AI Agents & Business Automation | Branding Amigos",
    metaDescription:
      "Smart AI agents that qualify leads, respond instantly & automate operations — 24/7 systems that capture, engage & convert customers.",
  },
];
