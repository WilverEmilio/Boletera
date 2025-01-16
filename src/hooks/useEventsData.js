import {useState } from 'react';


//hook para hacerlo de manera local 
const useEventsData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchevents = async (params = '') => {
        setLoading(true);
        setError(null); // Restablece el error antes de hacer la solicitud
        try {
            // Asegura que `params` comience con "&" si no está vacío
            const queryParams = params ? `&${params}` : '';
            const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${queryParams}`
            );
            const result = await response.json();
            setData(result);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false); // Asegúrate de que loading se actualice al final
        }
    }; 

    return {
        events: data?._embedded?.events || [],
        page: data?.page || {},
        loading,
        error,
        fetchevents,
    };    
}

export default useEventsData;