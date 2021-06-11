import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

interface DialogProps {
    open: boolean,
    onClose: () => void
}

const SharePadDialog: React.FC<DialogProps> = ({open, onClose}) => {
    return (<Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth aria-labelledby="Adicione um comentário para o autor">
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
            />
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancelar
                </Button>
                <Button onClick={onClose} color="primary">
                    Enviar
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>)
}

export default SharePadDialog;