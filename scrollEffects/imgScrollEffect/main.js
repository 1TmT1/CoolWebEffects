// TODO => 60%+ scroll up, 10%- scroll down 
const elScroll = document.documentElement;

const scrollImage = document.querySelector("#scroll-image");

let drag;
let startYPage;
let moveY;

let mousePosition = {
    x: 0,
    y: 0
};

// Magnet Effect

const lerp = (current, target, factor) => {
    return current * (1 - factor) + target * factor;
};

const calculateDistance = (x1, y1, x2, y2) => {
    return Math.hypot(x1 - x2, y1 - y2);
}

class MagneticObject {
    constructor(documentElement) {
        this.documentElement = documentElement;
        this.boundingClientRect = this.documentElement.getBoundingClientRect();
        this.triggerArea = 100;
        this.interpolationFactor = 0.8;
        this.lerpingData = {
            x: {
                current: 0, 
                target: 0
            },
            y: {
                current: 0,
                target: 0
            }
        };
        this.doesNeedRender = true;

        this.resize();
        this.render();
    }

    resize() {
        window.addEventListener("resize", (e) => {
            this.boundingClientRect = this.documentElement.getBoundingClientRect();
        });
    }

    render() {
        const distanceMouseToCenter = calculateDistance(
            mousePosition.x,
            mousePosition.y,
            this.boundingClientRect.left + this.boundingClientRect.width / 2,
            this.boundingClientRect.top + this.boundingClientRect.height / 2
        );

        let targetHolder = {
            x: 0,
            y: 0
        };
        if (distanceMouseToCenter < this.triggerArea) {
            this.documentElement.classList.add("focus");
            targetHolder.x = (mousePosition.x - (this.boundingClientRect.left + this.boundingClientRect.width / 2)) * 0.3;
            targetHolder.y = (mousePosition.y - (this.boundingClientRect.top + this.boundingClientRect.height / 2)) * 0.3;
        } else {
            this.documentElement.classList.remove("focus");
        }
        this.lerpingData["x"].target = targetHolder.x;
        this.lerpingData["y"].target = targetHolder.y;
        for (const item in this.lerpingData) {
            this.lerpingData[item].current = lerp(this.lerpingData[item].current, this.lerpingData[item].target, this.interpolationFactor);
        }

        this.documentElement.style.transform = `translate(${this.lerpingData["x"].current}px, ${this.lerpingData["y"].current}px)`;

        if (this.doesNeedRender){
            window.requestAnimationFrame(() => this.render());
        }
    }
}

imageMagnet = new MagneticObject(scrollImage);

function scrollBottom() {
    window.scrollTo(0, document.body.scrollHeight);

}

function scrollPage(delta) {
    if(delta === -1) {
        scrollImage.style.bottom = "60%";
    } else {
        scrollImage.style.bottom = "10%";
    }
    elScroll.scrollBy({
        top: 500 * delta,
        behavior: "smooth"
    });
}

window.onload = scrollBottom;

elScroll.addEventListener("wheel", (evt) => {

    evt.preventDefault();
    const delta = Math.sign(-evt.deltaY);
    scrollPage(delta);

}, { passive: false });

let scrollTop;

// Draggable scroll image
function scrollImageAnim() {
    if (drag) {
        imageMagnet.doesNeedRender = false;
        requestAnimationFrame(scrollImageAnim);
    }
    // console.log(`Image bottom: ${scrollImage.style.bottom}, mouseY: ${mousePosition.y}`);
    imagePosBottom = parseInt(scrollImage.style.bottom.replace(/\D/g, ""));
    topLimit = window.innerHeight * 0.6;
    bottomLimit = window.innerHeight * 0.1;
    if (imagePosBottom >= topLimit && mousePosition.y >= topLimit || imagePosBottom <= window.innerHeight * 0.07) {

        window.scrollTo(void 0, mousePosition.y);
        // scrollImage.style.bottom = `${window.innerHeight * 0.6}`;
        scrollImage.style.position = "fixed";

    } else {
        // scrollImage.style.position = "absolute";
        scrollImage.style.bottom = `${(startY + (moveY - startYPage) * -1)}px`;
    }
}


const scrollImageOnDown = (e) => {
    drag = scrollImage;
    document.body.style.cursor = "grabbing";
    startYPage = e.pageY;
    startY = scrollImage.style.bottom || "20%";
    requestAnimationFrame(scrollImageAnim);
};

const scrollImageOnMove = (e) => {
    if (drag) {
        moveY = e.pageY;
    } else {
        e.target.classList.remove('no-hover-cursor');
    }

    mousePosition.x = e.clientX;
    mousePosition.y = e.clientY;
};

scrollImage.addEventListener("mousedown", scrollImageOnDown);
scrollImage.addEventListener("touchstart", (e) => {
    scrollImageOnDown(e); 
    document.documentElement.style.overflow = 'hidden';
    startYPage = e.changedTouches[0].pageY;
});
document.addEventListener("touchend", (e) => {
    drag = null;
    startY = scrollImage.style.bottom;
    document.documentElement.style.overflow = 'auto';
});
document.addEventListener("mouseup", (e) => {
    drag = null;
    startY = scrollImage.style.bottom;
    document.body.style.cursor = "default";
    imageMagnet.boundingClientRect = imageMagnet.documentElement.getBoundingClientRect();
    imageMagnet.doesNeedRender = true;
    imageMagnet.render();
    // if (e.target !== document.body) {
    //     e.target.style.cursor = "inherit";
    // }
});
document.addEventListener("touchmove", (e) => {
    scrollImageOnMove(e);
    moveY = e.changedTouches[0].pageY;
});
document.addEventListener("mousemove", scrollImageOnMove);
document.addEventListener("mouseover", (e) => {
    if (drag) {
        e.target.classList.add('no-hover-cursor');
    } else {
        e.target.classList.remove('no-hover-cursor');
    }
});
document.addEventListener("mouseout", (e) => {
    if (drag) {
        e.target.classList.add("no-hover-cursor");
    } else {
        e.target.classList.remove('no-hover-cursor');
    }
});

document.addEventListener("mouseleave", (e) => {
    imageMagnet.doesNeedRender = false;
});

document.addEventListener("mouseenter", (e) => {
    imageMagnet.doesNeedRender = true;
    imageMagnet.render();
});