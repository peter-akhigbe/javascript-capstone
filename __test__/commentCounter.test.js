import commentCounter from '../src/modules/commentCounter.js';

test('test comment counter', () => {
  document.body.innerHTML = `
    <h3 class="comments">Comments</h3>

    <ul class="comments-list">
      <li>Usesles movie</li>
      <li>waste of time</li>
      <li>rubbish</li>
    </ul>
  `;

  const comments = document.querySelector('.comments');

  commentCounter();

  expect(comments.textContent).toBe('Comments (3)');
});
