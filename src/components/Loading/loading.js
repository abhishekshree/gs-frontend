import react from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loading() {
    return(
        <div class="flex justify-center items-center">
            <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <CircularProgress />
            </div>
        </div>
    )
}