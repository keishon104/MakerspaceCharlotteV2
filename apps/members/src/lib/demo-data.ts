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
    renewalDate: string;
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

export type OnboardingStep = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  checklist: string[];
  actions: {
    label: string;
    href: string;
    external?: boolean;
  }[];
};

export type CurriculumClassLink = {
  title: string;
  description: string;
  href: string;
  tag: string;
};

export type CurriculumStep = {
  id: string;
  title: string;
  phase: string;
  summary: string;
  xp: number;
  reward: string;
  outcomes: string[];
  tools: string[];
  classLinks: CurriculumClassLink[];
};

export type ShopCurriculum = {
  shop: string;
  title: string;
  summary: string;
  accessNote: string;
  steps: CurriculumStep[];
};

export const instructorInterestUrl = "https://airtable.com/shrQ3Q7B2KMLjk68x";
export const eventbriteClassesUrl =
  "https://www.eventbrite.com/o/makerspace-charlotte-29737939547";
export const eventbriteWoodShop101Url =
  "https://www.eventbrite.com/e/wood-shop-101-introduction-to-milling-shop-clean-up-tickets-1291940592089";
export const eventbriteWoodShop102Url =
  "https://www.eventbrite.com/e/wood-shop-102-introduction-to-band-saws-routers-tickets-1291957322129";
export const eventbriteWoodShopCollectionUrl =
  "https://www.eventbrite.com/cc/wood-shop-3190699";

export const demoSession: PortalSession = {
  mode: "demo",
  user: {
    email: "member@example.com",
    name: "Demo Member",
  },
  member: {
    status: "active",
    type: "Individual + immediate family",
    renewalDate: "June 15, 2026",
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
    href: eventbriteClassesUrl,
    category: "Classes",
  },
  {
    title: "Support request",
    description: "Account, billing, membership, or access-status questions.",
    href: "#support-request",
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

export const woodworkingCurriculum: ShopCurriculum = {
  shop: "Woodworking",
  title: "Woodworking Access Curriculum",
  summary:
    "A member-facing path from basic shop expectations to supervised tool access and advanced woodworking classes.",
  accessNote:
    "Completion in this prototype is self-tracked. Real authorization should still be approved by admins or permissioned shop leads.",
  steps: [
    {
      id: "wood-orientation",
      phase: "Start",
      title: "Read the shop expectations",
      summary:
        "Review how the wood shop is organized before taking a machine class or asking for tool access.",
      xp: 10,
      reward: "Orientation badge",
      outcomes: [
        "Know where PPE, dust collection, scrap, hardware, and cleaning supplies live.",
        "Understand that missed safety briefings prevent class participation.",
        "Know when to stop and ask a shop lead before using a tool.",
      ],
      tools: ["PPE", "Dust collection", "Cleanup zones", "Shop storage"],
      classLinks: [
        {
          title: "Full Eventbrite schedule",
          description: "Browse all currently listed MakerSpace Charlotte classes.",
          href: eventbriteClassesUrl,
          tag: "Schedule",
        },
      ],
    },
    {
      id: "wood-101",
      phase: "Required class",
      title: "Complete Wood Shop 101",
      summary:
        "This is the entry class for milling lumber, learning the core machines, and understanding cleanup expectations.",
      xp: 25,
      reward: "Milling badge",
      outcomes: [
        "Mill stock toward S4S using the core machine sequence.",
        "Practice safe setup and cleanup for shared shop use.",
        "Learn the layout of sanding, tool storage, and common work areas.",
      ],
      tools: ["Miter saw", "Planer", "Jointer", "Table saw"],
      classLinks: [
        {
          title: "Wood Shop 101",
          description: "Introduction to Milling & Shop Clean-up on Eventbrite.",
          href: eventbriteWoodShop101Url,
          tag: "Required",
        },
      ],
    },
    {
      id: "lead-check",
      phase: "Access check",
      title: "Get shop lead confirmation",
      summary:
        "After class, confirm what tools you can use independently and what still requires supervision.",
      xp: 20,
      reward: "Access review",
      outcomes: [
        "Record what access was approved and who approved it.",
        "Identify any tools that require another class or practice session.",
        "Know the escalation path for broken tools, dull blades, and unsafe use.",
      ],
      tools: ["Access notes", "Shop lead review", "Maintenance reporting"],
      classLinks: [],
    },
    {
      id: "wood-102",
      phase: "Next class",
      title: "Add bandsaw and router skills",
      summary:
        "Wood Shop 102 extends the path into curved cuts, resawing, chamfers, grooves, and router workflows.",
      xp: 25,
      reward: "Router and bandsaw badge",
      outcomes: [
        "Understand safe bandsaw setup and curved cuts.",
        "Practice handheld router and router table workflows.",
        "Know which projects still need shop lead review.",
      ],
      tools: ["Band saw", "Handheld router", "Router table"],
      classLinks: [
        {
          title: "Wood Shop 102",
          description: "Introduction to Band Saws & Routers on Eventbrite.",
          href: eventbriteWoodShop102Url,
          tag: "Recommended",
        },
        {
          title: "Wood Shop collection",
          description: "Browse related lathe and woodworking classes.",
          href: eventbriteWoodShopCollectionUrl,
          tag: "More classes",
        },
      ],
    },
  ],
};

export const onboardingSteps: OnboardingStep[] = [
  {
    id: "account-match",
    eyebrow: "Step 1",
    title: "Confirm your account match",
    description:
      "Make sure your portal account is connected to the membership record admins recognize.",
    checklist: [
      "Review your displayed name and email.",
      "Check whether your status is active, pending, past due, or inactive.",
      "Use support if your account does not match your membership.",
    ],
    actions: [{ label: "View membership", href: "/membership" }],
  },
  {
    id: "family-access",
    eyebrow: "Step 2",
    title: "Review immediate family access",
    description:
      "Membership currently includes access for immediate family, but final household rules should be confirmed with admins.",
    checklist: [
      "Read the family access explanation.",
      "Decide whether household members need to be listed in the portal.",
      "Ask admins if a family member's access is unclear.",
    ],
    actions: [{ label: "Open profile", href: "/profile" }],
  },
  {
    id: "discord",
    eyebrow: "Step 3",
    title: "Join the Discord community",
    description:
      "Discord remains the live community layer for questions, project help, announcements, and events.",
    checklist: [
      "Find the right channel for general questions.",
      "Use project-showcase to share finished work.",
      "Keep billing, account, and access-status issues in official support paths.",
    ],
    actions: [{ label: "Open channel guide", href: "/community" }],
  },
  {
    id: "resources",
    eyebrow: "Step 4",
    title: "Read core resources",
    description:
      "Start with handbook, policies, and forms before using shops independently.",
    checklist: [
      "Review the member handbook when available.",
      "Check safety and shop rules.",
      "Find the support request path for official help.",
    ],
    actions: [{ label: "Open resources", href: "/resources" }],
  },
  {
    id: "training",
    eyebrow: "Step 5",
    title: "Choose your first shop or training path",
    description:
      "Shop instructions explain what training or orientation is needed before using major tools.",
    checklist: [
      "Pick the shop that matches your first project.",
      "Review the access notes for that shop.",
      "Ask a shop lead when a tool or workflow requires authorization.",
    ],
    actions: [{ label: "View training guidance", href: "/training-access" }],
  },
  {
    id: "instructor-interest",
    eyebrow: "Optional",
    title: "Interested in teaching?",
    description:
      "Members who want to teach can start with the instructor interest form.",
    checklist: [
      "Think through the class topic, audience, and prerequisites.",
      "Submit the instructor interest form.",
      "Use Discord or admin follow-up for discussion after submitting.",
    ],
    actions: [
      {
        label: "Teach a class form",
        href: instructorInterestUrl,
        external: true,
      },
    ],
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

export const adminTriageQueue = [
  {
    id: "support-001",
    type: "Support request",
    title: "Membership status looks incorrect",
    member: "Dan Ruys",
    status: "Open",
    priority: "Blocking access",
    submitted: "Today",
    owner: "Admin",
    nextStep: "Compare portal account email against Steve's membership records.",
  },
  {
    id: "billing-002",
    type: "Pause request",
    title: "Pause membership for 2 months",
    member: "Amber Kalmin",
    status: "Needs review",
    priority: "Normal",
    submitted: "Yesterday",
    owner: "Admin",
    nextStep: "Confirm pause policy and update external dues workflow.",
  },
  {
    id: "rooms-003",
    type: "Rental room waitlist",
    title: "Interested in business room",
    member: "Chris Ott",
    status: "Queued",
    priority: "Normal",
    submitted: "May 27",
    owner: "Operations",
    nextStep: "Collect business type, room size needs, and target start date.",
  },
  {
    id: "training-004",
    type: "Training access",
    title: "Wood Shop 101 completion check",
    member: "Stephanie Suttenberg",
    status: "Needs shop lead",
    priority: "Time sensitive",
    submitted: "May 26",
    owner: "Authorized shop lead",
    nextStep: "Verify class attendance before approving independent tool access.",
  },
];

export const adminWorkflowColumns = [
  {
    title: "Membership Operations",
    items: [
      "Match new app accounts to paid member records.",
      "Update status, renewal date, and immediate family access notes.",
      "Review pause/cancel requests before changing billing elsewhere.",
    ],
  },
  {
    title: "Training & Access",
    items: [
      "Approve tool access only after class or shop lead confirmation.",
      "Separate self-tracked curriculum progress from official authorization.",
      "Keep an audit note for who approved access and when.",
    ],
  },
  {
    title: "Resources & Publishing",
    items: [
      "Publish member resources, support paths, and official forms.",
      "Let shop leads draft guidance without granting broad admin access.",
      "Review instructor interest submissions outside the training queue.",
    ],
  },
];

export const adminMemberLookupPreview = [
  {
    name: "Demo Member",
    email: "member@example.com",
    status: "active",
    renewal: "June 15, 2026",
    roles: ["member", "admin", "shop_lead"],
  },
  {
    name: "Pending Member",
    email: "pending@example.com",
    status: "pending",
    renewal: "Pending match",
    roles: ["member"],
  },
  {
    name: "Past Due Member",
    email: "pastdue@example.com",
    status: "past_due",
    renewal: "May 15, 2026",
    roles: ["member"],
  },
] as const;
