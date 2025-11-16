
import { PrismaClient } from '../../../lib/generated/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/signin/route';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobs = await prisma.job.findMany();
    return NextResponse.json(jobs);
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
    const { title, description, budget, skills } = await req.json();

    const job = await prisma.job.create({
      data: {
        title,
        description,
        budget,
        skills,
        clientId: session.user.id,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
