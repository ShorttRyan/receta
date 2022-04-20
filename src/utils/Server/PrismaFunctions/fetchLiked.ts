import { prisma } from '../prisma'

export const fetchLiked = (skip: number, take: number, id: number) => {
  return prisma.recipe.findMany({
    where: {
      isPrivate: false,
      isDraft: false,
      authorId: {
        not: id,
      },
    },
    orderBy: { likedBy: { _count: 'desc' } },
    include: {
      _count: {
        select: {
          likedBy: true,
        },
      },
    },
    skip: 0,
    take: 3,
  })
}
