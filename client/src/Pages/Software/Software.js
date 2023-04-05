import Layout from '../../Components/Utils/Layout';
import * as React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import "animate.css/animate.min.css";
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const StyledButton = styled.div`
  height : 60px;
  z-index: 999 !important;
  top: 48vh;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-content: center;
`

const StyledSoftware = styled.div`
  :root {
    --main-color: #02577b;
    --pkg-color:#1d90b3;
  }

  body {
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    min-height: 100%;
    /* overflow: hidden; */
    font-family: 'Raleway', sans-serif;
    margin:0px;
    color:var(--main-color);
    min-height:100%;
  }

  a {
    text-decoration:none;
    color:white
  }

  a:focus {
    outline: none;
  }
  h1 {
    font-weight:700;
    font-size:calc(0.6vw + 0.8em);
  }

  .slide-desc {
    display:flex;
    align-items: center;
    position:fixed;
    color: ${colors.blue_background};
    font-size:15px;
  }
  
  
  /* BODY */
  #intro {
    position:static;
    margin-top:11vh;
    margin-bottom:50px;
    text-align: center;
    line-height:50px;
  }

  .web-apps, .packages {
    display:flex;
    align-items:center;
    justify-content:space-between;
    flex-wrap: wrap;
    margin: 0 0px 20px 0px;
  }

  .highlight {
    color: #d19004;
  }

  #app {
    flex-grow: 1;
    flex: 1 1 30%;
    text-align:center;
    display:flex;
    flex-direction:column;
    align-items:center;
    position:relative;
    margin-bottom:20px;
    min-width:350px;
    /* max-width: 26.6vw; */
  }

  #app-container, #pkg-container {
    display:flex;
    align-items:center;
    flex-direction:column;
    position:relative;
    transition:linear 0.2s;
    a:hover{
      color: ${colors.blue_background};
    }
  }

  #pkg-container {
    flex-direction:row !important;
  }

  /*  WEB APPS */
  .logo {
    width: calc(3vw + 8em);
    opacity:1;
    transition:linear 0.2s;
  }

  .link {
    width:calc(2vw + 3em);
    padding: 10px 0px;
    background:var(--main-color);
    color:white;
    text-align:center;
    font-size:calc(1vw + 0.8em);
    position:absolute;
    top:25%;
    opacity:0;
    border-radius:15px;
    transition:linear 0.2s;
  }

  .bottom-row {
    top:12%;
  }

  #app-container:hover .link {
    opacity:1;
    transition:linear 0.2s;
  }

  #app-container:hover .logo {
    opacity:0;
    transition:linear 0.2s;
  }

  .desc {
    text-align:center;
    width:350px;
    font-size:1em;
    margin: 15px 0px 35px 0px;
  }

  /* PACKAGES */
  .packages {
    margin-top:3vw;
  }

  .pkg-title {
    background:var(--pkg-color);
    border-radius:15px;
    color:white;
    background-color: ${colors.blue_background};
    width:210px;
    padding:10px 0px;
    font-weight:700;
    font-size:calc(0.6vw + 0.8em);
    border: 1px solid var(--pkg-color);
    transition:linear 0.2s;
  }

  .pkg-title:hover {
    background:transparent;
    color:${colors.blue_background};
    transition:linear 0.2s;
  }

  .hovered {color:${colors.text_light_gray};}
  .pkg-title .hovered { display: none; transition:linear 0.2s;}
  .pkg-title:hover .hovered { display: block; transition:linear 0.2s;}
  .pkg-title:hover .initial { display: none; transition:linear 0.2s;}

  .pkg>.desc {
    margin-bottom:50px;
  }

  .lang {
    width:25px;
    float:right;
    margin-left:10px;
  }

  /* MOBILE RESPONSIVENESS */
  @media only screen and (max-width: 1311px) {
    body {
      /* margin-bottom:30px; */
    }
  }
  /* tablet */
  @media only screen and (max-width: 1311px) and (min-width: 873px) {
    .up {
      margin-top: -15px;
    }
  }

  /* mobile */
  @media only screen and (max-width: 550px) {
    /* body {
        background-image:url("./images/bg-mobile.png")
    } */
    .pkg-title {
      width:140px;
    }

    #app {
      min-width: 250px;
    }

    .desc {
      text-align:center;
      width:250px;
      font-size:0.9em;
      margin: 15px 0px 70px 0px;
    }

    .slide-desc {
      font-size:10px;
    }
  }
`

const BHKLabWebapps = () => {
    return (
        <StyledSoftware>
            <div id="intro">
                <h1>We're developing <span className="highlight">databases and web applications</span> to
                    empower the scientific community in their pharmacogenomic analysis of cancer model systems.
                </h1>
            </div>
            <div id="container" className="web-apps">
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/orcestra.png"/>
                        <a target="_blank" href="https://www.orcestra.ca/" className="link">Go! </a>
                    </div>

                    <div className="desc">
                        Orchestrate and reproduce pharmacogenomic data processing
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/dnf-logo.png"/>
                        <a target="_blank" href="http://drugnetworkfusion.ca/" className="link">Go! </a>
                    </div>
                    <div className="desc">
                        Explore multi-layer similarities between chemical compounds
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo up" src="images/software/toxicodb-logo.png"/>
                        <a target="_blank" href="https://www.toxicodb.ca/" className="link">Go! </a>
                    </div>
                    <div className="desc up">
                        Investigate the pathways triggered by exposure to toxic substances
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/xevadb-logo.png"/>
                        <a target="_blank" href="http://xevadb.ca/" className="link bottom-row">Go! </a>
                    </div>
                    <div className="desc">
                        Visualize and analyze xenographic pharmacogenomic data
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/pharmacodb-logo-web.png"/>
                        <a target="_blank" href="http://pharmacodb.ca/" className="link bottom-row">Go! </a>
                    </div>
                    <div className="desc">
                        Mine pharmacogenomic profiles of cancer cell lines treated with single agent
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/synergx-logo.png"/>
                        <a target="_blank" href="https://www.synergxdb.ca/" className="link bottom-row">Go! </a>
                    </div>
                    <div className="desc">
                        Explore synergistic drug combinations in cancer cell lines
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/cclid-logo.png"/>
                        <a target="_blank" href="https://cclid.ca/" className="link bottom-row">Go! </a>
                    </div>
                    <div className="desc">
                        Authenticate genotype and stability of cancer cell lines
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/quannotate-logo.png"/>
                        <a target="_blank" href="https://www.quannotate.com/" className="link bottom-row">Go! </a>
                    </div>
                    <div className="desc">
                        Check quality-assurance for radiotherapy target delineation
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/kulgap-logo.png"/>
                        <a target="_blank" href="https://www.kulgap.ca/" className="link bottom-row">Go! </a>
                    </div>
                    <div className="desc">
                        Quantify therapy response to drug treatment in xenografts
                    </div>
                </div>
                <div id="app">
                    <div id="app-container">
                        <img className="logo" src="images/software/predictio-logo.png"/>
                        <a target="_blank" href="https://predictio.ca/" className="link bottom-row">Go! </a>
                    </div>
                    <div className="desc">
                        Investigate predictive and prognostic values of genes. Predict patient response
                        to ICB therapy
                    </div>
                </div>
            </div>
            <div id="container" className="web-apps">
                <div id="app">
                    <div id="app-container">
                        <a target="_blank" href="http://github.com/bhklab">
                            <GitHubIcon sx={{color: 'black',  fontSize:'60px'}}/>
                        </a>
                    </div>
                    <div className="desc">
                        Checkout BHKLab Github
                    </div>
                </div>
            </div>
        </StyledSoftware>
    )
};

const BHKLabPackages = () => {
    return (
        <StyledSoftware>
            <div id="intro">
                <h1>We're developing <span className="highlight">software packages</span> to
                    empower the scientific community in their pharmacogenomic analysis of cancer model systems.
                </h1>
            </div>
            <div id="container" className="packages">
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://bioconductor.org/packages/release/bioc/html/CoreGx.html"
                           className="pkg-title">CoreGx</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        Core infrastructure which serve as the foundation for other Gx packages
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="http://www.bioconductor.org/packages/release/bioc/html/PharmacoGx.html"
                           className="pkg-title">PharmacoGx</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        Analysis of large-scale pharmacogenomic datasets
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://cran.r-project.org/web/packages/RadioGx/index.html"
                           className="pkg-title">RadioGx</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        Biomarker discovery for Radiation Treatment using in vitro models
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://bioconductor.org/packages/3.12/bioc/html/ToxicoGx.html"
                           className="pkg-title">ToxicoGx</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        Analysis of large-scale toxicogenomic datasets
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://cran.r-project.org/web/packages/CREAM/index.html"
                           className="pkg-title">CREAM</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        <b>C</b>lustering of <b>G</b>enomic <b>RE</b>gions <b>A</b>nalysis <b>M</b>ethod
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://cran.r-project.org/web/packages/mRMRe/index.html"
                           className="pkg-title">mRMRe</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        Parallelized <b>m</b>inimum <b>R</b>edundancy, <b>M</b>aximum <b>R</b>elevance <b>e</b>nsemble
                        feature selection
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://cran.r-project.org/web/packages/SIGN/index.html"
                           className="pkg-title">SIGN</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        <b>S</b>imilarity <b>I</b>dentification in <b>G</b>ene <b>E</b>xpression
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank" href="https://github.com/bhklab/RLOBICO"
                           className="pkg-title">RLOBICO</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        R implementation of <b>L</b>ogic <b>O</b>ptimization for <b>B</b>inary <b>I</b>nput
                        to
                        <b>C</b>ontinuous <b>O</b>utput
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="http://bioconductor.org/packages/release/bioc/html/Xeva.html"
                           className="pkg-title">Xeva</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        <b>XE</b>nograft <b>V</b>isualization and <b>A</b>nalysis
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://bioconductor.org/packages/devel/bioc/html/PDATK.html"
                           className="pkg-title">PDATK</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        <b>P</b>ancreatic <b>D</b>uctal <b>A</b>denocarcinoma <b>T</b>ool-<b>K</b>it
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://bioconductor.org/packages/release/bioc/html/genefu.html"
                           className="pkg-title">genefu</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        Computation of Gene Expression-Based Signatures in Breast Cancer
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank"
                           href="https://www.bioconductor.org/packages/release/bioc/html/survcomp.html"
                           className="pkg-title">survcomp</a>
                        <img className="lang" src="./images/software/R-logo.png" title="R package"/>
                    </div>
                    <div className="desc">
                        Assessment and Comparison for Performance of Risk Prediction (Survival) Models
                    </div>
                </div>

                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank" href="https://pypi.org/project/pymrmr/"
                           className="pkg-title">PymRMRe</a>
                        <img className="lang" src="./images/software/python-logo.png" title="Python package"/>
                    </div>
                    <div className="desc">
                        Parallelized <b>m</b>inimum <b>R</b>edundancy, <b>M</b>aximum <b>R</b>elevance <b>e</b>nsemble
                        feature selection
                    </div>
                </div>
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank" href="https://pypi.org/project/pykulgap/"
                           className="pkg-title">pyKuLGaP</a>
                        <img className="lang" src="./images/software/python-logo.png" title="Python package"/>
                    </div>
                    <div className="desc">
                        Modelling tumor growth curves using <b>Ku</b>llback-<b>L</b>eibler divergence
                        and <b>Ga</b>ussian
                        <b>p</b>rocesses
                    </div>
                </div>
                <div id="app" className="pkg">
                </div>
            </div>
            <div id="container" className="packages">
                <div id="app" className="pkg">
                    <div id="pkg-container">
                        <a target="_blank" href="http://github.com/bhklab">
                            <GitHubIcon sx={{color: 'black',  fontSize:'60px'}}/>
                        </a>
                    </div>
                    <div className="desc">
                        Checkout BHKLab Github
                    </div>
                </div>
            </div>
        </StyledSoftware>
    )
};

const Software= () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return(
        <Layout>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <StyledButton
                    style={{left: '10px', color:`${value ? colors.dark_gray : colors.light_gray}`}}
                    onClick={e=>handleChange(e,0)}
                >
                    Web Apps <br/>
                    <ArrowBackIosRoundedIcon
                        fontSize={'large'}
                        sx={{":hover" : {color: `${value && colors.darker_gray }`}, marginTop: '10px'}}
                    />
                </StyledButton>
                <Container>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}>
                            <BHKLabWebapps/>
                        </TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>
                            <BHKLabPackages/>
                        </TabPanel>
                    </SwipeableViews>
                </Container>
                <StyledButton
                    style={{right: '10px', color:`${!value ? colors.dark_gray : colors.light_gray}`}}
                    onClick={e=>handleChange(e,1)}
                >
                    Packages<br/>
                    <ArrowForwardIosRoundedIcon
                        fontSize={'large'}
                        sx={{":hover" : {color: `${!value && colors.darker_gray }`}, marginTop: '10px'}}
                    />
                </StyledButton>
            </div>
        </Layout>
    );
}

export default Software;
