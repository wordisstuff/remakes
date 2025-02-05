import Container from "../Container/Container";
import {Arr} from '../../constants/consts.js'

const Cart = () => {
console.log(Arr)
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