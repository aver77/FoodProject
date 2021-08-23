function closeModal(modalSelector) {
    const info_modal = document.querySelector(modalSelector);
    info_modal.style.display = 'none';
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const info_modal = document.querySelector(modalSelector);
    info_modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    // console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

/*export*/ function modal(triggerSelector, modalSelector, modalTimerId) {
    //модальное окно

    const btns_modalOpen = document.querySelectorAll(triggerSelector),
        info_modal = document.querySelector(modalSelector);
        // info_Nmodal = document.querySelector('.modal__dialog');
    // btns_modalClose = document.querySelector('[data-close]');
    btns_modalOpen.forEach((item) => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    })

    // //модальное окно со временем (итак вызовется!!)
    // const modalTimerId = setTimeout(openModal, 50000);

    //модальное окно при скролле
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // btns_modalClose.addEventListener('click', closeModal);

    info_modal.addEventListener('click', (event) => {
        if (event.target === info_modal || event.target.getAttribute('data-close') == '') {
            // info_modal.classList.add('hide');
            // info_modal.classList.remove('show');
            // document.body.style.overflow='';
            closeModal(modalSelector);
        }
    })

    document.addEventListener('keydown', (event) => {
        if (event.code == "Escape" && info_modal.style.display == 'block') {
            closeModal(modalSelector);
        }
    })
}

export default modal;
export {closeModal};
export {openModal};