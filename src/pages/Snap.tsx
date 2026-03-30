import { useState } from "react";
import Navbar from "@/components/Navbar";
import DisclaimerBanner from "@/components/DisclaimerBanner";

const SnapPage = () => {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
      setAnalyzing(true);
      // Simulate analysis delay for UI demo
      setTimeout(() => setAnalyzing(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <DisclaimerBanner />
      <div className="pt-28 pb-20 px-6 md:px-12 max-w-[800px] mx-auto">
        <div className="mb-8 reveal-up">
          <span className="font-clash text-6xl font-medium text-foreground/[0.08]">01</span>
          <p className="label-meta mt-2 mb-4">SNAP</p>
          <h1 className="font-clash text-4xl md:text-5xl font-bold tracking-tighter">AI Photo Meal Scan</h1>
        </div>

        {!preview ? (
          <label
            className={`reveal-up block cursor-pointer transition-colors ${dragOver ? "border-foreground/20" : ""}`}
            style={{ animationDelay: "0.15s" }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
          >
            <div
              className="flex flex-col items-center justify-center py-20 md:py-32 text-center"
              style={{
                border: "1px dashed rgba(255,255,255,0.1)",
                borderRadius: "2px",
              }}
            >
              <p className="font-clash text-xl md:text-2xl font-bold uppercase tracking-tight mb-3">
                Tap to Snap Your Meal
              </p>
              <p className="font-inter text-sm text-foreground/40">
                Drop a photo or tap to open camera
              </p>
            </div>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        ) : (
          <div className="reveal-up">
            <div className="overflow-hidden mb-6" style={{ borderRadius: "2px" }}>
              <img src={preview} alt="Meal photo" className="w-full aspect-[4/3] object-cover" />
            </div>

            {analyzing ? (
              <div className="py-12 text-center">
                <p className="font-clash text-2xl font-bold uppercase">
                  Reading Your Plate
                  <span className="pulse-dot-1">.</span>
                  <span className="pulse-dot-2">.</span>
                  <span className="pulse-dot-3">.</span>
                </p>
              </div>
            ) : (
              <div
                className="p-8 reveal-up"
                style={{
                  background: "#0a0a0a",
                  border: "0.5px solid rgba(255,255,255,0.05)",
                  borderRadius: "2px",
                }}
              >
                <h3 className="font-clash text-2xl font-bold mb-6">Indian Thali</h3>
                <div className="grid grid-cols-4 gap-4 mb-6 border-b border-foreground/5 pb-6">
                  {[
                    { label: "CALORIES", value: "740" },
                    { label: "PROTEIN", value: "42g" },
                    { label: "CARBS", value: "80g" },
                    { label: "FAT", value: "31g" },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="label-meta mb-1">{s.label}</p>
                      <p className="stat-value text-xl">{s.value}</p>
                    </div>
                  ))}
                </div>
                {[
                  { name: "Paneer Tikka", qty: "150g", cal: 320, confidence: "high" },
                  { name: "Roti (2)", qty: "120g", cal: 240, confidence: "high" },
                  { name: "Dal Fry", qty: "200g", cal: 180, confidence: "medium" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-foreground/5 last:border-0">
                    <div>
                      <span className="font-inter text-sm text-foreground/90">{item.name}</span>
                      {item.confidence === "low" && (
                        <span className="ml-2 text-glow-orange text-xs font-bold">?</span>
                      )}
                      <span className="block font-inter text-xs text-foreground/30">{item.qty}</span>
                    </div>
                    <span className="font-inter text-sm text-foreground/50">{item.cal} kcal</span>
                  </div>
                ))}
                <div className="mt-6 flex gap-4">
                  <button className="label-meta text-foreground/40 hover:text-foreground transition-colors">EDIT</button>
                  <button
                    className="flex-1 py-3 font-clash font-bold text-sm uppercase tracking-[0.1em] text-background bg-foreground hover:bg-foreground/90 transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    Log This Meal →
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => { setPreview(null); setAnalyzing(false); }}
              className="mt-4 label-meta text-foreground/30 hover:text-foreground transition-colors"
            >
              ← TAKE ANOTHER PHOTO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SnapPage;
