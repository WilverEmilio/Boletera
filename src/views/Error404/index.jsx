import styles from './Error404.module.css';
import { useRouteError } from 'react-router-dom';

const Error404 = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{error.status}Ops!</h1>
            <p className={styles.description}>{error.data}</p>
        </div>
    );
};
export default Error404;