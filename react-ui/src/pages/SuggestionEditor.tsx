import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Pad, PadResponse, Suggestion} from "../interfaces";
import {Editor} from "@tinymce/tinymce-react";
import {editorConfig} from "../utils";
import ContributorComment from "../components/ContributorComment";
import {Button} from "@material-ui/core";
import {Editor as TinyMCEEditor} from "tinymce";

interface IParams {
    suggestionId: string
}

const SuggestionEditor: React.FC = () => {
    const history = useHistory();
    const {suggestionId} = useParams<IParams>();
    const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
    const [pad, setPad] = useState<Pad | null>(null);

    useEffect(() => {
        async function getPadData(idPad: string) {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/${idPad}`, {
                method: "GET",
                credentials: "include"
            });

            const padData = await res.json() as PadResponse;

            const {pad} = padData;

            setPad(pad);
        }

        async function getSuggestionData() {
            const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/suggestion/${suggestionId}`, {
                method: "GET",
                credentials: "include"
            });

            const suggestionData = await res.json() as Suggestion;

            setSuggestion(suggestionData);

            await getPadData(suggestionData.idPad);
        }

        getSuggestionData();
    }, []);

    const acceptSuggestion = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/suggestion/accept/${suggestion?.id}`, {
                body: JSON.stringify(suggestion),
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.error(e);
        }

        try {
            await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/pad/`, {
                body: JSON.stringify(pad),
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        } catch (e) {
            console.error(e);
        }
    }

    const rejectSuggestion = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/suggestion/reject/${suggestion?.id}`, {
                body: JSON.stringify(suggestion),
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            history.push("/sugestoes");
        } catch (e) {
            console.error(e);
        }
    }

    const handleEditorChange = (newContent: string, editor: TinyMCEEditor) => {
        const newRawContent = editor.getContent({format: "text"});
        // @ts-ignore
        setPad((prevState) => ({
            ...prevState,
            content: newContent,
            rawContent: newRawContent
        }));
    }

    const renderTitle = () => {
        let title = "Sem Título";
        if (pad) {
            title = pad.title ? pad.title : "";
        }

        return <div className="text-lg font-bold p-3 rounded-sm mr-5 w-11/12">{title}</div>
    }

    return (<div className="w-full p-3">
        {renderTitle()}
        {suggestion ?
            <ContributorComment comment={suggestion.comment} date={suggestion.created_at} user={suggestion.user}/> : ""}
        {pad && suggestion ?
            <div className="flex space-x-5">
                <div className="editor-original inline-block flex-1">
                    <div className="text-md font-bold p-3 rounded-sm mr-5">Original</div>
                    <Editor
                        value={pad.content}
                        {...editorConfig}
                        onEditorChange={handleEditorChange}
                        disabled={suggestion?.status !== "PENDING"}
                    />
                </div>
                <div className="editor-suggestion inline-block flex-1">
                    <div className="text-md font-bold p-3 rounded-sm mr-5">Sugestão</div>
                    <Editor
                        value={suggestion.content}
                        {...editorConfig}
                        disabled
                    />
                </div>
            </div> : ""}
        {suggestion?.status === "PENDING" ? (<div className="flex justify-end pt-4 space-x-7">
            <Button variant="contained" color="secondary" onClick={rejectSuggestion}>Rejeitar</Button>
            <Button variant="contained" color="primary" onClick={acceptSuggestion}>Aceitar e salvar</Button>
        </div>) : ""}

    </div>)
}

export default SuggestionEditor;