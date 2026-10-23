// AlumniIndustryExplorer.jsx

import React, { useEffect, useMemo, useState } from 'react';
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { SelectButton } from 'primereact/selectbutton';
import { Tag } from 'primereact/tag';

import { getCountry, getIndustryGroup, getIndustryGroupDefinition, INDUSTRY_GROUPS } from './utils/industryGroups';

import {
	AlumniCardShell,
	AlumniGrid,
	Avatar,
	CardFooter,
	CardTop,
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
	Toolbar,
} from './styles/AlumniIndustryExplorerStyles';

const IMAGE_ROOT = 'https://storage.googleapis.com/caboodle-images/member-photos';

const getInitials = (name) =>
	String(name || '?')
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase())
		.join('');

const AlumniCard = ({ alumnus }) => {
	const [imageFailed, setImageFailed] = useState(false);

	const currentPosition = alumnus.currentPosition || {};

	const group = getIndustryGroupDefinition(alumnus.industryGroup);

	const linkedIn = alumnus.socials?.linkedIn || alumnus.socials?.linkedin;

	const location = currentPosition.location || '';

	const description = currentPosition.description || '';

	const imageUrl = alumnus.image ? `${IMAGE_ROOT}/${alumnus.image}` : null;

	return (
		<AlumniCardShell>
			<Card>
				<CardTop>
					<Avatar>
						{imageUrl && !imageFailed ? (
							<img src={imageUrl} alt={`${alumnus.name} profile`} onError={() => setImageFailed(true)} />
						) : (
							<span>{getInitials(alumnus.name)}</span>
						)}
					</Avatar>

					<Person>
						<h4>{alumnus.name}</h4>

						<p className="title">{currentPosition.title || 'Current role unavailable'}</p>

						{currentPosition.company && <p className="company">{currentPosition.company}</p>}
					</Person>
				</CardTop>

				<IndustryRow>
					<Tag
						value={group.shortLabel}
						icon={group.icon}
						style={{
							background: group.background,
							color: group.color,
						}}
					/>
				</IndustryRow>

				{location && (
					<LocationRow>
						<i className="pi pi-map-marker" aria-hidden="true" />

						<span>{location}</span>
					</LocationRow>
				)}

				{description && <Description title={description}>{description}</Description>}

				<CardFooter>
					<span className="bhk-role">
						<strong>BHK:</strong> {alumnus.position || 'Alumnus'}
					</span>

					{linkedIn && (
						<LinkedInButton
							href={linkedIn}
							target="_blank"
							rel="noreferrer"
							title={`Open ${alumnus.name}'s LinkedIn profile`}
							aria-label={`Open ${alumnus.name}'s LinkedIn profile`}
						>
							<i className="pi pi-linkedin" aria-hidden="true" />
						</LinkedInButton>
					)}
				</CardFooter>
			</Card>
		</AlumniCardShell>
	);
};

const AlumniIndustryExplorer = ({ alumni = [] }) => {
	const [selectedIndustry, setSelectedIndustry] = useState('all');

	const [selectedCountry, setSelectedCountry] = useState('all');

	const [query, setQuery] = useState('');

	const enrichedAlumni = useMemo(
		() =>
			alumni.map((alumnus) => ({
				...alumnus,

				industryGroup: getIndustryGroup(alumnus),

				country: getCountry(alumnus.currentPosition?.location),
			})),
		[alumni],
	);

	const industryCounts = useMemo(
		() =>
			enrichedAlumni.reduce(
				(accumulator, alumnus) => {
					accumulator.all += 1;

					accumulator[alumnus.industryGroup] = (accumulator[alumnus.industryGroup] || 0) + 1;

					return accumulator;
				},
				{
					all: 0,
				},
			),
		[enrichedAlumni],
	);

	const industryOptions = useMemo(
		() =>
			INDUSTRY_GROUPS.map((group) => ({
				...group,

				count: industryCounts[group.value] || 0,
			})),
		[industryCounts],
	);

	const countryOptions = useMemo(() => {
		const pool =
			selectedIndustry === 'all'
				? enrichedAlumni
				: enrichedAlumni.filter((alumnus) => alumnus.industryGroup === selectedIndustry);

		const countries = [...new Set(pool.map((alumnus) => alumnus.country))]
			.filter((country) => country !== 'Unknown')
			.sort((a, b) => a.localeCompare(b));

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
	}, [enrichedAlumni, selectedIndustry]);

	useEffect(() => {
		setSelectedCountry('all');
	}, [selectedIndustry]);

	const filteredAlumni = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();

		return enrichedAlumni
			.filter((alumnus) => {
				if (selectedIndustry !== 'all' && alumnus.industryGroup !== selectedIndustry) {
					return false;
				}

				if (selectedCountry !== 'all' && alumnus.country !== selectedCountry) {
					return false;
				}

				if (!normalizedQuery) {
					return true;
				}

				const currentPosition = alumnus.currentPosition || {};

				const searchableText = [
					alumnus.name,
					alumnus.position,

					currentPosition.title,
					currentPosition.company,
					currentPosition.industry,
					currentPosition.location,
				]
					.filter(Boolean)
					.join(' ')
					.toLowerCase();

				return searchableText.includes(normalizedQuery);
			})
			.sort((a, b) => String(a.name).localeCompare(String(b.name)));
	}, [enrichedAlumni, query, selectedCountry, selectedIndustry]);

	const activeGroup = getIndustryGroupDefinition(selectedIndustry);

	const activeLabel = selectedIndustry === 'all' ? 'All Alumni' : activeGroup.label;

	const industryButtonTemplate = (option) => (
		<IndustryButtonContent>
			<i className={option.icon} aria-hidden="true" />

			<span>{option.shortLabel}</span>

			<span className="count">{option.count}</span>
		</IndustryButtonContent>
	);

	return (
		<Explorer>
			<Intro>
				<h2>Alumni by Industry</h2>

				<p>Explore where former BHK Lab members are working today.</p>
			</Intro>

			<IndustrySelectorWrap>
				<SelectButton
					value={selectedIndustry}
					onChange={(event) => setSelectedIndustry(event.value || 'all')}
					options={industryOptions}
					optionLabel="shortLabel"
					optionValue="value"
					itemTemplate={industryButtonTemplate}
					allowEmpty={false}
				/>
			</IndustrySelectorWrap>

			<Toolbar>
				<span className="p-input-icon-left">
					<i className="pi pi-search" />

					<InputText
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						placeholder="Search by name, role, or company"
						aria-label="Search alumni"
					/>
				</span>

				<Dropdown
					value={selectedCountry}
					onChange={(event) => setSelectedCountry(event.value)}
					options={countryOptions}
					placeholder="All Countries"
					aria-label="Filter alumni by country"
				/>
			</Toolbar>

			<ResultsHeader>
				<div>
					<h3>{activeLabel}</h3>

					<p>Current role, employer, industry, and location when available.</p>
				</div>

				<strong>
					{filteredAlumni.length} {filteredAlumni.length === 1 ? 'alumnus' : 'alumni'}
				</strong>
			</ResultsHeader>

			<AlumniGrid>
				{filteredAlumni.map((alumnus) => (
					<AlumniCard key={alumnus._id?.$oid || alumnus._id || alumnus.name} alumnus={alumnus} />
				))}

				{filteredAlumni.length === 0 && <EmptyState>No alumni match the selected filters.</EmptyState>}
			</AlumniGrid>
		</Explorer>
	);
};

export default AlumniIndustryExplorer;
