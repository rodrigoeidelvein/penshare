import {useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import {Editor as TinyMCEEditor} from "tinymce";

function TextEditor() {
    const [content, setContent] = useState("");

    const saveToDb = (content: string) => {
        console.log('DJDJSIDJSI', content)

    }


    const handleEditorChange = (content: string, editor: TinyMCEEditor): void => {
        setContent(content);
    }

    return (<div className="w-full p-10">
        <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            initialValue=""
            init={{
                height: 500,
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
        />
    </div>);
}

export default TextEditor;
