
import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export async function GET(req: Request) {
  try {
    const profiles = await prisma.profile.findMany({
      include: {
        user: true,
      },
    });
    return NextResponse.json(profiles);
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
    const { firstName, lastName, bio, skills, portfolio } = await req.json();

    const profile = await prisma.profile.create({
      data: {
        firstName,
        lastName,
        bio,
        skills,
        portfolio,
        userId: session.user.id,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
