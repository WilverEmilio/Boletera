import EventItem from "./components/Eventitem";
import { useNavigate } from "react-router-dom";
import {memo} from "react";

const Events = ({searchTerm, events}) => {
    const navigate = useNavigate();

    const handleEventItemClick = (id) => {
        // console.log(`Evento com id ${id} es correcto`);
        navigate(`/detail/${id}`);
    };

    const renderEvents = () => {
        let filteredEvents = events;

        if (searchTerm.length > 0) {
            filteredEvents = filteredEvents.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }; 
        return (filteredEvents.map((eventItem) => (
            <EventItem 
                key={eventItem.id}
                name={eventItem.name}
                info={eventItem.info}
                image={eventItem.images[0]}
                onEventClick={handleEventItemClick}
                id={eventItem.id}
            />))
        );
    };

    return (
        <div>
            Eventos
            {renderEvents()}
        </div>
    );
}; 

export default memo(Events);