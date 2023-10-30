import React from 'react';

type VisaLabelProps = {
    visaType: string;
}

const VisaLabel: React.FC<VisaLabelProps> = ({ visaType }) => {
    const getLabelColor = (visa: string) => {
        switch (visa) {
            case 'I-765': return 'bg-blue-200';
            case 'O-1A': return 'bg-green-200';
            case 'E-3Transfer': return 'bg-yellow-200';
            case 'H-1B': return 'bg-pink-200';
            case 'L-1A': return 'bg-red-200';
            case 'EB-1A': return 'bg-purple-200';
            default: return 'bg-gray-200';
        }
    };

    return (
        <span className={`inline-block rounded-md px-3 py-1 text-sm font-semibold ${getLabelColor(visaType)} mr-2`}>
            {visaType}
        </span>
    );
};

export default VisaLabel;
