import { useState } from 'react';

import { LIKED_EVENTS_STORAGE_KEY } from '../utils/constans.js';

const checkIsEventLiked = (eventId) => {
    const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];
    return likedEvents.includes(eventId);
};

const useLikeEvents = (eventId) => {
    const [isEventLiked, setIsEventLiked] = useState(checkIsEventLiked(eventId));

    const toggleEventLike = () => {
        const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];
        const eventIndex = likedEvents.indexOf(eventId);
    
        if (eventIndex === -1) {
            // El evento no está en la lista, lo agregamos
            likedEvents.push(eventId);
            setIsEventLiked(true);
        } else {
            // El evento ya está en la lista, lo removemos
            likedEvents.splice(eventIndex, 1); // Cambia slice por splice
            setIsEventLiked(false);
        }
    
        localStorage.setItem(LIKED_EVENTS_STORAGE_KEY, JSON.stringify(likedEvents));
    };
    

    return{
        isEventLiked,
        toggleEventLike,
    };
};

export default useLikeEvents;