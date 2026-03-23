// Black Hole visualization using Three.js
// Adapted from CodePen by VoXelo (Three.js Black Hole with Shaders)
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const BH_RADIUS = 1.3;
const DISK_INNER = BH_RADIUS + 0.2;
const DISK_OUTER = 8.0;
const DISK_TILT = Math.PI / 3.0;

// Simplex noise for disk shader
const NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0,0.5,1,2);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0,i1.z,i2.z,1))+i.y+vec4(0,i1.y,i2.y,1))+i.x+vec4(0,i1.x,i2.x,1));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export function initBlackHole(canvas) {
    if (!canvas) return null;

    const SIZE = Math.min(600, window.innerWidth * 0.8);
    canvas.style.width = SIZE + 'px';
    canvas.style.height = SIZE + 'px';

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
    });
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    renderer.setSize(SIZE, SIZE);
    renderer.setPixelRatio(dpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.set(-6.5, 5.0, 6.5);
    camera.lookAt(0, 0, 0);

    // Post-processing
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(SIZE, SIZE), 0.9, 0.6, 0.75
    );
    composer.addPass(bloomPass);

    // Gravitational lensing post-process
    const lensingPass = new ShaderPass({
        uniforms: {
            tDiffuse: { value: null },
            blackHoleScreenPos: { value: new THREE.Vector2(0.5, 0.5) },
            lensingStrength: { value: 0.12 },
            lensingRadius: { value: 0.3 },
            aspectRatio: { value: 1.0 },
            chromaticAberration: { value: 0.005 }
        },
        vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform vec2 blackHoleScreenPos;
            uniform float lensingStrength;
            uniform float lensingRadius;
            uniform float aspectRatio;
            uniform float chromaticAberration;
            varying vec2 vUv;
            void main(){
                vec2 sp=vUv;
                vec2 tc=sp-blackHoleScreenPos;
                tc.x*=aspectRatio;
                float dist=length(tc);
                float d=lensingStrength/(dist*dist+0.003);
                d=clamp(d,0.0,0.7);
                d*=smoothstep(lensingRadius,lensingRadius*0.3,dist);
                vec2 off=normalize(tc)*d;
                off.x/=aspectRatio;
                float r=texture2D(tDiffuse,sp-off*(1.0+chromaticAberration)).r;
                float g=texture2D(tDiffuse,sp-off).g;
                float b=texture2D(tDiffuse,sp-off*(1.0-chromaticAberration)).b;
                gl_FragColor=vec4(r,g,b,1.0);
            }`
    });
    composer.addPass(lensingPass);

    // Event horizon sphere (black)
    const bhMesh = new THREE.Mesh(
        new THREE.SphereGeometry(BH_RADIUS, 128, 64),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    bhMesh.renderOrder = 0;
    scene.add(bhMesh);

    // Event horizon glow
    const glowMesh = new THREE.Mesh(
        new THREE.SphereGeometry(BH_RADIUS * 1.05, 128, 64),
        new THREE.ShaderMaterial({
            uniforms: { uTime: { value: 0 }, uCamPos: { value: camera.position } },
            vertexShader: `varying vec3 vN;varying vec3 vP;void main(){vN=normalize(normalMatrix*normal);vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
            fragmentShader: `
                uniform float uTime;uniform vec3 uCamPos;varying vec3 vN;varying vec3 vP;
                void main(){
                    vec3 vd=normalize(uCamPos-vP);
                    float f=pow(1.0-abs(dot(vN,vd)),2.5);
                    vec3 c=vec3(1.0,0.4,0.1);
                    float p=sin(uTime*2.5)*0.15+0.85;
                    gl_FragColor=vec4(c*f*p,f*0.4);
                }`,
            transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide
        })
    );
    scene.add(glowMesh);

    // Accretion disk
    const diskMat = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 },
            uColorHot: { value: new THREE.Color(0xffffff) },
            uColorMid1: { value: new THREE.Color(0xff7733) },
            uColorMid2: { value: new THREE.Color(0xff4477) },
            uColorMid3: { value: new THREE.Color(0x7744ff) },
            uColorOuter: { value: new THREE.Color(0x4477ff) },
            uNoiseScale: { value: 2.5 },
            uFlowSpeed: { value: 0.22 },
            uDensity: { value: 1.3 }
        },
        vertexShader: `
            varying vec2 vUv;varying float vRadius;varying float vAngle;
            void main(){
                vUv=uv;vRadius=length(position.xy);vAngle=atan(position.y,position.x);
                gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);
            }`,
        fragmentShader: NOISE_GLSL + `
            uniform float uTime;
            uniform vec3 uColorHot,uColorMid1,uColorMid2,uColorMid3,uColorOuter;
            uniform float uNoiseScale,uFlowSpeed,uDensity;
            varying vec2 vUv;varying float vRadius;varying float vAngle;
            void main(){
                float nr=smoothstep(${DISK_INNER.toFixed(2)},${DISK_OUTER.toFixed(2)},vRadius);
                float spiral=vAngle*3.0-(1.0/(nr+0.1))*2.0;
                vec2 nuv=vec2(vUv.x+uTime*uFlowSpeed*(2.0/(vRadius*0.3+1.0))+sin(spiral)*0.1,vUv.y*0.8+cos(spiral)*0.1);
                float n1=snoise(vec3(nuv*uNoiseScale,uTime*0.15));
                float n2=snoise(vec3(nuv*uNoiseScale*3.0+0.8,uTime*0.22));
                float n3=snoise(vec3(nuv*uNoiseScale*6.0+1.5,uTime*0.3));
                float nv=(n1*0.45+n2*0.35+n3*0.2+1.0)*0.5;
                vec3 col=uColorOuter;
                col=mix(col,uColorMid3,smoothstep(0.0,0.25,nr));
                col=mix(col,uColorMid2,smoothstep(0.2,0.55,nr));
                col=mix(col,uColorMid1,smoothstep(0.5,0.75,nr));
                col=mix(col,uColorHot,smoothstep(0.7,0.95,nr));
                col*=(0.5+nv*1.0);
                float br=pow(1.0-nr,1.0)*3.5+0.5;
                br*=(0.3+nv*2.2);
                br*=sin(uTime*1.8+nr*12.0+vAngle*2.0)*0.15+0.85;
                float a=uDensity*(0.2+nv*0.9);
                a*=smoothstep(0.0,0.15,nr);
                a*=(1.0-smoothstep(0.85,1.0,nr));
                gl_FragColor=vec4(col*br,clamp(a,0.0,1.0));
            }`,
        transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
    });

    const disk = new THREE.Mesh(new THREE.RingGeometry(DISK_INNER, DISK_OUTER, 256, 128), diskMat);
    disk.rotation.x = DISK_TILT;
    disk.renderOrder = 1;
    scene.add(disk);

    // State
    const clock = new THREE.Clock();
    const bhScreenPos = new THREE.Vector3();
    let running = false;

    function render() {
        if (!running) return;
        requestAnimationFrame(render);
        const t = clock.getElapsedTime();

        diskMat.uniforms.uTime.value = t;
        glowMesh.material.uniforms.uTime.value = t;
        glowMesh.material.uniforms.uCamPos.value.copy(camera.position);
        disk.rotation.z += 0.002;

        bhScreenPos.copy(bhMesh.position).project(camera);
        lensingPass.uniforms.blackHoleScreenPos.value.set(
            (bhScreenPos.x + 1) / 2, (bhScreenPos.y + 1) / 2
        );

        composer.render();
    }

    return {
        start() { if (!running) { running = true; clock.start(); render(); } },
        stop() { running = false; },
        get isRunning() { return running; }
    };
}
