import logo from './logo.svg';
import './App.css';
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CARS =
 gql`
      query GetCars{
          cars{
              registryNumber
              brand
              model
              yearModel
              color
          }
      }`
;

function DisplayCars(){
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.cars.map(( { registryNumber, brand, model, yearModel, color}) =>(
     <div className="container">
     <div key={registryNumber}>
      <h3>{brand}</h3>
      <b>About this car:</b>
      <p>Model: {model}</p>
      <p>Yearmodel: {yearModel}</p>
      <p>Color: {color}</p>
      <br/>
     </div>
     </div>
  ))
}
export default function App() {
  return (
    <div>
    <h2>My first Apollo app 🚀</h2>
    <DisplayCars />
  </div> 
    /*<div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>*/
  );
}
//export default App;
