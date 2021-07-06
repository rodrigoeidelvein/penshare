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
    onClose: () => void,
    padId: string
}

const SharePadDialog: React.FC<DialogProps> = ({open, onClose, padId}) => {
    const [options, setOptions] = useState<User[]>([]);
    const [value, setValue] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [noOptionsText, setNoOptionsText] = useState("Digite para encontrar");
    const [contributors, setContributors] = useState<User[]>([]);

    const renderInput = (params: AutocompleteRenderInputParams) => {
        return <TextField {...params} label="Procure por e-mail" variant="outlined" fullWidth/>;
    }

    const addMember = async (member: User) => {
        await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${padId}/member/${member.id}`, {
            method: "PUT",
            credentials: "include"
        });
    }

    const removeMember = async (member: User) => {
        await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${padId}/member/${member.id}`, {
            method: "DELETE",
            credentials: "include"
        });
    }

    const handleOnChange = async (...params: any) => {
        const newValue = params[1];
        const selectionType = params[2];
        const optionSelected = params[3].option;

        setValue(newValue);
        setContributors(newValue ? [newValue, ...contributors] : contributors);

        if (selectionType === "select-option") {
            await addMember(optionSelected);
        } else {
            await removeMember(optionSelected);
        }
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
        const getMembers = async () => {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${padId}/member`, {
                method: "GET",
                credentials: "include"
            });

            const membersInfo = await res.json();

            setValue(membersInfo)
        }
        getMembers();
    }, [])

    useEffect(() => {
        if (inputValue === "") {
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
                disableClearable
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
                    Sair
                </Button>
            </DialogActions>
        </DialogContent>
    </Dialog>)
}

export default SharePadDialog;