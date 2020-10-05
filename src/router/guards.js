import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import whiteList from './whiteList';
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const install = router => {
  router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start();

    // determine whether the user has logged in
    console.log(store.getters.authStatus);
    if (store.getters.authStatus === 'unknown') {
      try {
        const { roles } = await store.dispatch('user/getProfile');
        const accessRoutes = await store.dispatch(
          'permission/generateRoutes',
          roles
        );
        // dynamically add accessible routes
        router.addRoutes(accessRoutes);
        await store.commit('user/auth_success');

        next({ ...to, replace: true });
      } catch (error) {
        await store.commit('user/auth_error');
        NProgress.done();
      }
    }
    if (store.getters.authStatus === 'success') {
      if (to.path === '/u/signin') {
        // if is logged in, redirect to the home page
        next({ path: '/' });
        NProgress.done();
      } else {
        // determine whether the user has obtained his permission roles through getProfile
        const hasRoles = store.getters.roles && store.getters.roles.length > 0;
        console.log(hasRoles);
        if (hasRoles) {
          next();
        } else {
          try {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const { roles } = await store.dispatch('user/getProfile');
            console.log(roles);
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch(
              'permission/generateRoutes',
              roles
            );
            // dynamically add accessible routes
            router.addRoutes(accessRoutes);

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true });
          } catch (error) {
            // remove token and go to login page to re-login
            // await store.dispatch('user/resetToken')
            // Message.error(error || 'Has Error')
            // next(`/u/signin?redirect=${to.path}`)
            // next()
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
