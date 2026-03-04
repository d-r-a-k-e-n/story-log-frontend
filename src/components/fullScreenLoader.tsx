"use client";

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Story Log
        </h1>

        <div className="flex flex-col items-center gap-6">
          <div
            className="size-10 rounded-full border-2 border-muted border-t-primary"
            style={{ animation: "loading-spin 0.8s linear infinite" }}
          />
          <div className="flex items-center gap-1.5">
            <span className="text-sm text-muted-foreground">
              Loading
            </span>
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-1.5 rounded-full bg-primary"
                  style={{
                    animation: "loading-bounce 0.6s ease-in-out infinite",
                    animationDelay: `${i * 0.15}s`,
                  }}
                />
              ))}
            </span>
          </div>
        </div>

        <p className="max-w-[260px] text-center text-xs text-muted-foreground">
          First launch may take up to a minute
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden bg-muted">
        <div
          className="h-full w-1/4 rounded-full bg-primary"
          style={{
            animation: "loading-bar 1.5s ease-in-out infinite",
          }}
        />
      </div>

      <style>
        {`
          @keyframes loading-bar {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(400%); }
          }
          @keyframes loading-spin {
            to { transform: rotate(360deg); }
          }
          @keyframes loading-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-4px); }
          }
        `}
      </style>
    </div>
  );
}
