"use client";

export default function SelectUser() {
  const logout = () =>
    fetch("http://localhost:4000/api/logout").then((res) => res.json());
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        logout();
      }}
    >
      <button type="submit">Exit</button>
    </form>
  );
}
