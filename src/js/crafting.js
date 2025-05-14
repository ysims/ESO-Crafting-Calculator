var showUnavailable = false;
if (window.location.href.indexOf("?su=1") > 0)
  showUnavailable = true;



function CraftableObject(name, levels, type, partType, materialType, traitsNotKnown)
{
  this.name = name;
  this.levels = levels;
  this.type = type;                       // armor, weapon
  this.partType = partType;               // sword, legs, Staff, etc.
  this.materialType = materialType;
  this.traitsNotKnown = traitsNotKnown;
}

CraftableObject.prototype = {
  name : null,
  levels : null,
  type : null,
  partType : null,
  materialType : null,
  traitsNotKnown : null
}


function MaterialLevel(level, materialName, count)
{
  this.level = level;
  this.materialName = materialName;
  this.count = count;
}

MaterialLevel.prototype = {
  level : null,
  materialName : null,
  count : null
}

function Style(name, material)
{
  this.name = name;
  this.material = material;
}

function Style(name, material,description)
{
  this.name = name;
  this.material = material;
  this.description = description;
}


Style.prototype = {
  name : null,
  material : null,
  description : null
}

function Trait(name, material,description)
{
  this.name = name;
  this.material = material;
  this.description = description;
}

Trait.prototype = {
  name : null,
  material : null
}

function ImprovementLevel(name, materialCount)
{
  this.name = name;
  this.materialCount = materialCount;
}

ImprovementLevel.prototype = {
  name : null,
  materialCount : null
}

/*
 * if negateList is true, partList represents all the parts NOT known.
 */
function StylePartsKnown(styleName, allPartsKnown, partsList, negateList)
{
  this.styleName = styleName;
  this.allPartsKnown = allPartsKnown;
  this.partsList = partsList;
  this.negateList = negateList;
}

StylePartsKnown.prototype = {
  styleName : null,
  allPartsKnown : null,
  partsList : null,
  negateList : null
}

var levelArray = [ "1", "4", "6", "8", "10", "12", "14", "16", "18", "20", "22", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46", "48", "50", "CP10", "CP20", "CP30", "CP40", "CP50", "CP60", "CP70", "CP80", "CP90", "CP100", "CP110", "CP120", "CP130", "CP140", "CP150", "CP160"];

var setArray = [ 
  "No set",
  "Adept Rider",
  "Aetherial Ascension",
  "Alessia's Bulwark",
  "Ancient Dragonguard",
  "Arena", // Shortname for "Way of the Arena"
  "Armor Master",
  "Armor of the Seducer",
  "Ashen Grip",
  "Assassin's Guile",
  "Chimera's Rebuke",
  "Claw of the Forest Wraith",
  "Clever Alchemist",
  "Coldharbour's Favorite",
  "Critical Riposte",
  "Daedric Trickery",
  "Daring Corsair",
  "Dauntless Combatant",
  "Deadlands Demolisher",
  "Death's Wind",
  "Diamond's Victory",
  "Dragon's Appetite",
  "Druid's Braid",
  "Eternal Hunt",
  "Eyes of Mara",
  "Fortified Brass",
  "Grave-Stake Collector",
  "Heartland Conqueror",
  "Highland Sentinel",
  "Hist Bark",
  "Hist Whisperer",
  "Hunding's Rage",
  "Innate Axiom",
  "Iron Flask",
  "Kagrenac's Hope",
  "Kvatch Gladiator",
  "Law of Julianos",
  "Legacy of Karth",
  "Magnus's Gift",
  "Mechanical Acuity",
  "Might of the Lost Legion",
  "Morkuldin",
  "Naga Shaman",
  "New Moon Acolyte",
  "Night Mother's Gaze",
  "Night's Silence",
  "Noble's Conquest",
  "Nocturnal's Favor",
  "Oblivion's Foe",
  "Old Growth Brewer",
  "Order's Wrath",
  "Orgnum's Scales",
  "Pelinal's Aptitude",
  "Red Eagle's Fury",
  "Redistributor",
  "Seducer", // Shortname for "Armor of the Seducer"
  "Seeker Synthesis",
  "Senche-raht's Grit",
  "Serpent's Disdain",
  "Shacklebreaker",
  "Shalidor's Curse",
  "Shattered Fate",
  "Sload's Semblance",
  "Song of Lamae",
  "Spectre's Eye",
  "Spell Parasite",
  "Stuhn's Favor",
  "Tava's Favor",
  "Telvanni Efficiency",
  "Tharriker's Strike",
  "Threads of War",
  "Torug's Pact",
  "Trial by Fire",
  "Twice-born Star",
  "Twilight's Embrace",
  "Unchained Aggressor",
  "Vampire's Kiss",
  "Varen's Legacy",
  "Vastarie's Tutelage",
  "Way of the Arena",
  "Whitestrake's Retribution",
  "Willow's Path",
  "Wretched Vitality"
  ];

var styleArray = [];
styleArray.push(new Style("Any", "Any"));
styleArray.push(new Style("Abah's Watch", "Polished Shilling"));
styleArray.push(new Style("Akaviri", "Goldscale"));
styleArray.push(new Style("Aldmeri Dominion", "Eagle Feather"));
styleArray.push(new Style("Altmer", "Adamantite"));
styleArray.push(new Style("Ancestral High Elf", "Etched Adamantite"));
styleArray.push(new Style("Ancestral Nord", "Etched Corundum"));
styleArray.push(new Style("Ancestral Orc", "Etched Manganese"));
styleArray.push(new Style("Ancestral Reach", "Etched Bronze"));
styleArray.push(new Style("Ancient Elf", "Palladium"));
styleArray.push(new Style("Ancient Orc", "Cassiterite"));
styleArray.push(new Style("Anequina", "Shimmering Sand"));
styleArray.push(new Style("Apostle", "Polished Brass"));
styleArray.push(new Style("Argonian", "Flint"));
styleArray.push(new Style("Arkthzand Armory", "Arkthzand Sprocket"));
styleArray.push(new Style("Ashlander", "Ash Canvas"));
styleArray.push(new Style("Assassins League", "Tainted Blood"));
styleArray.push(new Style("Barbaric", "Copper"));
styleArray.push(new Style("Blackreach Vanguard", "Gloomspore Chitin"));
styleArray.push(new Style("Bloodforge", "Bloodroot Flux"));
styleArray.push(new Style("Bosmer", "Bone"));
styleArray.push(new Style("Breton", "Molybdenum"));
styleArray.push(new Style("Buoyant Armiger", "Volcant Viridian"));
styleArray.push(new Style("Celestial", "Star Sapphire"));
styleArray.push(new Style("Coldsnap Goblin", "Goblin-Cloth Scrap"));
styleArray.push(new Style("Daedric", "Daedra Heart"));
styleArray.push(new Style("Daggerfall Covenant", "Lion Fang"));
styleArray.push(new Style("Dark Brotherhood", "Black Beeswax"));
styleArray.push(new Style("Dead-Water", "Crocodile Leather"));
styleArray.push(new Style("Draugr", "Pristine Shroud"));
styleArray.push(new Style("Dragonguard", "Gilding Salts"));
styleArray.push(new Style("Dreadhorn", "Minotaur Bezoar"));
styleArray.push(new Style("Dremora", "Warrior's Heart Ashes"));
styleArray.push(new Style("Dro-M'athra", "Defiled Whiskers"));
styleArray.push(new Style("Dunmer", "Obsidian"));
styleArray.push(new Style("Dwemer", "Dwemer Frame"));
styleArray.push(new Style("Ebonheart Pact", "Dragon Scute"));
styleArray.push(new Style("Ebonshadow", "Tenebrous Cord"));
styleArray.push(new Style("Ebony", "Night Pumice"));
styleArray.push(new Style("Elder Argonian", "Hackwing Plumage"));
styleArray.push(new Style("Fang Lair", "Dragon Bone"));
styleArray.push(new Style("Frostcaster", "Stalhrim"));
styleArray.push(new Style("Glass", "Malachite"));
styleArray.push(new Style("Grim Harlequin", "Grinstone"));
styleArray.push(new Style("Hazardous Alchemy", "Viridian Phial"));
styleArray.push(new Style("Hlaalu", "Bonemold Resin"));
styleArray.push(new Style("Hollowjack", "Amber Marble"));
styleArray.push(new Style("Honor Guard", "Read Diamond Seals"));
styleArray.push(new Style("Huntsman", "Bloodscent Dew"));
styleArray.push(new Style("Icereach Coven", "Fryse Willow"));
styleArray.push(new Style("Imperial", "Nickel"));
styleArray.push(new Style("Khajiit", "Moonstone"));
styleArray.push(new Style("Malacath", "Potash"));
styleArray.push(new Style("Mazzatun", "Leviathan Scrimshaw"));
styleArray.push(new Style("Mercenary", "Laurel"));
styleArray.push(new Style("Meridian", "Auroran Dust"));
styleArray.push(new Style("Militant Ordinator", "Lustrous Sphalerite"));
styleArray.push(new Style("Minotaur", "Oxblood Fungus"));
styleArray.push(new Style("Morag Tong", "Boiled Carapace"));
styleArray.push(new Style("Nord", "Corundum"));
styleArray.push(new Style("Orc", "Manganese"));
styleArray.push(new Style("Order Of The Hour", "Pearl Sand"));
styleArray.push(new Style("Outlaw", "Rogue's Soot"));
styleArray.push(new Style("Pellitine", "Dragonthread"));
styleArray.push(new Style("Primal", "Argentum"));
styleArray.push(new Style("Psijic Order", "Vitrified Malondo"));
styleArray.push(new Style("Pyandorean", "Sea Serpent Hide"));
styleArray.push(new Style("Pyre Watch", "Consecrated Myrrh"));
styleArray.push(new Style("Ra Gada", "Ancient Sandstone"));
styleArray.push(new Style("Redguard", "Starmetal"));
styleArray.push(new Style("Redoran", "Polished Scarab Elytra"));
styleArray.push(new Style("Refabricated", "Polished Rivets"));
styleArray.push(new Style("Sapiarch", "Culanda Lacquer"));
styleArray.push(new Style("Scalecaller", "Infected Flesh"));
styleArray.push(new Style("Sea Giant", "Sea Snake Fang"));
styleArray.push(new Style("Shield Of Senchal", "Carmine Shieldsilk"));
styleArray.push(new Style("Silken Ring", "Distilled Slowsilver"));
styleArray.push(new Style("Silver Dawn", "Argent Pelts"));
styleArray.push(new Style("Skinchanger", "Wolfsbane Incense"));
styleArray.push(new Style("Soul-Shriven", "Azure Plasm"));
styleArray.push(new Style("Stalhrim", "Stalhrim Shard"));
styleArray.push(new Style("Sunspire", "Frost Embers"));
styleArray.push(new Style("Telvanni", "Wrought Ferrofungus"));
styleArray.push(new Style("Thorn Legion", "Thorn Sigil"));
styleArray.push(new Style("Thieves Guild", "Fine Chalk"));
styleArray.push(new Style("Trinimac", "Auric Tusk"));
styleArray.push(new Style("Tsaesci", "Snake Fang"));
styleArray.push(new Style("Welkynar", "Gryphon Plume"));
styleArray.push(new Style("Worm Cult", "Desecrated Grave Soil"));
styleArray.push(new Style("Xivkyn", "Charcoal Of Remorse"));
styleArray.push(new Style("Yokundan", "Ferrous Salts"));

var armorTraitArray = [];
armorTraitArray.push(new Style("None", ""));
armorTraitArray.push(new Style("Divines", "Sapphire" , "Increases Mundus Stone effects by X"));
armorTraitArray.push(new Style("Impenetrable", "Diamond", "Reduces item's durability damage 50%. Increases Critical Resistance (amount scales on gear's level)"));
armorTraitArray.push(new Style("Infused", "Bloodstone", "Increase Armor Enchantment effect by X"));
armorTraitArray.push(new Style("Invigorating", "Garnet","Increases Magicka, Stamina and Health Recovery by X"));
armorTraitArray.push(new Style("Nirnhoned", "Fortified Nirncrux", "Increases Spell Resistance/Physical Resistance by X"));
armorTraitArray.push(new Style("Reinforced", "Sardonyx", "Increases this item's Armor value by X"));
armorTraitArray.push(new Style("Sturdy", "Quartz", "Reduces Block cost by X"));
armorTraitArray.push(new Style("Training", "Emerald", "Increases experience gained from kills by X"));
armorTraitArray.push(new Style("Well-Fitted", "Almandine", "Reduces the cost of Roll Dodge and Sprint"));

var weaponTraitArray = [];
weaponTraitArray.push(new Style("None", ""));
weaponTraitArray.push(new Style("Charged", "Amethyst", "Increases chance to apply Status Effects by X"));
weaponTraitArray.push(new Style("Decisive", "Citrine", "Chance to gain 1 additional Ultimate anytime that Ultimate is gained"));
weaponTraitArray.push(new Style("Defending", "Turquoise", "Increases total Armor/Armor Penetration (scales with gear level) by X"));
weaponTraitArray.push(new Style("Infused", "Jade", "Reduces enchantment's cooldown by 50% Increase Weapon Enchantment effect by a %"));
weaponTraitArray.push(new Style("Nirnhoned", "Potent Nirncrux", "Increases Weapon Damage"));
weaponTraitArray.push(new Style("Powered", "Chysolite", "Increases healing done by X"));
weaponTraitArray.push(new Style("Precise", "Ruby", "Increase Weapon and Spell Critical values by X & Y"));
weaponTraitArray.push(new Style("Sharpened", "Fire Opal", "Increase Armor and Spell Penetration (scales with gear level) by X & Y"));
weaponTraitArray.push(new Style("Training", "Carnelian", "Increases experience gained from kills by X"));

var jewelryTraitArray = [];
jewelryTraitArray.push(new Style("None", ""));
jewelryTraitArray.push(new Style("Arcane", "Cobalt", "Increases Maximum Magicka by X"));
jewelryTraitArray.push(new Style("Bloodthirsty", "Slaughterstone", "This trait grants up to 350 Weapon and Spell Damage against targets under 90% Health, scaling linearly per 1% missing Health"));
jewelryTraitArray.push(new Style("Harmony", "Dibellium", "Increases damage, healing, resource restore, and damage shield strength of synergies you activate by X"));
jewelryTraitArray.push(new Style("Healthy", "Antimony", "Increases Maximum Health by X"));
jewelryTraitArray.push(new Style("Infused", "Aurbic Amber", "Increases jewelry enchantment effectiveness by X"));
jewelryTraitArray.push(new Style("Protective", "Titanium", "Increases Spell Resistance and Physical Resistance by X"));
jewelryTraitArray.push(new Style("Robust", "Zinc", "Increases Maximum Stamina by X"));
jewelryTraitArray.push(new Style("Swift", "Gilding Wax", "Increases Movement Speed by X"));
jewelryTraitArray.push(new Style("Triune", "Dawn-Prism", "Increases Health, Magicka and Stamina by X"));

var enchantTraitArray = [];
enchantTraitArray.push(new Style("None", ""));

var improvementLevels = [];
improvementLevels.push(new ImprovementLevel("Normal", 0));
improvementLevels.push(new ImprovementLevel("Fine", 2));
improvementLevels.push(new ImprovementLevel("Superior", 3));
improvementLevels.push(new ImprovementLevel("Epic", 4));
improvementLevels.push(new ImprovementLevel("Legendary", 8));

var clothImprovementMats = [ '', 'Hemming', "Embroidery", "Elegant Lining", "Dreugh Wax" ];
var metalImprovementMats = [ '', 'Honing Stone', "Dwarven Oil", "Grain Solvent", "Tempering Alloy" ];
var woodImprovementMats = [ '', 'Pitch', "Turpen", "Mastic", "Rosin" ];
var jewelryImprovementMats = [ '', 'Terne Plating', "Iridium Plating", "Zircon Plating", "Chromium Plating" ];

var woodTypes = ["Sanded Maple", "Sanded Oak", "Sanded Beech", "Sanded Hickory", "Sanded Yew", "Sanded Birch", "Sanded Ash", "Sanded Mahogony", "Sanded Nightwood", "Sanded Ruby Ash"];
var metalTypes = ["Iron Ingots", "Steel Ingots", "Orichalum Ingots", "Dwarven Ingots", "Ebony Ingots", "Calcinium Ingots", "Galatite Ingots", "Quicksilver Ingots", "Voidstone Ingots", "Rubedite Ingots"];
var clothTypes = ["Jute", "Flax", "Cotton", "Spidersilk", "Ebonthread", "Kresh Fiber", "Ironthread", "Silverweave", "Void Cloth", "Ancestor Silk"];
var leatherTypes = ["Rawhide", "Hide", "Leather", "Thick Leather", "Fell Hide", "Topgrain Hide", "Iron Hide", "Superb Hide", "Shadowhide", "Rubedo Leather"];
var jewelryTypes = ["Pewter Ounces", "Copper Ounces", "Silver Ounces", "Electrum Ounces", "Platinum Ounces"];


function populateLevelArray(typeArray, startingValue, level10start)
{
  var levels = [];
  levels.push(new MaterialLevel("1", typeArray[0], startingValue));
  levels.push(new MaterialLevel("4", typeArray[0], startingValue + 1));
  levels.push(new MaterialLevel("6", typeArray[0], startingValue + 2));
  levels.push(new MaterialLevel("8", typeArray[0], startingValue + 3));
  levels.push(new MaterialLevel("10", typeArray[0], startingValue + 4));
  levels.push(new MaterialLevel("12", typeArray[0], startingValue + 5));
  levels.push(new MaterialLevel("14", typeArray[0], startingValue + 6));
  levels.push(new MaterialLevel("16", typeArray[1], startingValue + 1));
  levels.push(new MaterialLevel("18", typeArray[1], startingValue + 2));
  levels.push(new MaterialLevel("20", typeArray[1], startingValue + 3));
  levels.push(new MaterialLevel("22", typeArray[1], startingValue + 4));
  levels.push(new MaterialLevel("24", typeArray[1], startingValue + 5));
  levels.push(new MaterialLevel("26", typeArray[2], startingValue + 2));
  levels.push(new MaterialLevel("28", typeArray[2], startingValue + 3));
  levels.push(new MaterialLevel("30", typeArray[2], startingValue + 4));
  levels.push(new MaterialLevel("32", typeArray[2], startingValue + 5));
  levels.push(new MaterialLevel("34", typeArray[2], startingValue + 6));
  levels.push(new MaterialLevel("36", typeArray[3], startingValue + 3));
  levels.push(new MaterialLevel("38", typeArray[3], startingValue + 4));
  levels.push(new MaterialLevel("40", typeArray[3], startingValue + 5));
  levels.push(new MaterialLevel("42", typeArray[3], startingValue + 6));
  levels.push(new MaterialLevel("44", typeArray[3], startingValue + 7));
  levels.push(new MaterialLevel("46", typeArray[4], startingValue + 4));
  levels.push(new MaterialLevel("48", typeArray[4], startingValue + 5));
  levels.push(new MaterialLevel("50", typeArray[4], startingValue + 6));
  levels.push(new MaterialLevel("CP10", typeArray[5], startingValue + 5));
  levels.push(new MaterialLevel("CP20", typeArray[5], startingValue + 6));
  levels.push(new MaterialLevel("CP30", typeArray[5], startingValue + 7));
  levels.push(new MaterialLevel("CP40", typeArray[6], startingValue + 6));
  levels.push(new MaterialLevel("CP50", typeArray[6], startingValue + 7));
  levels.push(new MaterialLevel("CP60", typeArray[6], startingValue + 8));
  levels.push(new MaterialLevel("CP70", typeArray[7], startingValue + 7));
  levels.push(new MaterialLevel("CP80", typeArray[7], startingValue + 8));
  levels.push(new MaterialLevel("CP90", typeArray[8], startingValue + 8));
  levels.push(new MaterialLevel("CP100", typeArray[8], startingValue + 9));
  levels.push(new MaterialLevel("CP110", typeArray[8], startingValue + 10));
  levels.push(new MaterialLevel("CP120", typeArray[8], startingValue + 11));
  levels.push(new MaterialLevel("CP130", typeArray[8], startingValue + 12));
  levels.push(new MaterialLevel("CP140", typeArray[8], startingValue + 13));
  levels.push(new MaterialLevel("CP150", typeArray[9], level10start));
  levels.push(new MaterialLevel("CP160", typeArray[9], level10start * 10));
  return levels;
}

function populateRingLevelArray(typeArray)
{
  var levels = [];
  var startingValue = 2;
  levels.push(new MaterialLevel("1", typeArray[0], startingValue));
  levels.push(new MaterialLevel("4", typeArray[0], startingValue + 1));
  levels.push(new MaterialLevel("6", typeArray[0], startingValue + 2));
  levels.push(new MaterialLevel("8", typeArray[0], startingValue + 3));
  levels.push(new MaterialLevel("10", typeArray[0], startingValue + 4));
  levels.push(new MaterialLevel("12", typeArray[0], startingValue + 5));
  levels.push(new MaterialLevel("14", typeArray[0], startingValue + 6));
  levels.push(new MaterialLevel("16", typeArray[0], startingValue + 7));
  levels.push(new MaterialLevel("18", typeArray[0], startingValue + 8));
  levels.push(new MaterialLevel("20", typeArray[0], startingValue + 9));
  levels.push(new MaterialLevel("22", typeArray[0], startingValue + 10));
  levels.push(new MaterialLevel("24", typeArray[0], startingValue + 11));
  levels.push(new MaterialLevel("26", typeArray[1], startingValue + 1));
  levels.push(new MaterialLevel("28", typeArray[1], startingValue + 2));
  levels.push(new MaterialLevel("30", typeArray[1], startingValue + 3));
  levels.push(new MaterialLevel("32", typeArray[1], startingValue + 4));
  levels.push(new MaterialLevel("34", typeArray[1], startingValue + 5));
  levels.push(new MaterialLevel("36", typeArray[1], startingValue + 6));
  levels.push(new MaterialLevel("38", typeArray[1], startingValue + 7));
  levels.push(new MaterialLevel("40", typeArray[1], startingValue + 8));
  levels.push(new MaterialLevel("42", typeArray[1], startingValue + 9));
  levels.push(new MaterialLevel("44", typeArray[1], startingValue + 10));
  levels.push(new MaterialLevel("46", typeArray[1], startingValue + 11));
  levels.push(new MaterialLevel("48", typeArray[1], startingValue + 12));
  levels.push(new MaterialLevel("50", typeArray[1], startingValue + 13));
  levels.push(new MaterialLevel("CP10", typeArray[2], startingValue + 2));
  levels.push(new MaterialLevel("CP20", typeArray[2], startingValue + 4));
  levels.push(new MaterialLevel("CP30", typeArray[2], startingValue + 6));
  levels.push(new MaterialLevel("CP40", typeArray[2], startingValue + 8));
  levels.push(new MaterialLevel("CP50", typeArray[2], startingValue + 10));
  levels.push(new MaterialLevel("CP60", typeArray[2], startingValue + 12));
  levels.push(new MaterialLevel("CP70", typeArray[2], startingValue + 14));
  levels.push(new MaterialLevel("CP80", typeArray[3], startingValue + 4));
  levels.push(new MaterialLevel("CP90", typeArray[3], startingValue + 6));
  levels.push(new MaterialLevel("CP100", typeArray[3], startingValue + 8));
  levels.push(new MaterialLevel("CP110", typeArray[3], startingValue + 10));
  levels.push(new MaterialLevel("CP120", typeArray[3], startingValue + 12));
  levels.push(new MaterialLevel("CP130", typeArray[3], startingValue + 14));
  levels.push(new MaterialLevel("CP140", typeArray[3], startingValue + 16));
  levels.push(new MaterialLevel("CP150", typeArray[4], 10));
  levels.push(new MaterialLevel("CP160", typeArray[4], 100));
  return levels;
}

function populateNecklaceLevelArray(typeArray)
{
  var levels = [];
  levels.push(new MaterialLevel("1", typeArray[0], 3));
  levels.push(new MaterialLevel("4", typeArray[0], 5));
  levels.push(new MaterialLevel("6", typeArray[0], 6));
  levels.push(new MaterialLevel("8", typeArray[0], 8));
  levels.push(new MaterialLevel("10", typeArray[0], 9));
  levels.push(new MaterialLevel("12", typeArray[0], 11));
  levels.push(new MaterialLevel("14", typeArray[0], 12));
  levels.push(new MaterialLevel("16", typeArray[0], 14));
  levels.push(new MaterialLevel("18", typeArray[0], 15));
  levels.push(new MaterialLevel("20", typeArray[0], 17));
  levels.push(new MaterialLevel("22", typeArray[0], 19));
  levels.push(new MaterialLevel("24", typeArray[0], 20));
  levels.push(new MaterialLevel("26", typeArray[1], 5));
  levels.push(new MaterialLevel("28", typeArray[1], 6));
  levels.push(new MaterialLevel("30", typeArray[1], 8));
  levels.push(new MaterialLevel("32", typeArray[1], 9));
  levels.push(new MaterialLevel("34", typeArray[1], 11));
  levels.push(new MaterialLevel("36", typeArray[1], 12));
  levels.push(new MaterialLevel("38", typeArray[1], 14));
  levels.push(new MaterialLevel("40", typeArray[1], 15));
  levels.push(new MaterialLevel("42", typeArray[1], 17));
  levels.push(new MaterialLevel("44", typeArray[1], 18));
  levels.push(new MaterialLevel("46", typeArray[1], 20));
  levels.push(new MaterialLevel("48", typeArray[1], 21));
  levels.push(new MaterialLevel("50", typeArray[1], 23));
  levels.push(new MaterialLevel("CP10", typeArray[2], 6));
  levels.push(new MaterialLevel("CP20", typeArray[2], 9));
  levels.push(new MaterialLevel("CP30", typeArray[2], 12));
  levels.push(new MaterialLevel("CP40", typeArray[2], 15));
  levels.push(new MaterialLevel("CP50", typeArray[2], 18));
  levels.push(new MaterialLevel("CP60", typeArray[2], 21));
  levels.push(new MaterialLevel("CP70", typeArray[2], 24));
  levels.push(new MaterialLevel("CP80", typeArray[3], 8));
  levels.push(new MaterialLevel("CP90", typeArray[3], 12));
  levels.push(new MaterialLevel("CP100", typeArray[3], 16));
  levels.push(new MaterialLevel("CP110", typeArray[3], 20));
  levels.push(new MaterialLevel("CP120", typeArray[3], 24));
  levels.push(new MaterialLevel("CP130", typeArray[3], 28));
  levels.push(new MaterialLevel("CP140", typeArray[3], 32));
  levels.push(new MaterialLevel("CP150", typeArray[4], 15));
  levels.push(new MaterialLevel("CP160", typeArray[4], 150));
  return levels;
}

/* Weapons */
var woodWeaponLevels = populateLevelArray(woodTypes, 3, 12);
var oneHandLevels = populateLevelArray(metalTypes, 3, 11);
var twoHandLevels = populateLevelArray(metalTypes, 5, 14);
var daggerLevels = populateLevelArray(metalTypes, 2, 10);

var bow = new CraftableObject("Bow", woodWeaponLevels, "weapon", "bow", "wood", []);
var infernoStaff = new CraftableObject("Inferno Staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var iceStaff = new CraftableObject("Ice Staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var lightningStaff = new CraftableObject("Lightning Staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var restorationStaff = new CraftableObject("Restoration Staff", woodWeaponLevels, "weapon", "staff", "wood", []);
var axe = new CraftableObject("Axe (1h)", oneHandLevels, "weapon", "axe", "metal", []);
var mace = new CraftableObject("Mace (1h)", oneHandLevels, "weapon", "mace", "metal", ['Training']);
var sword = new CraftableObject("Sword (1h)", oneHandLevels, "weapon", "sword", "metal", []);
var battleaxe = new CraftableObject("Battle axe (2h)", twoHandLevels, "weapon", "axe", "metal", []);
var maul = new CraftableObject("Maul (2h)", twoHandLevels, "weapon", "mace", "metal", []);
var greatsword = new CraftableObject("Greatsword (2h)", twoHandLevels, "weapon", "sword", "metal", []);
var dagger = new CraftableObject("Dagger", daggerLevels, "weapon", "dagger", "metal", ['Training']);

var weapons = [bow, infernoStaff, iceStaff, lightningStaff, restorationStaff, axe, mace, sword, battleaxe, maul, greatsword, dagger];



/* Armor */

var lightChestLevels = populateLevelArray(clothTypes, 7, 15);
var lightLegsLevels = populateLevelArray(clothTypes, 6, 14);
var light1Levels = populateLevelArray(clothTypes, 5, 13);

var robe = new CraftableObject("Robe", lightChestLevels, "armor", "chest", "cloth", ['Well-fitted']);
var shirt = new CraftableObject("Shirt", lightChestLevels, "armor", "chest", "cloth", ['Well-fitted' ]);
var lightGloves = new CraftableObject("Light Gloves", light1Levels, "armor", "gloves", "cloth", []);
var lightBoots = new CraftableObject("Light Boots", light1Levels, "armor", "boots", "cloth", []);
var lightHelmet = new CraftableObject("Light Helmet", light1Levels, "armor", "helmet", "cloth", []);
var lightShoulders = new CraftableObject("Light Shoulders", light1Levels, "armor", "shoulders", "cloth", []);
var lightWaist = new CraftableObject("Light Waist", light1Levels, "armor", "belt", "cloth", ['Impenetrable']);
var lightLegs = new CraftableObject("Light Legs", lightLegsLevels, "armor", "legs", "cloth", []);

var mediumChestLevels = populateLevelArray(leatherTypes, 7, 15);
var mediumLegsLevels = populateLevelArray(leatherTypes, 6, 14);
var medium1Levels = populateLevelArray(leatherTypes, 5, 13);

var mediumChest = new CraftableObject("Medium Chest", mediumChestLevels, "armor", "chest", "cloth", []);
var mediumGloves = new CraftableObject("Medium Gloves", medium1Levels, "armor", "gloves", "cloth", []);
var mediumBoots = new CraftableObject("Medium Boots", medium1Levels, "armor", "boots", "cloth", []);
var mediumHelmet = new CraftableObject("Medium Helmet", medium1Levels, "armor", "helmet", "cloth", []);
var mediumShoulders = new CraftableObject("Medium Shoulders", medium1Levels, "armor", "shoulders", "cloth", []);
var mediumWaist = new CraftableObject("Medium Waist", medium1Levels, "armor", "belt", "cloth", []);
var mediumLegs = new CraftableObject("Medium Legs", mediumLegsLevels, "armor", "legs", "cloth", []);

var heavyChestLevels = populateLevelArray(metalTypes, 7, 15);
var heavyLegsLevels = populateLevelArray(metalTypes, 6, 14);
var heavy1Levels = populateLevelArray(metalTypes, 5, 13);

var heavyChest = new CraftableObject("Heavy Chest", heavyChestLevels, "armor", "chest", "metal", []);
var heavyGloves = new CraftableObject("Heavy Gloves", heavy1Levels, "armor", "gloves", "metal", []);
var heavyBoots = new CraftableObject("Heavy Boots", heavy1Levels, "armor", "boots", "metal", []);
var heavyHelmet = new CraftableObject("Heavy Helmet", heavy1Levels, "armor", "helmet", "metal", []);
var heavyShoulders = new CraftableObject("Heavy Shoulders", heavy1Levels, "armor", "shoulders", "metal", []);
var heavyWaist = new CraftableObject("Heavy Waist", heavy1Levels, "armor", "belt", "metal", []);
var heavyLegs = new CraftableObject("Heavy Legs", heavyLegsLevels, "armor", "legs", "metal", []);

var shieldLevels = populateLevelArray(woodTypes, 6, 14);
var shield = new CraftableObject("Shield", shieldLevels, "armor", "shield", "wood", ['Prosperous']);

var armor = [robe, shirt, lightHelmet, lightGloves, lightShoulders, lightBoots, lightLegs, lightWaist,
             mediumChest, mediumHelmet, mediumGloves, mediumShoulders, mediumBoots, mediumLegs, mediumWaist,
             heavyChest, heavyHelmet, heavyGloves, heavyShoulders, heavyBoots, heavyLegs, heavyWaist, shield ];



/* Jewelry */
var ring = new CraftableObject("Ring", populateRingLevelArray(jewelryTypes), "jewelry", "ring", "jewelry", []);
var necklace = new CraftableObject("Necklace", populateNecklaceLevelArray(jewelryTypes), "jewelry", "necklace", "jewelry", []);
var jewelry = [ ring, necklace ];




var stylePartsKnownHash = new Object();
stylePartsKnownHash["Abah's Watch"] = new StylePartsKnown("Abah's Watch", true, [], false);
stylePartsKnownHash["Akaviri"] = new StylePartsKnown("Akaviri", true, [], true);
stylePartsKnownHash['Aldmeri Dominion'] = new StylePartsKnown('Aldmeri Dominion', true, [], false);
stylePartsKnownHash['Altmer'] = new StylePartsKnown('Altmer', true, [], true);
stylePartsKnownHash['Ancient Elf'] = new StylePartsKnown('Ancient Elf', true, [], true);
stylePartsKnownHash['Ancient Orc'] = new StylePartsKnown('Ancient Orc', false, [], true);
stylePartsKnownHash['Apostle'] = new StylePartsKnown('Apostle', true, [], true);
stylePartsKnownHash['Argonian'] = new StylePartsKnown('Argonian', true, [], false);
stylePartsKnownHash['Ashlander'] = new StylePartsKnown('Ashlander', true, [], false);
stylePartsKnownHash["Assassins League"] = new StylePartsKnown("Assassins League", true, [], false);
stylePartsKnownHash['Barbaric'] = new StylePartsKnown('Barbaric', true, [], false);
stylePartsKnownHash['Bloodforge'] = new StylePartsKnown('Bloodforge', true, [], false);
stylePartsKnownHash['Bosmer'] = new StylePartsKnown('Bosmer', true, [], false);
stylePartsKnownHash['Breton'] = new StylePartsKnown('Breton', true, [], false);
stylePartsKnownHash['Celestial'] = new StylePartsKnown('Celestial', true, [], false);
stylePartsKnownHash['Daedric'] = new StylePartsKnown('Daedric', true, [], false);
stylePartsKnownHash['Daggerfall Covenant'] = new StylePartsKnown('Daggerfall Covenant', true, [], false);
stylePartsKnownHash['Dark Brotherhood'] = new StylePartsKnown('Dark Brotherhood', true, [], true);
stylePartsKnownHash['Dead-Water'] = new StylePartsKnown('Dead-Water', true, [], false);
stylePartsKnownHash['Draugr'] = new StylePartsKnown('Draugr', true, [], true);
stylePartsKnownHash['Dreadhorn'] = new StylePartsKnown('Dreadhorn', true, [], true);
stylePartsKnownHash['Dremora'] = new StylePartsKnown('Dremora', true, [], true);
stylePartsKnownHash["Dro-m'Athra"] = new StylePartsKnown("Dro-m'Athra", true, [], false);
stylePartsKnownHash['Dunmer'] = new StylePartsKnown('Dunmer', true, [], false);
stylePartsKnownHash['Dwemer'] = new StylePartsKnown('Dwemer', true, [], false);
stylePartsKnownHash['Ebonheart Pact'] = new StylePartsKnown('Ebonheart Pact', true, [], false);
stylePartsKnownHash['Ebonshadow'] = new StylePartsKnown('Ebonshadow', true, [], true);
stylePartsKnownHash['Ebony'] = new StylePartsKnown('Ebony', true, [], true);
stylePartsKnownHash['Elder Argonian'] = new StylePartsKnown('Elder Argonian', true, [], true);
stylePartsKnownHash['Fang Lair'] = new StylePartsKnown('Fang Lair', true, [], false);
stylePartsKnownHash['Glass'] = new StylePartsKnown('Glass', true, [], false);
stylePartsKnownHash['Hlaalu'] = new StylePartsKnown('Hlaalu', true, [], false);
stylePartsKnownHash['Hollowjack'] = new StylePartsKnown('Hollowjack', true, [], false);
stylePartsKnownHash['Imperial'] = new StylePartsKnown('Imperial', true, [], false);
stylePartsKnownHash['Khajiit'] = new StylePartsKnown('Khajiit', true, [], false);
stylePartsKnownHash['Malacath'] = new StylePartsKnown('Malacath', true, [], true);
stylePartsKnownHash['Mazzatun'] = new StylePartsKnown('Mazzatun', true, [], true);
stylePartsKnownHash['Mercenary'] = new StylePartsKnown('Mercenary', true, [], false);
stylePartsKnownHash['Minotaur'] = new StylePartsKnown('Minotaur', true, [], false);
stylePartsKnownHash['Morag Tong'] = new StylePartsKnown('Morag Tong', true, [], false);
stylePartsKnownHash['Nord'] = new StylePartsKnown('Nord', true, [], false);
stylePartsKnownHash['Orc'] = new StylePartsKnown('Orc', true, [], false);
stylePartsKnownHash['Order of the Hour'] = new StylePartsKnown('Order of the Hour', true, [], false);
stylePartsKnownHash['Outlaw'] = new StylePartsKnown('Outlaw', true, [], false);
stylePartsKnownHash['Psijic Order'] = new StylePartsKnown('Psijic Order', true, [], false);
stylePartsKnownHash['Pyandorean'] = new StylePartsKnown('Pyandorean', true, [], false);
stylePartsKnownHash['Primal'] = new StylePartsKnown('Primal', true, [], false);
stylePartsKnownHash['Ra Gada'] = new StylePartsKnown('Ra Gada', true, [], false);
stylePartsKnownHash['Redguard'] = new StylePartsKnown('Redguard', true, [], false);
stylePartsKnownHash['Redoran'] = new StylePartsKnown('Redoran', true, [], false);
stylePartsKnownHash['Sapiarch'] = new StylePartsKnown('Sapiarch', true, [], false);
stylePartsKnownHash['Scalecaller'] = new StylePartsKnown('Scalecaller', true, [], false);
stylePartsKnownHash['Silken Ring'] = new StylePartsKnown('Silken Ring', true, [], false);
stylePartsKnownHash['Skinchanger'] = new StylePartsKnown('Skinchanger', true, [], false);
stylePartsKnownHash['Soul-shriven'] = new StylePartsKnown('Soul-shriven', true, [], false);
stylePartsKnownHash['Telvanni'] = new StylePartsKnown('Telvanni', true, [], true);
stylePartsKnownHash['Thieves Guild'] = new StylePartsKnown('Thieves Guild', true, [], false);
stylePartsKnownHash['Trinimac'] = new StylePartsKnown('Trinimac', true, [], true);
stylePartsKnownHash['Worm Cult'] = new StylePartsKnown('Worm Cult', true, [], false);
stylePartsKnownHash['Xivkyn'] = new StylePartsKnown('Xivkyn', true, [], false);
stylePartsKnownHash["Yokundan"] = new StylePartsKnown("Yokundan", true, [], false);


function populateAllItems()
{
  var idx;
  var MaxItems = $('#craftTable tbody tr').length;
  for (idx = 0; idx < MaxItems; idx++) {
    populateAllItemsForRow(idx);
  }
}

function populateAllItemsForRow(idx)
{
    populateArmorWeaponSelect(idx);
    populateLevels(idx,levelArray);
    populateItemType(idx);
    populateStyles(idx);
    populateTraits(idx, true)
    populateImprovements(idx)
    populateSets(idx);
}

function itemTypeChanged(itemIdx)
{
  populateItemType(itemIdx);
  populateTraits(itemIdx, true);
  populateStyles(itemIdx);
  populateLevels(itemIdx);
  calculateTotalMaterials();
}

function itemChanged(itemIdx)
{
  populateTraits(itemIdx, false);
  populateStyles(itemIdx);
  populateMats(itemIdx);
  calculateTotalMaterials();
}

function styleChanged(itemIdx)
{
  var itemSelect = document.getElementById("style" + itemIdx);
  itemSelect.style.color = itemSelect.options[itemSelect.selectedIndex].style.color;
  populateMats(itemIdx);
}

function traitChanged(itemIdx)
{
  var itemSelect = document.getElementById("trait" + itemIdx);
  itemSelect.style.color = itemSelect.options[itemSelect.selectedIndex].style.color;
  calculateTotalMaterials();
}


function populateArmorWeaponSelect(itemIdx)
{
  var itemSelect = document.getElementById("armorweapon" + itemIdx);
  var newItem = document.createElement("option");
  newItem.text = "Armor";
  newItem.value = "Armor";
  itemSelect.options.add(newItem);
  newItem = document.createElement("option");
  newItem.text = "Weapon";
  newItem.value = "Weapon";
  itemSelect.options.add(newItem);
  newItem = document.createElement("option");
  newItem.text = "Jewelry";
  newItem.value = "Jewelry";
  itemSelect.options.add(newItem);

  newItem = document.createElement("option");
  newItem.text = "Enchant-Armor";
  newItem.value = "Enchant-Armor";
  itemSelect.options.add(newItem);
  newItem = document.createElement("option");
  newItem.text = "Enchant-Weapon";
  newItem.value = "Enchant-Weapon";
  itemSelect.options.add(newItem);
  newItem = document.createElement("option");
  newItem.text = "Enchant-Jewelry";
  newItem.value = "Enchant-Jewelry";
  itemSelect.options.add(newItem);
}

function isStylePartKnown(stylePartKnown, itemName)
{
  var found = false;
  var idx;
  if (stylePartKnown == null) {
    found = false;
  } else if (stylePartKnown.allPartsKnown) {
    found = true;
  } else {
    found = stylePartKnown.negateList;
    for (idx = 0; idx < stylePartKnown.partsList.length; idx++) {
      if (stylePartKnown.partsList[idx] == itemName) {
        found = ! stylePartKnown.negateList;
        break;
      }
    }
  }

  return found;
}

function populateStyles(itemIdx)
{
  var typeValue = getSelectedType(itemIdx);
  
  var styleSelect = document.getElementById("style" + itemIdx);
  var itemSelect = document.getElementById("itemType" + itemIdx);
  
  var itemName = itemSelect.value;
  var idx;
  var selectedIndex = styleSelect.selectedIndex;
  if (selectedIndex < 0)
    selectedIndex = 0;

  if ( typeValue == "jewelry" ||  typeValue == "enchant-armor" ||  typeValue == "enchant-weapon" ||  typeValue == "enchant-jewelry") {
    // Remove all the items from the dropdown.
    while (styleSelect.options.length > 0) {
      styleSelect.options.remove(0);
    }
    var newItem = document.createElement("option");
    newItem.text = "None";
    newItem.value = "None"
    styleSelect.options.add(newItem);
    return;
  }

 

  // Extract the part type (chest, sword, legs, etc.) from the selected item.
  var selectedItemIdx = itemSelect.selectedIndex;
  if (selectedItemIdx < 0)
    selectedItemIdx = 0;
  var itemObj = null;
  var itemPartName = null;
  if (itemName != 'none') {
    itemObj = itemSelect.options[selectedItemIdx].myBaseObject;
    if (itemObj != null)
      itemPartName = itemObj.partType;
  }

  // Remove all the items from the dropdown.
  while (styleSelect.options.length > 0) {
    styleSelect.options.remove(0);
  }

  styleSelect.style.color = 'black';
  for (idx = 0; idx < styleArray.length; idx++) {
    var newItem = document.createElement("option");
    newItem.text = styleArray[idx].name;
    newItem.value = styleArray[idx].name;
    if (itemName != 'none') {
      var part = stylePartsKnownHash[newItem.text];
      if (! isStylePartKnown(part, itemPartName)) {
        if (showUnavailable) {
          newItem.style.color = 'red';
          if (selectedIndex == idx) {
            styleSelect.style.color = 'red';
          }
        }
      } else {
        newItem.style.color = 'black';
      }
    }
    styleSelect.options.add(newItem);
  }
  if (selectedIndex < 0) {
    styleSelect.selectedIndex = 0;
  } else {
    styleSelect.selectedIndex = selectedIndex;
  }
}

function isKnownSet(text)
{
  var rtn = true;
//  if (text == 'Armor Master' ||
//      text == "Noble's Conquest" ||
//      text == 'Redistributor') {
//    rtn = false;
//  }
  return rtn;
}

function populateSets(itemIdx)
{
  var itemSelect = document.getElementById("set" + itemIdx);
  var idx;

  for (idx = 0; idx < setArray.length; idx++) {
    var newItem = document.createElement("option");
    newItem.value = setArray[idx];
    newItem.text = setArray[idx];
    if (showUnavailable && ! isKnownSet(newItem.text)) {
      newItem.style.color = 'red';
    } else {
      newItem.style.color = 'black';
    }
    itemSelect.options.add(newItem);
  }
}

function setChanged(itemIdx)
{
  if (showUnavailable) {
    var itemSelect = document.getElementById("set" + itemIdx);
    if (isKnownSet(itemSelect.value)) {
      itemSelect.style.color = 'black';
    } else {
      itemSelect.style.color = 'red';
    }
  }
}

function isInStringList(list, value)
{
  var found = false;
  var idx;
  if (list != null && list.length > 0) {
    for (idx = 0; idx < list.length; idx++) {
      if (list[idx] == value) {
        found = true;
        break;
      }
    }
  }
  return found;
}

function populateTraits(itemIdx, typeChanged)
{
  var typeValue =  getSelectedType(itemIdx);
  
  var itemSelect = document.getElementById("trait" + itemIdx);
  var selectedIndex = itemSelect.selectedIndex;
  if (selectedIndex < 0 || typeChanged) {
    selectedIndex = 0;
  }
  var mats = getMaterial(itemIdx);
  var traitsNotKnown = [];
  if (mats != null) {
    traitsNotKnown = mats.traitsNotKnown;
  }
  var idx;
  var arr;

  while (itemSelect.options.length > 0) {
    itemSelect.options.remove(0);
  }
  if ( typeValue == "armor") {
    arr = armorTraitArray;
  } else if ( typeValue == "weapon") {
    arr = weaponTraitArray;
  } else if ( typeValue == "jewelry") {
    arr = jewelryTraitArray;
  }else{
    arr = enchantTraitArray;
  }
  itemSelect.style.color = 'black';
  for (idx = 0; idx < arr.length; idx++) {
    var newItem = document.createElement("option");
    newItem.text = arr[idx].name;
    if(arr[idx].description != undefined){
      newItem.title = arr[idx].description;
    }
    
    if (isInStringList(traitsNotKnown, newItem.text)) {
      if (showUnavailable) {
        newItem.style.color = 'red';
        if (selectedIndex == idx) {
          itemSelect.style.color = 'red';
        }
      }
    } else {
      newItem.style.color = 'black';
    }
    itemSelect.options.add(newItem);
  }

  itemSelect.selectedIndex = selectedIndex;
}

function populateImprovements(itemIdx)
{
  var itemSelect = document.getElementById("improvement" + itemIdx);
  var idx;

  for (idx = 0; idx < improvementLevels.length; idx++) {
    var newItem = document.createElement("option");
    newItem.text = improvementLevels[idx].name;
    itemSelect.options.add(newItem);
  }
}

function populateItemType(itemIdx)
{
  var typeValue =  getSelectedType(itemIdx);
  var itemSelect = document.getElementById("itemType" + itemIdx);
  var idx;
  var itemarray = [];
  var enchantArray = [];
  if ( typeValue == "weapon")
     itemarray = weapons;
  else if ( typeValue == "armor")
    itemarray = armor;
  else if ( typeValue == "jewelry")
    itemarray = jewelry;
  else if( typeValue == "enchant-weapon"){
    enchantArray = getEnchantItems('weapon');  
  } else if( typeValue == "enchant-armor"){
    enchantArray = getEnchantItems('armor');  
  } else if( typeValue == "enchant-jewelry"){
    enchantArray = getEnchantItems('jewelry');  
  }

  while (itemSelect.options.length > 0) {
    itemSelect.options.remove(0);
  }
  var newItem = document.createElement("option");
  newItem.text = "None";
  newItem.value = "None";
  itemSelect.options.add(newItem);
  
  if(itemarray.length > 0){
    for (idx = 0; idx < itemarray.length; idx++) {
      newItem = document.createElement("option");
      newItem.text = itemarray[idx].name;
      newItem.value = itemarray[idx].name;
      newItem.myBaseObject = itemarray[idx];
      itemSelect.options.add(newItem);
    }
  }else{
    for (idx = 0; idx < enchantArray.length; idx++) {
      newItem = document.createElement("option");
      newItem.text = enchantArray[idx]["Glyph Short Name"];
      newItem.value = enchantArray[idx]["Glyph Short Name"];
      newItem.title = enchantArray[idx]["Effect"];
      newItem.myBaseObject = enchantArray[idx];
      itemSelect.options.add(newItem);
    }
  }

  populateMats(itemIdx);
}

function populateLevels(itemIdx)
{
  var typeValue =  getSelectedType(itemIdx);
  var levelSelect = document.getElementById("level" + itemIdx);
  
  if ( typeValue == "enchant-armor" ||  typeValue == "enchant-weapon" ||  typeValue == "enchant-jewelry") {
    levelList = enchantLevelArray;
  }else{
    levelList = levelArray;
  }

  if(levelSelect.options.length != levelList.length){
  //remove levels and add correct ones
    while (levelSelect.options.length > 0) {
      levelSelect.options.remove(0);
    }



    var idx;
    var newItem;
    for (idx = 0; idx < levelList.length; idx++) {
      newItem = document.createElement("option");
      newItem.text = levelList[idx];
      levelSelect.options.add(newItem);
    }
    var totalMats = document.getElementById("totalMats").value = '';
    var totalMats = document.getElementById("totalStyleMats").value = '';
    var totalMats = document.getElementById("totalTraitMats").value = '';
    var totalMats = document.getElementById("totalImpMats").value = '';
    var totalMats = document.getElementById("totalRunes").value = '';
  }
}

function populateMats(itemIdx)
{
  var typeValue =  getSelectedType(itemIdx);
  var itemType = document.getElementById("itemType" + itemIdx);
  var levelSelect = document.getElementById("level" + itemIdx);
  var improvementSelect = document.getElementById("improvement" + itemIdx);
  var matsText = document.getElementById("mats" + itemIdx);
  var itemarray = [];
  var enchantArray = [];
  if ( typeValue == "weapon"){
    itemarray = weapons;
  }else if ( typeValue == "armor"){
    itemarray = armor;
  }else if ( typeValue == "jewelry"){
    itemarray = jewelry;
  }else if( typeValue == "enchant-weapon"){
    enchantArray = getEnchantItems('weapon');  
  } else if( typeValue == "enchant-armor"){
    enchantArray = getEnchantItems('armor');  
  } else if( typeValue == "enchant-jewelry"){
    enchantArray = getEnchantItems('jewelry');  
  }
    
  var selectedItemIdx = itemType.selectedIndex - 1; // Ignore "none"
  var selectedLevelIdx = levelSelect.selectedIndex;
  if (selectedItemIdx == -1) { // "none"
    matsText.value = "";
  } else {

    if(itemarray.length > 0){
      var mats = itemarray[selectedItemIdx].levels[selectedLevelIdx];
      matsText.value = "" + mats.count + " " + mats.materialName;
    }else{
      var improvementLevel = improvementSelect.options[improvementSelect.selectedIndex].text;
      
      var essenceRune = enchantArray[selectedItemIdx]["Name"];
      var aspectRune = getAspectRune(improvementLevel);
      var potencyRune = getPotencyRune(enchantArray[selectedItemIdx]["Potency Type"], enchantLevelArray[selectedLevelIdx]);
      
      matsText.value = "" +potencyRune +", " + essenceRune +", " + aspectRune ;

     
      
    }
    
    
    calculateTotalMaterials();
  }
}

function getMaterial(itemIdx)
{
  var typeValue =  getSelectedType(itemIdx);
  var itemType = document.getElementById("itemType" + itemIdx);
  var itemarray = weapons;
  var mats = null;
  if ( typeValue == "armor")
    itemarray = armor;
  else if ( typeValue == "jewelry")
    itemarray = jewelry;
  var selectedItemIdx = itemType.selectedIndex - 1; // Ignore "none"
  if (selectedItemIdx >= 0) {
    mats = itemarray[selectedItemIdx];
  }
  return mats;
}

function getMaterialLevel(itemIdx)
{
  var matLevels = null;
  var mat = getMaterial(itemIdx);
  if (mat != null) {
    var levelSelect = document.getElementById("level" + itemIdx);
    var selectedLevelIdx = levelSelect.selectedIndex;
    matLevels = mat.levels[selectedLevelIdx];
  }
  return matLevels;
}

function getMaterialType(itemIdx)
{
  var typeValue =  getSelectedType(itemIdx);
  var itemType = document.getElementById("itemType" + itemIdx);
  var levelSelect = document.getElementById("level" + itemIdx);
  var itemarray = weapons;
  var mats = null;
  if ( typeValue == "armor")
    itemarray = armor;
  else if ( typeValue == "jewelry")
    itemarray = jewelry;
  var selectedItemIdx = itemType.selectedIndex - 1; // Ignore "none"
  var selectedLevelIdx = levelSelect.selectedIndex;
  if (selectedItemIdx >= 0) {
    mats = itemarray[selectedItemIdx].materialType
  }
  return mats;
}


function calculateTotalMaterials()
{
  var idx;
  var hash = new Object();
  var styleMats = new Object();
  var traitMats = new Object();
  var improvementMats = new Object();
  var runeMats= new Object();
  var MaxItems = $('#craftTable tbody tr').length;

  for (idx = 0; idx < MaxItems; idx++) {
    var typeValue =  getSelectedType(idx);
    var qty = document.getElementById("qty" + idx).value;
    if( typeValue == "weapon" ||  typeValue == "armor" ||  typeValue == "jewelry"){
      var mats = getMaterialLevel(idx);
     
      if (mats != null) {
        if (hash[mats.materialName] == null)
          hash[mats.materialName] = mats.count*qty;
        else
          hash[mats.materialName] += mats.count*qty;
        if ( typeValue != "jewelry") {
          var styleSelect = document.getElementById("style" + idx);
          var name = styleArray[styleSelect.selectedIndex].material;
          if (styleMats[name] == null)
            styleMats[name] = 1*qty;
          else
            styleMats[name]+=1*qty;
        }
        var traitArray = [];
        if ( typeValue == "weapon"){
          traitArray = weaponTraitArray;
        }else if ( typeValue == "armor"){
          traitArray = armorTraitArray;
        }else if ( typeValue == "jewelry"){
          traitArray = jewelryTraitArray;
        }else{
          traitArray = enchantTraitArray;
        }
        var traitSelect = document.getElementById("trait" + idx);
        var name = traitArray[traitSelect.selectedIndex].material;
        if (name != '') {
          if (traitMats[name] == null)
            traitMats[name] = 1*qty;
          else
            traitMats[name]+=1*qty
        }

        var improvementSelect = document.getElementById("improvement" + idx);
        if (improvementSelect.selectedIndex > 0) {
          var improvementMat = metalImprovementMats;
          var matsType = getMaterialType(idx);
          var isJewelry = false;
          if (matsType == "wood")
            improvementMat = woodImprovementMats;
          else if (matsType == "cloth")
            improvementMat = clothImprovementMats;
          else if (matsType == "jewelry") {
            improvementMat = jewelryImprovementMats;
            isJewelry = true;
          }
          var impIdx = 1;
          for (impIdx = 1; impIdx <= improvementSelect.selectedIndex; impIdx++) {
            name = improvementMat[impIdx];
            if (isJewelry)
              count = impIdx;
            else
              count = improvementLevels[impIdx].materialCount;
            if (improvementMats[name] == null)
              improvementMats[name] = count*qty;
            else
              improvementMats[name] += count*qty;1
          }
        }
      }
    }else{ // is an enchantment
      
      var enchantArray = [];
      if( typeValue == "enchant-weapon"){
        enchantArray = getEnchantItems('weapon');  
      } else if( typeValue == "enchant-armor"){
        enchantArray = getEnchantItems('armor');  
      } else if( typeValue == "enchant-jewelry"){
        enchantArray = getEnchantItems('jewelry');  
      }
        
      //update mats (calculated) field to reflect new selections
      var levelSelect = document.getElementById("level" + idx);
      var improvementSelect = document.getElementById("improvement" + idx);
      var matsText = document.getElementById("mats" + idx);
      var itemType = document.getElementById("itemType" + idx);
      
      var selectedItemIdx = itemType.selectedIndex - 1; // Ignore "none"
      var selectedLevelIdx = levelSelect.selectedIndex;
      if (selectedItemIdx == -1) { // "none"
        matsText.value = "";
      } else {
        var improvementLevel = improvementSelect.options[improvementSelect.selectedIndex].text;
        var essenceRune = enchantArray[selectedItemIdx]["Name"];
        var aspectRune = getAspectRune(improvementLevel);
        var potencyRune = getPotencyRune(enchantArray[selectedItemIdx]["Potency Type"], enchantLevelArray[selectedLevelIdx]);
        matsText.value = "" +potencyRune +", " + essenceRune +", " + aspectRune ;
      }

      if(matsText.value!=''){      
        var calcRunes = matsText.value;
        runesArray = calcRunes.split(", ");
        
        runesArray.forEach(function(item){
          if (item != ''){
            if (runeMats[item] == null)
              runeMats[item] = 1*qty;
            else
              runeMats[item]+= 1*qty;
          }
        });
        
      }
      

    }
  }// end of for
  
  var totalMats = document.getElementById("totalMats");
  totalMats.value = '';
  for (var key in hash) {
    if (hash.hasOwnProperty(key)) {
      totalMats.value += hash[key] + " " + key + "\n";
    }
  }
  totalMats = document.getElementById("totalStyleMats");
  totalMats.value = '';
  for (var key in styleMats) {
    if (styleMats.hasOwnProperty(key)) {
      if(key!="Any"){
        totalMats.value += styleMats[key] + " " + key + "\n";
      }
    }
  }
  totalMats = document.getElementById("totalTraitMats");
  totalMats.value = '';
  for (var key in traitMats) {
    if (traitMats.hasOwnProperty(key)) {
      totalMats.value += traitMats[key] + " " + key + "\n";
    }
  }
  totalMats = document.getElementById("totalImpMats");
  totalMats.value = '';
  for (var key in improvementMats) {
    if (improvementMats.hasOwnProperty(key)) {
      totalMats.value += improvementMats[key] + " " + key + "\n";
    }
  }

  totalMats = document.getElementById("totalRunes");
  totalMats.value = '';
  for (var key in runeMats) {
    if (runeMats.hasOwnProperty(key)) {
      totalMats.value += runeMats[key] + " " + key + "\n";
    }
  }
}

function getEnchantItems(itemType){
  itemArray = [];
  itemType = itemType.toLowerCase();
  enchantEssence.forEach(function(item){
    if(itemType == item["Item Type"].toLowerCase()){
      itemArray.push(item)
    }
  });

  if(itemArray.length > 0){
    itemArray.sort((a,b) => (a.Glyph > b.Glyph) ? 1 : ((b.Glyph > a.Glyph) ? -1 : 0))
  }
 
  return itemArray;
}

function getAspectRune(improvementLevel){
  improvementLevel = improvementLevel.toLowerCase();
  var rune = '';
  enchantAspect.forEach(function(item){
    if(improvementLevel == item["Improvement"].toLowerCase()){
    
      rune = item["Name"];
      return rune;
    }
  });
 
  return rune;

}

function getPotencyRune(potencyType,level){
  potencyType = potencyType.toLowerCase();
  var rune = '';
  enchantPotency.forEach(function(item){
    if(potencyType == item["Type"].toLowerCase() && level == item["Gear Level"]){
    
      rune = item["Name"];
      return rune;
    }
  });
 
  return rune;

}

function getSelectedType(itemIndex){

  var armorweapon = document.getElementById("armorweapon" + itemIndex);

  return armorweapon.value.toLowerCase();


}


function qtyChanged(itemIndex){
  var qtyInput = document.getElementById("qty" + itemIndex);
  var row = document.getElementById("row" + itemIndex);
 
  if(qtyInput.value < 1 || !isNormalInteger( qtyInput.value)){
    qtyInput.value = 1;
  }else if(qtyInput.value > 10){
    qtyInput.value = 10;
  }

  if(qtyInput.value > 1){
    row.classList.add("table-info");
  }else{
    row.classList.remove("table-info");
  }

  calculateTotalMaterials();
}

//https://stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
function isNormalInteger(str) {
  var n = Math.floor(Number(str));
  return n !== Infinity && String(n) === str && n >= 0;
}