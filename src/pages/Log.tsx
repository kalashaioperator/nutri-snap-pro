import { useState } from "react";
import Navbar from "@/components/Navbar";
import DisclaimerBanner from "@/components/DisclaimerBanner";

interface ParsedFood {
  name: string;
  quantity_g: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  confidence: string;
}

const MOCK_RESULT: ParsedFood[] = [
  { name: "Roti (2)", quantity_g: 120, calories: 240, protein_g: 8, carbs_g: 48, fat_g: 2, confidence: "high" },
  { name: "Dal Fry", quantity_g: 200, calories: 180, protein_g: 12, carbs_g: 24, fat_g: 5, confidence: "high" },
  { name: "Curd", quantity_g: 150, calories: 90, protein_g: 6, carbs_g: 6, fat_g: 5, confidence: "medium" },
];

const LogPage = () => {
  const [text, setText] = useState("");
  const [parsing, setParsing] = useState(false);
  const [results, setResults] = useState<ParsedFood[] | null>(null);

  const handleParse = () => {
    if (!text.trim()) return;
    setParsing(true);
    // Simulate parsing for UI demo
    setTimeout(() => {
      setResults(MOCK_RESULT);
      setParsing(false);
    }, 2000);
  };

  const totals = results?.reduce(
    (acc, f) => ({
      calories: acc.calories + f.calories,
      protein_g: acc.protein_g + f.protein_g,
      carbs_g: acc.carbs_g + f.carbs_g,
      fat_g: acc.fat_g + f.fat_g,
    }),
    { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0 }
  );

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <DisclaimerBanner />
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-[800px] mx-auto">
        <div className="mb-8 reveal-up">
          <span className="font-clash text-6xl font-medium text-foreground/[0.08]">02</span>
          <p className="label-meta mt-2 mb-4">LOG</p>
          <h1 className="font-clash text-4xl md:text-5xl font-bold tracking-tighter">Natural Language Logging</h1>
        </div>

        <div className="reveal-up" style={{ animationDelay: "0.15s" }}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="2 rotis with dal fry, a cup of curd..."
            rows={3}
            className="w-full resize-none bg-foreground/[0.03] text-foreground text-lg font-inter p-6 placeholder:text-foreground/20 focus:outline-none focus:bg-foreground/[0.05] transition-colors"
            style={{
              border: "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: "2px",
            }}
          />
          <button
            onClick={handleParse}
            disabled={parsing || !text.trim()}
            className="mt-4 w-full sm:w-auto border border-foreground/20 px-8 py-4 font-clash font-bold text-sm uppercase tracking-[0.1em] text-foreground hover:bg-foreground hover:text-background transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ borderRadius: "2px" }}
          >
            {parsing ? (
              <span>
                Parsing
                <span className="pulse-dot-1">.</span>
                <span className="pulse-dot-2">.</span>
                <span className="pulse-dot-3">.</span>
              </span>
            ) : (
              "Parse My Meal →"
            )}
          </button>
        </div>

        {results && totals && (
          <div className="mt-10 reveal-up">
            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-foreground/5">
                    {["FOOD ITEM", "QUANTITY", "CALORIES", "PROTEIN", "CARBS", "FAT"].map((h) => (
                      <th key={h} className="label-meta text-left py-3 px-2 first:pl-0">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {results.map((item, i) => (
                    <tr
                      key={i}
                      className="border-b border-foreground/5"
                      style={{
                        background: item.confidence === "low" ? "rgba(249,115,22,0.04)" : "transparent",
                      }}
                    >
                      <td className="py-3 px-2 pl-0 font-inter text-sm text-foreground/90">
                        {item.name}
                        {item.confidence === "low" && <span className="ml-1 text-glow-orange">?</span>}
                      </td>
                      <td className="py-3 px-2 font-inter text-sm text-foreground/50">{item.quantity_g}g</td>
                      <td className="py-3 px-2 font-inter text-sm text-foreground/70">{item.calories}</td>
                      <td className="py-3 px-2 font-inter text-sm text-foreground/50">{item.protein_g}g</td>
                      <td className="py-3 px-2 font-inter text-sm text-foreground/50">{item.carbs_g}g</td>
                      <td className="py-3 px-2 font-inter text-sm text-foreground/50">{item.fat_g}g</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="py-3 px-2 pl-0 font-inter text-sm">TOTAL</td>
                    <td className="py-3 px-2"></td>
                    <td className="py-3 px-2 font-inter text-sm">{totals.calories}</td>
                    <td className="py-3 px-2 font-inter text-sm">{totals.protein_g}g</td>
                    <td className="py-3 px-2 font-inter text-sm">{totals.carbs_g}g</td>
                    <td className="py-3 px-2 font-inter text-sm">{totals.fat_g}g</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              className="mt-6 w-full py-4 font-clash font-bold text-sm uppercase tracking-[0.1em] text-background bg-foreground hover:bg-foreground/90 transition-colors"
              style={{ borderRadius: "2px" }}
            >
              Log This Meal →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogPage;
