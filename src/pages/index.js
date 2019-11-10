import React from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero/Hero"
import { Helmet } from "react-helmet"
import Logo from "../images/Logo.png"

const IndexPage = () => {
  return (
    <Layout>
      <Helmet>
        <meta property="og:image" content={Logo} />
      </Helmet>
      <Hero />
    </Layout>
  )
}

export default IndexPage
