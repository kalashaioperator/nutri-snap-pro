import { Link } from "react-router-dom";
import LightLeaks from "@/components/LightLeaks";
import heroMeal from "@/assets/hero-meal.jpg";

const StatCell = ({ label, value, delay }: { label: string; value: string; delay: string }) => (
  <div className="reveal-up py-6 px-4" style={{ animationDelay: delay }}>
    <p className="label-meta mb-2">{label}</p>
    <p className="stat-value">{value}</p>
  </div>
);

const FeatureSection = ({
  number,
  label,
  title,
  description,
  children,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <section className="py-24 md:py-32 px-6 md:px-12 border-t border-foreground/5">
    <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-20">
      <div className="md:col-span-3 reveal-up">
        <span className="font-clash text-6xl font-medium text-foreground/[0.08]">{number}</span>
        <p className="label-meta mt-4">{label}</p>
      </div>
      <div className="md:col-span-9 reveal-up" style={{ animationDelay: "0.15s" }}>
        <h2 className="font-clash text-4xl md:text-5xl font-bold tracking-tighter mb-6">{title}</h2>
        <p className="font-inter text-lg md:text-xl text-foreground/60 leading-relaxed max-w-[640px] mb-10">
          {description}
        </p>
        {children}
      </div>
    </div>
  </section>
);

const Landing = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden px-6 md:px-12">
        <LightLeaks />
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 relative reveal-up">
            <div className="overflow-hidden" style={{ borderRadius: "2px" }}>
              <img
                src={heroMeal}
                alt="Indian thali meal with dal, paneer, rice and roti"
                className="w-full aspect-[4/5] object-cover img-hover"
                width={800}
                height={1000}
              />
            </div>
            <h1
              className="absolute bottom-4 left-4 md:bottom-8 md:left-8 font-clash font-bold uppercase text-foreground z-10"
              style={{ fontSize: "clamp(3rem, 15vw, 12rem)", letterSpacing: "-0.05em", lineHeight: 0.85 }}
            >
              TRACK
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col items-start gap-8 reveal-up" style={{ animationDelay: "0.2s" }}>
            <p className="font-inter text-lg text-foreground/60 font-light leading-relaxed max-w-[256px]">
              Log every bite. Hit every macro. Built for India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                to="/snap"
                className="border border-foreground/20 px-8 py-4 font-clash font-bold text-sm uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-center"
                style={{ borderRadius: "2px" }}
              >
                Snap a Meal
              </Link>
              <Link
                to="/log"
                className="border border-foreground/10 px-8 py-4 font-clash font-bold text-sm uppercase tracking-[0.1em] text-foreground/60 hover:text-foreground hover:border-foreground/20 transition-all duration-300 text-center"
                style={{ borderRadius: "2px" }}
              >
                Type Your Log
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="border-t border-foreground/5 px-6 md:px-12 py-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4">
          <StatCell label="MEALS LOGGED" value="12,847" delay="0s" />
          <StatCell label="CALORIES TODAY" value="1,680" delay="0.1s" />
          <StatCell label="PROTEIN TODAY" value="98g" delay="0.2s" />
          <StatCell label="STREAK" value="14 Days" delay="0.3s" />
        </div>
      </section>

      {/* Features */}
      <FeatureSection
        number="01"
        label="SNAP"
        title="AI Photo Meal Scan"
        description="Point your camera at any Indian meal. Our AI identifies every dish — from paneer tikka to rasam — estimates portions, and returns precise calories and macros in under 5 seconds."
      >
        <Link
          to="/snap"
          className="inline-block border border-foreground/20 px-8 py-4 font-clash font-bold text-sm uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          style={{ borderRadius: "2px" }}
        >
          Try Snap →
        </Link>
      </FeatureSection>

      <FeatureSection
        number="02"
        label="LOG"
        title="Natural Language Logging"
        description="Type like you talk. '2 rotis and dal fry' becomes a structured meal log with complete nutrition data. No searching databases. No manual entry."
      >
        <Link
          to="/log"
          className="inline-block border border-foreground/20 px-8 py-4 font-clash font-bold text-sm uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          style={{ borderRadius: "2px" }}
        >
          Try Logging →
        </Link>
      </FeatureSection>

      <FeatureSection
        number="03"
        label="DASHBOARD"
        title="Daily Macro Dashboard"
        description="See your entire day at a glance. Calorie ring, macro breakdown, meal timeline. Know exactly where you stand against your targets — protein, carbs, fat, fibre."
      >
        <Link
          to="/dashboard"
          className="inline-block border border-foreground/20 px-8 py-4 font-clash font-bold text-sm uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          style={{ borderRadius: "2px" }}
        >
          View Dashboard →
        </Link>
      </FeatureSection>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-card px-6 md:px-12 pt-32 pb-16 text-center">
        <LightLeaks />
        <div
          className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 font-clash font-bold uppercase text-foreground/[0.04] pointer-events-none whitespace-nowrap"
          style={{ fontSize: "20vw" }}
        >
          SNAPEAT
        </div>
        <div className="relative z-10">
          <Link
            to="/dashboard"
            className="inline-block font-clash text-2xl md:text-4xl font-bold text-foreground underline underline-offset-8 decoration-foreground/30 hover:decoration-foreground hover:text-foreground/60 transition-all duration-500"
          >
            START YOUR FREE TRIAL →
          </Link>
          <div className="mt-16 flex items-center justify-center gap-6">
            <span className="label-meta">Privacy</span>
            <span className="label-meta">·</span>
            <span className="label-meta">Terms</span>
            <span className="label-meta">·</span>
            <span className="label-meta">@SNAPEAT</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
