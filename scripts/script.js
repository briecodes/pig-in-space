document.addEventListener('DOMContentLoaded', () => {
  const launchBtn = document.getElementById('launchBtn');
  const pauseBtn = document.getElementById('pauseBtn');
  const header = document.getElementById('header');
  const canvasContainer = document.getElementById('canvas-container');
  const enterD = document.getElementById('enter');
  const movePig = {auto: true, manual: false, direction: null}
  const keyEngage = false;
  const pigArray = [];

  let scene, camera, renderer, light, directionalLight, sfx;

  launchBtn.addEventListener('click', () => {
    loadPiggy();
    loadAsteroid();
    enterD.classList.add('hide');
    header.classList.add('fadein');
    setTimeout(() => {
      enterD.remove();
    }, 1000);
    sfx.play();
  });

  pauseBtn.addEventListener('click', () => {
    if (sfx.paused){
      pauseBtn.innerText = 'Pause Sound';
      sfx.play();
    } else {
      pauseBtn.innerText = 'Play Sound';
      sfx.pause();
    };
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'p') loadPiggy();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') movePig.manual = false;
  });

  document.addEventListener('keydown', (e) => {
    // if (!keyEngage) {
    //   keyEngage = true;
      switch (e.key) {
        case 'ArrowLeft':
          movePig.manual = true;
          // movePig.auto = false;
          movePig.direction = 'left';
          movePiggy(pigArray[0]);
        break;
        case 'ArrowRight':
          movePig.manual = true;
          // movePig.auto = false;
          movePig.direction = 'right';
          movePiggy(pigArray[0]);
        break;
        case 'ArrowUp':
          movePig.manual = true;
          // movePig.auto = false;
          movePig.direction = 'up';
          movePiggy(pigArray[0]);
        break;
        case 'ArrowDown':
          movePig.manual = true;
          // movePig.auto = false;
          movePig.direction = 'down';
          movePiggy(pigArray[0]);
        break;
        default:
        console.log('dunno');
      };
    // };

  });

  fetchNasaPic();
  setupScene();


  function setupScene() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    light = new THREE.AmbientLight( 0x404040 );
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    sfx = document.getElementById('sfx');
    
    scene.add( light );
    scene.add( directionalLight );
    canvasContainer.appendChild( renderer.domElement );

  };

  function loadAsteroid() {
    let asteroidLoader = new THREE.OBJLoader();
    let asteroidMTLLoader = new THREE.MTLLoader();
    asteroidLoader.setPath('../assets/models/asteroid1/');
    asteroidMTLLoader.setPath('../assets/models/asteroid1/');

    asteroidMTLLoader.load(
      'asteroid.mtl',
      (mtl) => {
        mtl.preload();
        asteroidLoader.setMaterials(mtl);

        asteroidLoader.load(
          'asteroid.obj',
          (obj) => {
            scene.add(obj);
            obj.position.set(0, 0, -250);
            obj.scale.set(5, 5, 5);
            animate(obj, Math.floor(Math.random()*2) == 1 ? 1 : -1);
          },
          (progress) => {
            console.log( `OBJ: ${( progress.loaded / progress.total * 100 )}% loaded.` );
          },
          (error) => {
            console.log('Error obj:', error);
          }
        );
      },
      (progress) => {
        console.log( `MTL: ${( progress.loaded / progress.total * 100 )}% loaded.` );
      },
      (error) => {
        console.log('Error obj:', error);
      }
    );

  };

  function loadPiggy() {
    let pigLoader = new THREE.GLTFLoader();

    pigLoader.load( '../assets/models/piggybank.glb', function ( gltf ) {
      gltf.scene.position.set(rNum(200, 1), rNum(200, 1), rNum(500, 250, true));
      scene.add( gltf.scene );
      animate(gltf.scene, Math.floor(Math.random()*2) == 1 ? 1 : -1);
      pigArray.push(gltf.scene);
      // console.log('Piggy Array:', pigArray);
    }, undefined, function ( error ) {
      console.error( 'Error:', error );
    });
  };

  const animate = function (m, r) {
    if (movePig.auto) {
      requestAnimationFrame( () => animate(m, r) );

      let n = 0.005 * r;
      m.rotation.x += n;
      m.rotation.y += n;
      m.rotation.z += n;

      renderer.render( scene, camera );
    }
  };

  const movePiggy = function (m, r) {
    if (movePig.manual) {
      switch (movePig.direction) {
        case 'left':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.x -= 0.1;
          // renderer.render( scene, camera );
          break;
        case 'right':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.x += 0.1;
          // renderer.render( scene, camera );
          break;
        case 'up':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.y += 0.1;
          // renderer.render( scene, camera );
          break;
        case 'down':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.y -= 0.1;
          // renderer.render( scene, camera );
          break;
        default:
        return;
      };
    } else {
      console.log('MovePigManual:', movePig.manual);
      switch (movePig.direction) {
        case 'left':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.x -= 0.1;
          // renderer.render( scene, camera );
          break;
        case 'right':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.x += 0.1;
          // renderer.render( scene, camera );
          break;
        case 'up':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.y += 0.1;
          // renderer.render( scene, camera );
          break;
        case 'down':
          requestAnimationFrame( () => movePiggy(m, r) );
          m.position.y -= 0.1;
          // renderer.render( scene, camera );
          break;
        default:
        return;
      };
    }
  };

  function rNum(n1, n2=1, d=false) {
    let num = Math.floor(Math.random()*n1) + n2; // this will get a number between n2 and n1;
    if (d) {
      num *= -1;
    } else {
      num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
    };
    return num;
  };

  function fetchNasaPic() {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => {
      document.getElementsByTagName('body')[0].style.backgroundImage = `url(${res.url})`;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementsByTagName('body')[0].style.backgroundImage = `url(./assets/images/hubble-observes-one-of-a-kind-star-nicknamed-nasty_17754652960_o_orig.jpg)`;
    });
  };

});