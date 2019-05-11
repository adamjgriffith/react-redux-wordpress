import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadPosts } from '../actions'
import PostOverview from '../components/PostOverview'
import List from '../components/List'

const loadData = props => {
  const { postType } = props
  props.loadPosts(postType)
}

class ArchivePage extends Component {
  static propTypes = {
    postType: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    postsPagination: PropTypes.object,
    loadPosts: PropTypes.func.isRequired
  }

  componentDidMount() {
    loadData(this.props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postType !== this.props.postType) {
      loadData(this.props)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadPosts(this.props.postType, true)
  }

  renderPost(post) {
    // if (post.type === 'post') {
      return <PostOverview post={post} key={post.id} />
    // }
  }

  render() {
    const { postType } = this.props
    if (!postType) {
      return <h1><i>Loading...</i></h1>
    }

    const { posts, postsPagination } = this.props
    return (
      <div>
        <List renderItem={this.renderPost}
              items={posts}
              onLoadMoreClick={this.handleLoadMoreClick}
              loadingLabel={`Loading ${postType}...`}
              {...postsPagination} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the postType due to the way WordPress's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const postType = ownProps.match.params.postType.toLowerCase()

  const {
    pagination: { postsByType },
    entities: { media, posts, taxonomies }
  } = state

  const postsPagination = postsByType[postType] || { ids: [] }
  const postsNew = postsPagination.ids.map(id => posts[id])

  return {
    postType,
    posts: postsNew.map(post => {
      return {
        ...post,
        featuredMedia: media[post.featuredMedia],
        categories: post.categories ? post.categories.map(category => taxonomies[category]) : [],
        tags: post.tags ? post.tags.map(tag => taxonomies[tag]) : []
      }
    }),
    postsPagination
  }
}

export default withRouter(connect(mapStateToProps, {
  loadPosts
})(ArchivePage))
