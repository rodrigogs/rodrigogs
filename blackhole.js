// Unified Three.js background: starfield + sun-to-black-hole transition
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';

const BH_RADIUS = 1.3;
const DISK_INNER = BH_RADIUS + 0.2;
const DISK_OUTER = 8.0;

// Simplex noise GLSL
const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0,.5,1,2);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g,l.zxy);vec3 i2=max(g,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0,i1.z,i2.z,1))+i.y+vec4(0,i1.y,i2.y,1))+i.x+vec4(0,i1.x,i2.x,1));
  float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

export function initBackground(canvas) {
    if (!canvas) return null;

    const W = () => window.innerWidth;
    const H = () => window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020005);
    scene.fog = new THREE.FogExp2(0x020005, 0.012);

    const camera = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 4000);
    camera.position.set(-6.5, 5.0, 6.5);
    camera.lookAt(0, 0, 0);

    // === POST-PROCESSING ===
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloom = new UnrealBloomPass(new THREE.Vector2(W(), H()), 0.9, 0.6, 0.75);
    composer.addPass(bloom);

    const lensingPass = new ShaderPass({
        uniforms: {
            tDiffuse: { value: null },
            bhPos: { value: new THREE.Vector2(0.5, 0.5) },
            strength: { value: 0.0 },
            radius: { value: 0.3 },
            aspect: { value: W() / H() },
            chromatic: { value: 0.005 }
        },
        vertexShader: `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `
            uniform sampler2D tDiffuse;uniform vec2 bhPos;uniform float strength,radius,aspect,chromatic;
            varying vec2 vUv;
            void main(){
                vec2 tc=vUv-bhPos;tc.x*=aspect;float d=length(tc);
                float amt=strength/(d*d+.003);amt=clamp(amt,0.,.7)*smoothstep(radius,radius*.3,d);
                vec2 off=normalize(tc)*amt;off.x/=aspect;
                float r=texture2D(tDiffuse,vUv-off*(1.+chromatic)).r;
                float g=texture2D(tDiffuse,vUv-off).g;
                float b=texture2D(tDiffuse,vUv-off*(1.-chromatic)).b;
                gl_FragColor=vec4(r,g,b,1.);
            }`
    });
    composer.addPass(lensingPass);

    // === STARFIELD (150k stars) ===
    const starCount = 120000;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    const starSz = new Float32Array(starCount);
    const starTw = new Float32Array(starCount);
    const palette = [0x88aaff, 0xffaaff, 0xaaffff, 0xffddaa, 0xffeecc, 0xffffff, 0xff8888, 0xffff88].map(c => new THREE.Color(c));

    for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const phi = Math.acos(-1 + (2 * i) / starCount);
        const theta = Math.sqrt(starCount * Math.PI) * phi;
        const r = Math.cbrt(Math.random()) * 2000 + 80;
        starPos[i3] = r * Math.sin(phi) * Math.cos(theta);
        starPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        starPos[i3 + 2] = r * Math.cos(phi);
        const c = palette[Math.floor(Math.random() * palette.length)].clone().multiplyScalar(Math.random() * 0.7 + 0.3);
        starCol[i3] = c.r; starCol[i3 + 1] = c.g; starCol[i3 + 2] = c.b;
        starSz[i] = Math.random() * 2.5 + 0.5;
        starTw[i] = Math.random() * Math.PI * 2;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSz, 1));
    starGeo.setAttribute('twinkle', new THREE.BufferAttribute(starTw, 1));

    const starMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() } },
        vertexShader: `
            uniform float uTime,uPR;attribute float size,twinkle;varying vec3 vColor;varying float vTw;
            void main(){vColor=color;vTw=sin(uTime*2.5+twinkle)*.5+.5;
            vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=size*uPR*(300./-mv.z);gl_Position=projectionMatrix*mv;}`,
        fragmentShader: `
            varying vec3 vColor;varying float vTw;
            void main(){float d=distance(gl_PointCoord,vec2(.5));if(d>.5)discard;
            float a=(1.-smoothstep(0.,.5,d))*(.2+vTw*.8);gl_FragColor=vec4(vColor,a);}`,
        transparent: true, vertexColors: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // === SUN (glowing sphere - visible at scroll 0) ===
    const sunMat = new THREE.ShaderMaterial({
        uniforms: { uProgress: { value: 0 }, uTime: { value: 0 } },
        vertexShader: `varying vec3 vPos;varying vec3 vNorm;void main(){vPos=position;vNorm=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `
            uniform float uProgress,uTime;varying vec3 vPos;varying vec3 vNorm;
            void main(){
                float y=vPos.y*0.5+0.5;
                vec3 hot=vec3(1.,.95,.4);vec3 warm=vec3(1.,.4,.6);vec3 cool=vec3(.6,.0,.8);
                vec3 col=mix(hot,warm,smoothstep(.3,.6,y));col=mix(col,cool,smoothstep(.5,.9,y));
                float pulse=sin(uTime*1.5)*.1+.9;
                float fade=1.-uProgress;
                gl_FragColor=vec4(col*pulse*1.5,fade);
            }`,
        transparent: true, side: THREE.FrontSide
    });
    const sunMesh = new THREE.Mesh(new THREE.SphereGeometry(BH_RADIUS * 1.8, 64, 32), sunMat);
    sunMesh.renderOrder = 2;
    scene.add(sunMesh);

    // Sun glow (additive, large)
    const sunGlowMat = new THREE.ShaderMaterial({
        uniforms: { uProgress: { value: 0 }, uTime: { value: 0 } },
        vertexShader: `varying vec3 vNorm;void main(){vNorm=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `
            uniform float uProgress,uTime;varying vec3 vNorm;
            void main(){
                float f=pow(1.-abs(dot(vNorm,vec3(0,0,1.))),2.);
                vec3 col=vec3(1.,.4,.7)*f*(1.-uProgress);
                float pulse=sin(uTime*1.5)*.15+.85;
                gl_FragColor=vec4(col*pulse*2.,f*(1.-uProgress)*.6);
            }`,
        transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide
    });
    const sunGlow = new THREE.Mesh(new THREE.SphereGeometry(BH_RADIUS * 3.5, 32, 16), sunGlowMat);
    scene.add(sunGlow);

    // === BLACK HOLE (sphere + glow) ===
    const bhMesh = new THREE.Mesh(
        new THREE.SphereGeometry(BH_RADIUS, 128, 64),
        new THREE.MeshBasicMaterial({ color: 0x000000 })
    );
    bhMesh.renderOrder = 3;
    scene.add(bhMesh);

    const bhGlowMat = new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uCamPos: { value: camera.position }, uProgress: { value: 0 } },
        vertexShader: `varying vec3 vN,vP;void main(){vN=normalize(normalMatrix*normal);vP=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: `
            uniform float uTime,uProgress;uniform vec3 uCamPos;varying vec3 vN,vP;
            void main(){
                vec3 vd=normalize(uCamPos-vP);float f=pow(1.-abs(dot(vN,vd)),2.5);
                vec3 c=vec3(1.,.4,.1);float p=sin(uTime*2.5)*.15+.85;
                gl_FragColor=vec4(c*f*p*uProgress,f*.4*uProgress);
            }`,
        transparent: true, blending: THREE.AdditiveBlending, side: THREE.BackSide
    });
    const bhGlow = new THREE.Mesh(new THREE.SphereGeometry(BH_RADIUS * 1.05, 128, 64), bhGlowMat);
    scene.add(bhGlow);

    // === ACCRETION DISK ===
    const diskMat = new THREE.ShaderMaterial({
        uniforms: {
            uTime: { value: 0 }, uProgress: { value: 0 },
            cHot: { value: new THREE.Color(0xffffff) },
            cM1: { value: new THREE.Color(0xff7733) },
            cM2: { value: new THREE.Color(0xff4477) },
            cM3: { value: new THREE.Color(0x7744ff) },
            cOut: { value: new THREE.Color(0x4477ff) },
        },
        vertexShader: `
            varying vec2 vUv;varying float vR,vA;
            void main(){vUv=uv;vR=length(position.xy);vA=atan(position.y,position.x);
            gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
        fragmentShader: NOISE + `
            uniform float uTime,uProgress;
            uniform vec3 cHot,cM1,cM2,cM3,cOut;
            varying vec2 vUv;varying float vR,vA;
            void main(){
                float nr=smoothstep(${DISK_INNER.toFixed(1)},${DISK_OUTER.toFixed(1)},vR);
                float sp=vA*3.-(1./(nr+.1))*2.;
                vec2 nuv=vec2(vUv.x+uTime*.22*(2./(vR*.3+1.))+sin(sp)*.1,vUv.y*.8+cos(sp)*.1);
                float n1=snoise(vec3(nuv*2.5,uTime*.15));
                float n2=snoise(vec3(nuv*7.5+.8,uTime*.22));
                float n3=snoise(vec3(nuv*15.+1.5,uTime*.3));
                float nv=(n1*.45+n2*.35+n3*.2+1.)*.5;
                vec3 col=cOut;
                col=mix(col,cM3,smoothstep(0.,.25,nr));
                col=mix(col,cM2,smoothstep(.2,.55,nr));
                col=mix(col,cM1,smoothstep(.5,.75,nr));
                col=mix(col,cHot,smoothstep(.7,.95,nr));
                col*=(.5+nv);
                float br=pow(1.-nr,1.)*3.5+.5;
                br*=(.3+nv*2.2);
                br*=sin(uTime*1.8+nr*12.+vA*2.)*.15+.85;
                float a=1.3*(.2+nv*.9);
                a*=smoothstep(0.,.15,nr)*(1.-smoothstep(.85,1.,nr));
                gl_FragColor=vec4(col*br,clamp(a,0.,1.)*uProgress);
            }`,
        transparent: true, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const disk = new THREE.Mesh(new THREE.RingGeometry(DISK_INNER, DISK_OUTER, 256, 128), diskMat);
    disk.rotation.x = Math.PI / 3.0;
    disk.renderOrder = 1;
    scene.add(disk);

    // === RESIZE ===
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            camera.aspect = W() / H();
            camera.updateProjectionMatrix();
            renderer.setSize(W(), H());
            composer.setSize(W(), H());
            bloom.resolution.set(W(), H());
            lensingPass.uniforms.aspect.value = W() / H();
        }, 150);
    });

    // === ANIMATION STATE ===
    const clock = new THREE.Clock();
    const bhScreen = new THREE.Vector3();
    let scrollProgress = 0;

    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();
        const dt = clock.getDelta();
        const p = scrollProgress;

        // Update uniforms
        starMat.uniforms.uTime.value = t;
        sunMat.uniforms.uProgress.value = p;
        sunMat.uniforms.uTime.value = t;
        sunGlowMat.uniforms.uProgress.value = p;
        sunGlowMat.uniforms.uTime.value = t;
        diskMat.uniforms.uTime.value = t;
        diskMat.uniforms.uProgress.value = p;
        bhGlowMat.uniforms.uTime.value = t;
        bhGlowMat.uniforms.uCamPos.value.copy(camera.position);
        bhGlowMat.uniforms.uProgress.value = p;

        // Lensing strength scales with progress
        lensingPass.uniforms.strength.value = 0.12 * p;

        // Update lensing center
        bhScreen.copy(bhMesh.position).project(camera);
        lensingPass.uniforms.bhPos.value.set((bhScreen.x + 1) / 2, (bhScreen.y + 1) / 2);

        // Rotate disk and stars slowly
        disk.rotation.z += dt * 0.005;
        stars.rotation.y += dt * 0.002;
        stars.rotation.x += dt * 0.0005;

        // Sun visibility: fully visible at 0, gone at 0.4
        sunMesh.visible = p < 0.5;
        sunGlow.visible = p < 0.5;

        // Black hole: hidden at 0, fully visible at 0.5+
        bhMesh.visible = p > 0.05;
        bhGlow.visible = p > 0.05;
        disk.visible = p > 0.05;

        // Bloom intensity increases with black hole
        bloom.strength = 0.5 + p * 0.8;

        composer.render(dt);
    }

    animate();

    return {
        setProgress(p) { scrollProgress = p; }
    };
}
