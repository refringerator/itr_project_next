interface SearchProps {
  search: string;
  result: string[];
}

export default function SearchPage({ search, result }: SearchProps) {
  return (
    <>
      <h4>SEARCH</h4>
      <div>put search input with button here</div>
      <div>
        search results for <b>{search}</b>
      </div>
      <ul>
        {result.map((v, i) => (
          <li key={i}>{v}</li>
        ))}
      </ul>
    </>
  );
}
