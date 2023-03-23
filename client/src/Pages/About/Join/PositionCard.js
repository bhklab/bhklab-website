import styled from "styled-components";
import { useState} from "react";
import { Markup } from 'interweave';
import colors from "../../../styles/colors";
import IconButton from "@mui/material/IconButton";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const StyledCard = styled.div`
  width: 60%;
  padding: 20px 30px 10px 30px;
  margin: 20px 10px;
  display: flex;
  flex: 1 1 24%;
  flex-direction: column;
  text-align: left;
  line-height: 25px;
  background-color: ${colors.card_bg};
  color: ${colors.card_text};
  border-color: ${colors.card_bg};
  border-radius: 5px;
  border-width: 1px;
  border-style: solid;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.3);

  .title {
    color: ${colors.card_text};
    font-size: 14px;
    font-weight: bold;
  }

  .subtitle {
    margin: 15px 0px 10px 0px;
    color: ${colors.card_text};
    font-size: 12px;
    font-weight: bold;
  }

  a {
    color: ${colors.header_deep_blue};
  }

  .icon {
    font-size : 14px;
    display: flex;
  }

  .divider {
    padding-top: 1px;
  }

  :hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.3);
  }
`;

const StyledContent = ({ title, content }) => (
    <>
        <div className="subtitle">{title}:</div>
        <Markup content={content} />
    </>
);

/**
 * A Component for showing information of each available position in the lab ( ex. PhD position, Undergrad student, ect.)
 * */
const StyledPosition = ({ position }) => {
    const {
        title,
        description,
        responsibilities,
        req_qualifications,
        pref_qualifications,
        apply,
    } = position;
    const [display, setDisplay] = useState(false);
    return (
        <StyledCard>
            <div className="title">{title}</div>
            <Markup content={description} />
            {display && (
                <>
                    {responsibilities && <StyledContent title="Responsibilities" content={responsibilities} />}
                    {req_qualifications && (<StyledContent title="Required qualifications" content={req_qualifications} />)}
                    {pref_qualifications && (<StyledContent title="Preferred qualifications" content={pref_qualifications} />)}
                    {apply && (<StyledContent title="How to apply" content={apply} />)}
                </>)
            }
            {
                ( responsibilities || req_qualifications || pref_qualifications || apply) &&
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => setDisplay(!display)} aria-label="show more">
                        {display? <ExpandLess/> : <ExpandMore/>}
                    </IconButton>
                </div>
            }
        </StyledCard>
    )
}

export default StyledPosition;
