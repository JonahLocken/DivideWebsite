function randomCharacter() {
  // races and classes are the possible options for those selections
  const races = [
    "Amphallion",
    "Amaldon",
    "Arthryx",
    "Draekyn",
    "Esiish",
    "Oshssi",
    "Rreshk",
    "Golariin",
    "Mastodon",
    "Saygren",
    "Skrallion",
    "Aevys",
    "Falkys",
    "Nhevys",
    "Olaerys",
    "Fen",
    "Gobrilden",
    "Haalfer",
    "Vayl Dwarf",
    "Mountain Dwarf",
    "Embr Dwarf",
    "Human",
    "Hyrikar",
    "Whidikar",
    "Vesikar",
    "Satyr",
    "Ork",
    "Embryn",
    "Iceryn",
    "Erthyn",
    "Bograaz",
    "Floraaz",
    "Silvaraaz",
    "Darkborn",
    "Dark Undead",
  ];
  const classes = [
    "Alchemist",
    "Bard",
    "Celritter",
    "Cleric",
    "Druid",
    "Mage",
    "Monk",
    "Raider",
    "Ranger",
    "Rogue",
    "Shaman",
    "Soldier",
    "Vindicator",
    "Warlock",
  ];
  const classToSubtree = {
    Alchemist: ["Tree: Apothecary", "Tree: Noxious", "Tree: Plague Doctor"],
    Bard: ["Tree: Manipulation", "Tree: Martial", "Tree: Mending"],
    Celritter: ["Tree: Duskblade", "Tree: Moonblade", "Tree: Sunblade"],
    Cleric: ["Tree: Bastion", "Tree: Holy", "Tree: Restoration"],
    Druid: ["Tree: Growth", "Tree: Savagery", "Tree: Subtlety"],
    Mage: ["Tree: Arcane", "Tree: Fire", "Tree: Frost"],
    Monk: [
      "Tree: School of Haikdo",
      "Tree: School of Kar' Ahki",
      "Tree: School of Szarice",
    ],
    Raider: ["Tree: Arms Master", "Tree: Berserker", "Tree: Gladiator"],
    Ranger: ["Tree: Beast Master", "Tree: Duskwalker", "Tree: Galerunner"],
    Rogue: ["Tree: Bladedancer", "Tree: Trickster", "Tree: Void Walker"],
    Shaman: ["Tree: Earthen", "Tree: Storm", "Tree: Tidal"],
    Soldier: ["Tree: Battle Born", "Tree: Tempest", "Tree: Vanguard"],
    Vindicator: ["Tree: Scourgeborne", "Tree: Voidborne", "Tree: Bleakborne"],
    Warlock: ["Tree: Affliction", "Tree: Evoker", "Tree: Voidblade"],
  };

  const name = "Char_" + Math.floor(Math.random() * 10000); // random name
  const height = Math.floor(Math.random() * 100) + 50; // random height between 50 and 150
  const weight = Math.floor(Math.random() * 100) + 50; // random weight between 50 and 150
  const race = races[Math.floor(Math.random() * races.length)]; // random race
  const characterClass = classes[Math.floor(Math.random() * classes.length)]; // random class
  const subtree =
    classToSubtree[characterClass][
      Math.floor(Math.random() * classToSubtree[characterClass].length)
    ]; // random subclass from the selected class

  let stats = {
    constitution: 0,
    strength: 0,
    dexterity: 0,
    charisma: 0,
    intellect: 0,
    wisdom: 0,
  };

  let remainingStatPoints = 11;

  while (remainingStatPoints > 0) {
    let statNames = Object.keys(stats); // Create an array of stat names
    let randomStat = statNames[Math.floor(Math.random() * statNames.length)]; // Select a random stat

    if (stats[randomStat] < 3) {
      // Only increment if the stat is less than 3
      stats[randomStat]++;
      remainingStatPoints--;
    }
  }

  let constitution = stats.constitution;
  let strength = stats.strength;
  let dexterity = stats.dexterity;
  let charisma = stats.charisma;
  let intellect = stats.intellect;
  let wisdom = stats.wisdom;

  // set the values in the form
  document.getElementById("name").value = name;
  document.getElementById("height").value = height;
  document.getElementById("weight").value = weight;
  document.getElementById("race").value = race;
  document.getElementById("characterClass").value = characterClass;
  let option = document.createElement("option");
  option.text = subtree;
  option.value = subtree;

  // Add the option to the select element
  let select = document.getElementById("subtree");
  select.appendChild(option);

  document.getElementById("constitution").value = constitution;
  document.getElementById("strength").value = strength;
  document.getElementById("dexterity").value = dexterity;
  document.getElementById("charisma").value = charisma;
  document.getElementById("intellect").value = intellect;
  document.getElementById("wisdom").value = wisdom;
}
