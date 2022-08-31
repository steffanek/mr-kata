import { Ex, T } from "@app/contexts/common/effect-utils"
import type { Integer } from "@app/contexts/common/Integer"
import { gridSize10x10, obstacles, zeroZeroPosition } from "@app/contexts/config"
import { Obstacle } from "@app/contexts/obstacle-context/models/Obstacle"
import { ObstaclePosition } from "@app/contexts/obstacle-context/models/ObstaclePosition"
import { makePlanet } from "@app/contexts/planet-context/models/Planet"
import { RoverCommands } from "@app/contexts/rover-context/commands/Command"
import { makeCollisionDetected } from "@app/contexts/rover-context/errors/CollisionDetected"
import { makeRoverState } from "@app/contexts/rover-context/models/Rover"
import { RoverOrientation } from "@app/contexts/rover-context/models/RoverOrientation"
import { RoverPosition } from "@app/contexts/rover-context/models/RoverPosition"
import { processBatchCommandsV0 } from "@app/contexts/rover-context/processors.ts/batchCommands"
import { processSingleCommand } from "@app/contexts/rover-context/processors.ts/singleCommand"

describe("Handling Rover Move Commands", () => {
  it(`1.
  Given the planet has no obstacles
  And the Rover is positioned at the south border and oriented north,
  When it move forward
  Then the rover position should be changed by one with the same orientation`, async () => {
    //It will happen after adding a new property to a new Type (Planet? What to do, for older test?
    // is the solution, to keep in a separate file those Given context, to change in one place?

    //Given (here I should inject Planet and Rover Ctx OR both if they are dependent
    const planet = makePlanet(gridSize10x10, obstacles)
    const roverState = makeRoverState(zeroZeroPosition, RoverOrientation.North)

    //When
    const command = RoverCommands.Move.Forward

    const processMoveForward = await T.runPromiseExit(
      processSingleCommand(roverState, planet, command)
    )

    //Then
    const roverNewState = makeRoverState(
      new RoverPosition({
        x: 0 as Integer,
        y: 1 as Integer
      }),
      RoverOrientation.North
    )
    //Question: is it deep equality?
    expect(Ex.untraced(processMoveForward)).toEqual(Ex.succeed(roverNewState))
  })
  it(`2.
  Given the planet has obstacles
  And the Rover is positioned at the north border and oriented north,
  When it move forward
  Then the rover position should be at the south border with the same orientation`, async () => {
    const planet = makePlanet(gridSize10x10, obstacles)
    const northBorderPosition = new RoverPosition({
      x: 0 as Integer,
      y: (gridSize10x10.height - 1) as Integer
    })
    const roverState = makeRoverState(northBorderPosition, RoverOrientation.North)

    //When
    const command = RoverCommands.Move.Forward
    const processMoveForward = await T.runPromiseExit(
      processSingleCommand(roverState, planet, command)
    )
    //Then
    const roverNewState = makeRoverState(
      new RoverPosition({
        x: 0 as Integer,
        y: 0 as Integer
      }),
      RoverOrientation.North
    )
    expect(Ex.untraced(processMoveForward)).toEqual(Ex.succeed(roverNewState))
  }),
    it(`3.
        Given the planet has obstacles
        And the Rover is positioned at the south border and oriented north,
        And an obstacle is present at the next position of the Rover
        When it move forward
        Then the rover should detect the collision
        And the rover position should be unchanged with the same orientation`, async () => {
      //Given (here I should inject Planet and Rover Ctx
      const planet = makePlanet(gridSize10x10, obstacles)
      const nearCollisionPosition = new RoverPosition({
        x: 0 as Integer,
        y: 3 as Integer
        //I would rather access my HashSet
        // y: (obstacles[0]["y"] - 1) as Integer
      })
      //here I should just getState
      const roverState = makeRoverState(nearCollisionPosition, RoverOrientation.North)

      //When
      const command = RoverCommands.Move.Forward
      const processMoveForward = await T.runPromiseExit(
        processSingleCommand(roverState, planet, command)
      )
      //Then
      const obstaclePosition = new ObstaclePosition({
        x: nearCollisionPosition.x,
        //if I do this, do I mutate the state of nearCollision?
        y: (nearCollisionPosition.y + 1) as Integer
      })
      const obstacle = new Obstacle({ position: obstaclePosition })
      const roverPosition = roverState.position
      const detectCollision = makeCollisionDetected(obstacle, roverPosition)

      // const roverNewState = makeRoverState(
      //   new Position({
      //     x: 0 as Integer,
      //     y: 3 as Integer
      //   }),
      //   northOrientation
      // )

      expect(Ex.untraced(processMoveForward)).toEqual(Ex.fail(detectCollision))
      // expect(roverState).toEqual(roverNewState)
    }),
    it(`4.
        Given the planet has obstacles
        And the Rover is positioned at the south border and oriented north,
        When it receives a batch of move command
        Then the rover position should be changed to the latest point`, async () => {
      //Given (here I should inject Planet and Rover Ctx
      const planet = makePlanet(gridSize10x10, obstacles)
      const roverState = makeRoverState(zeroZeroPosition, RoverOrientation.North)

      const command1 = RoverCommands.Move.Forward
      const command2 = RoverCommands.Move.Forward
      const command3 = RoverCommands.Move.Back
      const command4 = RoverCommands.Move.Back

      const commands = [command1, command2, command3, command4]

      //When
      const processMultipleMove = await T.runPromiseExit(
        processBatchCommandsV0(roverState, planet, commands)
      )
      //Then
      const roverNewState = makeRoverState(
        new RoverPosition({
          x: 0 as Integer,
          y: 0 as Integer
        }),
        RoverOrientation.North
      )

      expect(Ex.untraced(processMultipleMove)).toEqual(Ex.succeed(roverNewState))
      //   expect(roverState).toEqual(roverNewState)
    })
})
