var Bergamota = function (radius, segments) {

  THREE.Object3D.call(this);

  this.name = "Bergamota";

  var that = this;

  // instantiate a loader
  var loader = new THREE.TextureLoader();

  var textures = {
    'map': {
      url: 'bergamota-3.jpg',
      val: undefined
    },
    'gordinho': {
      url: 'bergamota-3.jpg',
      val: undefined
    },
    'bumpMap': {
      url: 'bergamota_bump.jpg',
      val: undefined
    }
  };

  var texturePromises = [], path = './';

  for (var key in textures) {
    texturePromises.push(new Promise((resolve, reject) => {
      var entry = textures[key]
      var url = path + entry.url
      loader.load(url,
        texture => {
          entry.val = texture;
          if (entry.val instanceof THREE.Texture) resolve(entry);
        },
        xhr => {
          console.log(url + ' ' + (xhr.loaded / xhr.total * 100) +
            '% loaded');
        },
        xhr => {
          reject(new Error(xhr +
            'An error occurred loading while loading: ' +
            entry.url));
        }
      );
    }));
  }

  // load the geometry and the textures
  Promise.all(texturePromises).then(loadedTextures => {
    var geometry = new THREE.SphereGeometry(radius, segments, segments);
    textures.map.val.wrapS = THREE.RepeatWrapping;
    textures.map.val.wrapT = THREE.RepeatWrapping;
    textures.map.val.repeat.set( 8, 8 );
    var material = new THREE.MeshPhongMaterial({
      map: textures.map.val,
      bumpMap: textures.bumpMap.val,
      bumpScale: 0.05
    });

    var bergamota = that.bergamota = new THREE.Mesh(geometry, material);
    that.add(bergamota);


    textures.gordinho.val.repeat.set( 0.4, 0.4 );
    var gordinhoGeometry = new THREE.CylinderGeometry( 1.6, 3, 1.4, 32 );
    var gordinhoMaterial = new THREE.MeshPhongMaterial({
      map: textures.gordinho.val,
      bumpMap: textures.bumpMap.val,
      bumpScale: 0.05
    });
    var gordinho = new THREE.Mesh( gordinhoGeometry, gordinhoMaterial );
    that.add( gordinho );
    gordinho.position.set(0, 14, 0);

    textures.gordinho.val.repeat.set( 0.4, 0.4 );
    var gordinhoGeometry = new THREE.CylinderGeometry( 1.6, 3, 1.4, 32 );
    var gordinhoMaterial = new THREE.MeshPhongMaterial({
      map: textures.gordinho.val,
      bumpMap: textures.bumpMap.val,
      bumpScale: 0.05
    });
    var gordinho = new THREE.Mesh( gordinhoGeometry, gordinhoMaterial );
    that.add( gordinho );
    gordinho.position.set(0, 14, 0);

    var cabinhoGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 4, 32 );
    var cabinhoMaterial = new THREE.MeshBasicMaterial( {color: 0x5f4123} );

    var cabinhoP1 = new THREE.Mesh( cabinhoGeometry, cabinhoMaterial );
    that.add( cabinhoP1 );
    cabinhoP1.position.set(0, 15, 0);
    cabinhoP1.rotateX(0.3);
    cabinhoP1.rotateY(0.2);

    var cabinhoP2 = new THREE.Mesh( cabinhoGeometry, cabinhoMaterial );
    that.add( cabinhoP2 );
    cabinhoP2.position.set(0, 16, -1);
    cabinhoP2.rotateX(-0.2);
    cabinhoP2.rotateY(0);
  });
}

Bergamota.prototype = Object.create(THREE.Object3D.prototype);
Bergamota.prototype.constructor = Bergamota;
