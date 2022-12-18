import React , { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
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



export default function DisplayCars(){
  const { loading, error, data } = useQuery(GET_CARS);
  const [registrynumber, setId] = useState();

 /* const handleProceed = (e) => {
    registrynumber && navigate.push(generatePath("./pages/editcar/:registrynumber", { registrynumber }));
  }; */

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.cars.map(({ registryNumber, brand, model, yearModel, color}) =>(
     <div key={registryNumber}>
      <h3>{brand}</h3>
      <b>About this car:</b>
      <p>RegistryNumber: {registryNumber}</p>
      <p>Model: {model}</p>
      <p>Yearmodel: {yearModel}</p>
      <p>Color: {color}</p>
      <Link to={`/EditCar/${registryNumber}`}>Edit Car</Link>
     </div>
  ))
};



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



