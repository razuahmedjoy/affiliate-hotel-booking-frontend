import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Lottie from 'lottie-react';
import React from 'react';

const LottieAnimation = ({ path = "", loop = true, autoplay = true }) => {
    return (
        <Lottie animationData={path} loop />
    );
};

export default LottieAnimation;