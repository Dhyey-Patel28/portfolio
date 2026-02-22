export function SiteBackground() {
    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            {/* Soft gradient wash */}
            <div
                className="absolute inset-0"
                style={{
                backgroundImage:
                    "radial-gradient(1100px circle at 15% 10%, color-mix(in oklch, var(--primary) 18%, transparent), transparent 55%), radial-gradient(900px circle at 85% 25%, color-mix(in oklch, var(--chart-2) 16%, transparent), transparent 60%), radial-gradient(700px circle at 70% 90%, color-mix(in oklch, var(--chart-4) 14%, transparent), transparent 55%)",
                }}
            />

            {/* Grid texture */}
            <div className="absolute inset-0 bg-grid opacity-[0.25]" />

            {/* Floating orbs */}
            <div className="absolute -left-44 -top-44 h-130 w-130 rounded-full bg-primary/20 blur-3xl animate-float" />
            <div className="absolute -right-44 top-24 h-130 w-130 rounded-full bg-[var(--chart-2)]/16 blur-3xl animate-float-delayed" />

            {/* Grain */}
            <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-overlay" />
        </div>
    );
}