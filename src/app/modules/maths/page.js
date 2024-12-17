// pages/maths.js

import React from 'react'
import Layout from './components/Layout'
import MathsBanner from './components/MathsBanner'
import MathsModules from './components/MathsModules'
import MathsResources from './components/MathsResources'

const MathsPage = () => {
  return (
    <Layout>
      <MathsBanner />
      <MathsModules />
      <MathsResources />
    </Layout>
  )
}

export default MathsPage
