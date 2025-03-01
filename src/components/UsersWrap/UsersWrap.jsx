import CSS from './UsersWrap.module.css';
const UsersWrap = ({ children }) => {
    return (
        <>
            <div
                data-aos="fade-up"
                data-aos-anchor="#example-anchor"
                data-aos-offset="360"
                data-aos-duration="360"
                className={`${CSS.welcome}`}
            >
                {/* <Logo className={`${logoClass}`} /> */}
                {children}
            </div>
        </>
    );
};

export default UsersWrap;
