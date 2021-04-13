import './App.css';
import MatchCard from './components/MatchCard'
import React from 'react'
import TextField from "@material-ui/core/TextField"
import { Button } from "@material-ui/core"
import axios from 'axios'

class App extends React.Component {
  state = {
    summonerName: "",
    numMatches: 0,
    recentMatches: []
  }

  getMatches = (summonerName, numMatches) => {
    axios
      .get(`http://localhost:3001/getMatches?summonerName=${summonerName}&numberMatches=${numMatches}`)
      .then((res) => {
        this.setState({
          recentMatches: res.data.matches,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleNameChange = (event) => {
      this.setState({summonerName: event.target.value});
  }
  handleNumChange = (event) => {
    this.setState({numMatches: event.target.value});
  }

  handleClick = async () => {
    if (this.state.summonerName === "") alert(`Summoner Name can't be blank`)
    if (this.state.numMatches < 1) alert(`Number of Matches must be at least 1`)
    this.getMatches(this.state.summonerName, this.state.numMatches)
  }

  render() {
    return (
      <div className="App">
      <div className="form">
        <TextField label="Summoner Name" variant="outlined" onChange={this.handleNameChange} />
        <TextField label="Number of Matches" variant="outlined" type="number" onChange={this.handleNumChange}/>
        <Button
          color="primary"
          onClick={() => this.handleClick()}
        >
          Submit
        </Button>
      </div>
      <div className="matches">
        {this.state.recentMatches.length !== 0 ? this.state.recentMatches.map((m,i) => 
          <MatchCard 
            outcome={m.outcome}
            gameDuration={m.gameDuration}
            summonerName={m.summonerName}
            summonerSpells={m.summonerSpells}
            summonerPerks={m.summonerPerks}
            championId={m.championId}
            kda={m.KDA}
            items={m.items}
            championLevel={m.championLevel}
            totalCreepScore={m.totalCreepScore}
            creepScorePerMinute={m.creepScorePerMinute}
          >
          </MatchCard>
        ) : "no matches yet :)"}
      </div>
    </div>
    )
  }
}

export default App
