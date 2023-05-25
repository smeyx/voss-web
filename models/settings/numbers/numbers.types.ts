export interface NumberRange {
    name: string,
    prefix: string,
    currentNumber: number,
    numberLength: number,
    filler: string,
    user_id: number,
}

export interface NumberRangeDb extends NumberRange {
    id: number,
}