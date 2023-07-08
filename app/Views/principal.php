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
    <!-- BOOTSTRAP -->
    <link rel="stylesheet" href="css/bootstrap/bootstrap.min.css">

    <style id="" media="all">
        /* devanagari */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z11lFc-K.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
        }

        /* latin-ext */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z1JlFc-K.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 300;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* devanagari */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecmNE.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
        }

        /* latin-ext */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJnecmNE.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 400;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* devanagari */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z11lFc-K.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
        }

        /* latin-ext */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* devanagari */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z11lFc-K.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
        }

        /* latin-ext */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 600;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* devanagari */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
        }

        /* latin-ext */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* devanagari */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z11lFc-K.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
        }

        /* latin-ext */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 800;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }

        /* devanagari */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z11lFc-K.woff2) format('woff2');
        unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF;
        }

        /* latin-ext */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1JlFc-K.woff2) format('woff2');
        unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
        }

        /* latin */
        @font-face {
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 900;
        font-display: swap;
        src: url(/fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2) format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
        }
    </style>

    <script nonce="237453fb-4e9f-4874-933b-b687c2e267a8">
        (function(w, d) {
        ! function(f, g, h, i) {
            f[h] = f[h] || {};
            f[h].executed = [];
            f.zaraz = {
            deferred: [],
            listeners: []
            };
            f.zaraz.q = [];
            f.zaraz._f = function(j) {
            return function() {
                var k = Array.prototype.slice.call(arguments);
                f.zaraz.q.push({
                m: j,
                a: k
                })
            }
            };
            for (const l of ["track", "set", "debug"]) f.zaraz[l] = f.zaraz._f(l);
            f.zaraz.init = () => {
            var m = g.getElementsByTagName(i)[0],
                n = g.createElement(i),
                o = g.getElementsByTagName("title")[0];
            o && (f[h].t = g.getElementsByTagName("title")[0].text);
            f[h].x = Math.random();
            f[h].w = f.screen.width;
            f[h].h = f.screen.height;
            f[h].j = f.innerHeight;
            f[h].e = f.innerWidth;
            f[h].l = f.location.href;
            f[h].r = g.referrer;
            f[h].k = f.screen.colorDepth;
            f[h].n = g.characterSet;
            f[h].o = (new Date).getTimezoneOffset();
            if (f.dataLayer)
                for (const s of Object.entries(Object.entries(dataLayer).reduce(((t, u) => ({
                    ...t[1],
                    ...u[1]
                })), {}))) zaraz.set(s[0], s[1], {
                scope: "page"
                });
            f[h].q = [];
            for (; f.zaraz.q.length;) {
                const v = f.zaraz.q.shift();
                f[h].q.push(v)
            }
            n.defer = !0;
            for (const w of [localStorage, sessionStorage]) Object.keys(w || {}).filter((y => y.startsWith(
                "_zaraz_"))).forEach((x => {
                try {
                f[h]["z_" + x.slice(7)] = JSON.parse(w.getItem(x))
                } catch {
                f[h]["z_" + x.slice(7)] = w.getItem(x)
                }
            }));
            n.referrerPolicy = "origin";
            n.src = "/cdn-cgi/zaraz/s.js?z=" + btoa(encodeURIComponent(JSON.stringify(f[h])));
            m.parentNode.insertBefore(n, m)
            };
            ["complete", "interactive"].includes(g.readyState) ? zaraz.init() : f.addEventListener("DOMContentLoaded",
            zaraz.init)
        }(w, d, "zarazData", "script");
        })(window, document);
    </script>

<style>
#sidebar{min-width:250px;max-width:250px;background:#1d1919;color:#fff;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}#sidebar.active{margin-left:-250px}#sidebar .logo{display:block;width:120px;height:120px;margin:0 auto}#sidebar .logo span{display:block}#sidebar ul.components{padding:0}#sidebar ul li{font-size:16px}#sidebar ul li>ul{margin-left:10px}#sidebar ul li>ul li{font-size:14px}#sidebar ul li a{padding:10px 0;display:block;color:rgba(255,255,255,.8);border-bottom:1px solid rgba(255,255,255,.1)}#sidebar ul li a:hover{color:#f8b739}#sidebar ul li.active>a{background:0 0;color:#f8b739}@media(max-width:991.98px){#sidebar{margin-left:-250px}#sidebar.active{margin-left:0}}a[data-toggle=collapse]{position:relative}.dropdown-toggle::after{display:block;position:absolute;top:50%;right:0;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}@media(max-width:991.98px){#sidebarCollapse span{display:none}}#content{width:100%;padding:0;min-height:100vh;-webkit-transition:all .3s;-o-transition:all .3s;transition:all .3s}.btn.btn-primary{background:#f8b739;border-color:#f8b739}.btn.btn-primary:hover,.btn.btn-primary:focus{background:#f8b739!important;border-color:#f8b739!important}.footer p{color:rgba(255,255,255,.5)}
</style>

</head>
  <body>
    
    <div class="wrapper d-flex align-items-stretch">
      <nav id="sidebar">
        <div class="offcanvas offcanvas-start show" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1"
          id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
          </div>
          <div class="offcanvas-body">
            <p>Try scrolling the rest of the page to see this option in action.</p>
          </div>
        </div>
      </nav>

      <div id="content">
        <nav class="navbar navbar-expand-lg bg-dark bg-body-tertiary" data-bs-theme="dark">
          <div class="container-fluid">
            <!-- <button type="button" id="sidebarCollapse" class="btn btn-primary">   -->

            <a class="navbar-brand" href="#">Navbar</a>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
              </ul>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
              <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" id="sidebarCollapse">Enable body
                scrolling</button>
            </div>
          </div>
        </nav>
        <div class="bg-dark m-2"  style="min-height:100vh">
          
        </div>
      </div>
    </div>
    
    <!-- jquery -->
    <script src="js/jquery/jquery-3.7.0/jquery.min.js"></script>
    <!-- BOOTSTRAP -->
    <script src="js/bootstrap/bootstrap.bundle.min.js"></script>
    <!-- AdminLTE App -->
    <script src="dist/js/adminlte.js"></script>

    <script>
        (function($){"use strict";var fullHeight=function(){$('.js-fullheight').css('height',$(window).height());$(window).resize(function(){$('.js-fullheight').css('height',$(window).height());});};fullHeight();$('#sidebarCollapse').on('click',function(){$('#sidebar').toggleClass('active');});})(jQuery);
    </script>
    <!-- <script defer src="https://static.cloudflareinsights.com/beacon.min.js/v52afc6f149f6479b8c77fa569edb01181681764108816" integrity="sha512-jGCTpDpBAYDGNYR5ztKt4BQPGef1P0giN6ZGVUi835kFF88FOmmn8jBQWNgrNd8g/Yu421NdgWhwQoaOPFflDw==" data-cf-beacon='{"rayId":"7e35d2a4dab8e936","token":"cd0b4b3a733644fc843ef0b185f98241","version":"2023.4.0","si":100}' crossorigin="anonymous"></script> -->
  </body>
</html>