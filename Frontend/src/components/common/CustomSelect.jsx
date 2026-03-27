import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ label, value, options, onChange, placeholder = 'Tất cả', hideAllOption = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getOptionLabel = (opt) => (typeof opt === 'object' ? opt.label : opt);
    const getOptionValue = (opt) => (typeof opt === 'object' ? opt.value : opt);

    const selectedOption = options.find(opt => getOptionValue(opt) === value);
    const selectedLabel = selectedOption ? getOptionLabel(selectedOption) : placeholder;

    return (
        <div className="relative" ref={containerRef}>
            {label && (
                <span className="block text-xs font-semibold text-carbon-black-700 mb-1.5 ml-1">
                    {label}
                </span>
            )}
            
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between text-sm px-4 py-2.5 rounded-xl border transition-all duration-200 bg-white ${
                    isOpen 
                    ? 'border-brown-bark-500 ring-4 ring-golden-earth-50 shadow-sm' 
                    : 'border-carbon-black-100 hover:border-carbon-black-200'
                }`}
            >
                <span className={`${value ? 'text-carbon-black-900 font-medium' : 'text-carbon-black-400'}`}>
                    {selectedLabel}
                </span>
                <ChevronDown className={`w-4 h-4 text-carbon-black-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-2xl shadow-2xl border border-carbon-black-100 py-2 animate-in fade-in zoom-in duration-200 origin-top overflow-hidden">
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {!hideAllOption && (
                            <button
                                type="button"
                                onClick={() => {
                                    onChange('');
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                    !value ? 'bg-golden-earth-50 text-brown-bark-700 font-bold' : 'text-carbon-black-600 hover:bg-carbon-black-50 hover:text-carbon-black-900'
                                }`}
                            >
                                {placeholder}
                            </button>
                        )}
                        
                        {options.map((option) => {
                            const optValue = getOptionValue(option);
                            const optLabel = getOptionLabel(option);
                            return (
                                <button
                                    key={optValue}
                                    type="button"
                                    onClick={() => {
                                        onChange(optValue);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                                        value === optValue 
                                        ? 'bg-golden-earth-50 text-brown-bark-700 font-bold' 
                                        : 'text-carbon-black-600 hover:bg-carbon-black-50 hover:text-carbon-black-900'
                                    }`}
                                >
                                    {optLabel}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
