function showModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    //if (modal.classList.contains('hide')) {
        modal.classList.remove('hide');
    //}
    modal.classList.add('show');
    //modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';
    if (modalTimerId) { clearInterval(modalTimerId); }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    //modal.classList.toggle('show');
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //modal
    const 
        //btnModalShow = document.querySelectorAll('[data-modal]'),
        btnModalShow = document.querySelectorAll(triggerSelector),
    //1 делегируем событие, чтобы учитывались и динамические кнопки и вместо
    //btnModalClose = document.querySelectorAll('[data-close]'), используем проверку свойства
    //а не навешиваем обработкчик на кнопку Close

    //modal = document.querySelector('.modal');
        modal = document.querySelector(modalSelector);
    btnModalShow.forEach( item => {
        item.addEventListener('click', () => showModal(modalSelector, modalTimerId)); //обход вызова ф-и с параметром
    });
    /*1/ вместо этого добавим проверку в modal.addEventListener
    evt.target.getAtribute('data-close') == ''
    btnModalClose.forEach( item => {
    item.addEventListener('click', closeModal);
    });
    */
    modal.addEventListener('click', (evt) => {
        if (evt.target === modal || evt.target.getAttribute('data-close') == '') {
            //console.log(evt.target.getAttribute('data-close'));
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    // modal open to 25 sec and listed site end
    //const modalTimerId = setTimeout (showModal, 50000);

    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            showModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}
export default modal;
export {closeModal};
export {showModal};