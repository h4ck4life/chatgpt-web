import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center p-3 border-b bg-cyan-500 text-white">
      <div className="flex items-center container mx-auto">
        <Link href="/">
          <span className="text-xl font-bold">Chat</span>
          <span className="text-xl">GPT</span>
          <span className="text-xs">alt.</span>
        </Link>
      </div>
    </header>
  );
}
