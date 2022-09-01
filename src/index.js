import getPixabay from './js/getPixabay';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/src/simple-lightbox.scss';

const searchFormEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');
const inputEl = document.querySelector('[name="searchQuery"]');

console.log(inputEl);

let q = '';

const lightbox = new SimpleLightbox('.gallery .tumbs', {
  sourceAttr: 'largeImageURL',
  // captions: true,
  // captionSelector: 'img',
  // captionsData: 'alt',
  // captionPosition: 'bottom',
  // captionDelay: 250,
});

searchFormEl.addEventListener('input', onInput);

function onInput(event) {
  // console.log(inputEl.value);
  q = inputEl.value;
  // При пустому рядку чистимо HTML розмітку
  q ? '' : resetContent();
}

searchFormEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  getPixabay(q).then(response => {
    resetContent();
    console.log(response.hits.length);
    // Перевірка: якщо на пошуковий запит приходить пустий масив з'являється попередження
    response.totalHits === 0
      ? Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        )
      : // Перевірка: якщо на пошуковий запит приходить масив з даними з'являється повідомлення
        // з кількісттю знайдених зображень
        Notiflix.Notify.success(
          `Hooray! We found ${response.totalHits} images.`
        );
    renderContent(response);
    lightbox.refresh();
  });
}

// Генерую розмітку
function createMarkupItem(item) {
  return `<div class="photo-card">
    <div class="tumbs" largeImageURL="${item.largeImageURL}">
      <img
        src="${item.webformatURL}"
        alt="${item.tags}"
        loading="lazy"
      />
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b> ${item.likes}
        </p>
        <p class="info-item">
        <b>Views</b> ${item.views}
      </p>
      <p class="info-item">
      <b>Comments</b> ${item.comments}
      </p>
      <p class="info-item">
      <b>Downloads</b> ${item.downloads}
      </p>
      </div>
      </div>`;

  // galleryEl.insertAdjacentHTML('beforeend', result);

  // console.log();
}

// Перебираю отримані дані та генерую потрібну кількість карточок
function generateContent(response) {
  return response.hits.reduce((acc, item) => acc + createMarkupItem(item), '');
}

// Рендер карточок на сторінці
function renderContent(response) {
  const result = generateContent(response);
  galleryEl.insertAdjacentHTML('beforeend', result);
}

function resetContent() {
  galleryEl.innerHTML = '';
}
