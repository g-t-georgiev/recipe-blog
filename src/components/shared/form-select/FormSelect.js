import { useState, useCallback } from 'react';

import './FormSelect.css';

const initialState = {
    touched: false
};

function FormSelect(props) {
    const [ selectState, setSelectState ] = useState(initialState);

    const changeHandler = useCallback(function () {
        setSelectState(function (state) {
            return {
                ...state,
                touched: true
            }
        });
    }, [setSelectState]);

    return (
        <div className="form-row">
            <div className="input-field">
                <label htmlFor={props.id}>
                    <select 
                        className={`form-select${selectState.touched ? ' no-float' : ''}`} 
                        name={props.name}
                        id={props.id}
                        defaultValue={props.defaultValue ?? 'default'}
                        disabled={props.disabled ?? false}
                        onChange={changeHandler}
                    >
                        <option value="default" hidden={true}></option>
                        {props.options.map((option) => <option key={option.id} value={option.value}>{option.value}</option>)}
                    </select>
                    <span id="label-text">
                        {props.placeholder}
                    </span>
                </label>
            </div>
        </div>
   );
}

export default FormSelect;