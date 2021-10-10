import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:5000" });

instance.interceptors.request.use((config) => {
  if (localStorage.getItem("profile")) {
    config.headers["x-auth-token"] = JSON.parse(
      localStorage.getItem("profile")
    ).accessToken;
  }

  return config;
});

//response interceptor to refresh token on receiving token expired error
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    let refreshToken = JSON.parse(
      localStorage.getItem("profile")
    )?.refreshToken;
    if (
      refreshToken &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const res = await instance.post(`/user/refresh_token`, {
        refreshToken: refreshToken,
      });
      if (res.status === 200) {
        console.log(res.data.accessToken);
        let temp = JSON.parse(localStorage.getItem("profile"));
        temp["accessToken"] = res.data.accessToken;
        localStorage.setItem("profile", JSON.stringify(temp));
        console.log("Access token refreshed!");
        return instance(originalRequest);
      }
    }
    logout();
    return Promise.reject(error);
  }
);

export const refreshToken = (body) => instance.post(`/refresh_token`, body);
export const fetchPosts = () => instance.get(`/posts`);
export const fetchPost = (id) => instance.get(`/posts/${id}`);
export const fetchCategories = () => instance.get(`/assets/Categories`);
export const fetchColors = () => instance.get(`/assets/Colors`);
export const fetchSizes = () => instance.get(`/assets/Sizes`);
export const fetchimages = () => instance.get(`/images`);
export const fetchPostsBySearch = (searchQuery) =>
  instance.get(
    `/posts/search?searchQuery=${searchQuery.search || "none"}&Categories=${
      searchQuery.Categories
    }`
  );

export const createPost = (newPost, user) =>
  instance.post("/posts", { newPost, user }).then((response) => {
    if (response.data.message) {
      alert(response.data.message);
    }
  });

export const deletePost = (id) => instance.delete(`/posts/${id}`, id);

export const AddCategory = (newPost, user) =>
  instance.post("/assets/Categories", { newPost, user });
export const AddColor = (newPost, user) =>
  instance.post("/assets/Colors", { newPost, user });
export const AddSize = (newPost, user) =>
  instance.post("/assets/Sizes", { newPost, user });

export const fetchCart = (User) => instance.get(`/Cart/${User}`);
export const AdditemtoCart = (item, user) =>
  instance.post("/Cart", { item, user });

export const Newimages = (newPost, user) =>
  instance.post("/images", { newPost, user });

export const signIn = (formData) => instance.post("/user/signin", formData);
export const signUp = (formData) => instance.post("/user/signup", formData);
export const logout = (refreshToken) =>
  instance.delete(`/user/logout`, refreshToken);
export const getProtected = () => instance.get(`/user/protected_resource`);
