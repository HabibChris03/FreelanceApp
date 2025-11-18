
import { prisma } from '../../../../lib/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../api/auth/[...nextauth]/route';

export async function GET(req: Request, { params }: { params: { profileId: string } }) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: params.profileId },
      include: {
        user: true,
      },
    });
    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { profileId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { firstName, lastName, bio, skills, portfolio } = await req.json();

    const profileToUpdate = await prisma.profile.findUnique({
        where: { id: params.profileId },
    });

    if (!profileToUpdate || profileToUpdate.userId !== session.user.id) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    const profile = await prisma.profile.update({
      where: { id: params.profileId },
      data: {
        firstName,
        lastName,
        bio,
        skills,
        portfolio,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { profileId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {

    const profileToDelete = await prisma.profile.findUnique({
        where: { id: params.profileId },
    });

    if (!profileToDelete || profileToDelete.userId !== session.user.id) {
        return new NextResponse('Forbidden', { status: 403 });
    }

    await prisma.profile.delete({
      where: { id: params.profileId },
    });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.log(error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
