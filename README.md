# Plinko

![Alt text](images/gameplay.png?raw=true "Gameplay")

# Technologies used
- Javascript
- PixiJS
# Physics System Issues:
- [x] Ball must bounce off the pegs, collision detection already works.
- [ ] Smooth out the bouncing mechanic so that the ball simulates a real life ball, bouncing mustn't be dynamic
- [ ] Smooth ball movement
- [ ] Gravity and Friction mechanics
- [ ] Speed and Acceleration mechanics
      
 # Task 1:
- [x] Import art assets to build the game world
- [x] Apply physics to the player ball (collisions and collision tracking with other objects)
- [x] Apply physics to the rest of the world objects (pins and score buckets)
- [x] Implement score system:
    - [x] Deduct 10 from original 100 player points for dropping
    - [x] Increase score for landing in bucket
    - [x] Algorithm to guide player to pre-determined slot.
    - [x] Algorithm to make high value slots less likely to be chosen
    - [x] Player ball has to avoid pins/pegs as it navigates
 
# Task 2:
- [x] Apply full physics to simulate ball movement through the pegs
- [x] Implement collision detection
- [x] Integrate predetermined path with new physics simulation 

# Task 3:
- [ ] Modify the weighting of the landing areas and the calculation to ensure an RTP of 90%, where
the return to player is 90% of the points they spent over enough games. Theoretically over 10
games if the player spent 100 points they should get 90 back. This is where separating game logic
and visual updates has value, because a good way to determine your RTP is to run millions of
games to simulate play and determine if your calculations are accurate.
- [x] Apply additional game features such as sound, power ups, animations, etc. (Animated pins when ball collides with them) 

# How to play
- Clone the project and open in VS Code
- Ensure "Go Live" extension is installed
- Click Go Live and the game will render in the browser
- Click "Play" for simple predetermined slot selection and "Try My Luck" for physics simulated movement
- 
# Developer Tips
- Open inspect page and open the console to view which slots the ball is moving towards when clicking "Play" button
- This button guides the ball to a predetermined slot which is randomly selected
- The "limit" value represents the cap for high value slots selected. If "count" < "limit" then they cannot land on a high value slot
- Once "count" > "limit" then the player has a chance to get a high value slot, then this resets and the limit is randomly selected again.
