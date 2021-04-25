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
    cencelSelectActivity:()=>void;
    editMode:boolean;
    openFrom:(id:string)=>void;
    closeForm:()=>void;
    createOrEdit:(activity:Activity)=>void;
}
export default function ActivityDeshboard({activites,selectActivity,
    selectedActivity,cencelSelectActivity,editMode,openFrom,closeForm,createOrEdit}:Props){
    return(
        <Grid>
            <Grid.Column width='10'>
            <ActivityList activites={activites} selectActivity={selectActivity}/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !editMode&&
            <ActivityDetails activity={selectedActivity} cencelSelectActivity={cencelSelectActivity}
            openFrom={openFrom}
            />}{
                editMode 
                && 
            <ActivityForm closeForm={closeForm} activity={selectedActivity}  createOrEdit={createOrEdit} />

            }
            </Grid.Column>
        </Grid>
    )
}