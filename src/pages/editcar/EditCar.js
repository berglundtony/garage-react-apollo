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

 //const { loading, error, data } = useQuery(GET_CARS);
  const [updateCar] = useMutation(UPDATE_CAR);
  const { loading, error, data } = useQuery(GET_CARS);
  const [lists, setList] = useState(data);
  const [car, setCar]= useState("");
  const [tempCar, setTempCar]= useState("");
  const [registryNumber, setRegistryNumber] = useState("");
  const [tempRegistryNumber, setTempRegistryNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [tempBrand, setTempBrand] = useState("");
  const [model, setModel] = useState("")
  const [tempModel, setTempModel] = useState("")
  const [yearModel, setYearModel] = useState("")
  const [tempYearModel, setTempYearModel] = useState("")
  const [color, setColor] = useState("") 
  const [tempColor, setTempColor] = useState("") 
  const {registryNumberValue} = useParams();
  const navigate = useNavigate();

  const registryNumberTextRef = useRef(null)
  const brandTextRef = useRef(null)
  const modelTextRef = useRef(null)
  const yearModelTextRef = useRef(null)
  const colorTextRef = useRef(null)

  /*useEffect(() =>{
    const url = 'http://localhost:3000/' + registryNumberValue
    fetch(url)
    .then((response) =>{
      if(response.ststus === 400){
        //setNotFound(true);
      }
      return response.json();
    })
    .then((data) =>{
      setCar(data.car);
      setTempCar(data,car);
    });
  }, []);*/

//const Cars = () => (
  //<Query query={GET_CARS}>
   
      //if (error) return <p>Error :(</p>;
 /* return data.cars.map(({ registryNumber, brand, model, yearModel, color}) =>
  { */
     // <p>Registrynumber: {registryNumberValue}</p>
      let input;
      return(
          /*<Mutation mutation={UPDATE_CAR} key={registryNumber}>
          {
              updateCar => ( */
              

           <div	
              style={{	
                width: "100%",	
                display: "flex",	
                alignContent: "center",	
                justifyContent: "center",	
                padding: 10,	
              }}>	
          <form
            onSubmit={({registryNumber})=> {
            updateCar({variables: { 
                car:{
                  registryNumber,
                  brand: input.value,
                  model: input.value,
                  yearModel: input.value,
                  color: input.value
                }}
            });
            input.value ='';
          }}>
            <h3 className="h3 mb-3 font-weight-normal">Edit a Car!</h3>	
             <div className="mb-3" style={{ paddingBottom: 5 }}>	
                  <label htmlFor="inputRegistryNumber">Registration number</label>
                      <input
                          id="inputRegistryNumber"	
                          className="form-control"
                          required	
                          autoFocus
                          type="text"	
                          name="registryNumber"	
                          ref={registryNumberTextRef}
                          value={registryNumber}
                          onChange={(e) => setTempRegistryNumber(registryNumber, e.target.value) }
                        />
                  </div>
             <div className="mb-3" style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputBrand">Brand</label>		
                      <input	
                        id="inputBrand"	
                        className="form-control"
                        required	
                        type="text"	
                        ref={brandTextRef}
                        value={tempCar.brand}
                        onChange={(e) => setTempBrand(brand,e.target.value) }
                      />	
             </div>
             <div className="mb-3" style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputModel">Model</label>		
                      <input	
                        id="inputModel"	
                        className="form-control"	
                        required	
                        type="text"	
                        name="model"
                        ref={modelTextRef}
                        value={tempCar.model}	
                        onChange={(e) => setTempModel(model,e.target.value) }
                      />	
             </div>
             <div className="mb-3" style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputYearModel">Yearmodel</label>		
                    <input	
                      id="inputYearModel"	
                      className="form-control"
                      required	
                      type="text"	
                      name="yearmodel"
                      ref={yearModelTextRef}
                      value={tempCar.yearModel}	
                      onChange={(e) => setTempYearModel(yearModel,e.target.value) }
                    />	
             </div>
             <div className="mb-3" style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputColor">Color</label>		
                      <input	
                        id="inputColor"	
                        className="form-control"	
                        required	
                        type="text"	
                        name="color"
                        ref={colorTextRef}
                        value={tempCar.color}	
                        onChange={(e) => setTempColor(color,e.target.value)}	
                      />	
             </div>
             <div style={{ justifyContent: "center", alignContent: "center" }}>
             <button type="submit" className="btn btn-primary">Submit</button>	
             </div>
            
            </form>
            </div> 
            )}
        
           // </Mutation> 
  
     //     );
     //   };
     //   );
     // }}
//</Query>
 //)};



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
