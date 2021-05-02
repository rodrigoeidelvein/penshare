import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

interface DialogProps {
    open: boolean,
    onClose: () => void
}

const SharePadDialog: React.FC<DialogProps> = ({open, onClose}) => {

    return (<Dialog open={open} onClose={onClose} aria-labelledby="Compartilhar documento com outros usuários">
        <DialogTitle id="form-dialog-title">Compartilhar documento com usuários</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Endereço de E-mail"
                type="email"
                fullWidth
            />
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>)
}

export default SharePadDialog;