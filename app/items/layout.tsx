export default function ItemsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <h1>ITEMS</h1>
      {children}
    </div>
  );
}
