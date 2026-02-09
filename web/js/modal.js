export function createModal(){
    const overlay = document.querySelector('[data-js="modal-overlay"]');
    const closeBtn = document.querySelector('[data-js="modal-close"]');
    const gameIdEl = document.querySelector('[data-js="modal-game-id"]');

    if (!overlay || !closeBtn) {
        console.error("Modal elements missing in HTML");
        return null;
    }

    let isOpen = false;
    let lastActiveEl = null;

    function open(game, openerEl = null) {
        lastActiveEl = openerEl || document.activeElement;

        if (gameIdEl) gameIdEl.textContent = `GameId: ${game.game_id}`;

        overlay.classList.remove("is-hidden");
        isOpen = true;

        closeBtn.focus();
    }

    function close() {
        overlay.classList.add("is-hidden");
        isOpen = false;
        lastActiveEl?.focus();
    }

    closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) close();
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && isOpen) close();
    });

    return { open, close };
}