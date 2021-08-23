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

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

//важна последовательность
import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded',() => {
    //не важна последовательность
    // const tabs = require('./modules/tabs'), //require функция из nodejs для загрузки модулей
    //                                         //require(), module.exports и exports - API's модульной системы из nodejs
    //       modal = require('./modules/modal'),
    //       timer = require('./modules/timer'),
    //       cards = require('./modules/cards'),
    //       calc = require('./modules/calc'),
    //       forms = require('./modules/forms'),
    //       slider = require('./modules/slider');

    // tabs();
    // modal();
    // timer();
    // cards();
    // calc();
    // forms();
    // slider();

    //важна последовательность
    //модальное окно со временем (итак вызовется!!)
    const modalTimerId = setTimeout(() => openModal('.modal',modalTimerId), 50000);

    tabs('.tabheader__item','.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]','.modal',modalTimerId);
    timer('.timer', '2021-08-25');
    cards();
    calc();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        slide: '.offer__slide',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        filled: '.offer__slider-inner'
    });
});