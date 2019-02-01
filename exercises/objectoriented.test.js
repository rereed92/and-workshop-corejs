
// This is an exercise in design patterns

// Create a calculator object/constructor/class that takes some numbers

// And then exposes the following methods: 

// * `sum`
// * `multiply`
// * `getValueOfPI`

// For this exercise... _you_ write the tests.

// ## Part 1: Module
// Implement the above using a JS object module.
const modCalculator = {
    sum: (...args) => args.reduce((x, y) => x + y, 0),
    multiply: (...args) => args.reduce((x, y) => x * y, 1),
    getValueOfPI: () => Math.PI,
}

describe('Module', () => {
    describe('sum', () => {
        test('Will add two numbers together', () => {
            expect(modCalculator.sum(2, 2)).toEqual(4);
        });
        test('Will add three numbers together', () => {
            expect(modCalculator.sum(2, 2, 2)).toEqual(6);
        });
    });
    describe('multiply', () => {
        test('Will multiply two numbers together', () => {
            expect(modCalculator.multiply(2, 2)).toEqual(4);
        });
        test('Will multiply three numbers together', () => {
            expect(modCalculator.multiply(2, 2, 2)).toEqual(8);
        });
    });
    describe('getValueOfPI', () => {
        test('Will return 3.141592653589793', () => {
            expect(modCalculator.getValueOfPI()).toEqual(3.141592653589793);
        });
    });
});

// ## Part 2: Constructor
// Implement the above using a Constructor
function ConstructorCalculator(...args) {
    this.sum = args.reduce((x, y) => x + y, 0);
    this.multiply = args.reduce((x, y) => x * y, 1);
    this.getValueOfPI = Math.PI;
}

describe('Constructor', () => {
    describe('sum', () => {
        test('Will add two numbers together', () => {
            const Calc = new ConstructorCalculator(2, 2);
            expect(Calc.sum).toEqual(4);
        });
        test('Will add three numbers together', () => {
            const Calc = new ConstructorCalculator(2, 2, 2);
            expect(Calc.sum).toEqual(6);
        });
    });
    describe('multiply', () => {
        test('Will multiply two numbers together', () => {
            const Calc = new ConstructorCalculator(2, 2);
            expect(Calc.multiply).toEqual(4);
        });
        test('Will multiply three numbers together', () => {
            const Calc = new ConstructorCalculator(2, 2, 2);
            expect(Calc.multiply).toEqual(8);
        });
    });
    describe('getValueOfPI', () => {
        test('Will return 3.141592653589793', () => {
            const Calc = new ConstructorCalculator();
            expect(Calc.getValueOfPI).toEqual(3.141592653589793);
        });
    })
});

// ## Part 3: Class
// Implement the above using a Class

class ClassCalculator {
    constructor() {}

    sum(...args) {
        return args.reduce((x, y) => x + y, 0)
    }

    multiply(...args) {
        return args.reduce((x, y) => x * y, 1)
    }

    static getValueOfPI() {
        return Math.PI
    }

}
describe('Class', () => {
    describe('sum', () => {
        test('Will add two numbers together', () => {
            const Calc = new ClassCalculator();
            expect(Calc.sum(2, 2)).toEqual(4);
        });
        test('Will add three numbers together', () => {
            const Calc = new ClassCalculator();
            expect(Calc.sum(2, 2, 2)).toEqual(6);
        });
    });
    describe('multiply', () => {
        test('Will multiply two numbers together', () => {
            const Calc = new ClassCalculator();
            expect(Calc.multiply(2, 2)).toEqual(4);
        });
        test('Will multiply three numbers together', () => {
            const Calc = new ClassCalculator();
            expect(Calc.multiply(2, 2, 2)).toEqual(8);
        });
    });
    describe('getValueOfPI', () => {
        test('Will return 3.141592653589793', () => {
            expect(ClassCalculator.getValueOfPI()).toEqual(3.141592653589793);
        });
    })
});

// ## Part 4: Prototypes
// Modify your above example by using a Class

function Memory() {
    this.value = 0
    this.updateValue = (val) => this.value += val
}

function ProtoCalculator(...args) {
    this.sum = args.reduce((x, y) => x + y, 0);
    this.multiply = args.reduce((x, y) => x * y, 1);
    this.getValueOfPI = Math.PI;
}

ProtoCalculator.prototype = new Memory();

describe('Prototype', () => {
    describe('sum', () => {
        test('Will add two numbers together', () => {
            const Calc = new ProtoCalculator(2, 2);
            expect(Calc.sum).toEqual(4);
        });
        test('Will add three numbers together', () => {
            const Calc = new ProtoCalculator(2, 2, 2);
            expect(Calc.sum).toEqual(6);
        });
    });
    describe('multiply', () => {
        test('Will multiply two numbers together', () => {
            const Calc = new ProtoCalculator(2, 2);
            expect(Calc.multiply).toEqual(4);
        });
        test('Will multiply three numbers together', () => {
            const Calc = new ProtoCalculator(2, 2, 2);
            expect(Calc.multiply).toEqual(8);
        });
    });
    describe('getValueOfPI', () => {
        test('Will return 3.141592653589793', () => {
            const Calc = new ProtoCalculator();
            expect(Calc.getValueOfPI).toEqual(3.141592653589793);
        });
    });
    describe('Memory', () => {
        test('Will update value', () => {
            const Calc = new ProtoCalculator();
            expect(Calc.value).toEqual(0);
            Calc.updateValue(2);
            expect(Calc.value).toEqual(2);
        });

        test('Will update value using sum', () => {
            const Calc = new ProtoCalculator(4, 2);
            Calc.updateValue(Calc.sum);
            expect(Calc.value).toEqual(8); // extra 2 from summation above
        });
    });
});