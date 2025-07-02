<?php
// Only process POST requests
if ($_SERVER["REQUEST_METHOD"] == "POST") {

  // Clean and assign inputs
  $name    = htmlspecialchars(trim($_POST["name"]));
  $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
  $phone   = htmlspecialchars(trim($_POST["phone"]));
  $people  = htmlspecialchars(trim($_POST["people"]));
  $date    = htmlspecialchars(trim($_POST["date"]));
  $time    = htmlspecialchars(trim($_POST["time"]));
  $message = htmlspecialchars(trim($_POST["message"]));

  // Validate email
  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo "Invalid email address.";
    exit;
  }

  // Email recipient
  $to = "worrasin.au@gmail.com";
  $subject = "New Table Booking Request @ $date, $time";

  // Email content
  $email_content = "New booking request:\n\n";
  $email_content .= "Name: $name\n";
  $email_content .= "Email: $email\n";
  $email_content .= "Phone: $phone\n";
  $email_content .= "Guests: $people\n";
  $email_content .= "Date: $date\n";
  $email_content .= "Time: $time\n";
  $email_content .= "Message:\n$message\n";

  // Email headers
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";

  // Send the email
  if (mail($to, $subject, $email_content, $headers)) {
    echo "OK"; // Required by BootstrapMade form JS for success
  } else {
    http_response_code(500);
    echo "Failed to send booking request.";
  }

} else {
  // Not a POST request
  http_response_code(403);
  echo "Forbidden: Invalid request method.";
}
?>
