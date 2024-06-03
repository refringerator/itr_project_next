interface SearchProps {
  search?: string;
  result?: string[];
}

import "instantsearch.css/themes/satellite.css";

import { Flex } from "antd";
import {
  SearchBox,
  Hits,
  Pagination,
  Configure,
  RefinementList,
  SortBy,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

interface Porps {
  hit: any;
}
export const Hit = ({ hit }: Porps) => {
  // {id, name, updated_at, objectID, _snippetResult, _highlightResult, _rawTypesenseHit, __position}
  return <div>{hit.name}</div>;
};

import TypesenseInstantsearchAdapter from "typesense-instantsearch-adapter";

const tAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_SEARCH_API_KEY!,
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_SEARCH_HOST!,
        port: parseInt(process.env.NEXT_PUBLIC_SEARCH_PORT!),
        protocol: process.env.NEXT_PUBLIC_SEARCH_PROTOCOL!,
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "name",
  },
});

export default function SearchPage({ search }: SearchProps) {
  return (
    <Flex vertical>
      <h4>SEARCH</h4>
      <InstantSearchNext
        routing
        indexName="items"
        searchClient={tAdapter.searchClient}
      >
        <Configure hitsPerPage={6} />
        {/* <SortBy
          items={[
            { label: "1", value: "items" },
            { label: "Created (asc)", value: "items_created_at_asc" },
            { label: "Created (desc)", value: "items_created_at_desc" },
          ]}
        /> */}
        <SearchBox />
        <RefinementList attribute="tags" />
        <RefinementList attribute="author" />
        <RefinementList attribute="topic" />
        <Hits
        // hitComponent={Hit}
        />
        <Pagination />
      </InstantSearchNext>
    </Flex>
  );
}
