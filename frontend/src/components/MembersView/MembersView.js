import React from 'react'
import MembersViewStyling from '../../../styles/MembersView/MembersView.module.css'
import Image from 'next/image'
import ProfileImage from '../../../public/assets/images/profile.svg'


const MembersView= () =>
{
    return(
        <div className={MembersViewStyling.container}>
            <div className={MembersViewStyling.content}>

                <div className={MembersViewStyling.teacher}>

                    <div className={MembersViewStyling.header}>
                        <h1> Teachers</h1>
                    </div>

                    <div className={MembersViewStyling.member}>
                        <div className={MembersViewStyling.profileimage}>
                            <Image height={30} width={35} src={ProfileImage} alt='Registration-image'/>
                        </div>
                        <h4> Tashik Moin </h4>
                    </div>
                </div>

                <div className={MembersViewStyling.collaborators}>
                </div>

                <div className={MembersViewStyling.students}>
                </div>

            </div>
        </div>
    )
}

export default MembersView