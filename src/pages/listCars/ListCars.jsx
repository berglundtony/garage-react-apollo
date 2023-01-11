import React , { useState, useRef, useEffect } from 'react';
import { useQuery,useMutation, gql } from '@apollo/client';
import { Link, useNavigate, useParams } from "react-router-dom";
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { Routes, Route, browserHistory, BrowserRouter as Router } from "react-router-dom";

/*
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://localhost:7154/graphql" // your graphql server link
    }),
    credentials: "same-origin",
  }); */

const ADD_NEW_CAR = gql`
mutation createCar($car: CarInputType!){
  createCar(car: $car)
  {
    registryNumber
    brand
    model
    yearModel
    color
  }
}
`;

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

const UPDATE_CAR = gql`
mutation update($car: CarInputType!){
  updateCar(car: $car)
  {
    registryNumber
    brand
    model
    yearModel
    color
  }
}
`;

const client = new ApolloClient({
  uri: 'http://localhost:3000/',
  cache: new InMemoryCache()
});

export default function DisplayCars(){
 
  const [lists, setList] = useState([]);
  const [updateState, setUpdateState] = useState(-1);
  const [carState, setCarState] = useState([]);
  const [firstCar, setFirstCar] = useState([]);
  console.log(updateState);
  console.log(carState);

  const { loading, error, data } = useQuery(GET_CARS);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

 


/*const listItems = []; links.foreach(function (link){
listItems.push(<li>${link.registryNumber}</li>) })*/

function getAllCars() {
  return client
    .query({
      query: gql`${GET_CARS}`
    })
    .then(getData)
    .then(data => data.cars);
};



function getData(response){
  return response.data;
}

;
const data1 = getAllCars();
//listCars();
//setCarState(listCars(data));
console.log(data1);


const carslist = data.cars.map(({current,registryNumber,brand, model, yearModel, color, index}) =>(

  updateState === registryNumber? <Edit current={current} lists={pushCars({lists})} setList={() => setList(lists)}/>:

  <div key={registryNumber}>
  <h3>{brand}</h3>
  <li key={index}></li>
  <b>About this car:</b>
  <p>RegistryNumber: {registryNumber}</p>
  {console.log(lists)}
  <p>Model: {model}</p>
  <p>Yearmodel: {yearModel}</p>
  <p>Color: {color}</p>
  <Link to={`/EditCar/${registryNumber}`}>Edit Car</Link>
  <button className='edit' onClick={() => handleEdit(registryNumber)}  type='button'>Edit</button>
  </div>
  ))



  return(
    <div className='crud'>
    <div>
      <form onSubmit={handleUpdate}>
        {
          carslist
        }
      </form>
    </div>
    </div>
  )


  function pushCars(lists){
      const newCarList = [...carState, lists ]
     // setCarState = newCarList;
  }

  function listCars(data){
     data.cars.map(({registryNumber,brand, model, yearModel, color}) =>(
        {registryNumber,brand,model,yearModel,color}
        ))

    }

  function handleUpdate(e){
    e.preventDefault()
    setUpdateState(-1)
  }

  function handleEdit(registryNumber){
    setUpdateState(registryNumber);
    setCarState(registryNumber);
    console.log(registryNumber)
  }

  function Edit(current, lists, setList){

      function handleInput(e){
        const newList = lists.map(li => (
          li.registryNumber === current.registryNumber ? 
          {...li, [e.target.name] : e.target.value} : li
        ))
        setList(newList)
      }
    return(
      <ul>
        <li><input type='text' name='registryNumber' onChange={handleInput} value={lists.registryNumber} />{lists.registryNumber}</li>
        <li><input type='text' name='brand' onChange={handleInput} value={lists.brand} /></li>
        <li><input type='text' name='model' onChange={handleInput} value={lists.model} /></li>
        <li><input type='text' name='yearModel' onChange={handleInput} value={lists.yearModel} /></li>
        <li><input type='text' name='color' onChange={handleInput} value={lists.color} /></li>
        <li><button type='submit'>Update</button></li>
      </ul>
    )
  }
}


 export function ListCars() {
    return (
      <div className="ListCars">
        <div className="content">
        <h1 className="heading">Cars</h1> 
        <DisplayCars />
        </div>
      </div>
    );
  }

  require('dotenv').config()



