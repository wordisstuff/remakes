import Container from "../Container/Container";
import {Arr} from '../../constants/consts.js'
import { useSelector } from "react-redux";
import { selectSongs } from "../../redux/song/selectors.js";

const Cart = () => {
  const songs = useSelector(selectSongs)
console.log(songs)
    return (
    <Container>
     <ul>
     {Arr && Arr.map(({id})=>{
       return <li key={id}>{id}</li>
     })}
     </ul>
    </Container>)
    
            
};

export default Cart;