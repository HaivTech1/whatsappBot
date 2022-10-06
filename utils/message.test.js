let expect = require('expect');

var { generateMessage } = require('./message');

describe('Generate Message', () => {
  it('should generate correct message object', () => {
    let from = 'HaivTech',
      text = 'Some random message',
      message = generateMessage(from, text);

    // expect(typeof message.createdAt).toBe('number');
    // expect(message).toMatchObject((from, text));
  });
});
