import trelloEnums from '../trello-api/trello-enums';
import ChallengeLog from '../challenge-log/challenge-log';

const type = trelloEnums.Type.Challenge;

const challengeLog = new ChallengeLog(type);

const context = {
    board: 'board #1',
    member: 'member #1',
    card: 'card #1',
};

const pledge = {
    id: 1,
    text: 'pledge #1'
};

const reason = {
    id: 1,
    text: 'reason #1'
}

// if reason x count even (including 0), then reason x count is 0
// if reason x count odd, then reason x count is 1

const memoize = (func) => {
    const results = {};
    return (...args) => {    
      const argsKey = JSON.stringify(args);
      if (!results[argsKey]) {
        results[argsKey] = func(...args);
      }
      return results[argsKey];
    };
  };

const expectations = [
    [1, 1, 2],
    [1, 2, 3],
    [2, 1, 3],
  ];

describe.each(expectations)('.add(%i, %i)', (a, b, expected) => {

    const add = memoize((a,b) => a + b);

    test(`returns ${expected}`, () => {
      expect(add(a,b)).toBe(expected);
    });
  
    test(`returned value not be greater than ${expected}`, () => {
      expect(add(a,b)).not.toBeGreaterThan(expected);
    });
  
    test(`returned value not be less than ${expected}`, () => {
      expect(add(a,b)).not.toBeLessThan(expected);
    });
});


// interface TestData {
//     a: number, 
//     b: number,
//     expected: number
//   }

const fn = () => {
    return describe.each`
        a    | b    | expected
        ${1} | ${1} | ${2}
        ${1} | ${2} | ${3}
        ${2} | ${1} | ${3}
        `;
}

fn()('$a + $b', ({a, b, expected}) => {
  
    test(`returns ${expected}`, () => {
    expect(a + b).toBe(expected);
  });

  test(`returned value not be greater than ${expected}`, () => {
    expect(a + b).not.toBeGreaterThan(expected);
  });

  test(`returned value not be less than ${expected}`, () => {
    expect(a + b).not.toBeLessThan(expected);
  });
});