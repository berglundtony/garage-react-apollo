import React, {useEffect, useState, useRef, useForm} from "react";
import { gql, useQuery, useMutation, } from '@apollo/client';
import { useParams, useNavigate, useLocation, browserHistory, redirect } from "react-router-dom";

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
  const location = useLocation()
  console.log(location.state)

  const [updateCar] = useMutation(UPDATE_CAR);
  const { loading, error, data } = useQuery(GET_CARS);
  const [lists, setList] = useState(data);
  const [car, setCar]= useState({
    registryNumber: location.state.registryNumber,
    brand: location.state.brand,
    model: location.state.model,
    yearModel: location.state.yearModel,
    color: location.state.color
  })

  function handleBrand(e) {
    setCar({
      ...car,
      brand: e.target.value
    })
  }

  function handleModel(e) {
    setCar({
      ...car,
      model: e.target.value
    })
  }

  function handleYearModel(e) {
    setCar({
      ...car,
      yearModel: e.target.value
    }) 
  }

  function handleColor(e) {
    setCar({
      ...car,
      color: e.target.value
    })
  }
  const navigate = useNavigate();
  const handleSubmit = (e) => {
      navigate('/listcars')
      window.location.reload(false);
    }; 
  
      let input;
      return(
           <div	
              style={{	
                width: "100%",	
                display: "flex",	
                alignContent: "center",	
                justifyContent: "center",	
                padding: 10,	
              }}>	
          <form
            onSubmit = {(e) => {
            e.preventDefault();
              handleSubmit(e);
              updateCar({
                variables: 
                {
                  car: {
                    registryNumber: car.registryNumber, 
                    brand: car.brand,
                    model: car.model,
                    yearModel: parseInt(car.yearModel),
                    color: car.color 
                  }
                },
           });
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
                          value={car.registryNumber}
                        />
                  </div>
             <div className="mb-3" style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputBrand">Brand</label>		
                      <input	
                        id="inputBrand"	
                        className="form-control"
                        required	
                        type="text"	
                        value={car.brand}
                        onChange={handleBrand}
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
                        value={car.model}	
                        onChange={handleModel}
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
                      value={car.yearModel}	
                      onChange={handleYearModel}
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
                        value={car.color}	
                        onChange={handleColor}
                      />	
             </div>
             <div style={{ justifyContent: "center", alignContent: "center" }}>
             <button type="submit" className="btn btn-primary">Submit</button>	
             </div>
            
            </form>
            </div> 
            )}
        

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
