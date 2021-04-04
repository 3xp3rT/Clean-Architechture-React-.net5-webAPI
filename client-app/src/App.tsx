import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ducks } from './demo';
import axios from 'axios';

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
      <header className="App-header">
       
       <ul>
         {activities.map((activity:any) => (
           <li key={activity.id}>
             {activity.title}
           </li>
         ))}
       </ul>
      </header>
    </div>
  );
}

export default App;
