import React from 'react';
import Layout from '../../../Components/Utils/Layout';
import equipments from './equipments.json';
import { Container, StyledPage, StyledCard } from '../../../styles/StyledPage';

function Equipments() {
	return (
		<Layout>
			<Container>
				<StyledPage>
					{
						equipments.length
							? equipments.map((item) => (
								<StyledCard key={item.title}>
									{
										// item.image? <img/> :
										<div>
											<div className="subject">{item.title}</div>
											{
												item.description ? <div className="content">{item.description}</div> : ''
											}
											{
												item.items?.map((equipment) => (
													<React.Fragment key={equipment.subject}>
														<div className="subtitle">
															<a href={equipment.link} target="_blank" rel="noreferrer">
																{equipment.subject}
															</a>
														</div>
														<div className="content">{equipment.text}</div>
													</React.Fragment>
												))
											}
										</div>
									}
								</StyledCard>
							)) : ''
					}
				</StyledPage>
			</Container>
		</Layout>
	);
}

export default Equipments;
