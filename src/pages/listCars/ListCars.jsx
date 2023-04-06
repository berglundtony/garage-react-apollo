import React , { useState, useRef } from 'react';
import { useQuery, useMutation, gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { useNavigate } from "react-router-dom";

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
      }`;

const TOGGLE_CARS = gql`
mutation deleteCar ($registryNumber: String!, $isCompleted: Boolean!) {
  update_cars(where: {registryNumber: {_eq: $registryNumber}}, _set: {is_completed: $isCompleted}) {
    affected_rows
    returning {
      registryNumber
      brand
      model
      yearModel
      color
    }
  }
}
`;
const DELETE_CAR = gql`
mutation DeleteCar($registryNumber:  String!) {
  deleteCar(registryNumber: $registryNumber) {
    registryNumber
    brand
    model
    yearModel
    color
  }
}`;


const client = new ApolloClient({
  uri: 'https://localhost:7154/graphql',
  cache: new InMemoryCache()
});

export default function DisplayCars(){
const [lists, setList] = useState([]);
const [deleteCar, {client}] = useMutation(DELETE_CAR);

const navigate = useNavigate();
const navigateToEditCar = (current) => 
{ navigate(`/EditCar`, {state:current});
};
 /*
const [deleteCar, { data: dataDelete, loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_CAR,
  {
    refetchQueries: [{  }],
    onCompleted: () => {
    },
  },
); */
/*
const [deleteCar] = useMutation(
  DELETE_CAR,
  {
    update(cache, { data: { delete_todo }  }) {
      const existingCars: cache.readQuery({ query: GET_CARS });
      const newTodos = existingTodos!.todos.filter((t:any) => (t.id !== delete_todo.id));
      cache.writeQuery({
        query: GET_MY_TODOS,
        data: {todos: newTodos}
      });
     }
  }
);
*/
/*
const removeCar = (current) => {
  deleteCar(
      {
        registryNumber: current.registryNumber
      }
  );
};*/
/*
const removeCar = (e,current) => {
  e.stopPropagation();
 deleteCar({
   variables: { registryNumber: current.registryNumber },
 });
};
*/
const {data, loading, error} =  useQuery(GET_CARS);
  React.useEffect(() => {
    if (data) {
      listCars(data);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>; 

  const carslist = data.cars.map((current, index) =>(
    <div key={index}>
    <h3>{current.brand}</h3>
    <li key={current.registryNumber}></li>
    <b>About this car:</b>
    <p>RegistryNumber: {current.registryNumber}</p>
    <p>Model: {current.model}</p>
    <p>Yearmodel: {current.yearModel}</p>
    <p>Color: {current.color}</p>
    <button className="btn btn-secondary" onClick={() => navigateToEditCar(current)}>Edit Car</button>
    &nbsp;
    <button className="btn btn-secondary" onClick={
      () =>
        {
          deleteCar({variables:
            {registryNumber: current.registryNumber}}).
              then(() => { window.location.reload();
          })
        } 
      }>Delete Car</button>
    </div>
  ))
    
  return(
    <div className='crud'>
    <div>
        {
          carslist
        }
    </div>
    </div>
  )
  
  function listCars(data){

    const list = data.cars.map(({registryNumber, brand, model, yearModel, color})=>
    ({
        registryNumber, brand, model, yearModel, color
    })
    
    );
    setList(list); 
    console.log(list);

    };


  function Edit(current, lists, setList){
      lists = Array.from(lists);
      console.log(lists);
  }

  function Delete(lists){
        lists = Array.from(lists);
        console.log(lists);
  }


      let input;

    return(
        <div	
              style={{	
                width: "100%",	
                display: "flex",	
                alignContent: "left",	
                justifyContent: "left",	
                padding: 5,	
              }}>	
      </div>
    )
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



