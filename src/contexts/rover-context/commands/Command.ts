import { Tagged } from "../../common/effect-utils"

//STEP 3: USE CASES MODELLING
export class TurnLeft extends Tagged("TurnLeft")<{}> {}
export class TurnRight extends Tagged("TurnRight")<{}> {}
export class MoveForward extends Tagged("MoveForward")<{}> {}
export class MoveBack extends Tagged("MoveBack")<{}> {}
// export class Turn180 extends Tagged("Turn180")<{}> {}

//Question: how to solve the Expression problem?
export type MoveCommand = MoveForward | MoveBack
export type TurnCommand = TurnLeft | TurnRight
export type RoverCommand = MoveCommand | TurnCommand

export const RoverCommands = {
  Move: {
    Forward: new MoveForward(),
    Back: new MoveBack()
  },
  Turn: {
    Left: new TurnLeft(),
    Right: new TurnRight()
  }
}
