import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const commitments = await prisma.commitment.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({ success: true, data: commitments });
    } catch (error) {
        console.error("Error fetching commitments:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch commitments" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = await request.json();

        const commitment = await prisma.commitment.create({
            data: {
                userId: session.user.id,
                pdaAddress: body.pdaAddress,
                txSignature: body.txSignature,
                description: body.description,
                stakeAmount: body.stakeAmount,
                type: body.type,
                deadline: new Date(body.deadline),
                friends: body.friends || null,
                category: body.category,
            },
        });

        return NextResponse.json({ success: true, data: commitment });
    } catch (error) {
        console.error("Error creating commitment:", error);
        return NextResponse.json(
            { success: false, error: "Failed to create commitment" },
            { status: 500 }
        );
    }
}