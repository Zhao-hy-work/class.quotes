// 每个按钮表示当前访问者是否喜欢这条名言；刷新后恢复为 0。
const likeButtons = document.querySelectorAll('.like-button');

likeButtons.forEach(function (button) {
  // 先绑定事件，再启用按钮：脚本不可用时不会出现能点却无反应的控件。
  button.addEventListener('click', function () {
    const alreadyLiked = button.getAttribute('aria-pressed') === 'true';
    const liked = !alreadyLiked;

    button.setAttribute('aria-pressed', String(liked));
    button.querySelector('.heart').textContent = liked ? '♥' : '♡';
    button.querySelector('.like-label').textContent = liked ? 'Liked' : 'Like';
    button.querySelector('.like-count').textContent = liked ? '1' : '0';
  });
  button.disabled = false;
});
