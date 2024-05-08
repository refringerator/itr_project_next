type Props = {
  params: {
    id: string;
  };
};

export default function Collection({ params: { id } }: Props) {
  return <h2>Collection {id}</h2>;
}
