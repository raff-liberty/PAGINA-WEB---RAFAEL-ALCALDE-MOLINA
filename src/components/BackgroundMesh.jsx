import React from 'react';

const BackgroundMesh = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-full">
            <div className="absolute inset-0 bg-gradient-to-b from-background-dark via-transparent to-background-dark"></div>

            {/* Ambient light blobs for premium feel */}
            <div className="absolute -top-48 -left-48 w-[60rem] h-[60rem] bg-primary/10 blur-[200px] rounded-full"></div>
            <div className="absolute top-[20%] -right-48 w-[50rem] h-[50rem] bg-primary/5 blur-[180px] rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[100vh] bg-primary/[0.01] blur-[250px] rounded-full"></div>
        </div>
    );
};

export default BackgroundMesh;
