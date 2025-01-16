import {useState, useRef, useEffect} from 'react' 
import ReactPaginate from 'react-paginate';
import Navbar from '../../components/Navbar'
import Events from '../../components/Events'
import useEventsData from "../../hooks/useEventsData";
import styles from "../Home/Home.module.css"
import useEventsResults from '../../state/events-results';

const Home = () => {
  const {data ,loading,error, fetchevents} = useEventsResults();
  const events = data?._embedded?.events || []; 
  const page = data?.page || {}
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearchTerm] = useState(''); 
  const containerRef = useRef();

  useEffect(() => {
    fetchevents();
  },[fetchevents]);

  const handleNavbarSearch = (term) => {
    setSearchTerm(term)
    fetchevents(`keyword=${term}`);
  }

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected);
    fetchevents(`keyword=${search}&page=${selected}`);
  };

  const renderEvents = () => {
    if (loading){
      return (
        <div>Cargando resultados....</div>
      )
    }

    if (error){
      return (
        <div>Hubo un error al cargar los eventos</div>
      )
    }
    
    return(
      <div>
        <Events searchTerm={search} events={events}/>
        <ReactPaginate
          className={styles.pagination}
          nextClassName={styles.next}
          previousClassName={styles.previous}
          pageClassName={styles.page}
          activeClassName={styles.activePage}
          disabledClassName={styles.disabled}
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={page.totalPages}
          previousLabel="<"
          forcePage={currentPage}
          renderOnZeroPageCount={null}
      />

      </div>
    )
  };

  return (
  <>
    <Navbar onSearch={handleNavbarSearch} ref={containerRef}/>
    {renderEvents()}
  </>
  );
};
export default Home;