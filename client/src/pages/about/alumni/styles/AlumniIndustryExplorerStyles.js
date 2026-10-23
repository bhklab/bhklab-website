// AlumniIndustryExplorerStyles.js

import styled from "styled-components";

export const Explorer = styled.section`
	width: 100%;
	margin-top: 2rem;
`;

export const Intro = styled.div`
	margin-bottom: 1.5rem;

	h2 {
		margin: 0 0 0.4rem;
		font-size: clamp(1.6rem, 3vw, 2.2rem);
	}

	p {
		margin: 0;
		color: #64748b;
		line-height: 1.6;
	}
`;

export const IndustrySelectorWrap = styled.div`
	width: 100%;
	overflow-x: auto;
	padding: 0.15rem 0 0.6rem;
	margin-bottom: 1rem;

	.p-selectbutton {
		display: inline-flex;
		min-width: max-content;
		gap: 0.5rem;
	}

	.p-selectbutton .p-button {
		border: 1px solid #e2e8f0;
		border-radius: 999px !important;
		background: #ffffff;
		color: #334155;
		box-shadow: none;
		padding: 0.75rem 1rem;
	}

	.p-selectbutton .p-button:not(.p-highlight):hover {
		background: #f8fafc;
		border-color: #cbd5e1;
	}

	.p-selectbutton .p-button.p-highlight {
		background: #eff6ff;
		border-color: #2563eb;
		color: #1d4ed8;
	}

	.p-selectbutton .p-button:focus {
		box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
	}
`;

export const IndustryButtonContent = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	white-space: nowrap;
	font-weight: 600;

	.count {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 1.65rem;
		height: 1.65rem;
		padding: 0 0.4rem;
		border-radius: 999px;
		background: rgba(15, 23, 42, 0.07);
		font-size: 0.75rem;
		font-weight: 700;
	}
`;

export const Toolbar = styled.div`
	display: grid;
	grid-template-columns: minmax(0, 1fr) minmax(190px, 250px);
	gap: 0.8rem;
	align-items: center;
	margin: 1rem 0 1.5rem;

	.p-input-icon-left {
		width: 100%;
	}

	.p-inputtext,
	.p-dropdown {
		width: 100%;
	}

	@media (max-width: 700px) {
		grid-template-columns: 1fr;
	}
`;

export const ResultsHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 1rem;
	margin-bottom: 1rem;
	padding-bottom: 0.8rem;
	border-bottom: 1px solid #e2e8f0;

	h3 {
		margin: 0;
		font-size: 1.35rem;
	}

	p {
		margin: 0.25rem 0 0;
		color: #64748b;
	}

	strong {
		white-space: nowrap;
		color: #475569;
		font-size: 0.9rem;
	}

	@media (max-width: 600px) {
		align-items: flex-start;
		flex-direction: column;
	}
`;

export const AlumniGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
	gap: 1rem;
`;

export const AlumniCardShell = styled.article`
	min-width: 0;
	height: 100%;

	.p-card {
		height: 100%;
		border: 1px solid #e2e8f0;
		border-radius: 16px;
		box-shadow: none;
		overflow: hidden;
		background: #ffffff;
		transition:
			transform 160ms ease,
			border-color 160ms ease,
			box-shadow 160ms ease;
	}

	.p-card:hover {
		transform: translateY(-2px);
		border-color: #cbd5e1;
		box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
	}

	.p-card-body {
		height: 100%;
		padding: 1rem;
	}

	.p-card-content {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0;
	}
`;

export const CardTop = styled.div`
	display: flex;
	gap: 0.9rem;
	align-items: flex-start;
`;

export const Avatar = styled.div`
	width: 72px;
	height: 72px;
	border-radius: 14px;
	overflow: hidden;
	flex: 0 0 72px;
	background: #f1f5f9;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 1.05rem;
	font-weight: 700;
	color: #475569;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}
`;

export const Person = styled.div`
	min-width: 0;
	padding-top: 0.05rem;

	h4 {
		margin: 0 0 0.35rem;
		font-size: 1rem;
		line-height: 1.25;
		color: #0f172a;
	}

	.title,
	.company {
		margin: 0;
		line-height: 1.4;
	}

	.title {
		color: #334155;
		font-size: 0.9rem;
		font-weight: 600;
	}

	.company {
		margin-top: 0.1rem;
		color: #64748b;
		font-size: 0.85rem;
	}
`;

export const IndustryRow = styled.div`
	margin-top: 1rem;

	.p-tag {
		border-radius: 999px;
		font-size: 0.78rem;
		font-weight: 600;
		padding: 0.35rem 0.6rem;
	}
`;

export const LocationRow = styled.div`
	display: flex;
	align-items: flex-start;
	gap: 0.4rem;
	margin-top: 0.7rem;
	color: #64748b;
	font-size: 0.83rem;
	line-height: 1.45;

	i {
		margin-top: 0.12rem;
		font-size: 0.8rem;
		color: #94a3b8;
	}
`;

export const Description = styled.p`
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
	margin: 0.9rem 0 0;
	color: #64748b;
	font-size: 0.82rem;
	line-height: 1.5;
`;

export const CardFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 0.75rem;
	margin-top: auto;
	padding-top: 0.95rem;
	border-top: 1px solid #f1f5f9;

	.bhk-role {
		min-width: 0;
		color: #64748b;
		font-size: 0.78rem;
		line-height: 1.35;

		strong {
			color: #475569;
		}
	}
`;

export const LinkedInButton = styled.a`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex: 0 0 36px;
	width: 36px;
	height: 36px;
	border: 1px solid #dbeafe;
	border-radius: 50%;
	background: #eff6ff;
	color: #2563eb;
	text-decoration: none;
	transition:
		background 150ms ease,
		border-color 150ms ease,
		transform 150ms ease;

	&:hover {
		background: #dbeafe;
		border-color: #bfdbfe;
		transform: translateY(-1px);
	}

	&:focus-visible {
		outline: 2px solid #2563eb;
		outline-offset: 2px;
	}

	i {
		font-size: 1rem;
	}
`;

export const EmptyState = styled.div`
	grid-column: 1 / -1;
	padding: 2.5rem 1rem;
	text-align: center;
	color: #64748b;
	border: 1px dashed #cbd5e1;
	border-radius: 12px;
`;
