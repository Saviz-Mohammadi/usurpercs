/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2025 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

// NOTE (SAVIZ):
// This is a modified version of Bootstrap's original color-mode switcher.

(() => {
  'use strict';

  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = (theme) => localStorage.setItem('theme', theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  const setTheme = (theme) => {
    if (theme === 'auto') {
      document.documentElement.setAttribute(
        'data-bs-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light',
      );
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };

  setTheme(getPreferredTheme());

  const showActiveTheme = (theme, focus = false) => {
    const themeSwitcher = document.querySelector('#bd-theme');

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text');
    // NOTE (SAVIZ):
    // Removed the reference to '.theme-icon-active use'.
    // The button no longer shows an icon, so there was nothing left for this selector to target.
    const btnToActive = document.querySelector(
      `[data-bs-theme-value="${theme}"]`,
    );
    // NOTE (SAVIZ):
    // Removed 'svgOfActiveBtn', which used to read the icon's 'href' off the clicked option.
    // It's no longer needed now that the switcher shows text instead of icons.

    document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
      element.classList.remove('active');
      element.setAttribute('aria-pressed', 'false');
    });

    btnToActive.classList.add('active');
    btnToActive.setAttribute('aria-pressed', 'true');
    // NOTE (SAVIZ):
    // Replaced the icon swap with a text update.
    // The toggle button now shows the selected theme's own label (Light/Dark/Auto) instead of swapping an icon.
    themeSwitcherText.textContent = btnToActive.textContent.trim();
    // NOTE (SAVIZ):
    // Can't reuse 'themeSwitcherText.textContent' here anymore.
    // This is because it now holds the theme name itself.
    themeSwitcher.setAttribute(
      'aria-label',
      `Toggle theme (${btnToActive.dataset.bsThemeValue})`,
    );

    if (focus) {
      themeSwitcher.focus();
    }
  };

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', () => {
      const storedTheme = getStoredTheme();
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setTheme(getPreferredTheme());
      }
    });

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme());

    document.querySelectorAll('[data-bs-theme-value]').forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const theme = toggle.getAttribute('data-bs-theme-value');
        setStoredTheme(theme);
        setTheme(theme);
        showActiveTheme(theme, true);
      });
    });
  });
})();
