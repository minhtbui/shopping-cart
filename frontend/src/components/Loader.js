import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/loading2';

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
    };
    return (
        <div>
            <Lottie
                options={defaultOptions}
                height={200}
                width={200}
                speed={3}
            />
        </div>
    );
};

export default Loader;
