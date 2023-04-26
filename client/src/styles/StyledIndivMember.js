import styled from 'styled-components';
import colors from './colors';


export const StyledMember = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${colors.white};
  border-radius: 10px;
  img {
    width: 300px;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
    overflow: hidden;
    background-color: ${colors.white};
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .LabMember-info {
    display: flex;
    flex-direction: column;
    //justify-content: flex-start;
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
