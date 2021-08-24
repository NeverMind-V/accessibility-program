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

(function () {
  const navMenu = document.querySelector('.navbar-submenu-button');
  const els = document.querySelectorAll('.navbar-submenu-list-item a');
  let index = 0;

  navMenu.addEventListener('click', function () {
    index = 0;
    navMenu.setAttribute('aria-expanded', true);
    navMenu.nextElementSibling.classList.add('is-active');
    els[index].setAttribute('tabindex', 0);
    els[index].focus();
  });

  els.forEach(function (el) {
    el.addEventListener('keydown', function (event) {
      switch (true) {
        case event.keyCode === 9 && event.shiftKey:
          event.preventDefault();
          index--;
          el.setAttribute('tabindex', -1);
          if (els[0] === el) {
            navMenu.nextElementSibling.classList.remove('is-active');
            navMenu.parentElement.previousElementSibling.children[0].focus();
            navMenu.setAttribute('aria-expanded', false);

            return;
          }

          els[index].setAttribute('tabindex', 0);
          els[index].focus();
          break;
        case event.keyCode === 9:
          event.preventDefault();
          index++;
          el.setAttribute('tabindex', -1);
          if (els[els.length - 1] === el) {
            navMenu.nextElementSibling.classList.remove('is-active');
            navMenu.parentElement.nextElementSibling.children[0].focus();
            navMenu.setAttribute('aria-expanded', false);

            return;
          }

          els[index].setAttribute('tabindex', 0);
          els[index].focus();
          break;
        case event.keyCode === 27:
          navMenu.focus();
      }
    });
  });
})();

(function () {
  const tabs = document.querySelectorAll('.tab-button');
  const activeTab = document.querySelector('.tab-button.is-active');

  tabs.forEach(function (tabEl) {
    tabEl.addEventListener('keyup', function (event) {
      let el;
      switch (event.keyCode) {
        case 13:
        case 32:
          const activeTabPanelId = activeTab.getAttribute('data-target');
          const activeTabPanel = document.getElementById(activeTabPanelId);
          const tabElPanelId = tabEl.getAttribute('data-target');
          const tabElPanel = document.getElementById(tabElPanelId);

          activeTab.setAttribute('aria-selected', false);
          activeTab.setAttribute('tabindex', -1);
          activeTab.classList.remove('is-active');
          activeTabPanel.setAttribute('tabindex', -1);

          tabEl.setAttribute('tabindex', 0);
          tabEl.setAttribute('aria-selected', true);
          tabElPanel.setAttribute('tabindex', 0);
          tabEl.classList.add('is-active');
          break;
        case 37:
          el = tabEl.previousElementSibling || tabs[tabs.length - 1];
          el.focus();
          break;
        case 39:
          el = tabEl.nextElementSibling || tabs[0];
          el.focus();
          break;
      }
    });

    tabEl.addEventListener('keydown', function (event) {
      switch (event.keyCode) {
        case 35:
          event.preventDefault();
          tabs[tabs.length - 1].focus();
          break;
        case 36:
          event.preventDefault();
          tabs[0].focus();
          break;
      }
    });
  });
})();

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
