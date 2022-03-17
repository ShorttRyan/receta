import { prisma } from '../../prisma'
export const checkOwner: (
  RID: string,
  UID: number,
) => Promise<boolean> = async (RID: string, UID: number) => {
  try {
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: RID,
      },
    })
    return recipe?.authorId === UID
  } catch (e) {
    return false
  }
}
