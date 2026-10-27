import styled from 'styled-components';

export const Explorer = styled.section`
	width: 100%;
	padding: 0 0 32px;
	text-align: left;
`;

export const Intro = styled.div`
	max-width: 760px;
	margin: 0 auto 28px;
	text-align: center;

	p {
		margin: 0;
		color: #667085;
		font-size: 1rem;
		line-height: 1.6;
	}
`;

export const IndustrySelectorWrap = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: 24px;

	.p-selectbutton {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 8px;
	}

	.p-selectbutton .p-button {
		border: 1px solid #d0d5dd;
		border-radius: 999px !important;
		background: #ffffff;
		color: #344054;
		padding: 9px 14px;
		box-shadow: none;
		transition:
			border-color 0.16s ease,
			background 0.16s ease,
			color 0.16s ease,
			transform 0.16s ease;
	}

	.p-selectbutton .p-button:hover {
		border-color: #98a2b3;
		background: #f9fafb;
		color: #101828;
	}

	.p-selectbutton .p-button.p-highlight {
		border-color: #1d4ed8;
		background: #eff6ff;
		color: #1d4ed8;
	}

	.p-selectbutton .p-button:focus {
		box-shadow: 0 0 0 3px rgba(29, 78, 216, 0.12);
	}

	@media (max-width: 720px) {
		.p-selectbutton {
			width: 100%;
		}

		.p-selectbutton .p-button {
			flex: 1 1 calc(50% - 8px);
			justify-content: center;
		}
	}
`;

export const IndustryButtonContent = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 7px;
	white-space: nowrap;

	i {
		font-size: 0.85rem;
	}

	.count {
		min-width: 20px;
		padding: 1px 6px;
		border-radius: 999px;
		background: rgba(16, 24, 40, 0.07);
		font-size: 0.72rem;
		font-weight: 700;
		text-align: center;
	}
`;

export const Toolbar = styled.div`
	display: grid;
	grid-template-columns: minmax(220px, 1fr) minmax(190px, 260px);
	gap: 14px;
	align-items: center;
	margin-bottom: 24px;

	@media (max-width: 720px) {
		grid-template-columns: 1fr;
	}
`;

export const SearchWrap = styled.div`
	position: relative;

	.p-inputtext {
		width: 100%;
		min-height: 44px;
		padding-left: 42px;
		border-color: #d0d5dd;
		border-radius: 10px;
	}

	.p-inputtext:focus {
		border-color: #98a2b3;
		box-shadow: 0 0 0 3px rgba(16, 24, 40, 0.06);
	}
`;

export const SearchIcon = styled.i`
	position: absolute;
	top: 50%;
	left: 15px;
	z-index: 1;
	color: #667085;
	transform: translateY(-50%);
`;

export const CountryWrap = styled.div`
	.p-dropdown {
		width: 100%;
		min-height: 44px;
		border-color: #d0d5dd;
		border-radius: 10px;
	}

	/* Center the selected country text */
	.p-dropdown .p-dropdown-label {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 44px;
		padding-top: 0;
		padding-bottom: 0;
		padding-left: 3rem;
		text-align: center;
	}

	/* Keep dropdown arrow aligned on the right */
	.p-dropdown .p-dropdown-trigger {
		width: 3rem;
	}

	.p-dropdown:not(.p-disabled).p-focus {
		border-color: #98a2b3;
		box-shadow: 0 0 0 3px rgba(16, 24, 40, 0.06);
	}
`;

export const ResultsHeader = styled.div`
	display: flex;
	align-items: baseline;
	justify-content: space-between;
	gap: 16px;
	margin: 0 0 16px;

	h3 {
		margin: 0;
		color: #101828;
		font-size: 1.15rem;
		font-weight: 700;
	}

	span {
		color: #667085;
		font-size: 0.9rem;
	}
`;

export const AlumniGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
	gap: 16px;
`;

export const AlumniCardShell = styled.article`
	display: flex;
	min-height: 278px;
	flex-direction: column;
	padding: 18px;
	border: 1px solid #eaecf0;
	border-radius: 14px;
	background: #ffffff;
	box-shadow: 0 1px 2px rgba(16, 24, 40, 0.04);
	transition:
		transform 0.16s ease,
		box-shadow 0.16s ease,
		border-color 0.16s ease;

	&:hover {
		border-color: #d0d5dd;
		box-shadow: 0 8px 22px rgba(16, 24, 40, 0.08);
		transform: translateY(-2px);
	}
`;

export const CardTop = styled.div`
	display: grid;
	grid-template-columns: 72px 1fr;
	gap: 14px;
	align-items: start;
`;

export const Avatar = styled.img`
	width: 72px;
	height: 72px;
	border-radius: 14px;
	background: #f2f4f7;
	object-fit: cover;
`;

export const Person = styled.div`
	min-width: 0;

	h4 {
		margin: 1px 0 6px;
		color: #101828;
		font-size: 1rem;
		font-weight: 700;
		line-height: 1.3;
	}

	.current-title {
		margin: 0 0 3px;
		color: #344054;
		font-size: 0.9rem;
		font-weight: 600;
		line-height: 1.35;
	}

	.company {
		margin: 0;
		color: #667085;
		font-size: 0.86rem;
		line-height: 1.35;
	}
`;

export const IndustryRow = styled.div`
	margin-top: 16px;

	.p-tag {
		border-radius: 999px;
		background: #f2f4f7;
		color: #344054;
		font-size: 0.73rem;
		font-weight: 650;
	}

	.p-tag.industry-tag--health {
		background: #ecfdf3;
		color: #027a48;
	}

	.p-tag.industry-tag--technology {
		background: #eff8ff;
		color: #175cd3;
	}

	.p-tag.industry-tag--academia {
		background: #f4f3ff;
		color: #5925dc;
	}

	.p-tag.industry-tag--professional {
		background: #fff6ed;
		color: #b93815;
	}
`;

export const LocationRow = styled.div`
	display: flex;
	gap: 7px;
	align-items: flex-start;
	margin-top: 11px;
	color: #667085;
	font-size: 0.82rem;
	line-height: 1.4;

	i {
		margin-top: 2px;
		font-size: 0.78rem;
	}
`;

export const Description = styled.p`
	display: -webkit-box;
	overflow: hidden;
	margin: 12px 0 0;
	color: #667085;
	font-size: 0.82rem;
	line-height: 1.45;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
`;

export const CardFooter = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin-top: auto;
	padding-top: 16px;

	.bhk-role {
		color: #667085;
		font-size: 0.78rem;
		line-height: 1.35;
	}

	.bhk-role strong {
		color: #475467;
	}
`;

export const LinkedInButton = styled.a`
	display: inline-flex;
	width: 32px;
	height: 32px;
	flex: 0 0 32px;
	align-items: center;
	justify-content: center;
	border: 1px solid #d0d5dd;
	border-radius: 50%;
	color: #475467;
	text-decoration: none;
	transition:
		border-color 0.16s ease,
		background 0.16s ease,
		color 0.16s ease;

	&:hover {
		border-color: #98a2b3;
		background: #f9fafb;
		color: #101828;
	}

	i {
		font-size: 0.95rem;
	}
`;

export const EmptyState = styled.div`
	padding: 42px 20px;
	border: 1px dashed #d0d5dd;
	border-radius: 14px;
	color: #667085;
	text-align: center;

	p {
		margin: 0;
	}
`;

export const UnavailableSection = styled.section`
	margin-top: 38px;
	padding-top: 26px;
	border-top: 1px solid #eaecf0;
`;

export const UnavailableHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 18px;
	padding: 18px;
	border: 1px solid #eaecf0;
	border-radius: 12px;
	background: #f9fafb;

	.text {
		min-width: 0;
	}

	h3 {
		margin: 0 0 4px;
		color: #344054;
		font-size: 1rem;
	}

	p {
		margin: 0;
		color: #667085;
		font-size: 0.85rem;
		line-height: 1.45;
	}

	@media (max-width: 620px) {
		align-items: flex-start;
		flex-direction: column;
	}
`;

export const UnavailableButton = styled.button`
	flex: 0 0 auto;
	padding: 8px 12px;
	border: 1px solid #d0d5dd;
	border-radius: 8px;
	background: #ffffff;
	color: #344054;
	cursor: pointer;
	font: inherit;
	font-size: 0.82rem;
	font-weight: 600;

	&:hover {
		background: #f2f4f7;
	}
`;

export const UnavailableGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
	gap: 10px;
	margin-top: 14px;
`;

export const UnavailableCard = styled.article`
	display: flex;
	align-items: center;
	gap: 11px;
	padding: 12px;
	border: 1px solid #eaecf0;
	border-radius: 10px;
	background: #ffffff;

	img {
		width: 44px;
		height: 44px;
		flex: 0 0 44px;
		border-radius: 9px;
		background: #f2f4f7;
		object-fit: cover;
	}

	.info {
		min-width: 0;
		flex: 1;
	}

	h4 {
		overflow: hidden;
		margin: 0 0 3px;
		color: #344054;
		font-size: 0.88rem;
		font-weight: 650;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	p {
		overflow: hidden;
		margin: 0;
		color: #98a2b3;
		font-size: 0.76rem;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
`;
