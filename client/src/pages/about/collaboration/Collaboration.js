import React, { useEffect, useState } from 'react';
import collabs from './data/collabs.json';
import ChordDiagram from './ChordDiagram';
import collabs_bubble_data from './data/collabs_bubble_data.json';
import LabCollaborationsMap2D from './LabCollaborationsMap2D';
import BubbleMap from './CollabMap';

const Collaboration = () => {
    return (
        <div className="p-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h2 className="mb-4 text-xl font-semibold">Collaborations</h2>

                {/* Globe lives inside this div */}
                <div className="w-full">
                    <LabCollaborationsMap2D height={520} />
                </div>
            </div>
        </div>
    );
};

export default Collaboration;
