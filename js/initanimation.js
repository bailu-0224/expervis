    import * as THREE from '../build/three.module.js';
    import Stats from './jsm/libs/stats.module.js';

    import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
    import { OrbitControls } from './jsm/controls/OrbitControls.js';
    import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
    import {DRACOLoader} from "./jsm/loaders/DRACOLoader.js";

    import { EffectComposer } from './jsm/postprocessing/EffectComposer.js';
    import { RenderPass } from './jsm/postprocessing/RenderPass.js';
    import { ShaderPass } from './jsm/postprocessing/ShaderPass.js';
    import { OutlinePass } from './jsm/postprocessing/OutlinePass.js';
    import { FXAAShader } from './jsm/shaders/FXAAShader.js';

    import { Line2 } from './jsm/lines/Line2.js';
	import { LineMaterial } from './jsm/lines/LineMaterial.js';
	import { LineGeometry } from './jsm/lines/LineGeometry.js';
    import * as GeometryUtils from './jsm/utils/GeometryUtils.js';
    import { KTX2Loader } from './jsm/loaders/KTX2Loader.js';
    import { MeshoptDecoder } from './jsm/libs/meshopt_decoder.module.js';
    import {Sky} from './jsm/objects/Sky.js';
    let camera, scene, renderer,outlinePass,composer,sky,sun;
    var renderEnabled = true;
    let timeOut = null;
    let mixer =[];
    var plane = [];
    var vertices = [];
    let line,matLine;

    const fatlinepoints = [];
    const falinepoistions = [];
    const colors = [];
    let selectedObjects=[];
    for(let i=0;i<10;i++)
    plane[i] = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0));
   
    var Viewcontrols;
    Viewcontrols = new function () {
        this.lock_perspective = true;
        this.look_down = false;
    }
    const dracoLoader  =new DRACOLoader();
    var controls;
    const clock = new THREE.Clock();
    const connectline = new THREE.Group();
    const container = document.getElementById( "WebGL-output" );
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load( './images/sendMessage2.jpeg' );
    var pillarmaterial = new THREE.MeshPhongMaterial( {
        color: 0x156289,
        emissive: 0x00FFFF,
        side: THREE.DoubleSide,
        shading: THREE.FlatShading,
        vertexColors:THREE.FaceColors
    } );
    const materials = new THREE.SpriteMaterial( { map: texture} );
    const geometry1 = new THREE.BufferGeometry();
    const pointsAll  = new THREE.Group();
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
        } );
        const axes = new THREE.AxesHelper(1000);
        // scene.add(axes);
        //构建一个坐标轴,蓝色是x轴，红色是z轴，绿色是y轴

        loader.load('redplanedraco.glb',function (gltf) {
            plane[0] = gltf.scene;
            plane[0].scale.set(30,30,30);
            for(let i=1;i<flyIndictor;i++)
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
        })
        loader.load('13.glb',function(gltf)
        {
            scene.add(gltf.scene);
            gltf.scene.position.set( 50, 50, 100 );
            mixer[10] = new THREE.AnimationMixer(gltf.scene);
            mixer[10].clipAction(gltf.animations[0]).play();
        })
        controls = new OrbitControls( camera, renderer.domElement );
        controls.addEventListener( 'change', function() 
        {
            timeRender();
        } 
        ); // use if there is no animation loop
        // controls.minDistance = 400;
        // controls.maxDistance = 1000;
        controls.target.set( 10, 90, - 16 );
        controls.update();
        window.addEventListener( 'resize', onWindowResize );
        console.log(tArray);
        // falinepoistions.length=0;
        // fatlinepoints.length=0;
        // fatlinepoints.push(new THREE.Vector3(0,0,0));
        // fatlinepoints.push(new THREE.Vector3(1,1,1));
        // const spline = new THREE.CatmullRomCurve3(fatlinepoints);
        // const divisions = Math.round(12*fatlinepoints.length);
        // const point = new THREE.Vector3();
        // const color = new THREE.Color();
        // for( let i=0,l=divisions;i<l;i++)
        // {
        //     const t=i/l;
        //     spline.getPoint(t,point);
        //     falinepoistions.push(point.x,point.y,point.z);
        //     color.setHSL( t, 1.0, 0.5 );
		// 	colors.push( color.r, color.g, color.b );
        // }
        // const geometry = new LineGeometry();
		//       geometry.setPositions( falinepoistions );
		// 		matLine = new LineMaterial( {

		// 			color: 0x000000,
		// 			linewidth: 5, // in world units with size attenuation, pixels otherwise
		// 			vertexColors: true,
					
		// 			//resolution:  // to be set by renderer, eventually
		// 			dashed: false,
		// 			alphaToCoverage: true,

		// 		} );

		// 		line = new Line2( geometry, matLine );
		// 		line.scale.set( 1, 1, 1 );
        //         console.log(line)
        // scene.add(line)
        sky = new Sky();
		sky.scale.setScalar( 45000 );
		scene.add( sky );
        sun = new THREE.Vector3();
        const effectController = {
            turbidity: 10,
            rayleigh: 3,
            mieCoefficient: 0.005,
            mieDirectionalG: 0.7,
            elevation: 2,
            azimuth: 180,
            exposure: renderer.toneMappingExposure
        };
                    const uniforms = sky.material.uniforms;
					uniforms[ 'turbidity' ].value = effectController.turbidity;
					uniforms[ 'rayleigh' ].value = effectController.rayleigh;
					uniforms[ 'mieCoefficient' ].value = effectController.mieCoefficient;
					uniforms[ 'mieDirectionalG' ].value = effectController.mieDirectionalG;
                    const phi = THREE.MathUtils.degToRad( 90 - effectController.elevation );
					const theta = THREE.MathUtils.degToRad( effectController.azimuth );
					sun.setFromSphericalCoords( 1, phi, theta );
                    uniforms[ 'sunPosition' ].value.copy( sun );
					renderer.toneMappingExposure = effectController.exposure;

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        render();

    }

    function Controlcase()
    {
        if(Viewcontrols.lock_perspective)
        {
            controls.enabled = false;
            camera.position.set(points[5].x+200,points[5].y+100,points[5].z)
            camera.lookAt(points[5]);
            if(Viewcontrols.look_down)
                {
                    camera.position.set(points[5].x+20,points[5].y+100,points[5].z+20)
                    camera.lookAt(points[5]);
                }
        }
        else
        {
            controls.enabled = true;
        }

    }
    function update_data()
    {
        for(let i=0;i<10;i++)
        {
            plane[i].position.x=points[i].x;
            plane[i].position.y=points[i].y;
            plane[i].position.z=points[i].z;
        }
        isconnect();
        renderEnabled = true;
    }
    setInterval(update_data,80);
    function render() {
        Controlcase();
        brighten();
        
        if(renderEnabled)
        {
            renderEnabled = false;
            renderer.render( scene, camera );
        }
        $("#WebGL-output>canvas").css("width","600px");
        $("#WebGL-output>canvas").css("height","450px");
        requestAnimationFrame(render);  
    }
    //调用一次可以渲染80ms
    function timeRender() {
	//设置为可渲染状态
    renderEnabled = true;
    //清除上次的延迟器
    if (timeOut) {
        clearTimeout(timeOut);
    }
    timeOut = setTimeout(function () {
        renderEnabled = false;
    }, 3000);
    }
 
    function animate() {
        requestAnimationFrame( animate );
        const delta = clock.getDelta();
        stats.update();
        for(let i=0;i<11;i++)
            mixer[i].update( delta );
        //  composer.render();    
       
    }
    function isconnect() {
        var start=new THREE.Vector3(0,0,0);
        var end=new THREE.Vector3(1,0,0);
        // scene.remove(connectline);
      
        var allChildren = connectline.children;
        for (var j = allChildren.length - 1; j >= 0; j--) {
            if (allChildren[j] instanceof Line2) {
                connectline.remove(allChildren[j]);
            }
        }
        // var allPointsChildren = pointsAll.children;
        // for (var j = allPointsChildren.length - 1; j >= 0; j--) {
        //     if (allPointsChildren[j] instanceof THREE.Sprite) {
        //         pointsAll.remove(allPointsChildren[j]);
        //     }
        // }
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
        scene.add(pointsAll);
    }
    function drawline(a,b)
    {
        // var pointsX = (a.x-b.x)/2;
        // var pointsZ = (a.z-b.z)/2;
        // var length = Math.sqrt(((a.x-b.x)*(a.x-b.x))+((a.z-b.z)*(a.z-b.z)));
        // console.log(length);
        // vertices.push((a.x+b.x)/2,(a.y+b.y)/2,a.z);

        // geometry1.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
        // const particles = new THREE.Points( geometry1, materials );
        // pointsAll.add(particles);
        // var spirte = new THREE.Sprite(materials);
        // spirte.position.set((a.x+b.x)/2,(a.y+b.y)/2,a.z);
        // spirte.scale.set(4,4,4);
        // pointsAll.add(spirte);
        // const linepoints =[];
        // linepoints.push(a);
        // linepoints.push(b);
        // const material = new THREE.LineBasicMaterial( { color: 0x0000ff , linewidth: 2} );
        // const geometry = new THREE.BufferGeometry().setFromPoints( linepoints );
        // const line = new THREE.Line( geometry, material );
        // connectline.add(line);
        // const cylinder = new THREE.Mesh( new THREE.CylinderBufferGeometry(0.5,0.5,length), pillarmaterial );
        // cylinder.position.set( pointsX,50,pointsZ);//两实体的中点，也就是柱子线的中点，自己理解
        // console.log(cylinder.position);
        
        // cylinder.rotation.x -= Math.PI * 0.5;
        let geometry2 = new LineGeometry();
        var pointArr = [a.x,a.y,a.z,b.x,b.y,b.z];
        geometry2.setPositions(pointArr);
 
        let material2 = new LineMaterial({
        linewidth: 5,
        color: 0x156289,
        });
        material2.resolution.set(window.innerWidth+100,window.innerHeight+100);//这句如果不加宽度仍然无效
        let line2 = new Line2(geometry2, material2);
        connectline.add(line2);
        
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
    function brighten()
    {
                 composer = new EffectComposer( renderer );

                var renderPass = new RenderPass( scene, camera );
                composer.addPass( renderPass );

                outlinePass = new OutlinePass( new THREE.Vector2( window.innerWidth, window.innerHeight ), scene, camera );
                composer.addPass( outlinePass );

                var onLoad = function ( texture ) {

                    outlinePass.patternTexture = texture;
                    texture.wrapS = THREE.RepeatWrapping;
                    texture.wrapT = THREE.RepeatWrapping;

                };

                var ttloader = new THREE.TextureLoader();

                ttloader.load( './images/tri_pattern.jpg', onLoad );

                var effectFXAA = new ShaderPass( FXAAShader );
                effectFXAA.uniforms[ 'resolution' ].value.set( 1 / window.innerWidth, 1 / window.innerHeight );
                effectFXAA.renderToScreen = true;
                composer.addPass( effectFXAA );
                outlinePass.selectedObjects =selectedObjects;

    }
    function addSelectedObject( object ) {
        selectedObjects = [];
        selectedObjects.push( object );

    }
    
        $("#lock_camera").click(function()
        {
            console.log(Viewcontrols.lock_perspective);
            if(Viewcontrols.lock_perspective===false)
                Viewcontrols.lock_perspective = true;
            else
                Viewcontrols.lock_perspective = false;
        })
        $("#flyechart").show();
        $("#WebGL-output").hide();
        choosemode = 1;
        $("#switch_case").click(function()
        {
          if(choosemode==0)
            {
             $("#flyechart").show();
             $("#WebGL-output").hide();
             choosemode=1;
             }
            else
            {
            $("#flyechart").hide();
            $("#WebGL-output").show();
            choosemode=0;   
             }
        })  
        $("#switch_eyesight").click(function()
        {
            if(Viewcontrols.look_down===false)
                Viewcontrols.look_down = true;
            else
                Viewcontrols.look_down = false;
        }
        )

    