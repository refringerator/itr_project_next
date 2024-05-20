export default function CollectionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>COLLECTIONS</h1>
      {children}
    </div>
  );
}
