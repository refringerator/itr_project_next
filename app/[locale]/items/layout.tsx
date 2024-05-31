export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div style={{ width: "100%" }}>
      <h1>ITEMS</h1>
      {children}
    </div>
  );
}
