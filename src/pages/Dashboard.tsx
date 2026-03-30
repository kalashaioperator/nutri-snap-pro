import { useState } from "react";
import Navbar from "@/components/Navbar";
import DisclaimerBanner from "@/components/DisclaimerBanner";

interface MealItem {
  name: string;
  quantity_g: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fibre_g: number;
  confidence: string;
}

interface Meal {
  id: string;
  name: string;
  time: string;
  method: "SNAP" | "TEXT";
  items: MealItem[];
  totals: { calories: number; protein_g: number; carbs_g: number; fat_g: number; fibre_g: number };
}

const MOCK_MEALS: Meal[] = [
  {
    id: "1",
    name: "Lunch — Paneer Thali",
    time: "1:32 PM",
    method: "SNAP",
    items: [
      { name: "Paneer Tikka", quantity_g: 150, calories: 320, protein_g: 22, carbs_g: 8, fat_g: 24, fibre_g: 1, confidence: "high" },
      { name: "Roti (2)", quantity_g: 120, calories: 240, protein_g: 8, carbs_g: 48, fat_g: 2, fibre_g: 4, confidence: "high" },
      { name: "Dal Fry", quantity_g: 200, calories: 180, protein_g: 12, carbs_g: 24, fat_g: 5, fibre_g: 6, confidence: "medium" },
    ],
    totals: { calories: 740, protein_g: 42, carbs_g: 80, fat_g: 31, fibre_g: 11 },
  },
  {
    id: "2",
    name: "Morning — Poha & Chai",
    time: "9:15 AM",
    method: "TEXT",
    items: [
      { name: "Poha", quantity_g: 200, calories: 250, protein_g: 5, carbs_g: 45, fat_g: 7, fibre_g: 2, confidence: "high" },
      { name: "Masala Chai", quantity_g: 150, calories: 80, protein_g: 3, carbs_g: 12, fat_g: 3, fibre_g: 0, confidence: "high" },
    ],
    totals: { calories: 330, protein_g: 8, carbs_g: 57, fat_g: 10, fibre_g: 2 },
  },
];

const TARGET = { calories: 2100, protein_g: 144, carbs_g: 240, fat_g: 78, fibre_g: 30 };

const CalorieRing = ({ consumed, target }: { consumed: number; target: number }) => {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(consumed / target, 1.3);
  const offset = circumference - progress * circumference;
  const isOver = consumed > target;

  return (
    <div className="relative flex items-center justify-center">
      <svg width="240" height="240" viewBox="0 0 240 240" className="transform -rotate-90">
        <circle cx="120" cy="120" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
        <circle
          cx="120"
          cy="120"
          r={radius}
          fill="none"
          stroke={isOver ? "rgba(249,115,22,0.8)" : "#FFFFFF"}
          strokeWidth="4"
          strokeLinecap="butt"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="ring-animate"
          style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute text-center">
        <span className="font-clash text-4xl font-bold">{consumed.toLocaleString()}</span>
        <p className="label-meta mt-1">OF {target.toLocaleString()} KCAL</p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);

  const totalConsumed = MOCK_MEALS.reduce((sum, m) => sum + m.totals.calories, 0);
  const totalProtein = MOCK_MEALS.reduce((sum, m) => sum + m.totals.protein_g, 0);
  const totalCarbs = MOCK_MEALS.reduce((sum, m) => sum + m.totals.carbs_g, 0);
  const totalFat = MOCK_MEALS.reduce((sum, m) => sum + m.totals.fat_g, 0);
  const totalFibre = MOCK_MEALS.reduce((sum, m) => sum + m.totals.fibre_g, 0);

  const remaining = TARGET.calories - totalConsumed;

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <DisclaimerBanner />
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-[800px] mx-auto">
        {/* Calorie Ring */}
        <div className="flex flex-col items-center mb-8 reveal-up">
          <CalorieRing consumed={totalConsumed} target={TARGET.calories} />
          <p
            className="mt-4 font-inter font-bold text-xs uppercase tracking-[0.15em]"
            style={{ color: remaining >= 0 ? "rgba(255,255,255,0.6)" : "rgba(249,115,22,0.8)" }}
          >
            {remaining >= 0 ? `+${remaining} KCAL REMAINING` : `−${Math.abs(remaining)} KCAL OVER`}
          </p>
        </div>

        {/* Macro Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-foreground/5 reveal-up" style={{ animationDelay: "0.15s" }}>
          {[
            { label: "PROTEIN", value: totalProtein, target: TARGET.protein_g, unit: "g" },
            { label: "CARBS", value: totalCarbs, target: TARGET.carbs_g, unit: "g" },
            { label: "FAT", value: totalFat, target: TARGET.fat_g, unit: "g" },
            { label: "FIBRE", value: totalFibre, target: TARGET.fibre_g, unit: "g" },
          ].map((macro) => (
            <div key={macro.label} className="py-6 px-4 border-b border-foreground/5">
              <p className="label-meta mb-2">{macro.label}</p>
              <p className="stat-value">
                {macro.value}{macro.unit}
                <span className="text-foreground/30 text-base font-inter font-normal ml-1">
                  / {macro.target}{macro.unit}
                </span>
              </p>
            </div>
          ))}
        </div>

        {/* Meal Timeline */}
        <div className="mt-12 reveal-up" style={{ animationDelay: "0.3s" }}>
          <p className="label-meta mb-6">MEAL TIMELINE</p>
          {MOCK_MEALS.map((meal) => (
            <div key={meal.id} className="border-t border-foreground/5">
              <button
                onClick={() => setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                className="w-full py-5 flex items-center justify-between text-left hover:bg-foreground/[0.02] transition-colors px-2"
              >
                <div className="flex items-center gap-3">
                  <span className="font-inter text-base text-foreground">{meal.name}</span>
                  <span
                    className="font-inter text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 text-foreground/40"
                    style={{ background: "rgba(255,255,255,0.05)", borderRadius: "2px" }}
                  >
                    {meal.method}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-inter text-sm text-foreground/40">{meal.time}</span>
                  <span className="font-inter text-sm text-foreground/60">{meal.totals.calories} kcal</span>
                </div>
              </button>
              {expandedMeal === meal.id && (
                <div className="pb-4 px-2 reveal-up">
                  {meal.items.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2 px-3"
                      style={{
                        background: item.confidence === "low" ? "rgba(249,115,22,0.05)" : "transparent",
                      }}
                    >
                      <div>
                        <span className="font-inter text-sm text-foreground/80">{item.name}</span>
                        {item.confidence === "low" && (
                          <span className="ml-2 text-glow-orange text-xs">?</span>
                        )}
                        <span className="block font-inter text-xs text-foreground/30">{item.quantity_g}g</span>
                      </div>
                      <span className="font-inter text-sm text-foreground/50">{item.calories} kcal</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {MOCK_MEALS.length === 0 && (
            <div className="py-16 text-center">
              <p className="font-inter text-foreground/30 text-lg">No meals logged today</p>
              <p className="label-meta mt-2">Snap or type your first meal</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
