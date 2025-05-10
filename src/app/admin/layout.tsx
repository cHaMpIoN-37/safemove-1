export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* You can add admin-specific layout components like sidebar, header here */}
      {children}
    </div>
  );
}
