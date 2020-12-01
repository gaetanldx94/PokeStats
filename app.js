'use strict';

const getJSON = require('get-json');
const readline = require('readline-sync'); 
const fs = require('fs');

let pokemon = readline.question("Set a pokemon : "); 

let url = "https://pokeapi.co/api/v2/pokemon/" + pokemon;
let path = 'data.json';

let json, JsonData;

var name, height, weight, type,
    spritesD, spritesS, Appearance,
    BaseStatsHp, BaseStatsAtt, BaseStatsDef, BaseStatsAttSpe,
    BaseStatsDefSpe, BAseStatsSpeed;

getJSON(url, function(error, response){
    if(error) throw new error;
    json = JSON.stringify(response);
    fs.writeFile(path, json, 'utf8', () => {});
    readJsonFile(path);
})

function readJsonFile(file) {
    try {
        fs.readFile(file, 'utf8', (error, data) => {
            if (error) throw new error; 
            console.log("Data retreived into : { 'link' : '" + '\x1b[32m', url + '\x1b[0m', "'}\n");
            JsonData = JSON.parse(data);
            getStats();
        });
    } catch(ex) {
        console.log(ex);
    }
}

function getStats() {
    name = JsonData['name'];
    height = JsonData['height']
    weight = JsonData['weight'];
    type = JsonData['types']['0']['type']['name'];
    spritesD = JsonData['sprites']['front_default'];
    spritesS = JsonData['sprites']['front_shiny'];
    Appearance = JsonData['sprites']['other']['official-artwork']['front_default'];
    BaseStatsHp = JsonData['stats']['0']['base_stat'];
    BaseStatsAtt = JsonData['stats']['1']['base_stat'];
    BaseStatsDef = JsonData['stats']['2']['base_stat'];
    BaseStatsAttSpe = JsonData['stats']['3']['base_stat'];
    BaseStatsDefSpe = JsonData['stats']['4']['base_stat'];
    BAseStatsSpeed = JsonData['stats']['5']['base_stat'];
    ShowPokeStat(name, height, weight, type, spritesD, spritesS, Appearance, BaseStatsHp, BaseStatsAtt, BaseStatsDef, BaseStatsAttSpe, BaseStatsDefSpe, BAseStatsSpeed);
}

function ShowPokeStat(Name, Height, Weight, Type, SpritesD, SpritesS, AppearanceD, StatsHp, StatsAtt, StatsDef, StatsAttSpe, StatsDefSpe, StatsSpeed) {
    console.log("Name : " + Name);
    console.log("Height : " + Height);
    console.log("Pounds : " + Weight + " lbs");
    console.log("Type : " + Type);
    console.log("Default(pictures) : " + SpritesD);
    console.log("Shyni(pictures) : " + SpritesS);
    console.log("Appearance(pictures) : " + AppearanceD + "\n");
    console.log("Level 1 : ");
    console.log("Base Stats HP : " + StatsHp);
    console.log("Base Stats Attack : " + StatsAtt);
    console.log("Base Stats Defense : " + StatsDef);
    console.log("Base Stats AttackSpe : " + StatsAttSpe);
    console.log("Base Stats DefenseSpe : " + StatsDefSpe);
    console.log("Base Stats Speed : " + StatsSpeed);
}
