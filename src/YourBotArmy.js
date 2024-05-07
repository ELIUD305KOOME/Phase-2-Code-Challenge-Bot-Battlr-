import React from 'react';
import './YourBotArmy.css'; // Import the external CSS file

function BotCard({ bot, addToCollection, removeFromCollection, isInCollection }) {
  const handleAddToCollection = () => {
      addToCollection(bot);
  };

  const handleRemoveFromCollection = () => {
      removeFromCollection(bot.id);
  };

    return (
        <div className="card">
          <img className="card-img-top" src={bot.avatar_url} alt={bot.name} />
          <div className="card-body">
            <h5 className="card-title">{bot.name}</h5>
            <p className="card-text">
              Class: {bot.bot_class}
            </p>
            {isInCollection ? (
              <button className="btn btn-danger" onClick={handleRemoveFromCollection}>Remove from Collection</button>
            ) : (
              <button className="btn btn-primary" onClick={handleAddToCollection}>Add to Collection</button>
            )}

          </div>
        </div>
      );
}

export default BotCard;
