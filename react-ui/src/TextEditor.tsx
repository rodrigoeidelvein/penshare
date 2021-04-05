import {useCallback, useState} from "react";
import {convertFromRaw, convertToRaw, Editor, EditorState, RichUtils} from "draft-js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBold, faItalic, faListUl, faListOl, faStrikethrough, faUnderline} from "@fortawesome/free-solid-svg-icons";
import debounce from "lodash.debounce";
import "draft-js/dist/Draft.css";
import './MyEditor.css';

function TextEditor() {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const saveToDb = (nextValue: any) => {
        console.log(JSON.stringify(nextValue))
    }

    const debouncedSave = useCallback(
        debounce(nextValue => saveToDb(nextValue), 2000), []
    )

    const handleEditorState = (editorState: EditorState) => {
        setEditorState(editorState);
        const contentState = editorState.getCurrentContent();
        console.log(editorState.getSelection())
        debouncedSave(convertToRaw(contentState));
        // console.log(convertFromRaw(convertToRaw(contentState)))
    }

    const handleKeyCommand = (command: string, editorState: EditorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            setEditorState(newState);
            return 'handled';
        }

        return 'not-handled';
    }

    const handleInlineStyle = useCallback((type: string): void => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, type));
    }, [editorState]);

    const handleBlockStyle = useCallback((type: string): void => {
        setEditorState(RichUtils.toggleBlockType(editorState, type))
    }, [editorState]);


    return (<div className="w-full p-10">
        <div className="mb-3 w-5/12 flex space-x-4">
            <button onClick={() => handleInlineStyle("BOLD")}><FontAwesomeIcon icon={faBold}/></button>
            <button onClick={() => handleInlineStyle("ITALIC")}><FontAwesomeIcon icon={faItalic}/></button>
            <button onClick={() => handleInlineStyle("UNDERLINE")}><FontAwesomeIcon icon={faUnderline}/></button>
            <button onClick={() => handleInlineStyle("STRIKETHROUGH")}><FontAwesomeIcon icon={faStrikethrough}/></button>
            <button onClick={() => handleBlockStyle("unordered-list-item")}><FontAwesomeIcon icon={faListUl}/></button>
            <button onClick={() => handleBlockStyle("ordered-list-item")}><FontAwesomeIcon icon={faListOl}/></button>
        </div>

        <Editor
            editorState={editorState}
            onChange={handleEditorState}
            handleKeyCommand={handleKeyCommand}
            onTab={() => handleBlockStyle("unordered-list-item")}
        />
    </div>);
}

export default TextEditor;
