import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      walletAddress: string;
      email?: string | null;
      name?: string | null;
    };
  }

  interface User {
    id: string;
    walletAddress: string;
    email?: string | null;
    name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    walletAddress: string;
  }
}