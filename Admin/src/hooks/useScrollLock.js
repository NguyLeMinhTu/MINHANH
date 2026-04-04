import { useEffect } from 'react';

/**
 * Hook to lock body scroll when a component is mounted (e.g. Modals)
 * @param {boolean} lock - Whether to lock the scroll
 */
const useScrollLock = (lock = true) => {
    useEffect(() => {
        if (!lock) return;

        // Save original overflow
        const originalStyle = window.getComputedStyle(document.body).overflow;
        
        // Prevent scrolling on mount
        document.body.style.overflow = 'hidden';
        
        // Re-enable scrolling on unmount
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [lock]);
};

export default useScrollLock;
