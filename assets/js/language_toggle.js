document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('[data-language-toggle]').forEach(function(root) {
    var panels = Array.prototype.slice.call(root.querySelectorAll('[data-lang-panel]'));
    var buttons = Array.prototype.slice.call(root.querySelectorAll('[data-lang-target]'));
    var defaultLang = root.getAttribute('data-default-lang') || 'en';
    var storageKey = root.getAttribute('data-storage-key') || 'article-language';

    function readStoredLanguage() {
      try {
        return window.localStorage.getItem(storageKey);
      } catch (error) {
        return null;
      }
    }

    function writeStoredLanguage(lang) {
      try {
        window.localStorage.setItem(storageKey, lang);
      } catch (error) {
        return;
      }
    }

    function setLanguage(lang) {
      root.setAttribute('data-current-lang', lang);

      buttons.forEach(function(button) {
        var isActive = button.getAttribute('data-lang-target') === lang;
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      panels.forEach(function(panel) {
        panel.hidden = panel.getAttribute('data-lang-panel') !== lang;
      });

      writeStoredLanguage(lang);
    }

    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        setLanguage(button.getAttribute('data-lang-target'));
      });
    });

    setLanguage(readStoredLanguage() || defaultLang);
  });
});
