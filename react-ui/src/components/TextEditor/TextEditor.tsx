import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {useParams} from "react-router-dom";
import debounce from "lodash.debounce";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {Authorizations, Pad, PadResponse} from "../../interfaces";
import {Editor as TinyMCEEditor} from "tinymce";
import './textEditor.css';
import {Button, Chip, LinearProgress, TextField} from "@material-ui/core";
import SuggestionCommentDialog from "../SuggestionCommentDialog";
import {editorConfig} from "../../utils";
import {Autocomplete} from "@material-ui/lab";

interface IParams {
    padId: string
}

const defaultAuthorization: Authorizations = {
    id: 'leitor',
    read: false,
    write: false,
    delete: false
}

function TextEditor() {
    const {padId} = useParams() as IParams;
    const [content, setContent] = useState("");
    const [initialContent, setInitialContent] = useState("");
    const [rawContent, setRawContent] = useState("");
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [title, setTitle] = useState("");
    const [pad, setPad] = useState({} as Pad);
    const [authorization, setAuthorization] = useState(defaultAuthorization as Authorizations);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(true);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [availableCategories, setAvailableCategories] = useState([{id: 1, name: "Desenvolvimento"}]);

    useEffect(() => {
        async function getPadInfo() {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${padId}`, {
                    method: "GET",
                    credentials: "include"
                });

                const padInfo = await res.json() as PadResponse;

                const {pad, isOwner} = padInfo;

                if (pad.content) {
                    setInitialContent(pad.content);
                    setContent(pad.content);
                }

                if (pad.title) {
                    setTitle(pad.title);
                } else {
                    setEditModeEnabled(true);
                }

                if (pad.rawContent) {
                    setRawContent(pad.rawContent);
                }

                setPad(pad);
                setIsOwner(isOwner);
            } catch (e) {
                console.error('Erro ao buscar informações sobre o pad');
            } finally {
                setLoading(false);
            }
        }

        getPadInfo();
    }, []);

    const saveToDb = useCallback(debounce(async (pad: Pad, newContent: string, newRawContent: string, newTitle: string) => {
        try {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/`, {
                body: JSON.stringify({...pad, content: newContent, rawContent: newRawContent, title: newTitle}),
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.error(e);
            console.error("Erro ao salvar conteúdo do Pad");
        } finally {
            setLoading(false);
        }
    }, 500), []);

    const handleEditorChange = (newContent: string, editor: TinyMCEEditor) => {
        const newRawContent = editor.getContent({format: "text"});
        setContent(newContent);
        setRawContent(newRawContent);

        if (!isFirstLoad && isOwner) {
            saveToDb(pad, newContent, newRawContent, title);
        }

        setIsFirstLoad(false);
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        if (isOwner) {
            saveToDb(pad, content, rawContent, newTitle);
        }
    }

    const handleEditClick = () => {
        setEditModeEnabled(!editModeEnabled);
    }

    const handleKeyPressInput = (e: KeyboardEvent) => {
        if (e.code === "Enter") {
            handleEditClick();
        }
    }

    const handleClose = () => {
        setDialogOpen(false);
    }

    const handleOpen = (event: any) => {
        event.preventDefault();
        if (initialContent === content) {
            return;
        }

        setDialogOpen(true);
    }

    const handleChangeCategories = (event: any, newValue: any) => {
        console.log(newValue)
        setCategories(newValue);
    }

    return (<div className="w-full p-10">
        <div>
            {!isOwner ?
                <Button onClick={handleOpen} className="float-right" variant="contained" color="primary">Enviar
                    sugestão</Button> : ""}
        </div>
        <input
            value={title}
            onChange={onChangeTitle}
            onBlur={handleEditClick}
            onKeyPress={handleKeyPressInput}
            disabled={!editModeEnabled}
            className="text-lg font-bold p-3 rounded-sm mb-3 mr-5 w-11/12"
        />
        <SuggestionCommentDialog open={dialogOpen} onClose={handleClose} content={content} rawContent={rawContent}/>
        {isOwner && <a role="button" title="Editar" onClick={handleEditClick}><FontAwesomeIcon icon={faPencilAlt}/></a>}
        <div>
            <Autocomplete
                className="w-1/4 py-3"
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Categorias" placeholder="Categorias" />
                )} options={availableCategories.map((category: any) => category.name)}
                id="id-categorias"
                multiple
                freeSolo
                value={categories}
                onChange={handleChangeCategories}
                filterSelectedOptions
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" color="primary" label={option} {...getTagProps({ index })} />
                    ))
                }

            />
        </div>
        <Editor
            {...editorConfig}
            initialValue={initialContent}
            onEditorChange={handleEditorChange}
            value={content}
        />
        {loading ? <LinearProgress/> : ""}
    </div>);
}

export default TextEditor;
