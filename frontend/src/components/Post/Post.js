import React from "react";
import PostStyling from "../../../styles/Post/Post.module.css"
import { Avatar} from '@mui/material';
import Image from "next/image";
import announcementImage from "../../../public/assets/images/announcement.png"
import commentImage from "../../../public/assets/images/comment.png"

const commentsData =
[
    {
        "name": "Tashik Moin",
        "comment": "Commodo amet irure laborum aute culpa voluptate officia qui nulla sint in tempor sint. Qui ut ea mollit aliqua et fugiat anim sit et adipisicing ullamco commodo. Veniam quis enim consequat est quis. Duis aliqua esse nisi laborum tempor consequat magna ut occaecat veniam veniam incididunt ex magna. Elit elit ad officia consequat."
    },
    {
        "name": "Muhammad Hassan Zahid",
        "comment": "Commodo amet irure laborum aute culpa voluptate officia qui nulla sint in tempor sint. Qui ut ea mollit aliqua et fugiat anim sit et adipisicing ullamco commodo. Veniam quis enim consequat est quis. Duis aliqua esse nisi laborum tempor consequat magna ut occaecat veniam veniam incididunt ex magna. Elit elit ad officia consequat."
    },
    {
        "name": "Saif Ul Islam",
        "comment": "Commodo amet irure laborum aute culpa voluptate officia qui nulla sint in tempor sint. Qui ut ea mollit aliqua et fugiat anim sit et adipisicing ullamco commodo. Veniam quis enim consequat est quis. Duis aliqua esse nisi laborum tempor consequat magna ut occaecat veniam veniam incididunt ex magna. Elit elit ad officia consequat."
    }
]

const Post = () => {


  return (
    <div className={PostStyling.container}>
        <div className={PostStyling.postcontainer}>

            <div className={PostStyling.postheader}>

                <div className={PostStyling.imagecontainer}>
                    <Image src={announcementImage} height={70} width={70}></Image>
                </div>

                <div className={PostStyling.headingcontainer}>
                    <h1 className={PostStyling.heading}> Announcement </h1> 
                    <div className={PostStyling.teachername}> Rauf Ahmed Shams Malick • Oct 31 </div>
                    {/* teachername + date  //media query to be written */}
                </div> 

            </div>

            <div className={PostStyling.postcontent}>
                <p className={PostStyling.content}>
                    Proident deserunt do dolore Lorem veniam magna aliquip adipisicing esse nisi. Ad esse non voluptate minim Lorem laboris. Enim irure do voluptate cupidatat in. Pariatur culpa amet duis amet non esse commodo minim culpa cupidatat incididunt. Sit amet deserunt et ipsum aliqua pariatur amet cupidatat fugiat. Proident et magna do laboris tempor non eu nostrud labore ad ipsum laborum. Id amet mollit nisi laborum amet in aliquip aute dolor commodo voluptate.

                    Duis id esse dolore sit eu voluptate labore amet. Consectetur ipsum incididunt irure do cillum nisi id ullamco irure est. Labore sit pariatur sunt pariatur. Exercitation id et sint ullamco exercitation ipsum.

                    Amet consequat laborum amet nisi eu. Do sit cillum esse pariatur consequat magna commodo. Laborum consequat irure veniam ex ex amet tempor amet quis cupidatat sunt sint.

                    In ipsum aliqua consectetur amet voluptate aliqua reprehenderit ipsum quis cupidatat. Id consequat velit incididunt sunt id laboris. Consequat et veniam occaecat consectetur reprehenderit consequat veniam velit. Nostrud amet cupidatat exercitation ex nostrud.

                    Commodo amet irure laborum aute culpa voluptate officia qui nulla sint in tempor sint. Qui ut ea mollit aliqua et fugiat anim sit et adipisicing ullamco commodo. Veniam quis enim consequat est quis. Duis aliqua esse nisi laborum tempor consequat magna ut occaecat veniam veniam incididunt ex magna. Elit elit ad officia consequat.
                </p>
            </div>

            <div className={PostStyling.commentsContainer}>

                <div className={PostStyling.commentHeadingContainer}>
                    <Image src={commentImage} height={30} width={28}></Image>
                    <h1 className={PostStyling.commentHeading}> 
                        Comments
                    </h1>
                </div>

                <div className={PostStyling.commentsArray}>

                    {commentsData.map((i, index) => {
                        return (
                            <div key={index} className={PostStyling.comment}>
                                <Avatar style={{ backgroundColor: '#f44336', fontSize: '1rem'}} aria-label="recipe">
                                TM
                                </Avatar>
        
                                <div>
                                    <h3 className={PostStyling.commenter} > {i.name} </h3>
                                    <p style={{ marginLeft: '15px'}}>
                                    {i.comment}
                                    </p>
                                </div>
                            </div>
                        );
                    })}

                </div>

                <div className={PostStyling.writeComment}>
                    <Avatar style={{ backgroundColor: '#f44336', fontSize: '1rem'}} aria-label="recipe">
                        TM
                    </Avatar>
                    <input type="textarea" className={PostStyling.commentBox}/>
                </div>



            </div>

        </div>
    </div>
  );
};


export default Post;
