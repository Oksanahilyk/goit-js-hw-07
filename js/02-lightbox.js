import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);


function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `<li>
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
</li>`
  }).join('');
}

galleryContainer.addEventListener('click', imageClick);
 function imageClick(event) {
	event.preventDefault();
	if (event.target.nodeName !== "IMG") return;
 
	const isItemImage = event.target.classList.contains('gallery__image');
	if (!isItemImage) return;
 
	const currentImgUrl = event.target.dataset.source;
 
	const instance = basicLightbox.create(
	  `<img src="${currentImgUrl}" width="1280" height="auto">`,
	  {
		 onShow: (instance) => {
			window.addEventListener('keydown', onEscKeyPress);
		 },
		 onClose: (instance) => {
			window.removeEventListener('keydown', onEscKeyPress);
		 },
	  }
	);
	instance.show();
 
	function onEscKeyPress(event) {
	  const ESC_KEY_CODE = 'Escape';
	  const isEscKey = event.code === ESC_KEY_CODE;
	  if (!isEscKey) return;
	  instance.close();
	}
 }

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});
