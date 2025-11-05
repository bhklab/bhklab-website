import React, { useEffect, useState } from 'react';
import collabs from './data/collabs.json';
import ChordDiagram from './ChordDiagram';
import collabs_bubble_data from './data/collabs_bubble_data.json';
import BubbleMap from './CollabMap';

const Collaboration = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                paddingTop: '50px',
                overflow: 'visible'
            }}
        >
            <ChordDiagram data={collabs} />

            {/* <BubbleMap data={collabs_bubble_data} /> */}
        </div>
    );
};

export default Collaboration;
