import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().min(2,"Name must be at least 2 characters").required('Name is a required field'),
    pizzaSize: yup.string(),
    pepperoni: yup.boolean().notRequired(),
    mushroom: yup.boolean().notRequired(),
    pineapple: yup.boolean().notRequired(),
    greenPepper: yup.boolean().notRequired(),
    instruction: yup.string()
})


const Pizza = (props) => {
    const [pizza, setPizza] = useState ({
        name : '',
        pizzaSize : '',
        pepperoni : false,
        mushroom : false,
        pineapple : false,
        greenPepper : false,
        instruction: ''
    })
    const [errors, setErrors] = useState({
        name : '',
        pizzaSize : '',
        pepperoni : '',
        mushroom : '',
        pineapple : '',
        greenPepper : '',
        instruction: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState (true);

    useEffect (()=>{
        formSchema.isValid(pizza).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [pizza])

    const validateChange = event => {
        yup
            .reach(formSchema, event.target.name)
            .validate(event.target.value)
            .then(valid=>{
                setErrors({
                ...errors,
                [event.target.name]: ''
                });
            })
            .catch( err => {
                setErrors({
                    ...errors, 
                    [event.target.name]: err.errors
                });
            });
    };

    const formSubmit = event => {
        event.preventDefault();
        const newPizza = {
            name: pizza.name,
            pizzaSize: pizza.pizzaSize,
            pepperoni: pizza.pepperoni,
            mushroom: pizza.mushroom,
            pineapple: pizza.pineapple,
            greenPepper: pizza.greenPepper,
            instruction: pizza.instruction
        }
        props.setPizzaList([...props.pizzaList, newPizza])

        setPizza({
            name : '',
            pizzaSize : '',
            pepperoni : false,
            mushroom : false,
            pineapple : false,
            greenPepper : false,
            instruction: ''
        });
    }
    const inputChange = event => {
        event.persist();
        const newPizzaData = {
            ...pizza, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked: event.target.value
        }
        validateChange(event);
        setPizza(newPizzaData);
    }
    return (
        <form onSubmit = {formSubmit}>
            <label htmlFor = 'name'>Name
                <input 
                    id = 'name'
                    type = 'text'
                    name = 'name'
                    value = {pizza.name}
                    onChange = {inputChange}
                /> 
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label><br/>
            <label htmlFor = 'pizzaSize'> Select Pizza Size
                <select id = 'pizzaSize' name ='pizzaSize' value = {pizza.pizzaSize} onChange = {inputChange}>
                    <option value = 'small'>Small</option>
                    <option value = 'medium'>Medium</option>
                    <option value = 'large'>Large</option>
                    <option value = 'extraLarge'>Extra-Large</option>
                </select>
            </label><br/>
            <label htmlFor = 'pepperoni'>Pepperoni
                <input 
                    id = 'pepperoni'
                    type = 'checkbox'
                    name = 'pepperoni'
                    checked = {pizza.pepperoni}
                    onChange = {inputChange}
                />
            </label>
            <label htmlFor = 'mushroom'>Mushroom
                <input 
                    id = 'mushroom'
                    type = 'checkbox'
                    name = 'mushroom'
                    checked = {pizza.mushroom}
                    onChange = {inputChange}
                />
            </label><br/>
            <label htmlFor = 'pineapple'>Pineapple
                <input 
                    id = 'pineapple'
                    type = 'checkbox'
                    name = 'pineapple'
                    checked = {pizza.pineapple}
                    onChange = {inputChange}
                />
            </label>
            <label htmlFor = 'greenPepper'>Green Pepper
                <input 
                    id = 'greenPepper'
                    type = 'checkbox'
                    name = 'greenPepper'
                    checked = {pizza.greenPepper}
                    onChange = {inputChange}
                />
            </label><br/>
            <label htmlFor = 'instruction'>Instruction:<br/>
                <textarea 
                    id = 'instruction'
                    name = 'instruction'
                    value = {pizza.instruction}
                    onChange = {inputChange}
                />
            </label><br/>
                <button disabled ={buttonDisabled}>Order</button>
        </form>
    )
}
export default Pizza;