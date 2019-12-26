const world = "world";

export function hello (word: string = world) : string {
    return `hello, ${word}`;
}

console.log(hello());