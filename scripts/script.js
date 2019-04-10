document.addEventListener('DOMContentLoaded', () => {
  const launch = document.getElementById('launch');
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  let renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  let light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );
  let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  scene.add( directionalLight );

  launch.addEventListener('click', loadPiggy);

  function loadPiggy() {
    let pigLoader = new THREE.GLTFLoader();

    pigLoader.load( '../assets/models/piggybank.glb', function ( gltf ) {
      gltf.scene.position.set(Math.floor(Math.random() * 200) + -200, Math.floor(Math.random() * 200) + -200, (Math.floor(Math.random() * 500) + 250)*-1);
      scene.add( gltf.scene );
      animate(gltf.scene);
    }, undefined, function ( error ) {
      console.error( 'Error:', error );
    });
  };

  const animate = function (m) {
    requestAnimationFrame( () => animate(m) );

    m.rotation.x += 0.005;
    m.rotation.y += 0.005;
    m.rotation.z += 0.005;

    renderer.render( scene, camera );
  };

});