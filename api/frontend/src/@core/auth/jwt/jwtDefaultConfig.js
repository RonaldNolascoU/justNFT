export default {
    // Base URL
    baseUrl: "http://localhost:8000/api",
    // Endpoints
    loginEndpoint: "/admin/login",
    registerEndpoint: "/jwt/register",
    refreshEndpoint: "/refresh",
    logoutEndpoint: "/jwt/logout",

    // This will be prefixed in authorization header with token
    // e.g. Authorization: Bearer <token>
    tokenType: "Bearer",

    // Value of this property will be used as key to store JWT token in storage
    storageTokenKeyName: "accessToken",
    storageRefreshTokenKeyName: "refreshToken"
};
