// industryGroups.js

export const INDUSTRY_GROUPS = [
	{
		value: "all",
		label: "All Alumni",
		shortLabel: "All",
		icon: "pi pi-th-large",
		color: "#2563eb",
		background: "#eff6ff",
	},
	{
		value: "health",
		label: "Healthcare & Life Sciences",
		shortLabel: "Health & Life Sciences",
		icon: "pi pi-heart-fill",
		color: "#7c3aed",
		background: "#f5f3ff",
	},
	{
		value: "technology",
		label: "Software & Technology",
		shortLabel: "Technology",
		icon: "pi pi-desktop",
		color: "#0284c7",
		background: "#f0f9ff",
	},
	{
		value: "research",
		label: "Higher Education & Research",
		shortLabel: "Academia & Research",
		icon: "pi pi-graduation-cap",
		color: "#059669",
		background: "#ecfdf5",
	},
	{
		value: "professional",
		label: "Business & Professional Services",
		shortLabel: "Business & Professional",
		icon: "pi pi-briefcase",
		color: "#d97706",
		background: "#fffbeb",
	},
	{
		value: "other",
		label: "Other / Not Categorized",
		shortLabel: "Other",
		icon: "pi pi-ellipsis-h",
		color: "#64748b",
		background: "#f8fafc",
	},
];

const RAW_INDUSTRY_GROUPS = {
	// Healthcare & Life Sciences
	"hospitals and health care": "health",
	"hospital & health care": "health",
	"biotechnology research": "health",
	biotechnology: "health",
	"pharmaceutical manufacturing": "health",
	"medical practices": "health",
	"mental health care": "health",
	"medical and diagnostic laboratories": "health",

	// Software & Technology
	"software development": "technology",
	"computer software": "technology",
	"technology, information and internet": "technology",
	"it services and it consulting": "technology",
	internet: "technology",

	// Higher Education & Research
	"higher education": "research",
	"research services": "research",
	research: "research",

	// Business & Professional Services
	"financial services": "professional",
	"law practice": "professional",
	"government administration": "professional",
	"market research": "professional",
	"advertising services": "professional",
	"services for renewable energy": "professional",
	"spectator sports": "professional",
};

const FALLBACK_RULES = [
	{
		value: "health",
		terms: [
			"hospital",
			"health",
			"cancer",
			"clinic",
			"medical",
			"medicine",
			"pharma",
			"biotech",
			"dental",
			"genentech",
			"uhn",
			"university health network",
			"princess margaret",
		],
	},
	{
		value: "professional",
		terms: [
			"rbc",
			"bank",
			"financial",
			"finance",
			"law",
			"legal",
			"consulting",
			"consultant",
			"government",
			"market research",
			"advertising",
			"renewable energy",
			"sports",
		],
	},
	{
		value: "research",
		terms: [
			"university",
			"college",
			"harvard",
			"mcgill",
			"professor",
			"faculty",
			"phd",
			"doctoral",
			"postdoctoral",
			"graduate student",
			"masters student",
			"master's student",
		],
	},
	{
		value: "technology",
		terms: [
			"huawei",
			"software",
			"technology",
			"developer",
			"engineer",
			"machine learning",
			"data scientist",
			"artificial intelligence",
			" ai ",
		],
	},
];

const COUNTRY_PATTERNS = [
	["Canada", /\bcanada\b/i],
	["United States", /\b(united states|usa|u\.s\.a\.)\b/i],
	["United Kingdom", /\b(united kingdom|uk)\b/i],
	["Spain", /\bspain\b/i],
	["Germany", /\bgermany\b/i],
	["Netherlands", /\bnetherlands\b/i],
	["India", /\bindia\b/i],
	["Japan", /\bjapan\b/i],
];

const normalize = (value) => String(value || "").trim().toLowerCase();

export const getIndustryGroup = (alumnus) => {
	const currentPosition = alumnus?.currentPosition || {};
	const rawIndustry = normalize(currentPosition.industry);

	if (RAW_INDUSTRY_GROUPS[rawIndustry]) {
		return RAW_INDUSTRY_GROUPS[rawIndustry];
	}

	/*
	 * Only infer from employer/title when LinkedIn did not provide
	 * an industry. This keeps the raw LinkedIn industry authoritative.
	 */
	if (!rawIndustry) {
		const fallbackText = normalize(
			`${currentPosition.company || ""} ${currentPosition.title || ""}`,
		);

		for (const rule of FALLBACK_RULES) {
			const match = rule.terms.some((term) =>
				fallbackText.includes(term.toLowerCase()),
			);

			if (match) {
				return rule.value;
			}
		}
	}

	return "other";
};

export const getIndustryGroupDefinition = (value) =>
	INDUSTRY_GROUPS.find((group) => group.value === value) ||
	INDUSTRY_GROUPS[INDUSTRY_GROUPS.length - 1];

export const getCountry = (location) => {
	const value = String(location || "").trim();

	if (!value) {
		return "Unknown";
	}

	for (const [country, pattern] of COUNTRY_PATTERNS) {
		if (pattern.test(value)) {
			return country;
		}
	}

	return "Other / Unknown";
};
