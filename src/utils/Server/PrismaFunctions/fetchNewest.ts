import { prisma } from '../prisma'

export const fetchNewest = (skip: number, take: number, id: number) => {
  return prisma.recipe.findMany({
    where: {
      isPrivate: false,
      isDraft: false,
      authorId: {
        not: id,
      },
    },
    orderBy: { publishedAt: 'desc' },
    include: {
      _count: {
        select: {
          likedBy: true,
        },
      },
    },
    skip,
    take,
  })
}
