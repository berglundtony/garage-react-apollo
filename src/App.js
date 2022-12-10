//import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { AddCar } from "./pages/addcar/AddCar";
import { ListCars } from "./pages/listCars/ListCars";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

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
