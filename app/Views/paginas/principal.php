<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestor de actividades</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
  <!-- jsGrid -->
  <link rel="stylesheet" href="plugins/jsgrid/jsgrid.min.css">
  <link rel="stylesheet" href="plugins/jsgrid/jsgrid-theme.min.css">
  <!-- SweetAlert2 -->
  <link rel="stylesheet" href="plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css">
  <!-- TEMA DE ADMINLTE -->
  <link rel="stylesheet" href="dist/css/adminlte.min.css">
  <!-- ESTILOS DE LA PAGINA PRINCIPAL -->
  <link rel="stylesheet" href="css/paginas/principal.css">
  <link rel="stylesheet" href="css/paginas/global.css">
</head>

<body class="hold-transition sidebar-mini layout-fixed">

  <div class="wrapper">

    <!-- BARRA ENCABEZADO -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- ICONO PARA ESCONDER EL MENU LATERAL -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
      </ul>

      <!-- HERRAMIENATAS DEL HEADER -->
      <ul class="navbar-nav ml-auto">
        <!-- NAVBAR BUSCADOR -->
        <!-- <li class="nav-item">
                      <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                      <i class="fas fa-search"></i>
                      </a>
                      <div class="navbar-search-block">
                      <form class="form-inline">
                          <div class="input-group input-group-sm">
                          <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                          <div class="input-group-append">
                              <button class="btn btn-navbar" type="submit">
                              <i class="fas fa-search"></i>
                              </button>
                              <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                              <i class="fas fa-times"></i>
                              </button>
                          </div>
                          </div>
                      </form>
                      </div>
                  </li> -->
        <!-- ICONO MENSAJES -->
        <!-- <li class="nav-item dropdown">
                      <a class="nav-link" data-toggle="dropdown" href="#">
                      <i class="far fa-comments"></i>
                      <span class="badge badge-danger navbar-badge">3</span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                      <a href="#" class="dropdown-item">
                          <div class="media">
                          <img src="dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
                          <div class="media-body">
                              <h3 class="dropdown-item-title">
                              Brad Diesel
                              <span class="float-right text-sm text-danger"><i class="fas fa-star"></i></span>
                              </h3>
                              <p class="text-sm">Call me whenever you can...</p>
                              <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                          </div>
                          </div>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <div class="media">
                          <img src="dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                          <div class="media-body">
                              <h3 class="dropdown-item-title">
                              John Pierce
                              <span class="float-right text-sm text-muted"><i class="fas fa-star"></i></span>
                              </h3>
                              <p class="text-sm">I got your message bro</p>
                              <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                          </div>
                          </div>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <div class="media">
                          <img src="dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
                          <div class="media-body">
                              <h3 class="dropdown-item-title">
                              Nora Silvester
                              <span class="float-right text-sm text-warning"><i class="fas fa-star"></i></span>
                              </h3>
                              <p class="text-sm">The subject goes here</p>
                              <p class="text-sm text-muted"><i class="far fa-clock mr-1"></i> 4 Hours Ago</p>
                          </div>
                          </div>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
                      </div>
                  </li> -->
        <!-- ICONO NOTIFICACIONES -->
        <!-- <li class="nav-item dropdown">
                      <a class="nav-link" data-toggle="dropdown" href="#">
                      <i class="far fa-bell"></i>
                      <span class="badge badge-warning navbar-badge">15</span>
                      </a>
                      <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                      <span class="dropdown-item dropdown-header">15 Notifications</span>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <i class="fas fa-envelope mr-2"></i> 4 new messages
                          <span class="float-right text-muted text-sm">3 mins</span>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <i class="fas fa-users mr-2"></i> 8 friend requests
                          <span class="float-right text-muted text-sm">12 hours</span>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item">
                          <i class="fas fa-file mr-2"></i> 3 new reports
                          <span class="float-right text-muted text-sm">2 days</span>
                      </a>
                      <div class="dropdown-divider"></div>
                      <a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>
                      </div>
                  </li> -->
        <!-- ICONO MAXIMIZAR PANTALLA -->
        <li class="nav-item">
          <a class="nav-link" data-widget="fullscreen" href="#" role="button">
            <i class="fas fa-expand-arrows-alt"></i>
          </a>
        </li>
        <!-- Cerrar sesion Menu -->
        <li class="nav-item dropdown">
          <a class="nav-link" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-sign-out-alt"></i>
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="/salir"><i class="nav-icon fas fa-sign-out-alt"></i> Salir del
                sistema</a></li>
          </ul>
        </li>
      </ul>
    </nav>

    <!--MENU LATERAL -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
      <div class="sidebar">
        <!-- DATOS DE LUSUARIO -->
        <!-- <div class="user-panel mt-3 pb-3 mb-1 d-flex">
          <div class="image">
            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <span class="text-white"><?= $nombre." ".$apellido_paterno ?></span>
          </div>
        </div> -->

        <!-- BUSCADOR MENU LATERAL -->
        <div class="form-control-sidebar" style="background-color: transparent;border: none;">
          <div class="d-flex justify-content-center mt-3 mb-3">
            <span class="text-white align-middle"><h4>Proyectos</h4></span>
          </div>
        </div>
        <div class="form-inline mb-3">
          <div class="input-group input-group-sm" data-widget="sidebar-search">
            <input class="form-control form-control-sidebar bg-dark text-white" type="search" placeholder="Buscar"
              aria-label="Buscar">
            <div class="input-group-append">
              <button class="btn btn-sidebar btn-sm">
                <i class="fas fa-search fa-fw fa-xs"></i>
              </button>
            </div>
            <div class="input-group-append">
              <button class="btn btn-success btn-sm rounded-0" type="button" id="btn_nuevo_proyecto">
                <span>+</span>
              </button>
            </div>
          </div>
        </div>

        <!-- LISTA DE PROYECTOS -->
        <div class="row">
          <div class="col-12 form-control-sidebar" id="contenedor_lista_proyectos">
            <p class="text-center">Selecciona algún espacio de trabajo</p>
          </div>
        </div>

        <hr style="border-bottom: 1px solid #505967;">

        <!-- APARTADO DE CATALOGOS -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex" style="visibility: <?php echo $tipo_usuario == 1 ? "visible" : "hidden";?>">
          <ul class="nav nav-pills nav-sidebar flex-column nav-compact nav-legacy" data-widget="treeview" role="menu"
            data-accordion="false">
            <li class="nav-item">
              <a href="#" class="nav-link">
                <i class="fas fa-key fa-xs"></i>
                <p>&nbsp;
                  Sistema
                  <i class="fas fa-angle-left right"></i>
                </p>
              </a>
              <ul class="nav nav-treeview">
                <li class="nav-item">
                  <a href="#" id="btn_catalogo_usuarios" class="nav-link" style="cursor:pointer;">
                    <i class="nav-icon fas fa-user-tie fa-sm"></i>
                    <p> Usuarios</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" id="btn_catalogo_tipos_usuario" class="nav-link" style="cursor:pointer;">
                    <i class="nav-icon fas fa-user-lock fa-sm"></i>
                    <p> Tipos de usuario</p>
                  </a>
                </li>
                <li class="nav-item">
                  <a href="#" id="btn_catalogo_estatus_actividad" class="nav-link">
                    <i class="nav-icon fas fa-tags fa-sm"></i>
                    <p> Estatus</p>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        

      </div>
    </aside>

    <!-- CONTENIDO DE LA PAGINA -->
    <!-- <div class="content-wrapper" style="background-color: white;min-height: 1304.06px;border: 3px solid #a7a7a7;"> -->
    <div class="content-wrapper">

      <section class="content p-2">
        <div id="contenedor_paginas" class="container-fluid">
          <!-- Modales menu -->
          <?php include('espacios_trabajo.php'); ?>
          <?php include('proyectos.php'); ?>
          <!-- Vista grupos y poryectos -->
          <div class="vista_sistema" id="vista_grupos" style="display:none">
            <?php include('grupos.php'); ?>
          </div>
          <!-- Vistas catalogos -->
          <div class="vista_sistema" id="vista_catalogo_usuarios" style="display:none">
            <?php include('usuarios.php'); ?>
          </div>
          <div class="vista_sistema" id="vista_catalogo_tipos_usuario" style="display:none">
            <?php include('tipos_usuario.php'); ?>
          </div>
          <div class="vista_sistema" id="vista_catalogo_estatus_actividad" style="display:none">
            <?php include('estatus_actividad.php'); ?>
          </div>
        </div>

      </section>
    </div>

    <!-- FOOTER -->
    <!-- <footer class="main-footer text-xs">
      <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer> -->

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
  </div>

  <!-- jQuery -->
  <script src="plugins/jquery/jquery.min.js"></script>
  <!-- Bootstrap 4 -->
  <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- jsGrid -->
  <script src="plugins/jsgrid/demos/db.js"></script>
  <script src="plugins/jsgrid/jsgrid.min.js"></script>
  <!-- DataTables  & Plugins -->
  <script src="plugins/datatables/jquery.dataTables.min.js"></script>
  <script src="plugins/datatables-bs4/js/dataTables.bootstrap4.min.js"></script>
  <script src="plugins/datatables-responsive/js/dataTables.responsive.min.js"></script>
  <script src="plugins/datatables-responsive/js/responsive.bootstrap4.min.js"></script>
  <script src="plugins/datatables-buttons/js/dataTables.buttons.min.js"></script>
  <script src="plugins/datatables-buttons/js/buttons.bootstrap4.min.js"></script>
  <script src="plugins/jszip/jszip.min.js"></script>
  <script src="plugins/pdfmake/pdfmake.min.js"></script>
  <script src="plugins/pdfmake/vfs_fonts.js"></script>
  <script src="plugins/datatables-buttons/js/buttons.html5.min.js"></script>
  <script src="plugins/datatables-buttons/js/buttons.print.min.js"></script>
  <script src="plugins/datatables-buttons/js/buttons.colVis.min.js"></script>
  <!-- SweetAlert2 -->
  <script src="plugins/sweetalert2/sweetalert2.min.js"></script>
  <!-- AdminLTE App -->
  <script src="dist/js/adminlte.min.js"></script>
  <!-- jquery-validation -->
  <script src="plugins/jquery-validation/jquery.validate.min.js"></script>
  <script src="plugins/jquery-validation/additional-methods.min.js"></script>
  <!-- JS PAGINA PRINCIPAL -->
  <script>
    let session_id_usuario = '<?php echo $id_usuario;?>'
    let session_tipo_usuario = '<?php echo $tipo_usuario;?>'
    var session_es_administrador = session_tipo_usuario == 1;
  </script>
  <script src="js/paginas/global.js"></script>
  <script src="js/paginas/usuarios.js"></script>
  <script src="js/paginas/tipos_usuario.js"></script>
  <script src="js/paginas/grupos.js"></script>
  <script src="js/paginas/actividades.js"></script>
  <script src="js/paginas/estatus_actividad.js"></script>
  <script src="js/paginas/espacios_trabajo.js"></script>
  <script src="js/paginas/proyectos.js"></script>
  <script src="js/paginas/principal.js"></script>

</body>

</html>