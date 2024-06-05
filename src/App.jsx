import './App.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function App() {
  // State to hold values from input fields
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [bodyMass, setBodyMass] = useState('');

  // For conditional rendering
  const [isHeight, setIsHeight] = useState(true);
  const [isWeight, setIsWeight] = useState(true);

  const validate = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (!!value.match(/^[0-9]*$/)) {
      if (name === 'height') {
        setHeight(value);
        setIsHeight(true);
      } else {
        setWeight(value);
        setIsWeight(true);
      }
    } else {
      if (name === 'height') {
        setIsHeight(false);
      } else {
        setIsWeight(false);
      }
    }
  };

  // Refresh condition
  const handleReset = () => {
    setHeight(0);
    setWeight(0);
    setIsHeight(true);
    setIsWeight(true);
    setBodyMass('');
  };

  const calculate = () => {
    let height_m = height / 100;
    let bmi = weight / (height_m ** 2);
    bmi = bmi.toFixed(2);
    let str = '';

    if (bmi < 18.5) {
      str = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      str = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
      str = 'Overweight';
    } else if (bmi >= 30) {
      str = 'Obese';
    }
    setBodyMass(`${bmi} (${str})`);
  };

  return (
    <>
      <div className='d-flex justify-content-center align-items-center'  style={{ width: '100%', height: '100vh' }} >
        <div className='border bg-transparent shadow p-4 rounded' style={{ width: '500px', height:'500px' }}>
          <h1 className='text-primary'>BMI Calculator</h1>
          <h3 className='text-light'>Check your Body Mass Index </h3>

          <div className='mt-2 flex-column rounded  outline-light d-flex justify-content-center align-items-center p-4 '>
            <h2 className='fs-1 fw-bolder'>{bodyMass}</h2>
            <h6 className='text-dark'>Body Mass Index</h6> 
          </div>
          <form className='mt-3'>
            <div className="mb-3">
              <TextField id="standard-basic " value={height || ""} label="Height (cm)" onChange={(e) => validate(e)} name='height' variant="standard" className='w-100' />
              {!isHeight &&
                <p className='text-danger'>*Invalid input</p>}
            </div>
            <div className="mb-3">
              <TextField id="standard-basic" onChange={(e) => validate(e)} value={weight || ""} label="Weight (kg)" name='weight' variant="standard" className='w-100' />
              {!isWeight && <p className='text-danger'>*Invalid input</p>}
            </div>

            <div className='d-flex justify-content-between w-100 mt-4'>
              <Button variant="outlined" color="success" disabled={!isHeight || !isWeight} onClick={calculate} style={{ width: '190px', height: '40px' }}><b>Check BMI</b></Button>
              {<Button variant="outlined" color='warning' style={{ width: '190px', height: '40px' }} onClick={handleReset}><b>RESET</b></Button> }
             
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
