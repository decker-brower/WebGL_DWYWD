(function() {
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    var geometry = new THREE.CubeGeometry(1,1,1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    var cube = new THREE.Mesh(geometry, material);

    camera.position.z = 5;
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    $("#container").append(renderer.domElement);

    scene.add(cube);

    var animate = function() {
        requestAnimationFrame(animate);
        render();
    };

    var render = function () {
        cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;

        renderer.render(scene, camera);
    };

    animate();
})(window, jQuery);