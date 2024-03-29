# 🍔 Receta

### 👨‍🍳 **Ryan Shortt**

######

🚀 **[Production Site](https://receta.vercel.app)**

######

🚀 **[Staging Site](https://recetastaging.vercel.app)**

![alt-text](https://user-images.githubusercontent.com/100884476/161879796-f0428a94-0a63-4cad-8d32-0cfca9a50c1b.png)

---

# Implemented Features

### All Pages

- Redirect unauthenticated users to the login page
- Fetch user dependent content at request time

### [Home](https://receta.vercel.app)

- Upload a recipe
- Upload a recipe as a draft
- View your published recipes
- View your liked recipes
- View your drafts

### [/ explore](https://receta.vercel.app/explore)

- The only page non-authenticated users can visit
- Can view most recent and most liked recipes
- Paginates through all recipes
- When you click on a recipe, non-authenticated users will be redirected back to the login page
  where they will proceed to the desired recipe page once authenticated.

### [/ login](https://receta.vercel.app/login)

- Sign up for an account
- Sign in to an account
- Redirect authenticated users to the home page

### [/ settings](https://receta.vercel.app/profile)

- Edit first name, last name, and email
- Sign out of an account

### [/ recipe / [recipe-uuid]](https://receta.vercel.app)

- View a recipe
- Like / Unlike a recipe

### [/ recipe / [recipe-uuid] / edit](https://receta.vercel.app)

- Edit a recipe
- Delete a recipe

### [/ profile / [username]](https://receta.vercel.app/user/readme)

- A user profile displaying a users published and liked recipes

---

# Documentation

## Backend

#####

**Database:** Postgres database hosted on Heroku. (3 different databases used for Feature, staging, & master branches)

#####

**Schema:** [/prisma/schema.prisma](https://github.com/ShorttRyan/receta/blob/master/prisma/schema.prisma)

#####

**ORM Tool:** [Prisma](https://www.prisma.io/)

#####

- Prisma provides developers with an easy way to automatically write migrations based on modifications to
  [schema.prisma](https://github.com/ShorttRyan/receta/blob/master/prisma/schema.prisma).
- Prisma provides TypeScript types for schema defined in
  [schema.prisma](https://github.com/ShorttRyan/receta/blob/master/prisma/schema.prisma).
- Prisma provides a dynamically generated library based on
  [schema.prisma](https://github.com/ShorttRyan/receta/blob/master/prisma/schema.prisma) to interface with the database.

## CI / CD

**Deployed on:** Vercel

#####

Branches are deployed with each commit, staging and master are protected and can only be modified through a pull request.
When a branch is deployed to Vercel, the following command is run:

```nodemon
prisma migrate deploy
```

Which runs any new migrations found in the [/prisma/migrations](https://github.com/ShorttRyan/receta/blob/master/prisma/migrations)
directory, as well as regenerates all packages.

#####

**GitHub Actions:**

#####

When a pull request is created, Lighthouse automatically audits the feature, staging and master branches,
saves the reports as zipped artifact, then comments the scores on the pull request.

## User Management

### User Object

The user object contains the following fields

```javascript
id: number // Unique & AutoGenerated
email: string // Unique
username: string // Unique
password: string
salt: string
firstName: string
lastName: string
publishedRecipes: Recipe[]
likedRecipes: Recipe[]
```

When a user signs up using the [/api/auth/signUp](https://github.com/ShorttRyan/receta/blob/master/src/pages/api/auth/signUp.ts)
API endpoint with a unique email and username, a new user is created and added to the users table.

Since we do not want to store the user's password as a plain string in the database, we need to hash it with something.
Upon request, we generate a random string (ie: the salt) to hash with the password. We then store the salt as well as
the hashed password in the database.

When authenticating a user ([/api/auth/signIn](https://github.com/ShorttRyan/receta/blob/master/src/pages/api/auth/signIn.ts))
with a given username/email and password. We find the user based on the username/email, then reuse the salt attached to
the user to hash the given password, and finally compare that to the hashed password stored in the database.

### HTTP Only Token

Upon successful completion of adding or authenticating in a user. We create a JWT token with the following user fields and
place it in a same site HTTP only cookie which is used on each subsequent request to the server.

```
id,
username,
email,
firstName,
lastName,
```

The reason why I chose to use an HTTP only cookie is that I wanted the token to have a long TTL, I also wanted to avoid any
token management on the client side, while also making it as secure as possible.

HTTP only cookies persist when a page is refreshed or when a browser is closed.

An HTTP only cookie is impervious to cross site scripting (XSS) attacks as it cannot be accessed by client side javascript as opposed
to storing it in local storage which can be vulnerable to these types of attacks.

Since the cookie is specified as same site, it is restricted to a first-party context meaning that it can only be accessed
by the same site that issued it.

### NextJS Pages With User Token

Now that we have a seamless authentication service in place. We can leverage it to serve dynamic content to users based
on the contents of the user's token. For example if a user navigates to a page without a token or with an expired token,
we can simply redirect them back to the login page.

We can also build pages dynamically based on the user's token. Using NextJS _getServerSideProps_ feature,
you can re-fetch a page's props with each request which is how each user's dashboard is different.

We are also able to protect certain pages. For example if a user saves a recipe as a draft, or publishes it as private,
If a user who is not the author tries to access it we are able to block them from viewing it based on the contents of their token.
![alt-text](https://user-images.githubusercontent.com/100884476/161880183-3d56bda2-d71b-43e8-abc9-73c56edac754.png)

### NextJS API With Same-Site Cookies

_getServersideProps_ takes care of almost all the fetching of user data on the site. However, we still need to expose
API routes for the user to securely upload and edit their recipes etc. If we use the Prisma libraries on the client side we
will be exposing the credentials to our Postgres database.

Thankfully, NextJS allows you to write API endpoints on the same server that hosts your site, so we will be able to use our same-site
the exact same way we do when requesting pages.

(The [src/pages/api](https://github.com/ShorttRyan/receta/tree/master/src/pages/api)
directory contains all API endpoints)
