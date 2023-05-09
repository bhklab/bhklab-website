import styled from 'styled-components';
import colors from './colors';

export const Container = styled.div`
  width: 100%;
  margin: 0px 20px;
  display: flex;
  text-align: justify;
  flex-direction: column;
`;

export const StyledCard = styled.div`

  display: flex;
  text-align: justify;
  flex-direction: row;

  img {
    max-height: 40vh;
    padding: 0px;
    position: sticky;
  }

  .subject {
    padding: 0px 15vw 10px 15vw;
    display: flex;
    align-items: center;
    height: 60px;
    font-size: 20px;
    font-weight: normal;
  }

  .subtitle {
    padding: 0px 15vw 10px 15vw;
    font-size: 16px;
    font-weight: bold;

    a {
      color: ${colors.navbarLink}
    }
  }


  .content {
    padding: 0px 15vw 30px 15vw;
    font-size: 15px;
    line-height: 25px;
    font-weight: normal;
  }

  img {
    padding-right: 0;
    object-fit: cover;
    width: 100%;
    height: auto;
  }

  :nth-child(odd) {
    background-color: white;
    color: black;
    align-content: flex-start;
    padding-right: 0;

  }

  :nth-child(even) {
    color: black;
    background-color: rgba(255, 255, 255, 0.45);
    align-content: flex-end;
    padding-right: 0;

  }
`;

export const StyledPage = styled.div`
  width: 100%;
  :nth-child(2) {
    background-color: white;
  }
  .subject {
    color: black;
    display: flex;
    align-items: center;
    height: 60px;
    font-size: 20px;
    font-weight: normal;
    margin-top: 30px;
  }
  .date{
    color: ${colors.light_gray};
    display: flex;
    align-items: center;
    height: 30px;
    font-size: 12px;
    font-weight: normal;
  }
  .content {
    font-size: 15px;
    line-height: 25px;
    font-weight: normal;
    width: 75%;
    color: ${colors.gray_text};
  }
  .divider {
    margin-bottom: 30px;
    padding-top: 10px;
  }
`;

export const StyledSection = styled.div`
  min-height: 280px;
  padding: 30px;
  
  h1 {
    font-size: 16px;
    font-weight: bold;
    //margin-bottom: 30px;
    color: #000000;
    text-align: center;
  }

  .container {
    width: 100%;
    margin: 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .box {
    background-color: white;
    flex-basis: 22%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    //align-items: center;
    text-align: center;
    padding: 10px 5px 10px 5px;
    margin: 10px 30px;
    min-height: 240px;
    border-radius: 5px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.3);
    line-height: 120%;

    .title {
      font-weight: bold;
      font-size: 14px;
      height: 40px;
      color: ${colors.header_deep_blue};
    }

    .description {
      height: 200px;
      
      ul {
        display: flex;
        flex-direction: column;
        justify-content: left;
        text-align: left;
      }
    }

    a {
      color: #2A2A2AFF;
      transition: 0.3s;
      font-weight: 400;
      cursor: pointer;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 10px 5px;
    }


    a:hover {
      transition: 0.3s;
    }

    & img {
      height: 45px;
      max-width: 60px;
      object-fit: scale-down;
    }

    & span {
      margin-top: 20px;
      font-size: 14px;
      font-weight: normal;
      color: #575757;
    }

    & a:hover {
      color: #d5d5d5;
    }
  }
`;
