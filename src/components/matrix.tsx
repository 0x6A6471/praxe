import { useEffect, useRef } from "react";

export default function Matrix() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationIdRef = useRef<number | null>(null);
	const dropsRef = useRef<number[]>([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");

		if (!ctx) return;
		// set canvas size to match window
		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener("resize", resizeCanvas);

		const chars =
			"ｦｧｨｩｪｫｬｭｮｯ█▓▒░ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ┿┥┤┢┡├┬┴┰┯┞┝┟┞┲┰┷┯┸┮┱┪┩┨┦┧┥┤┣┢┡┷┸┹┺┻┼";
		const fontSize = 16;
		const columns = Math.floor(canvas.width / fontSize);

		// Initialize drops if needed
		if (dropsRef.current.length !== columns) {
			dropsRef.current = Array.from(
				{ length: columns },
				() => Math.random() * 100,
			);
		}
		const drops = dropsRef.current;

		const animate = () => {
			ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "rgba(0, 255, 0, 0.05)";
			ctx.font = `${fontSize}px 'Space Mono', monospace`;
			ctx.textAlign = "center";

			for (let i = 0; i < drops.length; i++) {
				const char = chars[Math.floor(Math.random() * chars.length)];
				const x = i * fontSize + fontSize / 2;
				const y = drops[i] * fontSize;
				ctx.fillText(char, x, y);
				if (y > canvas.height && Math.random() > 0.995) {
					drops[i] = 0;
				} else {
					drops[i] += 0.3; // Much slower movement
				}
			}

			animationIdRef.current = requestAnimationFrame(animate);
		};
		animate();
		return () => {
			window.removeEventListener("resize", resizeCanvas);
			if (animationIdRef.current) {
				cancelAnimationFrame(animationIdRef.current);
			}
		};
	}, []);
	return (
		<canvas ref={canvasRef} className="fixed inset-0 -z-10 block bg-black" />
	);
}
