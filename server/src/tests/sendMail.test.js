const { sendMail } = require('../utils/sendMail');

describe('sendMail function', () => {
  test('sends an email', async () => {
    // Replace the test values with your own
    const to = 'test@example.com';
    const subject = 'Test email';
    const html = '<h1>Test email</h1>';

    // Call the function and wait for it to complete
    const result = await sendMail(to, subject, html);

    // Check that the function completed without errors
    expect(result).toBeUndefined();
  });
});
