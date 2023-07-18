import { useNavigate } from '@remix-run/react';
import { useCallback } from 'react';

export function useGoBack() {
    const navigate = useNavigate();
    return useCallback(() => {
        navigate(-1);
    }, [navigate]);
}
