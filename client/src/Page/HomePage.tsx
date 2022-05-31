import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, EffectCube, EffectCards, EffectCoverflow } from 'swiper';

import 'swiper/css';
import 'swiper/css/effect-fade';
import { Box, Typography } from '@mui/material';


const HomePage = () => {
    return (
        < >
            <Swiper modules={[EffectCoverflow, Autoplay]} effect="coverflow" autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }} slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}>

                <SwiperSlide>
                    <div>
                        <img src="/images/hero1.jpg" alt="" style={{ display: 'block', width: '100%' }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src="/images/hero2.jpg" alt="" style={{ display: 'block', width: '100%' }} />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div>
                        <img src="/images/hero3.jpg" alt="" style={{ display: 'block', width: '100%' }} />
                    </div>
                </SwiperSlide>

            </Swiper>
            <Box display='flex' justifyContent='center' sx={{ p: 4 }}>
                <Typography variant='h1'>
                    Welcome to our shop
                </Typography>
            </Box>
        </>
    )
}

export default HomePage