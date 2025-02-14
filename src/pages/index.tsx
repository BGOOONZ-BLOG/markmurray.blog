import React from 'react';
import { graphql } from 'gatsby';
import { FiArrowRight } from 'react-icons/fi';
import { Flex, Box, Link, PageHeading, Container } from '../styles';
import Layout from '../components/Layout';
import CollectionCarousel from '../components/CollectionCarousel';
import PostPreviews from '../components/PostPreviews';
import { useCarousel } from '../components/Carousel';
import Controls from '../components/Carousel/Controls';
import ErrorBoundary from '../components/ErrorBoundary';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

const IndexPage = (props) => {
  const { data } = props;
  const { featuredCollection, featuredCollectionTwo, featuredFilmCollection } =
    data;
  const posts = getNodes(data.posts);

  const containerRef = React.useRef(null);
  const { observe, next, prev } = useCarousel(containerRef, 300);

  return (
    <Layout wide displayTagline>
      <ErrorBoundary>
        <Box pt={[0, 4]}>
          <Container>
            <Box mb={[3, 4]}>
              <PageHeading>Latest Collections</PageHeading>
            </Box>
          </Container>
        </Box>

        <CollectionCarousel
          id="film"
          handle="film"
          to="/photography/film"
          title="Lomo XP Redscale Film"
          description="A collection of photos taken in Dublin with expired
            Lomography Redscale XP 50-200 film in a Canon AE-1."
          products={featuredFilmCollection.edges.map(({ node }, index) => ({
            id: index,
            title: `${node.title}`,
            handle: `${node.title}`,
            images: [
              { src: node.childImageSharp.gatsbyImageData.images.fallback.src },
            ],
            to: '/photography/film',
          }))}
        />

        <CollectionCarousel
          id={featuredCollection.id}
          handle={featuredCollection.handle}
          title={`The ${featuredCollection.title} Collection`}
          description={featuredCollection.description}
          heading={featuredCollection.title}
          products={featuredCollection.products}
        />

        <CollectionCarousel
          id={featuredCollectionTwo.id}
          handle={featuredCollectionTwo.handle}
          title={`The ${featuredCollectionTwo.title} Collection`}
          description={featuredCollectionTwo.description}
          heading={featuredCollectionTwo.title}
          products={featuredCollectionTwo.products}
        />
      </ErrorBoundary>

      <Box pt={4}>
        <Container mb="40px">
          <Flex justifyContent="space-between" alignItems="flex-end">
            <div>
              <Box mb={3}>
                <PageHeading>Latest Tech</PageHeading>
              </Box>

              <Link to="/posts">
                See all posts <FiArrowRight />
              </Link>
            </div>

            <Controls onNext={next} onPrev={prev} />
          </Flex>
        </Container>
      </Box>

      <Container>
        <Box my={4}>
          <PostPreviews
            forwardedRef={containerRef}
            observe={observe}
            posts={posts.sort(
              (a, b) => b.frontmatter.pinned - a.frontmatter.pinned,
            )}
          />
        </Box>
      </Container>
    </Layout>
  );
};

export const pageQuery = graphql`
  {
    featuredFilmCollection: allFile(
      filter: { relativeDirectory: { eq: "film" } }
      sort: { fields: name, order: [ASC] }
      limit: 8
    ) {
      edges {
        node {
          id
          childImageSharp {
            gatsbyImageData(width: 500, placeholder: DOMINANT_COLOR)
          }
        }
      }
    }
    featuredCollection: shopifyCollection(title: { eq: "Sapphire" }) {
      id
      title
      handle
      description
      products {
        id
        handle
        title
        images {
          src
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
    featuredCollectionTwo: shopifyCollection(title: { eq: "Reflections" }) {
      id
      title
      handle
      description
      products {
        id
        handle
        title
        images {
          src
        }
        priceRangeV2 {
          minVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: [DESC] }
      filter: {
        frontmatter: { private: { ne: true }, templateKey: { eq: "blog-post" } }
      }
    ) {
      edges {
        node {
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            tags
            templateKey
            description
            pinned
            private
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;

export default IndexPage;
