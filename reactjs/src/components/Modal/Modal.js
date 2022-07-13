import PropTypes from 'prop-types';
import {Dialog} from "@mui/material";

function Modal ({ children, handleClose, show }) {
    return (
        <Dialog onClose={handleClose} open={show}>
            {children}
        </Dialog>
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};

export default Modal;