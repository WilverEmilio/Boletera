import styles from './Eventitem.module.css'; //Una forma para poner estilos a un componente es importando un archivo css por medio de un modulo
// import './styles.css'; //Una forma para poner estilos a un componente es importando un archivo css
// import { Link } from 'react-router-dom';
import HearthFilled from '../../../../assets/hearth-filled.png';
import HearthUnfilled from '../../../../assets/hearth-unfilled.png';
import useLikeEvents from '../../../../hooks/useLikeEvents';

const EventItem = ({info, name, image, id ,onEventClick}) => {
    const {isEventLiked, toggleEventLike} = useLikeEvents(id);

    const handleSeeMoreClick = (event) => {
        event.stopPropagation();
        onEventClick(id);
    };

    const handleHeartClick = (event) => {
        toggleEventLike();
    };

    return(
        <div className={styles.eventItemContainer}>
            <div className={styles.ImageContainer}>
                <img src={isEventLiked ? HearthFilled : HearthUnfilled} alt="Hearth filled" width={20} height={20} className={styles.heartImage} onClick={handleHeartClick}/>
                <img src={image.url} alt={image.alt} width={200} height={200}/>
            </div>
            <div className={styles.eventItemInfo}>
                <h2 className={styles.eventName}>{name}</h2>
                <p className={styles.eventInfo}>{info}</p>
                <button onClick={handleSeeMoreClick} className={styles.seeMoreBtn}>
                    {/* <Link to={`/detail/${id}`}> */}
                        Ver más
                    {/* </Link> */}
                </button>
            </div>
        </div>
    );
};

export default EventItem;