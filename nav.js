// 把共用的 HTML 片段加载到指定位置，四个页面不再重复写导航。
function load(file, target) {
  const container = document.getElementById(target);

  return fetch(file)
    .then(function (response) {
      // fetch 遇到 404 不会自动报错，所以主动检查状态。
      if (!response.ok) {
        throw new Error('Could not load ' + file + ': ' + response.status);
      }
      return response.text();
    })
    .then(function (html) {
      // 只插入本项目自己的 nav.html / footer.html，不插入用户输入。
      container.innerHTML = html;

      if (target === 'site-header') {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = container.querySelectorAll('.links a');
        links.forEach(function (link) {
          if (link.getAttribute('href') === currentPage) {
            link.setAttribute('aria-current', 'page');
          }
        });
      }
    })
    .catch(function (error) {
      const message = document.createElement('p');
      message.className = 'load-error';
      message.textContent = window.location.protocol === 'file:'
        ? 'Open this site with VS Code Live Server to load the shared navigation and footer.'
        : 'This part of the page could not load. Please refresh and try again.';
      container.replaceChildren(message);
      console.error(error);
    });
}

load('nav.html', 'site-header');
load('footer.html', 'site-footer');
