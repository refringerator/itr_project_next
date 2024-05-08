type Props = {
  params: {
    id: string;
  };
};

export default function EditCollection({ params: { id } }: Props) {
  return <h2>Edit Collection {id}</h2>;
}
