import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@material-ui/core";
import AutoComplete, {AutocompleteRenderInputParams} from '@material-ui/lab/AutoComplete';
import {ReactNode, useState} from "react";
import {User} from '../../contexts/auth'

interface DialogProps {
    open: boolean,
    onClose: () => void
}

const response: User[] = [{
    id: '123',
    fullName: 'Rodrigo Fazenda',
    firstName: 'Rodrigo',
    email: 'rodrigoeidelvein@gmail.com',
    updatedAt: new Date().toString(),
    createdAt: new Date().toString(),
    photo: 'https://lh3.googleusercontent.com/a/AATXAJwEGQ_LJiNzWOYtRryiic5WSdxa32NO6nou5QWB=s96-c'
}]

const SharePadDialog: React.FC<DialogProps> = ({open, onClose}) => {
    const [textOpen, setTextOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const loading = open && options.length === 0;

    return (<Dialog open={open} onClose={onClose} aria-labelledby="Compartilhar documento com outros usuários">
        <DialogTitle id="form-dialog-title">Compartilhar documento com usuários</DialogTitle>
        <DialogContent>
            <AutoComplete
                id="async-search"
                style={{width: 300}}
                options={options}
                freeSolo
                renderInput={(params) => {
                    return (
                        <TextField
                            {...params}
                            variant="outlined"
                            label=""
                        />
                    )
                }}
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