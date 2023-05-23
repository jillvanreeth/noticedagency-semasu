<?php

require "../vendor/autoload.php";

$allowedFields = ["subject","firstname","lastname","company","email","textarea"];
$params = [];
$input = file_get_contents('php://input');
$paramsObjects = json_decode($input);
foreach ($paramsObjects as &$paramsObject){
    if(!isset($paramsObject->value) || $paramsObject->value == ""){
        echo json_encode(false);
        return;
    }
    if($paramsObject->name == "email"){
        if(!filter_var($paramsObject->value,FILTER_VALIDATE_EMAIL)){
            echo json_encode(false);
            return;
        }
    }
    $params[$paramsObject->name] = $paramsObject->value;
}
foreach ($allowedFields as $field){
    if(!array_key_exists($field,$params)){
        echo json_encode(false);
        return;
    }
}

$template= file_get_contents(getcwd()."/templates/__emails/contact.html.twig");

$templates = array("Contact" => $template);
$twig = new \Twig_Environment(new \Twig_Loader_Array($templates));
$rendered = $twig->render("Contact", $params);

$mailer = new PHPMailer\PHPMailer\PHPMailer();
$mailer->setFrom("no-reply@semasu.be","Semasu");
$mailer->addAddress("welcome@semasu.be");
$mailer->isHTML(true);
$mailer->addBcc("jochem.claus@gmail.com");
$mailer->addBcc("dries.vandenhoeck@gmail.com");
$mailer->Subject="Contact: semasu.be";
$mailer->Body=$rendered;
$send = $mailer->send();

echo json_encode($send);