import React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';

const StyledPIInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: left;
  height: 60px;
  line-spacing: 20px;
  margin-left: 5px;
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: normal;
  text-align: left;
`;

function MarginBar() {
	return <Box sx={{ height: 20 }} />;
}

export {
	StyledPIInfo,
	MarginBar,
};
