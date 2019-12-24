/* eslint-disable no-underscore-dangle */
import { atan2, canvas2Cartesian } from "./Math";

jest.mock("react-native-reanimated", () => {
  const getValue = node => {
    if (typeof node === "number") {
      return node;
    }
    return node[" __value"];
  };
  class AnimatedValue {
    " __value": number;

    constructor(val: number) {
      this[" __value"] = val;
    }

    setValue(val: number) {
      this[" __value"] = val;
    }
  }
  return {
    Value: AnimatedValue,
    Node: AnimatedValue,
    block: arr => arr[arr.length - 1],
    add: (a, b) => new AnimatedValue(getValue(a) + getValue(b)),
    sub: (a, b) => new AnimatedValue(getValue(a) - getValue(b)),
    divide: (a, b) => new AnimatedValue(getValue(a) / getValue(b)),
    multiply: (a, b) => new AnimatedValue(getValue(a) * getValue(b)),
    sin: a => new AnimatedValue(Math.sin(getValue(a))),
    tan: a => new AnimatedValue(Math.tan(getValue(a))),
    cos: a => new AnimatedValue(Math.cos(getValue(a))),
    sqrt: a => new AnimatedValue(Math.sqrt(getValue(a))),
    min: (...a) => new AnimatedValue(Math.min(...a.map(b => getValue(b)))),
    max: (...a) => new AnimatedValue(Math.max(...a.map(b => getValue(b)))),
    pow: (...a) =>
      new AnimatedValue(
        a.reduce(
          (b, c, index) => (index > 0 ? getValue(b) ** getValue(c) : c),
          0
        )
      ),
    and: (a, b) => new AnimatedValue(getValue(a) && getValue(b)),
    set: (a, b) => {
      a.setValue(getValue(b));
      return a;
    },
    or: (a, b) => new AnimatedValue(getValue(a) || getValue(b)),
    modulo: (a, b) => new AnimatedValue(getValue(a) % getValue(b)),
    exp: a => new AnimatedValue(Math.exp(getValue(a))),
    asin: a => new AnimatedValue(Math.asin(getValue(a))),
    atan: a => new AnimatedValue(Math.atan(getValue(a))),
    acos: a => new AnimatedValue(Math.acos(getValue(a))),
    floor: a => new AnimatedValue(Math.floor(getValue(a))),
    abs: a => new AnimatedValue(Math.abs(getValue(a))),
    round: a => new AnimatedValue(Math.round(getValue(a))),
    ceil: a => new AnimatedValue(Math.ceil(getValue(a))),
    acc: a => `acc_mock${getValue(a)}`,
    diff: a => `diff_mock${getValue(a)}`,
    concat: (a, b) => getValue(a) + b,
    defined: a => `defined_mock${getValue(a)}`,
    eq: (a, b) => new AnimatedValue(Number(getValue(a) === getValue(b))),
    neq: (a, b) => new AnimatedValue(Number(getValue(a) !== getValue(b))),
    lessThan: (a, b) => new AnimatedValue(Number(getValue(a) < getValue(b))),
    greaterThan: (a, b) => new AnimatedValue(Number(getValue(a) > getValue(b))),
    greaterOrEq: (a, b) =>
      new AnimatedValue(Number(getValue(a) >= getValue(b))),
    lessOrEq: (a, b) => new AnimatedValue(Number(getValue(a) <= getValue(b))),
    not: a => new AnimatedValue(Number(!getValue(a))),
    cond: (a, b, c) =>
      new AnimatedValue(getValue(a) ? getValue(b) : getValue(c))
  };
});

test("atan2", () => {
  expect(Math.round(atan2(100, 100)[" __value"] * 10000)).toBe(
    Math.round(Math.atan2(100, 100) * 10000)
  );
});

test("canvas2Cartesian 1", () => {
  const point = canvas2Cartesian({ x: 500, y: 200 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(0);
  expect(point.y[" __value"]).toBe(0);
});

test("canvas2Cartesian 2", () => {
  const point = canvas2Cartesian({ x: 0, y: 0 }, { x: 500, y: 200 });
  expect(point.x[" __value"]).toBe(500);
  expect(point.y[" __value"]).toBe(-200);
});