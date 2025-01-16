import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LIKED_EVENTS_STORAGE_KEY } from "../../../../utils/constans.js";
import EventItem from "../../../../components/Events/components/Eventitem";

const LikeEvents = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                setLoading(true);
                const likedEvents = JSON.parse(localStorage.getItem(LIKED_EVENTS_STORAGE_KEY)) || [];

                const fetchPromises = likedEvents.map(eventID =>
                    fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventID}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`)
                        .then(response => response.json())
                );

                const results = await Promise.all(fetchPromises);
                setEvents(results);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, []);

    const handleEventItemClick = (eventId) => {
        navigate(`/detail/${eventId}`);
    };

    if (error) {
        return <div>Ha ocurrido un error: {error.message}</div>;
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            {events.map((event, index) => {
                const image = event.images?.[0] || { url: '', alt: 'Imagen no disponible' };
                const info = event.info || 'Sin información disponible';

                return (
                    <EventItem 
                        key={`liked-event-item-${event.id}-${index}`}
                        name={event.name || 'Evento sin nombre'}
                        info={info}
                        image={image}
                        onEventClick={handleEventItemClick}
                        id={event.id}
                    />
                );
            })}
        </div>
    );
};

export default LikeEvents;
