export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT_INFO = {
  email: "brandingamigos@gmail.com",
  phone: "+91 79845 68245",
  phoneHref: "+917984568245",
  location: "Ahmedabad, Gujarat 382424, India",
  hours: "Monday – Friday, 9:00 AM – 6:00 PM IST",
};

export interface ContactInquiry {
  id: string;
  name: string;
  business: string | null;
  email: string;
  phone: string | null;
  website: string | null;
  services: string[];
  budget: string | null;
  goals: string;
  status: string;
  created_at: string;
}

export interface PostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  author: string;
  published_at: string;
}

export interface InsightPost extends PostSummary {
  content: string;
}
