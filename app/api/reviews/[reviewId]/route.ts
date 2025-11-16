
import { PrismaClient } from '../../../../lib/generated/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/signin/route';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { reviewId: string } }) {
  try {
    const review = await prisma.review.findUnique({
      where: { id: params.reviewId },
      include: {
        reviewer: true,
        reviewee: true,
      },
    });
    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { reviewId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { rating, comment } = await req.json();

    const reviewToUpdate = await prisma.review.findUnique({
        where: { id: params.reviewId },
    });

    if (!reviewToUpdate || reviewToUpdate.reviewerId !== session.user.id) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    const review = await prisma.review.update({
      where: { id: params.reviewId },
      data: {
        rating,
        comment,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { reviewId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {

    const reviewToDelete = await prisma.review.findUnique({
        where: { id: params.reviewId },
    });

    if (!reviewToDelete || reviewToDelete.reviewerId !== session.user.id) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    await prisma.review.delete({
      where: { id: params.reviewId },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
