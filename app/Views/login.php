<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        

        
        <!-- Google Font: Source Sans Pro -->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="plugins/fontawesome-free/css/all.min.css">
        <!-- Ionicons -->
        <link rel="stylesheet" href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
        <!-- Tempusdominus Bootstrap 4 -->
        <!-- <link rel="stylesheet" href="plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css"> -->
        <!-- iCheck -->
        <!-- <link rel="stylesheet" href="plugins/icheck-bootstrap/icheck-bootstrap.min.css"> -->
        <!-- JQVMap -->
        <!-- <link rel="stylesheet" href="plugins/jqvmap/jqvmap.min.css"> -->
        <!-- Theme style -->
        <link rel="stylesheet" href="dist/css/adminlte.min.css">
        <!-- overlayScrollbars -->
        <!-- <link rel="stylesheet" href="plugins/overlayScrollbars/css/OverlayScrollbars.min.css"> -->
        <!-- Daterange picker -->
        <!-- <link rel="stylesheet" href="plugins/daterangepicker/daterangepicker.css"> -->
        <!-- summernote -->
        <!-- <link rel="stylesheet" href="plugins/summernote/summernote-bs4.min.css"> -->
        <!-- jsGrid -->
        <!-- <link rel="stylesheet" href="plugins/jsgrid/jsgrid.min.css"> -->
        <!-- <link rel="stylesheet" href="plugins/jsgrid/jsgrid-theme.min.css"> -->
        
        <!-- BOOTSTRAP -->
        <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">
    </head>
    <body class="hold-transition login-page">
        <div class="login-box">
            <!-- /.login-logo -->
            <div class="card card-outline card-primary">
                <div class="card-header text-center">
                    <img src="img/sistema/img_login.jpg" alt="ETIC" class="img-fluid">
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Ingresa tus credenciales para iniciar sesión</p>
                    <form action="/validar" method="POST">
                        <div class="input-group mb-3">                        
                            <input type="text" class="form-control" id="Usuario" name="Usuario" placeholder="Usuario" value="<?php echo (isset($_COOKIE['usuario'])) ? $_COOKIE['usuario'] : ''; ?>" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" id="Password" name="Password" placeholder="Contraseña" value="<?php echo (isset($_COOKIE['password'])) ? $_COOKIE['password'] : ''; ?>" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>

                        <!-- <div> -->
                            <?php if(session()->getFlashdata('msg')):?>
                                <div class="alert alert-danger text-center" role="alert"><?= session()->getFlashdata('msg') ?></div>
                            <?php endif;?>
                        <!-- </div> -->
                        <div class="row">
                            <!-- <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="remember" name="remember">
                                    <label for="remember">
                                        Recordarme
                                    </label>
                                </div>
                            </div> -->
                            <!-- /.col -->
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block">Ingresar</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <!-- <p class="mt-3 mb-1">
                        <a href="#">Olvide mi contraseña</a>
                    </p> -->

                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->
        </div>
        <!-- /.login-box -->

        <!-- jQuery -->
        <script src="adminLTE-3.1.0/plugins/jquery/jquery.min.js"></script>
        <!-- Bootstrap 4 -->
        <script src="adminLTE-3.1.0/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>
        <!-- AdminLTE App -->
        <script src="adminLTE-3.1.0/dist/js/adminlte.min.js"></script>
    </body>
</html>