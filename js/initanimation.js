    import * as THREE from '../build/three.module.js';
    import Stats from './jsm/libs/stats.module.js';

    import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
    import { OrbitControls } from './jsm/controls/OrbitControls.js';
    import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
    import {DRACOLoader} from "./jsm/loaders/DRACOLoader.js";
    import { KTX2Loader } from './jsm/loaders/KTX2Loader.js';
    import { MeshoptDecoder } from './jsm/libs/meshopt_decoder.module.js';

    let camera, scene, renderer;
    let mixer =[];
    var plane = [];
    for(let i=0;i<10;i++)
    plane[i] = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0));
   
    var Viewcontrols;
    Viewcontrols = new function () {
        this.lock_perspective = false;
    }
    const dracoLoader  =new DRACOLoader();
    var controls;
    const clock = new THREE.Clock();
    const connectline = new THREE.Group();
    const container = document.getElementById( "WebGL-output" );
    const stats = new Stats();
    container.appendChild( stats.dom );
    init3D();
    render();


    function init3D() {


        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        renderer.outputEncoding = THREE.sRGBEncoding;
        container.appendChild( renderer.domElement );
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
        camera.position.set( 100, 100, 150 );


        const environment = new RoomEnvironment();
        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xbbbbbb );
        scene.environment = pmremGenerator.fromScene( environment ).texture;

        const grid = new THREE.GridHelper( 500, 10, 0xffffff, 0xffffff );
        grid.material.opacity = 0.5;
        grid.material.depthWrite = false;
        grid.material.transparent = true;
        scene.add( grid );
        dracoLoader.setDecoderPath("draco/gltf/");
        dracoLoader.setDecoderConfig({type:'js'});
        dracoLoader.preload();
        
        // const ktx2Loader = new KTX2Loader()
        //     .setTranscoderPath( 'jss/libs/basis/' )
        //     .detectSupport( renderer );
        const loader = new GLTFLoader().setPath('models/gltf/' );
        loader.setDRACOLoader(dracoLoader);
        loader.load( 'scenedraco.glb', function ( gltf ) {
            scene.add( gltf.scene );
            console.log(gltf.scene);
            render();
        } );
        const axes = new THREE.AxesHelper(1000);
        // scene.add(axes);
        //构建一个坐标轴,蓝色是x轴，红色是z轴，绿色是y轴

        loader.load('redplanedraco.glb',function (gltf) {
            plane[0] = gltf.scene;
            console.log(gltf.scene);
            plane[0].scale.set(30,30,30);
            for(let i=1;i<10;i++)
            {
                
                plane[i] = plane[0].clone();
                scene.add(plane[i]);
            }
            for(let i=0;i<10;i++)
            {
                mixer[i] = new THREE.AnimationMixer( plane[i] );
                mixer[i].clipAction( gltf.animations[ 0 ] ).play();
            }
            animate();
            scene.add(plane[0]);
            render();
        })


        console.log(scene);
        controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', render ); // use if there is no animation loop
        // controls.minDistance = 400;
        // controls.maxDistance = 1000;
        controls.target.set( 10, 90, - 16 );
        controls.update();
        window.addEventListener( 'resize', onWindowResize );
        console.log(tArray);
       

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

    }

    //

    function render() {
        for(let i=0;i<10;i++)
        {
            plane[i].position.x=points[i].x;
            plane[i].position.y=points[i].y;
            plane[i].position.z=points[i].z;
        }
        
        renderer.render( scene, camera );
        $("#WebGL-output>canvas").css("width","600px");
        $("#WebGL-output>canvas").css("height","450px");
        requestAnimationFrame(render);
        isconnect();
        if(Viewcontrols.lock_perspective)
        {
            controls.enabled = false;
            camera.position.set(points[5].x+100,points[5].y+100,points[5].z+100)
            camera.lookAt(points[5]);
        }
        else
        {
            controls.enabled = true;
        }
        

    }
    function animate() {
        requestAnimationFrame( animate );
        const delta = clock.getDelta();
        stats.update();
        for(let i=0;i<10;i++)
            mixer[i].update( delta );
    }
    function isconnect() {
        var start=new THREE.Vector3(0,0,0);
        var end=new THREE.Vector3(0,0,0);
        var allChildren = connectline.children;
        for (var j = allChildren.length - 1; j >= 0; j--) {
            if (allChildren[j] instanceof THREE.Line) {
                connectline.remove(allChildren[j]);
            }
        }
        for(var i=0;i<flyIndictor;i++)
        {
            for(var k=i;k<flyIndictor;k++)
            {
                if(tArray[i][k]===1)
                {   
                    start = points[i];
                    end = points[k];
                }
            }
            drawline(start,end);
        }
        scene.add(connectline);

    }
    function drawline(a,b)
    {
        const linepoints =[];
        linepoints.push(a);
        linepoints.push(b);
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        const geometry = new THREE.BufferGeometry().setFromPoints( linepoints );
        const line = new THREE.Line( geometry, material );
        connectline.add(line);
    }
    function initbuilding() {
        var textureLoader = THREE.ImageUtils.loadTexture("../Resource/textures/general/building2.jpg");
        //建筑物1
        var cubeGeometry1 = new THREE.BoxGeometry(10, 50, 16);
        var cubeMaterial1 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
        cube1.position.x = 30;
        cube1.position.y = 8;
        cube1.position.z = 40;
        scene.add(cube1);
        //建筑物2
        var cubeGeometry2 = new THREE.BoxGeometry(14, 50, 2);
        var cubeMaterial2 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
        cube2.position.x = 47;
        cube2.position.y = 8;
        cube2.position.z = 61;
        scene.add(cube2);
        // //建筑物3
        var cubeGeometry3 = new THREE.BoxGeometry(2, 50, 6);
        var cubeMaterial3 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);
        cube3.position.x = 55;
        cube3.position.y = 8;
        cube3.position.z = 63;
        scene.add(cube3);
        // //建筑物4
        var cubeGeometry4 = new THREE.BoxGeometry(2, 50, 12);
        var cubeMaterial4 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube4 = new THREE.Mesh(cubeGeometry4, cubeMaterial4);
        cube4.position.x = 50;
        cube4.position.y = 8;
        cube4.position.z = 26;
        scene.add(cube4);

    }
    function is3dAttack(isAttack)
    {
        var isAttackNum=-1;
        if(isAttack[i]==1)
        {
            isAttackNum++;
            switch (i) {
                case 0:scene.remove(plane1);
                    plane1=planeAttack[isAttackNum];
                    scene.add(plane1);
                    break;
                case 1:scene.remove(plane2);
                    plane2=planeAttack[isAttackNum];
                    scene.add(plane2);
                    break;
                case 2:scene.remove(plane3);
                    plane3=planeAttack[isAttackNum];
                    scene.add(plane3);
                    break;
                case 3:scene.remove(plane4);
                    plane4=planeAttack[isAttackNum];
                    scene.add(plane4);
                    break;
                case 4:scene.remove(plane5);
                    plane5=planeAttack[isAttackNum];
                    scene.add(plane5);
                    break;
                case 5:scene.remove(plane6);
                    plane6=planeAttack[isAttackNum];
                    scene.add(plane6);
                    break;
                case 6:scene.remove(plane7);
                    plane7=planeAttack[isAttackNum];
                    scene.add(plane7);
                    break;
                case 7:scene.remove(plane8);
                    plane8=planeAttack[isAttackNum];
                    scene.add(plane8);
                    break;
                case 8:scene.remove(plane9);
                    plane9=planeAttack[isAttackNum];
                    scene.add(plane9);
                    break;
                case 9:scene.remove(plane10);
                    plane10=planeAttack[isAttackNum];
                    scene.add(plane10);
                    break;
            }

        }
    }
    function isExplode(isCollision)
    {
        var planetemp;
        var pointstemp;
        for(var i=0;i<9;i++)
        {
            if(isCollision[i]==1)
            {
                switch (i) {
                    case 0:planetemp=plane1;
                        pointstemp=points1;
                        break;
                    case 1:planetemp=plane2;
                        pointstemp=points2;
                        break;
                    case 2:planetemp=plane3;
                        pointstemp=points3;
                        break;
                    case 3:planetemp=plane4;
                        pointstemp=points4;
                        break;
                    case 4:planetemp=plane5;
                        pointstemp=points5;
                        break;
                    case 5:planetemp=plane6;
                        pointstemp=points6;
                        break;
                    case 6:planetemp=plane7;
                        pointstemp=points7;
                        break;
                    case 7:planetemp=plane8;
                        pointstemp=points8;
                        break;
                    case 8:planetemp=plane9;
                        pointstemp=points9;
                        break;
                    case 9:planetemp=plane10;
                        pointstemp=points10;
                        break;
                }
                modelExplode(planetemp,150,pointstemp);
                setTimeout("modelExplode(plane1,0,points1)",500);
            }
        }

    }
    
        $("#lock_camera").click(function()
        {
            console.log(Viewcontrols.lock_perspective);
            if(Viewcontrols.lock_perspective===false)
                Viewcontrols.lock_perspective = true;
            else
                Viewcontrols.lock_perspective = false;
        })
    