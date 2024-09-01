import { Swiper, SwiperSlide } from 'swiper/react';

function Carousel() {
  return (
    <div className="">
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        className="flex flex-row items-center justify-center"
      >
        {/* Add SwiperSlides for each card */}
        <SwiperSlide>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Card 1</h2>
            <p className="text-gray-600">This is the content of the first card.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Card 2</h2>
            <p className="text-gray-600">This is the content of the second card.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Card 3</h2>
            <p className="text-gray-600">This is the content of the third card.</p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Card 4</h2>
            <p className="text-gray-600">This is the content of the fourth card.</p>
          </div>
        </SwiperSlide>

        {/* Add more slides as needed */}
      </Swiper>
    </div>
  );
}

export default Carousel;
