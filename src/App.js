import './App.css';
import Data from './Data';
import Navbar from './js/Navbar';
import React, { useState } from 'react';

function App() {

  const [blueTeam, updateBlue] = useState([])
  const [redTeam, updateRed] = useState([])

  const root = document.documentElement;


  function fileChanged() { // Change selected file name element
    const fileSubmit = document.getElementById("fileSubmit")
    const selectedFile = document.getElementById("selectedFile")
    var filename = fileSubmit.files[0].name;
    selectedFile.innerHTML = String(filename) + " selected"
  }


  function readFile() {
    var tempBlue = []
    var tempRed = []
    const fileReader = new FileReader()
    const uploadedFile = document.getElementById('fileSubmit').files[0];

    root.style.setProperty("--data-position", "790px")

    if (uploadedFile === undefined) {
      return
    }
    
    fileReader.readAsText(uploadedFile, "latin1")
    fileReader.onload = e => {
      const splitData = e.target.result.split("{")
      var players = []
      var dictOfPlayers = []
      for (let i=0; i<15; i++) {
        if (splitData[i].includes("ASSISTS")) {
          players.push(splitData[i].replaceAll("\\", "").replaceAll('"', "").replace("}", ""))
        }

      }
      players[players.length - 1] = players[players.length - 1].split("]")[0]
      for (let i=0; i<players.length; i++) {
        var dictionary = {}
        var splitPlayerData = players[i].split(",")
        for (let m=0; m<splitPlayerData.length; m++) {
          dictionary[splitPlayerData[m].split(":")[0]] = splitPlayerData[m].split(":")[1]
        }
        dictOfPlayers.push(dictionary)
      
      }

      for (let i=0; i<dictOfPlayers.length; i++) {
        if (dictOfPlayers[i]["TEAM"] === "100") {
          tempBlue.push(dictOfPlayers[i])
        } else {
          tempRed.push(dictOfPlayers[i])
        }
      }
      updateBlue(tempBlue)
      updateRed(tempRed)

      setTimeout(function () {
        var scrollDiv = document.getElementById("data-wrapper")
        scrollDiv.scrollIntoView({behavior: "smooth"})
      }, 2000);
      
      console.log(dictOfPlayers)
    };
  }

  return (
    <div className="App">

      <Navbar />

      <div id="page">
        <div id="landing-section">
          <div id="landing-wrapper">

            <div id="title-wrapper">
              <p id="title-main-text">Jari</p>
            </div>

            <div id="file-submit-wrapper">
              <div id="file-section">
                <label htmlFor="fileSubmit">
                  <p>Choose a ROFL File</p>
                </label>
                <input type="file" id="fileSubmit" accept=".rofl" onChange={fileChanged}/>

                <p id="selectedFile">No file selected</p>
              </div>

              <div id="submit-section">
                <button onClick={readFile}>Upload</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Data blueTeam={blueTeam} redTeam={redTeam}/>
    </div>
  );
}

export default App;
