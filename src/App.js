import React, { useState } from "react";
import { Route, Link } from 'react-router-dom';
import Pizza from './Pizza';

const App = () => {
  const [pizzaList, setPizzaList] = useState ([]);
  console.log(pizzaList);
  return (
    <>
      <div>
        <Link to='/'>Home</Link><br/>
        <Link to='/Pizza'>Pizza</Link>  
        <Route path = '/Pizza'>
          <Pizza pizzaList = {pizzaList} setPizzaList = {setPizzaList} />
        </Route>
        <pre>{JSON.stringify(pizzaList, null, 2)}</pre>
      </div>
    </>
  );
};
export default App;
