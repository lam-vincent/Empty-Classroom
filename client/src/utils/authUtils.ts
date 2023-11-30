import router from "../router";

const verifyToken = () => {
  if (!document.cookie.includes("auth")) {
    router.push("/login");
  }
};

const logout = () => {
  if (document.cookie.includes("auth")) {
    document.cookie = "";
    router.push("/login");
  }
};

export { verifyToken };
