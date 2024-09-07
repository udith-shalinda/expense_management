import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Expense Tracker",
  description: "Track your personal expenses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/add-expense">Add Expense</Link>
            </li>
            <li>
              <Link href="/view-expenses">View Expenses</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
