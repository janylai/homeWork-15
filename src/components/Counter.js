import { useReducer } from 'react';

const PLUS = 'PLUS';
const MINUS = 'MINUS';

const reducerCount = (prevState, action) => {
    if(action.type === 'PLUS'){
        return prevState +1

    }
    if(action.type === 'MINUS'){
        return prevState -1
    }
};

export const Counter = () => {
    const [counter, dispatchCount] = useReducer(reducerCount, 0);

    const plusHandler =()=>{
        dispatchCount({type: PLUS}) //{type: 'PLUS' } =action/действие
    }

    const minusHandler =()=>{
        dispatchCount({type: MINUS})
    }
    return (
        <div>
            <h1>{counter}</h1>
            <button onClick={plusHandler}>+</button>
            <button onClick ={minusHandler}>-</button>
        </div>
    )

}