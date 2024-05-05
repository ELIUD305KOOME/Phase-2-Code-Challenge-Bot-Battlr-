import React from "react";
import BotCollection from '../components/BotCollection'; // Correct import path
import YourBotArmy from '../components/YourBotArmy'; // Correct import path

import BotSpecs from '../components/BotSpecs';
import BotSearch from '../components/BotSearch';
import Filter from '../components/Filter';

class BotsPage extends React.Component {
  constructor(){
    super()
    this.state = {
      allBots: [],
      selectBot: undefined,
      query: '',
      filter: 'All'
    }
  }

  componentDidMount(){
    // Fetch bots data from the server
    fetch('path/to/db.json')
    .then(res => res.json())
    .then(bots => this.setBots(bots))
      .then(bots => this.setState({
        allBots: bots
      }))
  }

  // Set initial bots state
  setBots = (bots) => {
    return bots.map(bot => {
      bot.owned = false
      return bot
    })
  }

  // Handle click on a bot card
  clickBot = (bot) => {
    this.setState({
      selectBot: bot
    })
  }

  // Add bot to army
  addBot = (selectBot) => {
    let updatedBots = this.state.allBots.map(bot => {
      if(bot.id === selectBot.id){
        return { ...bot, owned: !bot.owned };
      } else {
        return bot;
      }
    });
    this.setState({
      allBots: updatedBots
    });
  }

  // Filter free bots based on search and filter criteria
  filterFreeBots = () => {
    let freeBots = this.state.allBots.filter(bot => !bot.owned);
    if(this.state.filter !== 'All'){
      freeBots = freeBots.filter(bot => bot.bot_class === this.state.filter);
    }
    if(this.state.query){
      freeBots = freeBots.filter(bot => bot.name.toLowerCase().includes(this.state.query.toLowerCase()));
    }
    return freeBots;
  }

  // Filter owned bots based on search criteria
  filterOwnedBots = () => {
    let ownedBots = this.state.allBots.filter(bot => bot.owned);
    if(this.state.query){
      ownedBots = ownedBots.filter(bot => bot.name.toLowerCase().includes(this.state.query.toLowerCase()));
    }
    return ownedBots;
  }

  // Clear search query
  handleClear = () => {
    this.setState({
      query: ''
    })
  }

  // Handle change in search query
  handleChange = (query) => {
    this.setState({
      query: query
    })
  }

  // Clear bot details
  clearSpec = () => {
    this.setState({
      selectBot: undefined
    })
  }

  // Handle change in filter criteria
  filterChange = (value) => {
    this.setState({
      filter: value
    })
  }

  
  render() {
    console.log(this.state)
    return (
      <div>
        {/* Bot search input */}
        <BotSearch handleClear={this.handleClear} handleChange={this.handleChange}/>
        <br></br>
        {/* Filter for bot class */}
        <Filter filterChange={this.filterChange}/>
        {/* Display owned bots */}
        <YourBotArmy bots={this.filterOwnedBots()} addBot={this.clickBot}/>
        <br></br>
        {/* Display bot collection */}
        {this.state.selectBot ? <BotSpecs bot={this.state.selectBot} clearSpec={this.clearSpec} addBot={this.addBot} />: 
          <BotCollection bots={this.filterFreeBots()} addBot={this.clickBot}/>}
      </div>
    );
  }
}

export default BotsPage;
