import {closeModal,openModal} from './modal';
import {postData} from '../services/services';

/*export*/ function forms(formSelector, modalTimerId) {
    //forms

    const forms = document.querySelectorAll(formSelector);

    const msg = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindpostData(item);
    })

    function bindpostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMsg = document.createElement('img');
            statusMsg.src = msg.loading;
            statusMsg.style.cssText =
                `
            display:block;
            margin: 0 auto;
        `;
            // form.append(statusMsg);
            form.insertAdjacentElement('afterend', statusMsg);

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

            postData('http://localhost:3000/requests', json)
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
            prevModalDialog.style.display = 'none';

            openModal('.modal',modalTimerId);
            const thanksModal = document.createElement('div');
            thanksModal.classList.add('modal__dialog');
            thanksModal.innerHTML =
                `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${msg}</div>
            </div>
        `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.style.display = 'block';
                closeModal('.modal');
            }, 3000);
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
}

export default forms;