import React, { useEffect, useRef } from 'react';

const InteractiveNeuralVortex = ({ children }) => {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tX: 0, tY: 0 }); // Real-time pointer updates
  const animationRef = useRef(null);

  // WebGL setup
  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    // Initialize WebGL context
    const gl = canvasEl.getContext('webgl') || canvasEl.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Shader sources
    const vsSource = `
      precision mediump float;
      attribute vec2 a_position;
      varying vec2 vUv;
      void main() {
        vUv = .5 * (a_position + 1.);
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_ratio;
      uniform vec2 u_pointer_position;
      uniform float u_scroll_progress;
      
      vec2 rotate(vec2 uv, float th) {
        return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
      }
      
      float neuro_shape(vec2 uv, float t, float p) {
        vec2 sine_acc = vec2(0.);
        vec2 res = vec2(0.);
        float scale = 8.;
        for (int j = 0; j < 15; j++) {
          uv = rotate(uv, 1.);
          sine_acc = rotate(sine_acc, 1.);
          vec2 layer = uv * scale + float(j) + sine_acc - t;
          sine_acc += sin(layer) + 2.4 * p;
          res += (.5 + .5 * cos(layer)) / scale;
          scale *= (1.2);
        }
        return res.x + res.y;
      }
      
      void main() {
        vec2 uv = .5 * vUv;
        uv.x *= u_ratio;
        vec2 pointer = vUv - u_pointer_position;
        pointer.x *= u_ratio;
        float p = clamp(length(pointer), 0., 1.);
        p = .5 * pow(1. - p, 2.);
        float t = .001 * u_time;
        vec3 color = vec3(0.);
        float noise = neuro_shape(uv, t, p);
        noise = 1.2 * pow(noise, 3.);
        noise += pow(noise, 10.);
        noise = max(.0, noise - .5);
        noise *= (1. - length(vUv - .5));
        color = vec3(0.5, 0.15, 0.65);
        color = mix(color, vec3(0.02, 0.7, 0.9), 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
        color += vec3(0.15, 0.0, 0.6) * sin(2.0 * u_scroll_progress + 1.5);
        color = color * noise;
        gl_FragColor = vec4(color, noise);
      }
    `;

    // Shader compilation
    const compileShader = (gl, source, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(gl, vsSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(gl, fsSource, gl.FRAGMENT_SHADER);

    // Program setup
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Geometry
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRatio = gl.getUniformLocation(program, 'u_ratio');
    const uPointerPosition = gl.getUniformLocation(program, 'u_pointer_position');
    const uScrollProgress = gl.getUniformLocation(program, 'u_scroll_progress');

    // Resize handler
    const resizeCanvas = () => {
      const devicePixelRatio = Math.min(window.devicePixelRatio, 2);
      canvasEl.width = window.innerWidth * devicePixelRatio;
      canvasEl.height = window.innerHeight * devicePixelRatio;
      gl.viewport(0, 0, canvasEl.width, canvasEl.height);
      gl.uniform1f(uRatio, canvasEl.width / canvasEl.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Animation loop
    const render = () => {
      const currentTime = performance.now();
      
      // Smooth pointer movement
      pointer.current.x += (pointer.current.tX - pointer.current.x) * 0.2;
      pointer.current.y += (pointer.current.tY - pointer.current.y) * 0.2;
      
      gl.uniform1f(uTime, currentTime);
      gl.uniform2f(uPointerPosition, 
        pointer.current.x / window.innerWidth, 
        1 - pointer.current.y / window.innerHeight
      );
      gl.uniform1f(uScrollProgress, window.pageYOffset / (2 * window.innerHeight));
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    // Event listeners
    const handleMouseMove = (e) => {
      pointer.current.tX = e.clientX;
      pointer.current.tY = e.clientY;
    };

    window.addEventListener('pointermove', handleMouseMove);
    window.addEventListener('touchmove', (e) => {
      if (e.touches[0]) {
        pointer.current.tX = e.touches[0].clientX;
        pointer.current.tY = e.touches[0].clientY;
      }
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-black items-center justify-center overflow-x-hidden font-sans">
      {/* Canvas Background */}
      <div className="relative z-10 w-full">{children}</div>
      <canvas 
        ref={canvasRef} 
        id="neuro" 
        className="fixed inset-0 w-full h-full pointer-events-none opacity-95 z-0"
      ></canvas>

      {/* Hero Section */}
      {/* <section className="flex flex-col items-center justify-center flex-1 w-full px-6 z-10 mt-16">
        <div className="max-w-2xl w-full outline-style rounded-3xl px-8 py-14 text-center backdrop-blur-md animate-seq">
          <h1 className="geist-heading geist-h1">
            Step Into the Future of VR
          </h1>
          <p className="geist-heading geist-h2 mb-9 text-white/60">
            ImmersiaVR delivers breathtaking realism, seamless interaction, and endless possibilities for gaming, education, and beyond.
          </p>
          <a href="#get-started"
            className="inline-block px-8 py-4 rounded-xl outline-btn font-semibold text-white">
            Get Started
          </a>
        </div>
      </section> */}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideInLeft { 
          from { opacity: 0; transform: translateX(-40px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes slideInRight { 
          from { opacity: 0; transform: translateX(40px); } 
          to { opacity: 1; transform: translateX(0); } 
        }
        @keyframes slideInUp { 
          from { opacity: 0; transform: translateY(40px); } 
          to { opacity: 1; transform: translateY(0); } 
        }
        .animate-seq {
          animation: slideInUp 0.8s both;
        }
        .geist-heading {
          font-family: 'Geist', ui-sans-serif, system-ui, sans-serif;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: #fff;
          margin-bottom: 0.5em;
        }
        .geist-h1 {
          font-size: 48px;
          line-height: 1.05;
        }
        @media (min-width: 768px) {
          .geist-h1 { font-size: 64px; }
        }
        .geist-h2 {
          font-size: 20px;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .geist-h2 { font-size: 20px; }
        }
        .geist-h3 {
          font-size: 16px;
          line-height: 1.2;
        }
        @media (min-width: 768px) {
          .geist-h3 { font-size: 20px; }
        }
        .outline-style,
        .outline-btn,
        .outline-card {
          border: 2px solid rgba(255,255,255,0.10) !important;
          background: transparent;
          box-shadow: none;
        }
        .text-white-important, .text-white, h1, h2, h3, h4, h5, h6, p, span, a, footer, nav { 
          color: #fff !important; 
        }
        a { text-decoration: none !important; }
      `}</style>
    </div>
  );
};

export default InteractiveNeuralVortex;