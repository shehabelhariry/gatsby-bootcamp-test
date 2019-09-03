import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { default as Prism } from "prismjs"
// import "prismjs/themes/prism.css"

import styles from "./blog-template.module.scss"
import Button from "../components/Button/Button"

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      date(formatString: "DD MMMM YYYY")
      slug
      body {
        json
      }
    }
  }
`

// var html = Prism.highlight(myJS, Prism.languages.javascript, "javascript")
const Blog = props => {
  const { data } = props
  console.log(data.contentfulBlogPost.body.json)
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.blogTemplate}>
          <h1>{data.contentfulBlogPost.title}</h1>
          <p>{data.contentfulBlogPost.date}</p>
          <div className={styles.blog}>
            {documentToReactComponents(data.contentfulBlogPost.body.json, {
              renderNode: {
                "embedded-asset-block": node => {
                  if (node.data.target.file) {
                    return (
                      <img
                        class="img-fluid"
                        src={`${node.data.target.fields.file["en-US"].url}`}
                      />
                    )
                  }
                },
                paragraph: node => {
                  if (
                    node &&
                    node.content &&
                    node.content[0].marks &&
                    node.content[0].marks[0] &&
                    node.content[0].marks[0].type === "code"
                  ) {
                    const codeType = node.content[0].value.split("::")[0]
                    const codeValue = node.content[0].value
                      .split("::")[1]
                      .trim()
                    return (
                      <div className={styles.copyableCodeSnippet}>
                        <Button theme="solid">Copy</Button>
                        <pre
                          style={{
                            backgroundColor: "#343434",
                            color: "white",
                            fontSize: "18px",
                            maxWidth: "94vw",
                            overflow: "auto",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: Prism.highlight(
                              codeValue,
                              Prism.languages[codeType],
                              codeType
                            ),
                          }}
                        />
                      </div>
                    )
                  }

                  if (node.content.length > 1) {
                    const container = []
                    node.content.forEach((item, index) => {
                      if (item.nodeType === "hyperlink") {
                        container.push(
                          <a href={item.data.uri}>{item.data.uri}</a>
                        )
                      } else {
                        container.push(<p>{item.value}</p>)
                      }
                    })
                    return <p>{container}</p>
                  }

                  return <p>{node.content[0].value}</p>
                },
              },
            })}
          </div>
        </div>
        <div></div>
      </div>
    </Layout>
  )
}

export default Blog
