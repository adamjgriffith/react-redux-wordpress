
# React Redux WordPress (RRW)

This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app), which provides a simple way to start React projects with no build configuration needed.

Projects built with Create-React-App include support for ES6 syntax, as well as several unofficial / not-yet-final forms of Javascript syntax such as Class Properties and JSX. See the list of [language features and polyfills supported by Create-React-App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills) for more information.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimises the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customise it when you are ready for it.

## Features

- Supports all WordPress pages and posts
  - `/` for homepage 
  - `/:slug` for a single page
  - `/posts` for posts archive page
  - `/posts/:slug` for single post
- Supports custom post types (see Customisation)
  - `/:postType` for custom post type archive page
  - `/:postType/:slug` for single custom post type

## Customisation

### Changing WordPress

Update `API_ROOT` on line 19 of `/src/middleware/api.js` to your chosen WordPress API:
```
const API_ROOT = 'https://demo.wp-api.org/wp-json/'
```
### Custom Post Types

Update `renderPost` in `/src/containers/ArchivePage.js` and `/src/containers/SinglePage.js`:

```
  renderPost(post) {
    if (post.type === 'page') {
      if (post.template === "") {
        return <DefaultPageTemplate page={post} key={post.id} />
      }
    } else if (post.type === 'post') {
      return <Post post={post} key={post.id} />
    }
  }
  ```

## Limitations of the WordPress API

- No endpoint for fetching Menus. As such the menu is hardcoded in `/src/components/Header.js`.
- No endpoint for fetching Front Page or Blog Page. As such the Front Page `slug` is hardcoded in `/src/components/Root.js` and the Blog Page is `/posts`.
- The WordPress rest API does not Expose the `Link` header. This header is required for pagination on archive pages. You can fix this by adding this code to your WordPress `functions.php` file:
```
function custom_rest_api_init() {
  add_filter('rest_pre_serve_request', function($value) {
    header('Access-Control-Expose-Headers: Link', false);
    return $value;
  } );
}
add_action('rest_api_init', 'custom_rest_api_init', 15);
```
