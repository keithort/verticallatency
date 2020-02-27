import * as React from 'react'
import { graphql } from 'gatsby'

import { Banner } from '../components/Banner'
import { SEO } from '../components/SEO'
import { Wrapper } from '../components/Wrapper'
import styled from '../utils/theme'

const Main = styled('main')`
  margin: 8rem 0 1.5rem;
  transition: 0.5s margin-top ease-in-out;

  &.home {
    margin-top: 12rem;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    font-size: 1.8rem;
    margin-top: 20rem;
  }
`

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Main className={window.location.pathname === '/' ? 'home' : ''}>
      <SEO {...frontmatter} />

      <Banner title={frontmatter.title} description={frontmatter.description} />

      <Wrapper>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Wrapper>
    </Main>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        description
        path
        title
      }
    }
  }
`
