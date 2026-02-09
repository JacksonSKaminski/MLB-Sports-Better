export function createModal(){
    const overlay = document.querySelector('[data-js="modal-overlay"]');
    const closeBtn = document.querySelector('[data-js="modal-close"]');
    const gameIdEl = document.querySelector('[data-js="modal-game-id"]');
    const predictBtn = document.querySelector('[data-js="modal-predict-btn"]');
    const predictionResponseText = document.querySelector('[data-js="modal-prediction-results"]');

    if (!overlay || !closeBtn) {
        console.error("Modal elements missing in HTML");
        return null;
    }

    let isOpen = false;
    let lastActiveEl = null;

    function open(game, openerEl = null) {
        lastActiveEl = openerEl || document.activeElement;

        console.log(gameIdEl);

        if (gameIdEl) gameIdEl.textContent = `GameId: ${game.game_id}`;

        
        overlay.classList.remove("is-hidden");
        isOpen = true;

        closeBtn.focus();

        predictionResponseText.classList.add("is-hidden")
        predictBtn.classList.remove("is-hidden");
    }

    function close() {
        overlay.classList.add("is-hidden");
        isOpen = false;
        lastActiveEl?.focus();
    }

    function predict() {
        predictionResponseText.classList.remove("is-hidden")
        predictBtn.classList.add("is-hidden");
    }

    closeBtn.addEventListener("click", close);
    predictBtn.addEventListener("click", predict);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) close();
    });

    return { open, close };
}