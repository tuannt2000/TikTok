function Messagebox({ message }) {
    return (
        <div>
            <div>
                <p>
                    <b>{message.user}</b>
                </p>
                <p>{message.message}</p>
            </div>
        </div>
    );
}

export default Messagebox;