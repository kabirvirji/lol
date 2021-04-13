const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
require('dotenv').config()
const LeagueJs = require('leaguejs')
const api = new LeagueJs(process.env.key)

const getAccountId = async (summonerName, api) => {
    try {
        const summonerData = await api.Summoner.gettingByName(summonerName)
        return summonerData.accountId
    } catch (err) {
        console.log(err.name)
    }
}

const getRecentMatches = async (id, numMatches, api) => {
    try {
        const matches = await api.Match.gettingListByAccount(id, {beginIndex: 0, endIndex: numMatches}) 
        return matches
    } catch (err) {
        console.log(err.name)
    }
}

const getParticipantInfo = async (match, api) => {
    try {
        const matchInfo = await api.Match.gettingById(match.gameId)
        return {
            "participantIdentities": matchInfo.participantIdentities,
            "participants": matchInfo.participants,
            "gameDuration": matchInfo.gameDuration
        }
    } catch (err) {
        console.log(err.name)
    }
}

const formatMatchData = (p, gameDuration, summonerName) => {
    return {
        outcome: p.stats.win,
        gameDuration: gameDuration,
        summonerName: summonerName,
        summonerSpells: [p.spell1Id, p.spell2Id],
        summonerPerks: [p.stats.perk1, p.stats.perk2, p.stats.perk3, p.stats.perk4, p.stats.perk5],
        championId: p.championId,
        KDA: [p.stats.kills, p.stats.deaths, p.stats.assists],
        items: [p.stats.item0, p.stats.item1, p.stats.item2, p.stats.item3, p.stats.item4, p.stats.item5, p.stats.item6],
        championLevel: p.stats.champLevel,
        totalCreepScore: p.stats.totalMinionsKilled,
        creepScorePerMinute: p.stats.totalMinionsKilled / gameDuration
    }
}

app.get('/getMatches', async (req, res) => {

    const { summonerName, numberMatches } = req.query
	const accountId = await getAccountId(summonerName, api)
    const recentMatches = await getRecentMatches(accountId, numberMatches, api)
    // global variables to modify as we explore new information
	var pid = null
    var matchData = Array()
    
    recentMatches.matches.forEach(async match => {
        const { participantIdentities, participants, gameDuration } = await getParticipantInfo(match, api)
        participantIdentities.forEach(id => { // find the correct participant id
            if (id.player.accountId === accountId) pid = id.participantId
        }) 
        participants.forEach(p => { 
            if (pid === p.participantId) matchData.push(formatMatchData(p, gameDuration, summonerName)) 
        })
        if (matchData.length == numberMatches) res.send({ matches: matchData }) // send back JSON once we have all our matchData :)
    })
})

app.listen(3001, () => {
    console.log('listening on port 3001');
})