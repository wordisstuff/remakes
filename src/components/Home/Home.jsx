import Container from "../Container/Container"; 
import { useDispatch, useSelector } from "react-redux";
import { selectSongs } from "../../redux/song/selectors.js";
import { useEffect } from "react";
import { getAllSongs } from "../../redux/song/operation.js";
import CSS from './Home.module.css'

const Home = () => {
  const songs = useSelector(selectSongs)
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(getAllSongs());
    }, [ dispatch]);
    console.log(songs)
    return (
    <Container>
     <ul className={CSS.homebox}>
     {songs && songs.map(({id,name,avatar})=>{
       return <li key={id}>
        <div className={CSS.home} onClick={() => console.log('123')}>
            <p>{name}</p>
            <img src={avatar} alt="Avatar" />
        </div>
       </li>
     })}
     </ul>
    </Container>)
    
            
};

export default Home;