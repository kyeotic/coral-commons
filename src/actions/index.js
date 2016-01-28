export const UPDATE = 'UPDATE';

export function update(thing) {
    return {
        type: UPDATE,
        thing: thing
    };
}