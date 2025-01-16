import {create} from 'zustand';


//store para guardar de manera global 
const useEventsResults = create((set) => ({
    data: [],
    error: null,
    loading: false,

    fetchevents: async (params = '') => {
        try {
            set({loading: true}); // No necesitas `await` aquí
            const queryParams = params ? `&${params}` : '';
            const response = await fetch(
                `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}&countryCode=MX${queryParams}`
            );
            const result = await response.json();
            set({data: result, loading: false});
        } catch (error) {
            set({error: error.message, loading: false});
        }
    },
}));


export default useEventsResults;