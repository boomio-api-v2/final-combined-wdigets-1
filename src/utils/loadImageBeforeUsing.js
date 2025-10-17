export const loadImageBeforeUsing = (images) => {
  images.forEach((img) => {
    const image = new Image();
    image.src = img;
  });
};
