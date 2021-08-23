import {getResource} from '../services/services';

/*export*/ function cards() {
    //исп классы для карточек
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //с ним если что будем работать как с массивом
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

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
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
}

export default cards;