const normalize = (value) =>
	String(value || '')
		.trim()
		.toLowerCase();

export const INDUSTRY_GROUPS = [
	{
		key: 'all',
		label: 'All',
		fullLabel: 'All Alumni',
		icon: 'pi pi-users',
	},
	{
		key: 'health',
		label: 'Health & Life Sciences',
		fullLabel: 'Health & Life Sciences',
		icon: 'pi pi-heart',
	},
	{
		key: 'technology',
		label: 'Technology & Software',
		fullLabel: 'Technology & Software',
		icon: 'pi pi-desktop',
	},
	{
		key: 'academia',
		label: 'Academia & Research',
		fullLabel: 'Academia & Research',
		icon: 'pi pi-book',
	},
	{
		key: 'professional',
		label: 'Business & Professional',
		fullLabel: 'Business & Professional Services',
		icon: 'pi pi-briefcase',
	},
];

const RAW_INDUSTRY_GROUPS = {
	health: new Set([
		'Hospitals and Health Care',
		'Hospital & Health Care',
		'Biotechnology Research',
		'Biotechnology',
		'Pharmaceutical Manufacturing',
		'Medical Practices',
		'Mental Health Care',
		'Medical and Diagnostic Laboratories',
	]),

	technology: new Set([
		'Software Development',
		'Computer Software',
		'Technology, Information and Internet',
		'Technology, Information and Media',
		'IT Services and IT Consulting',
		'Internet',
		'Telecommunications',
		'Entertainment Providers',
	]),

	academia: new Set(['Higher Education', 'Research Services', 'Research']),

	professional: new Set([
		'Financial Services',
		'Law Practice',
		'Government Administration',
		'Market Research',
		'Advertising Services',
		'Services for Renewable Energy',
		'Spectator Sports',
		'Farming',
	]),
};

const HEALTH_COMPANY_TERMS = [
	'hospital',
	'health',
	'medical',
	'medicine',
	'cancer',
	'biotech',
	'pharma',
	'genentech',
	'roche',
	'natera',
	'bristol-myers',
	'bristol myers',
	'iuCPQ'.toLowerCase(),
	'dental',
	'eigen health',
	'lifera',
];

const ACADEMIA_COMPANY_TERMS = ['university', 'college', 'academ', 'school of'];

const PROFESSIONAL_COMPANY_TERMS = [
	'rbc',
	'bank',
	'financial',
	'kpmg',
	'law',
	'legal',
	'government',
	'ministry',
	'numeris',
	'consult',
];

const TECHNOLOGY_COMPANY_TERMS = [
	'google',
	'huawei',
	'oracle',
	'instacart',
	'atlassian',
	'tiktok',
	'software',
	'technology',
	'tech',
	'cloud',
	'data lab',
];

const TECHNOLOGY_TITLE_TERMS = [
	'software engineer',
	'software developer',
	'machine learning',
	'ml engineer',
	'data engineer',
	'full stack',
	'full-stack',
	'developer',
	'engineering manager',
	'technical lead',
];

const HEALTH_TITLE_TERMS = [
	'bioinformatic',
	'computational biolog',
	'physician',
	'doctor',
	'clinical',
	'medical',
	'genomic',
];

const ACADEMIA_TITLE_TERMS = [
	'professor',
	'phd',
	'doctoral',
	'graduate research',
	'postdoctoral',
	'predoctoral',
	'research fellow',
];

const containsAny = (text, terms) => terms.some((term) => text.includes(term));

export const hasCurrentCareerInfo = (alumnus) => {
	const current = alumnus?.currentPosition || {};

	return Boolean(String(current.company || '').trim() || String(current.title || '').trim());
};

export const getIndustryGroup = (alumnus) => {
	if (!hasCurrentCareerInfo(alumnus)) {
		return 'unavailable';
	}

	const current = alumnus?.currentPosition || {};
	const industry = String(current.industry || '').trim();

	for (const [groupKey, industries] of Object.entries(RAW_INDUSTRY_GROUPS)) {
		if (industries.has(industry)) {
			return groupKey;
		}
	}

	const company = normalize(current.company);
	const title = normalize(current.title);
	const combined = `${company} ${title}`;

	/*
	 * Company-level checks come before generic title checks.
	 * This prevents a role such as "Senior Applied ML Scientist at RBC"
	 * from being categorized as technology instead of professional services.
	 */
	if (containsAny(company, HEALTH_COMPANY_TERMS)) {
		return 'health';
	}

	if (containsAny(company, ACADEMIA_COMPANY_TERMS)) {
		return 'academia';
	}

	if (containsAny(company, PROFESSIONAL_COMPANY_TERMS)) {
		return 'professional';
	}

	if (containsAny(company, TECHNOLOGY_COMPANY_TERMS)) {
		return 'technology';
	}

	if (containsAny(combined, HEALTH_TITLE_TERMS)) {
		return 'health';
	}

	if (containsAny(combined, ACADEMIA_TITLE_TERMS)) {
		return 'academia';
	}

	if (containsAny(combined, TECHNOLOGY_TITLE_TERMS)) {
		return 'technology';
	}

	/*
	 * Current cleaned alumni data is fully covered by the mappings/fallbacks
	 * above. If a future record introduces an unknown industry, keep it in the
	 * professional bucket rather than making it disappear from sector filters.
	 *
	 * If the dataset grows substantially, consider adding a visible "Other"
	 * sector instead of this final fallback.
	 */
	return 'professional';
};

export const getIndustryGroupDefinition = (groupKey) =>
	INDUSTRY_GROUPS.find((group) => group.key === groupKey) || INDUSTRY_GROUPS[0];

const COUNTRY_MATCHERS = [
	{ label: 'Canada', terms: ['canada'] },
	{
		label: 'United States',
		terms: ['united states', 'usa', 'u.s.a.', 'u.s.'],
	},
	{
		label: 'United Kingdom',
		terms: ['united kingdom', 'england', 'scotland', 'wales'],
	},
	{ label: 'Spain', terms: ['spain'] },
	{ label: 'Germany', terms: ['germany'] },
	{ label: 'India', terms: ['india'] },
	{ label: 'Japan', terms: ['japan'] },
	{ label: 'Netherlands', terms: ['netherlands'] },
	{ label: 'Saudi Arabia', terms: ['saudi arabia'] },
];

export const getCountry = (alumnus) => {
	const location = String(alumnus?.currentPosition?.location || '').trim();

	if (!location) {
		return 'Unknown';
	}

	const normalizedLocation = normalize(location);

	const knownCountry = COUNTRY_MATCHERS.find(({ terms }) => terms.some((term) => normalizedLocation.includes(term)));

	if (knownCountry) {
		return knownCountry.label;
	}

	/*
	 * Locations in the cleaned data should contain a country.
	 * This fallback keeps future values usable if they follow
	 * "City, Region, Country" formatting.
	 */
	const segments = location
		.split(',')
		.map((segment) => segment.trim())
		.filter(Boolean);

	if (segments.length > 1) {
		return segments.at(-1);
	}

	return location;
};
