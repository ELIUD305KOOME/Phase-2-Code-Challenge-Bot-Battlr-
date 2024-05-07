
import React, { useEffect, useState } from 'react';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';

/* import ChildComponent from './ChildComponent'; */
import YourBotArmy from './YourBotArmy';  




function ParentComponent() {
  const [bots,setBots] = useState(null);

  const [myCollection, setMyCollection] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then(data => {
        setBots(data.bots);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);
  // Function to add a bot to the user's collection
  const addToMyCollection = (bot) => {
    setMyCollection([...myCollection, bot]);
  };
  // Function to remove a bot from the user's collection
  const removeFromMyCollection = (botId) => {
    setMyCollection(myCollection.filter(item => item.id !== botId));
  };
  return (
    <div className="container">
      <h1 className="my-5">My Collection</h1>
    <div className="row">
      {/* Render cards from the user's collection */}
      {myCollection.map(bot => (
        <div key={bot.id} className="col-lg-2 mb-">
          <YourBotArmy
            bot={bot} 
            addToCollection={() => addToMyCollection(bot)}
            removeFromCollection={() => removeFromMyCollection(bot.id)}
            isInCollection={true} // In collection, so no need to check
          />
        </div>
      ))}
    </div>
    <h1 className="my-5">Bot Cards</h1>
    <div className="row">
      {/* Render cards from the API */}
      {bots && bots.map(bot => (
        <div key={bot.id} className="col-lg-2 mb-">
          {/* Pass down props for adding and removing from collection */}
          <YourBotArmy
            bot={bot} 
            addToCollection={() => addToMyCollection(bot)}
            removeFromCollection={() => removeFromMyCollection(bot.id)}
            // Check if the bot is already in the collection
            isInCollection={myCollection.some(item => item.id === bot.id)}
          />
        </div>
      ))}
    </div>
    
  </div>
  );
}

export default ParentComponent;
