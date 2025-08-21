import './globals.css'

export const metadata = {
  title: 'StoryHub',
  description: 'OTT-style storytelling mockup — React + Tailwind + Framer Motion',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
