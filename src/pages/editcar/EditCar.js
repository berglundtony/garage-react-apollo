import React, {useEffect, useState, useRef, useForm} from "react";
//import { Mutation, Query } from 'react-apollo';
import { gql, useQuery, useMutation, } from '@apollo/client';
import { useParams, useNavigate, browserHistory, redirect } from "react-router-dom";
//import { CarForm } from "../../CarForm";

const CAR_ATTRIBUTES = gql`
  fragment CarInfo on CarType {
    registryNumber
    brand
    model
    yearModel
    color
  }
`;


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

export default function EditCarForm(){

  const { loading, error, data } = useQuery(GET_CARS);
  const [updateCar] = useMutation(UPDATE_CAR);
/*
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>; */

  const [registryNumber, setRegistryNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("")
  const [yearModel, setYearModel] = useState("")
  const [color, setColor] = useState("") 
  const {registryNumberValue} = useParams();

  useEffect(function persistForm() {
    localStorage.setItem('formData', registryNumber);
  });
  useEffect(function persistForm() {
    localStorage.setItem('formData', brand);
  });
  useEffect(function persistForm() {
    localStorage.setItem('formData', model);
  });
  useEffect(function persistForm() {
    localStorage.setItem('formData', yearModel);
  });
  useEffect(function persistForm() {
    localStorage.setItem('formData', color);
  });
/*
  return data.cars.map(({ registryNumber, brand, model, yearModel, color}) =>{
     
*/
    //  <p>Registrynumber: {registryNumberValue}</p>
      let input;
      return(
        <div key={registryNumber}>
          <p>{brand}</p>
          <form
            onSubmit={e => {
              e.preventDefault();
              updateCar({variables: { 
                car:{
                  registryNumber,
                  brand: input.value,
                  model: input.value,
                  yearModel: input.value,
                  color: input.value
                }
              }
            })
          }}>
               <div	
               style={{	
                 width: "100%",	
                 display: "flex",	
                 alignContent: "center",	
                 justifyContent: "center",	
                 padding: 10,	
               }}>	
             
             
            <h3 className="h3 mb-3 font-weight-normal">Edit a Car!</h3>	
             <div className="mb-3" style={{ paddingBottom: 5 }}>	
               <label htmlFor="inputRegistryNumber">Registration number</label>
                   <input
                       id="inputRegistryNumber"	
                       className="form-control"
                       required	
                       autoFocus	
                       name="registryNumber"	
                       ref="registryNumber"
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
            </div>
            </form>
            </div>
        )}
      // )}



export function EditCar() {
  return (
    <>
    <section className="banner">
      <div className="container">
      <div className="row"> 
      <EditCarForm />
      </div>
      </div>
    </section>
    </>
  )
}
