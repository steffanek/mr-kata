//Problem 1: in TS the number types can be a negative number
//I need to be explicit now, and "as Integer"

//Question: I can still put a -2
// const x: Integer = -2 as Integer
// const y: Integer = 1 as Integer
// const z: Integer = (x + y) as Integer

export interface IntegerBrand {
  readonly Integer: unique symbol
}
export type Integer = number & IntegerBrand
