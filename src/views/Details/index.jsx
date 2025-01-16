import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import styles from './Detail.module.css';
import { format } from "date-fns";
import {es} from "date-fns/locale/es";

import useEventsResults from '../../state/events-results';

const Detail = () => {
    const {data} = useEventsResults();
    const {eventId} = useParams();
    const [eventData, setEventData] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventData = async () => {
            try{
                const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${eventId}?apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`);
                const data = await response.json();

                setEventData(data);
                setLoading(false);
            }
            catch(error){
                setEventData({});
                setError(error);
                setLoading(false);
            }
        }
        fetchEventData();
    }, []);

    if (loading && Object.keys(eventData).length === 0) {
        return <div>Cargando Evento...</div>;
    }
    if (Object.error > 0) {
        return <div>Hubo un error al cargar el evento</div>;
    }
    console.log(eventData);

    return (
        <div className={styles.container}>
            <div className={styles.mainInfoContainer}>
                <img src={eventData.images?.[0].url} alt={eventData.name}  className={styles.eventImage}/>
                <h2 className={styles.eventName}>{eventData.name}</h2>
                <p className={styles.infoParagrapth}>{eventData.info}</p>
                {eventData.dates?.start.dateTime ? <p className={styles.dateParagraph}>{format(new Date(eventData.dates?.start.dateTime), "d LLLL yyyy H:mm", {locale: es})} hrs </p> : null}
            </div>
            <div className={styles.seatInfoContainer}>
                <h6 className={styles.seatMapTitle}>Mapa evento</h6>
                {
                eventData.seatmap?.staticUrl 
                    ? <img src={eventData.seatmap?.staticUrl} alt={eventData.name}  />
                    : <img src={eventData.images?.[7].url} alt={eventData.name}  />
                }
                <p className={styles.pleaseNote}>{eventData.pleaseNote}</p>
                <p className={styles.priceRangeLegend}>Rango de precios: {eventData.priceRanges?.[0].min}-{eventData.priceRanges?.[0].max}{eventData.priceRanges?.[0].currency} </p>
            </div>
            <a href={eventData.url}>
                Ir por tus boletos
            </a>
        </div>
    );
}; 

export default Detail;