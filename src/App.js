//import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AddCar } from "./pages/addcar/AddCar";
import { ListCars } from "./pages/listCars/ListCars";
import { EditCar } from "./pages/editcar/EditCar";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { onError } from '@apollo/client/link/error'

const errorLink = onError(({graphqlErrors, networkError }) => {
  if(graphqlErrors){
    graphqlErrors.map(({message, location, path}) => {
       alert('graphql error ${message}')
    });
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://localhost:7154/graphql" // your graphql server link
  }),
  credentials: "same-origin",
});

function AppRouter(){
  return (
    <div id="wrapper">
      <Router>
        <Header />
          <Routes>
            <Route path="/AddCar" element={<AddCar/>}/>
            <Route path="/ListCars" element={<ListCars/>}/>
            <Route path="/EditCar/:registryNumber" element={<EditCar/>}/>
          </Routes>
        <Footer />
      </Router>
    </div>
  );
} 

function App() {
  return (
    <ApolloProvider client = {client}>
      <AppRouter />
    </ApolloProvider>
  );
} 

export default App;
require('dotenv').config()
