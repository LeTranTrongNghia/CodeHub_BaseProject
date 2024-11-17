import React from 'react';

const ChannelOverview = ({ title, description, onlineCount, imageUrl }) => {
    return (
        <div className="mb-4 relative">
            <div className="w-full h-60 overflow-hidden rounded-lg bg-muted">
                <img
                    src={imageUrl}
                    alt="Channel Overview"
                    className="m-auto w-full h-full object-cover"
                />
            </div>
            <div className="absolute bottom-4 left-4">
                <h2 className="text-3xl font-bold text-white">{title}</h2>
                <p className="text-muted-foreground text-white">{description}</p>
            </div>
            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2 py-1 rounded text-sm flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {onlineCount} Online Now
            </div>
        </div>
    );
};

export default ChannelOverview;
