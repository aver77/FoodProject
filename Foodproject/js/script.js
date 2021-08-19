// //урок 37 ClassList и делегирование событий
// const btns = document.querySelectorAll('button'),
//       wrapper = document.querySelector('.btn-block');

// //console.log(btns[0].classList.length); //кол-во классов
// // console.log(btns[0].classList.item(1)); //назв класса
// // console.log(btns[0].classList.add("red","someclass"));
// // console.log(btns[0].classList.remove("blue"));

// // btns[1].classList.add("red");
// // if (btns[1].classList.contains('red'))
// // {
// //     console.log ('red');
// // }

// // btns[0].addEventListener('click',() => { //шикарно для бургера!
// //     if (!btns[0].classList.contains("red")) {
// //         btns[0].classList.add("red");
// //     } else {
// //         btns[0].classList.remove("red");
// //     }
// // })

// // btns[0].addEventListener('click',() => { //шикарно для бургера!
// //         btns[1].classList.toggle("red");
// // })
//     //делегирование событий
// wrapper.addEventListener('click',(event) => {
//     //console.dir(event.target); //у button tagName BUTTON => обращение к кнопкам по его имени
//     // if (event.target.classList.contains("blue")){
//     //     console.log("class blue");
//     // }
//     if (event.target && event.target.tagName == "BUTTON") {
//         console.log("hello");
//         if (event.target.classList.contains("red"))
//         {
//             event.target.classList.remove("red");
//         }
//         else {
//             event.target.classList.add("red");
//         }
//     }
// })

//динамическое добавление эл-та через js
// const btn = document.createElement('button');
// btn.classList.add("red");
// // wrapper.prepend(btn);
// wrapper.append(btn);

// 38. Создаем табы в новом проекте

// window.addEventListener('DOMContentLoaded', () => {

//     const tabs = document.querySelectorAll(".tabheader__item"),
//           tabsContent = document.querySelectorAll(".tabcontent"),
//           tabsParent = document.querySelector(".tabheader__items");

//     function hideTabContent() {
//         tabsContent.forEach(item => {
//             item.style.display = 'none';
//             // item.classList.add('hide');
//             // item.classList.remove('show','fade');
//         });

//         tabs.forEach(item => {
//             item.classList.remove('tabheader__item_active');
//         }) 
//     }

//     function showTabContent(i = 0) {
//         tabsContent[i].style.display='block';
//         // tabsContent[i].classList.add('show','fade');
//         // tabsContent[i].classList.remove('hide');
//         tabs[i].classList.add('tabheader__item_active');
//     }
          
//     hideTabContent();
//     showTabContent();

//     tabsParent.addEventListener('click', (event) => {
//         const target = event.target;

//         if (target && target.classList.contains('tabheader__item'))
//         {
//             tabs.forEach((item,i) => {
//                 if (target == item)
//                 {
//                     hideTabContent();
//                     showTabContent(i);
//                 }
//             })
//         }
//     })
// })

// //повторение кода из урока 38

window.addEventListener('DOMContentLoaded',() => {
    const tabsWrapper = document.querySelector('.tabheader__items'),
          tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent');

    hide();
    show();

    tabsWrapper.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item'))
        {
            let i=0;
            for (i;i<tabs.length;i++)
            {
                if (tabs[i] == target)
                    break;
            }
            hide();
            show(i);
        }

    })

    function hide() 
    {
        tabsContent.forEach(item => {
            item.style.display = 'none';
        })
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function show(i = 0) 
    {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

//41. Создаем таймер обратного отсчета на сайте

const deadline = '2021-08-20'

function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 *24)), //* секунды, * часы, * дни
          hours = Math.floor((t / (1000 * 60 * 60))%24),
          minutes = Math.floor((t/(1000*60))%60),
          seconds = Math.floor((t/1000)%60);
    return {
        'total':t,
        'days':days,
        'hours':hours,
        'minutes':minutes,
        'seconds':seconds
    };
}

function getZero(num) {
    if (num>=0 && num <10) {
        return `0${num}`;
    } else {
        return num;
    }
}

function setClock(selector,endtime) {
    const timer = document.querySelector(selector);
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock,1000);
    
    updateClock(); //исправление бага, когда в таймер в первую секунду подставляются числа из верстки

    function updateClock() {
        const t = getTimeRemaining(endtime);

        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);

        if (t.total <=0)
            clearInterval(timeInterval);
    }
}

setClock('.timer', deadline);
          

setTimeout(() => {
    console.log('hello after 2 sec');
}, 2000);

//модальное окно

const btns_modalOpen = document.querySelectorAll('[data-modal]'),
info_modal = document.querySelector('.modal'),
info_Nmodal = document.querySelector('.modal__dialog');
// btns_modalClose = document.querySelector('[data-close]');
btns_modalOpen.forEach((item) => {
item.addEventListener('click',() => {
  openModal();
})
})

//модальное окно со временем (итак вызовется!!)
const modalTimerId = setTimeout(openModal,50000);

//модальное окно при скролле
function showModalByScroll () {
if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight)
{
  openModal();
  window.removeEventListener('scroll',showModalByScroll);   
}
}
window.addEventListener('scroll',showModalByScroll);

// btns_modalClose.addEventListener('click', closeModal);

info_modal.addEventListener('click',(event) => {
if (event.target === info_modal || event.target.getAttribute('data-close') == '')
{
  // info_modal.classList.add('hide');
  // info_modal.classList.remove('show');
  // document.body.style.overflow='';
  closeModal();
}
})

document.addEventListener('keydown',(event) => {
if (event.code == "Escape" && info_modal.style.display=='block') {
  closeModal();
}
})

function closeModal () {
info_modal.style.display='none';
document.body.style.overflow='';
}
function openModal () {
info_modal.style.display = 'block';
document.body.style.overflow = 'hidden';
clearInterval(modalTimerId);
}

//исп классы для карточек
class MenuCard {
constructor(src,alt,title,descr,price,parentSelector,...classes) {
  this.src=src;
  this.alt=alt;
  this.title=title;
  this.descr=descr;
  this.price=price;
  this.classes=classes; //с ним если что будем работать как с массивом
  this.parent = document.querySelector(parentSelector);
  this.transfer = 27;
  this.changeToUAH();
}

changeToUAH() {
  this.price = this.price * this.transfer;
}

render() {
    const element = document.createElement('div'); //просто див
    //добавление класса а в дальнейшем и наполнение кодом для дива
    if (this.classes.length == 0) {
        element.classList.add('menu__item')
    }
    //заполняем див классами которые передаем в параметрах ...rest (а мб и не передаем)
    this.classes.forEach(className => {
        element.classList.add(className);
    })
    element.innerHTML = 
    `
        <img data-secondIco src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
    `;
    this.parent.append(element);
    }
}

const getResource = async (url) => {
    const res = await fetch(url);

    //тк catch для fetch не отлавливает ошибку при неправильном запросе
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`); //выкидываем ошибку вручную
    }

    return await res.json(); //трансформация ответа в json
};

getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img,altimg,title,descr,price}) => {
            new MenuCard(img,altimg,title,descr,price, '.menu .container').render();
        });
    });

// new MenuCard(
//     "img/tabs/vegy.jpg",
//     "vegy",
//     'Меню "Фитнес"',
//     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//     9,
//     '.menu .container',
//     'menu__item',
//     'big' 
// ).render(); 

// new MenuCard(
//     "img/tabs/elite.jpg",
//     "elite",
//     'Меню “Премиум"',
//     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//     23,
//     '.menu .container',
//     'menu__item'
// ).render(); 

// new MenuCard(
//     "img/tabs/post.jpg",
//     "post",
//     'Меню "Постное"',
//     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//     15,
//     '.menu .container',
//     'menu__item'
// ).render(); 

//мой варик попроще
// class MenuCard {
//     constructor(src,alt,title,descr,price) {
//         this.src=src;
//         this.alt=alt;
//         this.title=title;
//         this.descr=descr;
//         this.price=price;
//         this.parent = document.querySelector('.menu .container');
//     }
//     render() {
//         const element = document.createElement('div');
//         element.innerHTML=
//         `
//         <div class="menu__item">
//             <img data-secondIco src=${this.src} alt=${this.alt}>
//             <h3 class="menu__item-subtitle">${this.title}</h3>
//                 <div class="menu__item-descr">${this.descr}</div>
//             <div class="menu__item-divider"></div>
//             <div class="menu__item-price">
//                 <div class="menu__item-cost">Цена:</div>
//                 <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
//             </div>
//         </div>
//         `;

//         this.parent.append(element);
//     }
// }

// const 
//     firstCard = new MenuCard(
//         "img/tabs/vegy.jpg",
//         "vegy",
//         'Меню "Фитнес"',
//         'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//         229
//     ),
//     secondCard = new MenuCard(
//         "img/tabs/elite.jpg",
//         "elite",
//         'Меню "Премиум"',
//         'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//         550
//     ),
//     thirdCard = new MenuCard(
//         "img/tabs/post.jpg",
//         "post",
//         'Меню "Постное"',
//         'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//         430
//     );

// firstCard.render();
// secondCard.render();
// thirdCard.render();

//forms

const forms = document.querySelectorAll('form');

const msg = {
    loading: 'icons/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
};

forms.forEach(item => {
    bindpostData(item);
})

const postData = async (url, data) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type':'application/json'
        },
        //body: formData
        body: data
    });
    return await res.json(); //трансформация ответа в json
};

function bindpostData(form)
{
    form.addEventListener('submit',(event) => {
        event.preventDefault();

        const statusMsg = document.createElement('img');
        statusMsg.src = msg.loading;
        statusMsg.style.cssText = 
        `
            display:block;
            margin: 0 auto;
        `;
        // form.append(statusMsg);
        form.insertAdjacentElement('afterend',statusMsg);

        // const request = new XMLHttpRequest();
        // request.open('POST','server.php');

        // request.setRequestHeader('Content-type','multipart/form-data');
        ////// превращаем FormData в json
        // request.setRequestHeader('Content-type','application/json');
        const formData = new FormData(form);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));

        // const json = JSON.stringify(object);

        // request.send(json);
        // request.send(formData);

        postData('http://localhost:3000/requests',json)
        .then(data => {
            console.log(data);
            showThanksModal(msg.success);
            statusMsg.remove();
        }).catch(() => {
            showThanksModal(msg.failure);
        }).finally(() => {
            form.reset();
        })

        //АНАЛОГ fetch() - XMLHttpRequest
        // request.addEventListener('load',() => {
        //     if (request.status===200) {
        //         console.log(request.response);
        //         showThaksModal(msg.success);
        //         form.reset();
        //         statusMsg.remove();
        //     } else {
        //         showThaksModal(msg.failure);
        //     }
        // })
    })

    //54. Красивое оповещение пользователя
    function showThanksModal(msg) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.style.display='none';

        openModal();
        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML=
        `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${msg}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(()=>{
            thanksModal.remove();
            prevModalDialog.style.display='block';
            closeModal();
        },3000);
    }
}

fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res));

// fetch('https://jsonplaceholder.typicode.com/posts',{
//     method: "POST",
//     body: JSON.stringify({name: 'Alex'}),
//     headers: {
//         'Content-type':'application/json'
//     }
// }).then(response => response.json()).then(json => console.log(json));

//59. Получение данных с сервера. Async/Await (ES8)//59.

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
const slides = document.querySelectorAll('.offer__slide'),
      slider = document.querySelector('.offer__slider'),
      prev = document.querySelector('.offer__slider-prev'),
      next = document.querySelector('.offer__slider-next'),
      total = document.querySelector('#total'),
      current = document.querySelector('#current'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      width = window.getComputedStyle(slidesWrapper).width,
      slidesField = document.querySelector('.offer__slider-inner');

let slideIndex = 1;
let offset = 0; //отступ

// showSlides(slideIndex);

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent =  `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent =  slideIndex;
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

for (let i=0;i< slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to',i+1);
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

next.addEventListener('click',() => {
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

prev.addEventListener('click',() => {
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
    dot.addEventListener('click',(event) => {
        const slideTo = event.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        //offset = +width.slice(0, width.length - 2) * (slideTo - 1);
        offset = setIrregular(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        checkSlidesLength();
        setOpacity();
    });
});

function checkSlidesLength()
{
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
    return +str.replace(/\D/g,'');
}

//Калькулятор

const result = document.querySelector('.calculating__result span');

let sex,
    height,
    weight,
    age,
    ratio;

    if (localStorage.getItem("sex")) {
        sex = localStorage.getItem("sex");
    } else {
        sex = 'female';
        localStorage.setItem("sex","female");
    }

    if (localStorage.getItem("ratio")) {
        ratio = localStorage.getItem("ratio");
    } else {
        ratio = 1.375;
        localStorage.setItem("ratio",1.375);
    }

function InitLocalSettings(selector,activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.classList.remove('activeClass');
        if (elem.getAttribute('id') === localStorage.getItem("sex")) {
            elem.classList.add(activeClass);
        }
        if (elem.getAttribute('data-ratio') === localStorage.getItem("ratio")) {
            elem.classList.add(activeClass);
        }
    })
}
InitLocalSettings('#gender div', 'calculating__choose-item_active'); //где ищем, что добавляем!
InitLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

function calcTotal() {
    if (!sex || !height || !weight || !age || !ratio ) {
        result.textContent = `____`;
        return;
    } 
    if (sex === 'female') {
        result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) ) * ratio);
    } else {
        result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) ) * ratio);
    }
}
calcTotal();

function getStaticInformation(selector,activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
        elem.addEventListener('click',(e) => {
            if (e.target.getAttribute('data-ratio')) {
                ratio = +e.target.getAttribute('data-ratio');
                localStorage.setItem("ratio",+e.target.getAttribute('data-ratio'));
            } else {
                sex = e.target.getAttribute('id');
                localStorage.setItem("sex",e.target.getAttribute('id'));
            }
            // console.log(ratio,sex);
    
            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            });
    
            e.target.classList.add(activeClass);
    
            calcTotal();
        });
    })
    // document.querySelector(parentSelector).addEventListener('click',(e) => {
    //     if (e.target.getAttribute('data-ratio')) {
    //         ratio = +e.target.getAttribute('data-ratio');
    //     } else {
    //         sex = e.target.getAttribute('id');
    //     }
    //     // console.log(ratio,sex);

    //     elements.forEach(elem => {
    //         elem.classList.remove(activeClass);
    //     });

    //     e.target.classList.add(activeClass);

    //     calcTotal();
    // });
}

getStaticInformation('#gender div', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');

function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener('input',() => {

        if (input.value.match(/\D/g)) {
            input.style.border = '1px solid red';
        } else {
            input.style.border = 'none';
        }

        switch(input.getAttribute('id')) {
            case 'height': {
                height = +input.value;
                break;
            }
            case 'weight': {
                weight = +input.value;
                break;
            }
            case 'age': {
                age = +input.value;
                break;
            }
        }

        calcTotal();
    });
}

});