export const metadata = {
  title: 'Sanity Studio',
  description: 'Content management studio',
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
