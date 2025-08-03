// src/data/bosses.js

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const bossesOriginal = [
  {
    name: "Chill Penguin",
    weakness: "Fire Wave",
    power: "Shotgun Ice",
    defeated: false,
    hp: 100,
    pic:"/images/chill.jpg",
    powerColor: "cyan-400" 
  },
  {
    name: "Spark Mandrill",
    weakness: "Shotgun Ice",
    power: "Electric Spark",
    defeated: false,
    hp: 100,
    pic:'/images/spark.jpg',
    powerColor: "yellow-500" 
  },
  {
    name: "Armored Armadillo",
    weakness: "Electric Spark",
    power: "Rolling Shield",
    defeated: false,
    hp: 100,
    pic:'/images/armored.jpg',
    powerColor: "orange-400" 
  },
  {
    name: "Launch Octopus",
    weakness: "Rolling Shield",
    power: "Homing Torpedo",
    defeated: false,
    hp: 100,
    pic:'/images/launch.jpg',
    powerColor: "blue-500" 
  },
  {
    name: "Boomer Kuwanger",
    weakness: "Homing Torpedo",
    power: "Boomerang Cutter",
    defeated: false,
    hp: 100,
    pic:'/images/boomer.jpg',
    powerColor: "fuchsia-600"
  },
  {
    name: "Sting Chameleon",
    weakness: "Boomerang Cutter",
    power: "Chameleon Sting",
    defeated: false,
    hp: 100,
    pic:'/images/sting.jpg',
    powerColor: "lime-500"
  },
  {
    name: "Storm Eagle",
    weakness: "Chameleon Sting",
    power: "Storm Tornado",
    defeated: false,
    hp: 100,
    pic:'/images/storm.jpg',
    powerColor: "sky-400" 
  },
  {
    name: "Flame Mammoth",
    weakness: "Storm Tornado",
    power: "Fire Wave",
    defeated: false,
    hp: 100,
    pic:'/images/flame.jpg',
    powerColor: "red-500" 
  },
];

export const bosses = shuffle([...bossesOriginal]);
