import Layout from '../../../Components/Utils/Layout';
import React from 'react';
import equipments from './equipments.json';
import {Container, StyledPage, StyledCard} from '../../../styles/StyledPage';
import styled from 'styled-components';

// const Container = styled.div`
//   padding: 20px;
// `;


const Equipments= () => {
	return(
		<Layout>
			<Container>
				<StyledPage className="static">
					{
						equipments.length?
							equipments.map( (item, index)=> {
								return (
									<StyledCard key={index}>
										{
											// item.image? <img/> :
											<div>
												<div className="subject">{item.title}</div>
												{
													item.description? <div className="content">{item.description}</div>: ''
												}
												{
													item.items?
														item.items.map((equipment, ind) => {
															return (
																<React.Fragment key={ind}>
																	<div className="subtitle" >
																		<a href={equipment.link} target="_blank" rel="noreferrer">
																			{equipment.subject}
																		</a>
																	</div>
																	<div className="content">{equipment.text}</div>
																</React.Fragment>
															);
														}) : ''
												}
											</div>
										}
									</StyledCard>);
							}):''
					}
				</StyledPage>
			</Container>
		</Layout>
	);
};

export default Equipments;

//
// const Equipments = () => {
//     return (
//         <Layout>
//             <Container>
//                 <Title>High-Performance Computing</Title>
//                 <Paragraph>ComputeCanada offers 30 core-years and 20TB of storage on SciNet. Dr. Haibe-Kains recently invested in a local cluster, composed of 36 computer nodes (~600 Intel Xeon CPU cores with 16GB RAM each and 1PB of fast network storage), with exclusive access to 8 nodes and 50 TB of storage granted to the members of his laboratory.</Paragraph>
//                 <Paragraph>The lab is also a part of the HPC4Health initiative.</Paragraph>
//                 <Title>Lab Space</Title>
//                 <Paragraph>The lab space measures 677 square feet and is divided into 14 workstations following an open concept setting to enhance collaboration.</Paragraph>
//                 <Title>Security</Title>
//                 <Paragraph>The research tower has 24/7 security coverage.</Paragraph>
//             </Container>
//         </Layout>
//     );
// };
//
// export default Equipments;
