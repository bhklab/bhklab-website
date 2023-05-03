import styled from 'styled-components';
import colors from './colors';

const StyledPaginate = styled.div`

  .paginationBttns {
    width: 80%;
    height: 20px;
    list-style: none;
    display: flex;
    justify-content: center;
    font-size: 12px;
  }

  .paginationBttns a {
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    color: ${colors.pagination};
    cursor: pointer;
  }

  .paginationBttns a:hover {
    color: white;
    background-color: ${colors.pagination};
  }

  .paginationActive a {
    border-radius: 7px;
    border: 2px solid ${colors.pagination};
    color: ${colors.pagination};
  }
;
}

.paginationDisabled a {
  visibility: hidden;
  background-color: white;
}
`;

export default StyledPaginate;
