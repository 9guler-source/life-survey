"use client";

import { useEffect, useRef } from "react";

export default function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    interface Star {
      x: number;
      y: number;
      r: number;
      op: number;
      speed: number;
      phase: number;
    }

    let W: number, H: number;
    let stars: Star[] = [];
    let rafId: number;

    function resize() {
      W = canvas!.width = window.innerWidth;
      H = canvas!.height = window.innerHeight;
    }

    function init() {
      resize();
      stars = Array.from({ length: 130 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        op: 0,
        speed: Math.random() * 0.005 + 0.002,
        phase: Math.random() * Math.PI * 2,
      }));
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, W, H);
      stars.forEach((s) => {
        s.op = ((Math.sin(t * s.speed + s.phase) + 1) / 2) * 0.7;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(255,255,255,${s.op})`;
        ctx!.fill();
      });
      rafId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", init);
    init();
    rafId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", init);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="stars"
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
