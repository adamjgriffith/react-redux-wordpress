import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

const DefaultPageTemplate = ({ page }) => {
  const { title, content } = page
  
  const dev = JSON.stringify(page, null, 4)

  return (
    <div className="default-page-template">
      <section>
        <h1>{title.rendered}</h1>
        <div dangerouslySetInnerHTML={{__html: content.rendered}}></div>
      </section>
      <pre>
        <code>
          {dev}
        </code>
      </pre>
    </div>
  )
}

DefaultPageTemplate.propTypes = {
  page: PropTypes.shape({
    title: PropTypes.shape({
      rendered: PropTypes.string.isRequired
    }),
    content: PropTypes.shape({
      rendered: PropTypes.string.isRequired
    })
  }).isRequired
}

export default DefaultPageTemplate
