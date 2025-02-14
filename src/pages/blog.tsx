import React from 'react';
import { graphql } from 'gatsby';
import { PageHeading, Container, Content } from '../styles';
import Layout from '../components/Layout';
import Post from '../components/post';

export default class BlogPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges } = data.allMarkdownRemark;

    const posts = edges.map(({ node }) => node);

    return (
      <Layout>
        <Content>
          <Container>
            <PageHeading>Latest Posts</PageHeading>
          </Container>
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </Content>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: {
        fields: [frontmatter___pinned, frontmatter___date]
        order: [ASC, DESC]
      }
      filter: {
        frontmatter: { templateKey: { eq: "blog-post" }, private: { ne: true } }
      }
    ) {
      edges {
        node {
          id
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            slug
            title
            tags
            templateKey
            description
            pinned
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
