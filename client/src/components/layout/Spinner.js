import React,{Fragment}  from 'react';
import spinner from './loading1.gif';
const Spinner = () => {
    return (
        <Fragment>
            <img
                src={spinner}
                style={{width: '500px', margin: 'auto', display: 'block'}}
                alt={'Loading...'}
            />
        </Fragment>
    );
};

export default Spinner;