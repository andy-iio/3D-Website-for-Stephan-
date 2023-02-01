import * as THREE from 'three';
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import { Interaction } from 'three.interaction';
//Scene
const scene = new THREE.Scene();

//create textures
const groundTexture = new THREE.TextureLoader().load('./img/groundTexture.png');
const houseTexture = new THREE.TextureLoader().load('./img/restaraunt.png');
const hotelTexture = new THREE.TextureLoader().load('./img/hotel.png');
const roadTexture = new THREE.TextureLoader().load('./img/road.png');
const treeTexture = new THREE.TextureLoader().load('./img/pine.png');
const carTexture = new THREE.TextureLoader().load('./img/car.png');


//create base ground
const geometry = new THREE.BoxGeometry(8, 0.5, 10);
const material = new THREE.MeshBasicMaterial({ map: groundTexture });
const base = new THREE.Mesh(geometry, material);

//create house1
const houseGeometry = new THREE.BoxGeometry(1, 1, 1);
const houseMaterial = new THREE.MeshBasicMaterial({ map: houseTexture });
const house = new THREE.Mesh(houseGeometry, houseMaterial);
house.position.set(3, 0.7, -0.5);

//create hotel
const hotelGeometry = new THREE.BoxGeometry(1, 4, 2);
const hotelMaterial = new THREE.MeshBasicMaterial({ map: hotelTexture });
const hotel = new THREE.Mesh(hotelGeometry, hotelMaterial);
hotel.position.set(3, 2.2, -3);

//create road
const roadGeometry = new THREE.BoxGeometry(10, 0.1, 2);
const roadMaterial = new THREE.MeshBasicMaterial({ map: roadTexture });
const road = new THREE.Mesh(roadGeometry, roadMaterial);
road.position.set(0, 0.3, 0);
road.rotation.set(0, 1.55, 0);

//create tree
const treeGeometry = new THREE.ConeGeometry(0.4, 2, 32);
const treeMaterial = new THREE.MeshBasicMaterial({ map: treeTexture });

//create car
const carGeometry = new THREE.BoxGeometry( 0.5, 0.5, 1 );
const carMaterial = new THREE.MeshBasicMaterial( {map: carTexture} );
const car = new THREE.Mesh( carGeometry, carMaterial );
car.position.set(4,0,2);
car.rotation.set(0.25,1,0);
scene.add( car );

//grouping and adding to scene
const treeGroup = new THREE.Group();
var distance = 1;
var xdistance = 0.5;
for(var i = 0; i < 3;i++){
  const tree = new THREE.Mesh(treeGeometry, treeMaterial);
  tree.position.set(2.5, 1.3, -4);
  tree.position.z += distance
  tree.position.x += xdistance
  treeGroup.add(tree);
  distance += 1;
  xdistance *= -1;

};

const buildingGroup = new THREE.Group();
buildingGroup.add(base);
buildingGroup.add(road);
buildingGroup.add(house);
buildingGroup.add(hotel);



treeGroup.rotation.set(0.25, 1, 0)
buildingGroup.rotation.set(0.25, 1, 0)
scene.add(treeGroup);
scene.add(buildingGroup);



//Sizes so when resizeing it will take up all space!
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 1000)//(45, sizes.width / sizes.height, 0.1, 100);

camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = true;

//house click
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

canvas.addEventListener('click', (e) => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects([house]);
  if (intersects.length > 0) {
    console.log("clicked");
    console.log(house.position);
    buildingGroup.rotation.set(0, 0, 0);
    treeGroup.rotation.set(0,0,0);
    car.rotation.set(0,0,0);
    camera.position.set(14, 3, -4);
    camera.fov = 10;
    camera.updateProjectionMatrix();
    //camera.lookAt(house.position.clone().setZ(house.position.z + (house.geometry.parameters.height/2)));
  }
});

//resize
window.addEventListener('resize', () => {
  //resize
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//move car

//   var currentPosition = 0;
//   var targetPosition = 3;  
//   var backcurrentPosition = 0;
//   var backtargetPosition = 5;
//   var forwards = true;

// function moveCar() {

//   if (currentPosition >= targetPosition) {
//     console.log('moving backwards now')
//     backcurrentPosition = 0;
//     forwards = false;
    
//   } else if (forwards){
//     car.translateZ(-0.01);
//     currentPosition += 0.01;
//     //console.log(currentPosition)
//   }  
//   // do {
//   //   if (backcurrentPosition < backtargetPosition){
//   //     car.translateZ(0.001);
//   //     backcurrentPosition += 0.001;
//   //     console.log(backcurrentPosition);
//   //   }
    
//   // } while (!forwards);
  
//   // if (!forwards && backcurrentPosition >= backtargetPosition){
//   //   console.log('moving forwards now')
//   //   currentPosition = 0;
//   // }

// }




    
  

    


function animate() {
  requestAnimationFrame(animate);
  // moveCar();
}

animate();





// //change map button
// document.getElementById("changeMap").onclick = function () { changeMap() };

// function changeMap() {
//   console.log('change map')
//   let rgb = [255, 255, 255];
//   let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
//   gsap.to(base.material.color, { r: newColor.r, g: newColor.g, b: newColor.b })
//   // const newTexture = new THREE.TextureLoader().load('img/restaraunt.png');
//   // let newMap = newTexture;
//   // gsap.to(base.material.map, {newMap});
// }

// var carForwards = true

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);

  // if (car.position.z <= 2.5 && carForwards) {
  //   car.translateZ(0.01);
  //   if (car.position.z >= 2.5){
  //     carForwards = false;
  //   }
  // }else if (car.position.z >= 2.5 && !carForwards) {
  //   car.translateZ(-0.01);
  //   if (car.position.z <= 0){
  //     carForwards = true;
  //   }
  // }
}


//console.log(car.position.z)
loop();

//timeline (synchronize multiple animations together)
const tl = gsap.timeline({ defaults: { duration: 0.7 } })
tl.fromTo(base.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo(road.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo(treeGroup.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo(house.position, { z: 0, x: 0, y: 50 }, { z: 1, x: 2, y: 0.8 });
tl.fromTo(hotel.position, { z: 3, x: 2.2, y: 50 }, { z: 3, x: 2, y: 2.2 });
tl.fromTo(car.position, { z: 3, x: 2.2, y: 50 }, { z: -0.5, x: 0, y: 0.75 });
tl.fromTo('nav', { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 });




//Mouse Animation Colors
// let mouseDown = false;
// let rgb = [];
// window.addEventListener('mousedown', () => (mouseDown = true));
// window.addEventListener('mouseup', () => (mouseDown = true));

// window.addEventListener('mousemove', (e) => {
//   if(mouseDown){
//     rgb = [
//       Math.round((e.pageX / sizes.width) * 255), 
//       Math.round((e.pageY / sizes.height) * 255),
//       150,
//     ]
//     //animate colors on mouse move
//     let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
//     gsap.to(base.material.color, {r:newColor.r, g:newColor.g, b:newColor.b})
//   }
// })




// house.addEventListener('click', function () {
//   console.log('House clicked');
//   camera.position.set(house.position.x, house.position.y, house.position.z + 2);
//   camera.lookAt(house.position);
// });
