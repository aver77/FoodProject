/*export*/ function slider({container,slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, filled}) 
{
    //61 слайдер вариант 1 (моя попытка)
    //ВСЕ ПРАВИЛЬНО!!

    // const slides = document.querySelectorAll('.offer__slide'),
    //       nextButton = document.querySelector('.offer__slider-next'),
    //       prevButton = document.querySelector('.offer__slider-prev'),
    //       currentSLideNumber = document.querySelector('#current');
    // const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    //       n = slidesWrapper.childElementCount;
    // console.log(n);
    // console.dir(slidesWrapper);
    // let currentSlide = 0;

    // hideRest();
    // nextButton.addEventListener('click', getNext);
    // prevButton.addEventListener('click', getPrev);

    // function getNext() {
    //     if (currentSlide < n - 1)
    //     {
    //         slides[currentSlide].style.display = 'none';
    //         currentSlide++;
    //         currentSLideNumber.innerHTML = getZero(currentSlide + 1);
    //         slides[currentSlide].style.display = 'block';
    //     } else {
    //         slides[currentSlide].style.display = 'none';
    //         currentSlide = 0;
    //         currentSLideNumber.innerHTML = getZero(currentSlide + 1);
    //         slides[currentSlide].style.display = 'block';
    //     }
    // }
    // function getPrev() {
    //     if (currentSlide > 0)
    //     {
    //         slides[currentSlide].style.display = 'none';
    //         currentSlide--;
    //         currentSLideNumber.innerHTML = getZero(currentSlide + 1);
    //         slides[currentSlide].style.display = 'block';
    //     } else {
    //         slides[currentSlide].style.display = 'none';
    //         currentSlide = n - 1;
    //         currentSLideNumber.innerHTML = getZero(currentSlide + 1);
    //         slides[currentSlide].style.display = 'block';
    //     }
    // }
    // function hideRest() {
    //     slides.forEach((item,i=0) => {
    //         if (i!==0) {
    //             item.style.display='none';
    //         }
    //         i++;
    //     })
    // }

    //61 слайдер вариант 1 (препода)
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesField = document.querySelector(filled);

    let slideIndex = 1;
    let offset = 0; //отступ

    // showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex+=n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });

    //62 - Более сложный слайдер по типу карусели!

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    })
    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    // indicators.classList.add('carousel-indicators');
    indicators.style.cssText =
        `
position: absolute;
right: 0;
bottom: 0;
left: 0;
z-index: 15;
display: flex;
justify-content: center;
margin-right: 15%;
margin-left: 15%;
list-style: none;
`;
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText =
            `
  box-sizing: content-box;
  flex: 0 1 auto;
  width: 30px;
  height: 6px;
  margin-right: 3px;
  margin-left: 3px;
  cursor: pointer;
  background-color: #fff;
  background-clip: padding-box;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  opacity: .5;
  transition: opacity .6s ease;
`;
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == setIrregular(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += setIrregular(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        checkSlidesLength();

        setOpacity();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = setIrregular(width) * (slides.length - 1);
        } else {
            offset -= setIrregular(width);
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        checkSlidesLength();
        setOpacity();
    });
    //63. Создаем навигацию для слайдов

    dots.forEach(dot => {
        dot.addEventListener('click', (event) => {
            const slideTo = event.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            //offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            offset = setIrregular(width) * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            checkSlidesLength();
            setOpacity();
        });
    });

    function checkSlidesLength() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
    }

    function setOpacity() {
        dots.forEach(dot => {
            dot.style.opacity = '0.5';
        });
        dots[slideIndex - 1].style.opacity = 1;
    }

    //+width.slice(0, width.length - 2)
    function setIrregular(str) {
        return +str.replace(/\D/g, '');
    }
}

export default slider;