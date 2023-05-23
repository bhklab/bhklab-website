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
        font-family: 'Roboto', 'Raleway', 'Open Sans', Arial, Helvetica, sans-serif;
    }

    body {
        // PrimeReact Component styles
        .p-component {
            font-size: 12px;
        }

        .p-dialog {
            .p-dialog-header {
                padding: 10px;
                .p-dialog-title {
                    font-size: 14px;
                }
                .p-dialog-header-icons .pi {
                    font-size: 14px;
                }
            }
            .p-dialog-content {
                padding: 0px 15px 15px 15px;
            }
        }
    }

    a {
      text-decoration: none;
      color: ${colors.link_color};
    }

    h1 {
        font-size: 2.2rem;
        color: ${colors.primary_text_color};
    }

    h2 {
        color: ${colors.primary_text_color};
        font-size: 1.6rem;
    }

    hr {
        border: none;
        width: 80%;
        color: ${colors.border_line_color};
        background-color: ${colors.border_line_color};
        height: 1px;
    }
`;

export default GlobalStyles;
