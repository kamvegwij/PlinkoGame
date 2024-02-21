# PlinkoGame
- Slot machine like game

# Technologies used
- Javascript
- PixiJS
  
# Task 1:
- [x] Import art assets to build the game world
- [x] Apply physics to the player ball (collisions and collision tracking with other objects)
- [x] Apply physics to the rest of the world objects (pins and score buckets)
- [x] Implement score system:
    - [x] Deduct 10 from original 100 player points for dropping
    - [x] Increase score for landing in bucket
    - [x] Algorithm to guide player to pre-determined slot.
    - [ ] Player ball has to avoid pins/pegs as it navigates
 
# Task 2:
- [ ] Apply full physics to simulate ball movement through the pegs
- [x] Implement collision detection
- [ ] Integrate predetermined path with new physics simulation 

# Task 3:
- [ ] Modify the weighting of the landing areas and the calculation to ensure an RTP of 90%, where
the return to player is 90% of the points they spent over enough games. Theoretically over 10
games if the player spent 100 points they should get 90 back. This is where separating game logic
and visual updates has value, because a good way to determine your RTP is to run millions of
games to simulate play and determine if your calculations are accurate.
- [ ] Apply additional game features such as sound, power ups, animations, etc.
