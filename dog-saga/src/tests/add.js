const add = (a, b) => a + b;

const generateGreeting = (name = 'Anonymous') => `Hello ${name}!`;

test('Should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toEqual(7);

  // Option 2
  /* if( result !== 7) {
    throw new Error(`You added 4 and 3. THe result was ${result}. Expect 7`);
  } */
});

test('Should greet you', () => {
  const greet = generateGreeting('anan');
  expect(greet).toBe(`Hello anan!`);
});
