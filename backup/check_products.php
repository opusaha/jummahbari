<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Plugin\Ecommerce\Models\Product;

$products = Product::all();
$out = "Total Products in DB: " . $products->count() . PHP_EOL;

foreach ($products as $p) {
    $out .= "ID: {$p->id}, Name: {$p->name}, Status: {$p->status}, Approved: {$p->is_approved}" . PHP_EOL;
}
file_put_contents('products_log.txt', $out);
