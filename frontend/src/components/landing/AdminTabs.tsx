import { Link, useLocation } from "react-router-dom";
import { Code2, Inbox, PenLine } from "lucide-react";

const TABS = [
  { label: "Enquiries", to: "/admin", icon: Inbox, testId: "admin-tab-enquiries" },
  { label: "Blog manager", to: "/admin/blog", icon: PenLine, testId: "admin-tab-blog" },
  { label: "Site codes", to: "/admin/codes", icon: Code2, testId: "admin-tab-codes" },
];

export function AdminTabs() {
  const { pathname } = useLocation();
  return (
    <div className="mt-8 flex flex-wrap gap-2 border-b border-white/10 pb-px">
      {TABS.map((tab) => {
        const active = pathname === tab.to;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.to}
            to={tab.to}
            data-testid={tab.testId}
            className={`inline-flex items-center gap-2 rounded-t-lg px-5 py-3 text-sm font-semibold transition-colors ${
              active ? "bg-[#0C1030] text-white" : "text-[#8B93B8] hover:text-white"
            }`}
          >
            <Icon className="h-4 w-4" /> {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
