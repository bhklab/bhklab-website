import React, { useEffect, useState } from 'react';
import collabs from './data/collabs.json';
import ChordDiagram from './ChordDiagram';
import collabs_bubble_data from './data/collabs_bubble_data.json';
import LabCollaborationsGlobe3D from './LabCollaborationsGlobe3D';
import BubbleMap from './CollabMap';

const Collaboration = () => {
    return <LabCollaborationsGlobe3D />;
};

export default Collaboration;
