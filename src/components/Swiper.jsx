import { register } from 'swiper/element/bundle';
register();

export function Swiper() {
  return (
    <swiper-container slides-per-view="3" navigation="true" pagination="true">
      <swiper-slide>Slide 1</swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
    </swiper-container>
  );
}
