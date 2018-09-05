import React from 'react'
import Link from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

class ArticlesIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <section id="wrapper">
        <header>
          <div className="inner">
            <h2>Articles</h2>
            <p>Occassional musings on web development.</p>
          </div>
        </header>
        <div className="wrapper">
          <div className="inner">
            <Helmet title={`Articles | ${siteTitle}`} />
            {posts.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug
              return (
                <div key={node.fields.slug} className="box alt">
                  <div className="row">
                    <div className="col-4">
                      <Img
                        sizes={node.frontmatter.thumbnail.childImageSharp.sizes}
                        alt={node.frontmatter.title}
                      />
                    </div>
                    <div className="col-8">
                      <h3>
                        <Link to={'/articles' + node.frontmatter.path}>
                          {title}
                        </Link>
                      </h3>
                      <small>{node.frontmatter.date}</small>
                      <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default ArticlesIndex

export const pageQuery = graphql`
  query ArticlesIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fileAbsolutePath: { regex: "/(/articles)/.*$/" } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM / YYYY")
            title
            path
            thumbnail {
              childImageSharp {
                sizes(maxWidth: 400, maxHeight: 300, cropFocus: CENTER) {
                  sizes
                  aspectRatio
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
