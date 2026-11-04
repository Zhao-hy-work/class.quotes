// 用一个运行标记防止连续点击产生多组重叠的计时器。
const machine = document.getElementById('machine');
const machineSwitch = document.getElementById('machine-switch');
const machineStatus = document.getElementById('machine-status');
let running = false;

function wait(milliseconds) {
  return new Promise(function (resolve) {
    window.setTimeout(resolve, milliseconds);
  });
}

machineSwitch.addEventListener('click', async function () {
  if (running) return;
  running = true;
  // aria-disabled 保留键盘焦点；上面的判断负责阻止重复操作。
  machineSwitch.setAttribute('aria-disabled', 'true');
  machineSwitch.setAttribute('aria-checked', 'true');
  machine.classList.add('is-on');
  machineStatus.textContent = 'You turned it on. It has other plans…';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const step = reducedMotion ? 160 : 450;

  await wait(step);
  machine.classList.add('lid-open');
  await wait(step);
  machine.classList.add('hand-out');
  await wait(step);
  machineSwitch.setAttribute('aria-checked', 'false');
  machine.classList.remove('is-on');
  machineStatus.textContent = 'Off again. A job perfectly undone.';
  await wait(step);
  machine.classList.remove('hand-out');
  await wait(step);
  machine.classList.remove('lid-open');
  await wait(step);

  machineSwitch.removeAttribute('aria-disabled');
  running = false;
  machineStatus.textContent = 'That is all it does. Go on, try again.';
});

machineSwitch.disabled = false;
