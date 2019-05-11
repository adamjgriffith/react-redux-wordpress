import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadPost } from '../actions'
import DefaultPageTemplate from '../components/DefaultPageTemplate'
import Post from '../components/Post'

const loadData = props => {
  const { postType, postSlug } = props
  props.loadPost(postType, postSlug)
}

class SinglePage extends Component {
  static propTypes = {
    postType: PropTypes.string,
    postSlug: PropTypes.string.isRequired,
    post: PropTypes.object,
    loadPost: PropTypes.func.isRequired
  }

  componentDidMount() {
    loadData(this.props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.postType !== this.props.postType || prevProps.postSlug !== this.props.postSlug) {
      loadData(this.props)
    }
  }

  handleLoadMoreClick = () => {
    this.props.loadPosts(this.props.postType, true)
  }

  renderPost(post) {
    if (post.type === 'page') {
      if (post.template === "") {
        return <DefaultPageTemplate page={post} key={post.id} />
      }
    } else if (post.type === 'post') {
      return <Post post={post} key={post.id} />
    }
  }

  render() {
    const { post, postType, postSlug } = this.props
    if (!post) {
      return <h1><i>Loading {postType} {postSlug} details...</i></h1>
    }

    return (
      <div>
        {this.renderPost(post)}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  // We need to lower case the login/name due to the way GitHub's API behaves.
  // Have a look at ../middleware/api.js for more details.
  const postType = ownProps.match.params.postType || 'pages'
  const postSlug = ownProps.match.params.postSlug

  const {
    entities: { posts }
  } = state

  return {
    postType,
    postSlug,
    post: posts[postSlug]
  }
}

export default withRouter(connect(mapStateToProps, {
  loadPost
})(SinglePage))
