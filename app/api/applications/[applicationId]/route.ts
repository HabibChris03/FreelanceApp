
import { PrismaClient } from '../../../../lib/generated/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/signin/route';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { applicationId: string } }) {
  try {
    const application = await prisma.application.findUnique({
      where: { id: params.applicationId },
      include: {
        job: true,
        freelancer: true,
      },
    });
    return NextResponse.json(application);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { applicationId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { status } = await req.json();

    const applicationToUpdate = await prisma.application.findUnique({
        where: { id: params.applicationId },
        include: {
            job: true,
        },
    });

    if (!applicationToUpdate || (applicationToUpdate.freelancerId !== session.user.id && applicationToUpdate.job.clientId !== session.user.id)) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    const application = await prisma.application.update({
      where: { id: params.applicationId },
      data: {
        status,
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { applicationId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {

    const applicationToDelete = await prisma.application.findUnique({
        where: { id: params.applicationId },
        include: {
            job: true,
        },
    });

    if (!applicationToDelete || (applicationToDelete.freelancerId !== session.user.id && applicationToDelete.job.clientId !== session.user.id)) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    await prisma.application.delete({
      where: { id: params.applicationId },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
