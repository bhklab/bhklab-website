import React, { useEffect, useMemo, useState } from 'react';

import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';

import {
	getCountry,
	getIndustryGroup,
	getIndustryGroupDefinition,
	hasCurrentCareerInfo,
	INDUSTRY_GROUPS,
} from './utils/industryGroups';

import {
	AlumniCardShell,
	AlumniGrid,
	Avatar,
	CardFooter,
	CardTop,
	CountryWrap,
	Description,
	EmptyState,
	Explorer,
	IndustryButtonContent,
	IndustryRow,
	IndustrySelectorWrap,
	Intro,
	LinkedInButton,
	LocationRow,
	Person,
	ResultsHeader,
	SearchIcon,
	SearchWrap,
	Toolbar,
	UnavailableButton,
	UnavailableCard,
	UnavailableGrid,
	UnavailableHeader,
	UnavailableSection,
} from './styles/AlumniIndustryExplorerStyles';

const IMAGE_ROOT = 'https://storage.googleapis.com/caboodle-images/member-photos';

const DEFAULT_IMAGE = `${IMAGE_ROOT}/default_member.png`;

const normalize = (value) =>
	String(value || '')
		.trim()
		.toLowerCase();

const getLastName = (name) => {
	const parts = String(name || '')
		.trim()
		.split(/\s+/)
		.filter(Boolean);

	return parts.at(-1) || '';
};

const getLinkedIn = (alumnus) => alumnus?.socials?.linkedIn || alumnus?.socials?.linkedin || '';

const getImageUrl = (alumnus) => (alumnus?.image ? `${IMAGE_ROOT}/${alumnus.image}` : DEFAULT_IMAGE);

const sortByName = (a, b) => {
	const lastNameComparison = getLastName(a.name).localeCompare(getLastName(b.name));

	if (lastNameComparison !== 0) {
		return lastNameComparison;
	}

	return String(a.name || '').localeCompare(String(b.name || ''));
};

const AlumniCard = ({ alumnus }) => {
	const current = alumnus.currentPosition || {};
	const groupKey = alumnus.industryGroup;
	const group = getIndustryGroupDefinition(groupKey);

	const linkedIn = getLinkedIn(alumnus);

	const industryLabel = String(current.industry || '').trim() || group.fullLabel;

	return (
		<AlumniCardShell>
			<CardTop>
				<Avatar
					src={getImageUrl(alumnus)}
					alt={alumnus.name}
					onError={(event) => {
						event.currentTarget.onerror = null;
						event.currentTarget.src = DEFAULT_IMAGE;
					}}
				/>

				<Person>
					<h4>{alumnus.name}</h4>

					{current.title && <p className="current-title">{current.title}</p>}

					{current.company && <p className="company">{current.company}</p>}
				</Person>
			</CardTop>

			<IndustryRow>
				<Tag value={industryLabel} className={`industry-tag industry-tag--${groupKey}`} rounded />
			</IndustryRow>

			{current.location && (
				<LocationRow>
					<i className="pi pi-map-marker" aria-hidden="true" />

					<span>{current.location}</span>
				</LocationRow>
			)}

			{current.description && <Description>{current.description}</Description>}

			<CardFooter>
				<div className="bhk-role">
					<strong>BHK:</strong> {alumnus.position || 'Alumnus'}
				</div>

				{linkedIn && (
					<LinkedInButton
						href={linkedIn}
						target="_blank"
						rel="noreferrer"
						aria-label={`${alumnus.name} on LinkedIn`}
						title="LinkedIn"
					>
						<i className="pi pi-linkedin" aria-hidden="true" />
					</LinkedInButton>
				)}
			</CardFooter>
		</AlumniCardShell>
	);
};

const UnavailableAlumniCard = ({ alumnus }) => (
	<UnavailableCard>
		<img
			src={getImageUrl(alumnus)}
			alt={alumnus.name}
			onError={(event) => {
				event.currentTarget.onerror = null;
				event.currentTarget.src = DEFAULT_IMAGE;
			}}
		/>

		<div className="info">
			<h4>{alumnus.name}</h4>

			<p>{alumnus.position || 'BHK alumnus'}</p>
		</div>

		{getLinkedIn(alumnus) && (
			<LinkedInButton
				href={getLinkedIn(alumnus)}
				target="_blank"
				rel="noreferrer"
				aria-label={`${alumnus.name} on LinkedIn`}
				title="LinkedIn"
			>
				<i className="pi pi-linkedin" aria-hidden="true" />
			</LinkedInButton>
		)}
	</UnavailableCard>
);

function AlumniIndustryExplorer({ alumni = [] }) {
	const [selectedIndustry, setSelectedIndustry] = useState('all');

	const [selectedCountry, setSelectedCountry] = useState('all');

	const [searchTerm, setSearchTerm] = useState('');

	const [showUnavailable, setShowUnavailable] = useState(false);

	const { careerAlumni, unavailableAlumni } = useMemo(() => {
		const career = [];
		const unavailable = [];

		alumni.forEach((alumnus) => {
			if (hasCurrentCareerInfo(alumnus)) {
				career.push({
					...alumnus,
					industryGroup: getIndustryGroup(alumnus),
					country: getCountry(alumnus),
				});

				return;
			}

			unavailable.push(alumnus);
		});

		return {
			careerAlumni: career.sort(sortByName),
			unavailableAlumni: unavailable.sort(sortByName),
		};
	}, [alumni]);

	const industryCounts = useMemo(() => {
		const counts = {
			all: careerAlumni.length,
		};

		INDUSTRY_GROUPS.filter((group) => group.key !== 'all').forEach((group) => {
			counts[group.key] = careerAlumni.filter((alumnus) => alumnus.industryGroup === group.key).length;
		});

		return counts;
	}, [careerAlumni]);

	const industryOptions = useMemo(
		() =>
			INDUSTRY_GROUPS.filter((group) => group.key === 'all' || industryCounts[group.key] > 0).map((group) => ({
				...group,
				value: group.key,
				count: industryCounts[group.key] || 0,
			})),
		[industryCounts],
	);

	const industryFilteredAlumni = useMemo(
		() =>
			selectedIndustry === 'all'
				? careerAlumni
				: careerAlumni.filter((alumnus) => alumnus.industryGroup === selectedIndustry),
		[careerAlumni, selectedIndustry],
	);

	const countryOptions = useMemo(() => {
		const countries = Array.from(
			new Set(
				industryFilteredAlumni.map((alumnus) => alumnus.country).filter((country) => country && country !== 'Unknown'),
			),
		).sort((a, b) => a.localeCompare(b));

		return [
			{
				label: 'All Countries',
				value: 'all',
			},
			...countries.map((country) => ({
				label: country,
				value: country,
			})),
		];
	}, [industryFilteredAlumni]);

	useEffect(() => {
		setSelectedCountry('all');
	}, [selectedIndustry]);

	const filteredAlumni = useMemo(() => {
		const query = normalize(searchTerm);

		return industryFilteredAlumni
			.filter((alumnus) => {
				if (selectedCountry !== 'all' && alumnus.country !== selectedCountry) {
					return false;
				}

				if (!query) {
					return true;
				}

				const current = alumnus.currentPosition || {};

				const searchable = [
					alumnus.name,
					alumnus.position,
					current.title,
					current.company,
					current.industry,
					current.location,
					alumnus.country,
				]
					.filter(Boolean)
					.join(' ')
					.toLowerCase();

				return searchable.includes(query);
			})
			.sort(sortByName);
	}, [industryFilteredAlumni, searchTerm, selectedCountry]);

	const selectedGroup = getIndustryGroupDefinition(selectedIndustry);

	return (
		<Explorer>
			<Intro>
				<p>Explore where former BHK Lab members are working today by career sector and country.</p>
			</Intro>

			<IndustrySelectorWrap>
				<SelectButton
					value={selectedIndustry}
					onChange={(event) => setSelectedIndustry(event.value || 'all')}
					options={industryOptions}
					optionLabel="label"
					optionValue="value"
					allowEmpty={false}
					itemTemplate={(option) => (
						<IndustryButtonContent>
							<i className={option.icon} aria-hidden="true" />

							<span>{option.label}</span>

							<span className="count">{option.count}</span>
						</IndustryButtonContent>
					)}
				/>
			</IndustrySelectorWrap>

			<Toolbar>
				<SearchWrap>
					<SearchIcon className="pi pi-search" aria-hidden="true" />

					<InputText
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						placeholder={'Search name, company, role...'}
						aria-label="Search alumni"
					/>
				</SearchWrap>

				<CountryWrap>
					<Dropdown
						value={selectedCountry}
						onChange={(event) => setSelectedCountry(event.value)}
						options={countryOptions}
						optionLabel="label"
						optionValue="value"
						placeholder="All Countries"
						aria-label="Filter by country"
					/>
				</CountryWrap>
			</Toolbar>

			<ResultsHeader>
				<h3>{selectedGroup.fullLabel}</h3>

				<span>
					{filteredAlumni.length} {filteredAlumni.length === 1 ? 'alumnus' : 'alumni'}
				</span>
			</ResultsHeader>

			{filteredAlumni.length > 0 ? (
				<AlumniGrid>
					{filteredAlumni.map((alumnus) => (
						<AlumniCard key={alumnus?._id?.$oid || alumnus.name} alumnus={alumnus} />
					))}
				</AlumniGrid>
			) : (
				<EmptyState>
					<p>No alumni match the current filters.</p>
				</EmptyState>
			)}

			{unavailableAlumni.length > 0 && (
				<UnavailableSection>
					<UnavailableHeader>
						<div className="text">
							<h3>Career information unavailable</h3>

							<p>
								{unavailableAlumni.length} alumni do not currently have public current-career information in the
								dataset.
							</p>
						</div>

						<UnavailableButton
							type="button"
							onClick={() => setShowUnavailable((value) => !value)}
							aria-expanded={showUnavailable}
						>
							{showUnavailable ? 'Hide alumni' : `View ${unavailableAlumni.length} alumni`}
						</UnavailableButton>
					</UnavailableHeader>

					{showUnavailable && (
						<UnavailableGrid>
							{unavailableAlumni.map((alumnus) => (
								<UnavailableAlumniCard key={alumnus?._id?.$oid || alumnus.name} alumnus={alumnus} />
							))}
						</UnavailableGrid>
					)}
				</UnavailableSection>
			)}
		</Explorer>
	);
}

export default AlumniIndustryExplorer;
