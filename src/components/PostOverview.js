import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PostOverview = ({ post }) => {
  const { categories, date, featuredMedia, tags, title } = post

  const renderedCategories = categories.map((category) => {
    return <span className="badge badge-primary badge-pill mr-1" key={category.id}>{category.name}</span>
  })

  const renderedTags = tags.map((tag) => {
    return <span className="badge badge-primary badge-pill mr-1" key={tag.id}>{tag.name}</span>
  })

  return (
    <div className="post-overview card">
      {featuredMedia && (
        <img className="card-img-top" src={featuredMedia.sourceUrl} alt={featuredMedia.altText} />
      )}
      <div className="card-body">
        <Link to={`/posts/${post.slug}`}><h5 className="card-title">{title.rendered}</h5></Link>
        <p className="card-text">Category: {renderedCategories}</p>
        <p className="card-text">Tags: {renderedTags}</p>
        <p className="card-text"><small className="text-muted">{new Date(date).toLocaleString()}</small></p>
      </div>
    </div>
  )
}

PostOverview.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.shape({
      rendered: PropTypes.string.isRequired
    })
  }).isRequired
}

export default PostOverview
