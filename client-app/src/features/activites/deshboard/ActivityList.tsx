
import { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
interface Props{
    activites: Activity[];
    selectActivity:(id:string)=>void;
    deleteActivity :(id:string)=>void;
    submitting:boolean;
}


export default function ActivityList({activites,selectActivity,deleteActivity,submitting}:Props){

    const[target,settarget]= useState('');
function hanldeDeleteActivity(e:SyntheticEvent<HTMLButtonElement>,id:string){
settarget(e.currentTarget.name);
deleteActivity(id);
}



    return(
<Segment>
    <Item.Group divided>
{activites.map(activity => (
    <Item key={activity.id}>
<Item.Content>
    <Item.Header as='a'>
{activity.title}
    </Item.Header>
    <Item.Meta>
        {activity.date}
    </Item.Meta>
    <Item.Description>
        <div>
            {activity.description}
        </div>
        <div>
            {activity.city},{activity.venue}
        </div>
    </Item.Description>
    <Item.Extra>
        <Button 
        name={activity.id}
        onClick={()=>selectActivity(activity.id)} floated='right' content='View' color='blue'/>
        <Button
        name={activity.id}
        
        loading={submitting && target===activity.id} 
         onClick={(e)=>hanldeDeleteActivity(e,activity.id)}
          floated='right' content='Delete' color='red'/>

          <Label basic content={activity.category}/>
           
    </Item.Extra>
</Item.Content>
    </Item>
))}
    </Item.Group>
</Segment>
    )
}