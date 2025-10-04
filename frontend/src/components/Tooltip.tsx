import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TooltipProps {
    content: string;
    id: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, id }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative inline-block ml-2">
            <button
                type="button"
                onClick={() => setShow(!show)}
                className="text-blue-600 hover:text-blue-800 focus:outline-none transition-colors"
                aria-label={`Help: ${id}`}
            >
                <HelpCircle size={18} />
            </button>

            {show && (
                <>
                    {/* Backdrop to close tooltip when clicking outside */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShow(false)}
                    />

                    {/* Tooltip content */}
                    <div className="absolute z-20 w-64 p-3 bg-gray-900 text-white text-sm rounded-lg shadow-lg -top-2 left-8">
                        {content}
                        {/* Arrow pointing to icon */}
                        <div className="absolute w-2 h-2 bg-gray-900 transform rotate-45 -left-1 top-4" />
                    </div>
                </>
            )}
        </div>
    );
};

export default Tooltip;