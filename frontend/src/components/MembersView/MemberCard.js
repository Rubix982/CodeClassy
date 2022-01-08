// React imports
import React from "react";

// NextJS imports
import Image from "next/image";

// Styling imports
import MemberCardStyling from "@styles/MembersView/MemberCard.module.scss";

// Asset imports
import ProfileImage from "/public/assets/images/profile.svg";

const MemberCard = ({ name }) => {
  return (
    <div className={MemberCardStyling.member}>
      <div className={MemberCardStyling.profileImage}>
        <Image
          height={30}
          width={35}
          src={ProfileImage}
          alt="Registration-image"
        />
      </div>
      <h4> {name} </h4>
    </div>
  );
};

export default MemberCard;
