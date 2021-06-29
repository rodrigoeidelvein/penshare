import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from "@material-ui/core";
import {Autocomplete, AutocompleteRenderInputParams} from "@material-ui/lab";
import {useEffect, useMemo, useState} from "react";
import {User} from "../../interfaces";
import throttle from "lodash.throttle";

interface DialogProps {
    open: boolean,
    onClose: () => void
}

const SharePadDialog: React.FC<DialogProps> = ({open, onClose}) => {
    const [options, setOptions] = useState<User[]>([]);
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [noOptionsText, setNoOptionsText] = useState("Digite para encontrar");
    const [contributors, setContributors] = useState<User[]>([]);

    const renderInput = (params: AutocompleteRenderInputParams) => {
        return <TextField {...params} label="Procure por e-mail" variant="outlined" fullWidth/>;
    }

    const handleOnChange = (event: any, newValue: any) => {
        console.log(event.target.value)
        setContributors(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        setContributors(newValue ? [newValue, ...contributors] : contributors);
    }

    const handleInputChange = (event: any, newInputValue: string) => {
        setInputValue(newInputValue);
    }

    const fetcher = useMemo(() =>
        throttle(async (request: string, callback: (results?: User[]) => void) => {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/user?email=${request}`, {
                method: "GET",
                credentials: "include"
            });

            const resInfo = await res.json();

            callback(resInfo);
        }, 300), [])

    useEffect(() => {
        if (inputValue === "") {
            setOptions([]);
            setNoOptionsText("Digite para encontrar");
            return undefined;
        }

        if (inputValue) {
            setNoOptionsText("Não encontramos nenhum usuário com esse e-mail");
        }

        if (inputValue.length >= 3) {
            fetcher(inputValue, (results?: User[]) => {
                let newOptions = [] as User[];

                if (value) {
                    newOptions = value;
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            })
        }

    }, [value, inputValue, fetcher])

    const handleOptionSelected = (option: User, value: User): boolean => {
        console.log(option, value)
        return true
    }

    const renderOption = (option: User) => {
        return (
            <Grid container alignItems="center">
                <Grid item>
                    <Avatar alt={option.fullName} src={option.photo} className="mr-3"/>
                </Grid>
                <Grid item xs>
                    <span>{option.fullName}</span>
                    <Typography variant="body2" color="textSecondary">
                        {option.email}
                    </Typography>
                </Grid>
            </Grid>
        )
    }

    return (<Dialog maxWidth="md" fullWidth open={open} onClose={onClose}
                    aria-labelledby="Compartilhar documento com outros usuários">
        <DialogTitle id="form-dialog-title">Compartilhar documento com usuários</DialogTitle>
        <DialogContent>
            <Autocomplete
                id="share-pad-email"
                getOptionLabel={option => option.email}
                filterOptions={x => x}
                multiple
                filterSelectedOptions
                autoComplete
                includeInputInList
                onInputChange={handleInputChange}
                value={value}
                onChange={handleOnChange}
                renderInput={renderInput}
                options={options}
                renderOption={renderOption}
                noOptionsText={noOptionsText}
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