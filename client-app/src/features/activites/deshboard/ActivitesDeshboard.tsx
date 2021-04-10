import{Grid, List} from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityFrom';
import ActivityList from './ActivityList';


interface Props{
    activites: Activity[];
}
export default function ActivityDeshboard({activites}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activites={activites}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {activites[0] &&
            <ActivityDetails activity={activites[0]}/>}
            <ActivityForm />
            </Grid.Column>
        </Grid>
    )
}