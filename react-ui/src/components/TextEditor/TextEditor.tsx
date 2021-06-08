import {ChangeEvent, KeyboardEvent, useCallback, useEffect, useState} from "react";
import {Editor} from "@tinymce/tinymce-react";
import {useParams} from "react-router-dom";
import debounce from "lodash.debounce";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencilAlt} from "@fortawesome/free-solid-svg-icons";
import {Authorizations, Pad} from "../CardPad";
import {Editor as TinyMCEEditor} from "tinymce";
import './textEditor.css';
import {Button} from "@material-ui/core";
import SuggestionCommentDialog from "../SuggestionCommentDialog";

interface IParams {
    padId: string
}

interface PadResponse {
    pad: Pad,
    isOwner: boolean
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
    const [rawContent, setRawcontent] = useState("");
    const [editModeEnabled, setEditModeEnabled] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [title, setTitle] = useState("");
    const [pad, setPad] = useState({} as Pad);
    const [authorization, setAuthorization] = useState(defaultAuthorization as Authorizations);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isOwner, setIsOwner] = useState(true);

    useEffect(() => {
        async function getPadInfo() {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${padId}`, {
                    method: "GET",
                    credentials: "include"
                });

                const padInfo = await res.json() as PadResponse;

                const {pad, isOwner} = padInfo;

                if (pad.content) {
                    setInitialContent(pad.content);
                }

                if (pad.title) {
                    setTitle(pad.title);
                } else {
                    setEditModeEnabled(true);
                }

                if (pad.rawContent) {
                    setRawcontent(pad.rawContent);
                }

                setPad(pad);
                setIsOwner(isOwner);
            } catch (e) {
                console.error('Erro ao buscar informações sobre o pad');
            }
        }

        getPadInfo();
    }, []);

    const saveToDb = useCallback(debounce(async (pad: Pad, newContent: string, newRawContent: string, newTitle: string) => {
        try {
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
        }
    }, 500), []);

    const handleEditorChange = (newContent: string, editor: TinyMCEEditor) => {
        if (!isOwner) {
            return;
        }

        const newRawContent = editor.getContent({format: "text"});
        setContent(newContent);
        setRawcontent(newRawContent);

        if (!isFirstLoad) {
            saveToDb(pad, newContent, newRawContent, title);
        }

        setIsFirstLoad(false);
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        saveToDb(pad, content, rawContent, newTitle);
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

    const handleOpen = () => {
        setDialogOpen(true);
    }

    return (<div className="w-full p-10">
        <div>
            {!isOwner ?
                <Button onClick={handleOpen} className="float-right" variant="contained" color="primary">Enviar sugestão</Button> : ""}
        </div>
        <input
            value={title}
            onChange={onChangeTitle}
            onBlur={handleEditClick}
            onKeyPress={handleKeyPressInput}
            disabled={!editModeEnabled}
            className="text-lg font-bold p-3 rounded-sm mb-3 mr-5 w-11/12"
        />
        <SuggestionCommentDialog open={dialogOpen} onClose={handleClose}/>
        <a role="button" title="Editar" onClick={handleEditClick}><FontAwesomeIcon icon={faPencilAlt}/></a>
        <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            initialValue={initialContent}
            init={{
                language: "pt_BR",
                language_url: "/langs/pt_BR.js",
                height: "700",
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help'
                ],
                toolbar:
                    'undo redo | formatselect | bold italic underline backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat |'
            }}
            onEditorChange={handleEditorChange}
            value={content}
        />
    </div>);
}

export default TextEditor;
