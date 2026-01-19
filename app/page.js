import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Government Media Portal</h1>
        <p>Unified access for administration, agencies, newspapers & clients</p>
      </header>

      <main style={styles.grid}>
        <Card title="Admin Dashboard" desc="System control & management" link="/admin" />
        <Card title="Agency Dashboard" desc="Agency operations & uploads" link="/outdoor" />
        <Card title="Newspaper" desc="Publish & manage advertisements" link="/newspaper" />
        <Card title="Client" desc="View ads, notices & updates" link="/client" />
      </main>

      <footer style={styles.footer}>
        © 2026 Government of India
      </footer>
    </div>
  );
}

function Card({ title, desc, link }) {
  return (
    <Link href={link} style={styles.card}>
      <h2>{title}</h2>
      <p>{desc}</p>
      <span>Enter →</span>
    </Link>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f7fa",
  },
  header: {
    padding: "40px",
    textAlign: "center",
    backgroundColor: "#003366",
    color: "#fff",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    padding: "40px",
    maxWidth: "1000px",
    margin: "auto",
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    textDecoration: "none",
    color: "#000",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
    transition: "0.3s",
  },
  footer: {
    textAlign: "center",
    padding: "15px",
    backgroundColor: "#e1e1e1",
    marginTop: "auto",
  },
};
