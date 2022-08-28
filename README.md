## Mars Rover Kata

You’re part of the team that explores Mars by sending remotely controlled vehicles to the surface of the planet. Develop an API that translates the commands sent from earth to instructions that are understood by the rover.

## Requirements

- You are given the initial starting point (x, y) of a rover and the compass (N, S, E, W) it is facing.
- The rover receives a character array of commands.
- Implement commands that move the rover forward/backward (f, b).
- Implement commands that turn face the rover to a different direction north/south/east/west (n, s, e, w).
- Implement wrapping from one edge of the grid to another. (planets are spheres after all)
- Implement obstacle detection before each move to a new square. If a given sequence of commands encounters an obstacle, the rover moves up to the last possible point, aborts the sequence and reports the obstacle.

## Added functionality

I have added more restrictions and features to make it more fun:

- The size of the planet should be parametrized
- The number of obstacles on the planet should be parametrized
- The obstacles should be placed on the planet randomly
- The position on the planet and the obstacles should be represented on console
- The rover should move like a real vehicle where you can also change it's orientation. The movement you choose (forwards, backwards, left or right) will depend on the orientation of the rover.

## Rules

- Hardcore TDD. No Excuses!
- Change roles (driver, navigator) after each TDD cycle.
- No red phases while refactoring.
- Be careful about edge cases and exceptions. We can not afford to lose a mars rover, just because the developers overlooked a null pointer.
