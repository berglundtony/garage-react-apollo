import React, { useState, useQuery } from "react";
import {gql, useMutation, } from '@apollo/client';

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

const CAR_ATTRIBUTES = gql`
  fragment CarInfo on CarType {
    registryNumber
    brand
    model
    yearModel
    color
  }
`;

const CREATE_CAR = gql`
  mutation addCar($car: CarInputType!) {
    createCar(car: $car) {
      ...CarInfo
    }
  }
  ${CAR_ATTRIBUTES}
`;

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
function AllCarsList(){
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return <p>Loading Cars..</p>
  
  if (error) return <p>Error loading Cars!</p>

  const results = [];

  return data.cars.map((car) =>(
    <AddCarForm
    key={car.registryNumber}
    car={{
      ...car
    }}
    />
  ));
}


export default function AddCarForm(){

 /* const updateCars = (cache, { data }) => {
    cache.modify({ 
      fields: {
        cars(exisitingCars = []) {
          const newCar = data.create;
          cache.writeCar({
            query: ALL_CARS,
            data: { newCar, ...exisitingCars }
          });
        }
      }
    })
  } */

  const[createCar,  { loading, called, error }] = useMutation(ADD_NEW_CAR,
    { update(cache, { data: { addCar}}){
      cache.modefy({
        fields:{
          cars(existingCars = []){
            const newCarRef = cache.writeFragment({
              data: addCar,
              fragment: gql`
              fragment NewCar on Car{
                registryNumber
                brand
                model
                yearModel
                color
              }
              `
            });
            return[...existingCars, newCarRef];
           /* cache.writeCar({
              query: ALL_CARS,
              data: { newCar, ...existingCars }
              }); */
            }
          }
        });
       
      }
    });


  const [registryNumber, setRegistryNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("")
  const [yearModel, setYearModel] = useState("")
  const [color, setColor] = useState("") 

  
  if (loading) return 'Submitting...';
  if(called) return <p>The car was submitted Successfully!</p>
  if (error) return `Submission error! ${error.message}`;

  return(
    <div	
    style={{	
      width: "100%",	
      display: "flex",	
      alignContent: "center",	
      justifyContent: "center",	
      padding: 10,	
    }}	
  >	
  <form onSubmit = {(e) => {
          e.preventDefault();
         createCar({
          variables: 
          {
            car: {
              registryNumber: registryNumber, 
              brand: brand,
              model: model,
              yearModel: parseInt(yearModel),
              color: color 
            }
          },
          update(cashe, result){

          },
       /*   onQueryUpdated(observableQuery){
            if(shouldRefetchQuery(observableQuery)){
              return observableQuery.refetch();
            }
          } */
      });
  }} 
   >
 <h3 className="h3 mb-3 font-weight-normal">Submit a Car!</h3>	
  <div className="mb-3" style={{ paddingBottom: 5 }}>	
    <label htmlFor="inputRegistryNumber">Registration number</label>
        <input
            id="inputRegistryNumber"	
            className="form-control"
            required	
            autoFocus	
            name="registryNumber"	
            value={registryNumber}
            onChange={(e) => setRegistryNumber(e.target.value) }
          />
    </div>
  <div className="mb-3" style={{ paddingBottom: 5 }}>	
  <label htmlFor="inputBrand">Brand</label>		
        <input	
          id="inputBrand"	
          className="form-control"
          required	
          value={brand}
          onChange={(e) => setBrand(e.target.value) }
        />	
  </div>
  <div className="mb-3" style={{ paddingBottom: 5 }}>	
  <label htmlFor="inputModel">Model</label>		
        <input	
          id="inputModel"	
          className="form-control"	
          required	
          name="model"
          value={model}	
          onChange={(e) => setModel(e.target.value) }
        />	
  </div>
  <div className="mb-3" style={{ paddingBottom: 5 }}>	
  <label htmlFor="inputYearModel">Yearmodel</label>		
      <input	
        id="inputYearModel"	
        className="form-control"
        required	
        name="yearmodel"
        value={yearModel}	
        onChange={(e) => setYearModel(e.target.value) }
      />	
  </div>
  <div className="mb-3" style={{ paddingBottom: 5 }}>	
  <label htmlFor="inputColor">Color</label>		
        <input	
          id="inputColor"	
          className="form-control"	
          required	
          name="color"
          value={color}	
          onChange={(e) => setColor(e.target.value)}	
        />	
  </div>
  <div style={{ justifyContent: "center", alignContent: "center" }}>
  <button type="submit" className="btn btn-primary">Submit</button>	
  </div>
  </form>
</div>
  );
}

export function AddCar() {
  return (
    <>
    <section className="banner">
      <div className="container">
      <div className="row"> 
      <AddCarForm />
      </div>
      </div>
    </section>
    </>
  );
} 

//require('dotenv').config()

