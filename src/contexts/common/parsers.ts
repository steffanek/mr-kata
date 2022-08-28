import type { RoverCommand } from "../rover-context/commands/Command"
import type { T } from "./effect-utils"
import { hole, Tagged } from "./effect-utils"

//THIS IS NOT USED
class ParseError extends Tagged("ParseError")<{
  readonly command: string
}> {}

//command can be anything..
//Now, command are just string, but they can contain more information
//and have a payload, we need a parser to parse everything

//The parser depends from where the command will be sent
//- from the command line => certainly only text, or we can build up payload by asking question
//- transport via network, we will need to serialize

//Question: the parser must expect the input in the current format?
//- like string, json, etc?
//So before we can have an API that only accept payload in specific format?
export function parseCommand(command: unknown): T.IO<ParseError, RoverCommand> {
  return hole()
}
