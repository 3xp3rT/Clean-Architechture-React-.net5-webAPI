import React, {  useEffect, useState } from 'react';
import {Container} from 'semantic-ui-react'; 
import { Activity } from '../models/activity';
import Navbar from './navbar';
import ActivityDeshboard from '../../features/activites/deshboard/ActivitesDeshboard';
import{v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './Loadingcomponet';

function App() {
  const [activities,setactivities]= useState<Activity[]>([]);

  const[selectedActivity,setSelectedActivity]=useState<Activity|undefined>(undefined);
  const[editMode,setEditMode] = useState(false);
  const [loading,setLoading]= useState(true);
  const[submitting,setsubmitting]=useState(false);
  useEffect(()=>{
    agent.Activites.list().then( response =>{
     let activites:Activity[] = [];
     response.forEach(x=>{
       x.date = x.date.split('T')[0]

activites.push(x)
      
     })
     setactivities(activites);
     setLoading(false);
    })
  },[])

  function handleSelectActivity(id:string){
    setSelectedActivity(activities.find(x=>x.id===id))
  }
  function handlecancelSelectActivity(){
    setSelectedActivity(undefined)
  }
  function handleFormOpen(id?:string){
  id? handleSelectActivity(id):handlecancelSelectActivity();
  setEditMode(true);
  }
  function handleFormClose(){
    setEditMode(false);
  }
  function handleCreateorEditActivity(activity:Activity){
    setsubmitting(true);
    if(activity.id){
      agent.Activites.update(activity).then( ()=>{
        setactivities([...activities.filter(x=>x.id !==activity.id),activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setsubmitting(false);
      }
      )
    }
    else{
      activity.id=uuid();
      agent.Activites.create(activity).then(()=>{
        setactivities([...activities,{...activity,id:uuid()}])
        setSelectedActivity(activity);
        setEditMode(false);
        setsubmitting(false);
      })
    }
  }

  function handleDeleteActivity(id:string){
    setsubmitting(true);
    agent.Activites.delete(id).then(()=>{
    
      setactivities([...activities.filter(x=>x.id!==id)])
setsubmitting(false);
    })
  }

  if(loading) return <LoadingComponent content='Loading...' />


  return (
    <>
     <Navbar openForm={handleFormOpen}/>
       <Container style={{marginTop:'7em'}}>
      <ActivityDeshboard activites={activities}
      selectedActivity={selectedActivity}
      selectActivity={handleSelectActivity}
      cancelSelectActivity={handlecancelSelectActivity}
      editMode={editMode}
      openFrom={handleFormOpen}
      closeForm={handleFormClose}
      createOrEdit={handleCreateorEditActivity}
      deleteActivity={handleDeleteActivity}
      submitting={submitting}
      />
       </Container>
      
      
    </>
  );
}

export default App;
