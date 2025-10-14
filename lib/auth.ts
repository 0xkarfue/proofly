import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/db"
import * as nacl from "tweetnacl";
import bs58 from "bs58";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "solana",
            name: "Solana",
            credentials: {
                message: { label: "Message", type: "text" },
                signature: { label: "Signature", type: "text" },
                publicKey: { label: "Public Key", type: "text" },
            },
            async authorize(credentials) {
                try {
                    if (!credentials?.message || !credentials?.signature || !credentials?.publicKey) {
                        throw new Error("Missing credentials");
                    }

                    // Verify signature
                    const messageBytes = new TextEncoder().encode(credentials.message);
                    const signatureBytes = bs58.decode(credentials.signature);
                    const publicKeyBytes = bs58.decode(credentials.publicKey);

                    const verified = nacl.sign.detached.verify(
                        messageBytes,
                        signatureBytes,
                        publicKeyBytes
                    );

                    if (!verified) {
                        throw new Error("Invalid signature");
                    }

                    // Get or create user
                    let user = await prisma.user.findUnique({
                        where: { walletAddress: credentials.publicKey },
                    });

                    if (!user) {
                        user = await prisma.user.create({
                            data: {
                                walletAddress: credentials.publicKey,
                                username: `user_${credentials.publicKey.slice(0, 8)}`,
                            },
                        });
                    }

                    return {
                        id: user.id,
                        walletAddress: user.walletAddress,
                        email: user.email,
                        name: user.username,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.walletAddress = (user as any).walletAddress;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = {
                    ...session.user,
                    id: token.id as string,
                    walletAddress: token.walletAddress as string,
                };
            }
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};