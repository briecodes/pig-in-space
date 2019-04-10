document.addEventListener('DOMContentLoaded', () => {
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  let loader = new THREE.ObjectLoader();
  let light = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add( light );
  let directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
  scene.add( directionalLight );

  loader.load(
    '../assets/models/piggybank.obj',
    ( obj ) => {
      scene.add( obj );
    },
    ( xhr ) => {
      console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    },
    ( err ) => {
      console.log('testing....');
      console.error( 'An error happened:', err );
    }
  );

  let pigLoader = new THREE.GLTFLoader();

  pigLoader.load( '../assets/models/piggybank.glb', function ( gltf ) {
    scene.add( gltf.scene );
  }, undefined, function ( error ) {
    console.log('testing....');
    console.error( 'Error:', error );
  });
});