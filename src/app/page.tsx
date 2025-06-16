export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: 12,
          letterSpacing: "-0.01em",
        }}
      >
        Next.js + Supabase + Typescript
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "#666",
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        Boilerplate for NextJs with Supabase and Typescript
      </p>
    </main>
  );
}
