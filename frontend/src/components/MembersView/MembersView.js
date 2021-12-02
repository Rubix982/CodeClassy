import React from 'react'

import MembersViewStyling from '../../../styles/MembersView/MembersView.module.css'
import Image from 'next/image'
import ProfileImage from '../../../public/assets/images/profile.svg'

// To dos
// From jwt payload, check role and generate teacher, collaborators view --> 3 dots for removing, granting a role/access to a member

var Members =
    [
        {
            "name": "David jack"
        },
        {
            "name": "John Doe"
        },
        {
            "name": "Jasmine "
        },
        {
            "name": "Anglelo Mathews"
        },
        {
            "name": "Tashik Moin"
        }
    ]

const MembersView = () => {
    return (
        <div>
            <div className={MembersViewStyling.container}>
                <div className={MembersViewStyling.content}>
                    <div className={MembersViewStyling.teacher}>
                        <div className={MembersViewStyling.header}>
                            <h1> Teacher </h1>
                        </div>
                        {Members.map((member, i) => {
                            return (
                                <div key={i} className={MembersViewStyling.member}>
                                    <div className={MembersViewStyling.profileimage}>
                                        <Image height={30} width={35} src={ProfileImage} alt='Registration-image' />
                                    </div>
                                    <h4> {member.name} </h4>
                                </div>
                            );
                        })}
                    </div>
                    <div className={MembersViewStyling.collaborators}>
                        <div className={MembersViewStyling.header}>
                            <h1> Collaborators </h1>
                        </div>
                        {Members.map((member, i) => {
                            return (
                                <div key={i} className={MembersViewStyling.member}>
                                    <div className={MembersViewStyling.profileimage}>
                                        <Image height={30} width={35} src={ProfileImage} alt='Registration-image' />
                                    </div>
                                    <h4> {member.name} </h4>
                                </div>
                            );
                        })}
                    </div>
                    <div className={MembersViewStyling.students}>
                        <div className={MembersViewStyling.header}>
                            <h1> Students </h1>
                        </div>
                        {Members.map((member, i) => {
                            return (
                                <div key={i} className={MembersViewStyling.member}>
                                    <div className={MembersViewStyling.profileimage}>
                                        <Image height={30} width={35} src={ProfileImage} alt='Registration-image' />
                                    </div>
                                    <h4> {member.name} </h4>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MembersView