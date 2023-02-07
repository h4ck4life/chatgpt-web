import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center p-3 border-b">
      <div className="flex items-center container mx-auto">
        <Link href="/">
          <span className="text-xl">ChatGPT</span>
        </Link>
      </div>
    </header>
  );
}
