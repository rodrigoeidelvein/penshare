import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Snackbar,
    TextField
} from "@material-ui/core";
import {ChangeEvent, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane, faCheck} from "@fortawesome/free-solid-svg-icons";
import MuiAlert, {AlertProps, Color} from '@material-ui/lab/Alert';

interface DialogProps {
    open: boolean,
    onClose: () => void,
    content: string,
    rawContent: string
}

interface IParams {
    padId: string
}

const SharePadDialog: React.FC<DialogProps> = ({open, onClose, content, rawContent}) => {
    const history = useHistory();
    const [comment, setComment] = useState("");
    const {padId: idPad} = useParams() as IParams;
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState("Enviar");
    const [snackBarOpen, setSnackBarOpen]= useState(false);
    const [severity, setSeverity] = useState<Color>("success");
    const [alertMessage, setAlertMessage] = useState("Sugestão enviada com sucesso");

    const sendSuggestion = async () => {
        try {
            setButtonText("Enviando");
            setLoading(true);
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/suggestion/`, {
                body: JSON.stringify({idPad, rawContent, content, comment}),
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setButtonText("Enviado");
            setSnackBarOpen(true);
            setTimeout(() => {
                setLoading(false);
                history.push("/");
                setSnackBarOpen(false);
                onClose();
            }, 3000);
        } catch (e) {
            setButtonText("Enviar")
            setSeverity("error");
            setAlertMessage("Ocorreu um erro ao enviar sugestão");
            setSnackBarOpen(true);
            setLoading(false);
            console.error(e);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    const renderButtonIcon = () => {
        if (buttonText === "Enviado") {
            return <FontAwesomeIcon icon={faCheck} />;
        }

        return loading ? <CircularProgress size={24}/> : <FontAwesomeIcon icon={faPaperPlane}/>;
    }

    const handleClose = () => {
        setSnackBarOpen(false);
    }

    const Alert = (props: AlertProps) => {
        return <MuiAlert elevation={6} variant="filled" {...props} />
    }

    return (<Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth
                    aria-labelledby="Adicione um comentário para o autor">
        <DialogTitle id="form-dialog-title">Adicione um comentário para o autor</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="comment"
                label="Comentário"
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                onChange={handleChange}
            />
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={sendSuggestion} disabled={loading} color="primary" endIcon={renderButtonIcon()}>
                    {buttonText}
                </Button>
            </DialogActions>
            <Snackbar open={snackBarOpen} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{alertMessage}</Alert>
            </Snackbar>
        </DialogContent>
    </Dialog>)
}

export default SharePadDialog;