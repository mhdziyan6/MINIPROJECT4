import { cn } from "../../lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col h-[100vh] items-center justify-center bg-zinc-900 dark:bg-black text-slate-50 transition-bg",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
              [--white-gradient:repeating-linear-gradient(100deg,var(--zinc-700)_0%,var(--zinc-600)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--zinc-800)_16%)]
              [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--blue-900)_10%,var(--indigo-700)_15%,var(--purple-800)_20%,var(--violet-900)_25%,var(--blue-800)_30%)]
              [background-image:var(--dark-gradient),var(--aurora)]
              dark:[background-image:var(--black),var(--aurora)]
              [background-size:400%,_250%]
              [background-position:60%_50%,50%_50%]
              filter blur-[30px] opacity-80 dark:opacity-90
              after:content-[""] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] 
              after:dark:[background-image:var(--black),var(--aurora)]
              after:[background-size:300%,_150%] 
              after:animate-aurora after:[background-attachment:fixed] after:mix-blend-overlay
              pointer-events-none
              absolute -inset-[20px] opacity-60 will-change-transform
              `,
              showRadialGradient &&
                "[mask-image:radial-gradient(ellipse_at_80%_20%,black_20%,var(--transparent)_80%)]"
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
