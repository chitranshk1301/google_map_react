// a form with 3 fields and a submit button
import React from 'react';
import { PlusCircle } from 'react-feather';


const Form = () => (
    <div className='form-container'>
        <form>
            <span className='origin-txt'>Origin</span>
            <input className='origin' type='text' placeholder='Origin' />

            <span className='stop-txt'>Stop</span>
            <input className='stop' type='text' placeholder='Stop' />
            <span className='aas-txt'><PlusCircle />  Add another stop</span>
            <button className='calculate-btn' type='submit'>Calculate</button>

            <span className='destination-txt'>Destination</span>
            <input className='destination' type='text' placeholder='Destination' />
        </form>
    </div>
);

export default Form;