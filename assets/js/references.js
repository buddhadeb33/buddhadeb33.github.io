/*Reference Details Table*/
// Changes made 25/12/2021:
// Added reviewphoto1 - reviewphoto5 in assets/references-page
// Changed names and descriptions of references
const referenceTable = document.querySelector(".pain");

const references = [
    {
        sl1:1,
        name1 : "Tarunam Mahajan(TJ)",
        designation1 : "Technical Program Manager @Equinix",
        image1 : "assets/images/references-page/tarunam.jpeg",
        message1 : "Buddhadeb is very passionate about his work and delivers his best, both in terms of quality and quantity. I've worked with him for more than a year and appreciate his curious nature to learn and grow, not only in his domain but outside. He is someone worth investing all the time and effort because you know that you are getting the biggest bang for your buck. I would recommend him any day and would be happy to work with him in the future.",
        

        sl2:2,
        name2 : "Sourish Haldar",
        designation2 : "Assistance Professor @National Institute of Tecnology, Durgapur", 
        image2: "assets/images/references-page/sourish.jpeg",
        message2 : "I first met Buddha in 2014, when he was placed under my supervision. From the start, he showed initiative and developed many projects for my classes to use. He helped my team with their theories on image decomposition, by creating scripts to compile and sort data. His desire to create quality work has served him well during his time at JIS, and will continue to do so in the future.",
        
        
    },

    {
        sl1:3,
        name1 : "Barkha Yadav",
        designation1 : "Radio Frequency Engineer @Sprint",
        image1 : "assets/images/references-page/barkha.jpeg",
        message1 : "Buddhadeb is very passionate and has a great vision for his work. He is a proactive, result oriented, responsible and technically sound associate and always strives to keep up to date with all the new technologies. He has an exceptional troubleshooting and analytical skills.",
        

        sl2:4,
        name2 : "Anil Rathor",
        designation2 : "Senior Manager @Ericsson",
        image2 : "assets/images/references-page/anil.jpeg",
        message2 : "Buddha will be a valuable asset to any company. I highly recommend working with a professional like Buddhadeb.”",
        
    }
];

AOS.init();   
const fillData = () => {
    let output = "";
    
    references.forEach(
        (
            { sl1, image1, name1, designation1, message1, absbox_for_linkedin1,
             sl2, image2, name2, designation2, message2, absbox_for_linkedin2 }
        ) =>
           (output +=
            `<tr data-aos="zoom-in-left"> 
                <td class="imgCol"><img src="${image1}" class="rImg"></td>
                <td class = "referenceTitleName">
                    <div>
                        <span class="imgResponsive">
                            <img src="${image1}" class="imgRes">
                        </span>
                    </div>
                    <img src="https://img.icons8.com/fluency/48/000000/quote-left.png"/>
                    <a href="#0" class="paperTitle"> ${name1} </a> 
                    <div> ${designation1} </div> <div class="rConferences">  
                        <div class="referenceY">${message1}</div>
                    </div>  
                </td>
            </tr> 
            
            <tr data-aos="zoom-in-left"> 
                       
                        <td class = "referenceTitleName">
                            <div>
                                <span class="imgResponsive">
                                    <img src="${image2}" class="imgRes">
                                </span>
                            </div>
                            <img src="https://img.icons8.com/fluency/48/000000/quote-left.png"/>
                            <a href="#0" class="paperTitle">${name2} </a> 
                            <div> ${designation2} </div> <div class="rConferences">
                                <div class="referenceY">${message2}</div>
                            </div>
                
                            
                            
                           
                        </td>
                        <td class="imgCol"><img src="${image2}" class="rImg1"></td>
                    </tr>`
                )
            );
            referenceTable.innerHTML = output;
        }
document.addEventListener("DOMContentLoaded", fillData);
