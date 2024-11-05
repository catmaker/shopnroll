import { authMiddleware } from "@clerk/nextjs/server";

// 모든 라우트를 public으로 설정
export default authMiddleware({
  publicRoutes: ["/(.*)", "/api(.*)"], 
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
