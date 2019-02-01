// ## Implement .reduce
// Should take an array of values and apply the callback
// **Bonus Point:** Do this with recursion
// (https://lodash.com/docs/4.17.10#reduce)

// ## Implement .map
// Now, implement .map
// **Bonus Point:** Do this whilst _using reduce_
// (https://lodash.com/docs/4.17.10#map)

// ## Implement .memoize
// Should pick a property from an object
// (https://lodash.com/docs/4.17.10#memoize)

// ## Implement .defaults
// Takes two arguments, an original object and a set of defaults
// Returns the amalgamation of both
// (https://lodash.com/docs/4.17.10#defaults)

// ## Implement .throttle
// Implement a throttle (that doesn't queue, but drops if the previous throttle is running)
// (https://lodash.com/docs/4.17.10#throttle)

// ## Implement .curry
// Implement a function that curries the function given to it
// (https://lodash.com/docs/4.17.10#curry)

const _ = {
    map: (array, fn) => {
        const result = [];
        for (let i = 0; i < array.length; i++) {
            result[i] = fn(array[i])
        }
        return result;
    },
    reduce: (array, fn, start = 0) => {
        for (let i = 0; i < array.length; i++) {
            start = fn(start, array[i]);
        }
        return start;
    },
    // reduce: (array, fn, start = 0) => {
    //     if (array.length <= 0) return start;
    //     start = fn(start, array[0]);
    //     array.shift();
    //     _.reduce(array, fn, start);
    // },
    memoize: fn => {
        let cache = {};
        return function(...args) {
            if (cache[args]) return cache[args];
            const val = fn(...args);
            cache[args] = val;
            return val;
        }
    },
    defaults: (obj, ...args) => {
        // const obj = Object.assign({}, obj);
        // for (let key in args) {
        //     if (!obj.hasOwnProperty(key)) obj[key] = args[key];
        // }
        // return obj;
        return Object.assign({}, ...args, obj);
    },
    throttle: (fn, delay = 0) => {
        let timer = 0;
        return function(...args) {
            const now = (new Date).getTime();
            if (now - timer < delay) return;
            timer = now;
            return fn(...args);
        }
    },
    curry: fn => {
        //fn.length number of params expected in function
        //args.length number of args passed to function
        return function curryAgain(...args) {
            if (args.length < fn.length) return curryAgain.bind(this, ...args);
            return fn(...args);
        }
    }
}

describe('_.map', () => {
    test('Can concatenate a string as part of a map', () => {
        expect(
            _.map(['Graham', 'Sarah', 'Bob'], (name) => `The ${name}`)
        ).toEqual(
            ['The Graham', 'The Sarah', 'The Bob']
        );
    });
    test('Can map an array with data objects', () => {
        expect(
            _.map([{ name: 'Lou' }], (person) => person.name)
        ).toEqual(
            ['Lou']
        );
    });
    test('does not mutate', () => {
        const originalValues = ['Graham', 'Sarah', 'Bob'];
        expect(_.map(originalValues, (name) => `The ${name}`)).toEqual(['The Graham', 'The Sarah', 'The Bob']);
        expect(originalValues).toEqual(['Graham', 'Sarah', 'Bob']);
    });
});

describe('_.reduce', () => {

    test('Reduces an array without a default', () => {
        const result = _.reduce([{ age: 12 }, { age: 13 }], (prev, item) => { prev = prev + item.age; return prev; });
        expect(result).toEqual(25);
    });

    test('Reduces an array, starting with 10', () => {
        const result = _.reduce([{ age: 12 }, { age: 13 }], (prev, item) => { prev = prev + item.age; return prev; }, 10);
        expect(result).toEqual(35);
    });

    test('Does not mutate original array', () => {
        const original = [{ age: 12 }, { age: 13 }];
        const start = 0;
        const result = _.reduce(original, (prev, item) => { prev = prev + item.age; return prev; }, start);

        expect(original).toEqual([{ age: 12 }, { age: 13 }]);
        expect(result).toEqual(25);
        expect(start).toEqual(0);
    });
});

describe('_.memoize', () => {
    test('Returns correct result, twice', () => {

        const testObject = {
            add: (first, second) => first + second
        };

        const spy = jest.spyOn(testObject, 'add');
        const memoizedFunction = _.memoize(spy);

        expect(memoizedFunction(2, 2)).toEqual(4);
        expect(spy).toHaveBeenCalledTimes(1);

        expect(memoizedFunction(2, 2)).toEqual(4);
        expect(spy).toHaveBeenCalledTimes(1);

        expect(spy).not.toHaveBeenCalledTimes(2);
    });
});

describe('_.defaults', () => {
    test('Returns an object', () => {
        const result = _.defaults({}, {});
        expect(result).toEqual({});
    });
    test('Does not mutate original value', () => {
        const original = {};
        const result = _.defaults(original, {});
        expect(result).not.toBe(original);
    });
    test('Gives precedence to the original object, not default', () => {
        const result = _.defaults({ a : 1 }, { a: 2 });
        expect(result).toEqual({ a: 1 });
    });
});

describe('_.throttle', () => {
    test('Returns correct result, twice', (done) => {
        const click = jest.fn().mockReturnValue(3);
        const throttledClick = _.throttle(click, 100);
    
        expect(throttledClick()).toBe(3);
        expect(click).toHaveBeenCalledTimes(1);

        expect(throttledClick()).toBe(undefined);
        expect(click).toHaveBeenCalledTimes(1);

        setTimeout(() => {
            expect(throttledClick()).toBe(3);
            expect(click).toHaveBeenCalledTimes(2);
            done();
        }, 500);
    });
});

describe('_.curry', () => {
    test('Currys a one argument function', () => {
        
        const inner = jest.fn();
        const outer = (a) => inner(a);
        const curriedFunction = _.curry(outer);
        
        const appliedCurriedFunction = curriedFunction('first');
        
        expect(inner).toHaveBeenCalledWith('first')
        
    });

    test('Currys a two argument function', () => {

        const inner = jest.fn();
        const outer = (a, b) => inner(a, b);
        const curriedFunction = _.curry(outer);
        
        const appliedCurriedFunction = curriedFunction('first')('second');
        
        expect(inner).toHaveBeenCalledWith('first', 'second')
        
    });

    test('Takes two arguments at once', () => {
        
        const inner = jest.fn();
        const outer = (a, b, c) => inner(a, b, c);
        const curriedFunction = _.curry(outer);
        
        const appliedCurriedFunction = curriedFunction('first')('second', 'third');
        
        expect(inner).toHaveBeenCalledWith('first', 'second', 'third');
        
    });
});