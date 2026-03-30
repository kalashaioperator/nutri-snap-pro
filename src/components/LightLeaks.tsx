const LightLeaks = () => (
  <>
    <div
      className="absolute bottom-0 left-0 w-[600px] h-[600px] pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, rgba(249,115,22,0.08), transparent 70%)",
        transform: "translate(-30%, 30%)",
      }}
    />
    <div
      className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
      style={{
        background: "radial-gradient(circle at center, rgba(30,58,138,0.08), transparent 70%)",
        transform: "translate(30%, -30%)",
      }}
    />
  </>
);

export default LightLeaks;
