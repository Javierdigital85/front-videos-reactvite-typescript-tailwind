import Cookies from "js-cookie";

export function extractUserDetails() {
  const userCookie = Cookies.get("user");

  if (!userCookie) {
    console.error("User cookie not found");
    return null;
  }

  try {
    const decodedCookie = decodeURIComponent(userCookie);
    const user = JSON.parse(decodedCookie);

    const { name, email, role, picture } = user;

    if (!name || !email || !role) {
      console.warn("Incomplete user details in cookie");
      return null;
    }

    return { name, email, role, picture };
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return null;
  }
}

export const isAdmin = (): boolean => {
  const user = extractUserDetails();
  return user?.role === "ADMIN";
};

export const logged = (): boolean => {
  const user = extractUserDetails();
  return !!user?.name;
};
