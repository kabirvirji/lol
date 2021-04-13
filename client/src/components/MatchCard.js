import React from 'react'

const MatchCard = (props) => {

  return (
    <div>
      <p>Outcome: {`${props.outcome ? 'Win' : 'False'}`}</p>
      <p>Game Duration: {`${props.gameDuration}`} minutes</p>
      <p>Summoner Name: {`${props.summonerName}`}</p>
      <p>Summoner Spell 1: {`${props.summonerSpells[0]}`}</p>
      <p>Summoner Spell 2: {`${props.summonerSpells[1]}`}</p>
      <p>Summoner Perk 1: {`${props.summonerPerks[0]}`}</p>
      <p>Summoner Perk 2: {`${props.summonerPerks[1]}`}</p>
      <p>Summoner Perk 3: {`${props.summonerPerks[2]}`}</p>
      <p>Summoner Perk 4: {`${props.summonerPerks[3]}`}</p>
      <p>Summoner Perk 5: {`${props.summonerPerks[4]}`}</p>
      <p>Champion ID: {`${props.championId}`}</p>
      <p>Kills: {`${props.kda[0]}`}</p>
      <p>Deaths: {`${props.kda[1]}`}</p>
      <p>Assists: {`${props.kda[2]}`}</p>
      <p>Item 1: {`${props.items[0]}`}</p>
      <p>Item 2: {`${props.items[1]}`}</p>
      <p>Item 3: {`${props.items[2]}`}</p>
      <p>Item 4: {`${props.items[3]}`}</p>
      <p>Item 5: {`${props.items[4]}`}</p>
      <p>Item 6: {`${props.items[5]}`}</p>
      <p>Champion Level: {`${props.championLevel}`}</p>
      <p>Total Creep Score: {`${props.totalCreepScore}`}</p>
      <p>Creep Score Per Minute: {`${props.creepScorePerMinute}`}</p>
      <p>--------------------------------------------------</p>
    </div>
  );
}

export default MatchCard