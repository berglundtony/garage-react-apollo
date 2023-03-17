export default function CarForm(preloadedValues){
/* const preloadedValues = {
    registryNumber: "KSP166",
    brand: "Mercedes",
    model: "C180",
    yearModel: 2010,
    color: "red"
  }; */

  
/*
  useEffect(() => {
    const fetchData = async() => {
      setData(await getCarData())
    }
    fetchData()
    },[])
  }
*/
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedValues
  });

  const [registryNumber, setRegistryNumber] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("")
  const [yearModel, setYearModel] = useState("")
  const [color, setColor] = useState("") 
/*
  function submitForm(){
    const registryNumber = registryNumber.current.value;
    const brand = brand.current.value;
    const model = model.current.value;
    const yearModel = yearModel.current.value;
    const color = color.current.value;
  }

 useEffect(() => {
  if(localStorage.getItem("registryNumber")){
    const registryNumber = localStorage.getItem("setRegistryNumber")
    setRegistryNumber(registryNumber);
  }
  if(localStorage.getItem("brand")){
    const brand = localStorage.getItem("setBrand")
    setBrand(brand);
  }
  if(localStorage.getItem("model")){
    const model = localStorage.getItem("model")
    setModel(model);
  }
  if(localStorage.getItem("yearModel")){
    const yearModel = localStorage.setItem("yearModel")
    setYearModel(yearModel);
  }
  if(localStorage.getItem("color")){
    const color = localStorage.getItem("color")
    setColor(color);
  }
 }, []);
 
  const { loading, error, called } = useQuery(GET_CARS);

  
  if (loading) return 'Submitting...';
  if(called) return <p>The car was submitted Successfully!</p>
  if (error) return `Submission error! ${error.message}`;
   */
  let params = useParams();


  //const[updateCar,data] = useMutation(EDIT_CAR);

 
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
  
  <p>Registrynumber: {params.registryNumber}</p>
<form onSubmit = {handleSubmit(onsubmit)} > 
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
          //  onChange={(e) => setRegistryNumber(e.target.value) }
          />
    </div>
  <div className="mb-3" style={{ paddingBottom: 5 }}>	
  <label htmlFor="inputBrand">Brand</label>		
        <input	
          id="inputBrand"	
          className="form-control"
          required	
          value={brand}
        //  onChange={(e) => setBrand(e.target.value) }
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
         // onChange={(e) => setModel(e.target.value) }
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
      //  onChange={(e) => setYearModel(e.target.value) }
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
        //  onChange={(e) => setColor(e.target.value)}	
        />	
  </div>
  <div style={{ justifyContent: "center", alignContent: "center" }}>
  <button type="submit" className="btn btn-primary">Submit</button>	
  </div>
  </form>
</div>
  )};