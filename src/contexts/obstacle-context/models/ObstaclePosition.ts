import { Tagged } from "@app/contexts/common/effect-utils"
import type { Integer } from "@app/contexts/common/Integer"

export class ObstaclePosition extends Tagged("ObstaclePosition")<{
  readonly x: Integer
  readonly y: Integer
}> {}
