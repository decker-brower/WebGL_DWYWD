//requestAnimationFrame shim
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

//Main.js
(function() {
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.z = 500;

    var controls = new THREE.TrackballControls(camera);
    var OBJECTS = [];

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    //controls.addEventListener("change", render);

    // world

    var scene = new THREE.Scene();
    //scene.fog = new THREE.FogExp2(0xcccccc, 0.002);

    var geometry = new THREE.SphereGeometry(30, 25, 23, 0, Math.PI * 2, 0, Math.PI);
    var appleMaterial = new THREE.MeshLambertMaterial({ color:0xff0000, shading: THREE.FlatShading });
    var googleMaterial = new THREE.MeshLambertMaterial({ color:0x00ff00, shading: THREE.FlatShading });
    var microsoftMaterial = new THREE.MeshLambertMaterial({ color:0x0000ff, shading: THREE.FlatShading });
    var appleMesh = new THREE.Mesh(geometry, appleMaterial);
    var googleMesh = new THREE.Mesh(geometry, googleMaterial);
    var microsoftMesh = new THREE.Mesh(geometry, microsoftMaterial);

    appleMesh.position.y = 0;
    appleMesh.position.x = -100;
    appleMesh.position.z = 0;
    appleMesh.updateMatrix();
    appleMesh.matrixAutoUpdate = true;
    googleMesh.position.y = 0;
    googleMesh.position.x = 0;
    googleMesh.position.z = 0;
    googleMesh.updateMatrix();
    googleMesh.matrixAutoUpdate = true;
    microsoftMesh.position.y = 0;
    microsoftMesh.position.x = 100;
    microsoftMesh.position.z = 0;
    microsoftMesh.updateMatrix();
    microsoftMesh.matrixAutoUpdate = true;

    scene.add(appleMesh);
    scene.add(googleMesh);
    scene.add(microsoftMesh);

    OBJECTS.push(appleMesh);
    OBJECTS.push(googleMesh);
    OBJECTS.push(microsoftMesh);

    // for ( var i = 0; i < 3; i ++ ) {
    //     var mesh = new THREE.Mesh(geometry, material);
    //     // var scale = (Math.random() - 0.5) * 10;
    //     // mesh.position.x = (Math.random() - 0.5) * 1000;
    //     // mesh.position.y = (Math.random() - 0.5) * 1000;
    //     // mesh.position.z = (Math.random() - 0.5) * 1000;
    //     // mesh.scale.x += scale;
    //     // mesh.scale.y += scale;
    //     // mesh.scale.z += scale;
    //     mesh.position.y = i;
    //     mesh.position.z = i;
    //     // mesh.scale.x += i * 1;
    //     // mesh.scale.y += i * 1;
    //     // mesh.scale.z += i * 1;
    //     mesh.position.x = mesh.scale.x * i * 100;
    //     mesh.updateMatrix();
    //     mesh.matrixAutoUpdate = true;
    //     scene.add(mesh);
    //     OBJECTS.push(mesh);
    // }

    // lights

    var lightOne = new THREE.DirectionalLight(0xffffff);
    lightOne.position.set( 1, 1, 1 );
    scene.add(lightOne);

    var lightTwo = new THREE.DirectionalLight(0x002288);
    lightTwo.position.set( -1, -1, -1 );
    scene.add(lightTwo);

    var lightThree = new THREE.AmbientLight(0x222222);
    scene.add(lightThree);

    // renderer

    var renderer = new THREE.WebGLRenderer({ antialias: false });
    //renderer.setClearColor(scene.fog.color, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);

    var $container = $("#container");
    $container.append(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);

    var onWindowResize = function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        controls.handleResize();

        render();

    }

    var animate = function() {
        requestAnimationFrame(animate);
        controls.update();
        render();
    };

    var render = function () {
        for(var n = 0; n < OBJECTS.length; n++)
        {
            OBJECTS[n].rotation.x += 0.06;
            OBJECTS[n].rotation.y += 0.06;
        }

        renderer.render(scene, camera);
    };

    animate();
})(window, jQuery);