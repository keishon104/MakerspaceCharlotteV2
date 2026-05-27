export type MembershipStatus = "active" | "pending" | "past_due" | "inactive";

export type PortalSession = {
  mode: "demo" | "supabase";
  user: {
    email: string;
    name: string;
  };
  member: {
    status: MembershipStatus;
    type: string;
    renewalLabel: string;
    householdAccess: string;
  };
  roles: string[];
};

export type ResourceLink = {
  title: string;
  description: string;
  href: string;
  category: string;
};

export type ShopInstruction = {
  shop: string;
  status: "ready" | "training_required" | "ask_lead";
  summary: string;
  owner: string;
};

export const demoSession: PortalSession = {
  mode: "demo",
  user: {
    email: "member@example.com",
    name: "Demo Member",
  },
  member: {
    status: "active",
    type: "Individual + immediate family",
    renewalLabel: "Manual review until dues integration is confirmed",
    householdAccess:
      "Immediate family has access under the member's plan. Confirm final household rules with admins before launch.",
  },
  roles: ["member", "admin", "shop_lead"],
};

export const dashboardNotices = [
  {
    title: "Discord remains the community home",
    body: "Use the member app for account status, resources, benefits, and official support. Use Discord for live conversation and project help.",
  },
  {
    title: "Membership status starts manual",
    body: "Until Steve's dues workflow exposes an export or API, admins can approve account matches and update member status manually.",
  },
  {
    title: "Reservations are out of scope",
    body: "The MVP intentionally skips tool, room, and shop reservations to avoid creating a maintenance burden too early.",
  },
];

export const benefits = [
  "24/7 member access after onboarding and any required orientation",
  "Immediate family access under the member's plan",
  "Member class discount instructions",
  "Discord community access and channel guide",
  "Shop and safety policy resources",
  "Studio or storage eligibility notes when applicable",
];

export const resources: ResourceLink[] = [
  {
    title: "Member handbook",
    description: "Core expectations, access rules, and operating norms.",
    href: "#",
    category: "Policy",
  },
  {
    title: "Discord channel guide",
    description: "Where to ask for help, share projects, and follow announcements.",
    href: "/community",
    category: "Community",
  },
  {
    title: "Eventbrite classes",
    description: "Current public classes and registration flow.",
    href: "https://www.eventbrite.com/o/makerspace-charlotte-6594736471",
    category: "Classes",
  },
  {
    title: "Teach a class",
    description: "Instructor proposal path and teaching expectations.",
    href: "#",
    category: "Forms",
  },
  {
    title: "Support request",
    description: "Account, billing, membership, or access-status questions.",
    href: "#",
    category: "Help",
  },
];

export const shopInstructions: ShopInstruction[] = [
  {
    shop: "Woodworking",
    status: "training_required",
    summary: "Start with Wood Shop 101 before independent use of major tools.",
    owner: "Shop lead guidance",
  },
  {
    shop: "Digital Fabrication",
    status: "training_required",
    summary: "Laser, CNC, and printer workflows require tool-specific orientation.",
    owner: "Shop lead guidance",
  },
  {
    shop: "Pottery & Ceramics",
    status: "ask_lead",
    summary: "Studio access depends on current pottery policies, classes, and kiln process.",
    owner: "Pottery shop guidance",
  },
  {
    shop: "Metal, Welding & Blacksmithing",
    status: "training_required",
    summary: "Welding, forging, and metal tools require safety training and authorization.",
    owner: "Shop lead guidance",
  },
];

export const discordChannels = [
  ["Introduce yourself", "#introductions"],
  ["Ask general member questions", "#general"],
  ["Find project help", "#how-can-i-help"],
  ["Share finished work", "#project-showcase"],
  ["Track announcements", "#announcements"],
  ["Discuss events", "#events"],
  ["Pottery-specific questions", "#pottery-faq"],
  ["Account, billing, or access-status issues", "Member app support request"],
] as const;

export const adminQueue = [
  {
    label: "Account mismatch reviews",
    count: 3,
    note: "Admins approve account-to-membership matches.",
  },
  {
    label: "Manual membership status updates",
    count: 8,
    note: "Use until Steve's dues workflow has an export or API.",
  },
  {
    label: "Shop instructions needing review",
    count: 4,
    note: "Shop leads can publish guidance, not member authorizations by default.",
  },
];
