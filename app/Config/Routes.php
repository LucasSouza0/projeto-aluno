<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override(function () {
    echo view('welcome_message');
});
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.

$routes->get('/', 'Home::index');

$routes->post('api/auth', 'Auth::auth');

$routes->group('api/user', static function ($routes) {
    $routes->get('(:num)', 'User::show', ['filter' => 'api_auth']);
});

$routes->group('api/student', static function ($routes) {
    $routes->get('/', 'Student::index', ['filter' => 'api_auth']);
    $routes->post('/', 'Student::store', ['filter' => 'api_auth']);

    $routes->get('(:num)', 'Student::show/$1', ['filter' => 'api_auth']);
    $routes->put('(:num)', 'Student::update/$1', ['filter' => 'api_auth']);
    $routes->delete('(:num)', 'Student::delete/$1', ['filter' => 'api_auth']);
});

$routes->group('api/student-photo', static function ($routes) {
    $routes->post('create/(:any)', 'Student::savePhoto/$1', ['filter' => 'api_auth']);
    $routes->post('remove/(:num)', 'Student::deletePhoto/$1', ['filter' => 'api_auth']);
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
