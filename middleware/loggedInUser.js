export default function ({ store, $auth, redirect }) {
  // If the user is not authenticated
  const isLoggedIn = $auth.$storage.getUniversal("logged_In")
  if (isLoggedIn) {
    return redirect('/profile/general-info')
  }
}
