
<?php

header("Content-Type: application/json");

/* ---------------- SECURITY ---------------- */

function clean($data){
    return htmlspecialchars(strip_tags(trim($data)));
}

/* ---------------- CHECK REQUEST ---------------- */

if($_SERVER["REQUEST_METHOD"] !== "POST"){
    echo json_encode([
        "success" => false,
        "message" => "Invalid request"
    ]);
    exit;
}

/* ---------------- GET FORM DATA ---------------- */

$firstname = clean($_POST["firstname"] ?? "");
$lastname = clean($_POST["lastname"] ?? "");
$email = clean($_POST["email"] ?? "");
$phone = clean($_POST["phone"] ?? "");
$inquiryType = clean($_POST["inquiryType"] ?? "");
$city = clean($_POST["city"] ?? "");
$message = clean($_POST["message"] ?? "");

/* ---------------- VALIDATION ---------------- */

if(empty($firstname) || empty($email)){
    echo json_encode([
        "success" => false,
        "message" => "Required fields missing"
    ]);
    exit;
}

/* ---------------- ZOHO CONFIG ---------------- */

$client_id = "1000.2O0JZ141X993L5AWM1FN5AJ5PLZXTR";
$client_secret = "30d0becc10365b37e88082a0864d810e0389c47f44";
$refresh_token = "000.de2cdc01687cd9707382b21b4b3d73f7.90342aae6ef938b95b689626ea2f98ba";

$org_id = "60066502830";
$department_id = "251948000000385031";

/* ---------------- GET ACCESS TOKEN ---------------- */

$token_url = "https://accounts.zoho.in/oauth/v2/token";

$token_data = [
    "refresh_token" => $refresh_token,
    "client_id" => $client_id,
    "client_secret" => $client_secret,
    "grant_type" => "refresh_token"
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $token_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($token_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$token_response = curl_exec($ch);

curl_close($ch);

$token_result = json_decode($token_response, true);

if(!isset($token_result["access_token"])){

    echo json_encode([
        "success" => false,
        "message" => "Zoho authentication failed"
    ]);
    exit;

}

$access_token = $token_result["access_token"];

/* ---------------- CREATE TICKET ---------------- */

$ticket_url = "https://www.zohoapis.in/desk/api/v1/tickets";

$description =
"City: ".$city.
"\n\nInquiry Type: ".$inquiryType.
"\n\nMessage:\n".$message;

$ticket_data = [
    "subject" => $inquiryType." - Website Inquiry",
    "departmentId" => $department_id,
    "contact" => [
        "firstName" => $firstname,
        "lastName" => $lastname,
        "email" => $email,
        "phone" => $phone
    ],
    "description" => $description
];

$headers = [
    "Authorization: Zoho-oauthtoken ".$access_token,
    "orgId: ".$org_id,
    "Content-Type: application/json"
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $ticket_url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($ticket_data));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

curl_close($ch);

/* ---------------- SUCCESS RESPONSE ---------------- */

echo json_encode([
    "success" => true,
    "message" => "Thank you! We will contact you soon."
]);

?>