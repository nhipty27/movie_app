import axios from 'axios';
import './Trending.css';
import {useState, useEffect} from 'react'
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const REACT_APP_API_KEY = '1cc28d7cb8202fa7566afa90c4a8b9f4'

const Trending = () => {

    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    const fetchTrending = async () => {
        const {data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${REACT_APP_API_KEY}&page=${page}`)
        setContent(data.results)
    }

    useEffect(() => {
        fetchTrending()
    },[page])

    return (
        <div>
            <span className="pageTitle">Trending Today</span>
            <div className="trending">
                {
                    content && content.map((c) => 
                        <SingleContent 
                            key ={c.id} 
                            id = {c.id}
                            poster = {c.poster_path} 
                            title = {c.title || c.name }
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />)
                }
            </div>
            <CustomPagination 
                setPage = {setPage}
            />
        </div>
    )
}

export default Trending