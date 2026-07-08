---
layout: page
permalink: /cv/
title: cv
description: Please answer one simple question to access the CV.
nav: true
nav_order: 4
---

<style>
  .post-header .post-description {
    margin-bottom: 1.15rem;
  }

  .cv-gate {
    max-width: 540px;
  }

  .cv-question {
    display: block;
    margin-bottom: 0.45rem;
    font-size: 0.95rem;
    font-weight: 400;
  }

  .cv-status,
  .cv-result span {
    color: var(--global-text-color-light);
    font-size: 0.9rem;
  }

  .cv-form {
    margin-top: 0;
  }

  .cv-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    max-width: 520px;
  }

  .cv-row input {
    min-width: 0;
    flex: 1;
    border: 1px solid var(--global-divider-color);
    border-radius: 0;
    padding: 0.31rem 0.5rem;
    color: var(--global-text-color);
    background: var(--global-bg-color);
    font-size: 0.9rem;
    line-height: 1.2;
  }

  .cv-row input::placeholder {
    color: var(--global-text-color-light);
    opacity: 0.85;
  }

  .cv-row input:focus {
    border-color: var(--global-theme-color);
    outline: none;
  }

  .cv-gate .cv-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--global-text-color);
    border-radius: 0;
    padding: 0.31rem 0.75rem;
    color: var(--global-text-color);
    background: transparent;
    font-size: 0.9rem;
    line-height: 1.2;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .cv-gate .cv-btn:hover {
    border-color: var(--global-theme-color);
    color: var(--global-theme-color);
    text-decoration: none;
  }

  .cv-status {
    min-height: 1.25rem;
    margin-top: 0.45rem;
  }

  .cv-result {
    display: none;
    align-items: center;
    gap: 0.75rem;
    margin-top: 0.6rem;
  }

  .cv-result.is-visible {
    display: flex;
  }

  @media (max-width: 575px) {
    .cv-row {
      align-items: stretch;
      flex-direction: column;
    }

    .cv-gate .cv-btn {
      width: 100%;
    }
  }
</style>

<div class="cv-gate">
  <form class="cv-form" data-cv-gate data-cv-url="{{ '/assets/pdf/CV-Suhyeon-Lee.pdf' | relative_url }}">
    <label class="cv-question" for="cv-answer">Who invented Bitcoin?</label>
    <div class="cv-row">
      <input id="cv-answer" type="text" name="answer" placeholder="Enter the full pseudonym" autocomplete="off" />
      <button class="cv-btn" type="submit">Unlock</button>
    </div>
    <div class="cv-status" aria-live="polite"></div>
    <div class="cv-result">
      <span>Access granted. If the download does not start, use the button.</span>
      <a class="cv-btn" href="{{ '/assets/pdf/CV-Suhyeon-Lee.pdf' | relative_url }}" download>Download PDF</a>
    </div>
  </form>
</div>

<script>
  (function () {
    var acceptedHash = '02218d8f87efd7b2adf9fc4ad624f7cb941027111e371ec37c68a30517ba82f8';
    var form = document.querySelector('[data-cv-gate]');
    var input = form.querySelector('input[name="answer"]');
    var status = form.querySelector('.cv-status');
    var result = form.querySelector('.cv-result');
    var downloadUrl = form.getAttribute('data-cv-url');

    function normalizeAnswer(value) {
      return value.normalize('NFKC').toLowerCase().replace(/[^a-z0-9]/g, '');
    }

    function toHex(buffer) {
      return Array.prototype.map.call(new Uint8Array(buffer), function (byte) {
        return byte.toString(16).padStart(2, '0');
      }).join('');
    }

    function sha256(value) {
      return crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)).then(toHex);
    }

    function startDownload() {
      var link = document.createElement('a');
      link.href = downloadUrl;
      link.download = '';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      sha256(normalizeAnswer(input.value)).then(function (answerHash) {
        if (answerHash === acceptedHash) {
          status.textContent = '';
          result.classList.add('is-visible');
          startDownload();
          return;
        }

        result.classList.remove('is-visible');
        status.textContent = 'Please enter the full pseudonym.';
      });
    });
  })();
</script>
