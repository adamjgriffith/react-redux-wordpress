import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import DevTools from './DevTools'
import { Route, Switch } from 'react-router-dom'
import ArchivePage from './ArchivePage'
import SinglePage from './SinglePage'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <Header />
      <main className="container p-5">
        <Switch>
          <Route exact path="/category/:categorySlug" component={ArchivePage} />
          <Route exact path="/tag/:tagSlug" component={ArchivePage} />
          <Route exact path="/:postType(pages|posts)/:postSlug" component={SinglePage} />
          <Route exact path="/:postType(pages|posts)" component={ArchivePage} />
          <Route exact path="/:postSlug" component={SinglePage} />
          <Route exact path="/" render={props => {
            props.match.params.postSlug = 'sample-page'
            return <SinglePage {...props}/>
          }}/>
        </Switch>
      </main>
      <Footer />
    </div>
    <DevTools />
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default Root
