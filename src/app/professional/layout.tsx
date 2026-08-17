export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FCFDFD] text-[#0F172A]">
      {children}
    </div>
  );
}
