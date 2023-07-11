<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gestor de proyectos</title>

  <!-- Google Font: Source Sans Pro -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="plugins/datatables-bs4/css/dataTables.bootstrap4.min.css">
  <link rel="stylesheet" href="plugins/datatables-responsive/css/responsive.bootstrap4.min.css">
  <link rel="stylesheet" href="plugins/datatables-buttons/css/buttons.bootstrap4.min.css">
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
        <li class="nav-item dropstart">
          <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
          <div class="image">
            <img src="dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
          </div>
          <div class="info">
            <span class="text-white"><?= $nombre." ".$apellido_paterno ?></span>
          </div>
        </div>

        <!-- APARTADO PARA ESPACIOS DE TRABAJO -->
        <div class="row ml-0">
          <div class="input-group input-group-sm">
            <select class="form-control form-control-sidebar bg-dark text-white" id="select_espacios_trabajo">
              <option value="0" selected>Seleccionar opción</option>
            </select>
            <div class="input-group-append">
              <div class="d-flex">
                <div class="dropdown mr-1">
                  <button type="button" class="btn btn-secondary btn-sm rounded-0" data-toggle="dropdown" aria-expanded="false">
                    <span class="">...</span>
                  </button>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" style="color:black" href="#" id="btn_agregar_espacio_trabajo">
                      <i class="fas fa-plus fa-xs text-secondary"></i>
                      <span style="font-size:14px"> Agregar espacio de trabajo</span>
                    </a>
                    <a class="dropdown-item" style="color:black" href="#" id="btn_editar_espacio_trabajo">
                      <i class="fas fa-pen fa-xs text-secondary"></i>
                      <span style="font-size:14px"> Renombrar espacio de trabajo</span>
                    </a>
                    <a class="dropdown-item" style="color:black" href="#" id="btn_eliminar_espacio_trabajo">
                      <i class="fas fa-trash fa-xs text-secondary"></i>
                      <span style="font-size:14px"> Eliminar espacio de trabajo</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr style="border-bottom: 1px solid #505967;">

        <!-- BUSCADOR MENU LATERAL -->
        <div class="form-inline mb-3">
          <div class="input-group input-group-sm" data-widget="sidebar-search">
            <input class="form-control form-control-sidebar bg-dark text-white" type="search" placeholder="Buscar" aria-label="Buscar">
            <div class="input-group-append">
              <button class="btn btn-sidebar btn-sm">
                <i class="fas fa-search fa-fw fa-xs"></i>
              </button>
            </div>
            <div class="input-group-append">
              <button class="btn btn-success btn-sm rounded-0" type="button" id="btn_nuevo_tablero">
                <span>+</span>
              </button>
            </div>
          </div>
        </div>

        <!-- LISTA DE TABLEROS -->
        <!-- <nav class="mt-2">
          <ul id="contenedor_lista_tableros" class="nav nav-pills nav-sidebar flex-column nav-compact nav-legacy" role="menu" data-accordion="false">
            <li class="nav-item">
              <a href="#" class="nav-link text-center">
                <p>Selecciona algún espacio de trabajo</p>
              </a>
            </li>
          </ul>
        </nav> -->

        <div class="row">
          <div class="col-12 form-control-sidebar" id="contenedor_lista_tableros">
            <p class="text-center">Selecciona algún espacio de trabajo</p>
          </div>
        </div>

        <hr style="border-bottom: 1px solid #505967;">

        <!-- APARTADO DE CATALOGOS -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex">
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
                  <a href="#" class="nav-link">
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
    <div class="content-wrapper">
      <section class="p-1">
        <div class="bg-white border" id="contenedor_paginas">

          <?php include('espacios_trabajo.php'); ?>
          <?php include('tableros.php'); ?>

        </div>
      </section>
    </div>

    <!-- FOOTER -->
    <footer class="main-footer text-xs">
      <strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
      All rights reserved.
      <div class="float-right d-none d-sm-inline-block">
        <b>Version</b> 3.2.0
      </div>
    </footer>

    <!-- Control Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
      <!-- Control sidebar content goes here -->
    </aside>
  </div>

  <!-- jQuery -->
  <script src="plugins/jquery/jquery.min.js"></script>
  <!-- Bootstrap 4 -->
  <script src="plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
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
  <script src="js/paginas/global.js"></script>
  <script src="js/paginas/espacios_trabajo.js"></script>
  <script src="js/paginas/tableros.js"></script>
  <script src="js/paginas/principal.js"></script>

</body>

</html>