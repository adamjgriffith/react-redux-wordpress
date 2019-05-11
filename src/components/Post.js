import React from 'react'
import PropTypes from 'prop-types'

const Post = ({ post }) => {
  const { title, content } = post
  
  const dev = JSON.stringify(post, null, 4)

  return (
    <div className="post">
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

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.shape({
      rendered: PropTypes.string.isRequired
    }),
    content: PropTypes.shape({
      rendered: PropTypes.string.isRequired
    })
  }).isRequired
}

export default Post
