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
$routes->setDefaultController('Login');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(false);

// $routes->set404Override(static function () {
//     return view('my_errors/not_found.html');
// });

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
$routes->get('/', 'Login::index');
$routes->post('/validar', 'Login::validar');
$routes->get('/salir', 'Login::salir');

$routes->get('principal', 'Login::principal');
$routes->get('/usuarios', 'Usuarios::index');
$routes->get('/usuarios/show', 'Usuarios::show');
$routes->get('/tipos_usuario', 'Tipos_usuario::index');

// ESPACIOS DE TRABAJO
$routes->get('/espacios_trabajo/show', 'Espacios_de_trabajo::show');
$routes->post('/espacios_trabajo/create', 'Espacios_de_trabajo::create');
$routes->post('/espacios_trabajo/update', 'Espacios_de_trabajo::update');
$routes->get('/espacios_trabajo/delete/(:any)', 'Espacios_de_trabajo::delete/$1');
// TABLEROS
$routes->get('/proyectos/show', 'Proyectos::show');
$routes->post('/proyectos/create', 'Proyectos::create');
$routes->post('/proyectos/update', 'Proyectos::update');
$routes->get('/proyectos/delete/(:any)', 'Proyectos::delete/$1');
// GRUPOS
$routes->get('/grupos/show/(:any)', 'Grupos::show/$1');
$routes->post('/grupos/create', 'Grupos::create');
$routes->post('/grupos/update', 'Grupos::update');
$routes->get('/grupos/delete/(:any)', 'Grupos::delete/$1');
$routes->post('/grupos/set_estatus_colpaso', 'Grupos::set_estatus_colpaso');
$routes->post('/grupos/set_color_grupo', 'Grupos::set_color_grupo');
$routes->post('/grupos/set_nombre_grupo', 'Grupos::set_nombre_grupo');
$routes->post('/grupos/set_privacidad_grupo', 'Grupos::set_privacidad_grupo');
// ACTIVIDADES
$routes->post('/actividades/create', 'Actividades::create');
$routes->get('/actividades/actividades_por_grupo/(:any)', 'Actividades::actividades_por_grupo/$1');
$routes->get('/actividades/show/(:any)', 'Actividades::show/$1');
$routes->post('/actividades/update', 'Actividades::update');
$routes->get('/actividades/delete/(:any)', 'Actividades::delete/$1');
$routes->post('/actividades/set_color_grupo', 'Actividades::set_color_grupo');
$routes->post('/actividades/set_nombre_grupo', 'Actividades::set_nombre_grupo');
$routes->post('/actividades/set_privacidad_grupo', 'Actividades::set_privacidad_grupo');
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
