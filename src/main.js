import { exec } from 'child_process';
import { plot } from 'nodeplotlib';

const test = async (type, length, count = 10) => {
    const times = new Array(count);

    for (let i = 0; i < count; i++) {
        times[i] = await new Promise(resolve => exec(`node src/test.js ${type} ${length}`, (_, stdout) => resolve(JSON.parse((stdout)))))
    }

    const accTime = {};
    for (const key of Object.keys(times[0])) {
        for (const time of times) {
            accTime[key] = accTime[key] || 0;
            accTime[key] += time[key];
        }
    }

    for (const key of Object.keys(accTime)) {
        accTime[key] /= count;
    }
    return accTime;
};

// const lengths = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864];
const lengths = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 10_000, 11_000, 12_000, 13_000, 14_000, 15_000, 16384, 17_000, 18_000, 19_000, 20_000, 21_000, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864];
// const lengths = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728];
// const lengths = [1, 2, 4, 8, 16, 32, 64, 128];

const data = [];
for (const length of lengths) {
    const capacity = await test('capacity', length);
    const push = await test('push', length);

    console.log({
        length,
        capacity,
        push,
        difference: {
            create: capacity.creatingTime / push.creatingTime,
            sum: capacity.sumTime / push.sumTime,
        },
    });
    data.push({
        length,
        capacity,
        push,
    })
}

plot([{
    type: "line",
    x: data.map(({ length }) => length),
    y: data.map(({ length, capacity }) => capacity.creatingTime / length),
    name: "capacity"
}, {
    type: "line",
    x: data.map(({ length }) => length),
    y: data.map(({ length, push }) => push.creatingTime / length),
    name: "push"
}], {
    title: "Creating time",
    xaxis: {
        type: "log"
    },
    yaxis: {
        type: "log"
    },
});

plot([{
    type: "line",
    x: data.map(({ length }) => length),
    y: data.map(({ length, capacity }) => capacity.sumTime / length),
    name: "capacity"
}, {
    type: "line",
    x: data.map(({ length }) => length),
    y: data.map(({ length, push }) => push.sumTime / length),
    name: "push"
}], {
    title: "Sum time",
    xaxis: {
        type: "log"
    },
    yaxis: {
        type: "log"
    },
});

plot([{
    type: "line",
    x: data.map(({ length }) => length),
    y: data.map(({ push, capacity }) => push.creatingTime / capacity.creatingTime),
    name: "creating"
}, {
    type: "line",
    x: data.map(({ length }) => length),
    y: data.map(({ push, capacity }) => push.sumTime / capacity.sumTime),
    name: "summing"
}], {
    title: "How much faster is capacity compared to push?",
    xaxis: {
        type: "log"
    },
    yaxis: {
        type: "log"
    },
});