import React from "react";
import preloader from './../../../assets/images/spinning-dots.svg';
import preloadermodule from './Preloader.module.css';

const Preloader = (props) => {

    return <div>
        {props.userState.isFetching ? <img className={preloadermodule.preloader} src={preloader} alt="preloader" /> : null}
    </div>
}

export default Preloader;