import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Slide from 'react-reveal/Slide'

import Banner from '../components/Banner/banner'
import Article from '../components/Article/article'

class Index extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')
    let articles = posts.filter(x => x.node.frontmatter.layout === 'post')
    articles = articles.slice(0, 3)
    let portfolio = posts.filter(x => x.node.frontmatter.layout === 'portfolio')
    portfolio = portfolio.slice(0, 4)

    return (
      <div>
        <Helmet
          title={`Website Development and SEO | ${siteTitle}`}
          description={`${siteDescription}`}
        />

        <Banner />

        <section id="wrapper">
          <Slide right>
            <section id="one" className="wrapper spotlight style1">
              <div className="inner">
                <Article data={articles[0]} />
              </div>
            </section>
          </Slide>

          <Slide left>
            <section id="two" className="wrapper alt spotlight style2">
              <div className="inner">
                <Article data={articles[1]} />
              </div>
            </section>
          </Slide>

          <Slide right>
            <section id="three" className="wrapper spotlight style3">
              <div className="inner">
                <Article data={articles[2]} />
              </div>
            </section>
          </Slide>

          <section id="four" className="wrapper alt style1">
            <div className="inner">
              <h2 className="major">Portfolio</h2>
              <p>
                Over my career, I have had the opportunity to work on a diverse
                assortment of projects. Here is a small sampling of some of
                recent ones.
              </p>
              <section className="features">
                {portfolio.map(({ node }, index) => (
                  <Slide bottom delay={index * 100} key={node.frontmatter.path}>
                    <article>
                      <Link
                        to={'/portfolio' + node.frontmatter.path}
                        className="image"
                      >
                        <Img
                          sizes={
                            node.frontmatter.thumbnail.childImageSharp.sizes
                          }
                          alt={node.frontmatter.title}
                        />
                      </Link>
                      <h3 className="major">{node.frontmatter.title}</h3>
                      <p>{node.frontmatter.abstract}</p>
                      <Link
                        to={'/portfolio' + node.frontmatter.path}
                        className="special"
                      >
                        View Project
                      </Link>
                    </article>
                  </Slide>
                ))}
              </section>
              <ul className="actions">
                <li>
                  <Link to="/portfolio" className="button">
                    View More Projects
                  </Link>
                </li>
              </ul>
            </div>
          </section>
        </section>
      </div>
    )
  }
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            abstract
            layout
            path
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 500, maxHeight: 400, cropFocus: NORTH) {
                  srcSetWebp
                  aspectRatio
                  sizes
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`
