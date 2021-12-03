import React , { useState } from 'react'
import Image from 'next/image'
import loadingImage from '../../../public/assets/images/loading.gif'


const Loading= () =>
{
    return(
        <div style={{ height: '100vh', widht: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image height={380} width={500} src={loadingImage} alt='... Loading ...'/>
        </div>
    )
}

export default Loading;
