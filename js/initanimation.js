    import * as THREE from '../build/three.module.js';
    import Stats from './jsm/libs/stats.module.js';

    import { RoomEnvironment } from './jsm/environments/RoomEnvironment.js';
    import { OrbitControls } from './jsm/controls/OrbitControls.js';
    import { GLTFLoader } from './jsm/loaders/GLTFLoader.js';
    import {DRACOLoader} from "./jsm/loaders/DRACOLoader.js";

    import { EffectComposer } from "./jsm/postprocessing/EffectComposer.js";
    import { UnrealBloomPass } from "./jsm/postprocessing/UnrealBloomPass.js";
    import { RenderPass } from "./jsm/postprocessing/RenderPass.js";

    import { Line2 } from './jsm/lines/Line2.js';
	import { LineMaterial } from './jsm/lines/LineMaterial.js';
	import { LineGeometry } from './jsm/lines/LineGeometry.js';
    import {Sky} from './jsm/objects/Sky.js';
    let camera, scene, renderer,outlinePass,composer,sky,sun;
    var renderEnabled = true;
    let timeOut = null;
    let mixer =[];
    var plane = [];
    const planepoints =[];
    for(let i=0;i<10;i++)
    plane[i] = new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0));
   
    var Viewcontrols;
    Viewcontrols = new function () {
        this.lock_perspective = true;
        this.look_down = false;
    }
    let linematerial = new LineMaterial({
        linewidth: 5,
        color: 0x156289,
        // color:0xff0000,
        });
        linematerial.resolution.set(window.innerWidth+100,window.innerHeight+100);//这句如果不加宽度仍然无效
    // let linetexture = new THREE.TextureLoader().load("images/line_image.png")
    // linetexture.wrapS = linetexture.wrapT = THREE.RepeatWrapping; //每个都重复
    // linetexture.repeat.set(1, 1)
    // linetexture.needsUpdate = true
    // const params = {
    //     exposure: 0,
    //     bloomStrength: 1.5,
    //     bloomThreshold: 0,
    //     bloomRadius: 0,
    //   };
    // let linematerial = new THREE.MeshBasicMaterial({
    //     map: linetexture,
    //     side: THREE.BackSide,
    //     transparent: true
    //  })
    
   
     var customMaterial = new THREE.ShaderMaterial({
        uniforms: 
        { 
          "s":   { type: "f", value: -1.0},
          "b":   { type: "f", value: 3.0},
          "p":   { type: "f", value: 2.0 },
          glowColor: { type: "c", value: new THREE.Color(0x00ffff) }
        },
        vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      })
      var customMaterialmiss = new THREE.ShaderMaterial({
        uniforms: 
        { 
          "s":   { type: "f", value: -1.0},
          "b":   { type: "f", value: 3.0},
          "p":   { type: "f", value: 2.0 },
          glowColor: { type: "c", value: new THREE.Color(0xff0000) }
        },
        vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
        fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
        side: THREE.FrontSide,
        blending: THREE.AdditiveBlending,
        transparent: true
      })
      var messagebox = new THREE.BoxGeometry(1,1,1);
      var mymessage =new THREE.Mesh(messagebox,customMaterial);
      var mymissmessage = new THREE.Mesh(messagebox,customMaterialmiss);
       // 创建顶点数组
    let linepoints = [];
    var choosecolor =0;
    let linegeo =[];
    let linegroup = [];
    for(let i=0;i<100;i++)
    linegeo[i] = new LineGeometry();
    for(let i=0;i<100;i++)
    linegroup[i] = new Line2();
    let mymessage1=[];
    // for(let i=0;i<100;i++)
    //     mymessage1[i] =new THREE.Mesh(new THREE.BoxGeometry(0, 0, 0));
    var pointArr
    var i=0;
    const dracoLoader  =new DRACOLoader();
    var controls;
    const clock = new THREE.Clock();
    const connectline = new THREE.Group();
    const connectbox = new THREE.Group();
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
        // loader.load('13.glb',function(gltf)
        // {
        //     const nextmodel = gltf.scene.clone();
        //     nextmodel.position.set(75,40,75);
        //     nextmodel.scale.set(0.1,1,0.1);
        //     scene.add(nextmodel);
        //     scene.add(gltf.scene);
        //     gltf.scene.position.set( 25, 40, 125 );
        //     mixer[11] = new THREE.AnimationMixer(nextmodel);
        //     mixer[11].clipAction(gltf.animations[0]).play();
        //     mixer[10] = new THREE.AnimationMixer(gltf.scene);
        //     mixer[10].clipAction(gltf.animations[0]).play();
        // })
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
                    const geometry = new THREE.BoxGeometry(20, 20, 10);
                    const bloomMtl = new THREE.MeshLambertMaterial({ color: 0xff5500 });
                    const bloomBox = new THREE.Mesh(geometry, bloomMtl);
                    bloomBox.position.Z = 5;
                    bloomBox.layers.set(1);
                    scene.add(bloomBox);
        if(experFlag==1)
        initbuilding();
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
            camera.position.set(points[5].x+150,points[5].y+100,points[5].z)
            camera.lookAt(points[5]);
            if(Viewcontrols.look_down)
                {
                    camera.position.set(points[5].x+30,points[5].y+40,points[5].z)
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
    setInterval(update_data,100);
    function render() {
        Controlcase();
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
        for(let i=0;i<10;i++)
            mixer[i].update( delta );
    }
    function isconnect() {
        var start=new THREE.Vector3(0,0,0);
        var end=new THREE.Vector3(1,0,0);
        var allbox = connectbox.children;
        var allChildren = connectline.children;
        for (var j = allChildren.length - 1; j >= 0; j--) {
            if (allChildren[j] instanceof THREE.Mesh) {
                connectline.remove(allChildren[j]);
            }
        }
        for(var j=allbox.length-1;j>=0;j--)
        {
            if(allbox[j] instanceof THREE.Mesh)
               {
                connectbox.remove(allbox[j]);
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
                    drawline(i,k,start,end);
                }
            }   
        }
        scene.add(connectline);
        scene.add(connectbox);
    }
    
    function drawline(flyA,flyB,a,b)
    {
        var id=(flyA)*10+flyB;
        pointArr = [a.x,a.y,a.z,b.x,b.y,b.z];
        linegeo[id].setPositions(pointArr);
        linegroup[id].geometry=linegeo[id];
        linegroup[id].material=linematerial;
        connectline.add(linegroup[id]);
        if(choosecolor==0)
        {
             mymessage1[id] = mymessage.clone();
            choosecolor = 1;
        }
        else
        {
            mymessage1[id] = mymissmessage.clone();
            choosecolor = 0;
        }
        mymessage1[id].position.x = (a.x+b.x)/2;
        mymessage1[id].position.y = a.y;
        mymessage1[id].position.z = (a.z+b.z)/2;
        // function animatebox()
        // {
        //     i++;
        //     mymessage1[id].position.x=a.x;
        //     mymessage1[id].position.y=a.y;
        //      mymessage1[id].position.z=a.z;
        // targetPos = points[flyB];
        // // var mtx = new THREE.Matrix4();
        // // mtx.lookAt(mymessage1[id].position.clone() , targetPos , mymessage1[id].up) //设置朝向
        // // mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0 , offsetAngle ,0 )))
        // // var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)  //计算出需要进行旋转的四元数值
        // // //根据以上值调整角度
        // // mymessage1[id].quaternion.slerp(toRot, 0.2);
        // // mymessage1[id].position.x=targetPos.x;
        // // mymessage1[id].position.y=targetPos.y;
        // // mymessage1[id].position.z=targetPos.z;
        // if(mymessage1[id].position.x!=points[flyB].x&&mymessage1[id].position.z!=points[flyB].z)
        // {mymessage1[id].position.x+=(points[flyB].x-points[flyA].x)*1/60;
        // mymessage1[id].position.y+=(points[flyB].y-points[flyA].y)*1/60;}
        // requestAnimationFrame (animatebox);
        //     console.log(1);
        // }
        // if(i<=90)
        //     animatebox();
        connectbox.add(mymessage1[id]);
//   linepoints.push(a,b);

//   // CatmullRomCurve3创建一条平滑的三维样条曲线
//   let curve = new THREE.CatmullRomCurve3(linepoints) // 曲线路径

//   // 创建管道
//   let tubeGeometry = new THREE.TubeGeometry(curve, 80,10)
  
//   let mesh = new THREE.Mesh(tubeGeometry, linematerial);

//   connectline.add(mesh) ;
    }
    var targetPos;
    var offsetAngle = Math.PI/2 
    function missmessageAnimate(start,end)
    {
        var idd = start*10+end;
        mymessage1[start*10+end].position.x=points[start].x;
        mymessage1[start*10+end].position.y=points[start].y;
        mymessage1[start*10+end].position.z=points[start].z;
        targetPos = points[end];
        var mtx = new THREE.Matrix4();
        mtx.lookAt(mymessage1[idd].position.clone() , targetPos , mymessage1[idd].up) //设置朝向
        mtx.multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0 , offsetAngle ,0 )))
        var toRot = new THREE.Quaternion().setFromRotationMatrix(mtx)  //计算出需要进行旋转的四元数值
        //根据以上值调整角度
        mymessage1[idd].quaternion.slerp(toRot, 0.2);
        mymessage1[idd].position.x=targetPos.x;
        mymessage1[idd].position.y=targetPos.y;
        mymessage1[idd].position.z=targetPos.z;
        requestAnimationFrame (missmessageAnimate)
        //使用Tween线性改变model的position。此处的action方法Tween官方可能没有，你可以使用Tween的其他方法，只要能线性插值改变position就可以了。
    //     Tween.action(model.position , 1000 , targetPos ,THREE.Tween.linear,function(){
    //     //oncomplete
    //     },function(){
    //     //onupdate
    //      model.quaternion.slerp(toRot , 0.2)  //应用旋转。0.2代表插值step。可以做到平滑旋转过渡
    //     }
    // )   





    }
    function initbuilding() {
        // let textureLoader = new THREE.TextureLoader().load("../Resource/textures/general/stone.jpg")
       
        let textureLoader = new THREE.TextureLoader().load("images/wall.png")
        textureLoader.wrapS = textureLoader.wrapT = THREE.RepeatWrapping; //每个都重复
        textureLoader.repeat.set(1, 10)
        // var textureLoader =  THREE.ImageUtils.loadTexture("../Resource/textures/general/stone.jpg");
        //线框材质
        const buildingmaterial = new THREE.LineBasicMaterial({color:0x0000ff});
        //建筑物1
        var cubeGeometry1 = new THREE.BoxGeometry(20, 100, 32);
        var cubeMaterial1 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube1 = new THREE.Mesh(cubeGeometry1, customMaterial);
        cube1.position.x = 60;
        cube1.position.y = 8;
        cube1.position.z = 80;
        scene.add(cube1);
        //线框1
        const edges1 = new THREE.EdgesGeometry( cubeGeometry1 );
        const line1 = new THREE.LineSegments( edges1, buildingmaterial );
        line1.position.set(60,8,80);
        scene.add( line1 );
        //建筑物2
        var cubeGeometry2 = new THREE.BoxGeometry(28, 100, 4);
        var cubeMaterial2 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube2 = new THREE.Mesh(cubeGeometry2, customMaterial);
        cube2.position.x = 94;
        cube2.position.y = 8;
        cube2.position.z = 122;
        scene.add(cube2);
        //线框2
        const edges2 = new THREE.EdgesGeometry( cubeGeometry2 );
        const line2 = new THREE.LineSegments( edges2, buildingmaterial );
        line2.position.set(94,8,122);
        scene.add( line2 );
        // //建筑物3
        var cubeGeometry3 = new THREE.BoxGeometry(4, 100, 12);
        var cubeMaterial3 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube3 = new THREE.Mesh(cubeGeometry3, customMaterial);
        cube3.position.x = 110;
        cube3.position.y = 8;
        cube3.position.z = 126;
        scene.add(cube3);
        //线框3
        const edges3 = new THREE.EdgesGeometry( cubeGeometry3 );
        const line3 = new THREE.LineSegments( edges3, buildingmaterial );
        line3.position.set(110,8,126);
        scene.add( line3 );
        // //建筑物4
        var cubeGeometry4 = new THREE.BoxGeometry(4, 100, 24);
        var cubeMaterial4 = new THREE.MeshBasicMaterial({map: textureLoader});
        var cube4 = new THREE.Mesh(cubeGeometry4, customMaterial);
        cube4.position.x = 100;
        cube4.position.y = 8;
        cube4.position.z = 52;
        scene.add(cube4);
        //线框4
        const edges4 = new THREE.EdgesGeometry( cubeGeometry4 );
        const line4 = new THREE.LineSegments( edges4, buildingmaterial );
        line4.position.set(100,8,52);
        scene.add( line4 );
        // const clonecube=[];
        // for(var i=0;i<6;i++)
        // {
        //     clonecube[i] = cube4.clone();
        //     clonecube[i].position.x=50;
        //     clonecube[i].position.y=8;
        //     clonecube[i].position.z=26+i*2;
        //     scene.add(clonecube[i]);
        // }
       
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
    function initComposer()
    {
       
          var geometry = new THREE.BoxGeometry( 10, 3, 100, 32 )
          var torusKnot = new THREE.Mesh( geometry, customMaterial )
          torusKnot.position.y=50
          scene.add( torusKnot )

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

    