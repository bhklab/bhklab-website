import styled from 'styled-components';
import React from 'react';
import colors from '../../../../styles/colors';
export const StyledMember = styled.div`
	display: flex;
	flex-direction: row;
	background-color: ${colors.white};
	border-radius: 10px;
	margin-top: 20px;
	img {
		width: 320px;
		height: 420px;
		object-fit: cover;
		border-radius: 10px;
		overflow: hidden;
		background-color: ${colors.white};
		box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
	}
	.LabMember-info {
		display: flex;
		flex-direction: column;
		color: black;
		line-height: 25px;
		padding: 0 10px;
		width: 90%;
		text-align: justify;
	}
	.LabMember-name {
		font-weight: bold;
		margin-bottom: 10px;
	}
	.LabMember-title {
		font-style: italic;
		color: #999;
		margin-bottom: 20px;
	}
` ;

const MemberCard = (props) => {
	return (
		<StyledMember>
			<img className='pi-photo' src={props.photo}/>
			<div className="LabMember-info">
				<div className='LabMember-name'>{props.name}</div>
				<div className='LabMember-title'>{props.title}</div>
				<div className='LabMember-info'>{props.bio}</div>
			</div>
		</StyledMember>
	);
};

export default MemberCard;
