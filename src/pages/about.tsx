import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import {
  Box,
  Flex,
  Container,
  Content,
  Description,
  LineBreak,
  PostTitle,
  HideOnMobile,
  Text,
} from '../styles';

const About = ({ data }) => {
  const { markdownRemark: post } = data;
  const domain = data.site.siteMetadata.url;

  const { title, description, image_url } = post.frontmatter;

  const url = domain + '/about';

  return (
    <Layout>
      <Helmet titleTemplate="%s">
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {image_url && <meta property="og:image" content={image_url} />}
        {image_url && <meta property="twitter:image" content={image_url} />}
        {image_url && <meta property="image" content={image_url} />}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <Content pt={[4, 5]} pb={4}>
        <Container>
          <Box mt={2}>
            <PostTitle dangerouslySetInnerHTML={{ __html: title }} />
            <Description>{description}</Description>
          </Box>

          <LineBreak mt="4em" mb="3em" />

          <Flex>
            <HideOnMobile>
              <Flex
                flexWrap="wrap"
                alignItems="flex-start"
                flex={[1]}
                mr={[0, 5]}
                position="sticky"
                top="2em"
                alignSelf="flex-start"
              >
                <img width="500" src={post.frontmatter.image_url} />
              </Flex>
            </HideOnMobile>

            <Box flex={[1]} mt={-3}>
              <HTMLContent content={post.html} />
            </Box>
          </Flex>
        </Container>
      </Content>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        url
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "about" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image_url
      }
    }
  }
`;
