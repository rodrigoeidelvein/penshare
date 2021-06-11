import {useContext, useEffect, useState} from "react";
import AuthContext from "../../contexts/auth";
import {Suggestion} from "../../interfaces";
import SuggestionCard from "./SuggestionCard";

interface IProps {
    title: string,
    status: string,
}

const SuggestionsReceived: React.FC<IProps> = ({ title, status }) => {
    const {user} = useContext(AuthContext);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

    useEffect(() => {
        getUserReceivedSuggestions();
    }, []);

    const getUserReceivedSuggestions = async () => {
        const res = await fetch(`${process.env.REACT_APP_API_ENDPOINT}api/suggestion?user=${user.id}&status=${status}`, {
            method: "GET",
            credentials: "include"
        });

        const userSuggestions = await res.json() as Suggestion[];
        setSuggestions(userSuggestions);
    }

    const renderSuggestions = () => {
        return suggestions.map(suggestion => {
            return (
                <SuggestionCard key={suggestion.id} suggestion={suggestion} getUserSuggestions={getUserReceivedSuggestions} />
            )
        })
    }

    if (!suggestions.length) {
        return <></>;
    }

    return (
        <div className="p-3">
            <div className="my-5 font-bold text-lg w-full">
                <h1>{title}</h1>
                <div className="flex flex-wrap">
                    {renderSuggestions()}
                </div>
            </div>
        </div>
    )
}

export default SuggestionsReceived;