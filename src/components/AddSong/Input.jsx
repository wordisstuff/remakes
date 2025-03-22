const Input = ({
    name,
    setFunc,
    // songData,
    className,
}) => {
    return (
        <input
            className={className}
            type="text"
            name="name"
            id="name"
            placeholder={name}
            // value={name === ' ' ? `${songData}.${name}` : name}
            value={name}
            onChange={e => {
                setFunc(e.target.value);
            }}
        />
    );
};

export default Input;
