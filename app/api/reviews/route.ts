
import { PrismaClient } from '../../../lib/generated/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/signin/route';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const reviews = await prisma.review.findMany({
      include: {
        reviewer: true,
        reviewee: true,
      },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { jobId, rating, comment, revieweeId } = await req.json();

    const review = await prisma.review.create({
      data: {
        jobId,
        rating,
        comment,
        revieweeId,
        reviewerId: session.user.id,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
