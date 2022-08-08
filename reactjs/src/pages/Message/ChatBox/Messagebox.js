function Messagebox({ message }) {
    return (
        <div>
            <div>
                <p>
                    <b>{message.nickname}</b>
                </p>
                <p>{message.text}</p>
            </div>
        </div>
    );
}

export default Messagebox;