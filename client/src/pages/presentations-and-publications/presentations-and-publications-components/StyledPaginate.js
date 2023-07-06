import styled from 'styled-components';
import colors from '../../../styles/colors';

const StyledPaginate = styled.div`
  flex-grow: 1;
  height: 700px;
  
  .pagination-container {
    margin-top: 20px;
  }

  .paginationBttns {
    height: 20px;
    list-style: none;
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
  }

  .paginationBttns a {
    padding: 5px;
    margin: 7.5px;
    border-radius: 5px;
    color: ${colors.link_color};
    cursor: pointer;
  }

  .paginationBttns a:hover {
    color: ${colors.white_color};
    background-color: ${colors.link_color};
  }

  .paginationActive a {
    border-radius: 7px;
    border: 2px solid ${colors.link_color};
    color: ${colors.link_color};
  }

  .paginationDisabled a {
    visibility: hidden;
    background-color: ${colors.white_color};
  }
`;

export default StyledPaginate;
