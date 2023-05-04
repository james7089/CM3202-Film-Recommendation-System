const routesGen = {
    home: "/",
    mediaList: (type) => `/${type}`,
    moviePage: (id) => `/movie/${id}`,
    mediaSearch: "/search",
    person: (id) => `/person/${id}`,
    favoriteList: "/favorites",
    reviewList: "/reviews",
    passwordUpdate: "password-update"
  };

  export default routesGen;