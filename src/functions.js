export const timeFunction = fn => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();

    return {
        time: end - start,
        result,
    }
};

export const createWithCapacity = length => {
    const arr = new Array(length);
    for (let i = 0; i < length; i++) {
        arr[i] = i % 256;
    }

    return arr;
};

export const createWithPuhs = length => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(i % 256);
    }

    return arr;
};

export const sum = arr => {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }

    return sum;
};