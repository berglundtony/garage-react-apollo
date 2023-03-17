import {gql} from '@apollo/client';
import {commitMutation, graphql,} from 'react-relay'

const {useMutatation, graphql} = require('react-relay')

const mutation = graphql`
mutation CreateCar($car: CarInputType!){
  createCar(car: $car)
    car{
      registryNumber
      brand
      model
      yearModel
      color
    }
}`

export default(registryNumber, brand, model, yearModel, color, callback) =>
{
   const variables ={
    input:{
      registryNumber,
      brand,
      model,
      yearModel,
      color,
      clientMutationId: ""
    },
  }

  commitMutation(
      environment,
      {
        mutation,
        variables,
        onCompleted: (response, errors) => {
          callback()
        },
        onError: err => console.error(err),
      },
    ) 
  } 


export const CREATE_CAR_MUTATION = gql`
mutation createCar($registryNumber: String! 
 $brand: String! 
 $model: String! 
 $yearModel: Int! 
 $color: String!) 
 {
     createCar(registryNumber: $registryNumber 
       brand: $brand
       model: $model
       yearModel: $yearModel
       color:  $color)
       {
       registryNumber
     }
} 
`; 
/*
export const CAR_ATTRIBUTES = gql`
fragment CarInfo on CarInputType {
registryNumber
brand
model
yearModel
color
}
`;

export const CREATE_CAR = gql`
mutation createCar($car: CarInputType!) {
createCar(car: $car) {
 ...CarInfo
}
}
${CAR_ATTRIBUTES}
`; */