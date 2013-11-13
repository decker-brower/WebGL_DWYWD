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

    // WORLD

    // var worldWidth = 256, worldDepth = 256,
    //     worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;
    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xCCCCCC, 250, 1400);
    // var textOptions = {
    //     size: 70,
    //     height: 20,
    //     curveSegments: 4,

    //     //font: ,
    //     weight: "bold",
    //     style: "normal",

    //     bevelThickness: 2,
    //     bevelSize: 1.5,
    //     bevelEnabled: true,

    //     material: 0,
    //     extrudeMaterial: 1
    // };
    var geometry = new THREE.SphereGeometry(30, 30, 28, 0, Math.PI * 2, 0, Math.PI);
    // var appleTextGeo = new THREE.TextGeometry("AAPL", textOptions);
    // var googleTextGeo = new THREE.TextGeometry("GOOG", textOptions);
    // var microsoftTextGeo = new THREE.TextGeometry("MSFT", textOptions);
    var appleMaterial = new THREE.MeshPhongMaterial({ambient: 0x999999, color: 0xff0000, specular: 0x101010, shininess: 200});
    var googleMaterial = new THREE.MeshPhongMaterial({ambient: 0x999999, color: 0x00ff00, specular: 0x101010, shininess: 200});
    var microsoftMaterial = new THREE.MeshPhongMaterial({ambient: 0x999999, color: 0x0000ff, specular: 0x101010, shininess: 200});
    var appleMesh = new THREE.Mesh(geometry, appleMaterial);
    var googleMesh = new THREE.Mesh(geometry, googleMaterial);
    var microsoftMesh = new THREE.Mesh(geometry, microsoftMaterial);
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000), new THREE.MeshPhongMaterial({ambient: 0x999999, color: 0x999999, specular: 0x101010}));

    appleMesh.position.y = 0;
    appleMesh.position.x = -100;
    appleMesh.position.z = 0;
    appleMesh.updateMatrix();
    appleMesh.matrixAutoUpdate = true;
    appleMesh.castShadow = true;
    googleMesh.position.y = 0;
    googleMesh.position.x = 0;
    googleMesh.position.z = 0;
    googleMesh.updateMatrix();
    googleMesh.matrixAutoUpdate = true;
    googleMesh.castShadow = true;
    microsoftMesh.position.y = 0;
    microsoftMesh.position.x = 100;
    microsoftMesh.position.z = 0;
    microsoftMesh.updateMatrix();
    microsoftMesh.matrixAutoUpdate = true;
    microsoftMesh.castShadow = true;

    plane.position.y = -50;
    plane.rotation.x = - Math.PI / 2;
    plane.recieveShadow = true;

    scene.add(appleMesh);
    scene.add(googleMesh);
    scene.add(microsoftMesh);
    scene.add(plane);

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

    // LIGHTS

    // var lightOne = new THREE.DirectionalLight(0xffffff);
    // lightOne.position.set( 1, 1, 1 );
    // scene.add(lightOne);

    // var lightTwo = new THREE.DirectionalLight(0x002288);
    // lightTwo.position.set( -1, -1, -1 );
    // scene.add(lightTwo);

    //var lightThree = new THREE.AmbientLight(0x222222);
    //scene.add(lightThree);

    addShadowedLight( 200, 200, 200, 0xffffff, 1.35 );
    //addShadowedLight( -100, -100, -100, 0xffaa00, 1 );

    // var pointLight = new THREE.PointLight(0xffffff, 1.5);
    // pointLight.position.set(0, 100, 90);
    // scene.add(pointLight);

    // RENDERER

    var renderer = new THREE.WebGLRenderer({ antialias: false });
    renderer.setClearColor(scene.fog.color, 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.physicallyBasedShading = true;

    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;

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

    function addShadowedLight( x, y, z, color, intensity ) {
        var directionalLight = new THREE.DirectionalLight( color, intensity );
        directionalLight.position.set( x, y, z )
        scene.add( directionalLight );

        directionalLight.castShadow = true;
        directionalLight.shadowCameraVisible = true;

        var d = 100;
        directionalLight.shadowCameraLeft = -d;
        directionalLight.shadowCameraRight = d;
        directionalLight.shadowCameraTop = d;
        directionalLight.shadowCameraBottom = -d;

        directionalLight.shadowCameraNear = 100;
        directionalLight.shadowCameraFar = 400;

        directionalLight.shadowMapWidth = 1024;
        directionalLight.shadowMapHeight = 1024;

        directionalLight.shadowBias = -1.005;
        directionalLight.shadowDarkness = 1.15;
    }

    var animate = function() {
        requestAnimationFrame(animate);
        controls.update();
        render();
    };

    var render = function () {
        // for(var n = 0; n < OBJECTS.length; n++)
        // {
        //     OBJECTS[n].rotation.x += 0.06;
        //     OBJECTS[n].rotation.y += 0.06;
        // }

        renderer.render(scene, camera);
    };

    animate();
})(window, jQuery);