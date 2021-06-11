import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@material-ui/core";
import {formatDate} from "../../utils";
import {Suggestion} from "../../interfaces";
import {useHistory} from "react-router-dom";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface IProps {
    suggestion: Suggestion,
    getUserSuggestions: () => void
}

const SuggestionCard: React.FC<IProps> = ({suggestion, getUserSuggestions}) => {
    const history = useHistory();

    const navigateToSuggestion = () => {
        history.push(`/sugestao/${suggestion.id}`);
    }

    const deleteSuggestion = async (event: any) => {
        event.stopPropagation();

        if (!window.confirm("Você tem certeza que quer deletar essa sugestão?")) {
            return;
        }

        try {
            await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/suggestion/${suggestion.id}`, {
                method: "DELETE",
                credentials: "include"
            });

            getUserSuggestions();
        } catch (e) {
            console.error(e);
            console.log('Erro ao excluir documento.');
        }
    }

    return (<div className="mt-2 mr-4 cursor-pointer" onClick={navigateToSuggestion}>
        <Card>
            <CardHeader
                avatar={
                    <Avatar aria-label="Foto do contribuidor" src={suggestion.user.photo}/>
                }
                title={suggestion.user.fullName}
                subheader={formatDate(suggestion.created_at)}
            />
            <CardContent>
                {suggestion.pad.title}
                <Typography variant="body2" color="textSecondary" component="p">
                    {suggestion.comment && suggestion.comment.substring(0, 50)}
                </Typography>
            </CardContent>
            <CardActions>
                <IconButton onClick={deleteSuggestion}>
                    <FontAwesomeIcon className="text-red-500" icon={faTrash}/>
                </IconButton>
            </CardActions>
        </Card>
    </div>)
}

export default SuggestionCard;