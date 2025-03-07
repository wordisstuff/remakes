import Container from '../Container/Container';
import List from '../List/List';
import CSS from './Home.module.css';

const Home = () => {
    return (
        <Container className={CSS.container}>
            <List />
        </Container>
    );
};

export default Home;
