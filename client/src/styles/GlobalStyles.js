import { createGlobalStyle } from 'styled-components';
import colors from './colors';

const GlobalStyles = createGlobalStyle`
    /* *:focus {
      outline: none !important;
    } */

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ralway', 'Roboto', 'Open Sans', Arial, Helvetica, sans-serif;
    }

    body {
        // PrimeReact Component styles
        .p-component {
            font-size: 12px;
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
