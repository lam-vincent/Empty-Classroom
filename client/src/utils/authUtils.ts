import router from "../router";

const verifyToken = () => {
  if (!document.cookie.includes("auth")) {
    router.push("/login");
  }
};

export { verifyToken };
