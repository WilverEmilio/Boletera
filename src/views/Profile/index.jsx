import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
const Profile = () => {
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const handleTabClick = (path) => {
        navigate(`/profile/${path}`);
    };
    return(
        <div>
            <Link to="/" className={styles.homeLink}>Inicio</Link>
            <div className={styles.tabsContainer}>
                <span 
                    className={`${pathname.includes('my-info') ? styles.active : ''} ${styles.tabs}`}
                    onClick={() => handleTabClick('my-info')}
                    style={{marginRight: '20px'}}
                    >
                        Mi información
                </span>
                <span 
                    className={`${pathname.includes('like-events') ? styles.active : ''} ${styles.tabs}`}
                    onClick={() => handleTabClick('like-events')}
                    >
                        Eventos Favoritos
                </span>
            </div>
            <Outlet />
        </div>
    );
};
export default Profile;