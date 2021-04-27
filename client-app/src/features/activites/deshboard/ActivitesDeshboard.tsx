import{Grid} from 'semantic-ui-react';
import React from 'react';

import { Activity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActivityFrom';
import ActivityList from './ActivityList';


interface Props{
    activites: Activity[];
    selectedActivity:Activity | undefined;
    selectActivity:(id:string)=>void;
    cancelSelectActivity:()=>void;
    editMode:boolean;
    openFrom:(id:string)=>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
    deleteActivity:(id:string)=>void;
    submitting:boolean;
}
export default function ActivityDeshboard({activites,selectActivity,
    selectedActivity,cancelSelectActivity,editMode,openFrom,closeForm,createOrEdit,deleteActivity,submitting}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activites={activites} submitting={submitting} selectActivity={selectActivity}
            deleteActivity={deleteActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode&&
            <ActivityDetails activity={selectedActivity} cancelSelectActivity={cancelSelectActivity}
            openFrom={openFrom}
            />}{
                editMode 
                && 
            <ActivityForm closeForm={closeForm} activity={selectedActivity} submitting={submitting} createOrEdit={createOrEdit} />

            }
            </Grid.Column>
        </Grid>
    )
}