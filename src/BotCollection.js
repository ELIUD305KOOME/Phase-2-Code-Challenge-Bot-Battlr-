import { useState } from 'react';

export const useCollection = () => {
  const [collection, setCollection] = useState([]);

  const addToCollection = (item) => {
    setCollection([...collection, item]);
  };

  const removeFromCollection = (itemId) => {
    setCollection(collection.filter(item => item.id !== itemId));
  };

  return {
    collection,
    addToCollection,
    removeFromCollection
  };
};
