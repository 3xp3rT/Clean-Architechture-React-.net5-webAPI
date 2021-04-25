import React, {  useEffect, useState } from 'react';
import axios from 'axios';
import {Container} from 'semantic-ui-react'; 
import { Activity } from '../models/activity';
import Navbar from './navbar';
import ActivityDeshboard from '../../features/activites/deshboard/ActivitesDeshboard';


function App() {
  const [activities,setactivities]= useState<Activity[]>([]);

  const[selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const[editMode,setEditMode] = useState(false);
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/Activites').then( response =>{
     
setactivities(response.data)
    })
  },[])

  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id))
  }
  function handleCencelSelectActivity(){
    setSelectedActivity(undefined)
  }
  function handleFormOpen(id?:string){
  id? handleSelectActivity(id):handleCencelSelectActivity();
  setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
  function handleCreateorEditActivity(activity:Activity){
    activity.id?setactivities([...activities.filter(x=>x.id !==activity.id),activity])
:setactivities([...activities,activity]);
setEditMode(false);
setSelectedActivity(activity);
  }
  return (
    <>
     <Navbar openForm={handleFormOpen}/>
       <Container style={{marginTop:'7em'}}>
      <ActivityDeshboard activites={activities}
      selectedActivity={selectedActivity}
      selectActivity={handleSelectActivity}
      cencelSelectActivity={handleCencelSelectActivity}
      editMode={editMode}
      openFrom={handleFormOpen}
      closeForm={handleFormClose}
      createOrEdit={handleCreateorEditActivity}
      />
       </Container>
      
      
    </>
  );
}

export default App;
