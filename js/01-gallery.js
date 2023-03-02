import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const itemsMarkup = createGalerryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);


function createGalerryItemsMarkup(items) {
	return items.map(({ preview, original, description }) => {
		 return `<div class="gallery__item">
	<a class="gallery__link" href="${original}">
	  <img
		 class="gallery__image"
		 src="${preview}"
		 data-source="${original}"
		 alt="${description}"
	  />
	</a>
 </div>`;
	  })
	  .join('');
 };
 
 galleryContainer.addEventListener('click', imageClick);
 function imageClick(event) {
	event.preventDefault();
	if (event.target.nodeName !== "IMG") return;
 
	const isItemImage = event.target.classList.contains('gallery__image');
	if (!isItemImage) return;
 
	const currentImgUrl = event.target.dataset.source;
 
	const instance = basicLightbox.create(
	  `
		 <img src="${currentImgUrl}" width="1280" height="auto"/>
			`,
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