(function () {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#' + burger.dataset.target);
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
})();

document.querySelectorAll('#nav button').forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
  navEl.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      toggleTab(this.id, this.dataset.target);
    }
  });
});

document.querySelectorAll('.modal-button').forEach(function (element) {
  element.addEventListener('keyup', function (event) {
    let enableFocusTimeout;
    if (event.keyCode === 13) {
      const modalId = element.getAttribute('data-target');
      if (element.tagName === 'ARTICLE') {
        element.click();
        enableFocusTimeout = true;
      }

      addFocus(modalId, element, enableFocusTimeout);
    }
  });
});

window.onload = function () {
  var interval = window.setInterval(showStatus, 60000);
};

function addFocus(modalId, parentEl, enableFocusTimeout) {
  const modalButton = document.getElementById(modalId).querySelector('[aria-label="Close"]');
  modalButton.focus();
  modalButton.onclick = function () {
    enableFocusTimeout
      ? setTimeout(() => {
          parentEl.focus();
        }, 200)
      : parentEl.focus();
  };
}

function showStatus() {
  document.querySelector('#status-field').innerHTML = `Status Code: ${Math.floor(Math.random() * 10)}`;
}

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll('#nav button');

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add('is-active');
    } else {
      if (navEl.classList.contains('is-active')) {
        navEl.classList.remove('is-active');
      }
    }
  });

  var tabs = document.querySelectorAll('.tab-pane');

  tabs.forEach(function (tab) {
    if (tab.id == targetId) {
      tab.style.display = 'block';
    } else {
      tab.style.display = 'none';
    }
  });
}
