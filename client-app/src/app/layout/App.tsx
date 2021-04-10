import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import {Container, Header} from 'semantic-ui-react'; 
import { SemicolonPreference } from 'typescript';
import { Activity } from '../models/activity';
import Navbar from './navbar';
import ActivityDeshboard from '../../features/activites/deshboard/ActivitesDeshboard';


function App() {
  const [activities,setactivities]= useState<Activity[]>([])
  useEffect(()=>{
    axios.get<Activity[]>('http://localhost:5000/Activites').then( response =>{
     
setactivities(response.data)
    })
  },[])
  return (
    <>
     <Navbar/>
       <Container style={{marginTop:'7em'}}>
      <ActivityDeshboard activites={activities}/>
       </Container>
      
      
    </>
  );
}

export default App;
