
import { PrismaClient } from '../../../lib/generated/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/signin/route';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const applications = await prisma.application.findMany({
      where: {
        OR: [
          { freelancerId: session.user.id },
          { job: { clientId: session.user.id } },
        ],
      },
      include: {
        job: true,
        freelancer: true,
      },
    });
    return NextResponse.json(applications);
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
    const { jobId, proposal } = await req.json();

    const application = await prisma.application.create({
      data: {
        jobId,
        proposal,
        freelancerId: session.user.id,
      },
    });

    return NextResponse.json(application);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
