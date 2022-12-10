import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "https://localhost:7154/graphql" // your graphql server link
    }),
    credentials: "same-origin",
  });

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
     <div key={registryNumber}>
      <h3>{brand}</h3>
      <b>About this car:</b>
      <p>RegistryNumber: {registryNumber}</p>
      <p>Model: {model}</p>
      <p>Yearmodel: {yearModel}</p>
      <p>Color: {color}</p>
      <br/>
     </div>
  ))
}

export function  ListCars() {
    return (
      <ApolloProvider client = {client}>
        <div className="content">
        <h1 className="heading">Cars</h1> 
        <DisplayCars />
        </div>
      </ApolloProvider>
    );
  } 
  
  //export default ListCars;
  require('dotenv').config()