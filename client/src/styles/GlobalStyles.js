import { createGlobalStyle } from 'styled-components';
import "./fonts/br-cobane/Brink-BRCobaneRegular.otf";
import '../styles/App.css';
import colors from "./colors";

const GlobalStyles = createGlobalStyle`
    *:focus{
      outline: none !important;
    }
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
    }
    body {
        color: #666666;
        font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Fira Sans",Ubuntu,Oxygen,"Oxygen Sans",Cantarell,"Droid Sans","Apple Color Emoji","Segoe UI Emoji","Segoe UI Emoji","Segoe UI Symbol","Lucida Grande",Helvetica,Arial,sans-serif
        font-weight: 400;

        // PrimeReact Component styles
        .p-component {
            font-size: 12px;
            font-family: -apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Fira Sans",Ubuntu,Oxygen,"Oxygen Sans",Cantarell,"Droid Sans","Apple Color Emoji","Segoe UI Emoji","Segoe UI Emoji","Segoe UI Symbol","Lucida Grande",Helvetica,Arial,sans-serif
        }
        .p-dialog {
            .p-dialog-header{
                padding: 10px;
                .p-dialog-title{
                    font-size: 14px;
                }
                .p-dialog-header-icons .pi{
                    font-size: 14px;
                }
            }
            .p-dialog-content {
                padding: 0px 15px 15px 15px;
            }
        }
    }
    #root {
        width: 100%;
        height: 100%;
        min-height: 100vh;
    }
    h2, h3, h4, h5, h6 {
        padding: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    a {
      text-decoration: none;
      color: ${colors.header_deep_blue};
    }
`;

export default GlobalStyles;
