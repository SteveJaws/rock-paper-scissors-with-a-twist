import { useState } from "react";
import happy from './assets/Happy.gif';
import angry from './assets/no-angry.gif';
import sad from './assets/sad-confused.gif';
import thinking from './assets/Thinking.gif';

let computerInput;
let shielded = false;
let doubleDmg = false;
let enemyHealth = 100;
let playerHealth = 100;

const checkElement = setInterval(() => {
    const element = document.getElementById("StartGameButton");
    if (element) {
        element.addEventListener("click", () => {
            chooseMove();
        });
        clearInterval(checkElement); // stop checking after the element is found
    }
}, 1000); // check every 1000 milliseconds (1 second)

function chooseMove(){
    const move = ["rock", "paper", "scissors"];
    computerInput = move[Math.floor(Math.random() * 3)];
    console.log(computerInput);
    setTimeout(() => {
        document.getElementById("enemyFace").src = thinking;
    },500)
}

export function UserInput(move){
        // background animation cards
    document.getElementById("enemyCard").classList.remove("rock");
    document.getElementById("enemyCard").classList.remove("paper");
    document.getElementById("enemyCard").classList.remove("scissors");
    document.getElementById("enemyCardLose").classList.remove("rock");
    document.getElementById("enemyCardLose").classList.remove("paper");
    document.getElementById("enemyCardLose").classList.remove("scissors");
    document.getElementById("enemyCardShield").classList.remove("rock");
    document.getElementById("enemyCardShield").classList.remove("paper");
    document.getElementById("enemyCardShield").classList.remove("scissors");

    if(computerInput === "rock"){
        document.getElementById("enemyCard").classList.add("rock");
        document.getElementById("enemyCardLose").classList.add("rock");
        document.getElementById("enemyCardShield").classList.add("rock");
    }
    else if(computerInput === "paper"){
        document.getElementById("enemyCard").classList.add("paper");
        document.getElementById("enemyCardLose").classList.add("paper");
        document.getElementById("enemyCardShield").classList.add("paper");
    }
    else if(computerInput === "scissors"){
        document.getElementById("enemyCard").classList.add("scissors");
        document.getElementById("enemyCardLose").classList.add("scissors");
        document.getElementById("enemyCardShield").classList.add("scissors");
    }

    document.getElementById("playerCard").classList.add(move);
    document.getElementById("playerCardLose").classList.add(move);
    document.getElementById("playerCardShield").classList.add(move);
    setTimeout(() => {
        document.getElementById("playerCard").classList.remove(move);
        document.getElementById("playerCardLose").classList.remove(move);
        document.getElementById("playerCardShield").classList.remove(move);
    },3900)
    
    // decide who wins

    let result;
    if(computerInput === move){
        result = "It's a tie!";
    }
    else if(computerInput === "rock" && move === "paper"){
        result = "You win!";
    }
    else if(computerInput === "rock" && move === "scissors"){
        result = "You lose!";
    }
    else if(computerInput === "paper" && move === "rock"){
        result = "You lose!";
    }
    else if(computerInput === "paper" && move === "scissors"){
        result = "You win!";
    }
    else if(computerInput === "scissors" && move === "rock"){
        result = "You win!";
    }
    else if(computerInput === "scissors" && move === "paper"){
        result = "You lose!";
    }

    if(result == "You lose!"){
        getDamage(-1);
        document.getElementById("animationStarterLose").style.display = "block";
        setTimeout(() => {
            document.getElementById("animationStarterLose").style.display = "none";
        },3900)
    }
    else if(result == "You win!"){
        getDamage(1);
        document.getElementById("animationStarterWin").style.display = "block";
        setTimeout(() => {
            document.getElementById("animationStarterWin").style.display = "none";
        },3900)
    }
    else if(result == "It's a tie!"){
        getDamage(0);
        document.getElementById("animationStarterShield").style.display = "block";
        setTimeout(() => {
            document.getElementById("animationStarterShield").style.display = "none";
        },3900)
    }

    setTimeout(() => {
        result = "";
    }, 1000);
}

function getDamage(damage) {
    document.getElementById("animationBackground").scrollIntoView({behavior: "smooth"})
    setTimeout(() => {
        document.getElementById("bg").scrollIntoView({behavior: "smooth"})
    },3900)

    if(doubleDmg){
        damage *= 2;
    }
    else{
        damage = damage;
    }

    if(damage > 0){
        console.log("you dealt " + damage + " damage to the enemy");
        roundSwitch("win");
    }
    else if(damage < 0){
        if(shielded){
            console.log("you were shielded from the enemy's attack");
            roundSwitch("lose");
        }
        else{
            console.log("you took " + Math.abs(damage) + " damage from the enemy");
            roundSwitch("lose");
        }
    }
    else{
        console.log("no damage was dealt");
        roundSwitch("tie");
    }

    damage = 0;
}

function roundSwitch(result){
    let healthBar = document.getElementById("healthBar");
    let playerHealthBar = document.getElementById("playerHealthBar");

    if(result === "lose"){
        if(!shielded){
            document.getElementById("enemyFace").src = happy;
            if(doubleDmg){
                playerHealth -= 40;
            }
            else{
                playerHealth -= 20;
            }

            playerHealthBar.style.width = playerHealth + "%";
        }
        else{
            document.getElementById("enemyFace").src = angry;
            console.log("shielded from damage");
        }
        
        powerUpChooser();
    }
    else if(result === "win"){
        document.getElementById("enemyFace").src = angry;
        if(doubleDmg) {
            enemyHealth -= 40;
        }
        else{
            enemyHealth -= 20;
        }

        healthBar.style.width = enemyHealth + "%";
        console.log("enemy health: " + enemyHealth);
    }
    else if(result === "tie"){
        document.getElementById("enemyFace").src = sad;
    }

    if(enemyHealth <= 0){
        alert("You win!");
    }

    if(playerHealth <= 0){
        alert("You lose!");
    }

    chooseMove();

    setTimeout(() => {
        shielded = false;
        doubleDmg = false;

        console.log("all powerups are false");
    },1000)

    //max 12 power-ups
}

function powerUpChooser(){
    let powerUpArray = ["Double", "Shield", "Heal"];
    let powerUpType = powerUpArray[Math.floor(Math.random() * 3)];

    const powerUp = document.createElement("button");

    if(powerUpType === "Double"){
        powerUp.id = "double";
        powerUp.addEventListener("click", () => {
            if(doubleDmg == false){
                doubleDamage();
                powerUp.style.display = "none";
            }
        });
    }
    else if(powerUpType === "Shield"){
        powerUp.id = "shield";
        powerUp.addEventListener("click", () => {
            if(shielded == false){
                shield();
                powerUp.style.display = "none";
            }
        });
    }
    else if(powerUpType === "Heal"){
        powerUp.id = "heal";
        powerUp.addEventListener("click", () => {
            heal();
            powerUp.style.display = "none";
        });
    }

    powerUp.className = "power-up";
    document.getElementById("powerUpTable").appendChild(powerUp);
}

function doubleDamage(){
    console.log("double damage power-up activated");
    doubleDmg = true;
}

function shield(){
    console.log("shield power-up activated");
    shielded = true;
}

function heal(){
    console.log("heal power-up activated");
    playerHealth += 20;
    document.getElementById("playerHealthBar").style.width = playerHealth + "%";
    //add heal logic
}