import React from 'react';

function LoadingMessage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="flex items-center space-x-4">
                <div className="animate-spin w-6 h-6 border-t-2 border-blue-500 rounded-full"></div>
                <div className="text-white">Loading...</div>
            </div>
        </div>
    );
}

export default LoadingMessage;
