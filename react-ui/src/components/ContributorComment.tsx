import {User} from "../interfaces";
import {Avatar, Grid, Paper} from "@material-ui/core";
import {formatDate} from "../utils";

interface IProps {
    comment: string,
    date: string,
    user: User
}

const ContributorComment: React.FC<IProps> = ({comment, date, user}) => {
    return (<div>
        <Paper className="py-4 px-6">
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={user.fullName} src={user.photo} />
                </Grid>
                <Grid item xs zeroMinWidth>
                    <h4 className="m-0 text-left">{user.fullName}</h4>
                    <p className="text-left">
                        {comment}
                    </p>
                    <p className="text-left text-gray-500">{formatDate(date)}</p>
                </Grid>
            </Grid>
        </Paper>
    </div>)
}

export default ContributorComment;