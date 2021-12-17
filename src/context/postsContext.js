import React, { useState } from 'react';

const PostsContext = React.createContext({
  posts: [],
  initializeGroceryList: () => { }
});

export const GroceryContextProvider = (props) => {
  // We just need the actual value of the grocery list in this context
  // Used to display information on the GroceryDetailPage

  const [groceries, setGroceries] = useState([]);

  const initializeGroceryList = (groceriesFromAPI) => {
    setGroceries(groceriesFromAPI);
  }

  return (
    <GroceryContext.Provider
      value={{ groceries: groceries, initializeGroceryList: initializeGroceryList }}
    >
      {props.children}
    </GroceryContext.Provider>
  )
}

export default GroceryContext;
