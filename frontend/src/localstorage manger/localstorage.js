export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const getItem = (name) => {
  return localStorage.getItem(name);
};
export const setUser = (userData) => {
  return localStorage.setItem("user", JSON.stringify(userData));
};

export const setItem = (name, item) =>{
    return localStorage.setItem(name, JSON.stringify(item))
}