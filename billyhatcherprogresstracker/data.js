const GAME_DATA = {
  // Fruit indices: 0=Pineapple 1=Cherry 2=Watermelon 3=Banana 4=Apple 5=Strawberry 6=Melon
  FRUITS: ['Pineapple','Cherry','Watermelon','Banana','Apple','Strawberry','Melon'],
  FRUIT_EMOJI: ['🍍','🍒','🍉','🍌','🍎','🍓','🍈'],

  // f=preferred fruit indices, p=points to hatch
  EGG_FRUIT_DATA: [
    {f:[4],       p:16},  // 0  Fire Comb
    {f:[3],       p:13},  // 1  Water Comb
    {f:[1],       p:15},  // 2  Lightning Comb
    {f:[6],       p:16},  // 3  Ice Comb
    {f:[0],       p:15},  // 4  Wind Comb
    {f:[5],       p:15},  // 5  Iron Comb
    {f:[2],       p:30},  // 6  Light Comb
    {f:[2],       p:15},  // 7  Wings
    {f:[2],       p:24},  // 8  Booster
    {f:[6],       p:12},  // 9  Paraloop
    {f:[3,6],     p:12},  // 10 Thorn Egg
    {f:[6],       p:12},  // 11 Speed Shoes
    {f:[4],       p:12},  // 12 Bomb
    {f:[1],       p:12},  // 13 Spring Shoes
    {f:[6],       p:15},  // 14 Circus Hat
    {f:[5],       p:15},  // 15 Psychic Hat
    {f:[2,4],     p:15},  // 16 Heart Hat
    {f:[],        p:16},  // 17 Bat
    {f:[],        p:16},  // 18 Crow
    {f:[3],       p:16},  // 19 Cipher
    {f:[4],       p:16},  // 20 Clippen
    {f:[6],       p:16},  // 21 Recky
    {f:[3,6],     p:16},  // 22 Richie
    {f:[0,4],     p:16},  // 23 Peliwan
    {f:[1,2,4,5], p:16},  // 24 Runny
    {f:[0,2,5,6], p:24},  // 25 Rabbish
    {f:[4,5],     p:40},  // 26 Rikol
    {f:[3],       p:40},  // 27 Kaboot
    {f:[1],       p:40},  // 28 Datch
    {f:[6],       p:24},  // 29 Glarin
    {f:[0],       p:24},  // 30 Baskus
    {f:[5],       p:24},  // 31 Oritta
    {f:[2],       p:24},  // 32 Biboo
    {f:[4,5],     p:20},  // 33 Gorilla
    {f:[0,2,4],   p:18},  // 34 Chameleon
    {f:[0,2,3],   p:20},  // 35 Mouse
    {f:[0,5,6],   p:16},  // 36 Turtle
    {f:[2],       p:20},  // 37 Lion
    {f:[1,4,5],   p:20},  // 38 Dice
    {f:[0,2,4],   p:15},  // 39 Super Fruit
    {f:[1,2],     p:40},  // 40 Tiger
    {f:[0,2],     p:32},  // 41 Sheep
    {f:[0,1,5],   p:32},  // 42 Hawk
    {f:[0,2],     p:48},  // 43 Fox
    {f:[2,4,5],   p:12},  // 44 Large Butterfly
    {f:[0,4,6],   p:24},  // 45 Stopwatch
    {f:[2,4],     p:30},  // 46 Small Butterfly
    {f:[2],       p:15},  // 47 1 Up
    {f:[2],       p:18},  // 48 Chick Bomb
    {f:[],        p:16},  // 49 Egg Bomb
    {f:[3],       p:48},  // 50 GBA: Chu Chu Rocket
    {f:[1,2],     p:48},  // 51 GBA: Nights Score Attack
    {f:[5,6],     p:48},  // 52 GBA: Billy Hatcher Easy
    {f:[0],       p:48},  // 53 GBA: Billy Hatcher Hyper
    {f:[4],       p:48},  // 54 GBA: Puyo Pop
    {f:[3],       p:24},  // 55 Sonic
    {f:[1],       p:24},  // 56 Tails
    {f:[4],       p:24},  // 57 Knuckles
    {f:[3],       p:24},  // 58 Chao
    {f:[1],       p:24},  // 59 Rappy
    {f:[0],       p:24},  // 60 Kapu Kapu
    {f:[6],       p:24},  // 61 NiGHTS
    {f:[5],       p:24},  // 62 Amigo
    {f:[4],       p:40},  // 63 Super Clippen
    {f:[3],       p:40},  // 64 Super Recky
    {f:[],        p:0},   // 65 Chicken Suit
    {f:[0,1],     p:48},  // 66 Oma-Oma
    {f:[0,1],     p:48},  // 67 Uri-Uri
    {f:[0,1],     p:48},  // 68 Ura-Ura
    {f:[0,1],     p:48},  // 69 Ponee
    {f:[0,1],     p:48},  // 70 Allani
    {f:[0,1],     p:48},  // 71 Mera-Mera
  ],

  // The base unhatched egg — game egg #0, not part of the 72-egg collection
  EGG_ZERO: { name: 'Empty Spotted Egg', fruits: [2], points: 24 },

  // High-quality (unnumbered) egg images — 0-indexed, maps to assets/eggs/normal/
  EGG_HQ_IMAGES: [
    '01-firecomb.png',                              // 0  Fire Comb
    '02-watercomb.png',                             // 1  Water Comb
    '03-lightningcomb.png',                         // 2  Lightning Comb
    '04-icecomb.png',                               // 3  Ice Comb
    '05-windcomb.png',                              // 4  Wind Comb
    '06-ironcomb.png',                              // 5  Iron Comb
    '07-lightcomb.png',                             // 6  Light Comb
    '08-wings.png',                                 // 7  Wings
    '09-booster.png',                               // 8  Booster
    '10-40-paraloop-superfruit.png',                // 9  Paraloop
    '11-39-thornegg-dice.png',                      // 10 Thorn Egg
    '12-speedshoes.png',                            // 11 Speed Shoes
    '13-bomb.png',                                  // 12 Bomb
    '14-springshoes.png',                           // 13 Spring Shoes
    '15-circushat.png',                             // 14 Circus Hat
    '16-circushat.png',                             // 15 Psychic Hat
    '17-hearthat.png',                              // 16 Heart Hat
    '18-19-48-bat-crow-1up.png',                    // 17 Bat
    '18-19-48-bat-crow-1up.png',                    // 18 Crow
    '20-30-cipher-glarin.png',                      // 19 Cipher
    '21-clippen.png',                               // 20 Clippen
    '22-recky.png',                                 // 21 Recky
    '23-32-richie-oritta.png',                      // 22 Richie
    '24-33-peliwan-biboo.png',                      // 23 Peliwan
    '25-31-runny-boskus.png',                       // 24 Runny
    '26-rabbish.png',                               // 25 Rabbish
    '27-rikol.png',                                 // 26 Rikol
    '28-kaboot.png',                                // 27 Kaboot
    '29-datch.png',                                 // 28 Datch
    '20-30-cipher-glarin.png',                      // 29 Glarin
    '25-31-runny-boskus.png',                       // 30 Baskus
    '23-32-richie-oritta.png',                      // 31 Oritta
    '24-33-peliwan-biboo.png',                      // 32 Biboo
    '34-45-47-gorilla-butterfly.png',               // 33 Gorilla
    '35-43-chameleon-hawk.png',                     // 34 Chameleon
    '36-41-44-mouse-tiger-fox.png',                 // 35 Mouse
    '37-turtle.png',                                // 36 Turtle
    '38-42-lion-sheep.png',                         // 37 Lion
    '11-39-thornegg-dice.png',                      // 38 Dice
    '10-40-paraloop-superfruit.png',                // 39 Super Fruit
    '36-41-44-mouse-tiger-fox.png',                 // 40 Tiger
    '38-42-lion-sheep.png',                         // 41 Sheep
    '35-43-chameleon-hawk.png',                     // 42 Hawk
    '36-41-44-mouse-tiger-fox.png',                 // 43 Fox
    '34-45-47-gorilla-butterfly.png',               // 44 Large Butterfly
    '46-stopwatch.png',                             // 45 Stopwatch
    '34-45-47-gorilla-butterfly.png',               // 46 Small Butterfly
    '18-19-48-bat-crow-1up.png',                    // 47 1 Up
    '49-chickbomb.png',                             // 48 Chick Bomb
    '50-eggbomb.png',                               // 49 Egg Bomb
    '51-gbachuchurocket.png',                       // 50 GBA: Chu Chu Rocket
    '52-gbanights.png',                             // 51 GBA: NiGHTS
    '53-54-gbabilly.png',                           // 52 GBA: Billy Hatcher Easy
    '53-54-gbabilly.png',                           // 53 GBA: Billy Hatcher Hyper
    '55-gbapuyopop.png',                            // 54 GBA: Puyo Pop
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 55 Sonic
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 56 Tails
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 57 Knuckles
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 58 Chao
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 59 Rappy
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 60 Kapu Kapu
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 61 NiGHTS
    '56-57-58-59-60-61-62-63-sonic-egg.png',        // 62 Amigo
    '64-superclippen.png',                          // 63 Super Clippen
    '65-superrecky.png',                            // 64 Super Recky
    '66-chickensuit.png',                           // 65 Chicken Suit
    '67-68-69-70-71-72-golden-egg.png',             // 66 Oma-Oma
    '67-68-69-70-71-72-golden-egg.png',             // 67 Uri-Uri
    '67-68-69-70-71-72-golden-egg.png',             // 68 Ura-Ura
    '67-68-69-70-71-72-golden-egg.png',             // 69 Ponee
    '67-68-69-70-71-72-golden-egg.png',             // 70 Allani
    '67-68-69-70-71-72-golden-egg.png',             // 71 Mera-Mera
  ],

  // Chick coin totals required to unlock (indices 55–62: Sonic through Amigo)
  EGG_COIN_REQUIREMENTS: {
    55: 60,   // Sonic
    56: 140,  // Tails
    57: 220,  // Knuckles
    58: 20,   // Chao
    59: 80,   // Rappy
    60: 40,   // Kapu Kapu
    61: 180,  // NiGHTS
    62: 100,  // Amigo
  },

  MAX_EMBLEMS: 60,
  MAX_LEVELS: 56,
  MAX_SRANKS: 56,
  MAX_COINS: 280,
  MAX_EGGS: 72,
  NUM_WORLDS: 7,
  LEVELS_PER_WORLD: 8,

  WORLD_NAMES: [
    "Forest Village", "Pirates Island", "Dino Mountain", "Blizzard Castle",
    "Circus Park", "Sand Ruin", "Giant Palace"
  ],

  WORLD_IMAGES: [
    "assets/misc/forest-village2.png",
    "assets/misc/pirates-island.png",
    "assets/misc/dino-mountain.png",
    "assets/misc/blizzard-castle3.png",
    "assets/misc/circus-park1.png",
    "assets/misc/sand-ruin1.png",
    "assets/misc/giant-palace2.png"
  ],

  LEVEL_NAMES: [
    // Forest Village (0-7)
    "Save chicken elder Oma-Oma!", "Defeat Era Gecko!", "Secret little forest hut",
    "Traveling mini game salesman", "Secret inside the waterfall", "Secret of the windmill!",
    "Save the 8 chickens!", "Defeat 100 crows!",
    // Pirates Island (8-15)
    "Save chicken elder Uri-Uri!", "Hurry to the pirate ship!", "Race against King Clippen!",
    "Save Rolly!", "Treasure in the captain's room!", "Defeat 100 Crows!",
    "Chick and the games salesman!", "Save the 8 chickens!",
    // Dino Mountain (16-23)
    "Save Chicken Elder Ura-Ura!", "Defeat the 3 bone dragons!", "Defeat 100 Crows!",
    "Chick has been kidnapped!", "Save the 8 chickens!", "The travelling games salesman",
    "Battle race! Champion Runny!", "Get to the mountaintop!",
    // Blizzard Castle (24-31)
    "Rescue chicken elder Ponee!", "Secret of ice castle!", "After the blizzard...",
    "Save Bantam!", "Save the 8 chickens!", "Race against Queen Rabbish!",
    "Makin' money with mini-games!", "Defeat 100 crows!",
    // Circus Park (32-39)
    "Save Chicken Elder Allani!", "Secret of the fun house!", "The clock stands still...",
    "The caged crow and the emblem!", "Fireworks party!", "Save the 8 chickens!",
    "Defeat 100 crows!", "Win a prize from the game man!",
    // Sand Ruin (40-47)
    "The secret of the giant egg!", "Defeat Dark Corvo!", "Open the Rainbow Gate!",
    "Even more mini games!", "Save the 8 chickens!", "Sand Ruins under attack!",
    "Emblem atop the pillar!", "Race against King Biboo!",
    // Giant Palace (48-55)
    "Showdown with Dark Raven!", "Deep inside the temple...", "Roll down the long slope!",
    "Death match! Get the crows!", "Save the 8 chickens!", "Climb up the hill!",
    "What's the Game Man doing here?", "Last battle! Crow army!"
  ],

  EGG_NAMES: [
    "Fire Comb", "Water Comb", "Lightning Comb", "Ice Comb", "Wind Comb",
    "Iron Comb", "Light Comb", "Wings", "Booster", "Paraloop",
    "Thorn Egg", "Speed Shoes", "Bomb", "Spring Shoes", "Circus Hat",
    "Psychic Hat", "Heart Hat", "Bat", "Crow", "Cipher",
    "Clippen", "Recky", "Richie", "Peliwan", "Runny",
    "Rabbish", "Rikol", "Kaboot", "Datch", "Glarin",
    "Baskus", "Oritta", "Biboo", "Gorilla", "Chameleon",
    "Mouse", "Turtle", "Lion", "Dice", "Super Fruit",
    "Tiger", "Sheep", "Hawk", "Fox", "Large Butterfly",
    "Stopwatch", "Small Butterfly", "1 Up", "Chick Bomb", "Egg Bomb",
    "GBA: Chu Chu Rocket Challenge", "GBA: Nights Score Attack",
    "GBA: Billy Hatcher Shoot Easy", "GBA: Billy Hatcher Hyper Shoot",
    "GBA: Puyo Pop", "Sonic", "Tails", "Knuckles", "Chao",
    "Rappy", "Kapu Kapu", "NIGHTS", "Amigo", "Super Clippen",
    "Super Recky", "Chicken Suit", "Oma-Oma", "Uri-Uri", "Ura-Ura",
    "Ponee", "Allani", "Mera-Mera"
  ],

  EGGS_IN_LEVELS: [
    [19,40,44,47,58,65,66],        // Forest 1
    [4,19,20,33,46,47],
    [0,1,10,19,20,34,46,47],
    [47],
    [14,19,20,22,44,47],
    [0,2,4,7,15,19,20,21,22,41,44,46,47],
    [3,19,20,21,22,27,34,43,45,46,47],
    [1,12,20,21,22,33,37,38,44,46,47,48,57],
    [0,20,21,46,47,67],            // Pirates 1
    [3,19,21,22,34,46,47,48,50],
    [],
    [1,19,22,37,46,47,48],
    [0,14,20,24,36,46,47,60],
    [5,15,19,20,21,22,37,44,46,47,48],
    [11],
    [1,8,12,14,19,20,24,27,44,45,46,47,48,63],
    [5,19,20,21,46,47,68],         // Dino 1
    [4,20,22,23,33,34,42,44,47,52],
    [0,10,19,20,21,23,24,37,44,46,47,48,55],
    [6,20,21,22,23,36,46,47],
    [7,16,19,20,22,24,26,33,34,37,45,46,47,48],
    [],
    [],
    [19,20,21,22,24,29,38,41,43,44,46,47,49],
    [5,19,20,22,29,39,46,47,69],   // Blizzard 1
    [4,19,30,42,44,47,59],
    [54],
    [2,17,19,21,22,23,44,47,48],
    [1,8,18,19,20,22,23,28,31,33,45,46,47,49,64],
    [17,47],
    [11],
    [3,15,19,20,23,30,31,34,40,46,47,48],
    [0,7,19,20,31,44,46,47,70],    // Circus 1
    [19,20,32,37,47,51],
    [18,21,30,47],
    [13,21,23,31,46,47,49,62],
    [10,18,20,21,22,32,46,47],
    [0,11,17,19,20,23,28,30,31,45,46,47,48],
    [3,10,12,15,20,22,24,30,37,46,47],
    [],
    [0,17,23,25,30,31,35,39,46,47,49,71], // Sand 1
    [3,16,18,19,20,22,23,25,33,46,47,53],
    [4,18,20,21,23,31,32,37,39,44,47],
    [],
    [2,14,16,17,19,20,23,30,40,44,45,46,47,49,56],
    [2,9,19,23,25,26,34,41,46,47,49],
    [13,17,19,20,21,30,38,46,47],
    [],
    [5,19,20,22,25,44,47],         // Palace 1
    [0,17,22,25,29,31,36,41,47,48],
    [1,3,18,21,32,34,46,47],
    [12,16,17,19,20,25,30,31,37,41,46,47,48,61],
    [2,6,7,18,19,22,24,25,45,46,47,48],
    [4,22,25,30,46,47,48,49],
    [11],
    [5,6,19,20,22,25,30,33,46,47,48]
  ],

  EGG_LOCATIONS: [
    [2,5,8,12,18,32,37,40,49],             // Fire Comb
    [2,7,11,15,28,50],                      // Water Comb
    [5,27,44,45,52],                        // Lightning Comb
    [6,9,31,38,41,50],                      // Ice Comb
    [1,5,17,25,42,53],                      // Wind Comb
    [13,16,24,48,55],                       // Iron Comb
    [19,52,55],                             // Light Comb
    [5,20,32,52],                           // Wings
    [15,28],                                // Booster
    [45],                                   // Paraloop
    [2,18,36,38],                           // Thorn Egg
    [14,30,37,54],                          // Speed Shoes
    [7,15,38,51],                           // Bomb
    [35,46],                                // Spring Shoes
    [4,12,15,44],                           // Circus Hat
    [5,13,31,38],                           // Psychic Hat
    [20,41,44,51],                          // Heart Hat
    [27,29,37,40,44,46,49,51],              // Bat
    [28,34,36,41,42,50,52],                 // Crow
    [0,1,2,4,5,6,9,11,13,15,16,18,20,23,24,25,27,28,31,32,33,37,41,44,45,46,48,51,52,55], // Cipher
    [1,2,4,5,6,7,8,12,13,15,16,17,18,19,20,23,24,28,31,32,33,36,37,38,41,42,44,46,48,51,55], // Clippen
    [5,6,7,8,9,13,16,18,19,23,27,34,35,36,42,46,50],  // Recky
    [4,5,6,7,9,11,13,17,19,20,23,24,27,28,36,38,41,48,49,52,53,55], // Richie
    [17,18,19,27,28,31,35,37,40,41,42,44,45],          // Peliwan
    [12,15,18,20,23,38,52],                 // Runny
    [40,41,45,48,49,51,52,53,55],           // Rabbish
    [20,45],                                // Rikol
    [6,15],                                 // Kaboot
    [28,37],                                // Datch
    [23,24,49],                             // Glarin
    [25,31,34,37,38,40,44,46,51,53,55],     // Baskus
    [28,31,32,35,37,40,42,49,51],           // Oritta
    [33,36,42,50],                          // Biboo
    [1,7,17,20,28,41,55],                   // Gorilla
    [2,6,9,17,20,31,45,50],                 // Chameleon
    [40],                                   // Mouse
    [12,19,49],                             // Turtle
    [7,11,13,18,20,33,38,42,51],            // Lion
    [7,23,46],                              // Dice
    [24,40,42],                             // Super Fruit
    [0,31,44],                              // Tiger
    [5,23,45,49,51],                        // Sheep
    [17,25],                                // Hawk
    [6,23],                                 // Fox
    [0,4,5,7,13,15,17,18,23,25,27,32,42,44,48], // Large Butterfly
    [6,15,20,28,37,44,52],                  // Stopwatch
    [1,2,5,6,7,8,9,11,12,13,15,16,18,19,20,23,24,28,31,32,35,36,37,38,40,41,44,45,46,50,51,52,53,55], // Small Butterfly
    [0,1,2,3,4,5,6,7,8,9,11,12,13,15,16,17,18,19,20,23,24,25,27,28,29,31,32,33,34,35,36,37,38,40,41,42,44,45,46,48,49,50,51,52,53,55], // 1 Up
    [7,9,11,13,15,18,20,27,31,37,49,51,52,53,55], // Chick Bomb
    [23,28,35,40,44,45,53],                 // Egg Bomb
    [9],   // GBA Chu Chu
    [33],  // GBA Nights
    [17],  // GBA Billy Easy
    [41],  // GBA Billy Hyper
    [26],  // GBA Puyo
    [18],  // Sonic
    [44],  // Tails
    [7],   // Knuckles
    [0],   // Chao
    [25],  // Rappy
    [12],  // Kapu Kapu
    [51],  // NIGHTS
    [35],  // Amigo
    [15],  // Super Clippen
    [28],  // Super Recky
    [0],   // Chicken Suit
    [0],   // Oma-Oma
    [8],   // Uri-Uri
    [16],  // Ura-Ura
    [24],  // Ponee
    [32],  // Allani
    [40]   // Mera-Mera
  ],

  CHICK_COIN_NOTES: [
    ["Coin beside chick after first gate","Coin on right before slide to gold egg","Coin on slide to gold egg","Coin in bush after gold egg","Coin launching off edge towards butterfly"],
    ["Coin by giant bee death zone","Coin on slide (left side of egg)","Coin after 8 cats hoop jump to platform","Coin in third box past green hoop","Coin in bush behind boss gate"],
    ["Coin on top after bee","Coin to the left corner after breaking wall","Coin by switch to right after leaving wall area","Coin in box at top by emblem","Coin jump from top back down to bottom"],
    ["Coin in bush directly to right of salesman","Coin in haystack beside first gate (left stack)","Coin left corner before heading to switch in 1-1","Coin at base of that platform","Coin at 1-1 spawn"],
    ["Coin as you enter river","Coin on right side of river","Coin on middle of river","Coin in far right corner after rapids","Coin in directly left corner of that coin"],
    ["Coin ontop after wings","Coin box in first room","Coin on slide (left side of egg)","Coin to right after leaving 3 cat room","Coin behind small windmill where chicken suit was in 1-1"],
    ["Coin right behind when start","Coin after opening windmill","Coin around gate on top before slide","Coin above chicken after slide","Coin at very top at 1-5 start"],
    ["Coin jumping off edge after 3 cats in wood","Coin to right after opening gate before slide","Coin on slide","Coin in right haystack as 1-1","Coin in air by emblem platform"],
    ["Coin on slide (right side)","Coin above stone pillar (take right blue hoop)","Coin behind flames","Coin after blue hoop beside metal thing","Coin round side after cherry and pineapple at end of level"],
    ["Coin after slide on right","Coin on slide after cannon 1","Coin in box after jumping down from penguins","Coin jumping from end of cove down","Coin in Box before double cannon up top"],
    ["Coin by triple barriers at start","Coin after jumping back down onto gba egg location","Coin after first green hoop","Coin on slide","Coin above Rock barriers to right after slide"],
    ["Coin in box to right of 3 enemies at start","Coin where cannon 2 would be (frog)","Coin on slide after Coin 2 (small egg)","Coin in left box on left","Coin on slide to rolly"],
    ["Coin above green hoops at beginning","Coin during anchors","Coin using circus hat in water after anchors","Coin off edge of switch (treasure island)","Coin in emblem room"],
    ["Coin on 2-5 switch platform","Coin cannon to flag 1","Coin on slide directly after that","Coin cannon 2 (aim so the barrier is barely in view)","Coin in corner away from gate with penguins"],
    ["Coin on slide (right side of egg)","Coin by corner on right as off slide","Coin by anchors","Coin on slide up to rolly","Coin on left after flag hit"],
    ["Coin in treasure area, Pirate 5 Switch platform","Coin circus hat in treasure area","Coin by chick 3 left jump back","Coin during jump down to below glur","Coin in water with circus hat/booster off edge at below part"],
    ["Coin in boxes to left of golden egg","Coin over lava after golden egg","Coin in corner beside golden egg bounce round","Coin where chick is","Coin bouncing on platforms by flame shooters"],
    ["Coin behind you","Coin on slide (Left side of egg)","Coin underneath 2nd dragon","Coin behind after tree boost","Coin after 3rd dragon"],
    ["Coin over lava","Coin beside tree before green hoop","Coin at left in dino head after blue hoop","Coin above handholds where richie boulder would be","Coin above yellow hoop heading to emblem"],
    ["Coin jumping down first slope","Coin in boxes where gold egg was","Coin past caged green hoop","Coin in boxes to right after picking up egg","Coin after egg roll round gate"],
    ["Coin in first dino head to left","Coin after first chicken on platforms","Coin on slide (left side)","Coin on platform after jumping from top down to chicken","Coin in middle hole from top"],
    ["Coin to right in stones","Coin above handholds, restart","Coin uptop on platform","Coin in corner on dino area","Coin in corner by 3-1 golden egg platform"],
    ["Coin in corner to right after jumping lava","Coin after blue hoops over flame","Coin in rock to right below chick platform","Coin in boxes after jumping round gate","Coin Back towards 3-2 beginning"],
    ["Coin in furthest right box ahead after skipping slide","Coin jumping off from up top into lower area (hatch clippen)","Coin after third green hoop after clippen","Coin on ledge jump down on way to third dino","Coin Jump off top down to chicken location"],
    ["Coin on slide to right (platform)","Coin on slide after penguin","Coin down by bantam skip","Coin by tree by Green fire hoop","Coin on final slide by big fruit, (left side of egg)"],
    ["Coin to right after first gate","Coin on slide (hold left side of egg)","Coin after switch","Coin above platform after cipher egg","Coin on top killing 3rd windmill"],
    ["Coin in boxes by GBA Egg","Coin jumping back down to cat","Coin just before snowball","Coin on top of barrier just before spikes","Coin in snowman with big cat"],
    ["Coin down slide at beginning","Coin at red rail","Coin above middle platform by snake","Coin below electric comb","Coin by penguins (fire hoop)(Jump down)"],
    ["Coin after first chicken to left","Coin at Datch egg after 2nd chicken (box)","Coin after getting super recky chicken","Coin ontop of chicken cage","Coin to right after switch to 4-4 start"],
    ["Coin on blue rail","Coin jump off blue rail","Coin in center of platform down there (restart)","Coin on slide (rght side) (hold left egg)","Coin back on bantam beginning green hoop"],
    ["Coin in first snowman beside salesman","Coin jumping back after up slide before smash glass","Coin on slide (left side of egg) (Right side of slide)","Coin after slide to the left in corner","Coin jump off ramp up to snowman platform"],
    ["Coin in box directly ahead of start","Coin above egg around corner (3 cat killer)","Coin down slide back to 4-4 start","Coin in box before last coin","Coin off edge where stopwatch was"],
    ["Coin off edge from 5-2 boss gate platform","Coin by red barrels at penguins before gold egg","Coin after first rail, behind you","Coin jumping off just before switchboard","Coin on switch by pineapple and melons up top"],
    ["Coin above switch 2 for opening funhouse","Coin with GBA egg in cage","Coin in boxes by banana (first mirror)","Coin in corner after 3 switch cage room","Coin at 5-1 beginning"],
    ["Coins on slide (Slide w/o egg)","Coin on slide (Slide w/o egg)","Coin in box by 2nd electric battery","Coin on slide (hold right egg)","Coin jump on slide (be careful jump halfway through X)"],
    ["Coin on top of cage","Coin on slide after egg","Coin on blue rail","Coin on slide up with hoops","Coin inbetween 4 green hoops in sky"],
    ["Coin by red rails (launch right)","Coin by switch not blue rail side","Coin in first box ahead on left side (jump down like any%)","Coin in cage with cannon","Coin at 5-2 start (restart after)"],
    ["Coin on left side of chicken 1 in cage","Coin on top of enemy cages by chick 2","Coin on slide down to minigame start","Coin in gate after switchboard","Coin above yellow pointer hoop after slide"],
    ["Coin in box to right of slide","Coin jump back after Cage green hoop","Coin above first switch in 5-2","Coin jump back to 5-2 start","Coin on slide down to loads of crows (SMALL EGG)"],
    ["Coin behind in box","Coin on slide (slide w/o egg)","Coin in box at bottom of slide (right box)","Coin above battery before red coins","Coin above right side three box pillar"],
    ["Coin in pot to left of start (middle)","Coin behind where final chicken is","Coin jump down to right off of first step","Coin down, to left, slide down","Coin off edge of ramp where chicken would be"],
    ["Coin on slide (small egg)","Coin to right instead of left for first switch","Coin after leaving underground on top","Coin jump back on third platform in underground 2","Coin by Statue in fog room"],
    ["Coin on underground door (unopened)","Coin round back at corner after leaving underground","Coin on first green hoop jump","Coin end of slide","Coin at 6-1 start"],
    ["Coin jump right from salesman","Coin in pot to right of 6-3 door to emblem","Coin jump off step into lower area","Coin in lower area on left two after 6-1 start","Coin above green hoop at 6-1 start"],
    ["Coin at first corner of going up pyramid (circus hat on clippen egg)","Coin in gap of final platform and one before (small egg)","Coin underneath bridge like thing straight ahead","Coin right and by pillar","Coin hopped on sonic, behind next platform to right"],
    ["Coin at end of first platform jumped to","Coin in vase furthest corner on final platform","Coin at right side to climb pyramid","Coin behind green hoop to climb to second pyramid level","Coin behind top green hoop before emblem"],
    ["Coin to left behind on rail","Coin on slope on 6-3 start","Coin off cage on next platform","Coin in box by sign bounce","Coin jump off emblem platform"],
    ["Coin in farthest pot behind biboo","Coin behind third pillar after skip to top","Coin off edge after pillars, roll back","Coin when gone right instead of left to climb pyramid","Coin above double shooters going left at top"],
    ["Coin at rabbish gate in break bush","Coin in air jumping down to switch after puddles","Coin in corner after after crow room","Coin on slide (left side of egg)","Coin at top jump down top bottom before heading to portal"],
    ["Coin to right of glarin egg","Coin behind after jumping out window we skip with","Coin on thin walkway jump","Coin on jump to last platform","Coin in last room before emblem to right of door (esb)"],
    ["Coin at green top statue skip off to right","Coin just after chameleon egg jump","Coin on slide","Coin on slide (restart after)","Coin jump down from platform to bottom"],
    ["Coin to left of first gate","Coin in box above second 2nd puddle","Coin on railing before rails down to 7-1 finish","Coin on slide (left side of egg)","Coin up second route across 7-1 skip area"],
    ["Coin left of egg in pot","Coin on jump to platform with pink chicken","Coin dashing forward, coin on right platform","Coin during jump from 7-2 start down to thin rail","Coin during jump from dark raven platform back down"],
    ["Coin on slide","Coin on slide","Coin at end of slide","Coin to left of green grass on pillar","Coin on last jump to emblem pillar"],
    ["Coin on railing before rabbish coin (start minigame now)","Coin jump down after puddles (big egg on red coin take small)","Coin on railing after hoop after invisible switch room","Coin in center back of platform before slide","Coin is on right hand side by first pillar you use to climb to top (skip slide)"],
    ["Coin in center of first room","Coin from yellow hoop backwards after second room","Coin during jump across to switch for door","Coin in front of switch for room with enemies","Coin on railing before slide down"]
  ]
};
