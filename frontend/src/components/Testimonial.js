import React  from "react";

class Testimonial extends React.Component {
    state = {
        testimonialData : [
            {
                avatar : "assets/landing/story.jpg",
                name : "Cristan && Irina",
                content : "Globally engage compelling meta-services vis-a-vis collaborative catalysts for change. Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            },
            {
                avatar : "assets/landing/story.jpg",
                name : "Jubae && Suzy",
                content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            },
            {
                avatar : "assets/landing/story.jpg",
                name : "Pabel && Galina",
                content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            },
            {
                avatar : "assets/landing/story.jpg",
                name : "Jinchemin && Wangdu",
                content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            },
            {
                avatar : "assets/landing/story.jpg",
                name : "Vpapayan && Golya",
                content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            },
            {
                avatar : "assets/landing/story.jpg",
                name : "Perpeson && Oxana",
                content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            }
        ],
        initData: {}
    }
    componentDidMount(){
        this.initTestimonial();
    }
    componentDidUpdate(){
        this.initTestimonial();
    }
    initTestimonial(){
        var	testim = document.getElementById("testim"),
            testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
            testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
            testimLeftArrow = document.getElementById("left-arrow"),
            testimRightArrow = document.getElementById("right-arrow"),
            testimSpeed = 4500,
            currentSlide = 0,
            currentActive = 0,
            testimTimer,
                touchStartPos,
                touchEndPos,
                touchPosDiff,
                ignoreTouch = 30;
        ;
        function playSlide(slide) {
            for (var k = 0; k < testimDots.length; k++) {
                testimContent[k].classList.remove("active");
                testimContent[k].classList.remove("inactive");
                testimDots[k].classList.remove("active");
            }
            if (slide < 0) {
                slide = currentSlide = testimContent.length-1;
            }
            if (slide > testimContent.length - 1) {
                slide = currentSlide = 0;
            }
            if (currentActive !== currentSlide) {
                testimContent[currentActive].classList.add("inactive");            
            }
            testimContent[slide].classList.add("active");
            testimDots[slide].classList.add("active");
            currentActive = currentSlide;
            clearTimeout(testimTimer);
            testimTimer = setTimeout(function() {
                playSlide(currentSlide += 1);
            }, testimSpeed)
        }
        testimLeftArrow.addEventListener("click", function() {
            playSlide(currentSlide -= 1);
        })
        testimRightArrow.addEventListener("click", function() {
            playSlide(currentSlide += 1);
        })    
        for (var l = 0; l < testimDots.length; l++) {
            testimDots[l].addEventListener("click", function() {
                var currentSlide = testimDots.indexOf(this);
                playSlide(currentSlide);
            })
        }
        playSlide(currentSlide);
        // keyboard shortcuts
        document.addEventListener("keyup", function(e) {
            switch (e.keyCode) {
                case 37:
                    testimLeftArrow.click();
                    break;
                    
                case 39:
                    testimRightArrow.click();
                    break;

                default:
                    break;
            }
        })
        testim.addEventListener("touchstart", function(e) {
                touchStartPos = e.changedTouches[0].clientX;
        })
        testim.addEventListener("touchend", function(e) {
                touchEndPos = e.changedTouches[0].clientX;
            
                touchPosDiff = touchStartPos - touchEndPos;
                if (touchPosDiff > 0 + ignoreTouch) {
                        testimLeftArrow.click();
                } else if (touchPosDiff < 0 - ignoreTouch) {
                        testimRightArrow.click();
                } else {
                    return;
                }
        })
    }
    render() {
        return (
            <div id="testim" className="testim">
                <span id="right-arrow" className="arrow right fa fa-chevron-right" style={{visibility : "hidden"}}></span>
                <span id="left-arrow" className="arrow left fa fa-chevron-left " style={{visibility : "hidden"}}></span>
                <div id="testim-content" className="cont">
                    {this.state.testimonialData.length >= 1 ? this.state.testimonialData.map((item, idx) => {
                        return(
                            <div key={idx} className={idx === 0 ? "active" : ""}>
                                <div className="img"><img src={item.avatar} alt="" /></div>
                                <h2>{item.name}</h2>
                                <p>❝ {item.content} ❞</p>                    
                            </div>
                        )
                    }) : <div className="active"></div>}
                </div>
                <ul id="testim-dots" className="dots">
                    {this.state.testimonialData.length >= 1 ? this.state.testimonialData.map((item, idx) => {
                        return(
                            <li key={"dot_" + idx} className={idx === 0 ? "dot active" : "dot"}></li>
                        )
                    }) : <li className="active"></li>}
                </ul>
            </div>
        )
    }
}

export default Testimonial;