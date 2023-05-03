import styled from 'styled-components';
import colors from './colors';

const StyledLogin = styled.div`
  label, input {
    display: block;
  }

  input {
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }

  form button {
    background: ${colors.lfBtm_color};
    border: 0;
    width: 80px;
    color: ${colors.lfBtm_text};
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
  }

  form.login {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 40px auto;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`;

export default StyledLogin;
