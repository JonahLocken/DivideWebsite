const indexWhereAttributesStart = 6;
const indexWhereLastAttributeEnds = 12;

const validateName = () => {
  const nameInput = document.getElementById("name");
  const name = nameInput.value;
  const nameError = document.getElementById("nameError");

  if (!/^[A-Z][a-zA-Z]*$/.test(name)) {
    nameError.textContent = "Character name must start with a capital letter.";
    return false;
  } else {
    nameError.textContent = ""; // Clear error message
    return true;
  }
};

const validateRace = () => {
  const raceInput = document.getElementById("race");
  const race = raceInput.value;
  const raceError = document.getElementById("raceError");
  const validRaces = [
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

  if (!validRaces.includes(race)) {
    raceError.textContent = "invalid race.";
    return false;
  } else {
    raceError.textContent = ""; // Clear error message
    return true;
  }
};

const validateClass = () => {
  const classInput = document.getElementById("characterClass");
  const characterClass = classInput.value;
  const classError = document.getElementById("classError");
  const validClasses = [
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

  if (!validClasses.includes(characterClass)) {
    classError.textContent = "Invalid Character Class.";
    return false;
  } else {
    classError.textContent = ""; // Clear error message
    return true;
  }
};

const validateInputGroup = (groupIndex) => {
  if (!validateEmptyInput(groupIndex)) {
    return false;
  }
  switch (groupIndex) {
    case 0:
      return validateName();
    case 1:
      return validateRace();
    case 2:
      return validateClass();
    default:
      if (
        groupIndex >= indexWhereAttributesStart &&
        groupIndex <= indexWhereLastAttributeEnds
      ) {
        return validateAttributes();
      } else {
        return true;
      }
  }
};

window.onload = function () {
  const inputGroups = document.querySelectorAll(".input-group");
  const nextButton = document.getElementById("nextButton");
  const backButton = document.getElementById("backButton");
  document.getElementById("submitButton").style.display = "none";

  for (let i = 1; i < inputGroups.length; i++) {
    inputGroups[i].style.display = "none";
  }

  document.getElementById("pointsRemaining").style.display = "none";
  document.getElementById("pointsError").style.display = "none"; // Hide the pointsError initially

  let currentGroupIndex = 0;

  backButton.style.display = "none";

  nextButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Get the generic error element for the form
    const noInputError = document.getElementById("noInputError");

    if (
      !validateInputGroup(currentGroupIndex) ||
      !validateEmptyInput(currentGroupIndex)
    ) {
      noInputError.textContent = "\n Must have input \n";
      noInputError.style.display = "block";
      return;
    } else {
      noInputError.textContent = "";
      noInputError.style.display = "none";
    }

    inputGroups[currentGroupIndex].style.display = "none";
    currentGroupIndex++;

    if (currentGroupIndex < inputGroups.length) {
      inputGroups[currentGroupIndex].style.display = "block";
    }

    backButton.style.display = "block";

    if (
      currentGroupIndex >= indexWhereAttributesStart &&
      currentGroupIndex <= indexWhereLastAttributeEnds
    ) {
      document.getElementById("pointsRemaining").style.display = "block";
      updatePoints();
    } else {
      document.getElementById("pointsRemaining").style.display = "none";
    }

    // Change this line
    if (currentGroupIndex === inputGroups.length) {
      document.getElementById("submitButton").style.display = "block";
      nextButton.style.display = "none";
    }
  });

  backButton.addEventListener("click", (event) => {
    event.preventDefault();

    inputGroups[currentGroupIndex].style.display = "none";
    currentGroupIndex--;

    if (currentGroupIndex >= 0) {
      inputGroups[currentGroupIndex].style.display = "block";
    }

    if (currentGroupIndex === 0) {
      backButton.style.display = "none";
    }

    if (currentGroupIndex === inputGroups.length - 2) {
      nextButton.style.display = "block";
      document.getElementById("submitButton").style.display = "none";
    }

    if (
      currentGroupIndex >= indexWhereAttributesStart &&
      currentGroupIndex <= indexWhereLastAttributeEnds
    ) {
      document.getElementById("pointsRemaining").style.display = "block";
      updatePoints();
    } else {
      document.getElementById("pointsRemaining").style.display = "none";
    }
  });

  const updatePoints = () => {
    const fields = [
      "constitution",
      "strength",
      "dexterity",
      "charisma",
      "intellect",
      "wisdom",
    ];
    let totalPoints = 0;
    for (let field of fields) {
      let inputElement = document.getElementById(field);
      let inputValue = parseInt(inputElement.value, 10);
      if (inputValue > inputElement.max) {
        inputValue = inputElement.max;
        inputElement.value = inputValue;
      }
      totalPoints += inputValue || 0;
    }
    let remainingPoints = 11 - totalPoints;
    document.getElementById("pointsValue").textContent = remainingPoints;

    const pointsError = document.getElementById("pointsError");
    pointsError.style.display = "none"; // Hide the pointsError initially
    if (remainingPoints < 0) {
      pointsError.textContent =
        "You have allocated more than the available points.";
      pointsError.style.display = "block";
    } else {
      pointsError.textContent = "";
    }
  };

  for (let field of [
    "constitution",
    "strength",
    "dexterity",
    "charisma",
    "intellect",
    "wisdom",
  ]) {
    document.getElementById(field).addEventListener("change", updatePoints);
  }

  const validateInputGroup = (groupIndex) => {
    if (
      groupIndex < indexWhereAttributesStart ||
      groupIndex > indexWhereLastAttributeEnds
    ) {
      return true;
    }

    const inputElements = inputGroups[groupIndex].getElementsByTagName("input");
    const pointsError = document.getElementById("pointsError");
    pointsError.style.display = "none"; // Hide the pointsError initially

    for (let element of inputElements) {
      const value = parseInt(element.value, 10);
      if (isNaN(value) || value < 0 || value > 3) {
        pointsError.textContent =
          "All fields must contain a number between 0 and 3.";
        pointsError.style.display = "block";
        return false;
      }
    }

    const remainingPoints = parseInt(
      document.getElementById("pointsValue").textContent,
      10
    );
    if (remainingPoints < 0) {
      pointsError.textContent =
        "You have allocated more than the available points.";
      pointsError.style.display = "block";
      return false;
    }

    return true;
  };

  const validateEmptyInput = (groupIndex) => {
    const inputGroup = inputGroups[groupIndex];
    const inputs = inputGroup.querySelectorAll("input, select");

    for (let input of inputs) {
      if (!input.value.trim()) {
        return false;
      }
    }

    return true;
  };

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

  document.getElementById("characterClass").addEventListener("change", (e) => {
    const characterClass = e.target.value;
    const subclassSelect = document.getElementById("subtree");
    subclassSelect.innerHTML = ""; // Clear current options

    if (characterClass in classToSubtree) {
      const options = classToSubtree[characterClass];
      for (let option of options) {
        let opt = document.createElement("option");
        opt.value = option;
        opt.textContent = option;
        subclassSelect.appendChild(opt);
      }
    }
  });
};
