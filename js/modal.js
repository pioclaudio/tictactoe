
const modal = (() => {
    let modal = document.getElementById("myModal");

    const init = () => {
        let span = document.getElementsByClassName("close")[0];
        span.onclick = () => {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        let button = document.querySelector(".button");
        button.onclick = () => {
            displayController.gameReset();
            modal.style.display = "none";
        }
    }

    const openModal = () => {
      modal.style.display = "flex";
    }

    const setText = (text) => {
        modal.querySelector("p").innerHTML = text;
    }
    
    return {init, openModal, setText};

})();