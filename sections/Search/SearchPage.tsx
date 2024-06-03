import "instantsearch.css/themes/satellite.css";
import "./search-page.css";
import { Col, Divider, Row, Typography } from "antd";
import { Flex } from "antd";
import {
  SearchBox,
  Hits,
  Pagination,
  Configure,
  RefinementList,
} from "react-instantsearch";
import { InstantSearchNext } from "react-instantsearch-nextjs";

interface Porps {
  hit: any;
}

export const Hit = ({ hit }: Porps) => {
  console.log({ hit });
  // {id, name, updated_at, objectID, _snippetResult, _highlightResult, _rawTypesenseHit, __position}
  return <div>{hit.title}</div>;
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
    query_by: "search_text",
  },
});

export default function SearchPage() {
  return (
    <Flex vertical style={{ width: "100%" }}>
      <Typography.Title level={3}>SEARCH</Typography.Title>
      <Divider />
      <Row justify="center">
        <InstantSearchNext
          routing
          indexName="items"
          searchClient={tAdapter.searchClient}
        >
          <Col span={4}>
            <Flex vertical>
              <Divider orientation="left">Tags</Divider>
              <RefinementList attribute="tags" />
              <Divider orientation="left">Authors</Divider>
              <RefinementList attribute="author" />
              <Divider orientation="left">Topics</Divider>
              <RefinementList attribute="topic" />
            </Flex>
          </Col>
          <Col span={1}></Col>
          <Col span={16}>
            <Flex vertical>
              <Configure hitsPerPage={6} />

              <SearchBox />
              <Hits hitComponent={Hit} />

              <Pagination />
            </Flex>
          </Col>
        </InstantSearchNext>
      </Row>
    </Flex>
  );
}
