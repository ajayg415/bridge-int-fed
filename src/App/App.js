import React, { useState, useEffect } from 'react';
import './App.css';

import { filterAcadamies } from './../components/utils/utils'
import Cards from './../components/cards/cards'
import batteryJson from './../assets/battery.json'

function App() {
  const [academies, setAcademies] = useState([])

  useEffect(() => {
    const acad = filterAcadamies({ batteryJson: batteryJson})
    window.data = acad;
    console.log(acad)
    setAcademies(acad)
    //console.log(academies)
  },[])

  return (
    <div className="App container">
    <header className="App-header" tabIndex='0'>
      <h1>Bridge International Academies</h1>
    </header>
    <h2>Battery usage report Academy wise </h2>
    <div className='row'>
      {academies.length ?
        academies.map((aca, index) => {
          return <Cards cardData={aca} key={aca.academyId}/>
        })
      : 
        <div>Loading ...</div>
      }
    </div>
  </div>
  );
}

export default App;
