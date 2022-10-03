import React from 'react';
import './css/Data.css'
import utf8 from 'utf8';

const runesDict = {
    // Rune icons
    "8100" : "https://ddragon.canisback.com/img/perk-images/Styles/7200_Domination.png",
    "8300" : "https://ddragon.canisback.com/img/perk-images/Styles/7203_Whimsy.png",
    "8000" : "https://ddragon.canisback.com/img/perk-images/Styles/7201_Precision.png",
    "8400" : "https://ddragon.canisback.com/img/perk-images/Styles/7204_Resolve.png",
    "8200" : "https://ddragon.canisback.com/img/perk-images/Styles/7202_Sorcery.png",

    // Domination keystones
    "8112" : "https://ddragon.canisback.com/img/perk-images/Styles/Domination/Electrocute/Electrocute.png",
    "8124" : "https://ddragon.canisback.com/img/perk-images/Styles/Domination/Predator/Predator.png",
    "8128" : "https://ddragon.canisback.com/img/perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",
    "9923" : "https://ddragon.canisback.com/img/perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",

    // Inspiration keystones
    "8351" : "https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
    "8360" : "https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
    "8369" : "https://ddragon.canisback.com/img/perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",

    // Precision keystones
    "8005" : "https://ddragon.canisback.com/img/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
    "8008" : "https://ddragon.canisback.com/img/perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
    "8021" : "https://ddragon.canisback.com/img/perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
    "8010" : "https://ddragon.canisback.com/img/perk-images/Styles/Precision/Conqueror/Conqueror.png",

    // Resolve keystones
    "8437" : "https://ddragon.canisback.com/img/perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
    "8439" : "https://ddragon.canisback.com/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",
    "8465" : "https://ddragon.canisback.com/img/perk-images/Styles/Resolve/Guardian/Guardian.png",

    // Sorcery keystones
    "8214" : "https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
    "8229" : "https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
    "8230" : "https://ddragon.canisback.com/img/perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png"
}

function Player(props) {
    var champion = props.playerData["SKIN"]
    var keystoneID = props.playerData["KEYSTONE_ID"]
    var championIcon = "https://ddragon.leagueoflegends.com/cdn/12.18.1/img/champion/" + champion + ".png"
    var classes = "player-wrapper " + props.team
    var kda = props.playerData["CHAMPIONS_KILLED"] + "/" + props.playerData["NUM_DEATHS"] + "/" + props.playerData["ASSISTS"]
    var minionScore = parseInt(props.playerData["MINIONS_KILLED"]) + parseInt(props.playerData["NEUTRAL_MINIONS_KILLED"])
    var pinksBought = props.playerData["VISION_WARDS_BOUGHT_IN_GAME"]
    var visionScore = props.playerData["VISION_SCORE"]
    
    if (props.playerData["NUM_DEATHS"] === "0") {
        var kdaRatio = parseInt(props.playerData["CHAMPIONS_KILLED"]) + parseInt(props.playerData["ASSISTS"])
    } else {
        var kdaRatio = (parseInt(props.playerData["CHAMPIONS_KILLED"]) + parseInt(props.playerData["ASSISTS"])) / parseInt(props.playerData["NUM_DEATHS"])
    }

    if (kdaRatio.toString().length >= 4) {
        kdaRatio = kdaRatio.toString().substring(0,4)
    }
    var itemLink = "https://ddragon.leagueoflegends.com/cdn/12.18.1/img/item/"

    var itemList = ["ITEM0","ITEM1","ITEM2","ITEM3","ITEM4","ITEM5","ITEM6"]

    try {
        var playerName = utf8.decode(props.playerData["NAME"])
    } catch {
        var playerName = props.playerData["NAME"]
    }
    var opgglink = "https://euw.op.gg/summoners/euw/" + playerName

    if (props.team === "blue") {
        var imgClass = "blueTeamChamp"
    } else {
        var imgClass = "redTeamChamp"
    }

    if (props.playerData["MUTED_ALL"] === "0") {
        var mutedAll = <div style={{opacity:0.2}}>MUTED ALL</div>
    } else {
        var mutedAll = <div style={{opacity:0.2}}>MUTED ALL</div>
    }

    if (props.playerData["WAS_AFK"] === "0") {
        var wasAfk = <div style={{opacity:0.2}}>AFK</div>
    } else {
        var wasAfk = <div style={{opacity:1}}>AFK</div>
    }

    return (
        <div className={classes} key={playerName}>
            <img src={championIcon} alt="" className={imgClass}/>
            <div className="runes-wrapper"><img src={runesDict[keystoneID]} alt="" className="player-keystone"/><img src={runesDict[props.playerData["PERK_SUB_STYLE"]]} alt="" className="player-secondary-rune"/></div>
            <div className="playername-wrapper"><a href={opgglink} target="_blank">{playerName}</a></div>

            <div className="player-kda-wrapper">
                <div className="player-kda">{kda}</div>
                <div className="player-kda-ratio">{kdaRatio}:1 KDA</div>
            </div>

            <div className="player-misc-wrapper">
                <div className="player-minionscore">CS {minionScore}</div>
                <div className="player-pinksbought">Pinks {pinksBought}</div>
                <div className="player-visionscore">VisionScore {visionScore}</div>
            </div>

            <div className="player-item-wrapper">
                {itemList.map((data)=>{
                    if (props.playerData[data] === "0") {
                        var itemSlot
                    } else {
                        var itemSlot = <img src={itemLink + props.playerData[data] + ".png"} alt="" className="player-item-image"/>
                    }
                    return <div className="player-item-slot-container">{itemSlot}</div>
                })}
            </div>

            <div className="tags-wrapper">
                <div className="mutedall-tag">
                    <div>{mutedAll}</div>
                </div>
                <div className="wasafk-tag">
                    <div>{wasAfk}</div>
                </div>
            </div>
            
            <div className="player-collapse-wrapper">
                <button className="player-collapse-button">
                    <span className="material-symbols-outlined player-collapse-arrow">
                    expand_more
                    </span>
                </button>
            </div>
        </div>
    )
}

function Data(props) {


    if (props.blueTeam[0] !== undefined) {

        if (props.blueTeam[0]["WIN"] === "Fail") {
            var blueResult = "Defeat"
            var redResult = "Victory"
        } else {
            var blueResult = "Victory"
            var redResult = "Defeat"
        }
    }

    return (
    <div id="data">
        <div id="data-wrapper">
            <div id="teams-wrapper">
                <div id="blue-team-wrapper">
                    <div id="blue-team-title-wrapper" className="team-titles-wrapper">
                        <p id="blue-team-color">BLUE </p><p className="team-result">({blueResult})</p>
                    </div>

                    <div id="blue-team-players-wrapper">
                        {props.blueTeam.map((data)=>{
                            // console.log(data)
                            return <Player playerData={data} team="blue"/>
                        })}
                    </div>
                </div>

                <div id="red-team-wrapper">
                    <div id="red-team-title-wrapper" className="team-titles-wrapper">
                        <p id="red-team-color">RED </p><p className="team-result">({redResult})</p>
                    </div>
                    
                    <div id="red-team-players-wrapper">
                        {props.redTeam.map((data)=>{
                            // console.log(data)
                            return <Player playerData={data} team="red"/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Data;