
import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export async function GET(req: Request, { params }: { params: { jobId: string } }) {
  try {
    const job = await prisma.job.findUnique({
      where: { id: params.jobId },
    });
    return NextResponse.json(job);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { jobId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { title, description, budget, skills, status } = await req.json();
    const jobToUpdate = await prisma.job.findUnique({
        where: { id: params.jobId },
    });

    if (!jobToUpdate || jobToUpdate.clientId !== session.user.id) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    const job = await prisma.job.update({
      where: { id: params.jobId },
      data: {
        title,
        description,
        budget,
        skills,
        status,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { jobId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {

    const jobToDelete = await prisma.job.findUnique({
        where: { id: params.jobId },
    });

    if (!jobToDelete || jobToDelete.clientId !== session.user.id) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    await prisma.job.delete({
      where: { id: params.jobId },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
