
<?php
// Database credentials
$host = 'localhost';
$dbname = 'gestion_clients.sql';
$username = 'your_username';
$password = 'your_password';

// Email configuration
$email_to = 'customer@example.com'; // Replace with the customer's email
$email_subject = 'Confirmation de commande';
$email_headers = "From: no-reply@example.com\r\n";

try {
    // Connect to the database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Get the data from the request
    $data = json_decode(file_get_contents("php://input"), true);
    $cart = $data['cart'];
    $total = $data['total'];

    // Insert the order into the database
    $stmt = $pdo->prepare("INSERT INTO orders (total_price, created_at) VALUES (:total, NOW())");
    $stmt->execute(['total' => $total]);
    $order_id = $pdo->lastInsertId();

    // Insert each item into the order_items table
    $stmt = $pdo->prepare("INSERT INTO order_items (order_id, item_name, item_price) VALUES (:order_id, :item_name, :item_price)");
    foreach ($cart as $item) {
        $stmt->execute([
            'order_id' => $order_id,
            'item_name' => $item['name'],
            'item_price' => $item['price']
        ]);
    }

    // Prepare the email body
    $email_body = "Merci pour votre commande !\n\n";
    $email_body .= "Détails de votre commande :\n";
    foreach ($cart as $item) {
        $email_body .= "- {$item['name']}: {$item['price']} TND\n";
    }
    $email_body .= "\nTotal : $total TND\n\n";
    $email_body .= "Nous espérons vous revoir bientôt !";

    // Send the confirmation email
    if (mail($email_to, $email_subject, $email_body, $email_headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Échec de l\'envoi de l\'e-mail.']);
    }
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
?>
