import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ducks } from './demo';
import axios from 'axios';
import {Header} from 'semantic-ui-react'; 
import { SemicolonPreference } from 'typescript';

function App() {
  const [activities,setactivities]= useState([])
  useEffect(()=>{
    axios.get('http://localhost:5000/Activites').then( response =>{
      console.log(response)
setactivities(response.data)
    })
  },[])
  return (
    <div className="App">
      <Header as='h2' icon='users' content='Reactivites'/>
       
       <ul>
         {activities.map((activity:any) => (
           <li key={activity.id}>
             {activity.title}
           </li>
         ))}
       </ul>
      
    </div>
  );
}

export default App;
