//Translate Instruction

//Actors:
//- pilot (send command to the rover)

//Entities:
//- a rover
//  - local rover state: position (x,y), orientation(north, east, west, south)
//- a planet (grid x --- and y | )
//  - local planet state: grid (x, y), with x (width) and y (height) size, boundaries
//- an obstacle on the planet
//  - local obstacle state: position (x,y)

//Context the rover is positioned on the planet?

//State:
//- global:
//  -initial: a Planet with a rover and some obstacles
//  -final: a Planet with a rover and some obstacles
//Each entity has its life cycle, and state..

//Use cases:
//Commands:
//-turnLeft
//-turnRight
//-moveForward
//-moveBack

//Constraints and business logic for each command is the same:
//- if a planet boundaries is attain, get back to the opposite boundary
//- if an obstacle is encountered move back to the latest point
