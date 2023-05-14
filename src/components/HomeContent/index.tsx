import { Filter, Matches, Menu, Table } from "~/components";

export function HomeContent() {
  return (
    <section className="container">
      <Menu />
      <div className="content">
        <Filter />
        <Table />
        <Matches />
      </div>
    </section>
  );
}
