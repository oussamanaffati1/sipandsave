checkoutBtn.addEventListener("click", function () {
    // Send order data to the server
    fetch('process_order.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart, total: parseFloat(cartTotalEl.textContent) }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Commande confirmée et enregistrée !");
            cart = [];
            updateCart();
        } else {
            alert("Erreur : " + data.message);
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi de la commande :", error);
        alert("Une erreur est survenue.");
    });
});
