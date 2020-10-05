import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style

const whiteList = [
  '/',
  '/u/signin',
  '/u/signup',
  '/auth-redirect',
  '/p',
  '/p/.*',
  '/s',
];

// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const install = router => {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    const username = store.getters['user/username'];

    if (username) {
      if (to.path === '/u/signin' || to.path === '/u/signup') {
        // if is logged in, redirect to the home page
        next({ path: '/' });
        NProgress.done(); // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
      } else {
        // determine whether the user has obtained his permission roles through getInfo
        const roles = store.getters['user/role'];
        const hasRoles = roles && roles.length > 0;
        if (hasRoles) {
          next();
        } else {
          try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const roles = await store.dispatch('user/getRole');
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch(
              'route/generateRoutes',
              roles
            );

            // dynamically add accessible routes
            router.addRoutes(accessRoutes);

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true });
          } catch (error) {
            // remove token and go to login page to re-login
            // await store.dispatch('user/resetToken');
            // Message.error(error || 'Has Error');
            next(`/u/signin?redirect=${to.path}`);
            NProgress.done();
          }
        }
      }
    } else {
      /* has no token */

      if (whiteList.indexOf(to.path) !== -1) {
        // in the free login whitelist, go directly
        next();
      } else if (whiteList.some(entry => new RegExp(entry).test(to.path))) {
        next();
      } else {
        // other pages that do not have permission to access are redirected to the login page.
        next(`/u/signin?redirect=${to.path}`);
        NProgress.done();
      }
    }
  });

  router.afterEach(() => {
    // finish progress bar
    NProgress.done();
  });
};

export default install;
