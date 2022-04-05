import { Recipe } from '@prisma/client'

export const fakeRecipe: Recipe = {
  title: 'Sed ut Perspiciatis',
  timeToComplete: 50,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ingredients: [
    {
      name: 'Excepteur sint occaecat',
      amount: '3',
      unit: 'N/A',
      id: '28101212-30cd-465d-a882-dc14aae29f7b',
    },
    {
      name: 'nulla pariatur',
      amount: '1/2',
      unit: 'Cups',
      id: '78f687da-da22-479f-a84e-440eaea27f6f',
    },
    {
      name: 'Voluptatem',
      amount: '2',
      unit: 'N/A',
      id: '741185fc-6cf3-4c87-bdd9-73123fac4e5d',
    },
    {
      name: 'Excepteur',
      amount: '1',
      unit: 'Cups',
      id: '24c9146b-e691-4c73-af3e-cc4bf816569f',
    },
    {
      name: 'Tempor Oil',
      amount: '4',
      unit: 'Tbs',
      id: '75625363-4942-41f9-aba2-7843bcdc2fa9',
    },
  ],
  instructions: [
    {
      value:
        'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.',
      id: '0e2a270b-b44c-4e33-abf6-00c998a8eb00',
    },
    {
      value: 'Itaque earum rerum hic tenetur a sapiente delectus, ut au.',
      id: 'd516e509-ee76-44a8-a39b-e7858c3d4b98',
    },
    {
      value:
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis.',
      id: '804da269-fbba-4d7e-b585-e42c2733f774',
    },
    {
      value:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      id: '9393bf2a-c4d6-4a9c-adc6-619f00832b7e',
    },
  ],
  notes: [
    {
      value:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.',
      id: '13708f6b-b3b3-4060-a586-367f66186d4b',
    },
    {
      value:
        'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.',
      id: '13708f6b-b3b3-4060-a586-367f661qweqweqwe86d4b',
    },
  ],
  isPrivate: true,
  isDraft: false,
  id: '',
  publishedAt: '',
  authorId: -1,
  authorUsername: 'FakeGuy123',
  authorName: 'Jim Bo',
}
