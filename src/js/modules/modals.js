const modals = (state) => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll("[data-modal]"),
              lastForm = document.querySelector("[data-calc]"),
              scroll = calcScroll();

        let checkInputsResult = true;

        const closeWindows = () => {
            windows.forEach(item => {
                item.style.display = 'none';
            });
        };

        const checkInputs = (trigger) => {
            const stateKeys = Object.keys(state);
            
            switch(trigger) {
                case "button popup_calc_button":
                    stateKeys.length >= 4 ? checkInputsResult = true : checkInputsResult = false;
                    break;
                case "button popup_calc_profile_button":
                    stateKeys.length === 5 ? checkInputsResult = true : checkInputsResult = false;
                    break;
                default:
                    checkInputsResult = true;
            }
        };

        lastForm.addEventListener('submit', (e) => {
            setTimeout(() => {
                closeWindows();
                document.body.classList.remove('modal-open');
                for (let key in state) {
                    if (key === 'type' || key === 'form') {
                        continue;
                    }
                    delete state[key];
                }
            }, 2000);
        });

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }

                checkInputs(item.className);

                if (checkInputsResult) {
                    closeWindows();
                    modal.style.display = "block";
                    document.body.classList.add('modal-open');
                    document.body.style.marginRight = `${scroll}px`;
                } else {
                    alert("???????????????? ?????? ????????????!");
                }
                /* document.body.style.overflow = "hidden"; */
            });
        });

        close.addEventListener('click', () => {
            closeWindows();
            modal.style.display = "none";
            document.body.classList.remove('modal-open');
            document.body.style.marginRight = `0px`;
      /*       document.body.style.overflow = ""; */
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                closeWindows();
                modal.style.display = "none";
                document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;
          /*       document.body.style.overflow = ""; */
            }
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            document.querySelector(selector).style.display = "block";
            document.body.classList.add('modal-open');
            /*       document.body.style.overflow = ""; */
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);

        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    bindModal(".popup_engineer_btn", ".popup_engineer", ".popup_engineer .popup_close");
    bindModal(".phone_link", ".popup", ".popup .popup_close");
    bindModal(".popup_calc_btn", ".popup_calc", ".popup_calc_close");
    bindModal(".popup_calc_button", ".popup_calc_profile", ".popup_calc_profile_close", false);
    bindModal(".popup_calc_profile_button", ".popup_calc_end", ".popup_calc_end_close", false);
    showModalByTime(".popup[data-modal]", 60000);
};  

export default modals;