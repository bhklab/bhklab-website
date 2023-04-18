import React, {useEffect, useState} from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "./../data/countries.json";
import collaborationData from "./../data/collaborations.json";
import styled from 'styled-components';
import "leaflet/dist/leaflet.css";
import { Dialog, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';
import colors from "../../../../styles/colors";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";

const StyledDialog = styled.div`
  .title {
    font-size: 14px;
  }
  .list {
    font-size: 11px;
  }
  .section {
    max-height: 25vh;
    overflow: scroll;
  }
`

// const scaleOpacity =(value, maxValue) =>{
//     const opacity = 0.2 + (value / maxValue) * 0.8;
//     return opacity;
// }
const scaleOpacity =(value, maxValue) =>{
    const opacity = 0.2 + (Math.log10(value + 1) / Math.log10(maxValue + 1)) * 0.8;
    return opacity;
}

const CollaborationMap = () => {
    const [selectedYear, setSelectedYear] = useState(null);
    const [countryData, setCountryData] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [maxCollaboration, setMaxCollaboration] = useState(1);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    useEffect(() => {
        // Get an array of all unique countries
        let uniqueCountries = Object.values(mapData.features).map((item) => item.properties.ADMIN);

        // Get the collaboration data for the selected year (or all years if none is selected)
        let selectedData = selectedYear
            ? { [selectedYear]: collaborationData[selectedYear] }
            : collaborationData;

        const countryCounts = {};
        uniqueCountries.forEach((country) => {
            // for a given country filter selected years
            const countryData = Object.values(selectedData).filter((data) =>
                Object.keys(data).includes(country)
            );
            const countryCollabList = [];

            countryData.forEach((item) => countryCollabList.push(item[country]));

            const mergedData = countryCollabList.reduce(
                (counts, item) => {
                    counts.count += item.count;
                    counts.affiliation = [...new Set([...counts.affiliation , ...item.affiliation])];
                    counts.pmid = [...new Set([...counts.pmid, ...item.pmid])];
                    return counts;
                },
                { count: 0, affiliation: "", pmid: "" }
            );
            countryCounts[country] = mergedData;
        });

        setMaxCollaboration(Math.max(...Object.values(countryCounts).map(item=> item.count)));
        setCountryData(countryCounts);
    }, [selectedYear]);


    const handleClick = (event) => {
        const countryName = event.target.feature.properties.ADMIN;
        setSelectedFeature(countryName);
    };

    const onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        // layer.bindPopup(countryName + ":" + (selectedYear ? selectedYear : "Overall") + " - "
        //     + (countryData[countryName] ? countryData[countryName].count : 0));

        layer.on({
            click: (event) => handleClick(event, country),
            mouseover: (event) => {
                // Update the popup content
                const popupContent = countryName;

                event.target.setPopupContent(popupContent);
                event.target.setStyle({
                    fillColor: colors.map_land_hover,
                });
                layer.unbindTooltip();
                if(!layer.isPopupOpen()) layer.bindTooltip(countryName).openTooltip();
            },

            mouseout: (event) => {
                event.target.setPopupContent("");
                event.target.setStyle({
                    fillColor: colors.map_land,
                });
            }

        })
    }

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>BHK Lab Collaborations</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <label>
                    Filter by year:
                    <select id="year-select" onChange={handleYearChange}>
                        <option value="">All years</option>
                        {Object.keys(collaborationData)
                            .sort((a, b) => b - a)
                            .map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                    </select>
                </label>
            </div>
            {countryData &&
            <MapContainer style={{ backgroundColor: colors.map_background, height: "80vh" }} zoom={2} center={[0, 0]}>
                <GeoJSON
                    data={mapData.features}
                    style={(feature) => ({
                        fillColor: colors.map_land,
                        color: colors.map_border,
                        weight: 2,
                        fillOpacity: scaleOpacity(countryData[feature.properties.ADMIN].count, maxCollaboration)
                    })}
                    onEachFeature={onEachCountry}
                />
                <Dialog
                    open={selectedFeature !== null}
                    onClose={() => setSelectedFeature(null)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{ fontSize:'14px', width: '100%', display: 'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        {`${selectedYear || "Cumulative collaborations"} - ${selectedFeature ? selectedFeature : ''}: 
                            ${ selectedFeature && countryData[selectedFeature] && countryData[selectedFeature].count} collaborators`}
                        <IconButton onClick={() => setSelectedFeature(null)}>
                            <CloseIcon/>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {selectedFeature && countryData[selectedFeature] ? (
                                <StyledDialog>
                                    {countryData[selectedFeature].affiliation && (
                                        <div className="title">
                                            Affiliations{" "}({countryData[selectedFeature].affiliation.length})
                                            <div className="section">
                                                {countryData[selectedFeature].affiliation.map((item, index) => (
                                                    <div className="list" key={index}>- {item}</div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {countryData[selectedFeature].pmid && (
                                        <div className="title">
                                            PMID{" "}({countryData[selectedFeature].pmid.length})
                                            <div className="section">
                                                {countryData[selectedFeature].pmid.map((item, index) => (
                                                    <div key={index}>
                                                        <a href={`https://www.ncbi.nlm.nih.gov/pubmed/${item}`} target="_blank" rel="noopener noreferrer">
                                                            {item}
                                                        </a>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </StyledDialog>
                            ) : (
                                <div>
                                    No data available for this country.
                                </div>
                            )}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </MapContainer>
            }
        </div>
    );
};

export default CollaborationMap;
